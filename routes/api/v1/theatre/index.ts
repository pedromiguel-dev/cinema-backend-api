import theatreController from "../../../../controller/theatreController";
import express, { Request, Response } from "express";
const theatresRouter = express.Router();

theatresRouter.route("^/$").get(theatreController.getAllTheatres);

theatresRouter.route("^/:id").get((req, res) => {
  res.send("Empregado " + req.params.id);
});
export default theatresRouter;
