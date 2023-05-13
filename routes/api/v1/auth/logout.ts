import logoutController from "../../../../controller/logoutController";
import express, { Request, Response } from "express";
const logoutRouter = express.Router();

logoutRouter.route("^/$").get(logoutController.handleLogout);

export default logoutRouter;
