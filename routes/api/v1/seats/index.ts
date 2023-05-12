import seatsController from "../../../../controller/seatsController";
import express, { Request, Response } from "express";
import verifyJWT from "../../../../middleware/verifyJWT";
const seatsRouter = express.Router();

seatsRouter.route("^/$").get(verifyJWT, seatsController.getAllSeats);

seatsRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default seatsRouter;
