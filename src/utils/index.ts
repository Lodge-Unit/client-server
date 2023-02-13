import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getUserId = (authorization: string) => {
  if (!authorization) return;
  const bearerToken = authorization.split(" ");
  const token = bearerToken[1];
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, payload: any) => {
      return payload.userId;
    }
  );
};
