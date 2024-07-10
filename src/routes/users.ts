import express from "express";
import * as UserController from "../controller/users";
import { auth } from "../middleware/auth";

const router = express();

router.post("/signup", UserController.signup);
router.get("/", auth, UserController.getUsers);
router.delete("/:id", auth, UserController.deleteUserById)

export default router;
