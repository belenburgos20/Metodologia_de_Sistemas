import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// acá se van a agregar las rutas más adelante
// app.use('/api/usuarios', usuariosRouter);

export default app;
