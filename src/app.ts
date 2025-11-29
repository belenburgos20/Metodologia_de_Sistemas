import express from "express";
import cors from "cors";
import productoRoutes from "./routes/producto.routes";
import movimientoRoutes from "./routes/movimientos.routes";
import usuarioRoutes from "./routes/usuario.routes";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente." });
});

export default app;
