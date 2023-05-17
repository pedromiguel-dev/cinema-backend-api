import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";
import bcrypt from "bcrypt";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { role: true } });
  res.json(users);
};

const verifyUserCredencialsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  //verify if the email is valid
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: "Please enter a valid email" });

  const duplicateEmailOrUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });

  if (duplicateEmailOrUser) return res.status(400).json({ error: "Email or username already exists" });
  next();
};
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    //encript password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: {
          connect: [{ id: 200 }],
        },
      },
    });
    return res.status(201).json({ success: `New user ${name} created.` });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const usersController = { getAllUsers, verifyUserCredencialsMiddleware, registerUser };

export default usersController;
