import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllTheatres = async (req: Request, res: Response) => {
  const theatre = await prisma.theatre.findMany();
  console.log(theatre);
  res.json(theatre);
};

const theatreController = {
  getAllTheatres,
};

export default theatreController;
