/**
 * Interface para definir el tipo de dato de un objeto Mercader
 * @param id - Identificador del mercader
 * @param nombre - Nombre del mercader
 * @param tipo - Tipo del mercader
 * @param ubicacion - Ubicación del mercader
 */
export interface IMercader {
    id: number;
    nombre: string;
    tipo: string;
    ubicacion: string;
}