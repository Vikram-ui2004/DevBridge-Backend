// Load environment variables
import dotenv from "dotenv";
dotenv.config();


// Core Modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import uploadRoute from "./routes/uploadRoute.js";
import upload from "./routes/upload.js";
// Import Routes
import aiChatRoute from "./routes/aiChat.js";
import imagekitRoute from "./routes/imagekitRoute.js";
import post from "./routes/Post.js";

// Create app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://devbridge-app.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "devbridge_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//uplaod
app.use("/api", uploadRoute);
app.use("/api", upload);
// ImageKit Signature
app.use("/api/resume", imagekitRoute);
// Post Route
app.use("/api/post", post);
// AI Chat Route
app.use("/api/ai-chat", aiChatRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 DevBridge Backend is running!");
});



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log("✅ MongoDB connected successfully");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
