import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// create user
router.post("/",userController.createUser);

export const userRoute = router;
