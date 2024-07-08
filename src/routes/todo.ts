import express from "express";
import {
  addTodo,
  deleteTodoById,
  fetchTodoById,
  fetchTodos,
  finishTask,
  updateTodo,
} from "../controller/todo";

const router = express();

router.get("/", fetchTodos);
router.get("/:id", fetchTodoById);
router.post("/", addTodo);
router.delete("/:id", deleteTodoById);
router.put("/", updateTodo);
router.put("/finish/:id", finishTask);

export default router;
