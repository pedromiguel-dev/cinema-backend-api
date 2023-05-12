import refreshTokenController from "../../../../controller/refreshTokenController";
import express, { Request, Response } from "express";
const refreshRouter = express.Router();

refreshRouter.route("^/$").get(refreshTokenController.handleRefreshToken);

export default refreshRouter;
