import { IBien } from "../interfaces/iBien.js";

export class Bien implements IBien{
    public stock: number;
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public material: string,
        public peso: number,
        public valor: number
    ) {}
}