import express, { Request, Response } from "express";
//routers
import moviesRouter from "./movies";
import usersRouter from "./users";
import seatsRouter from "./seats";
import theatresRouter from "./theatre";
import sessionsRouter from "./sessions";
import authRouter from "./auth";
import verifyJWT from "../../../middleware/verifyJWT";
import refreshRouter from "./auth/refresh";
import logoutRouter from "./auth/logout";
import homeRouter from "./home";
//root
const rootRouterV1 = express.Router();

rootRouterV1.use("^/auth$", authRouter);
rootRouterV1.use("^/register$", usersRouter);
rootRouterV1.use("^/logout$", logoutRouter);
rootRouterV1.use("^/refresh$", refreshRouter);

rootRouterV1.use(verifyJWT);
rootRouterV1.use("^/home$", homeRouter);
rootRouterV1.use("^/movies$", moviesRouter);
rootRouterV1.use("^/seats$", seatsRouter);
rootRouterV1.use("^/theatres$", theatresRouter);
rootRouterV1.use("^/sessions$", sessionsRouter);

export default rootRouterV1;
