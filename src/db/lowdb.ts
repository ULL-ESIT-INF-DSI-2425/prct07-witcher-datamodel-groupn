//import { Low } from "lowdb";
//import { JSONFile } from "lowdb/node";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import { Bien } from "../elements/Bien.js";
import { Cliente } from "../elements/Cliente.js";
import { Mercader } from "../elements/Mercader.js";
import { Transaccion } from "../elements/Transaccion.js";
/**
 * Esquema de datos
 * @param bienes - Lista de bienes
 * @param mercaderes - Lista de mercaderes
 * @param clientes - Lista de clientes
 * @param transacciones - Lista de transacciones
 */
type DataSchema = {
    bienes: Bien[];
    mercaderes: Mercader[];
    clientes: Cliente[];
    transacciones: Transaccion[];
}

/**
 * Clase para el adaptador usada para los test, de forma que se hagan en memoria y no modifiquen la base de datos.
 */
class MemorySync<T> {
    private data: T | null = null;
  
    read(): T | null {
      return this.data;
    }
  
    write(data: T): void {
      this.data = data;
    }
  }

//const adapter = new JSONFileSync<DataSchema>("db.json");

// Seleccionar el adaptador según el entorno
const adapter = process.env.NODE_ENV === "test" ? new MemorySync<DataSchema>() : new JSONFileSync<DataSchema>("db.json");
 
const db = new LowSync(adapter);

// const adapter = new JSONFileSync<DataSchema>("db.json");
// const db = new LowSync(adapter);


db.read();
db.data ||= { bienes: [], mercaderes: [], clientes: [], transacciones: []};
db.write();


export {db};