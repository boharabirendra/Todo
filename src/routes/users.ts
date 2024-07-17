import express from "express";
import * as UserController from "../controller/users";
import { auth } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { createUserBodySchema, updateBodySchema } from "../schema/user";
import { authorize } from "../middleware/authorize";
import { ROLES } from "../utils/enum";
import { getParamsSchema, getUserQuerySchema } from "../schema/common";

const router = express();
/**Create user */
router.post(
  "/signup",
  validateReqBody(createUserBodySchema),
  auth,
  authorize("user.create"),
  UserController.signup
);



// /**Fetch user by id */
router.get(
  "/",
  validateReqParams(getUserQuerySchema),
  auth,
  authorize("user.get"),
  UserController.getUserById
);

/**Update user */
router.put(
  "/:id",
  validateReqParams(getUserQuerySchema),
  validateReqBody(updateBodySchema),
  auth,
  authorize("user.update"),
  UserController.updateUser
);

// /**Delete user by id */
router.delete(
  "/:id",
  validateReqParams(getParamsSchema),
  auth,
  authorize("user.delete"),
  UserController.deleteUserById
);

export default router;
