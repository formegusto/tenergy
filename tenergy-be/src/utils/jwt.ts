import { Auth } from "@models/types";
import jwt from "jsonwebtoken";

export function generateToken(data: Auth, expiresIn: string): string {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(data, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
}

export function decryptToken(token: string): Auth {
  const secret = process.env.JWT_SECRET!;

  return jwt.verify(token, secret!) as Auth;
}
