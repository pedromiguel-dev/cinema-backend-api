import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/cleint";

interface NewReuqest extends Request {
  user?: any;
}

const getUserInformation = async (req: NewReuqest, res: Response) => {
  if (!req?.user) return res.sendStatus(403);
  console.log(req?.user);
  return res.sendStatus(200);
};

export default getUserInformation;
