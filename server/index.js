import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";

// Configuration
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Database configuration
const MYSQLPASS = process.env.MYSQLPASS;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: MYSQLPASS,
  database: "test",
});

// Routes
app.get("/", (req, res) => {
  res.json("Hello this is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`, `price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("Book has been created successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("Book has been deleted successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("Book has been updated successfully.");
  });
});

// Server
app.listen(8800, () => {
  console.log("Connected to server on port 8800");
});
