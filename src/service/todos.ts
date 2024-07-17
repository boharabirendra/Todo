import { todos } from "../data/todos";
import { ForbiddenError, NotFoundError } from "../error/Errors";
import { GetTodoQuery, ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";
import { ROLES } from "../utils/enum";

export function addTodo(todo: ITodo, userId: number) {
  try {
    return TodoModel.TodoModel.create(todo, userId);
  } catch (error) {
    throw error;
  }
}

export async function getTodoById(todoId: string, userId: string) {
  const todo = await TodoModel.TodoModel.getTodoById(todoId, userId);
  if (!todo) throw new NotFoundError("No todo found");
  return todo;
}

export async function updateTodo(todo: ITodo, todoId: string, userId: string) {
  try {
    await getTodoById(todoId, userId);
    return TodoModel.TodoModel.update(todo, todoId, userId);
  } catch (error) {
    throw error;
  }
}

export async function getTodos(filter: GetTodoQuery) {
  const todos = await TodoModel.TodoModel.getTodos(filter);
  if (!todos.length) throw new NotFoundError(`No todos found`);
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

export function getDoneTodos(userId: string) {
  return TodoModel.TodoModel.getDoneTodos(userId);
}
