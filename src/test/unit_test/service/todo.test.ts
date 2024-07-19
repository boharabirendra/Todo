import Sinon from "sinon";
import expect from "expect";
import * as TodoModel from "../../../model/todos";
import * as TodoService from "../../../service/todos";
import { GetTodoQuery, ITodo } from "../../../interface/todo";
import { ApiError } from "../../../utils/ApiError";
import HttpStatusCode from "http-status-codes";

describe("Todo Service Test Suite", () => {
  const todo: ITodo = {
    id: "1",
    title: "Test Todo",
    description: "Test Description",
    completed: false,
    userId: "1",
  };

  const userId = 1;

  /** Add Todo Test Cases */
  describe("addTodo", () => {
    let todoModelCreateStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelCreateStub = Sinon.stub(TodoModel.TodoModel, "create");
    });
    afterEach(() => {
      todoModelCreateStub.restore();
    });

    it("Should add a todo", async () => {
      todoModelCreateStub.resolves();
      await TodoService.addTodo(todo, userId);
      expect(todoModelCreateStub.callCount).toBe(1);
      expect(todoModelCreateStub.getCall(0).args).toStrictEqual([todo, userId]);
    });

    it("Should throw an error if todo is not added", async () => {
      todoModelCreateStub.rejects(new Error("Database error"));
      expect(
        async () => await TodoService.addTodo(todo, userId)
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "Todo not added",
          "DATABASE ERROR"
        )
      );
    });
  });

  /** Get Todo By ID Test Cases */
  describe("getTodoById", () => {
    let todoModelGetTodoByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelGetTodoByIdStub = Sinon.stub(TodoModel.TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelGetTodoByIdStub.restore();
    });

    it("Should return todo if found", async () => {
      todoModelGetTodoByIdStub.resolves(todo);
      const response = await TodoService.getTodoById("1", "1");
      expect(response).toStrictEqual(todo);
      expect(todoModelGetTodoByIdStub.callCount).toBe(1);
      expect(todoModelGetTodoByIdStub.getCall(0).args).toStrictEqual(["1", "1"]);
    });

    it("Should throw an error if todo is not found", async () => {
      todoModelGetTodoByIdStub.resolves(null);
      expect(
        async () => await TodoService.getTodoById("1", "1")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Todo with id 1 not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });

  /** Update Todo Test Cases */
  describe("updateTodo", () => {
    let todoModelUpdateStub: Sinon.SinonStub;
    let todoModelGetTodoByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelUpdateStub = Sinon.stub(TodoModel.TodoModel, "update");
      todoModelGetTodoByIdStub = Sinon.stub(TodoModel.TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelUpdateStub.restore();
      todoModelGetTodoByIdStub.restore();
    });

    it("Should update todo if found", async () => {
      todoModelGetTodoByIdStub.resolves(todo);
      todoModelUpdateStub.resolves();
      await TodoService.updateTodo(todo, "1", "1");
      expect(todoModelUpdateStub.callCount).toBe(1);
      expect(todoModelUpdateStub.getCall(0).args).toStrictEqual([todo, "1", "1"]);
    });

    it("Should throw an error if todo is not found", async () => {
      todoModelGetTodoByIdStub.resolves(null);
      expect(
        async () => await TodoService.updateTodo(todo, "1", "1")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Todo with id 1 not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });

  /** Get Todos Test Cases */
  describe("getTodos", () => {
    let todoModelGetTodosStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelGetTodosStub = Sinon.stub(TodoModel.TodoModel, "getTodos");
    });
    afterEach(() => {
      todoModelGetTodosStub.restore();
    });

    it("Should return todos if found", async () => {
      const todos = [todo];
      const filter: GetTodoQuery = { size: 10, page: 1 };
      todoModelGetTodosStub.resolves(todos);
      const response = await TodoService.getTodos(filter, "1");
      expect(response).toBe(todos);
      expect(todoModelGetTodosStub.callCount).toBe(1);
    });

    it("Should throw an error if todos are not found", async () => {
      const todos: ITodo[] = [];
      const filter: GetTodoQuery = { size: 10, page: 1 };
      todoModelGetTodosStub.resolves(todos);
      expect(
        async () => await TodoService.getTodos(filter, "1")
      ).rejects.toThrow(
        new ApiError(HttpStatusCode.NOT_FOUND, `Todos not found`, "NOT FOUND ERROR")
      );
    });
  });

  /** Delete Todo By ID Test Cases */
  describe("deleteTodoById", () => {
    let todoModelDeleteTodoByIdStub: Sinon.SinonStub;
    let todoModelGetTodoByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelDeleteTodoByIdStub = Sinon.stub(TodoModel.TodoModel, "deleteTodoById");
      todoModelGetTodoByIdStub = Sinon.stub(TodoModel.TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelDeleteTodoByIdStub.restore();
      todoModelGetTodoByIdStub.restore();
    });

    it("Should delete todo if found", async () => {
      todoModelGetTodoByIdStub.resolves(todo);
      todoModelDeleteTodoByIdStub.resolves();
      await TodoService.deleteTodoById("1", "1");
      expect(todoModelDeleteTodoByIdStub.callCount).toBe(1);
      expect(todoModelDeleteTodoByIdStub.getCall(0).args).toStrictEqual(["1", "1"]);
    });

    it("Should throw an error if todo is not found", async () => {
      todoModelGetTodoByIdStub.resolves(null);
      expect(
        async () => await TodoService.deleteTodoById("1", "1")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Todo with id 1 not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });

  /** Mark Todo As Done Test Cases */
  describe("markTodoAsDone", () => {
    let todoModelMarkTodoAsDoneStub: Sinon.SinonStub;
    let todoModelGetTodoByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelMarkTodoAsDoneStub = Sinon.stub(TodoModel.TodoModel, "markTodoAsDone");
      todoModelGetTodoByIdStub = Sinon.stub(TodoModel.TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelMarkTodoAsDoneStub.restore();
      todoModelGetTodoByIdStub.restore();
    });

    it("Should mark todo as done if found", async () => {
      todoModelGetTodoByIdStub.resolves(todo);
      todoModelMarkTodoAsDoneStub.resolves();
      await TodoService.markTodoAsDone("1", "1");
      expect(todoModelMarkTodoAsDoneStub.callCount).toBe(1);
      expect(todoModelMarkTodoAsDoneStub.getCall(0).args).toStrictEqual(["1", "1"]);
    });

    it("Should throw an error if todo is not found", async () => {
      todoModelGetTodoByIdStub.resolves(null);
      expect(
        async () => await TodoService.markTodoAsDone("1", "1")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Todo with id 1 not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });

  /** Get Done Todos Test Cases */
  describe("getDoneTodos", () => {
    let todoModelGetDoneTodosStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelGetDoneTodosStub = Sinon.stub(TodoModel.TodoModel, "getDoneTodos");
    });
    afterEach(() => {
      todoModelGetDoneTodosStub.restore();
    });

    it("Should return done todos if found", async () => {
      const doneTodos = [todo];
      todoModelGetDoneTodosStub.resolves(doneTodos);
      const response = await TodoService.getDoneTodos("1");
      expect(response).toBe(doneTodos);
      expect(todoModelGetDoneTodosStub.callCount).toBe(1);
      expect(todoModelGetDoneTodosStub.getCall(0).args).toStrictEqual(["1"]);
    });

    it("Should throw an error if done todos are not found", async () => {
      const doneTodos: ITodo[] = [];
      todoModelGetDoneTodosStub.resolves(doneTodos);
      expect(
        async () => await TodoService.getDoneTodos("1")
      ).rejects.toThrow(
        new ApiError(
          HttpStatusCode.NOT_FOUND,
          `Done todos not found`,
          "NOT FOUND ERROR"
        )
      );
    });
  });
});
