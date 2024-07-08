import todoRouter from "./todo";
import finishedTodoRouter from "./finishedTodo";
import remainingTodoRouter from "./remainingTodo"
import express from "express";

const router = express();

router.use("/todos",todoRouter);
router.use("/finished", finishedTodoRouter);
router.use("/remaining", remainingTodoRouter);

export default router;

