import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();
  if (method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ success: false, error: "An unexpected error occurred" });
    }
  }
}

export default handler;
