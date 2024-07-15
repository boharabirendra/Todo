import request from "supertest";
import express from "express";
import router from "../../routes";
describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  /**Signup test case */
  describe("/signup", () => {
    it("Should create user", async () => {
      await request(app)
        .post("/users/signup")
        .send({
          id: "1",
          name: "BIrendra Bohara",
          email: "newemail@gmail.com",
          password: "$2a$10$Kanchapur.",
          permissions: ["users.get"],
        });
    });
  });
  /**Fetch all users test case */
  describe("/users", () => {
    it("Should return all users", async () => {
      await request(app).get("/users");
    });
  });

  /**Fetch user by id test case */
  describe("/:id", () => {
    it("Should return user ", async () => {
      await request(app).get("/users/1");
    });
  });

  /**Update user test case */
  describe("/:id", () => {
    it("Should update user",async ()=>{
      await request(app)
      .put("/users/1")
      .send({
        id: "1",
        name: "new name ",
        email: "newemail@gmail.com",
        password: "new passworD1@",
      })
    })
  });

  /**Delete user by id */
  describe("Should delete user by id", ()=>{
    it("Should delete user", async ()=>{
      await request(app)
      .delete("/users/1")
    
      
    })
  })
});
