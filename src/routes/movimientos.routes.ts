import { Router } from "express";
import {
  obtenerMovimiento,
  obtenerEgresos,
  obtenerIngresos,
  obtenerMovimientoId,
  eliminarMovimiento,
  crearMovimiento,
  modificarMovimiento,
} from "../controllers/movimiento.controller";

const routermovimientos = Router();
routermovimientos.get("/", obtenerMovimiento);
routermovimientos.get("/ingresos", obtenerIngresos);
routermovimientos.get("/egresos", obtenerEgresos);
routermovimientos.get("/:id", obtenerMovimientoId);
routermovimientos.post("/", crearMovimiento);
routermovimientos.put("/:id", modificarMovimiento);
routermovimientos.delete("/:id", eliminarMovimiento);

export default routermovimientos;
