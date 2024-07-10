import express from "express";
import * as RefreshController from "../controller/refresh";
const router = express();


router.get("/", RefreshController.refreshToken);

export default router;