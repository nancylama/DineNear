import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";
import db from './database.js';

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// DB Connection
// const db = mysql.createConnection({
//  host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "DineNear",
// });

db.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return;
    }
    console.log("Connected to MySQL database!");
});  

app.post("/api/reservations", (req, res) => {
  const { people, date, time, fname, lname, phone, email } = req.body;

  const sql = `
    INSERT INTO reservations (people, date, time, fname, lname, phone, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [people, date, time, fname, lname, phone, email], (err, result) => {
    if (err) {
      console.error("Error saving reservation:", err);
      return res.status(500).json({ message: "Reservation failed" });
    }
    res.json({ message: "Reservation confirmed!" });
  });
});


app.listen(8080, () => {
  console.log("Backend running on http://localhost:8080");
});
