import dotenv from "dotenv";
dotenv.config();

// routes/uploadRoute.js

import express from "express";
import multer from "multer";
import ImageKit from "imagekit";
import { adminDB } from "../firebaseAdmin.js";
import { Timestamp } from "firebase-admin/firestore";




const router = express.Router();

// Use multer memory storage for direct buffer access
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ImageKit config
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// POST /api/upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { uploadedBy = "Anonymous", email = "unknown", title = "" } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Upload file to ImageKit
    const result = await imagekit.upload({
      file: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "devbridge_uploads",
    });

    // Save metadata to Firestore via Admin SDK
    await adminDB.collection("uploads").add({
      fileName: title || file.originalname,
      fileUrl: result.url,
      uploadedBy,
      email,
      timestamp: Timestamp.now(),
    });

    res.status(200).json({ success: true, url: result.url });
  } catch (err) {
    console.error("ImageKit Upload Error:", err.message);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
