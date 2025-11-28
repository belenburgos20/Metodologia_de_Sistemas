import { Router } from "express";
import { ObtenerProductos, obtenerProductoPorId, obtenerProductoPorCodigo, agregarProducto, modificarProducto, eliminarProducto, calcularPrecio} from "../controllers/productos.controller";

const routerproductos = Router();
routerproductos.get("/", ObtenerProductos);
routerproductos.get("/codigo/:codigo", obtenerProductoPorCodigo);
routerproductos.get("/:id", obtenerProductoPorId);
routerproductos.post("/", agregarProducto);
routerproductos.put("/:id", modificarProducto);
routerproductos.delete("/:id", eliminarProducto);
routerproductos.post("/calcular-precio", calcularPrecio);

export default routerproductos;