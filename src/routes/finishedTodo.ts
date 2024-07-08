import express from "express";
import { fetchFinishedTodo } from "../controller/finishedTodo";

const router = express();


router.get("/", fetchFinishedTodo);


export default router;