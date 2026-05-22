import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import fs from "fs";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

// express middle ware :-->
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // for nested data to show we use "extended = true" . if it false then it can't to show nested data

app.use((req, res, next) => {
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
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server is running",
    author: "Abir",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);

app.use("/api/auth", authRouter);

export default app;
