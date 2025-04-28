import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connection from "./database.js"; 

dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const sql = 'INSERT INTO reservations (people, date, time, fname, lname, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)';

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

async function insertUser(user_id, email, password, name, dob) {
  const query = "INSERT INTO users (user_id, email, password, name, dob) VALUES (?, ?, ?, ?, ?)";
  try {
    await connection.promise().query(query, [user_id, email, password, name, dob]);
  } catch (err) {
    console.error("Error inserting user", err);
    throw err;
  }
}

// Register with Google
app.post("/api/google-register", async (req, res) => {
  const { email, name } = req.body;

  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res.send([false, "User already exists"]);
    }

    const user_id = await createUserId(name);

    const query = 'INSERT INTO users (user_id, email, password, name, dob) VALUES (?, ?, ?, ?, ?);';
    await connection.promise().query(query, [user_id, email, null, name, name]) 
  } catch (err) {
      console.error("Registration error:", err);
  }
});

// Register API
app.post("/api/register", async (req, res) => {
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

// Cuisines
app.get('/api/cuisine', async (req, res) => {
  const query = 'SELECT name, image_path FROM cuisine;';

  try {
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting restaurants:", err);
    res.status(500).send("Error");
  }
});

// Reviews 
app.get('/api/reviews', async (req, res) => {
  try {
   const query = 'SELECT * FROM review';
   const [results] = await connection.promise().query(query);
   res.json(results);
  } catch (err) {
    console.error("Error getting reviews:", err);
    res.status(500).send("Error");
  }
});

app.post('/api/reviews', async (req, res) => {
  const { user_id, rating, comment } = req.body;

  try {
    const query = 'INSERT INTO review (user_id, rating, comment) VALUES (?, ?, ?);';
    const [result] = await connection.promise().query(query, [user_id, rating, comment]);

    res.status(201).json({ review_id: result.insertId });
  } catch (err) {
    console.error("Error inserting review:", err);
    return res.status(500).json({ error: "Error inserting review" });
  }
});

// Deals 
app.get('/api/deals', async (req, res) => {
  try{
    const query = "SELECT * FROM deal";
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err){
    console.error('Error getting deals:', err);
    res.status(500).send ([false, 'Error']);
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

// Order Details
app.get('/api/order-details', async (req, res) => {
  try {
   const query = 'SELECT * FROM orderdetails';
   const [results] = await connection.promise().query(query);
   res.json(results);
  } catch (err) {
    console.error("Error getting order details:", err);
    res.status(500).send("Error");
  }
});

app.post('/api/order-details', async (req, res) => {
  const { order_id, items } = req.body;

  try {
    for (let menu_item_id of items) {
      const query = 'INSERT INTO orderdetails (quantity, order_id, menu_item_id) VALUES (1, ?, ?);';
      await connection.promise().query(query, [order_id, menu_item_id]);
    }

    res.status(201).json({ success: true, message: "Order saved"});
  } catch (err) {
    console.error("Error inserting order:", err);
    return res.status(500).json({ error: "Error inserting order" });
  }
});

// Update profile
app.put("/api/update-profile", async (req, res) => {
  const {email, name, phone, diet, payment } = req.body;

  if (!email || !name) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
      const [result] = await connection.promise().query(
          'UPDATE users SET name = ?, phone = ?, diet = ?, payment = ? WHERE email = ?',
          [name, phone, diet, payment, email]
      );

      if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
      console.error("Error updating profile:", err);
      return res.status(500).json({ error: "Error updating profile" });
  }
});

// Diet restrictions
app.get('/api/diet-restrictions', async (req, res) => {
  try {
    const query = 'SELECT * FROM dietrestriction;';
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting diet restrictions:", err);
    return res.status(500).json({ error: "Error getting diet restrictions" });
  }
});

// // Serve frontend static files
// app.use(express.static(path.join(__dirname, 'dist')));

// // Serve index.html for any unknown routes (like React Router pages)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

