import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import {
  isValidEmail,
  isValidPassword,
  comparePassword,
  createToken,
  setTokenCookie,
} from "@/utils/authUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = createToken({
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      });
      setTokenCookie(res, token);

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        message: "Login successful",
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
