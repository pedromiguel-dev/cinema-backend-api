import moviesController from "../../../../controller/moviesController";
import express, { Request, Response } from "express";
const moviesRouter = express.Router();

moviesRouter.route("^/$").get(moviesController.getAllMovies).post(moviesController.postMovies);

moviesRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default moviesRouter;
