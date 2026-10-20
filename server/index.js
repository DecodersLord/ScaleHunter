import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { createWriteStream, createReadStream } from "fs";
import { join } from "path";

import router from "./routes/routes.js";
import authRouter from "./routes/authRoutes.js";
import dungeonRouter from "./routes/dungeonRoutes.js";
import logRouter from "./routes/logRoutes.js";

const app = express();

app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(limiter);

if (process.env.IS_PRODUCTION === true) {
  console.log(process.env.PORT);
  console.log(process.env.IS_PRODUCTION);
  console.log("Welcome to production");
}


const logFile = join(process.cwd(), "logs", "requests.log");
const writeStream = createWriteStream(logFile, { flags: "a" });

function logOriginalUrl(req, res, next) {
  writeStream.write(`${req.originalUrl}\n`);
  console.log("Request URL:", req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  writeStream.write(`${req.method}\n`);
  console.log("Request Type:", req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];

app.use(logStuff);

app.use("/", router);

app.use("/api/auth", authRouter);

app.use("/api/dungeon", dungeonRouter);

app.use("/api/logs", logRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL TRAP TRIGGERED:", err.message); // Log our custom message instead of the huge stack trace

  // Return the status code we attached (or default to 500)
  res.status(err.status || 500).send({
    error: "Something broke!",
    details: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on Port ${process.env.PORT}`);
});
