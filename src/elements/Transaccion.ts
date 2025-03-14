import {iTransaccion} from "../interfaces/iTransaccion.js"
import { Bien } from "./Bien.js"
/**
 * Implementación de la interfaz iTransaccion
 * @param id - Identificador de la transacción
 * @param tipo - Tipo de la transacción
 * @param idInvolucrado - Identificador del involucrado en la transacción
 * @param fecha - Fecha de la transacción
 * @param bien - Bien involucrado en la transacción
 * @param valor - Valor de la transacción   
 */
export class Transaccion implements iTransaccion{
    constructor(
        public id: number,
        public tipo: "venta" | "compra" | "devolucion",
        public idInvolucrado: number,
        public fecha: string,
        public bien: Bien,
        public valor: number
    ) {}
}
