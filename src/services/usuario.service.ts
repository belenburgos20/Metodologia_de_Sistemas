import { database } from "./database.service";

export const getUsuarios = async () => {
    return Promise.resolve(database.getUsuarios());
};