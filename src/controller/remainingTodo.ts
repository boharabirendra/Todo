import { Request, Response } from "express";
import * as RemainingTodoService from "../service/remainingTodo"

export function fetchRemainingTodo(req: Request, res: Response){
    const result = RemainingTodoService.fetchFinishedTodo();
    res.json({result});
}