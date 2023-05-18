import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path: '.env'})

const verifyLoginCredentialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Please fill all the fields" });
  }

  //verify if the email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });
  next();
};

const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //eval password
  const userFound = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });
  if (!userFound) return res.status(401).json({ error: "User not found" });

  const match = await bcrypt.compare(password, userFound.password);
  if (match) {
    //define roles
    const roles = userFound.role;

    //creating jwt
    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(403);
    if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(403);

    const accessToken = jwt.sign({ user_info: { name: userFound.email, roles } }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ name: userFound.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });

    //save refresh token in database
    const user = await prisma.user.update({
      data: {
        refreshToken,
      },
      where: {
        id: userFound.id,
      },
    });

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json([{ roles, accessToken }]);
  } else {
    res.status(401).json({ error: "Credencials may be incorrect." });
  }
};

const authController = {
  verifyLoginCredentialsMiddleware,
  handleLogin,
};

export default authController;
