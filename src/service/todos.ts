
import { GetTodoQuery, ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";


export function addTodo(todo: ITodo, userId: number) {
  return TodoModel.TodoModel.create(todo, userId);
}

export function getTodoById(todoId: string, userId: string) {
  return TodoModel.TodoModel.getTodoById(todoId, userId);
}

export async function updateTodo(todo: ITodo, todoId: string, userId: string) {
  return TodoModel.TodoModel.update(todo, todoId, userId);
}

export function getTodos(filter: GetTodoQuery, userId: string) {
  return TodoModel.TodoModel.getTodos(
    filter,
    Number(userId) === 1 ? null : userId
  );
}

export async function deleteTodoById(todoId: string, userId: string) {
  return TodoModel.TodoModel.deleteTodoById(todoId, userId);
}

export async function markTodoAsDone(todoId: string, userId: string) {
  await getTodoById(todoId, userId);
  return TodoModel.TodoModel.markTodoAsDone(todoId, userId);
}

export async function getDoneTodos(userId: string) {
  return TodoModel.TodoModel.getDoneTodos(userId);
}
