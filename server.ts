import { Request, Response } from "express";
import express from "express";
import rootRouterV1 from "./routes/api/v1";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import logEventsController from "./middleware/logEvents";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials";

const app = express();

const PORT = process.env.PORT || 8090;

app.use(credentials);
//custom middleware logger
app.use(logEventsController.logger);

//cross-origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("^/api/v1", rootRouterV1);

app.all("*", (Request: Request, Response: Response) => {
  Response.status(404).send("Página não encontrada");
});

//error handler logger
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
