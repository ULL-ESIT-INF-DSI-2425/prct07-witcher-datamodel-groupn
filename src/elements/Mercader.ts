import { IMercader } from "../interfaces/iMercader.js";
/**
 * Implementación de la interfaz IMercader
 * @param id - Identificador del mercader
 * @param nombre - Nombre del mercader
 * @param tipo - Tipo del mercader
 * @param ubicacion - Ubicación del mercader
 * @returns Mercader
 */
export class Mercader implements IMercader {
    constructor(
        public id: number,
        public nombre: string,
        public tipo: string,
        public ubicacion: string
    ){}
}