//import { db, initDB } from "../db/lowdb.js";
import { db } from "../db/lowdb.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";
import { Transaccion, TransaccionDevolucion } from "../elements/Transaccion.js";
import { Console } from "console";
import { transaccionDevolucion } from "../inquirer/inquirer.js";

/**
 * Clase Inventario que contiene los métodos para interactuar con la base de datos
 */
export class Inventario {
    //constructor(){initDB();}
    constructor(){}

    /**
     * Método para validar la estructura de la base de datos
     * @returns - Valor tue o false, que indica si está o no bien estructurada la base de datos
     */
    estadoDB(): boolean{
        
        let valido: boolean = true;

        if(db.data?.bienes) {
            db.data.bienes.forEach((bien: Bien, index: number) => {
                if(!this.validarBien(bien)) {
                    console.log(bien);
                    console.log("Error formato en bienes.");
                    valido = false;
                }
            });
        }

        if(db.data?.clientes) {
            db.data.clientes.forEach((cliente: Cliente, index: number) => {
                if(!this.validarCliente(cliente)) {
                    console.log(cliente);
                    console.log("Error formato en clientes.");
                    valido = false;
                }
            });
        }

        if(db.data?.mercaderes) {
            db.data.mercaderes.forEach((mercader: Mercader, index: number) => {
                if(!this.validarMercader(mercader)) {
                    console.log(mercader);
                    console.log("Error formato en mercaderes.");
                    valido = false;
                }
            });
        }

        if(db.data?.transacciones) {
            db.data.transacciones.forEach((transaccion: Transaccion, index: number) => {
                if(!this.validarTransaccion(transaccion)) {
                    console.log(transaccion);
                    console.log("Error formato en transacciones.");
                    valido = false;
                }
            });
        }


        return valido;
    }

    /**
     * Valida si un bien es válido o no según su tipo de datos
     * @param bien - El bien a validar
     * @returns True si es válido o false si no lo es
     */
    validarBien(bien: Bien): boolean {

        return bien &&
            typeof bien.id === "number" &&
            typeof bien.nombre === "string" &&
            typeof bien.descripcion === "string" &&
            typeof bien.material === "string" &&
            typeof bien.peso === "number" &&
            typeof bien.valor === "number";
    }

    /**
     * Valida si un cliente es válido o no según su tipo de datos
     * @param cliente - Cliente a validar
     * @returns True si es válido o false si no lo es
     */
    validarCliente(cliente: Cliente): boolean {

        return cliente &&
            typeof cliente.id === "number" &&
            typeof cliente.nombre === "string" &&
            typeof cliente.raza === "string" &&
            typeof cliente.ubicacion === "string";
    }

    /**
     * Valida si un mercader es válido o no según su tipo de datos
     * @param mercader - Mercader a validar
     * @returns True si es válido o false si no lo es
     */
    validarMercader(mercader: Mercader): boolean {

        return mercader &&
            typeof mercader.id === "number" &&
            typeof mercader.nombre === "string" &&
            typeof mercader.tipo === "string" &&
            typeof mercader.ubicacion === "string";
    }

    /**
     * Valida si una transacción es válida o no según sus atributos
     * @param transaccion - Transacción que se quiere validar
     * @returns True si es válido o false si no lo es
     */
    validarTransaccion(transaccion: Transaccion | TransaccionDevolucion): boolean {

        let result: boolean = transaccion &&
            typeof transaccion.id === "number" &&
            (transaccion.tipo === "venta" || transaccion.tipo === "compra" || transaccion.tipo === "devolucion") &&
            typeof transaccion.idInvolucrado === "number" &&
            typeof transaccion.fecha === "string" &&
            this.validarBien(transaccion.bien) &&
            typeof transaccion.valor === "number";

            if (transaccion.tipo === "devolucion") {
                if("devolucion" in transaccion){
                    result = result && (transaccion.devolucion === "Cliente" || transaccion.devolucion === "Mercader");
                }
            }

            return result;
    }

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

