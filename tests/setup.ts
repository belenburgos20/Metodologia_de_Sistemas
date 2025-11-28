import { database } from '../src/services/database.service';

// Limpiar la base de datos antes de cada test
beforeEach(() => {
  // Resetear la instancia de la base de datos para tests aislados
  const db = database;
  // Aquí podrías limpiar datos si es necesario
});

afterEach(() => {
  // Limpiar después de cada test
});