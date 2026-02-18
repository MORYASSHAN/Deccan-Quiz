import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resultRouter from "./routes/resultRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../CRUD/dist")));

// Handle client-side routing (must come after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../CRUD/dist", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server error" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});