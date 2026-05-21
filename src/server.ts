import express, {
  type Application,
  type Request,
  type Response,
} from "express";
 
import config from "./config";
import { initDB, pool } from "./db";

const app: Application = express();
const port = config.port;

// express middle ware :-->
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // for nested data to show we use "extended = true" . if it false then it can't to show nested data

// connection with server and cloud database;

 

initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server is running",
    author: "Abir",
  });
});

// create user
app.post("/api/users", async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name,email,password,age)
    VALUES($1,$2,$3,$4)
     RETURNING *
    `,
      [name, email, password, age],
    );
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
});
// get all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users
      
      `);
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
});
// get single user by id
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const result = await pool.query(
      `
      SELECT * FROM users
      WHERE id=$1
      
      `,
      [id],
    );
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
});
app.put("/api/users/:email", async (req: Request, res: Response) => {
  const { email } = req.params;
  const { name, password, age, is_active } = req.body;
  // console.log({ name, password, age, is_active });
  try {
    const result = await pool.query(
      `
      UPDATE users 
      SET 
      name=COALESCE($1,name), 
      password=COALESCE($2,password),
      age=COALESCE($3,age),
      is_active=COALESCE($4,is_active)
      WHERE 
      email=$5  
      RETURNING *
      
      `,
      [name, password, age, is_active, email],
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
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE  id=$1 
      
      `,
      [id],
    );
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
      error:error
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
