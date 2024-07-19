import { Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as TodoService from "../service/todos";
import loggerWithNameSpace from "../utils/logger";
import { GetTodoQuery } from "../interface/todo";
import { asyncHandler } from "../utils/asyncHandler";

const logger = loggerWithNameSpace("TodoController");

export const addTodo = asyncHandler(
  async (req: Request, res: Response) => {
    const todo = req.body;
    logger.info("Called addTodo");
    await TodoService.addTodo(todo, todo.userId);
    res.status(HttpStatusCode.OK).json({
      message: "Todo created",
      success: true
    });
  }
);

export const updateTodo = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: todoId } = req.params;
    const todo = req.body;
    const { userId } = req.body;
    logger.info("Called updateTodo");
    await TodoService.updateTodo(todo, todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: `Todo with id ${todoId} updated`,
      success: true
    });
  }
);

export const getTodos = asyncHandler(
  async (
    req: Request<any, any, any, GetTodoQuery>,
    res: Response,
  ) => {
    const { query } = req;
    const { userId } = req.body;
    const todos = await TodoService.getTodos(query, userId);
    res.status(HttpStatusCode.OK).json({todos, success: true});
  }
);

export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const { id: todoId } = req.params;
  const { userId } = req.body;
  const todo = await TodoService.getTodoById(todoId, userId);
  res.status(HttpStatusCode.OK).json({todo, success: true});
});

export const deleteTodoById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    logger.info("Called deleteTodoById");
    await TodoService.deleteTodoById(todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: `Todo with id ${todoId} deleted`,
      success: true
    });
  }
);

export const markTodoAsDone = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: todoId } = req.params;
    const { userId } = req.body;
    TodoService.markTodoAsDone(todoId, userId);
    res.status(HttpStatusCode.OK).json({
      message: `Todo with id ${todoId} mark as done`,
      success: true
    });
  }
);

export const getDoneTodos = asyncHandler(async(
  req: Request,
  res: Response
) =>{
    const { userId } = req.body;
    const todos = await TodoService.getDoneTodos(userId);
    res.status(HttpStatusCode.OK).json({todos, success: true});
})
