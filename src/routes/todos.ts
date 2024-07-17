import express from "express";
import * as TodoController from "../controller/todos";
import { auth } from "../middleware/auth";
import {
  validateReqBody,
  validateReqParams,
  validateReqQuery,
} from "../middleware/validator";
import {
  createTodoSchema,
  getTodoQuerySchema,
  updateTodoSchema,
} from "../schema/todo";
import { authorize } from "../middleware/authorize";
import { ROLES } from "../utils/enum";
import { getParamsSchema, getUserQuerySchema } from "../schema/common";

const router = express();

/**Add todo */
router.post(
  "/",
  validateReqBody(createTodoSchema),
  auth,
  authorize("todo.create"),
  TodoController.addTodo
);

/**Fetch done todos */
router.get("/done", auth, authorize("todo.get"), TodoController.getDoneTodos);

/**Fetch todos */
router.get(
  "/",
  validateReqQuery(getTodoQuerySchema),
  auth,
  authorize("user.create"),
  TodoController.getTodos
);

// /**Fetch todo by id */
router.get(
  "/:id",
  validateReqParams(getParamsSchema),
  auth,
  TodoController.getTodoById
);

/**Add todo */
router.delete(
  "/:id",
  validateReqParams(getParamsSchema),
  auth,
  TodoController.deleteTodoById
);

/**Update todo */
router.put(
  "/:id",
  validateReqBody(updateTodoSchema),
  validateReqParams(getParamsSchema),
  auth,
  authorize("todo.update"),
  TodoController.updateTodo
);

/**Mark todo as done */
router.put(
  "/done/:id",
  validateReqParams(getParamsSchema),
  auth,
  authorize("todo.update"),
  TodoController.markTodoAsDone
);



export default router;
