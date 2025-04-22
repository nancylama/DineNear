import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import connection from './database.js';

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// // DB Connection
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "DineNear",
// });

// db.connect((err) => {
//     if (err) {
//       console.error("Database connection failed:", err);
//       return;
//     }
//     console.log("Connected to MySQL database!");
//  });  

app.get("/", (req, res) => {
    res.send("Welcome to the DineNear backend!");
});

app.listen(8080, () => {
  console.log("Backend running on http://localhost:8080");
});