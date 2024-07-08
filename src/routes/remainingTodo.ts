import express from "express";
import { fetchRemainingTodo } from "../controller/remainingTodo";


const router = express();


router.get("/", fetchRemainingTodo);


export default router;