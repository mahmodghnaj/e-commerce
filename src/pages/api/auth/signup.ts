import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import {
  isValidEmail,
  isValidPassword,
  hashPassword,
  createToken,
  setTokenCookie,
} from "@/utils/authUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { username, email, password } = req.body;

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
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        isAdmin: false,
      });

      const token = createToken({
        userId: newUser._id,
        email: newUser.email,
        username: newUser.username,
      });

      setTokenCookie(res, token);

      res.status(201).json({
        success: true,
        data: { username: newUser.username, email: newUser.email },
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
