import mongoose, { Document, Model, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

const ProductSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
