import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const usersController = { getAllUsers };

export default usersController;
