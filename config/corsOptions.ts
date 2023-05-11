import cors, { CorsOptions } from "cors";

//cros origin resouse sharing
const whitelist = ["http://127.0.0.1:5500", "http://127.0.0.1:8080"];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
