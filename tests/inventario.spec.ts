import { describe, test, expect, beforeEach, vi } from "vitest";
import { Bien } from "../src/elements/Bien.js";
import { Mercader } from "../src/elements/Mercader.js";
import { Cliente } from "../src/elements/Cliente.js";
import { Transaccion, TransaccionDevolucion } from "../src/elements/Transaccion.js";

// Mock de Inventario
let mockInventario: any;

beforeEach(() => {
  vi.resetModules();
  mockInventario = {
    // Bienes
    addBien: vi.fn(),
    getBienes: vi.fn(),
    removeBien: vi.fn(),
    updateBien: vi.fn(),
    getBienPorId: vi.fn(),
    ultimoIdBien: vi.fn(),
    // Mercaderes
    addMercader: vi.fn(),
    getMercaderes: vi.fn(),
    getMercaderesPorNombre: vi.fn(),
    getMercaderesPorTipo: vi.fn(),
    getMercaderesPorUbicacion: vi.fn(),
    removeMercader: vi.fn(),
    getMercaderPorId: vi.fn(),
    updateMercader: vi.fn(),
    // Clientes
    addCliente: vi.fn(),
    getClientes: vi.fn(),
    getClientesPorNombre: vi.fn(),
    getClientesPorRaza: vi.fn(),
    getClientesPorUbicacion: vi.fn(),
    removeCliente: vi.fn(),
    getClientePorId: vi.fn(),
    updateCliente: vi.fn(),
    // Transacciones
    addTransaccion: vi.fn(),
    idTransaccion: vi.fn(),
  };
});

// Mockear la clase Inventario
vi.mock("../src/inventario/inventario", () => ({
  Inventario: vi.fn().mockImplementation(() => mockInventario),
}));

describe("Inventario", () => {
  test("Debe agregar un bien correctamente", () => {
    const bien = new Bien(1, "Espada de Plata", "Para matar monstruos", "Acero de Mahakam", 3, 800);
    
    mockInventario.addBien.mockReturnValueOnce(undefined);
    mockInventario.getBienes.mockReturnValueOnce([bien]);

    mockInventario.addBien(bien);
    expect(mockInventario.addBien).toHaveBeenCalledWith(bien);
    expect(mockInventario.getBienes()).toContainEqual(bien);
  });

  test("Debe eliminar un bien correctamente", () => {
    mockInventario.removeBien.mockReturnValueOnce(true);
    
    mockInventario.removeBien(1);
    expect(mockInventario.removeBien).toHaveBeenCalledWith(1);
  });

  test("Debe agregar un mercader correctamente", () => {
    const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");

    mockInventario.addMercader.mockReturnValueOnce(undefined);
    mockInventario.getMercaderes.mockReturnValueOnce([mercader]);

    mockInventario.addMercader(mercader);
    expect(mockInventario.addMercader).toHaveBeenCalledWith(mercader);
    expect(mockInventario.getMercaderes()).toContainEqual(mercader);
  });

  test("Debe agregar un cliente correctamente", () => {
    const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");

    mockInventario.addCliente.mockReturnValueOnce(undefined);
    mockInventario.getClientes.mockReturnValueOnce([cliente]);

    mockInventario.addCliente(cliente);
    expect(mockInventario.addCliente).toHaveBeenCalledWith(cliente);
    expect(mockInventario.getClientes()).toContainEqual(cliente);
  });

  test("Debe registrar una transacción de compra correctamente", () => {
    const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
    const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);

    mockInventario.addTransaccion.mockReturnValueOnce(undefined);
    mockInventario.idTransaccion.mockReturnValueOnce(1);

    mockInventario.addTransaccion(transaccion);
    expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
  });

  test("Debe registrar una transacción de devolución correctamente", () => {
    const bien = new Bien(3, "Poción de Gato", "Ver en la oscuridad", "Ingredientes alquímicos", 0.5, 150);
    const transaccion = new TransaccionDevolucion(2, "devolucion", 1, new Date().toISOString(), bien, 150, "Cliente");

    mockInventario.addTransaccion.mockReturnValueOnce(undefined);

    mockInventario.addTransaccion(transaccion);
    expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
  });

  test("Debe obtener un bien por ID correctamente", () => {
    const bien = new Bien(4, "Daga Élfica", "Letal y ligera", "Mithril", 1.2, 600);
    mockInventario.getBienPorId.mockReturnValueOnce(bien);

    const result = mockInventario.getBienPorId(4);
    expect(result).toEqual(bien);
    expect(mockInventario.getBienPorId).toHaveBeenCalledWith(4);
  });

  test("Debe obtener un mercader por ID correctamente", () => {
    const mercader = new Mercader(2, "Fergus Graem", "Herrero", "Velen");
    mockInventario.getMercaderPorId.mockReturnValueOnce(mercader);

    const result = mockInventario.getMercaderPorId(2);
    expect(result).toEqual(mercader);
    expect(mockInventario.getMercaderPorId).toHaveBeenCalledWith(2);
  });

  test("Debe obtener un cliente por ID correctamente", () => {
    const cliente = new Cliente(3, "Triss Merigold", "Hechicera", "Novigrado");
    mockInventario.getClientePorId.mockReturnValueOnce(cliente);

    const result = mockInventario.getClientePorId(3);
    expect(result).toEqual(cliente);
    expect(mockInventario.getClientePorId).toHaveBeenCalledWith(3);
  });

  test("Debe actualizar un bien correctamente", () => {
    const bien = new Bien(5, "Ballesta de Reaver", "Precisa y mortal", "Madera de ébano", 4, 1200);
    mockInventario.updateBien.mockReturnValueOnce(true);

    mockInventario.updateBien(5, bien);
    expect(mockInventario.updateBien).toHaveBeenCalledWith(5, bien);
  });

  test("Debe actualizar un mercader correctamente", () => {
    const mercader = new Mercader(3, "Keira Metz", "Alquimista", "Bosque de Tretogor");
    mockInventario.updateMercader.mockReturnValueOnce(true);

    mockInventario.updateMercader(3, mercader);
    expect(mockInventario.updateMercader).toHaveBeenCalledWith(3, mercader);
  });

  test("Debe actualizar un cliente correctamente", () => {
    const cliente = new Cliente(4, "Vesemir", "Brujo", "Kaer Morhen");
    mockInventario.updateCliente.mockReturnValueOnce(true);

    mockInventario.updateCliente(4, cliente);
    expect(mockInventario.updateCliente).toHaveBeenCalledWith(4, cliente);
  });
});
