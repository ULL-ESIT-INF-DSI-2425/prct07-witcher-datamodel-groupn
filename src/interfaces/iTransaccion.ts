import { Bien } from "../elements/Bien.js"

export interface iTransaccion {
    id: number,
    tipo: "venta" | "compra" | "devolucion",
    idInvolucrado: number, //venta -> cliente.   compra -> mercader.    devolucion->cliente | mercader. 
    fecha: string,
    bien: Bien,
    valor: number
}

/*
Venta: cliente, fecha, bienes, valor
Compra: mercaderes, fecha, bienes, valor
Devolucion: cliente o mercader, fecha, bien, valor
*/