import express from "express";
import cors from "cors";
import { CONFIG } from "./env.js";
import { connectDB } from "./db.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: CONFIG.CORS_ORIGINS, credentials: true }));

// Health
app.get("/", (_req, res) => res.send("API is up"));

// Routes
app.use("/api/auth", authRouter);

// Start
await connectDB();
app.listen(CONFIG.PORT, () => {
  console.log(`🚀 Server on http://localhost:${CONFIG.PORT}`);
});
