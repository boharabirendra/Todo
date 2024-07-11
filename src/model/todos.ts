import { todos } from "../data/todos";
import { ITodo } from "../interface/todo";
import { ROLES } from "../utils/enum";

export function fetchTodos(userId: string, role: ROLES) {
  if (ROLES.ADMIN === role) return todos;
  const usersTodos = todos.filter((todo) => todo.userId === userId);
  return usersTodos;
}

export function fetchFinishedTask(userId: string) {
  const finishedTask = todos.filter((todo) => {
    if (todo.completed && todo.userId === userId) return todo;
  });
  return finishedTask;
}

export function fetchTodoById(todoId: string, role: ROLES, userId: string) {
  if (role === ROLES.ADMIN) {
    const todo = todos.find((todo) => todo.id === todoId);
    return todo;
  }
  const todo = todos.find((todo) => {
    return todo.id === todoId && todo.userId === userId;
  });
  return todo;
}

let counter = todos.length;
export function addTodo(todo: Pick<ITodo, "userId" | "title" | "description">) {
  todos.push({
    id: counter.toString(),
    userId: todo.userId,
    title: todo.title,
    description: todo.description,
    created_at: new Date(),
    updated_at: new Date(),
    completed: false,
  });
  counter++;
  return {
    message: "Todo added.",
  };
}

export function deleteTodoById(id: string) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    return {
      message: `Todo with id ${id} is deleted.`,
    };
  }
  return {
    message: `Todo with id ${id} does not exists.`,
  };
}

export function updateTodo(id: string, todo: ITodo) {
  const todoId = Number(id);
  todos[todoId].title = todo.title;
  todos[todoId].description = todo.description;
  todos[todoId].updated_at = new Date();
  return {
    message: `Todo with id ${id} is updated.`,
  };
}

export function finishTask(id: string) {
  const index = Number(id);
  todos[index].completed = true;
  return {
    message: `Todo with id ${id} is mark as done`,
  };
}
