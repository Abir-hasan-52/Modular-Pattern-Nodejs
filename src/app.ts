import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express();

// express middle ware :-->
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // for nested data to show we use "extended = true" . if it false then it can't to show nested data



app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server is running",
    author: "Abir",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);

 

 
 
 

 

 

export default app;
