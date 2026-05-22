import type { NextFunction, Request, Response } from "express";
import fs from "fs"
const logger=(req:Request, res:Response, next: NextFunction) => {
  const humanReadableTime = new Date().toISOString();

  // 1. Added a newline (\n) at the end so every log gets its own row
  const log = `Method: ${req.method} | URL: ${req.url} | Time: ${humanReadableTime}\n`;

  // Clearer console log for debugging
  console.log(`[LOG] ${req.method} -> ${req.url}`);

  // 2. Wrap error logging in an 'if' statement to avoid printing 'null'
  fs.appendFile("logger.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  next();
}

export default logger