import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import authMiddleware from "@/middlewares/authMiddleware";
import isAdminMiddleware from "@/middlewares/isAdminMiddleware";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  const baseUrl = process.env.BASE_URL;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const form = formidable({
          multiples: false,
          keepExtensions: true,
          uploadDir: "./public/uploads",
          maxFileSize: 10 * 1024 * 1024,
          filename: (name, ext, path) => `${Date.now()}${ext}`,
        });

        form.parse(req, async (err, fields, files) => {
          if (err) {
            return res
              .status(500)
              .json({ success: false, error: "Form parsing error" });
          }

          const { name, price, description } = fields;
          const imageFileArray = files.image as File[];

          const imageFile = imageFileArray[0];

          if (!name || !price || !description || !imageFile) {
            return res.status(400).json({
              success: false,
              message: "All fields are required, including image.",
            });
          }

          if (!imageFile?.filepath) {
            return res.status(400).json({
              success: false,
              message: "Image file path is undefined",
            });
          }

          const imageFileName = `${Date.now()}${path.extname(
            imageFile.filepath
          )}`;
          const imagePath = path.join("./public/uploads", imageFileName);

          fs.renameSync(imageFile.filepath, imagePath);

          const imageUrl = `${baseUrl}/uploads/${imageFileName}`;

          const newProduct = new Product({
            name: name[0],
            price: price[0],
            description: description[0],
            imageUrl: imageUrl,
          });

          await newProduct.save();

          res.status(201).json({ success: true, data: newProduct });
        });
      } catch (error) {
        console.error("Error during product creation:", error);
        res
          .status(400)
          .json({ success: false, error: "Product creation failed" });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res
            .status(404)
            .json({ success: false, message: "Product not found" });
        }

        // Delete the image file from the file system
        if (deletedProduct.imageUrl) {
          const imagePath = path.join(
            "./public/uploads",
            path.basename(deletedProduct.imageUrl)
          );
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }

        res.status(200).json({ success: true, data: deletedProduct });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default authMiddleware(isAdminMiddleware(handler));
