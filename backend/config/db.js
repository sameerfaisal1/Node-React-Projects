// =============================================
// config/db.js
// This file connects our app to MySQL database
// =============================================

const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool (better than single connection)
// A pool reuses connections instead of creating new ones every time
const pool = mysql.createPool({
  host: "localhost", // e.g. localhost
  user: "root", // e.g. root
  password: "4584", // your MySQL password
  database: "student_management", // student_management
  waitForConnections: true,
  connectionLimit: 10, // max 10 connections at a time
  queueLimit: 0,
});

// Convert pool to use Promises so we can use async/await
const promisePool = pool.promise();

module.exports = promisePool;
