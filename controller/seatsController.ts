import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllSeats = async (req: Request, res: Response) => {
  const seats = await prisma.seat.findMany();
  console.log(seats);
  res.json(seats);
};

const seatsController = {
  getAllSeats,
};
export default seatsController;
