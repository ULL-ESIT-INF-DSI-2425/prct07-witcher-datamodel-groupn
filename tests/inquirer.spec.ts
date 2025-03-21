import { describe, test, expect, vi, beforeEach } from "vitest";
import inquirer from "inquirer";
import { Bien } from "../src/elements/Bien";
import { Mercader } from "../src/elements/Mercader";

// Se mofa la librería Inquirer, incluyendo la exportación por defecto.
vi.mock("inquirer", () => ({
  default: {
    prompt: vi.fn()
  }
}));

let mockInventario: any;

beforeEach(() => {
  vi.resetModules();
  mockInventario = {
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
    updateMercader: vi.fn()
  };
});

vi.mock("../src/inventario/inventario", () => ({
  Inventario: vi.fn().mockImplementation(() => mockInventario)
}));

// TODOS LOS TESTS CON EL INQUIRER DAN ERROR, LOS COMENTO DE MOMENTO

describe("Gestión de bienes con Inquirer", () => {
  test("Debe agregar un bien al inventario", async () => {
    const { addBien } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      nombre: "Espada de Plata",
      descripcion: "Espada para monstruos",
      material: "Plata",
      peso: 2,
      valor: 300
    });

    mockInventario.ultimoIdBien.mockReturnValue(1);

    await addBien();

    // Comprobamos que se haya llamado al método y luego verificamos el objeto
    expect(mockInventario.addBien).toHaveBeenCalled();
    const addedBien = mockInventario.addBien.mock.calls[0][0];
    expect(addedBien).toMatchObject({
      id: 1,
      nombre: "Espada de Plata",
      descripcion: "Espada para monstruos",
      material: "Plata",
      peso: 2,
      valor: 300,
    });
  });

  test("Debe consultar bienes en el inventario", async () => {
    const { consultarBienes } = await import("../src/inquirer/inquirer");

    const bienesMock = [
      new Bien(1, "Espada de Acero", "Espada para humanos", "Acero", 3, 150),
      new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Vidrio", 1, 50)
    ];

    mockInventario.getBienes.mockReturnValue(bienesMock);

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ criterio: "Nombre" });

    await consultarBienes();

    expect(mockInventario.getBienes).toHaveBeenCalledTimes(1);
  });

  test("Debe eliminar un bien del inventario", async () => {
    const { removeBien } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ id: "1" });

    await removeBien();
    expect(mockInventario.removeBien).toHaveBeenCalledWith(1);
  });

  test("Debe modificar un bien en el inventario", async () => {
    const { modificarBien } = await import("../src/inquirer/inquirer");

    const bienMock = new Bien(
      1,
      "Espada de Plata",
      "Espada para monstruos",
      "Plata",
      2,
      300
    );

    mockInventario.getBienPorId.mockReturnValue(bienMock);

    // Simula la respuesta para el ID y luego para los nuevos datos.
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ id: "1" });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      nombre: "Espada de Acero",
      descripcion: "Espada reforzada",
      material: "Acero",
      peso: 3,
      valor: 400
    });

    await modificarBien();

    expect(mockInventario.updateBien).toHaveBeenCalled();
    const updatedBien = mockInventario.updateBien.mock.calls[0][1];
    expect(updatedBien).toMatchObject({
      id: 1,
      nombre: "Espada de Acero",
      descripcion: "Espada reforzada",
      material: "Acero",
      peso: 3,
      valor: 400,
    });
  });

  test("Debe solicitar los datos al usuario y usar un ID generado si no se proporciona", async () => {
    // Simular datos del prompt
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      nombre: "Espada de Acero",
      descripcion: "Espada reforzada",
      material: "Acero",
      peso: 3,
      valor: 200
    });

    // Simular último ID generado
    mockInventario.ultimoIdBien.mockReturnValue(99);

    // Importar función después de mocks
    const { obtenerDatosBien } = await import("../src/inquirer/inquirer");

    const bien = await obtenerDatosBien();

    expect(mockInventario.ultimoIdBien).toHaveBeenCalled();
    expect(bien).toMatchObject({
      id: 99,
      nombre: "Espada de Acero",
      descripcion: "Espada reforzada",
      material: "Acero",
      peso: 3,
      valor: 200
    });
  });

  test("Debe aceptar un ID proporcionado y no llamar a ultimoIdBien", async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      nombre: "Espada de Plata",
      descripcion: "Espada para monstruos",
      material: "Plata",
      peso: 2,
      valor: 300
    });

    const { obtenerDatosBien } = await import("../src/inquirer/inquirer");

    const bien = await obtenerDatosBien(42);

    expect(mockInventario.ultimoIdBien).not.toHaveBeenCalled();
    expect(bien).toMatchObject({
      id: 42,
      nombre: "Espada de Plata",
      descripcion: "Espada para monstruos",
      material: "Plata",
      peso: 2,
      valor: 300
    });
  });
});

