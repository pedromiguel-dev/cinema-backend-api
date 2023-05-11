const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

//custom middleware logger
app.use(logger);
//cros origin resouse sharing
const whitelist = ["http://127.0.0.1:5500", "http://127.0.0.1:8080"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("^/$", (req, res) => {
  res.send("Hello world!");
});

app.all("*", (req, res) => {
  res.status(404).send("Página não encontrada");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
