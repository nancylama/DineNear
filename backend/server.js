import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connection from "./database.js"


dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

async function createUserId(name) {
  let user_id;
  let result;

  do {
    const firstLetter = name.charAt(0).toUpperCase();
    const numbers = Math.floor(100 + Math.random() * 900);
    user_id = firstLetter + numbers;

    const query = 'SELECT user_id FROM users WHERE user_id = ?';
    const [results] = await connection.promise().query(query, [user_id]);
    result = results;
    
  } while (result.length > 0);

  return user_id;
}

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

async function insertUser(user_id, email, password, name, dob) {
  const query = "INSERT INTO users (user_id, email, password, name, dob) VALUES (?, ?, ?, ?, ?)";
  try {
    await connection.promise().query(query, [user_id, email, password, name, dob]);
  } catch (err) {
    console.error("Error inserting user", err);
    throw err;
  }
}

app.post("/register", async (req, res) => {
  const { email, password, name, dob } = req.body;

  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res.send([false, "User already exists"]);
    }

    const hashedPassword = await hashPassword(password);
    const user_id = await createUserId(name);

    await insertUser(user_id, email, hashedPassword, name, dob);

    res.send([true, "User successfully registered."]);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send([false, "Server error"]);
  }
});

app.get('/api/top-rated', async (req, res) => {
  const query = 'SELECT * FROM restaurant ORDER BY rating DESC LIMIT 6';
  
  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting restaurants:", err);
    res.status(500).send([false, "Error"]);
  }
});

app.get('/api/RuaThaiMenu', async (req, res) => {
  const query = "SELECT * FROM menuitem WHERE restaurant_id = 'Res001'";

  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting menu items:", err);
    res.status(500).send([false, "Error"]);
  }
});

app.listen(8080, () => {
  console.log("Backend running on http://localhost:8080");
});