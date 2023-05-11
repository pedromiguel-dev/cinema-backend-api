import express, { Request, Response } from "express";
//routers
import moviesRouter from "./movies";
import usersRouter from "./users";
import seatsRouter from "./seats";
import theatresRouter from "./theatre";
import sessionsRouter from "./sessions";
//root
const rootRouterV1 = express.Router();

rootRouterV1.use("^/$", usersRouter);
rootRouterV1.use("^/seats$", seatsRouter);
rootRouterV1.use("^/theatres$", theatresRouter);
rootRouterV1.use("^/movies$", moviesRouter);
rootRouterV1.use("^/sessions$", sessionsRouter);

export default rootRouterV1;
