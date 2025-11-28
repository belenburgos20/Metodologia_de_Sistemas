import { Movimiento } from '../../src/models/movimiento.model';

describe('Movimiento Model', () => {
  test('debería crear un movimiento de ingreso', () => {
    const fecha = new Date('2025-11-20T10:00:00Z');
    const movimiento = new Movimiento(1, 1, 10, 50, 'ingreso', fecha);
    
    expect(movimiento.idMovimiento).toBe(1);
    expect(movimiento.idUsuario).toBe(1);
    expect(movimiento.idProducto).toBe(10);
    expect(movimiento.cantidad).toBe(50);
    expect(movimiento.tipo).toBe('ingreso');
    expect(movimiento.fecha).toEqual(fecha);
  });

  test('debería crear un movimiento de egreso', () => {
    const fecha = new Date('2025-11-21T14:30:00Z');
    const movimiento = new Movimiento(2, 2, 12, 5, 'egreso', fecha);
    
    expect(movimiento.tipo).toBe('egreso');
    expect(movimiento.cantidad).toBe(5);
    expect(movimiento.idUsuario).toBe(2);
    expect(movimiento.idProducto).toBe(12);
  });
});