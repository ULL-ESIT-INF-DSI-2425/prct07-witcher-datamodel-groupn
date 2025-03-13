import { ICliente } from "../interfaces/iCliente.js";

export class Cliente implements ICliente {
    constructor(
        public id: number,
        public nombre: string,
        public raza: string,
        public ubicacion: string
    ){}
}