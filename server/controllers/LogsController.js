import { createReadStream, existsSync, writeFileSync } from "fs";
import { join } from "path";
import { pipeline } from "stream";


const logFile = join(process.cwd(), "logs", "requests.log");

export const get_logs = (req, res) => {
  if (!existsSync(logFile)) {
    return res.status(200).send("No log entries found.");
  }

  res.setHeader("Content-Type", "text/plain");

  const readStream = createReadStream(logFile, { encoding: "utf-8" });

  pipeline(readStream, res, (err) => {
    if (err) {
      console.error("Pipeline failed:", err);
      if (!res.headersSent) {
        res.status(500).send("Error reading logs");
      }
    }
  });
};

export const delete_logs = (req, res) => {
  try {
    writeFileSync(logFile, "");
    res.status(200).send("Logs deleted successfully");
  } catch (error) {
    console.error("Error clearing logs:", error);
    res.status(500).send("Error deleting logs");
  }
};
