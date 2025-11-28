import { Router } from "express";
import {
  ObtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  modificarUsuario,
  eliminarUsuario,
} from "../controllers/usuario.controller";
import { loginUsuario, logoutUsuario } from "../controllers/auth.controller";

const routerusuario = Router();
routerusuario.get("/", ObtenerUsuarios);
routerusuario.get("/:id", obtenerUsuarioPorId);
routerusuario.post("/", crearUsuario);
routerusuario.put("/:id", modificarUsuario);
routerusuario.delete("/:id", eliminarUsuario);
routerusuario.post("/login", loginUsuario);
routerusuario.post("/logout", logoutUsuario);

export default routerusuario;
