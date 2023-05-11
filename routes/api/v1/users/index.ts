import usersController from "../../../../controller/usersController";
import express, { Request, Response } from "express";
const usersRouter = express.Router();

usersRouter
  .route("^/$")
  .get(usersController.getAllUsers)
  .post(usersController.verifyUserCredencialsMiddleware, usersController.registerUser);

usersRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default usersRouter;