        if( isNaN(bien.peso) || isNaN(bien.valor)){
            console.log("Error. peso y valor deben ser tipo number.");
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
     * Método para obtener los mercaderes que se llamen de una forma específica
     * @param nombre - Nombre de los mercaderes a buscar
     * @returns - Los mercaderes con dicho nombre o null si no hay ninguno que se llame así
     */
    getMercaderesPorNombre(nombre: string) {
        db.read();
        const mercaderes = db.data?.mercaderes.find((b: Mercader) => b.nombre === nombre);
        if (mercaderes) {
            return mercaderes;
        } else {
            console.log("No existe ningún mercader con ese nombre.");
            return null;
        }
    }

    /**
     * Método para obtener los mercaderes que se sean de un tipo específico
     * @param tipo - Tipo de los mercaderes a buscar
     * @returns - Los mercaderes con dicho tipo o null si no hay ninguno que tenga el tipo indicado
     */
    getMercaderesPorTipo(tipo: string) {
        db.read();
        const mercaderes = db.data?.mercaderes.find((b: Mercader) => b.tipo === tipo);
        if (mercaderes) {
            return mercaderes;
        } else {
            console.log("No existe ningún mercader con ese tipo.");
            return null;
        }
    }

    /**
     * Método para obtener los mercaderes que se encuentren en una ubicación específica
     * @param ubicacion - Ubicación de los mercaderes a buscar
     * @returns - Los mercaderes que se encuentren en dicha ubicación o null si no hay ninguno en la ubicación indicada
     */
    getMercaderesPorUbicacion(ubicacion: string) {
        db.read();
        const mercaderes = db.data?.mercaderes.find((b: Mercader) => b.ubicacion === ubicacion);
        if (mercaderes) {
            return mercaderes;
        } else {
            console.log("No existe ningún mercader en esa ubicación.");
            return null;
        }
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
     * Método para obtener los clientes que se llamen de una forma específica
     * @param nombre - Nombre de los clientes a buscar
     * @returns - Los clientes con dicho nombre o null si no hay ninguno que se llame así
     */
    getClientesPorNombre(nombre: string) {
        db.read();
        const clientes = db.data?.clientes.find((b: Cliente) => b.nombre === nombre);
        if (clientes) {
            return clientes;
        } else {
            console.log("No existe ningún cliente con ese nombre.");
            return null;
        }
    }

    /**
     * Método para obtener los clientes que sean de una raza especifica
     * @param raza - Raza de los clientes a buscar
     * @returns - Los clientes que sean de dicha raza o null si no hay ninguno que sea de la raza indicada
     */
    getClientesPorRaza(raza: string) {
        db.read();
        const clientes = db.data?.clientes.find((b: Cliente) => b.raza === raza);
        if (clientes) {
            return clientes;
        } else {
            console.log("No existe ningún cliente de esa raza.");
            return null;
        }
    }

    /**
     * Método para obtener los clientes que estén en una ubicación especifica
     * @param ubicacion - Ubicación de los clientes a buscar
     * @returns - Los clientes que estén en dicha ubicación o null si no hay ninguno que esté en la ubicación indicada
     */
    getClientesPorUbicacion(ubicacion: string) {
        db.read();
        const clientes = db.data?.clientes.find((b: Cliente) => b.ubicacion === ubicacion);
        if (clientes) {
            return clientes;
        } else {
            console.log("No existe ningún cliente en dicha ubicación.");
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

    /**
     * Método para obtener todas las transacciones de la base de datos
     * @param transaccion - Transacción a agregar
     * @returns - Lista de transacciones o null si no hay transacciones
     */
    addTransaccion(transaccion: Transaccion | TransaccionDevolucion): boolean{
        /* añadir a la base de datos según el tipo de transaccion
            COMPROBAR QUE EL IDINVOLUCRADO EXISTA
            idInvolucrado: venta -> cliente.   compra -> mercader.    devolucion->cliente | mercader.
        */

        //let result: boolean = false;

        if(transaccion.tipo === "venta") {
            //transaccion.idInvolucrado exista en cliente
            //const existe = db.data?.clientes.findIndex((c: Cliente) => c.id === transaccion.idInvolucrado);
            //console.log(existe);
            const existe = this.getClientePorId(transaccion.idInvolucrado);

            if (existe) {
                db.data?.transacciones.push(transaccion);
                db.write();
                return true;
            } else {
                console.log("Error. idInvolucrado no existe en Clientes.");
            }
        } else if(transaccion.tipo === "compra") {
            const existe = this.getMercaderPorId(transaccion.idInvolucrado);
            if (existe) {
                db.data?.transacciones.push(transaccion);
                db.write();
                return true;
            } else {
                console.log("Error. idInvolucrado no existe en Mercaderes.");
            }
        } else if(transaccion.tipo === "devolucion") {
            

            if ("devolucion" in transaccion){
                let existe: Cliente | Mercader | null = null;

                if (transaccion.devolucion === "Cliente") {
                    existe = this.getClientePorId(transaccion.idInvolucrado);
                    
                } else if (transaccion.devolucion === "Mercader") {
                    existe = this.getMercaderPorId(transaccion.idInvolucrado);
                }
                
                if (existe) {
                    db.data?.transacciones.push(transaccion);
                    db.write();
                    return true;
                } else {
                    console.log("Error. idInvolucrado no existe en Clientes o Mercaderes.");
                }
            }

            //const existeCliente = this.getClientePorId(transaccion.idInvolucrado);
            //const existeMercader = this.getMercaderPorId(transaccion.idInvolucrado);
            
            //return false;
            
            
        }

        return false;
    }

    /**
     * @returns - Lista de transacciones o null si no hay transacciones
     */
    ultimoIdBien(): number {
        db.read();

        // let ultimoId = db.data?.bienes.length;
        let ultimoId = 0;
        if (db.data?.bienes.length === 0) {
            return 1;
        }
        db.data?.bienes.forEach((bien) => {
            if (bien.id > ultimoId) {
                ultimoId = bien.id;
            }
        });
        if (ultimoId === undefined) {
            const nextId = 1;
            return nextId;
        }  else {
            const nextId = ultimoId + 1;
            return nextId;
        }

    }

    /**
     * Método para obtener el ID de la transacción que se realiza
     * @returns ID de la transacción
     */
    idTransaccion(): number{
        db.read();

        //let nextId: number = 0;

        const ultimoId = db.data?.transacciones.length;

        if (ultimoId === 0 || ultimoId === undefined) {
            const nextId = 1;
            return nextId;
        }  else {
            const nextId = ultimoId + 1;
            return nextId;
        }

        //return nextId;
    }

    /**
     * Método para obtener un informe de ingresos y gastos totales
     * @returns Informe de ingresos y gastos totales
     */
    informeIngresosGastos(): {ingresos:number, gastos: number} {

        let ingresos: number = 0;
        let gastos: number = 0;

        db.data?.transacciones.forEach(transaccion => {
            if (transaccion.tipo === "venta") {
                ingresos += transaccion.valor;
            } else if (transaccion.tipo === "compra") {
                gastos += transaccion.valor;
            }
        });

        return { ingresos, gastos };
    }

    /**
     * Método para obtener un informe de todas las transacciones que un mercader o cliente han tenido
     * @param id_usuario - ID del cliente o mercader para el cual se quiere el informe
     * @param tipo - Valor que puede tomar o 'mercader' o 'cliente' dependiendo del informe deseado
     * @returns Informe histórico de transacciones
     */
    informeHistorico(id_usuario: number, tipo: string): (Transaccion | TransaccionDevolucion)[] {

        const result: (Transaccion | TransaccionDevolucion)[] = [];

        if (tipo === "Cliente"){

            db.data?.transacciones.forEach(transaccion => {
                if (transaccion.tipo === "venta" && transaccion.idInvolucrado === id_usuario) {
                    result.push(transaccion);
                } else if(transaccion.tipo === "devolucion" && transaccion.idInvolucrado === id_usuario) {
                    if("devolucion" in transaccion) {
                        if(transaccion.devolucion === "Cliente") {
                            result.push(transaccion);
                        }
                    }
                }
            });

        } else if (tipo === "Mercader"){

            db.data?.transacciones.forEach(transaccion => {
                if (transaccion.tipo === "compra" && transaccion.idInvolucrado === id_usuario) {
                    result.push(transaccion);
                } else if(transaccion.tipo === "devolucion" && transaccion.idInvolucrado === id_usuario) {
                    if("devolucion" in transaccion) {
                        if(transaccion.devolucion === "Mercader") {
                            result.push(transaccion);
                        }
                    }
                }
            });

        }

        return result;
    }

    /**
     * Método para obtener un informe para saber el stock de un bien
     * @param idBien - ID del bien para el cual se quiere comprobar el stock
     * @returns Informe del stock del bien que se quiere comprobar
     */
    informeStock(idBien: number): number{
        let result: number = 0;

        const bien = this.getBienPorId(idBien);

        if (bien) {
            db.data?.bienes.forEach(element => {
                if(element.nombre === bien?.nombre) {
                    result++;
                }
            });
        }         

        return result;
    }

    /**
     * Método que genera un informe con los bienes más vendidos
     * @returns Informe de bienes
     */
    informeMasVendidos(): {nombre: string, cantidad: number}[]{
        const conteo: Record<string, number> = {};

        db.data?.transacciones.forEach(transaccion => {
            if (transaccion.tipo === "venta") {
                const bienNombre = transaccion.bien.nombre;

                if(!conteo[bienNombre]) {
                    conteo[bienNombre] = 0;
                }
                conteo[bienNombre]++;
            }
        });
        
        return Object.entries(conteo)
            .map(([nombre, cantidad]) => ({nombre, cantidad}))
            .sort((a, b) => b.cantidad - a.cantidad);
    }

    /**
     * Método que genera un informe con los bienes más comprados
     * @returns Informe de bienes más comprados
     */
    informeMasComprados(): {nombre: string, cantidad: number}[]{
        const conteo: Record<string, number> = {};

        db.data?.transacciones.forEach(transaccion => {
            if (transaccion.tipo === "compra") {
                const bienNombre = transaccion.bien.nombre;

                if(!conteo[bienNombre]) {
                    conteo[bienNombre] = 0;
                }
                conteo[bienNombre]++;
            }
        });
        
        return Object.entries(conteo)
            .map(([nombre, cantidad]) => ({nombre, cantidad}))
            .sort((a, b) => b.cantidad - a.cantidad);
    }
    
}