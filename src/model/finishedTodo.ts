import { todos } from "../data";

export function fetchFinishedTodo(){
    const finishedTodo = todos.filter(todo => todo.completed);
    return finishedTodo;
}

export function fetchRemainingTodo(){
    const remainingTodo = todos.filter(todo => !todo.completed);
    return remainingTodo;
}