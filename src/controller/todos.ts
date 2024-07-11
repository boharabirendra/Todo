import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as TodoService from "../service/todos";
import { ITodo } from "../interface/todo";

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

export function fetchTodoById(req: Request, res: Response, next:NextFunction) {
  try {
    const { id } = req.params;
    const {role, userId} = req.body;
    const todo = TodoService.fetchTodoById(id, role, userId);
    res.status(HttpStatusCode.OK).json({
      todo,
    });
  } catch (error) {
    next(error);
  }
}

export function addTodo(
  req: Request<any, any, Pick<ITodo, "userId" | "title" | "description">>,
  res: Response
) {
  const todo = req.body;
  const message = TodoService.addTodo(todo);
  res.status(HttpStatusCode.OK).json(message);
}

export function deleteTodoById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const message = TodoService.deleteTodoById(id);
    res.status(HttpStatusCode.OK).json({ message });
  } catch (error) {
    next(error);
  }
}

export function updateTodo(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { body } = req;
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
