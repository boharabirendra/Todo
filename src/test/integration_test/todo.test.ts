import express from "express";
import request from "supertest";
import router from "../../routes";
import { accessToken } from "../../utils/accessToken";
import expect from "expect";
import { genericErrorHandler } from "../../middleware/errorHandling";
describe("Todo Service Test Suite", ()=>{
    const app = express();
    app.use(express.json());
    app.use(router);
    app.use(genericErrorHandler);
    /**Fetch todos test case*/
    describe("/todos/", ()=>{
        it("Should return todos",async ()=>{
           const response =  await request(app)
            .get("/todos")
            .set("Authorization", `Bearer ${accessToken}`);
           expect(response.status).toBe(200);
        })
    })
    /**Fetch todo by id */
    describe("/todos/:id", ()=>{
        it("Should return a todo based on id",async ()=>{
            const response = await request(app)
            .get("/todos/1")
            .set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(200);
        })
        it("Should throw error if todos not found",async ()=>{
            const response = await request(app)
            .get("/todos/10")
            .set("Authorization", `Bearer ${accessToken}`);
            expect(response.status).toBe(404);
        })
    })
})