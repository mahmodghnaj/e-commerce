import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import User from "@/models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const setTokenCookie = (res: NextApiResponse, token: string): void => {
  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=900`);
};
