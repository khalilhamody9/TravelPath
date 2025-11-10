import express from "express";
import cors from "cors";
import { CONFIG } from "./env.js";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: CONFIG.CORS_ORIGINS, credentials: true }));

app.get("/", (_req, res) => res.send("API is up"));
app.use("/api/auth", authRoutes);
app.use((req, res) => res.status(404).json({ message: "Not found" }));

connectDB().then(() => {
  app.listen(CONFIG.PORT, () => console.log(`🚀 Server on http://localhost:${CONFIG.PORT}`));
}).catch((e) => {
  console.error("DB connection failed:", e?.message); process.exit(1);
});
