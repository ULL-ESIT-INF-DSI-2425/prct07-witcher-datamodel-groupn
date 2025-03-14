//import { db, initDB } from "../db/lowdb.js";
import { db } from "../db/lowdb.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";

export class Inventario {
    //constructor(){initDB();}
    constructor(){}
    /**
     * Método para inicializar la base de datos
     */
    getAll(){
        //await db.read();
        db.read();
        return db.data;
    }
    /**
     * Método para obtener todos los bienes de la base de datos
     * @returns - Lista de bienes o null si no hay bienes
     */
    getBienes(){
        db.read();
        return db.data?.bienes || null;
    }
    /**
     * Método para obtener todos los mercaderes de la base de datos
     * @returns - Lista de mercaderes o null si no hay mercaderes
     */
    getMercaderes(){
        db.read();
        return db.data?.mercaderes || null;
    }
    /**
     * Método para obtener todos los clientes de la base de datos
     * @returns - Lista de clientes o null si no hay clientes
     */
    getClientes(){
        db.read();
        return db.data?.clientes || null;
    }
    /**
     * Método para agregar un bien a la base de datos
     * @param bien - Bien a agregar
     */
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
    /**
     * Método para agregar un mercader a la base de datos
     * @param mercader - Mercader a agregar
     */
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
    /**
     * Método para agregar un cliente a la base de datos
     * @param cliente - Cliente a agregar
     */
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
    /**
     * Método para obtener un bien por su ID
     * @param id - ID del bien a buscar
     * @returns - El bien encontrado o null si no existe
     */
    getBienPorId(id: number) {
        db.read();
        const bien = db.data?.bienes.find((b: Bien) => b.id === id);
        if (bien) {
            return bien;
        } else {
            console.log("Bien no encontrado.");
            return null;
        }
    }
    /**
     * Método para actualizar un bien en la base de datos
     * @param id - ID del bien a actualizar
     * @param nuevosDatos - Nuevos datos del bien
     */
    updateBien(id: number, nuevosDatos: Partial<Bien>) {
        db.read();
        const index = db.data?.bienes.findIndex((b: Bien) => b.id === id);
    
        if (index === undefined || index === -1) {
            console.log("Bien no encontrado.");
            return;
        }
    
        const bien = db.data?.bienes[index];
    
        if (bien) {
            Object.assign(bien, nuevosDatos);
            db.write();
            console.log("Bien actualizado correctamente.");
        } else {
            console.log("Error al actualizar el bien.");
        }
    }
    /**
     * Método para obtener un mercader por su ID
     * @param id - ID del mercader a buscar
     * @returns - El mercader encontrado o null si no existe
     */
    getMercaderPorId(id: number) {
        db.read();
        const mercader = db.data?.mercaderes.find((m: Mercader) => m.id === id);
        if (mercader) {
            return mercader;
        } else {
            console.log("Mercader no encontrado.");
            return null;
        }
    }
    /**
     * Método para actualizar un mercader en la base de datos
     * @param id - ID del mercader a actualizar
     * @param nuevosDatos - Nuevos datos del mercader
     */
    updateMercader(id: number, nuevosDatos: Partial<Mercader>) {
        db.read();
        const index = db.data?.mercaderes.findIndex((m: Mercader) => m.id === id);
    
        if (index === undefined || index === -1) {
            console.log("Mercader no encontrado.");
            return;
        }
    
        const mercader = db.data?.mercaderes[index];
    
        if (mercader) {
            Object.assign(mercader, nuevosDatos);
            db.write();
            console.log("Mercader actualizado correctamente.");
        } else {
            console.log("Error al actualizar el mercader.");
        }
    }
    /**
     * Método para obtener un cliente por su ID
     * @param id - ID del cliente a buscar
     * @returns - El cliente encontrado o null si no existe
     */
    getClientePorId(id: number) {
        db.read();
        const cliente = db.data?.clientes.find((c: Cliente) => c.id === id);
        if (cliente) {
            return cliente;
        } else {
            console.log("Cliente no encontrado.");
            return null;
        }
    }
    /**
     * Método para actualizar un cliente en la base de datos
     * @param id - ID del cliente a actualizar
     * @param nuevosDatos - Nuevos datos del cliente
     */
    updateCliente(id: number, nuevosDatos: Partial<Cliente>) {
        db.read();
        const index = db.data?.clientes.findIndex((c: Cliente) => c.id === id);
    
        if (index === undefined || index === -1) {
            console.log("Cliente no encontrado.");
            return;
        }
    
        const cliente = db.data?.clientes[index];
    
        if (cliente) {
            Object.assign(cliente, nuevosDatos);
            db.write();
            console.log("Cliente actualizado correctamente.");
        } else {
            console.log("Error al actualizar el cliente.");
        }
    }
    //removeBien(bien: Bien){
    //    db.read();
        //if(db.data?.bienes)

    //}
    /**
     * Método para eliminar un bien de la base de datos
     * @param id - ID del bien a eliminar
     */
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
    /**
     * Método para eliminar un mercader de la base de datos
     * @param id - ID del mercader a eliminar
     * @returns - El mercader eliminado o null si no existe
     */
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
    /**
     * Método para eliminar un cliente de la base de datos
     * @param id - ID del cliente a eliminar
     * @returns - El cliente eliminado o null si no existe
     */
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