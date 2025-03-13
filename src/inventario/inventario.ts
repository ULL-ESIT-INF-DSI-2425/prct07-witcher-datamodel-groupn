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

    removeBien(id: number) {
        db.read();
    
        if (!db.data || !db.data.bienes) {
            console.log("No hay bienes en la base de datos.");
            return;
        }
    
        const index = db.data.bienes.findIndex((b: Bien) => b.id === id);
    
        if (index === -1) {
            console.log("El bien con ese ID no existe.");
            return;
        }
    
        db.data.bienes.splice(index, 1);
        db.write();
    
        console.log(`Bien con ID ${id} ha sido eliminado correctamente.`);
    }

    removeMercader(id: number) {
        db.read();
    
        if (!db.data || !db.data.mercaderes) {
            console.log("No hay mercaderes en la base de datos.");
            return;
        }
    
        const index = db.data.mercaderes.findIndex((m: Mercader) => m.id === id);
    
        if (index === -1) {
            console.log("El mercader con ese ID no existe.");
            return;
        }
    
        db.data.mercaderes.splice(index, 1);
        db.write();
    
        console.log(`Mercader con ID ${id} ha sido eliminado correctamente.`);
    }

    removeCliente(id: number) {
        db.read();
    
        if (!db.data || !db.data.clientes) {
            console.log("No hay clientes en la base de datos.");
            return;
        }
    
        const index = db.data.clientes.findIndex((c: Cliente) => c.id === id);
    
        if (index === -1) {
            console.log("El cliente con ese ID no existe.");
            return;
        }
    
        db.data.clientes.splice(index, 1);
        db.write();
    
        console.log(`Cliente con ID ${id} ha sido eliminado correctamente.`);
    }
    
}