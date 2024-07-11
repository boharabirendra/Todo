import express from "express";
import * as UserController from "../controller/users";
import { auth } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";
import { createUserBodySchema, updateBodySchema } from "../schema/user";

const router = express();

router.post(
  "/signup",
  validateReqBody(createUserBodySchema),
  auth,
  UserController.signup
);
router.get("/", auth, UserController.getUsers);
router.get("/:id", auth, UserController.fetchUserById);
router.put(
  "/:id",
  validateReqBody(updateBodySchema),
  auth,
  UserController.updateUser
);
router.delete("/:id", auth, UserController.deleteUserById);

export default router;
