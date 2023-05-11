import { Request, Response } from "express";
import prisma from "../prisma/cleint";

const getAllMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movies.findMany();
  res.json(movies);
};

const postMovies = async (req: Request, res: Response) => {
  //   const movie = req.body;
  const movie = await prisma.movies.create({
    data: {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      duration: req.body.duration,
    },
  });
  res.status(200).json(movie);
};

const moviesController = { getAllMovies, postMovies };
export default moviesController;
