const request = require('supertest');
const server = require('../server.js')
const db = require('../config/db-config');

describe('CRUD Tests', () => {
    beforeAll(async () => {
        await db("users").truncate();
    });
    
      it("tests are running with DB_ENV set to 'testing'", () => {
        expect(process.env.DB_ENV).toBe("testing");
    });
    describe("auth-router tests", () => {
        describe("POST /api/auth/register", () => {
          it("should return a 201 created status", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "dani",
                password: "final",
                top3_values: "1,2,3",
            importance_prompt: "because this is important",
            involvement_prompt: "i grew up having to be involved "
              })
              .then(res => {
                expect(res.status).toBe(201);
              });
          });
          it("should return a JSON object after creating a user", () => {
            return request(server)
              .post("/api/auth/register")
              .send({
                username: "daniel",
                password: "pass1",
                top3_values: "1,2,4",
            importance_prompt: "because djfnldfhio",
            involvement_prompt: "i grew up having to" 
              })
              .then(res => {
                expect(res.type).toEqual("application/json");
              });
          });
        });
    })

    describe("POST /api/auth/login", () => {
        it("should return a 200 OK status", () => {
          return request(server)
            .post("/api/auth/login")
            .send({
              username: "daniel",
              password: "pass1",
              top3_values: "1,2,4",
            importance_prompt: "because djfnldfhio",
            involvement_prompt: "i grew up having to" 
            })
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
        it("should return a JSON object", () => {
          return request(server)
            .post("/api/auth/login")
            .send({
              username: "daniel",
              password: "pass1",
              top3_values: "1,2,4",
            importance_prompt: "because djfnldfhio",
            involvement_prompt: "i grew up having to .."
            })
            .then(res => {
              expect(res.type).toMatch(/json/);
            });
        });
    });

})
    