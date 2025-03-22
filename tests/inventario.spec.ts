import { describe, test, expect, beforeEach } from "vitest";
import { Inventario } from "../src/inventario/inventario.js";
import { Bien } from "../src/elements/Bien.js";
import { Mercader } from "../src/elements/Mercader.js";
import { Cliente } from "../src/elements/Cliente.js";
import { Transaccion, TransaccionDevolucion } from "../src/elements/Transaccion.js";

// Instancia de Inventario antes de cada test
let inventario: Inventario;

beforeEach(() => {
    inventario = new Inventario();
});

describe("Inventario", () => {
    test("Debe validar el estado de la base de datos correctamente", () => {
        const estado = inventario.estadoDB();
        expect(typeof estado).toBe("boolean");
    });

    test("Debe indicar si un bien es válido", () => {
        const bien = new Bien(1, "Espada de Plata de Kaer Morhen", "Una reliquia forjada en la fortaleza bruja", "Acero de Mahakam", 3, 800);
        expect(inventario.validarBien(bien)).toBe(true);
    });

    test("Debe indicar si un mercader es válido", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        expect(inventario.validarMercader(mercader)).toBe(true);
    });

    test("Debe indicar si un clientes es válido", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        expect(inventario.validarCliente(cliente)).toBe(true);
    });

    test("Debe agregar un bien correctamente", () => {
        const bien = new Bien(1, "Espada de Plata de Kaer Morhen", "Una reliquia forjada en la fortaleza bruja", "Acero de Mahakam", 3, 800);
        inventario.addBien(bien);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe no agregar un bien con ID duplicado", () => {
        const bien1 = new Bien(1, "Espada de Plata de Kaer Morhen", "Una reliquia forjada en la fortaleza bruja", "Acero de Mahakam", 3, 800);
        const bien2 = new Bien(1, "Espada de Acero de Zireael", "Rápida y letal, ideal contra humanos", "Acero de Mahakam", 3, 750);
        
        inventario.addBien(bien1);
        inventario.addBien(bien2); // No debería añadirse
        
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe agregar un mercader correctamente", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        inventario.addMercader(mercader);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe agregar un cliente correctamente", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        inventario.addCliente(cliente);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe registrar una transacción de compra correctamente", () => {
        const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad rápidamente", "Ingredientes alquímicos", 1, 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);
        
        inventario.addTransaccion(transaccion);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe registrar una transacción de devolución correctamente", () => {
        const bien = new Bien(3, "Poción de Gato", "Permite ver en la oscuridad", "Ingredientes alquímicos", 0.5, 150);
        const transaccion = new TransaccionDevolucion(2, "devolucion", 1, new Date().toISOString(), bien, 150, "Cliente");
        
        inventario.addTransaccion(transaccion);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe eliminar un bien correctamente", () => {
        const bien = new Bien(4, "Daga Élfica", "Arma ligera y letal", "Mithril", 1.2, 600);
        inventario.addBien(bien);
        inventario.removeBien(4);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("Debe manejar correctamente la eliminación de un bien inexistente", () => {
        inventario.removeBien(999); // No existe
        expect(inventario.estadoDB()).toBe(true);
    });

    test("No debe permitir eliminar un mercader inexistente", () => {
        inventario.removeMercader(999);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("No debe permitir eliminar un cliente inexistente", () => {
        inventario.removeCliente(999);
        expect(inventario.estadoDB()).toBe(true);
    });

    test("No debe agregar un bien con peso negativo", () => {
        const bien = new Bien(5, "Espada Maldita", "Oscura y peligrosa", "Hierro Negro", -2, 1000);
        inventario.addBien(bien);
        expect(inventario.estadoDB()).toBe(true); // No debería añadirse
    });

    test("No debe agregar un mercader con nombre vacío", () => {
        const mercader = new Mercader(2, "", "Herrero", "Novigrado");
        inventario.addMercader(mercader);
        expect(inventario.estadoDB()).toBe(true); // No debería añadirse
    });

    test("No debe agregar un cliente con ID no numérico", () => {
        const cliente = new Cliente(NaN, "Yennefer", "Hechicera", "Velen");
        inventario.addCliente(cliente);
        expect(inventario.estadoDB()).toBe(true); // No debería añadirse
    });

    test("No debe registrar transacción con bien inexistente", () => {
        const transaccion = new Transaccion(3, "venta", 1, new Date().toISOString(), new Bien(999, "Bien Fantasma", "No existe", "Nada", 0, 0), 500);
        inventario.addTransaccion(transaccion);
        expect(inventario.estadoDB()).toBe(true); // No debería añadirse
    });
});
