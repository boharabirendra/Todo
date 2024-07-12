import express from "express";
import * as TodoController from "../controller/todos";
import { auth } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { createTodoSchema, updateTodoSchema } from "../schema/todo";
import { authorize } from "../middleware/authorize";
import { ROLES } from "../utils/enum";
import { paramsSchema } from "../schema/common";

const router = express();

/**Fetch todos */
router.get("/", auth, TodoController.fetchTodos);

/**Fetch todo by id */
router.get(
  "/:id",
  validateReqParams(paramsSchema),
  auth,
  TodoController.fetchTodoById
);

/**Add todo */
router.post(
  "/",
  validateReqBody(createTodoSchema),
  auth,
  authorize(ROLES.USER),
  TodoController.addTodo
);

/**Add todo */
router.delete(
  "/:id",
  validateReqParams(paramsSchema),
  auth,
  TodoController.deleteTodoById
);

/**Update todo */
router.put(
  "/:id",
  validateReqBody(updateTodoSchema),
  auth,
  TodoController.updateTodo
);

/**Mark todo as done */
router.put(
  "/done/:id",
  validateReqParams(paramsSchema),
  auth,
  TodoController.finishTask
);

/**Fetch done todos */
router.get("/f", auth, TodoController.fetchFinishedTask);

export default router;
