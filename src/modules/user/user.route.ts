import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// create user
router.post("/", userController.createUser);

// get all users
router.get("/", userController.getAllUserInfo);

// get single user by id
router.get("/:id", userController.getSingleUserInfo);

// update single user by email
router.put("/:email", userController.updateUser);
// delete user by id
router.delete("/:id", userController.deleteUser);

export const userRoute = router;
