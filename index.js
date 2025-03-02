const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: ".env" });
const app = express();

// Database Connection
mongoose
  .connect(process.env.DB_URI)
  .then((connection) => {
    console.log(`Database Connected: ${connection.connection.host}`);
  })
  .catch((err) => {
    console.log(`Database Connection Error: ${err}`);
    process.exit(1);
  });

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.send("Api");
});
const PORT = process.env.PORT;
app.listen(PORT || 2000, () => {
  console.log(`Server Running ${PORT}`);
});
