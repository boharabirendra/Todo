import { Request, Response } from "express";
import * as FinishedTodoService from "../service/finishedTodo";

export function fetchFinishedTodo(req: Request, res: Response){
    const result = FinishedTodoService.fetchFinishedTodo();
    res.json({result});
}