const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { validateCreateTask, validateUpdateTask } = require('../controllers/task.validator');

router.post('/tasks', validateCreateTask, taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', validateUpdateTask, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;