export class Movimiento {
    idMovimiento: number;
    idUsuario: number;
    idProducto: number;
    cantidad: number;
    tipo: string;
    fecha: Date;

    constructor(idMovimiento: number, idUsuario: number, idProducto: number, cantidad: number, tipo: string, fecha: Date) {
        this.idMovimiento = idMovimiento;
        this.idUsuario = idUsuario;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.tipo = tipo;
        this.fecha = fecha;
    }
}
