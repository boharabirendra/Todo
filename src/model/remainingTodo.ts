import { todos } from "../data";

export function fetchRemainingTodo(){
    const remainingTodo = todos.filter(todo => !todo.completed);
    return remainingTodo;
}