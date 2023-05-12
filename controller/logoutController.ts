import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";

const handleLogout = async (req: Request, res: Response) => {
  //on the client delete the  acessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const userFound = await prisma.user.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!userFound) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(500);
  if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(500);

  await prisma.user.update({
    data: {
      refreshToken: "",
    },
    where: {
      id: userFound.id,
    },
  });

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure true -- only serves on https
  return res.sendStatus(204);
};

const logoutController = {
  handleLogout,
};

export default logoutController;
