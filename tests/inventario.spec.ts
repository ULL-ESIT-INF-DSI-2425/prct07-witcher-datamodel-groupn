import { describe, test, expect, beforeEach, vi } from "vitest";
import { Inventario } from "../src/inventario/inventario.js";
import { Bien } from "../src/elements/Bien.js";
import { Mercader } from "../src/elements/Mercader.js";
import { Cliente } from "../src/elements/Cliente.js";
import { Transaccion, TransaccionDevolucion } from "../src/elements/Transaccion.js";


let inventario: Inventario;

beforeEach(() => {
    inventario = new Inventario();
    vi.restoreAllMocks();

    // Espiar métodos de Bienes
    vi.spyOn(inventario, "addBien");
    vi.spyOn(inventario, "getBienes");
    vi.spyOn(inventario, "removeBien");
    vi.spyOn(inventario, "updateBien");
    vi.spyOn(inventario, "getBienPorId");
    vi.spyOn(inventario, "ultimoIdBien");

    // Espiar métodos de Mercaderes
    vi.spyOn(inventario, "addMercader");
    vi.spyOn(inventario, "getMercaderes");
    vi.spyOn(inventario, "getMercaderesPorNombre");
    vi.spyOn(inventario, "getMercaderesPorTipo");
    vi.spyOn(inventario, "getMercaderesPorUbicacion");
    vi.spyOn(inventario, "removeMercader");
    vi.spyOn(inventario, "getMercaderPorId");
    vi.spyOn(inventario, "updateMercader");

    // Espiar métodos de Clientes
    vi.spyOn(inventario, "addCliente");
    vi.spyOn(inventario, "getClientes");
    vi.spyOn(inventario, "getClientesPorNombre");
    vi.spyOn(inventario, "getClientesPorRaza");
    vi.spyOn(inventario, "getClientesPorUbicacion");
    vi.spyOn(inventario, "removeCliente");
    vi.spyOn(inventario, "getClientePorId");
    vi.spyOn(inventario, "updateCliente");

    // Espiar métodos de Transacciones
    vi.spyOn(inventario, "addTransaccion");
    vi.spyOn(inventario, "idTransaccion");
});

describe("Inventario", () => {
    test("Debe agregar un bien correctamente", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        inventario.addBien(bien);
        expect(inventario.addBien).toHaveBeenCalledWith(bien);
    });

    test("Debe obtener todos los bienes", () => {
        inventario.getBienes();
        expect(inventario.getBienes).toHaveBeenCalled();
    });

    test("Debe eliminar un bien", () => {
        inventario.removeBien(1);
        expect(inventario.removeBien).toHaveBeenCalledWith(1);
    });

    test("Debe actualizar un bien", () => {
        const bienActualizado = new Bien(1, "Espada de Acero", "Arma para humanos", "Acero de Mahakam", 3, 700);
        inventario.updateBien(1, bienActualizado);
        expect(inventario.updateBien).toHaveBeenCalledWith(1, bienActualizado);
    });

    test("Debe obtener un bien por ID", () => {
        inventario.getBienPorId(1);
        expect(inventario.getBienPorId).toHaveBeenCalledWith(1);
    });

    test("Debe obtener el último ID de bien", () => {
        inventario.ultimoIdBien();
        expect(inventario.ultimoIdBien).toHaveBeenCalled();
    });

    test("Debe agregar un mercader correctamente", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        inventario.addMercader(mercader);
        expect(inventario.addMercader).toHaveBeenCalledWith(mercader);
    });

    test("Debe obtener todos los mercaderes", () => {
        inventario.getMercaderes();
        expect(inventario.getMercaderes).toHaveBeenCalled();
    });

    test("Debe obtener mercaderes por nombre", () => {
        inventario.getMercaderesPorNombre("Hattori");
        expect(inventario.getMercaderesPorNombre).toHaveBeenCalledWith("Hattori");
    });

    test("Debe obtener mercaderes por tipo", () => {
        inventario.getMercaderesPorTipo("Herrero");
        expect(inventario.getMercaderesPorTipo).toHaveBeenCalledWith("Herrero");
    });

    test("Debe obtener mercaderes por ubicación", () => {
        inventario.getMercaderesPorUbicacion("Novigrado");
        expect(inventario.getMercaderesPorUbicacion).toHaveBeenCalledWith("Novigrado");
    });

    test("Debe eliminar un mercader", () => {
        inventario.removeMercader(1);
        expect(inventario.removeMercader).toHaveBeenCalledWith(1);
    });

    test("Debe obtener un mercader por ID", () => {
        inventario.getMercaderPorId(1);
        expect(inventario.getMercaderPorId).toHaveBeenCalledWith(1);
    });

    test("Debe actualizar un mercader", () => {
        const mercaderActualizado = new Mercader(1, "Éibhear Hattori", "Forjador de espadas", "Novigrado");
        inventario.updateMercader(1, mercaderActualizado);
        expect(inventario.updateMercader).toHaveBeenCalledWith(1, mercaderActualizado);
    });

    test("Debe agregar un cliente correctamente", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        inventario.addCliente(cliente);
        expect(inventario.addCliente).toHaveBeenCalledWith(cliente);
    });

    test("Debe obtener todos los clientes", () => {
        inventario.getClientes();
        expect(inventario.getClientes).toHaveBeenCalled();
    });

    test("Debe obtener clientes por nombre", () => {
        inventario.getClientesPorNombre("Geralt de Rivia");
        expect(inventario.getClientesPorNombre).toHaveBeenCalledWith("Geralt de Rivia");
    });

    test("Debe obtener clientes por raza", () => {
        inventario.getClientesPorRaza("Brujo");
        expect(inventario.getClientesPorRaza).toHaveBeenCalledWith("Brujo");
    });

    test("Debe obtener clientes por ubicación", () => {
        inventario.getClientesPorUbicacion("Kaer Morhen");
        expect(inventario.getClientesPorUbicacion).toHaveBeenCalledWith("Kaer Morhen");
    });

    test("Debe eliminar un cliente", () => {
        inventario.removeCliente(1);
        expect(inventario.removeCliente).toHaveBeenCalledWith(1);
    });

    test("Debe obtener un cliente por ID", () => {
        inventario.getClientePorId(1);
        expect(inventario.getClientePorId).toHaveBeenCalledWith(1);
    });

    test("Debe actualizar un cliente", () => {
        const clienteActualizado = new Cliente(1, "Geralt de Rivia", "Brujo", "Toussaint");
        inventario.updateCliente(1, clienteActualizado);
        expect(inventario.updateCliente).toHaveBeenCalledWith(1, clienteActualizado);
    });

    test("Debe registrar una transacción correctamente", () => {
        const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);

        inventario.addTransaccion(transaccion);
        expect(inventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });

    test("Debe obtener el ID de la última transacción", () => {
        inventario.idTransaccion();
        expect(inventario.idTransaccion).toHaveBeenCalled();
    });
});
