import { IMercader } from "../interfaces/iMercader.js";

export class Mercader implements IMercader {
    constructor(
        public id: number,
        public nombre: string,
        public tipo: string,
        public ubicacion: string
    ){}
}