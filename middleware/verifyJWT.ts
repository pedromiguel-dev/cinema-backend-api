import { Response, Request, NextFunction } from "express";
import jwt, { DecodeOptions, VerifyOptions } from "jsonwebtoken";
import dotenv from "dotenv/config";

export default function verifyJWT(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.user_info.name;
    req.roles = decoded.user_info.roles;
    next();
  });
}
