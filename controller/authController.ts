import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const verifyLoginCredencialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json({ error: "Please fill all the fields" });
  }

  //verify if the email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });
  next();
};

const handleLogin = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  //eval password
  const userFound = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  if (!userFound) return res.status(401).json({ error: "User not found" });

  const match = await bcrypt.compare(password, userFound.password);

  if (match) {
    //creating jwt
    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(403);
    if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(403);

    const accessToken = jwt.sign({ name: name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
    const refreshToken = jwt.sign({ name: name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

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
    res.json([{ success: `User ${name} is logged in!` }, { accessToken }]);
  } else {
    res.status(401).json({ message: "Credencials may be incorrect." });
  }
};

const authController = {
  verifyLoginCredencialsMiddleware,
  handleLogin,
};

export default authController;
