import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
const fsPromisses = require("fs").promises;
import path from "path";

const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), "ddMMyyyy\tHH:mm:ss")}`;
  //log itself
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    //create if not exists
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromisses.mkdir(path.join(__dirname, "..", "logs"));
    }
    //write log into the logname
    await fsPromisses.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
  } catch (error) {
    console.log(error);
  }
};

//middleware logger, for visits
const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
  next();
};

const logEventsController = { logger, logEvents };

export default logEventsController;
