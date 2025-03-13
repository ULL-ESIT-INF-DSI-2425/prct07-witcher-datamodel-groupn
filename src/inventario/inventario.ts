//import { db, initDB } from "../db/lowdb.js";
import { db } from "../db/lowdb.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";

export class Inventario {
    //constructor(){initDB();}
    constructor(){}

    getAll(){
        //await db.read();
        db.read();
        return db.data;
    }

    getBienes(){
        db.read();
        return db.data?.bienes || null;
    }

    getMercaderes(){
        db.read();
        return db.data?.mercaderes || null;
    }

    getClientes(){
        db.read();
        return db.data?.clientes || null;
    }

    addBien(bien: Bien){
        //db.read();
        //db.data.bienes.push(bien);

        if(isNaN(bien.id) || isNaN(bien.peso) || isNaN(bien.valor)){
            console.log("Error. ID, peso y valor deben ser tipo number.");
            return;
        }

        if(db.data?.bienes.some((b: Bien) => b.id === bien.id)){
            console.log("ID del bien no unico.");
        } else {
            db.data?.bienes.push(bien);
            db.write();
        }

        //db.data?.bienes.push(bien);
        //db.write();
    }

    addMercader(mercader: Mercader){
        //db.read();
        //db.data.bienes.push(bien);

        if(isNaN(mercader.id)){
            console.log("Error. ID debe ser tipo number.");
            return;
        }

        if(db.data?.mercaderes.some((m: Mercader) => m.id === mercader.id)){
            console.log("ID del mercader no unico.");
        } else {
            db.data?.mercaderes.push(mercader);
            db.write();
        }

        //db.data?.bienes.push(bien);
        //db.write();
    }

    addCliente(cliente: Cliente){
        db.read();

        if(isNaN(cliente.id)){
            console.log("Error. ID debe ser tipo number.");
            return;
        }
        //db.data.bienes.push(bien);
        if(db.data?.clientes.some((c: Cliente) => c.id === cliente.id)){
            console.log("ID del bien no unico.");
        } else {
            db.data?.clientes.push(cliente);
            db.write();
        }

        //db.data?.bienes.push(bien);
        //db.write();
    }

    //removeBien(bien: Bien){
    //    db.read();
        //if(db.data?.bienes)

    //}
}