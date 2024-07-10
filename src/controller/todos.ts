import express, { Request, Response } from "express";
import * as TodoService from "../service/todos";
import { ITodo } from "../interface/todo";

export function fetchTodos(req: Request, res: Response) {
  const todos = TodoService.fetchTodos();
  res.json({
    todos,
  });
}

export function fetchTodoById(req: Request, res: Response) {
  const { id } = req.params;
  const todo = TodoService.fetchTodoById(id);
  res.json({
    todo,
  });
}

export function addTodo(
  req: Request<any, any, Pick<ITodo, "userId" | "title" | "description">>,
  res: Response
) {
  const todo = req.body;
  const message = TodoService.addTodo(todo);
  res.json(message);
}

export function deleteTodoById(req: Request, res: Response) {
  const { id } = req.params;
  const message = TodoService.deleteTodoById(id);
  res.json({ message });
}

export function updateTodo(req: Request, res: Response) {
  // const { body } = req;
  // const message = TodoService.updateTodo(body.id, {
  //   title: body.title,
  //   description: body.description,
  // });
  // res.json({ message });
}
