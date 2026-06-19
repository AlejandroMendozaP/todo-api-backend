const request = require('supertest');
const app = require('../app');

describe('Pruebas para la API de Tareas (To-Do API)', () => {

    it('should create a new task successfully', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Comprar leche',
                description: 'Ir al super'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Comprar leche');
        expect(response.body.completed).toBe(false);
    });

    // Test para GET /tasks
    it('should get all tasks', async () => {
        const response = await request(app).get('/api/tasks');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Test para validación básica (Manejo de errores 400)
    it('should return 400 if title is missing', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({
                description: 'Sin título'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    // Test para GET /tasks/{id} - Caso No Encontrado (404)
    it('should return 404 for a non-existing task ID', async () => {
        const response = await request(app).get('/api/tasks/999');

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    it('should update a task status to completed', async () => {
        const taskId = 1;
        const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send({ completed: true });

        expect(response.statusCode).toBe(200);
        expect(response.body.completed).toBe(true);
    });

    it('should delete a task', async () => {
        const taskId = 1;
        const response = await request(app).delete(`/api/tasks/${taskId}`);

        expect(response.statusCode).toBe(204);
    });
});