import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const userFound = await prisma.user.findFirst({
    where: {
      refreshToken,
    },
    include: {
      role: true,
    },
  });
  if (!userFound) return res.status(403);

  if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(403);

    if (err || userFound.name !== decoded.name) return res.sendStatus(403);
    const roles = userFound.role;
    const accessToken = jwt.sign({ user_info: { name: decoded.name, roles } }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10s",
    });
    return res.json({ accessToken });
  });
};

const refreshTokenController = {
  handleRefreshToken,
};

export default refreshTokenController;
