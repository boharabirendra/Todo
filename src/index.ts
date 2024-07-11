import express from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandling";

const app = express();
app.use(express.json());

app.use(router);
app.use(genericErrorHandler);
app.use(notFoundError);

app.listen(config.port, ()=>{
    console.log(`Server started at ${config.port}`);
})



