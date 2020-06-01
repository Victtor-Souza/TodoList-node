const express = require('express');
const routes = express.Router();
const TaskController = require('./controllers/tasksController')

routes.post('/task', TaskController.create)
routes.get('/task', TaskController.listTasks)
routes.put('/task/:id', TaskController.updateTask)
routes.delete('/task/:id', TaskController.deleteTask)


module.exports = routes;