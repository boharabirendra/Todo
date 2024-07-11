import express from "express";
import * as TodoController from "../controller/todos";
import { auth } from "../middleware/auth";
import { validateReqBody } from "../middleware/validator";
import { createTodoSchema, updateTodoSchema } from "../schema/todo";

const router = express();
router.get("/", auth, TodoController.fetchTodos);
router.get("/:id", auth, TodoController.fetchTodoById);
router.post(
  "/",
  validateReqBody(createTodoSchema),
  auth,
  TodoController.addTodo
);
router.delete("/:id", auth, TodoController.deleteTodoById);
router.put(
  "/:id",
  validateReqBody(updateTodoSchema),
  auth,
  TodoController.updateTodo
);
router.put("/done/:id", auth, TodoController.finishTask);
router.get("/f", auth, TodoController.fetchFinishedTask);

export default router;
