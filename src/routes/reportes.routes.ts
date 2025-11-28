import { Router } from "express";
import {
  reporteResumenMensual,
  reporteStockBajo,
} from "../controllers/reportes.controller";
import { verificarToken } from "../controllers/auth.controller";

const routermovimientos = Router();
routermovimientos.use(verificarToken);
routermovimientos.get("/resumen-mensual", reporteResumenMensual);
routermovimientos.get("/stock-bajo", reporteStockBajo);

export default routermovimientos;
