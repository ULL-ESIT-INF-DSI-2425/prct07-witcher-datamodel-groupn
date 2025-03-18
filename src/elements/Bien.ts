import { IBien } from "../interfaces/iBien.js";
/**
 * Implementación de la interfaz IBien
 * @param id - Identificador del bien
 * @param nombre - Nombre del bien
 * @param descripcion - Descripción del bien
 * @param material - Material del bien
 * @param peso - Peso del bien
 * @param valor - Valor del bien
 * @returns Bien
 */
export class Bien implements IBien{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public material: string,
        public peso: number,
        public valor: number
    ) {}
}