import { Usuario } from "./usuario.model";

export class Producto {
    idProducto: number;
    nombre: string;
    precio: number;
    stock: number;
    activo: boolean;

    constructor(idProducto: number, nombre: string, precio: number, stock: number, activo: boolean) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.activo = activo;
    }
    static findAll() : Producto[]{
        return []
    }
    }