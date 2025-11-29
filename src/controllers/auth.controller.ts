import { Request, Response } from "express";
import { getUsuarios } from "../services/usuario.service";

export const loginUsuario = async (req: Request, res: Response) => {
  const { email, contraseña } = req.body;

  try {
    const usuarios = await getUsuarios();
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    return res.status(200).json({
      message: "Login exitoso",
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error al hacer login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logoutUsuario = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al hacer logout:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};