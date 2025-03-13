import { basicStreamableCollection } from "./basicStreamableCollection.js";
import { info } from "./streamable.js";

export class documentales extends basicStreamableCollection<info> {
    /**
     * Filtra los documentales por el nombre
     * @param nombre - nombre a buscar
     * @returns - lista de documentales
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
     * Filtra los documentales por año
     * @param numero - año a buscar
     * @returns - lista de documentales
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