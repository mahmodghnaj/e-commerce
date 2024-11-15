import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
