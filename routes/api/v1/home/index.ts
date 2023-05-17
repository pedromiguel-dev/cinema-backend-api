import { verify } from "crypto";
import express, { Request, Response } from "express";
import verifyRoles from "../../../../middleware/verifyRoles";
import homeController from "../../../../controller/homeController";
const homeRouter = express.Router();

homeRouter.route("^/$").get(verifyRoles([30, 200]), homeController);

export default homeRouter;
