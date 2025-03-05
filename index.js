const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");
dotenv.config({ path: ".env" });
const app = express();

// Database Connection
dbConnection();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/v1/categories", require("./routes/categoryRoute"));

app.get("/", (req, res) => {
  res.send("Api");
});
const PORT = process.env.PORT;
app.listen(PORT || 2000, () => {
  console.log(`Server Running ${PORT}`);
});
