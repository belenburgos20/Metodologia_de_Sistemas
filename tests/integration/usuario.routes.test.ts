import request from 'supertest';
import express from 'express';
import usuarioRoutes from '../../src/routes/usuario.routes';

describe('Usuario Routes Integration', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/usuarios', usuarioRoutes);
  });

  test('GET /api/usuarios - debería obtener todos los usuarios', async () => {
    const response = await request(app)
      .get('/api/usuarios')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('nombre');
    expect(response.body[0]).toHaveProperty('email');
  });

  test('GET /api/usuarios/1 - debería obtener usuario por ID existente', async () => {
    const response = await request(app)
      .get('/api/usuarios/1')
      .expect(200);
    
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('nombre');
    expect(response.body).toHaveProperty('email');
  });
});