import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.conncetion_string
     
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      age INT,
      created_at TIMESTAMP DEFAULT NOW(),
      update_at TIMESTAMP DEFAULT NOW()
      )
      `);
    console.log("DATABASE CONNCECTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
  }
};