import { TransactionFail } from "../error/Errors";
import { GetTodoQuery, ITodo } from "../interface/todo";
import { BaseModel } from "./base";

export class TodoModel extends BaseModel {
  static create(todo: ITodo, userId: number) {
    try {
      const { title, description } = todo;
      const todoToCreate = {
        title,
        description,
        userId,
      };
      return this.queryBuilder().insert(todoToCreate).table("todos");
    } catch (error) {
      throw new TransactionFail("DB operation failed");
    }
  }
  static async update(todo: ITodo, todoId: string, userId: string) {
    try {
      const { title, description } = todo;
      const todoToUpdate = {
        title,
        description,
        updatedAt: new Date(),
      };
      await this.queryBuilder()
        .update(todoToUpdate)
        .table("todos")
        .where({ id: todoId, userId });
    } catch (error) {
      throw new TransactionFail("DB operation failed");
    }
  }

  static getTodoById(todoId: string, userId: string) {
    return this.queryBuilder()
      .select("id", "title", "description", "completed")
      .table("todos")
      .where({ id: todoId, userId })
      .first();
  }

  static getTodos(filter: GetTodoQuery) {
    const { q } = filter;
    const query = this.queryBuilder()
      .select("id", "title", "description", "completed")
      .table("todos")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);
    if (q) {
      query.whereLike("title", `%${q}%`);
    }
    return query;
  }

  static deleteTodoById(todoId: string, userId: string){
    return this.queryBuilder().delete().table("todos").where({id: todoId, userId});
  }

  static markTodoAsDone(todoId: string, userId: string){
    return this.queryBuilder().update({completed: true}).table("todos").where({id: todoId, userId});
  }

  static getDoneTodos(userId: string){
    return this.queryBuilder().select("id", "title", "description", "completed").table("todos").where({completed: true, userId});
  }
}


