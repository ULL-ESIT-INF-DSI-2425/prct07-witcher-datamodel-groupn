import { basicStreamableCollection } from "./basicStreamableCollection.js";
import { info } from "./streamable.js";

export class series extends basicStreamableCollection<info> {
    /**
     * Filtra las series por el nombre
     * @param nombre - nombre a buscar
     * @returns - lista de series
     */
    searchByName(nombre: string): info[] {
        let encontrado: info[] = [];

        this.elemento.forEach(element => {
            if(element.name === nombre) {
                encontrado.push(element);
            }
        });

        return encontrado;
    }

    /**
     * Filtra las series por año
     * @param numero - año a buscar
     * @returns - lista de series
     */
    searchByYear(numero: number): info[] {
        let encontrado: info[] = [];

        this.elemento.forEach(element => {
            if(element.year === numero) {
                encontrado.push(element);
            }
        });

        return encontrado;
    }
}