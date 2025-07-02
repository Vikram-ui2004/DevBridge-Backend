import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Signature route
router.get("/get-imagekit", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.json(result);
  } catch (err) {
    console.error("❌ ImageKit Signature Error:", err.message);
    res.status(500).json({ error: "Failed to generate signature" });
  }
});

export default router;
