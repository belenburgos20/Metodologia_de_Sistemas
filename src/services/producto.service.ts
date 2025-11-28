import { database } from "./database.service";

export const obtenerProductos = () => {
    return Promise.resolve(database.getProductos());
};
