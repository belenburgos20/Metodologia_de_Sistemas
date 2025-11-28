import { Router } from "express";
import {
  reporteResumenMensual,
  reporteStockBajo,
} from "../controllers/reportes.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const routerReportes = Router();
routerReportes.get("/resumen-mensual", authenticateUser, reporteResumenMensual);
routerReportes.get("/stock-bajo", authenticateUser, reporteStockBajo);

export default routerReportes;
