import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos"
export function fetchTodos(){
    const todos = TodoModel.fetchTodos();
    return todos;
}

export function fetchTodoById(id: string){
    const result = TodoModel.fetchTodoById(id);
    if(!result){
        return {
            error: `Todo with id ${id} does not exist.`
        }
    }
    return result;
}


export function addTodo(todo: Pick<ITodo, "userId" | "title" | "description" >){
    const message = TodoModel.addTodo(todo);
    return message;
}

export function deleteTodoById(id: string){
    return TodoModel.deleteTodoById(id);
}

export function updateTodo(id: string, todo: ITodo){
    return TodoModel.updateTodo(id, todo);
}

export function finishTask(id: string){
    return TodoModel.finishTask(id);
}