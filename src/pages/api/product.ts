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

  if (req.method === "POST") {
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

      if (!name || !price || !description || !imageFile) {
        return res.status(400).json({
          success: false,
          message: "All fields are required, including image.",
        });
      }

      try {
        const imageData = await fs.promises.readFile(imageFile[0].filepath);

        const uploadResult = await imagekit.upload({
          file: imageData,
          fileName: imageFile[0].originalFilename || "uploaded_image",
          folder: "products",
        });

        const newProduct = new Product({
          name: name[0],
          price: price[0],
          description: description[0],
          imageUrl: uploadResult.url,
        });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
      } catch (uploadError) {
        console.error("ImageKit upload error:", uploadError);
        res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }
    });
  } else if (req.method === "GET") {
    const { page = 1, limit = 20 } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || isNaN(limitNum)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or limit parameter",
      });
    }

    try {
      const total = await Product.countDocuments();
      const products = await Product.find()
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      res.status(200).json({
        success: true,
        data: products,
        hasNextPage: pageNum * limitNum < total,
        total,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
};

export default authMiddleware(isAdminMiddleware(handler));
