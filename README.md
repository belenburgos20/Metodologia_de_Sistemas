# Metodología de Sistemas II  (TUP)

## Integrantes
- Hubert Noelia
- Guardese Luciano
- Ibañez Ian Franco
- Burgos Belén

## Profesor y ayudante
- Lucas Fassi
- Javier Kinter

## Proyecto
### Introduccion

Proponemos desarrollar un Sistema de Gestion de stock y administracion, orientado a administradores y empleados de un negocio de ventas.
La finalidad es contar con una herramienta web que permita registrar movimientos de stock, consultar existencias y generar reportes básicos, evitando errores manuales y mejorando la organización interna.

### Objetivos 

- Implementar un sistema que centralice el control de stock en una unica plataforma.

- Facilitar la gestion de usuarios internos (administradores y empleados).

- Asegurar que el sistema sea simple de usar y mantenible a futuro.

### Metodo de Trabajo

- *Control de versiones con Git/GitHub*: ramas principales `main` y `develop`, con ramas `feature` para funcionalidades nuevas
  
- *Manejo de dependencias*: separación entre dependencias de producción (ej. Express, PostgreSQL) y dependencias de desarrollo (ej. Jest para pruebas unitarias)

### Solución Propuesta

El sistema se divide en modulos principales:

- Gestion de usuarios internos

  - Roles: Administrador y Empleado.

  - Registro, edicion y baja de usuarios.

- Gestion de productos

  - Altas, bajas y modificaciones.

  - Control de stock mínimo.

- Movimientos de stock

  - Registro de ingresos y egresos de productos.

  - Historial de movimientos con fecha, hora y usuario responsable.

- Reportes (solo para administradores)

  - Productos con stock bajo.

  - Movimientos realizados por cada empleado.

  - Resumen mensual de entradas y salidas de mercaderia.

## 

## Patrones de diseño:

**Gestión de usuarios**
- Factory nos permite crear usuarios según su rol ,administrador o empleado, sin tener que usar muchos condicionales, y cada usuario recibe automáticamente sus permisos correspondientes. Esto facilita la administración de roles.
- Singleton se utiliza en la conexión a la base de datos, para que todos los módulos del sistema accedan siempre a la misma instancia. Esto evita errores, duplicación de recursos y asegura que la información sobre usuarios o movimientos se maneje de manera compacta.
  
**Gestión de productos**
- Observer porque nos permite monitorear el stock mínimo. Cada producto actúa como sujeto y, cuando su cantidad baja de un nivel crítico, notifica automáticamente a los administradores. Así, no es necesario que ellos revisen manualmente cada producto, y el sistema puede generar alertas de manera automática.
- Decorator si algún producto requiere características adicionales o especiales en el futuro para agregar funcionalidades sin modificar la clase base del producto.
  
**Movimientos de stock**
- Facade para simplificar la interacción de los administradores con el sistema. Por ejemplo, registrar una venta o un movimiento de stock implica varios pasos internos: validar stock, descontar cantidades, registrar el movimiento y actualizar reportes. El administrador solo necesita interactuar con una interfaz simple, mientras que la complejidad interna queda oculta.
- Strategy sobre todo en la parte de cálculos o reglas de negocio que pueden variar, como descuentos, impuestos o condiciones especiales para ciertos productos. Con Strategy podemos cambiar la forma de aplicar estas reglas sin modificar el código principal, haciendo que el sistema sea más escalable.

