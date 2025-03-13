export interface streamable<T> {
    allInfo(): T[];
}

export interface searchByYear<T> {
    searchByName(nombre: string): T[];
}

export interface searchByName<T> {
    searchByYear(numero: number): T[];
}

export interface info {
    name: string;
    year: number;
}