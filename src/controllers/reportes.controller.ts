import { Request, Response } from "express";
import { obtenerProductos } from "../services/producto.service";
import { getMovimientos } from "../services/movimiento.service";

interface RequestConUsuario extends Request {
  usuario?: {
    rol?: string;
    [key: string]: any;
  };
}

function esAdmin(req: RequestConUsuario): boolean {
  return !!req.usuario && req.usuario.rol === "admin";
}

export const reporteStockBajo = async (
  req: RequestConUsuario,
  res: Response
) => {
  if (!esAdmin(req)) {
    return res
      .status(403)
      .json({ message: "Solo el administrador puede acceder a este reporte" });
  }
  try {
    const productos = await obtenerProductos();
    const stockBajo = productos.filter(
      (prod: any) => prod.stock <= (prod.stockMinimo || 10)
    );
    return res.status(200).json(stockBajo);
  } catch (error) {
    console.error("Error al generar el reporte de stock bajo:", error);
    return res
      .status(500)
      .json({ message: "Error al generar el reporte de stock bajo" });
  }
};

export const reporteResumenMensual = async (
  req: RequestConUsuario,
  res: Response
) => {
  if (!esAdmin(req)) {
    return res
      .status(403)
      .json({ message: "Solo el administrador puede acceder a este reporte" });
  }
  try {
    const movimientos = await getMovimientos();
    const resumen: { [key: string]: { ingresos: number; egresos: number } } =
      {};
    movimientos.forEach((mov: any) => {
      const fecha = new Date(mov.fecha);
      const key = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}`;
      if (!resumen[key]) {
        resumen[key] = { ingresos: 0, egresos: 0 };
      }
      if (mov.tipo === "ingreso") {
        resumen[key].ingresos += mov.cantidad;
      } else if (mov.tipo === "egreso") {
        resumen[key].egresos += mov.cantidad;
      }
    });
    const resumenArray = Object.entries(resumen)
      .map(([mes, valores]) => ({ mes, ...valores }))
      .sort((a, b) => b.mes.localeCompare(a.mes));
    return res.status(200).json(resumenArray);
  } catch (error) {
    console.error("Error al generar el reporte resumen mensual:", error);
    return res
      .status(500)
      .json({ message: "Error al generar el reporte resumen mensual" });
  }
};
