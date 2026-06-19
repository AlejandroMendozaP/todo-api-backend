require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', taskRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Endpoint no encontrado." });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});