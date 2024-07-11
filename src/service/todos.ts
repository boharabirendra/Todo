import { todos } from "../data/todos";
import { ForbiddenError, NotFoundError } from "../error/Errors";
import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos"
import { ROLES } from "../utils/enum";

export function fetchTodos(userId: string, role: ROLES){
    const todos = TodoModel.fetchTodos(userId, role);
    if(!todos.length) throw new NotFoundError(`No todos found`);
    return todos;
}

export function fetchTodoById(id: string, role: ROLES, userId: string){
    const result = TodoModel.fetchTodoById(id, role, userId);
    if(!result) throw new NotFoundError(`Todo with id ${id} does not exist`)
    return result;
}


export function addTodo(todo: Pick<ITodo, "userId" | "title" | "description" >, role:ROLES){
    if(role === ROLES.ADMIN) throw new ForbiddenError("Forbidden access");
    const message = TodoModel.addTodo(todo);
    return message;
}

export function deleteTodoById(id: string, userId: string){
    const todo = todos.find(todo => todo.id === id && todo.userId === userId);
    if(!todo) throw new NotFoundError(`Todo with id ${id} does not exist`);
    return TodoModel.deleteTodoById(id, userId);
}

export function updateTodo(id: string, todo: ITodo){
    const {userId} = todo;
    const existingTodo = todos.find(todo => todo.id === id && todo.userId === userId);
    if(!existingTodo) throw new NotFoundError(`Todo with id ${id} does not exist`);
    return TodoModel.updateTodo(id, todo);
}

export function finishTask(id: string){
    const existingTodo = todos.find(todo => todo.id === id);
    if(!existingTodo) throw new NotFoundError(`Todo with id ${id} does not exist`);
    return TodoModel.finishTask(id);
}

export function fetchFinishedTask(userId: string){
    const finishedTask =  TodoModel.fetchFinishedTask(userId);
    if(!finishedTask.length) throw new NotFoundError(`No finished todos.`);
    return finishedTask;
}