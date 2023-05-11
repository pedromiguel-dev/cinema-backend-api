import sessionsController from "../../../../controller/sessionsController";
import express, { Request, Response } from "express";
const sessionsRouter = express.Router();

sessionsRouter.route("^/$").get(sessionsController.getAllSessions);

sessionsRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default sessionsRouter;
