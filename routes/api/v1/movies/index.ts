import moviesController from "../../../../controller/moviesController";
import express, { Request, Response } from "express";
import verifyJWT from "../../../../middleware/verifyJWT";
const moviesRouter = express.Router();

moviesRouter.route("^/$").get(moviesController.getAllMovies).post(verifyJWT, moviesController.postMovies);

moviesRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default moviesRouter;
