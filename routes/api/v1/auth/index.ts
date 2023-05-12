import authController from "../../../../controller/authController";
import express, { Request, Response } from "express";
const authRouter = express.Router();

authRouter.route("^/$").post(authController.verifyLoginCredencialsMiddleware, authController.handleLogin);

export default authRouter;
