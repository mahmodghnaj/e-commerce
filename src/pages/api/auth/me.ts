import dbConnect from "@/lib/dbConnect";
import authMiddleware, {
  AuthenticatedRequest,
} from "@/middlewares/authMiddleware";
import User from "@/models/user";
import { NextApiResponse } from "next";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    await dbConnect();
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

export default authMiddleware(handler);
