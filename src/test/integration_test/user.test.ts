import request from "supertest";
import express from "express";
import expect from "expect";
import router from "../../routes";
import HttpStatuscode from "http-status-codes";
import { accessToken } from "../../utils/accessToken";
import { genericErrorHandler } from "../../middleware/errorHandling";
describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(genericErrorHandler);
  /**Signup test case */
  describe("/signup", () => {
    it("Should create user", async () => {
      const response = await request(app)
        .post("/users/signup")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "Ramayan Bohara",
          email: "duplicateuser@gmail.com",
          password: "$2a$10$Kanchapur.",
          roleId: 2
        });
      expect(response.status).toBe(200);
    });
    it("Should throw conflict error if user already exist", async () => {
      const response = await request(app)
        .post("/users/signup")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          name: "BIrendra Bohara",
          email: "birendrabohara2074@gmail.com",
          password: "Kanchanpur1230@",
          roleId: 2
        });
      expect(response.status).toBe(HttpStatuscode.INTERNAL_SERVER_ERROR);
    });
  });
  /**Fetch all users test case */
  describe("/users", () => {
    it("Should return all users", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
    });
  });

  // /**Fetch user by id test case */
  describe("/:id", () => {
    it("Should return user", async () => {
      const response = await request(app)
        .get("/users/1")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
    });
  });

  // /**Update user test case */
  describe("/:id Update user", () => {
    it("Should update user", async () => {
      const response = await request(app)
      .put("/users/2").send({
        name: "new name ",
        email: "newemail@gmail.com",
        password: "new passworD1@",
        roleId: 2
      })
      .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
    });

    it("Should throw error if user is not found", async () => {
      const response = await request(app)
      .put("/users/12").send({
        name: "new name ",
        email: "notfound@gmail.com",
        password: "new passworD1@",
      })
      .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(404);
    });
  });
  // /**Delete user by id */
  describe("Should delete user by id", ()=>{
    it("Should delete user", async ()=>{
      const response =  await request(app)
      .delete("/users/3")
      .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
    })
  })
});