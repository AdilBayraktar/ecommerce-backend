const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dbConnection = require("./config/db");
const ApiError = require("./utils/apiError");
const { stack } = require("./routes/categoryRoute");
const globalErrorHandler = require("./middlewares/errorHandler");
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

// Error Handler
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Api");
});
const PORT = process.env.PORT;
const server = app.listen(PORT || 2000, () => {
  console.log(`Server Running ${PORT}`);
});

// Unhandled Rejection Handler
process.on("unhandledRejection", (err) => {
  console.error(err.name, err.message);
  console.error(`UNHANDLED REJECTION ERROR: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down!....");
    process.exit(1);
  });
});
