import express from "express";
import request from "supertest";
import router from "../../routes";
import { userAccessToken } from "../../utils/accessToken";
import expect from "expect";
import { genericErrorHandler } from "../../middleware/errorHandling";
describe("Todo Service Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(genericErrorHandler);
  /**Add todo */
  describe("/todo (POST)", () => {
    it("Should add todo", async () => {
      const response = await request(app)
        .post("/todos")
        .set("Authorization", `Bearer ${userAccessToken}`)
        .send({
          title: "TEST CASE",
          description: "this is test case ",
        });
      expect(response.status).toBe(200);
    });
  });
  /**Todo update */
  describe("/todo/:id (PUT)", () => {
    const todo = {
      title: "new title",
      description: "this is new description",
    };
    it("Should update todo if found", async () => {
      const response = await request(app)
        .put("/todos/1")
        .set("Authorization", `Bearer ${userAccessToken}`)
        .send(todo);
      expect(response.status).toBe(200);
    });
    it("Should throw an error if todo not found", async () => {
      const response = await request(app)
        .put("/todos/20")
        .set("Authorization", `Bearer ${userAccessToken}`)
        .send(todo);
      expect(response.status).toBe(404);
    });
  });
  /**Fetch todos test case*/
  describe("/todos/ (GET)", () => {
    it("Should return todos", async () => {
      const response = await request(app)
        .get("/todos")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(200);
    });
  });

  /**Fetch todo by id */
  describe("/todos/:id (GET)", () => {
    it("Should return a todo based on id", async () => {
      const response = await request(app)
        .get("/todos/2")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(200);
    });
    it("Should throw error if todos not found", async () => {
      const response = await request(app)
        .get("/todos/60")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(404);
    });
  });
 /**Delete todos */
  describe("/todo/:id (DELETE)", () => {
    it("Should delete todo if found", async () => {
      const response = await request(app)
        .delete("/todos/3")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(200);
    });
    it("Should throw error if todo not found", async () => {
      const response = await request(app)
        .delete("/todos/50")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(404);
    });
  });
 /**Mark todo as done */
  describe("/todo/done/:id (PUT)", () => {
    it("Should mark todo as done if found", async () => {
      const response = await request(app)
        .put("/todos/done/4")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(200);
    });
    it("Should throw error if todo not found", async () => {
      const response = await request(app)
        .put("/todos/done/50")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(404);
    });
  });
  /**Fetch done todos */
  describe("/todo/done (GET)", () => {
    it("Should return done todos if any", async () => {
      const response = await request(app)
        .get("/todos/done")
        .set("Authorization", `Bearer ${userAccessToken}`);
      expect(response.status).toBe(200);
    });
    // it("Should throw error if done todos are none", async () => {
    //   const response = await request(app)
    //     .get("/todos/done")
    //     .set("Authorization", `Bearer ${userAccessToken}`);
    //   expect(response.status).toBe(404);
    // });
  });
});
