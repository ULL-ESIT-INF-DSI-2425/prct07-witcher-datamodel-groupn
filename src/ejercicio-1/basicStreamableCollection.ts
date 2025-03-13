import { streamable } from "./streamable.js";
import { searchByName } from "./streamable.js";
import { searchByYear } from "./streamable.js";
//import inquirer from "inquirer"


export abstract class basicStreamableCollection<T> implements streamable<T>, searchByName<T>, searchByYear<T> {
    constructor(public elemento: T[]){}

    /**
     * Añade un elemento a la colección (serie, pelicula o documental)
     * @param newElemento - nuevo elemento
     */
    add(newElemento: T): void {
        this.elemento.push(newElemento);
    }

    /**
     * Devuelve todos los elementos.
     * @returns - Elementos de la coleccion
     */
    allInfo(): T[] {
        return this.elemento;
    }

    /**
     * Metodo abstracto que permite buscar elementos por su año.
     * @param numero - año, numerico
     */
    abstract searchByYear(numero: number): T[];

    /**
     * Metodo abstracto que permite buscar elementos por su nombre.
     * @param nombre - nombre, string
     */
    abstract searchByName(nombre: string): T[];
}