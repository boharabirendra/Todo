import express from "express";
import {
  addTodo,
  deleteTodoById,
  fetchTodoById,
  fetchTodos,
  updateTodo,
} from "../controller/todos";
import { auth } from "../middleware/auth";

const router = express();

router.post("/", auth, addTodo);

export default router;
