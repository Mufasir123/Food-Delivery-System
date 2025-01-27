import express from "express";
import multer from "multer";
import fs from "fs";
import {
  createMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.get("/items", getAllMenuItems);
router.post("/items", authMiddleware, upload.single("image"), createMenuItem);
router.put("/update/:id", authMiddleware, updateMenuItem);
router.delete("/items/:id", authMiddleware, deleteMenuItem);

export default router;
