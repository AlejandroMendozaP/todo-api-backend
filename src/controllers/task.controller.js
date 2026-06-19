let tasks = [];
let nextId = 1;

const createTask = (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ error: "El campo 'title' es obligatorio." });
    }

    const newTask = {
        id: String(nextId++),
        title,
        description: description || "",
        completed: false
    };

    tasks.push(newTask);
    return res.status(201).json(newTask);
};

// GET /tasks
const getTasks = (req, res) => {
    const { completed } = req.query;

    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        const filteredTasks = tasks.filter(t => t.completed === isCompleted);
        return res.status(200).json(filteredTasks);
    }

    return res.status(200).json(tasks);
};

// GET /tasks/:id
const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Tarea no encontrada." });
    }

    return res.status(200).json(task);
};

// PUT /tasks/:id
const updateTask = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (completed === undefined || typeof completed !== 'boolean') {
        return res.status(400).json({ error: "El campo 'completed' debe ser un valor booleano." });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tarea no encontrada." });
    }

    tasks[taskIndex].completed = completed;

    return res.status(200).json(tasks[taskIndex]);
};

// DELETE /tasks/:id
const deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Tarea no encontrada." });
    }

    tasks.splice(taskIndex, 1);
    return res.status(204).send();
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};