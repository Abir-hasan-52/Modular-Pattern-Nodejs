import app from "./app";
import config from "./config";
import { initDB } from "./db";

const main = () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main();

/**
 * here i create a app.ts file .then i copy all code in app.ts. only for server.ts i kept for running server . 
 * then i create a main arrow function a call app.listen for running server and i call DB for create database
 */
