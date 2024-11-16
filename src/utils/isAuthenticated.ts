import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const isAuthenticated = async (request: NextRequest) => {
  const token = request.cookies.get("token");
  if (!token?.value) return false;
  try {
    const decoded = await jwtVerify(
      token.value,
      new TextEncoder().encode(JWT_SECRET)
    );
    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
};
