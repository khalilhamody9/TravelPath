import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CONFIG } from "../env.js";
import { User } from "../models/User.js";

const sign = (payload) => jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name = "", email = "", password = "" } = req.body || {};
    if (!name.trim() || !email.trim() || !password)
      return res.status(400).json({ message: "Name, email and password are required" });
    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash });
    const token = sign({ uid: user.id });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: "Email already registered" });
    console.error(e); res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body || {};
    if (!email.trim() || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = sign({ uid: user.id });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error(e); res.status(500).json({ message: "Server error" });
  }
};

export const me = async (req, res) => {
  const user = await User.findById(req.user?.uid).select("name email");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
};
