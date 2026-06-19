const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const apiKeyAuth = require('../middlewares/auth.middleware');
const { validateCreateTask, validateUpdateTask } = require('../controllers/task.validator');

// Rutas públicas
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById);

//Rutas privadas
router.post('/tasks', apiKeyAuth, validateCreateTask, taskController.createTask);
router.put('/tasks/:id', apiKeyAuth, validateUpdateTask, taskController.updateTask);
router.delete('/tasks/:id', apiKeyAuth, taskController.deleteTask);

module.exports = router;