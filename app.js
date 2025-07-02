const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
require("./config/passport");
const cookieParser = require("cookie-parser");




const authRoutes = require("./routes/authRoutes");
const uploadRoute = require("./routes/upload");
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo Error:", err));



// Routes

app.use(session({ secret: "your_secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes

app.use("/api/auth", authRoutes);


app.use("/api", uploadRoute);

module.exports = app;
