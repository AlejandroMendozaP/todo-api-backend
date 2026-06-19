const { body, validationResult } = require('express-validator');

// Middleware genérico
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Reglas POST
const validateCreateTask = [
    body('title')
        .exists().withMessage("El campo 'title' es obligatorio.")
        .notEmpty().withMessage("El campo 'title' no puede estar vacío.")
        .isString().withMessage("El campo 'title' debe ser una cadena de texto."),
    body('description')
        .optional()
        .isString().withMessage("El campo 'description' debe ser una cadena de texto."),
    validateResult
];

// Reglas PUT
const validateUpdateTask = [
    body('completed')
        .exists().withMessage("El campo 'completed' es obligatorio.")
        .isBoolean().withMessage("El campo 'completed' debe ser un valor booleano (true o false)."),
    validateResult
];

module.exports = {
    validateCreateTask,
    validateUpdateTask
};