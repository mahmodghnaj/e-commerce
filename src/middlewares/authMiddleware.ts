import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/user";
import dbConnect from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthenticatedRequest extends NextApiRequest {
  user?: Omit<IUser, "password">;
}

const authMiddleware =
  (handler: NextApiHandler) =>
  async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      await dbConnect();
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }
      req.user = user.toObject();
      return handler(req, res);
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };

export default authMiddleware;
