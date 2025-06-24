import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  try {
    const { username, email, password, address } = req.body;
    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const existing = await sql`SELECT * FROM Users WHERE email = ${email}`;
    if (existing.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await sql`
      INSERT INTO users (username, email, password, address)
      VALUES (${username}, ${email}, ${hashedPassword}, ${address})
      RETURNING id, username, email, address
    `;
    res.status(201).json(user[0]);
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const users = await sql`SELECT * FROM Users WHERE email = ${email}`;
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email, address: user.address } });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
