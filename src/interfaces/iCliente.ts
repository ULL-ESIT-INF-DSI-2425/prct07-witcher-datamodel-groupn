/**
 * Interface para definir la estructura de un cliente
 * @param id - Identificador del cliente
 * @param nombre - Nombre del cliente
 * @param raza - Raza del cliente
 * @param ubicacion - Ubicación del cliente
 */
export interface ICliente {
    id: number;
    nombre: string;
    raza: string;
    ubicacion: string;
}