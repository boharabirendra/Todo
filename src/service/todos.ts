import { ForbiddenError, NotFoundError } from "../error/Errors";
import { GetTodoQuery, ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";

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

export async function getTodos(filter: GetTodoQuery, userId: string) {
  const todos = await TodoModel.TodoModel.getTodos(
    filter,
    Number(userId) === 1 ? null : userId
  );
  if (!todos.length) throw new NotFoundError(`No todos found`);
  return todos;
}

export async function deleteTodoById(todoId: string, userId: string) {
  await getTodoById(todoId, userId);
  return TodoModel.TodoModel.deleteTodoById(todoId, userId);
}

export async function markTodoAsDone(todoId: string, userId: string) {
  await getTodoById(todoId, userId);
  return TodoModel.TodoModel.markTodoAsDone(todoId, userId);
}

export async function getDoneTodos(userId: string) {
  const todos = await TodoModel.TodoModel.getDoneTodos(userId);
  if(!todos.length) throw new NotFoundError("No completed todos found");
  return todos;
}
