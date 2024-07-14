import request from "supertest";
import express from "express";
import router from "../../routes";
describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  describe("/signup", () => {
    it("Should create user", async () => {
      await request(app)
        .post("/users/signup")
        .send({
          name: "user integrated test",
          email: "birendrabohara2074@gmail.com",
          password: "Kanchanpur1232@",
          permissions: ["users.get"],
        });
    });
  });

  describe("/:id", ()=>{
    
  })
});
