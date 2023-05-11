import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";
import bcrypt from "bcrypt";

const verifyLoginCredencialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
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
    //TODO: create JWTs
    return res.json({ success: `User ${name} is logged in!` });
  } else {
    res.status(401).json({ message: "Credencials may be incorrect." });
  }
};

const authController = {
  verifyLoginCredencialsMiddleware,
  handleLogin,
};

export default authController;
