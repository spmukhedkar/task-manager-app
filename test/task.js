let chai = require("chai");
const chaiHttp = require("chai-http");
let { server } = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Task API', () => {
    /**
     * Test GET route
    */
    describe("GET /api/tasks", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(3);
                done();
            });
        });

        it("It should NOT GET the task", (done) => {
            chai.request(server)
                .get("/api/taks")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
            });
        });
    })

    /**
     * Test GET (by id) route
    */
    describe("GET /api/tasks/:id", () => {
        it("It should GET a task by ID", (done) => {
            const taskId = 1;
            chai.request(server)
                .get("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('description');
                    response.body.should.have.property('status');
                    response.body.should.have.property('id').eq(1);
                done();
            });
        });

        it("There is no tasks by ID", (done) => {
            const taskId = 123;
            chai.request(server)                
                .get("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.eq('');
                done();
                });
        });
    })

    /**
     * Test POST route
    */
    describe("POST /api/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                description: "Task 4"
            };
            chai.request(server)                
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("Task Saved Successfully");
                    
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                status: 'not-started'
            };
            chai.request(server)                
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(500);
                done();
                });
        });

    });


    /**
     * Test PUT route
    */
    describe("PUT /api/tasks/:id", () => {
        it("It should PUT an existing task", (done) => {
            const taskId = 1;
            const task = {
                description: "Task 1 changed",
                status: 'completed'
            };
            chai.request(server)                
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq("Task is updated successfully.");
                done();
                });
        });

        it("It should NOT PUT an nonexisting task", (done) => {
            const taskId = 11;
            const task = {
                status: "completed"
            };
            chai.request(server)                
                .put("/api/tasks/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(500);
                    response.text.should.be.eq("Cannot update Task 11. Maybe Task was not found or req.body is empty!");
                done();
                });
        });        
    });

    /**
     * Test DELETE route
    */
    describe("DELETE /api/tasks/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = 3;
            chai.request(server)                
                .delete("/api/tasks/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

    });

})