import express from "express";
import * as AuthController from "../controller/auth";
import { validateReqBody } from "../middleware/validator";
import { loginBodySchema } from "../schema/user";
const router = express();

router.post("/login",validateReqBody(loginBodySchema),  AuthController.login);

export default router;