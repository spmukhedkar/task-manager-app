const db = require("../schemas");
const Task = db.task;
const Op = db.Sequelize.Op;

const saveTask = async (data) => {
  const task = await Task.create(data);
  return task.save();
};

const readAllTasks = async() => {
  const tasks = await Task.findAll();
  return tasks;
}

const readTask = async (task_id) => {
  console.log(task_id);
  var condition = task_id ? { id: { [Op.like]: `%${task_id}%` } } : null;
  const task = await Task.findByPk(task_id);
  return task;
}

const updateTask = async (data) => {
  const task_id = data.id;  
  const isUpdate = await Task.update(data, {
    where: { id: task_id }
  })
  return isUpdate;
}

const deleteById = async (id) => {
  return await Task.destroy({
    where: { id: id }
  })
}

module.exports = {
    saveTask,
    readAllTasks,
    readTask,
    updateTask,
    deleteById
};