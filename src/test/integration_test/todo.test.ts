import express from "express";
import request from "supertest";
import router from "../../routes";
describe("Todo Service Test Suite", ()=>{
    const app = express();
    app.use(express.json());
    app.use(router);
    /**Fetch todos test case*/
    describe("/todos/", ()=>{
        it("Should return todos",async ()=>{
            await request(app)
            .get("/todos");
        })
    })
    /**Fetch todo by id */
    describe("/todos/:id", ()=>{
        it("Should return a todo based on id",async ()=>{
            await request(app).get("/todos/1");
        })
    })
})