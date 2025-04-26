import mysql from "mysql2";

// Create connection
const db = mysql.createConnection({
  host: "shuttle.proxy.rlwy.net",
  user: "root",
  password: "gaGywYbfGVPUKCTKuwnOQNiCRifEfRbP",
  database: "railway",
  port: 13663
});

// Connect and test
db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err);
    return;
  }
  console.log("✅ Connected to Railway MySQL database!");

  // Example Query: Select all from users table
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error("❌ Query error:", error);
    } else {
      console.log("✅ Query results:", results);
    }
    db.end(); // Close connection after query
  });
});
