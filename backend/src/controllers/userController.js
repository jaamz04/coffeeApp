import { sql } from "../config/db.js";
import bcrypt from "bcryptjs";

export async function updateUserInfo(req, res) {
  try {
    const { id } = req.user; // from auth middleware
    const { username, email, address } = req.body;
    if (!username || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const updated = await sql`
      UPDATE users SET username = ${username}, email = ${email}, address = ${address}
      WHERE id = ${id}
      RETURNING id, username, email, address
    `;
    res.json(updated[0]);
  } catch (error) {
    console.error("Update Info Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updatePassword(req, res) {
  try {
    const { id } = req.user; // from auth middleware
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const users = await sql`SELECT * FROM users WHERE id = ${id}`;
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password = ${hashed} WHERE id = ${id}`;
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
