import authMiddleware, {
  AuthenticatedRequest,
} from "@/middlewares/authMiddleware";
import { NextApiResponse } from "next";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({ success: true, data: req.user });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

export default authMiddleware(handler);
