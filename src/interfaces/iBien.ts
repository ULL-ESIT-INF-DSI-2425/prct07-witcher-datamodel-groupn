/**
 * Interface para definir la estructura de un bien
 * @param id - Identificador del bien
 * @param nombre - Nombre del bien
 * @param descripcion - Descripción del bien
 * @param material - Material del bien
 * @param peso - Peso del bien
 * @param valor - Valor del bien
 */
export interface IBien {
    id: number,
    nombre: string,
    descripcion: string,
    material: string,
    peso: number,
    valor: number;
}