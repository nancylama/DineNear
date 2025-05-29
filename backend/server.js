import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connection from "./database.js"; 
import jwt from 'jsonwebtoken';
import { authenticateToken, authorizeRoles } from './authMiddleWare.js';
import adminEmails from './adminEmails.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "https://carefree-reflection-production.up.railway.app", credentials: true }));
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

// === LOGIN ===
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;
//   const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
//   const user = rows[0];

//   if (!user) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

  // const validPassword = await bcrypt.compare(password, user.password);
  // if (!validPassword) {
  //   return res.status(401).json({ error: 'Invalid credentials' });
  // }

  // if (adminEmails.includes(user.email) && user.role !== 'admindev') {
  //   await connection.promise().query('UPDATE users SET role = ? WHERE user_id = ?', ['admindev', user.user_id]);
  //   user.role = 'admindev';
  // }

  // const token = jwt.sign(
  //   { user_id: user.user_id, name: user.name, role: user.role },
  //   process.env.JWT_SECRET,
  //   { expiresIn: '1h' }
  // );

  // res.json({ token });
// });

// // === PROMOTE USER ===
// app.post('/api/promote', authenticateToken, authorizeRoles('admindev'), async (req, res) => {
//   const { user_id } = req.body;
//   try {
//     await connection.promise().query(
//       'UPDATE users SET role = ? WHERE user_id = ?',
//       ['admindev', user_id]
//     );
//     res.json({ message: 'User promoted to admindev' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to promote user' });
//   }
// });

// // === DEMOTE USER ===
// app.post('/api/demote', authenticateToken, authorizeRoles('admindev'), async (req, res) => {
//   const { user_id } = req.body;
//   try {
//     await connection.promise().query(
//       'UPDATE users SET role = ? WHERE user_id = ?',
//       ['customer', user_id]
//     );
//     res.json({ message: 'User demoted to customer' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to demote user' });
//   }
// });

// === VIEW USERS (ADMINDDEV ONLY) ===
// app.get('/api/users', authenticateToken, authorizeRoles('admindev'), async (req, res) => {
//   const [results] = await connection.promise().query(
//     'SELECT user_id, name, email, role FROM users'
//   );
//   res.json(results);
// });

// Reservation API
app.post("/api/reservations", async (req, res) => {
  const { user_id, date, time, party_size } = req.body;

  const sql = 'INSERT INTO reservation (user_id, date, time, party_size) VALUES (?, ?, ?, ?)';

  connection.query(sql, [user_id, date, time, party_size], (err, results) => {
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
  const { email, name, dob } = req.body;

  try {
    const userExists = await checkUserExists(email);
    if (userExists) {
      return res.send([false, "User already exists"]);
    }

    const user_id = await createUserId(name);

    const query = 'INSERT INTO users (user_id, email, password, name, dob) VALUES (?, ?, ?, ?, ?);';
    await connection.promise().query(query, [user_id, email, null, name, dob]);
    res.send([true, "User registered successfully."]);
  } catch (err) {
      console.error("Registration error:", err);
  }
});

// Register
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

// Login
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ success: false, message: "Email and password required" })
//   }

//   try {
//     const [results] = await connection.promise().query(
//       'SELECT * FROM users WHERE email = ?', [email]
//     );

//     if (results.length === 0) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ success: false, error: 'Invalid credentials' });
//     }

//     res.json({
//       success: true,
//       user: {
//         email: user.email,
//         name: user.name,
//         phone: user.phone,
//         diet: user.diet,
//         payment: user.payment
//       }
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Login error" })
//   }
// });

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
  const query = 'SELECT * FROM cuisine;';

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
    // const query = `
    //   SELECT r.review_id, r.rating, r.comment,
    //          r.restaurant_id, rest.name AS restaurant_name,
    //          r.user_id, u.name AS user_name
    //   FROM review r
    //   JOIN restaurant rest ON r.restaurant_id = rest.restaurant_id
    //   JOIN users u ON r.user_id = u.user_id
    // `;
    const query = `
      SELECT r.review_id, r.rating, r.comment,
            r.restaurant_id, rest.name AS restaurant_name,
            r.user_id, u.name AS user_name
      FROM review r
      JOIN restaurant rest ON r.restaurant_id = rest.restaurant_id
      LEFT JOIN users u ON r.user_id = u.user_id
    `;
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting reviews:", err);
    res.status(500).send("Error");
  }
});

app.post('/api/reviews', async (req, res) => {
 const { rating, comment, restaurant_id } = req.body;

  try {
const query = 'INSERT INTO review (restaurant_id, rating, comment) VALUES (?, ?, ?);';
const [result] = await connection.promise().query(query, [restaurant_id, rating, comment]);

    res.status(201).json({ message: "Review submitted successfully", review_id: result.insertId });
  } catch (err) {
    console.error("Error inserting review:", err);
    return res.status(500).json({ error: "Error inserting review" });
  }
});

// === GET REVIEWS (PUBLIC) ===
// app.get('/api/reviews', async (req, res) => {
//   const query = `
//     SELECT r.review_id, r.rating, r.comment, u.name, rest.name AS restaurant_name
//     FROM review r
//     JOIN users u ON r.user_id = u.user_id
//     JOIN restaurant rest ON r.restaurant_id = rest.restaurant_id
//   `;
//   const [results] = await connection.promise().query(query);
//   res.json(results);
// });

// === POST REVIEW (CUSTOMER or ADMINDDEV) ===
// app.post('/api/reviews', authenticateToken, authorizeRoles('customer', 'admindev'), async (req, res) => {
//   const { restaurant_id, rating, comment } = req.body;
//   const user_id = req.user.user_id;

//   await connection.promise().query(
//     'INSERT INTO review (user_id, restaurant_id, rating, comment) VALUES (?, ?, ?, ?)',
//     [user_id, restaurant_id, rating, comment]
//   );

//   res.status(201).json({ message: 'Review submitted' });
// });


// Get all restaurants for dropdown
app.get('/api/restaurants', async (req, res) => {
  try {
    const query = 'SELECT restaurant_id, name FROM restaurant';
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error("Error getting restaurants:", err);
    res.status(500).send("Error");
  }
});

// Deals 
app.get('/api/deals', async (req, res) => {
  try {
    const query = "SELECT * FROM deal";
    const [results] = await connection.promise().query(query);
    res.json(results);
  } catch (err) {
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
  const { email, name, phone, diet, payment } = req.body;

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

app.get("/api/update-profile", async (req, res) => {
  const { email } = req.query;

  try {
    const [result] = await connection.promise().query(
      'SELECT email, name, phone, diet, payment FROM users WHERE email = ?', [email]
    );
    res.json(result[0]);
  } catch (err) {
    console.error("Error getting updated profile:", err);
    return res.status(500).json({ error: "Error getting updated profile" });
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

