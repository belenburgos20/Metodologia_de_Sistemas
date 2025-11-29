# Sistema de Gestión de Presupuestos y Productos

## Backend en Node.js + Express 

### Descripción del Proyecto
Este proyecto implementa un backend para la gestión de productos, categorías, usuarios y presupuestos
El objetivo es ofrecer una *API clara y modular* que permita administrar la información del sistema y facilitar futuras integraciones con un frontend.
Se utiliza una arquitectura organizada basada en *controllers, services, models, routes*, asegurando escalabilidad y buena mantenibilidad.
El proyecto incorpora patrones de diseño (creacionales, estructurales y de comportamiento) exigidos por la materia y aplicados en el contexto de este sistema.

---

### Tecnologías utilizadas 
* Node.js
* Express.js
* TypeScript 

---

### Estructura del proyecto 

metodologia de sistemas/ 
── src/ │ 
  ├── controllers/ 
  ├── services/  
  ├── models/ 
  ├── routes/ 
  └── app.ts 
  └── package.json 


#### Descripción de carpetas [cite: 21]
* *controllers/*: Manejan las solicitudes HTTP, validan datos y llaman a los servicios.
* *services/*: Contienen la lógica del negocio.
* *models/*: Definen las entidades del sistema (Usuario, Producto, Presupuesto...)
* *routes/*: Definen los endpoints disponibles

---

###  Patrones de Diseño Utilizados
A continuación se detallan los patrones implementados y los archivos donde se aplican.

#### 1. Singleton
* *Archivo*: database.service.ts
* *Descripción*: El servicio de base de datos funciona como un Singleton, garantizando una única instancia compartida en todo el sistema. Esto evita múltiples conexiones o duplicación de datos en mocks

#### 2. Factory 
* *Archivos*: usuario.model.ts, usuario.controller.ts (creación de usuario) 
* *Descripción*: Se implementa una fábrica de usuarios que asigna roles (admin, empleado, etc.) desde un único punto. Evita repetición de código y permite extender roles fácilmente

#### 3. Facade 
* *Archivo*: Cualquier archivo dentro de *.service.ts
* *Descripción: Cada **service actúa como una fachada* : el controller realiza una llamada simple mientras que internamente el service coordina validaciones, cálculos, consultas y actualizaciones
* *Ejemplo típico*: validar stock, registrar movimiento, actualizar producto, crear presupuesto

---

###  Endpoints principales

##  Usuarios 

| Operación             | Método   | Endpoint           | Comando curl 
| :---                  | :---     | :---               | :--- 
| *Obtener todos*       | GET      | /usuarios          | curl -X GET http://localhost:3000/usuarios 
| *Obtener por ID*      | GET      | /usuarios/:id      | curl -X GET http://localhost:3000/usuarios/1
| *Crear usuario*       | POST     | /usuarios          | curl -X POST http://localhost:3000/usuarios \ -H "Content-Type: application/json" \ -d'{"nombre": "Nuevo Usuario", "email": "nuevo@example.com", "password": "123456", "rol": "empleado"}'
| *Modificar usuario*   | PUT      | /usuarios/:id      | curl -X PUT http://localhost:3000/usuarios/1 \ -H "Content-Type: application/json" \ -d '{"nombre": "Usuario Actualizado"}'
| *Eliminar usuario*    | DELETE   | /usuarios/:id      | curl -X DELETE http://localhost:3000/usuarios/1 
| *Login*               | POST     | /usuarios/login    | curl -X POST http://localhost:3000/usuarios/login \ -H "Content-Type: application/json" \ -d '{"email": "admin@example.com", "password": "1234"}'
| *Logout*              | POST     | /usuarios/logout   | curl -X POST http://localhost:3000/usuarios/logout 

###  Productos 

| Operación           | Método | Endpoint        | Comando curl 
| :---                | :---   | :---            | :--- 
| *Obtener todos*     | GET    | /productos      | curl -X GET http://localhost:3000/productos 
| *Obtener por ID*    | GET    | /productos/:id  | curl -X GET http://localhost:3000/productos/1 
| *Crear producto*    | POST   | /productos      | curl -X POST http://localhost:3000/productos \ -H "Content-Type: application/json" \ -d'{"nombre": "Producto X", "precio": 1500, "stock": 50, "activo": true}'
| *Modificar producto*| PUT    | /productos/:id  | curl -X PUT http://localhost:3000/productos/1 \ -H "Content-Type: application/json" \ -d'{"precio": 1999}' 
| *Eliminar producto* | DELETE | /productos/:id  | curl -X DELETE http://localhost:3000/productos/1

###  Movimientos 

| Operación               | Método  | Endpoint                | Comando curl 
| :---                    | :---    | :---                    | :--- 
| *Obtener todos*         | GET     | /movimientos            | curl -X GET http://localhost:3000/movimientos 
| *Obtener ingresos*      | GET     | /movimientos/ingresos   | curl -X GET http://localhost:3000/movimientos/ingresos
| *Obtener egresos*       | GET     | /movimientos/egresos    | curl -X GET http://localhost:3000/movimientos/egresos
| *Obtener por ID*        | GET     | /movimientos/:id        | curl -X GET http://localhost:3000/movimientos/1
| *Crear movimiento*      | POST    | /movimientos            | curl -X POST http://localhost:3000/movimientos \ -H "Content-Type: application/json" \ -d'{"tipo": "ingreso", "productoId": 2, "cantidad": 5, "usuarioId": 1}' 
| *Modificar movimiento*  | PUT     | /movimientos/:id        | curl -X PUT http://localhost:3000/movimientos/1 \ -H "Content-Type: application/json" \ -d '{"cantidad": 10}'
| *Eliminar movimiento*   | DELETE | /movimientos/:id         | curl -X DELETE http://localhost:3000/movimientos/1 


#### Usuarios 
* GET /usuarios
* GET /usuarios/:id
* POST /usuarios
* PUT /usuarios/:id
* DELETE /usuarios/:id 
* POST /login 
* POST /logout 

#### Productos 
* GET /productos 
* POST /productos 
* PUT /productos/:id 
* DELETE /productos/:id

---

###  Scripts del proyecto 
 Comando     
 npm install  
 npm run dev 
 npm start

###  Ejecución del proyecto 
1.  *Clonar el repositorio*: git clone  
2.  *Instalar dependencias*: npm install 
3.  *Levantar servidor*: npm run dev 
4.  *API disponible en*: http://localhost:3000 

---

### Justificación para la entrega 
Este backend cumple con los requisitos académicos:
* Implementa patrones de diseño creacionales, estructurales y de comportamiento.
* Utiliza una arquitectura modular y clara.
* Es completamente funcional con datos mock.
* Está preparado para integrarse con un frontend o migrar a una base real.

### Estado actual 
Backend funcional, modular, documentado y preparado para presentación.

---

###  Integrantes 

  Ian Franco Ibañez
  Belén Burgos
  Noelia Hubert
  Luciano Guardese
