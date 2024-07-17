import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as TodoService from "../service/todos";
import loggerWithNameSpace from "../utils/logger";
import { GetTodoQuery } from "../interface/todo";

const logger = loggerWithNameSpace("TodoController");

export async function addTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const todo = req.body;
    logger.info("Called addTodo");
    await TodoService.addTodo(todo, todo.userId);
    res.status(HttpStatusCode.OK).json({
      message: "Todo created",
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: todoId } = req.params;
    const todo = req.body;
    const { userId } = req.body;
    logger.info("Called updateTodo");
    await TodoService.updateTodo(todo, todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: "Todo updated",
    });
  } catch (error) {
    next(error);
  }
}

export async function getTodos(
  req: Request<any, any, any, GetTodoQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const todos = await TodoService.getTodos(query);
    res.status(HttpStatusCode.OK).json(todos);
  } catch (error) {
    next(error);
  }
}

export async function getTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    const todo = await TodoService.getTodoById(todoId, userId);
    res.status(HttpStatusCode.OK).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    logger.info("Called deleteTodoById");
    await TodoService.deleteTodoById(todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: "Todo deleted",
    });
  } catch (error) {
    next(error);
  }
}

export async function markTodoAsDone(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    await TodoService.markTodoAsDone(todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: "Todo mark as done",
    });
  } catch (error) {
    next(error);
  }
}

export async function getDoneTodos(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.body;
    const todos = await TodoService.getDoneTodos(userId);
    res.status(HttpStatusCode.OK).json(todos);
  } catch (error) {
    next(error);
  }
}
