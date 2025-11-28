import {Request, Response} from "express";
import { obtenerProductos } from "../services/producto.service";
import { database } from "../services/database.service";
import { CalculadoraPrecio, PrecioNormalStrategy, DescuentoVolumenStrategy, DescuentoClienteFrecuenteStrategy, PrecioConImpuestoStrategy } from "../services/pricing.strategy";

export const ObtenerProductos = async (req: Request, res: Response) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ mensaje: "Error al obtener los productos" });
    }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const productos = await obtenerProductos();
        const producto = productos.find((p: any) => p.id === id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ mensaje: "Error al obtener el producto" });
    }
};

export const obtenerProductoPorCodigo = async (req: Request, res: Response) => {
    const codigo = req.params.codigo;
    try {
        const producto = database.getProductoByCodigo(codigo);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ mensaje: "Error al obtener el producto" });
    }
};

export const obtenerProductoPorCategoria = async (req: Request, res: Response) => {
    const idCategoria = parseInt(req.params.idcategoria);
    try {
        const productos = await obtenerProductos();
        const productosFiltrados = productos.filter(p => p.idCategoria === idCategoria);
        res.json(productosFiltrados);
    }
    catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
};

export const obtenerProductoPorNombre = async (req: Request, res: Response) => {
    const nombre = req.params.nombre.toLowerCase();
    try {
        const productos = await obtenerProductos();
        const productosFiltrados = productos.filter(p => p.nombre.toLowerCase()=== nombre || p.nombre.toLowerCase().includes(nombre));
        if (productosFiltrados.length > 0) {
            res.status(200).json(productosFiltrados);
        }
        else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
};
export const modificarProducto = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const producto = req.body;
    try {
        const productoExistente = database.getProductoById(id);
        if (!productoExistente) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        
        const actualizado = database.updateProducto(id, producto);
        if (actualizado) {
            const productoActualizado = database.getProductoById(id);
            res.json({ producto: productoActualizado, mensaje: "Producto modificado correctamente" });
        } else {
            res.status(500).json({ mensaje: "Error al modificar el producto" });
        }
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        res.status(500).json({ mensaje: "Error al modificar el producto" });
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = database.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        
        const eliminado = database.deleteProducto(producto.codigo);
        if (eliminado) {
            res.json({ mensaje: "Producto eliminado correctamente" });
        } else {
            res.status(500).json({ mensaje: "Error al eliminar el producto" });
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
};

export const agregarProducto = async (req: Request, res: Response) => {
    const producto = req.body;
    try {
        if (!producto.id) {
            const productos = await obtenerProductos();
            producto.id = productos.length > 0 ? Math.max(...productos.map((p: any) => p.id)) + 1 : 1;
        }
        
        database.addProducto(producto);
        res.json({ producto, mensaje: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ mensaje: "Error al agregar el producto" });
    }
};

export const calcularPrecio = async (req: Request, res: Response) => {
    try {
        const { productoId, cantidad, estrategia, aplicarImpuesto } = req.body;
        
        if (!productoId) {
            return res.status(400).json({ mensaje: "productoId es requerido" });
        }

        const productos = await obtenerProductos();
        const producto = productos.find((p: any) => p.id === productoId);
        
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const precioBase = producto.precio;
        const calculadora = new CalculadoraPrecio();

        if (estrategia === "descuento_volumen") {
            calculadora.setStrategy(new DescuentoVolumenStrategy(10, 10));
        } else if (estrategia === "cliente_frecuente") {
            calculadora.setStrategy(new DescuentoClienteFrecuenteStrategy(5));
        } else {
            calculadora.setStrategy(new PrecioNormalStrategy());
        }

        if (aplicarImpuesto) {
            const estrategiaActual = calculadora["strategy"];
            calculadora.setStrategy(new PrecioConImpuestoStrategy(21, estrategiaActual));
        }

        const precioFinal = calculadora.calcular(precioBase, cantidad);
        const descripcion = calculadora.getDescripcionEstrategia();

        return res.status(200).json({
            producto: producto.nombre,
            precioBase: precioBase,
            cantidad: cantidad || 1,
            precioFinal: precioFinal,
            descuento: precioBase - precioFinal,
            estrategia: descripcion
        });
    } catch (error) {
        console.error("Error al calcular el precio:", error);
        return res.status(500).json({ mensaje: "Error al calcular el precio" });
    }
};
