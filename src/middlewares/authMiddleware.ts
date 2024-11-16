import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { IUser } from "@/models/user";

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
      const decoded = jwt.verify(token, JWT_SECRET) as Omit<IUser, "password">;
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  };

export default authMiddleware;
