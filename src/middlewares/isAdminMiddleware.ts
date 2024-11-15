import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { AuthenticatedRequest } from "./authMiddleware";

const isAdminMiddleware =
  (handler: NextApiHandler) =>
  (req: AuthenticatedRequest, res: NextApiResponse) => {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    return handler(req, res);
  };

export default isAdminMiddleware;
