import { basicStreamableCollection } from "./basicStreamableCollection.js";
import { info } from "./streamable.js";

export class peliculas extends basicStreamableCollection<info> {
    /**
     * Filtra las peliculas por el nombre
     * @param nombre - nombre a buscar
     * @returns - lista de peliculas
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
     * Filtra las peliculas por año
     * @param numero - año a buscar
     * @returns - lista de peliculas
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