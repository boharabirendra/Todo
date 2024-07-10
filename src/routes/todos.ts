import express from "express";
import {
  addTodo,
} from "../controller/todos";
import { auth } from "../middleware/auth";

const router = express();

router.post("/", auth, addTodo);

export default router;
