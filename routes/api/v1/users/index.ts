import usersController from "../../../../controller/usersController";
import express, { Request, Response } from "express";
import verifyRoles from "../../../../middleware/verifyRoles";
import verifyJWT from "../../../../middleware/verifyJWT";
const usersRouter = express.Router();

usersRouter
  .route("^/$")
  .get(verifyJWT, verifyRoles([100, 30, 200]), usersController.getAllUsers)
  .post(usersController.verifyUserCredencialsMiddleware, usersController.registerUser);

usersRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default usersRouter;
