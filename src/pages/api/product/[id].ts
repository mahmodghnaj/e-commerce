import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import imagekit from "@/lib/cloudinary";
import fs from "fs";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import authMiddleware from "@/middlewares/authMiddleware";
import isAdminMiddleware from "@/middlewares/isAdminMiddleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Product ID is required and must be a string.",
    });
  }

  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);

      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else if (req.method === "PUT") {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Form parsing error" });
      }

      const { name, price, description } = fields;
      const imageFile = files.image as File[];

      try {
        const product = await Product.findById(id);
        if (!product) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }

        if (name) product.name = name[0];
        if (price) product.price = Number(price[0]);
        if (description) product.description = description[0];

        if (imageFile) {
          const imageData = await fs.promises.readFile(imageFile[0].filepath);
          const uploadResult = await imagekit.upload({
            file: imageData,
            fileName: imageFile[0].originalFilename || "uploaded_image",
            folder: "products",
          });
          product.imageUrl = uploadResult.url;
        }

        await product.save();

        res.status(200).json({ success: true, data: product });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Update failed" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      await product.deleteOne();
      res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ success: false, message: "Delete failed" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default authMiddleware(isAdminMiddleware(handler));
