import { Router } from "express";
import {
  ObtenerProductos,
  obtenerProductoPorCodigo,
  agregarProducto,
  modificarProducto,
  eliminarProducto,
} from "../controllers/productos.controller";

const routerproductos = Router();
routerproductos.get("/", ObtenerProductos);
routerproductos.get("/:id", obtenerProductoPorCodigo);
routerproductos.post("/", agregarProducto);
routerproductos.put("/:id", modificarProducto);
routerproductos.delete("/:id", eliminarProducto);

export default routerproductos;
