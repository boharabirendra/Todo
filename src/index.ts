import express from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandling";
import { requestLogger } from "./middleware/logger";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";

const app = express();
const limiter = rateLimiter({
    windowMs: 60000,
    limit: 10,
    message: "Too many request",
  })
  app.use(helmet());
  app.use(limiter);
  const allowedOrigin = ["https://www.test.com"];
  app.use(cors({
    origin: (origin, callback)=>{
      if(!origin || allowedOrigin.includes(origin)){
        callback(null, origin);limiter
      }else{
        callback(new Error("Not Allowed"));
      }
    }
  }))
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(config.port, ()=>{
    console.log(`Server started at ${config.port}`);
})



