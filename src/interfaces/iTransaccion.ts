import { Bien } from "../elements/Bien.js"
/**
 * Interfaz de Transacción
 * @param id - Identificador de la transacción
 * @param tipo - Tipo de la transacción
 * @param idInvolucrado - Identificador del involucrado en la transacción
 * @param fecha - Fecha de la transacción
 * @param bien - Bien involucrado en la transacción
 * @param valor - Valor de la transacción
 */
export interface iTransaccion {
    id: number,
    tipo: "venta" | "compra" | "devolucion",
    idInvolucrado: number, //venta -> cliente.   compra -> mercader.    devolucion->cliente | mercader. 
    fecha: string,
    bien: Bien,
    valor: number
}

export interface iTransaccionDevolucion extends iTransaccion {
    devolucion: "Cliente" | "Mercader"
}

/*
Venta: cliente, fecha, bienes, valor
Compra: mercaderes, fecha, bienes, valor
Devolucion: cliente o mercader, fecha, bien, valor
*/