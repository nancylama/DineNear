import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connection from "./database.js"


dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

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