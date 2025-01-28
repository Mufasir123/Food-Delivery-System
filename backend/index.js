import express from "express";
import cors from "cors";
import { connectDB } from "./utils/dataBase.js";
import userRouter from "./routes/userRouter.js";
import orderRoutes from "./routes/orderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  `${process.env.FRONTEND_URL}`,
  `${process.env.FRONTEND_URL}/*`,
  `${process.env.ADMIN_URL}`,
  `${process.env.ADMIN_URL}/*`,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

connectDB();

// api endpoin
// app.use('/images',express.static('uploads'))
app.use("/images", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/user", userRouter);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
