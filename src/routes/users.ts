import express from "express";
import * as UserController from "../controller/users";
import { auth } from "../middleware/auth";

const router = express();

router.post("/signup", auth, UserController.signup);
router.get("/", auth, UserController.getUsers);
router.get("/:id", auth, UserController.fetchUserById);
router.put("/:id", auth, UserController.updateUser);
router.delete("/:id", auth, UserController.deleteUserById);

export default router;
