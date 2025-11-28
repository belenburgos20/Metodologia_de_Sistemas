import { Producto } from '../../src/models/producto.model';

describe('Producto Model', () => {
  test('debería crear un producto con todos los campos', () => {
    const producto = new Producto(1, 'MANGUERIN', 15500, 10, true);
    
    expect(producto.idProducto).toBe(1);
    expect(producto.nombre).toBe('MANGUERIN');
    expect(producto.precio).toBe(15500);
    expect(producto.stock).toBe(10);
    expect(producto.activo).toBe(true);
  });

  test('debería crear un producto inactivo', () => {
    const productoInactivo = new Producto(2, 'PRODUCTO INACTIVO', 5000, 0, false);
    
    expect(productoInactivo.activo).toBe(false);
    expect(productoInactivo.stock).toBe(0);
    expect(productoInactivo.idProducto).toBe(2);
  });

  test('debería ejecutar findAll estático', () => {
    const productos = Producto.findAll();
    expect(Array.isArray(productos)).toBe(true);
    expect(productos).toHaveLength(0);
  });
});