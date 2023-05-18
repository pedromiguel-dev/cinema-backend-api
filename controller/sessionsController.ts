import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllSessions = async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    if (page < 1) return res.status(400).json({ message: "Invalid page number" });

  const sessions = await prisma.session.findMany(
    {
        skip: (page - 1) * 10,
        take: 10,
        include: {
            Movie: true,
            Theatre: true
        }
    }
  );
  const maxPages = await prisma.session.count() / 10;
  res.json({sessions, maxPages: Math.ceil(maxPages) });
};

const sessionsController = {
  getAllSessions,
};
export default sessionsController;
