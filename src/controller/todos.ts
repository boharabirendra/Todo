import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as TodoService from "../service/todos";
import { ITodo } from "../interface/todo";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TodoController");

export function fetchTodos(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, role } = req.body;
    const todos = TodoService.fetchTodos(userId, role);
    res.status(HttpStatusCode.OK).json({
      todos,
    });
  } catch (error) {
    next(error);
  }
}

export function fetchTodoById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { role, userId } = req.body;
    const todo = TodoService.fetchTodoById(id, role, userId);
    res.status(HttpStatusCode.OK).json({
      todo,
    });
  } catch (error) {
    next(error);
  }
}

export function addTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const todo = req.body;
    const { role } = req.body;
    logger.info("Called addTodo");
    const message = TodoService.addTodo(todo, role);
    res.status(HttpStatusCode.OK).json(message);
  } catch (error) {
    next(error);
  }
}

export function deleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    logger.info("Called deleteTodoById");
    const message = TodoService.deleteTodoById(id, userId);
    res.status(HttpStatusCode.OK).json({ message });
  } catch (error) {
    next(error);
  }
}

export function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
    logger.info("Called updateTodo");
    const result = TodoService.updateTodo(id, body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export function finishTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = TodoService.finishTask(id);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export function fetchFinishedTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.body;
    const result = TodoService.fetchFinishedTask(userId);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    next(error);
  }
}
