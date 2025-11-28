import { Request, Response, NextFunction } from "express";
import { getUsuarios } from "../services/usuario.service";

interface RequestConUsuario extends Request {
  usuario?: {
    id?: number;
    email?: string;
    rol?: string;
    [key: string]: any;
  };
}

export const authenticateUser = async (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) => {
  try {
    const usuarioId = req.headers["x-usuario-id"] as string;
    const email = req.headers["x-usuario-email"] as string;

    if (!usuarioId && !email) {
      return res
        .status(401)
        .json({ message: "No se proporcionó información de usuario" });
    }

    const usuarios = await getUsuarios();
    let usuario;

    if (usuarioId) {
      usuario = usuarios.find((u: any) => u.id === parseInt(usuarioId, 10));
    } else if (email) {
      usuario = usuarios.find((u: any) => u.email === email);
    }

    if (!usuario) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    req.usuario = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      ...usuario,
    };

    next();
  } catch (error) {
    console.error("Error en autenticación:", error);
    return res.status(500).json({ message: "Error en la autenticación" });
  }
};

