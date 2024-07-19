import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as TodoService from "../service/todos";
import loggerWithNameSpace from "../utils/logger";
import { GetTodoQuery } from "../interface/todo";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const logger = loggerWithNameSpace("TodoController");

export const addTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const todo = req.body;
    logger.info("Called addTodo");
    const response = await TodoService.addTodo(todo, todo.userId);
    if (!response) throw new ApiError(500, "Todo creation failed");
    res.status(HttpStatusCode.OK).json({
      message: "Todo created",
    });
  }
);

export const updateTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: todoId } = req.params;
    const todo = req.body;
    const { userId } = req.body;
    logger.info("Called updateTodo");
    const response = await TodoService.updateTodo(todo, todoId, userId);
    if (!response) throw new ApiError(404, "Todo updation failed");
    res.status(HttpStatusCode.OK).json({
      message: "Todo updated",
    });
  }
);

export const getTodos = asyncHandler(
  async (
    req: Request<any, any, any, GetTodoQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { query } = req;
    const { userId } = req.body;
    const todos = await TodoService.getTodos(query, userId);
    if (!todos.length) throw new ApiError(404, `No todos found`);
    res.status(HttpStatusCode.OK).json(todos);
  }
);

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const { id: todoId } = req.params;
  const { userId } = req.body;
  const todo = await TodoService.getTodoById(todoId, userId);
  if (!todo) throw new ApiError(404, "No todos found");
  res.status(HttpStatusCode.OK).json(todo);
});

export const deleteTodoById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    logger.info("Called deleteTodoById");
    const response = await TodoService.deleteTodoById(todoId, userId);
    if (!response) throw new ApiError(404, "Todo deletion failed");
    res.status(HttpStatusCode.OK).json({
      message: "Todo deleted",
    });
  }
);

export const markTodoAsDone = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    const response = await TodoService.markTodoAsDone(todoId, userId);
    if (!response) throw new ApiError(404, "Todo completion failed");
    res.status(HttpStatusCode.OK).json({
      message: "Todo mark as done",
    });
  }
);

export const getDoneTodos = asyncHandler(async(
  req: Request,
  res: Response,
  next: NextFunction
) =>{
    const { userId } = req.body;
    const todos = await TodoService.getDoneTodos(userId);
    if(!todos.length) throw new ApiError(404, "No completed todos found");
    res.status(HttpStatusCode.OK).json(todos);
})
