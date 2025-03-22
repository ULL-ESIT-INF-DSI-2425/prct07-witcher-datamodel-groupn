import { db } from "../src/db/lowdb";
import { beforeEach } from "vitest";

/**
 * Reinicia la base de datos en memoria antes de cada prueba
 */
beforeEach(() => {
  db.data = {
    bienes: [],
    clientes: [],
    mercaderes: [],
    transacciones: [],
  };
  db.write();
});