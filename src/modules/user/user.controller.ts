import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  //   const { name, email, password, age } = req.body;
  try {
    const result = await userService.createUserIntoDb(req.body);
    // console.log(result);
    res.status(201).json({
      success: true,
      message: "user Created successfully",
      author: "Abir",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getAllUserInfo = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: "user retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    // console.log(result);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "user retrived successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  //   const { name, password, age, is_active } = req.body;
  // console.log({ name, password, age, is_active });
  try {
    const result = await userService.updateUserFromDB(
      req.body,
      email as string,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: null,
      });
    }
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "user  DATA update successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user  not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "user  DATA delete successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUserInfo,
  getSingleUserInfo,
  updateUser,
  deleteUser,
};
