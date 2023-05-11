import { Request, Response } from "express";
import express from "express";
import rootRouterV1 from "./routes/api/v1";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import logEventsController from "./middleware/logEvents";
import errorHandler from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT || 8080;

//custom middleware logger
app.use(logEventsController.logger);

//cros origin resouse sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", rootRouterV1);
// app.use("^/$", require("./routes/api/v1/users"));
// app.use("^/seats$", require("./routes/api/v1/seats"));
// app.use("^/theatres$", require("./routes/api/v1/theatre"));
// app.use("^/movies$", require("./routes/api/v1/movies"));
// app.use("^/sessions$", require("./routes/api/v1/sessions"));

app.all("*", (Request: Request, Response: Response) => {
  Response.status(404).send("Página não encontrada");
});

//error handler logger
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
