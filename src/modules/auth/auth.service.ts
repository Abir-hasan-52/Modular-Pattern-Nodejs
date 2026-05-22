import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken"
import config from "../../config";

const loginUserIntoDB = async (payload: any) => {
  const { email, password } = payload;
  // 1. Check if the user exists
  // 2. Compare the password
  // 3. Generate Token

  // 1. Check if the user exists
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("invalid credentials");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  console.log(matchPassword);
  if (!matchPassword) {
    throw new Error("invalid credentials");
  }

  // generate token
const jwtPayload={
    id: user.id,
    name: user.name,
    email:user.email,
    is_active: user.is_active,
}

  const accessToken=jwt.sign(jwtPayload,config.secret as string,{
    expiresIn:"1d",
  })
  return {accessToken};
};

export const authService = {
  loginUserIntoDB,
};
