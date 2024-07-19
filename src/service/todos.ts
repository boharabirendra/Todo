import { GetTodoQuery, ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";
import { ApiError } from "../utils/ApiError";
import HttpStatusCode from "http-status-codes";

export async function addTodo(todo: ITodo, userId: number) {
  try {
    await TodoModel.TodoModel.create(todo, userId);
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      "Todo not added",
      "DATABASE ERROR"
    );
  }
}

export async function getTodoById(todoId: string, userId: string) {
    const todo = await TodoModel.TodoModel.getTodoById(todoId, userId);
    if (!todo)
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Todo with id ${todoId} not found`,
        "NOT FOUND ERROR"
      );
    return todo;
}

export async function updateTodo(todo: ITodo, todoId: string, userId: string) {
    await getTodoById(todoId, userId);
    await TodoModel.TodoModel.update(todo, todoId, userId);
}

export async function getTodos(filter: GetTodoQuery, userId: string) {
    const todos = await TodoModel.TodoModel.getTodos(
      filter,
      Number(userId) == 1 ? null : userId
    );
    if (!todos.length)
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Todos not found`,
        "NOT FOUND ERROR"
      );
      return todos;
}

export async function deleteTodoById(todoId: string, userId: string) {
    await getTodoById(todoId, userId);
    await TodoModel.TodoModel.deleteTodoById(todoId, userId);
}

export async function markTodoAsDone(todoId: string, userId: string) {
    await getTodoById(todoId, userId);
    await TodoModel.TodoModel.markTodoAsDone(todoId, userId);
}

export async function getDoneTodos(userId: string) {
    const todos = await TodoModel.TodoModel.getDoneTodos(userId);
    if (!todos.length)
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Done todos not found`,
        "NOT FOUND ERROR"
      );
      return todos;
}
