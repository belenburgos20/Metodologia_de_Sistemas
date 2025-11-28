export class Usuario {
    idUsuario: number;
    nombre: string;
    email: string;
    password: string;
    rol: string;

    constructor(idUsuario: number, nombre: string, email: string, password: string, rol: string) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}