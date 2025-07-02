import dotenv from "dotenv";
dotenv.config();

// routes/imagekit.js
import express from "express";
const router = express.Router();
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

router.get("/get-imagekit-signature", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json(result); // 👈 this must return JSON
});

export default router;
