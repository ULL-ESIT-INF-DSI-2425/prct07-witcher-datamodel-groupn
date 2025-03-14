import {iTransaccion} from "../interfaces/iTransaccion.js"
import { Bien } from "./Bien.js"

export class Transaccion implements iTransaccion{
    constructor(
        public id: number,
        public tipo: "venta" | "compra" | "devolucion",
        public idInvolucrado: number,
        public fecha: string,
        public bienes: Bien[],
        public valor: number
    ) {}
}
