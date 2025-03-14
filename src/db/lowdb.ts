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

const adapter = new JSONFileSync<DataSchema>("db.json");
const db = new LowSync(adapter);

//export async function initDB() {
//    await db.read();
    db.read();
    db.data ||= { bienes: [], mercaderes: [], clientes: [], transacciones: []};
    db.write();
//    await db.write();
//}

export {db};