const express = require("express");
const taskCtrl = require("../controllers/task.controller");


const router = new express.Router();

// Retrieve all tasks
router.get("/tasks", async(req, res) => {
  try {
    const tasks = await taskCtrl.readAllTasks();
    res.send(tasks);
  } catch (error) {
    console.log(`Error: ${JSON.stringify(error.message)}`);
    res.status(500).json(error);
  }
});

// Retrieve single task
router.get("/tasks/:id", async(req, res) => {
  try {
    const task_id = req.params.id ? req.params.id: null;
    const tasks = await taskCtrl.readTask(task_id);
    res.send(tasks);
  } catch (error) {
    console.log(`Error: ${JSON.stringify(error.message)}`);
    res.status(500).json(error);
  }
});


// Add new task
router.post("/tasks", async(req, res) => {
  try{
    await taskCtrl.saveTask({
      ...req.body
    })
    res.status(201).json({ message: "Task Saved Successfully" })
  } catch(error) {
    console.log(`Error: ${JSON.stringify(error.message)}`);
    if (error.statusCode === 422) {
      res.status(422).json(error);
    } else {
      res.status(500).json(error);
    }
  }
})

//Update either status, description, or both of a particular task
router.put("/tasks/:id", async(req, res) => {
  const task_id = req.params.id;
  try {
    const numb = await taskCtrl.updateTask({
      id: task_id,
      ...req.body
    }).then(num => {
        if (num[0] == 1) {
          res.status(200).send({
            message: "Task is updated successfully."
          });
        } else {
          throw new Error(`Cannot update Task ${task_id}. Maybe Task was not found or req.body is empty!`);
        }
      })
      .catch(err => {
        res.status(500).send(err.message)
      });
      
  } catch(err) {
    res.status(500).send(err.message);
  }
})


//delete the task by Id
router.delete("/tasks/:id", async(req, res) => {
  try{
    const id = req.params.id ? req.params.id: null;
    await taskCtrl.deleteById(id);
    res.status(200).send({
      message: "Task deleted successfully."
    })  
  } catch (error) {
    console.log(`Error: ${JSON.stringify(error.message)}`);
    if (error.statusCode === 422) {
      res.status(422).json(error);
    } else {
      res.status(500).json(error);
    }
  }
})

module.exports = router;