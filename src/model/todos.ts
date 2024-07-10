import { todos } from "../data/todos";
import { ITodo } from "../interface/todo";

export function fetchTodos() {
  return todos;
}

export function fetchTodoById(id: string) {
  const todo = todos.find((todo) => todo.id === id);
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
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index].title = todo.title;
    todos[index].description = todo.description;
    todos[index].updated_at = new Date();
    return {
      message: `Todo with id ${id} is updated.`,
    };
  }
  return {
    message: `Fail to update todo with id ${id}.`,
  };
}

export function finishTask(id: string) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index].completed = true;
    return {
      message: `Todo with id ${id} is marked as done.`,
    };
  }
  return {
    message: `Fail to marked as done`,
  };
}