// Ahora pasamos a realizar las pruebas de los mercaderes

describe("Gestión de mercaderes con Inquirer", () => {
  test("Debe añadir un mercader al inventario", async () => {
    const { addMercader } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      id: 1,
      nombre: "Hattori",
      tipo: "Herrero",
      ubicacion: "Novigrado"
    });

    await addMercader();

    expect(mockInventario.addMercader).toHaveBeenCalledWith({
      id: 1,
      nombre: "Hattori",
      tipo: "Herrero",
      ubicacion: "Novigrado"
    });
  });

  test("Debe consultar la lista de mercaderes", async () => {
    const { consultarMercaderes } = await import("../src/inquirer/inquirer");

    const mercaderesMock = [
      new Mercader(1, "Hattori", "Herrero", "Novigrado")
    ];
    mockInventario.getMercaderes.mockReturnValue(mercaderesMock);

    await consultarMercaderes();
    expect(mockInventario.getMercaderes).toHaveBeenCalled();
  });

  test("Debe localizar mercaderes por nombre", async () => {
    const { localizarMercaderPorNombre } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ nombre: "Hattori" });
    const resultadoMock = [new Mercader(1, "Hattori", "Herrero", "Novigrado")];
    mockInventario.getMercaderesPorNombre.mockReturnValue(resultadoMock);

    await localizarMercaderPorNombre();
    expect(mockInventario.getMercaderesPorNombre).toHaveBeenCalledWith("Hattori");
  });

  test("Debe localizar mercaderes por tipo", async () => {
    const { localizarMercaderPorTipo } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ tipo: "Herrero" });
    const resultadoMock = [new Mercader(2, "Yoana", "Herrero", "Kaer Trolde")];
    mockInventario.getMercaderesPorTipo.mockReturnValue(resultadoMock);

    await localizarMercaderPorTipo();
    expect(mockInventario.getMercaderesPorTipo).toHaveBeenCalledWith("Herrero");
  });

  test("Debe localizar mercaderes por ubicación", async () => {
    const { localizarMercaderPorUbicacion } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ ubicacion: "Oxenfurt" });
    const resultadoMock = [new Mercader(3, "Bram", "Tabernero", "Oxenfurt")];
    mockInventario.getMercaderesPorUbicacion.mockReturnValue(resultadoMock);

    await localizarMercaderPorUbicacion();
    expect(mockInventario.getMercaderesPorUbicacion).toHaveBeenCalledWith("Oxenfurt");
  });

  test("Debe eliminar un mercader por ID", async () => {
    const { removeMercader } = await import("../src/inquirer/inquirer");

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ id: "10" });

    await removeMercader();

    expect(mockInventario.removeMercader).toHaveBeenCalledWith(10);
  });

  test("Debe modificar un mercader existente", async () => {
    const { modificarMercader } = await import("../src/inquirer/inquirer");

    const mercaderExistente = new Mercader(5, "Hattori", "Herrero", "Novigrado");
    mockInventario.getMercaderPorId.mockReturnValue(mercaderExistente);

    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ id: "5" });
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      id: 5,
      nombre: "Hattori",
      tipo: "Maestro Herrero",
      ubicacion: "Novigrado"
    });

    await modificarMercader();

    expect(mockInventario.updateMercader).toHaveBeenCalledWith(
      5,
      expect.objectContaining({
        nombre: "Hattori",
        tipo: "Maestro Herrero",
        ubicacion: "Novigrado"
      })
    );
  });

  test("Debe mostrar mensaje si no se encuentra el mercader", async () => {
    const { modificarMercader } = await import("../src/inquirer/inquirer");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    mockInventario.getMercaderPorId.mockReturnValue(undefined);
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ id: "999" });

    await modificarMercader();

    expect(logSpy).toHaveBeenCalledWith("Mercader no encontrado.");
  });
});
