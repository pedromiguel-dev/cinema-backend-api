import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllSessions = async (req: Request, res: Response) => {
  const sessions = await prisma.session.findMany();
  console.log(sessions);
  res.json(sessions);
};

const sessionsController = {
  getAllSessions,
};
export default sessionsController;
