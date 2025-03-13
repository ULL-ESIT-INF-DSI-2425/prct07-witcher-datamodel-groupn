//import { Low } from "lowdb";
//import { JSONFile } from "lowdb/node";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

import { Bien } from "../elements/Bien.js";
import { Cliente } from "../elements/Cliente.js";
import { Mercader } from "../elements/Mercader.js";

type DataSchema = {
    bienes: Bien[];
    mercaderes: Mercader[];
    clientes: Cliente[];
}

const adapter = new JSONFileSync<DataSchema>("db.json");
const db = new LowSync(adapter);

//export async function initDB() {
//    await db.read();
    db.read();
    db.data ||= { bienes: [], mercaderes: [], clientes: [] };
    db.write();
//    await db.write();
//}

export {db};