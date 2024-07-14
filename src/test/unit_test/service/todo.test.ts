import Sinon from "sinon";
import expect from "expect";
import * as TodoModel from "../../../model/todos";
import * as TodoService from "../../../service/todos";
import { ForbiddenError, NotFoundError } from "../../../error/Errors";
import { todos as realTodos } from "../../../data/todos";

describe("Todo Service Test Suite", () => {
  const todos = [
    {
      id: "1",
      userId: "101",
      title: "Buy groceries",
      description: "Buy milk, bread, and eggs from the supermarket.",
      completed: false,
      created_at: new Date("2024-01-01T09:00:00Z"),
      updated_at: new Date("2024-01-01T09:00:00Z"),
    },
    {
      id: "2",
      userId: "102",
      title: "Finish project report",
      description:
        "Complete the final report for the project and submit it to the manager.",
      completed: true,
      created_at: new Date("2024-01-02T10:30:00Z"),
      updated_at: new Date("2024-01-03T14:00:00Z"),
    },
    {
      id: "3",
      userId: "103",
      title: "Plan vacation",
      description:
        "Plan the itinerary and book flights and hotels for the vacation.",
      completed: false,
      created_at: new Date("2024-01-04T12:00:00Z"),
      updated_at: new Date("2024-01-04T12:00:00Z"),
    },
    {
      id: "4",
      userId: "104",
      title: "Read book",
      description: "Read the book 'The Great Gatsby' by F. Scott Fitzgerald.",
      completed: false,
      created_at: new Date("2024-01-05T15:45:00Z"),
      updated_at: new Date("2024-01-05T15:45:00Z"),
    },
    {
      id: "5",
      userId: "105",
      title: "Exercise",
      description: "Do a 30-minute workout session.",
      completed: true,
      created_at: new Date("2024-01-06T07:00:00Z"),
      updated_at: new Date("2024-01-06T08:00:00Z"),
    },
  ];
  /**Fetch Todos test case */
  describe("fetchTodos", () => {
    let todoModelFetchTodosStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelFetchTodosStub = Sinon.stub(TodoModel, "fetchTodos");
    });
    afterEach(() => {
      todoModelFetchTodosStub.restore();
    });
    it("Should return all todo if user is admin", () => {
      todoModelFetchTodosStub.returns(todos);
      /**Assuming Admin id = 0 */
      const response = TodoService.fetchTodos("0", 0);
      expect(response).toStrictEqual(todos);
      expect(todoModelFetchTodosStub.callCount).toBe(1);
      expect(todoModelFetchTodosStub.getCall(0).args).toStrictEqual(["0", 0]);
    });

    it("Should return todos based on user id", () => {
      const usersTodos = todos.filter((todo) => todo.userId === "103");
      todoModelFetchTodosStub.returns(usersTodos);
      const response = TodoService.fetchTodos("103", 1);
      expect(response).toStrictEqual(usersTodos);
      expect(todoModelFetchTodosStub.callCount).toBe(1);
      expect(todoModelFetchTodosStub.getCall(0).args).toStrictEqual(["103", 1]);
    });

    it("Should throw error if no todos found", () => {
      todoModelFetchTodosStub.returns([]);
      expect(() => TodoService.fetchTodos("150", 1)).toThrow(
        new NotFoundError("No todos found")
      );
      expect(todoModelFetchTodosStub.callCount).toBe(1);
      expect(todoModelFetchTodosStub.getCall(0).args).toStrictEqual(["150", 1]);
    });
  });
  /**Fetch todos by id test case */
  describe("fetchTodoById", () => {
    let todoModelFetchTodoByIdStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelFetchTodoByIdStub = Sinon.stub(TodoModel, "fetchTodoById");
    });

    afterEach(() => {
      todoModelFetchTodoByIdStub.restore();
    });
    it("Should return todo if found", () => {
      const todo = {
        id: "2",
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
        completed: true,
        created_at: new Date("2024-01-02T10:30:00Z"),
        updated_at: new Date("2024-01-03T14:00:00Z"),
      };
      todoModelFetchTodoByIdStub.returns(todo);
      const response = TodoService.fetchTodoById("2", 1, "102");
      expect(response).toStrictEqual(todo);
      expect(todoModelFetchTodoByIdStub.callCount).toBe(1);
      expect(todoModelFetchTodoByIdStub.getCall(0).args).toStrictEqual([
        "2",
        1,
        "102",
      ]);
    });
    it("Should throw error if todo is not found", () => {
      todoModelFetchTodoByIdStub.returns(null);
      expect(() => TodoService.fetchTodoById("20", 1, "102")).toThrow(
        new NotFoundError("Todo with id 20 does not exist")
      );
      expect(todoModelFetchTodoByIdStub.callCount).toBe(1);
      expect(todoModelFetchTodoByIdStub.getCall(0).args).toStrictEqual([
        "20",
        1,
        "102",
      ]);
    });
  });
  /**Add todo test case */
  describe("addTodo", () => {
    let todoModelAddTdoStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelAddTdoStub = Sinon.stub(TodoModel, "addTodo");
    });
    afterEach(() => {
      todoModelAddTdoStub.restore();
    });
    it("Should add todo", () => {
      const todo = {
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
      };

      todoModelAddTdoStub.returns(todo);
      TodoService.addTodo(todo, 1);
      expect(todoModelAddTdoStub.callCount).toBe(1);
      expect(todoModelAddTdoStub.getCall(0).args).toStrictEqual([todo]);
    });
    it("Should throw error if user is admin", () => {
      const todo = {
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
      };
      expect(() => TodoService.addTodo(todo, 0)).toThrow(
        new ForbiddenError("Forbidden access")
      );
    });
  });
  /**Delete todo by id test case */
  describe("deleteTodoById", () => {
    let todomModelDeleteTodoByIdStub: Sinon.SinonStub;
    let todosStub: Sinon.SinonStub;
    beforeEach(() => {
      todomModelDeleteTodoByIdStub = Sinon.stub(TodoModel, "deleteTodoById");
      todosStub = Sinon.stub(realTodos, "find");
    });
    afterEach(() => {
      todomModelDeleteTodoByIdStub.restore();
      todosStub.restore();
    });
    it("Should return success if todo is deleted", () => {
      const todo = {
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
      };
      todomModelDeleteTodoByIdStub.returns("success");
      todosStub.returns(todo);
      const response = TodoService.deleteTodoById("2", "102");
      expect(response).toBe("success");
    });
    it("Should throw error if todo is not found", () => {
      todosStub.returns(null);
      expect(() => TodoService.deleteTodoById("2", "102")).toThrow(
        new NotFoundError("Todo with id 2 does not exist")
      );
    });
  });
  /**Update todo test case */
  describe("updateTodo", () => {
    let todoModelUpdateTodStub: Sinon.SinonStub;
    let todosStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelUpdateTodStub = Sinon.stub(TodoModel, "updateTodo");
      todosStub = Sinon.stub(realTodos, "find");
    });
    afterEach(() => {
      todoModelUpdateTodStub.restore();
      todosStub.restore();
    });
    it("Should success if todo is updated", () => {
      const todo = {
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
      };
      todosStub.returns(todo);
      todoModelUpdateTodStub.returns("success");
      const response = TodoService.updateTodo("2", todo);
      expect(response).toBe("success");
    });
    it("Should throw error if todo is not found", () => {
      todosStub.returns(null);
      expect(() => TodoService.updateTodo("2", [{}])).toThrow(
        new NotFoundError("Todo with id 2 does not exist")
      );
    });
  });
  /**Finish task test case */
  describe("finishTask", () => {
    let todoModelFinishTask: Sinon.SinonStub;
    let todosStub: Sinon.SinonStub;
    beforeEach(() => {
      todoModelFinishTask = Sinon.stub(TodoModel, "finishTask");
      todosStub = Sinon.stub(realTodos, "find");
    });
    afterEach(() => {
      todoModelFinishTask.restore();
      todosStub.restore();
    });
    it("Should return success if todo is marked as done", () => {
      const todo = {
        userId: "102",
        title: "Finish project report",
        description:
          "Complete the final report for the project and submit it to the manager.",
      };
      todosStub.returns(todo);
      todoModelFinishTask.returns("success");
      const response = TodoService.finishTask("2");
      expect(response).toBe("success");
    });
    it("Should throw error if todo is not found", () => {
      todosStub.returns(null);
      expect(() => TodoService.updateTodo("2", [{}])).toThrow(
        new NotFoundError("Todo with id 2 does not exist")
      );
    });
  });
  /**Fetch finished task test case */
  describe("fetchFinishedTask", ()=>{
    let todoModelFetchFinishedTask: Sinon.SinonStub;
    beforeEach(()=>{
        todoModelFetchFinishedTask = Sinon.stub(TodoModel, "fetchFinishedTask");
    });
    afterEach(()=>{
        todoModelFetchFinishedTask.restore();
    })

    it("Should return mark as done task if found", ()=>{
        const todo = [{
            userId: "102",
            title: "Finish project report",
            description:
              "Complete the final report for the project and submit it to the manager.",
            completed: true
          }];
        todoModelFetchFinishedTask.returns(todo);
        const response = TodoService.fetchFinishedTask("102");
        expect(response).toStrictEqual(todo);
    })
    it("Should throw error if finished task not found", ()=>{
        todoModelFetchFinishedTask.returns([]);
        expect(()=>TodoService.fetchFinishedTask("120")).toThrow(
            new NotFoundError("No finished todos.")
        );
    })
  })
});
