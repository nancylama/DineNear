import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connection from "./database.js"; // ✅ only use "connection" consistently

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Connect to DB
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Reservation API
app.post("/api/reservations", (req, res) => {
  const { people, date, time, fname, lname, phone, email } = req.body;

  const sql = `
    INSERT INTO reservations (people, date, time, fname, lname, phone, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [people, date, time, fname, lname, phone, email], (err, result) => {
    if (err) {
      console.error("Error saving reservation:", err);
      return res.status(500).json({ message: "Reservation failed" });
    }
    res.json({ message: "Reservation confirmed!" });
  });
});

// Helper functions
async function checkUserExists(email) {
  const query = "SELECT * FROM users WHERE email = ?";
  const [results] = await connection.promise().query(query, [email]);
  return results.length > 0;
}

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return reject(err);
      resolve(hashedPassword);
    });
  });
}

async function insertUser(email, password, name, dob) {
  const query = "INSERT INTO users (email, password, name, dob) VALUES (?, ?, ?, ?)";
  try {
    await connection.promise().query(query, [email, password, name, dob]);
  } catch (err) {
    console.error("Error inserting user", err);
    throw err;
  }
}

// Register API
app.post("/register", async (request, response) => {
  const { email, password, name, dob } = request.body;

  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return response.send([false, "User already exists"]);
    }

    const hashedPassword = await hashPassword(password);

    await insertUser(email, hashedPassword, name, dob);

    response.send([true, "User successfully registered."]);
  } catch (err) {
    console.error("Error:", err);
    response.status(500).send("Server error");
  }
});

// Top Rated Restaurants
app.get('/api/top-rated', async (req, res) => {
  const query = 'SELECT * FROM restaurant ORDER BY rating DESC LIMIT 6';

  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting restaurants:", err);
    res.status(500).send("Error");
  }
});

// Specific Menu
app.get('/api/RuaThaiMenu', async (req, res) => {
  const query = "SELECT * FROM menuitem WHERE restaurant_id = 'Res001'";

  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting menu items:", err);
    res.status(500).send("Error");
  }
});

app.listen(8080, () => {
  console.log("Backend running on http://localhost:8080");
});
