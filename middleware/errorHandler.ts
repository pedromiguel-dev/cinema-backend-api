import { Request, Response, NextFunction } from "express";
import logEventsController from "./logEvents";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logEventsController.logEvents(`${err.name}: ${err.message}`, "errorLog.txt");
  console.log(err.stack);
  res.status(500).send(err.message);
};
export default errorHandler;
