import { database } from "./database.service";

export const getMovimientos = async () => {
    return Promise.resolve(database.getMovimientos());
};