import express from "express";
import * as AuthController from "../controller/auth";
const router = express();

router.post("/login", AuthController.login);

export default router;