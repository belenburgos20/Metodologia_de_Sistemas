import request from 'supertest';
import express from 'express';
import productosRoutes from '../../src/routes/producto.routes';

describe('Productos Routes Integration', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/productos', productosRoutes);
  });

  test('GET /api/productos - debería obtener todos los productos', async () => {
    const response = await request(app)
      .get('/api/productos')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('nombre');
    expect(response.body[0]).toHaveProperty('precio');
    expect(response.body[0]).toHaveProperty('stock');
  });

  test('GET /api/productos/:id - debería obtener producto por ID', async () => {
    const response = await request(app)
      .get('/api/productos/1')
      .expect(200);
    
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('nombre');
    expect(response.body).toHaveProperty('precio');
    expect(response.body).toHaveProperty('stock');
  });
});