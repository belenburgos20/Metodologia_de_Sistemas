import { Router } from "express";
import {
  reporteResumenMensual,
  reporteStockBajo,
} from "../controllers/reportes.controller";

const routermovimientos = Router();
routermovimientos.get("/resumen-mensual", reporteResumenMensual);
routermovimientos.get("/stock-bajo", reporteStockBajo);

export default routermovimientos;
