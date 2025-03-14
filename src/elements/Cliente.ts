import { ICliente } from "../interfaces/iCliente.js";
/**
 * Implementación de la interfaz ICliente
 * @param id - Identificador del cliente
 * @param nombre - Nombre del cliente
 * @param raza - Raza del cliente
 * @param ubicacion - Ubicación del cliente
 * @returns Cliente
 */
export class Cliente implements ICliente {
    constructor(
        public id: number,
        public nombre: string,
        public raza: string,
        public ubicacion: string
    ){}
}