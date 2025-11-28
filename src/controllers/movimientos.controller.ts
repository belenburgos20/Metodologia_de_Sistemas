import { Request, Response } from "express";
import { getMovimientos } from "../services/movimiento.service";

export const obtenerMovimiento = async (req: Request, res: Response) => {
  try {
    const movimientos = await getMovimientos();
    return res.status(200).json(movimientos);
  } catch (error) {
    console.error("Error al obtener los movimientos:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener los movimientos" });
  }
};
export const obtenerMovimientoId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const movimientos = await getMovimientos();
    const movimiento = movimientos.find((u: any) => u.id === id);
    if (movimiento) {
      return res.status(200).json(movimiento);
    } else {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el movimiento:", error);
    return res.status(500).json({ message: "Error al obtener el movimiento" });
  }
};

export const obtenerIngresos = async (req: Request, res: Response) => {
  try {
    const movimientos = await getMovimientos();
    const ingresos = movimientos.filter((mov: any) => mov.tipo === "ingreso");
    return res.status(200).json(ingresos);
  } catch (error) {
    console.error("Error al obtener los ingresos:", error);
    return res.status(500).json({ message: "Error al obtener los ingresos" });
  }
};
export const obtenerEgresos = async (req: Request, res: Response) => {
  try {
    const movimientos = await getMovimientos();
    const egresos = movimientos.filter((mov: any) => mov.tipo === "egreso");
    return res.status(200).json(egresos);
  } catch (error) {
    console.error("Error al obtener los egresos:", error);
    return res.status(500).json({ message: "Error al obtener los egresos" });
  }
};

export const crearMovimiento = async (req: Request, res: Response) => {
  try {
    const nuevoMovimiento = req.body;
    if (
      !nuevoMovimiento ||
      !nuevoMovimiento.productoId ||
      !nuevoMovimiento.usuarioId ||
      !nuevoMovimiento.tipo ||
      !nuevoMovimiento.cantidad ||
      !nuevoMovimiento.fecha
    ) {
      return res
        .status(400)
        .json({ message: "Datos de movimiento incompletos" });
    }
    const movimientos = await getMovimientos();
    nuevoMovimiento.id =
      movimientos.length > 0 ? movimientos[movimientos.length - 1].id + 1 : 1;
    movimientos.push(nuevoMovimiento);
    return res
      .status(201)
      .json({
        message: "Movimiento creado correctamente",
        movimiento: nuevoMovimiento,
      });
  } catch (error) {
    console.error("Error al crear el movimiento:", error);
    return res.status(500).json({ message: "Error al crear el movimiento" });
  }
};
export const eliminarMovimiento = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const movimientos = await getMovimientos();
    const index = movimientos.findIndex((mov: any) => mov.id === id);
    if (index !== -1) {
      movimientos.splice(index, 1);
      return res
        .status(200)
        .json({ message: "Movimiento eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el movimiento:", error);
    return res.status(500).json({ message: "Error al eliminar el movimiento" });
  }
};
export const modificarMovimiento = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const movimientos = await getMovimientos();
    const movimientoIndex = movimientos.findIndex((mov: any) => mov.id === id);
    if (movimientoIndex !== -1) {
      movimientos[movimientoIndex] = {
        ...movimientos[movimientoIndex],
        ...req.body,
      };
      return res
        .status(200)
        .json({
          message: "Movimiento modificado correctamente",
          movimiento: movimientos[movimientoIndex],
        });
    } else {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }
  } catch (error) {
    console.error("Error al modificar el movimiento:", error);
    return res
      .status(500)
      .json({ message: "Error al modificar el movimiento" });
  }
};
