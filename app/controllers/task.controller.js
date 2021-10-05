const taskModel = require("../models/task.model");

const saveTask = async (data) => {
    return taskModel.saveTask(data);
}

const readAllTasks = async () => {
    return await taskModel.readAllTasks()
}

const readTask = async (data) => {
    return await taskModel.readTask(data)
}

const updateTask = async (data) => {
    return await taskModel.updateTask(data)
}

const deleteById = async (id) => {
    return await taskModel.deleteById(id)
}

module.exports = {
    saveTask,
    readAllTasks,
    readTask,
    updateTask,
    deleteById
};