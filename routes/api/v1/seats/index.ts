import seatsController from "../../../../controller/seatsController";
import express, { Request, Response } from "express";
import verifyJWT from "../../../../middleware/verifyJWT";
const seatsRouter = express.Router();

seatsRouter.route("^/$").get(seatsController.getAllSeats);

export default seatsRouter;
