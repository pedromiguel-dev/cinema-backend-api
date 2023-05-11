import authController from "../../../../controller/authController";
import express, { Request, Response } from "express";
const authRouter = express.Router();

authRouter.route("^/$").post(authController.verifyLoginCredencialsMiddleware, authController.handleLogin);

authRouter.route("^/:id").get((req: Request, res: Response) => {
  res.send("Empregado " + req.params.id);
});
export default authRouter;
