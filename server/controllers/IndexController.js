import { validationResult } from "express-validator";

export const check_health = async (req, res, next) => {
  res.status(200).send({ status: "ok", timeStamp: Date.now() });
};

export const middlewareTest = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  // Create a new Error object and pass it to the 'next' middleware
  const err = new Error("Validation Failed: You must provide a person query!");
  err.status = 400; // Tag the error with a bad request status
  next(err); // This immediately skips all other routes and jumps to your global error handler!
};
