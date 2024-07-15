import express from "express";
import * as UserController from "../controller/users";
import { auth } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { createUserBodySchema, updateBodySchema } from "../schema/user";
import { authorize } from "../middleware/authorize";
import { ROLES } from "../utils/enum";
import { paramsSchema } from "../schema/common";

const router = express();
/**Create user */
router.post(
  "/signup",
  validateReqBody(createUserBodySchema),
  auth,
  authorize(ROLES.ADMIN),
  UserController.signup
);

/**Fetch all users */
router.get("/", 
  auth, 
  authorize(ROLES.ADMIN), 
  UserController.getUsers);

/**Fetch user by id */
router.get(
  "/:id",
  validateReqParams(paramsSchema),
  auth,
  authorize(ROLES.ADMIN),
  UserController.fetchUserById
);

/**Update user */
router.put(
  "/:id",
  validateReqParams(paramsSchema),
  validateReqBody(updateBodySchema),
  auth,
  authorize(ROLES.ADMIN),
  UserController.updateUser
);

/**Delete user by id */
router.delete(
  "/:id",
  validateReqParams(paramsSchema),
  auth,
  authorize(ROLES.ADMIN),
  UserController.deleteUserById
);

export default router;
