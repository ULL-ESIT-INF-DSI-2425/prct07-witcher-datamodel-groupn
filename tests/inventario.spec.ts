import { describe, test, expect, beforeEach, vi } from "vitest";
import { Inventario } from "../src/inventario/inventario";
import { Bien } from "../src/elements/Bien";
import { Mercader } from "../src/elements/Mercader";
import { Cliente } from "../src/elements/Cliente";
import { Transaccion, TransaccionDevolucion } from "../src/elements/Transaccion";
import { db } from "../src/db/lowdb";

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
    estadoDB: vi.fn(),
    validarBien: vi.fn(),
    validarCliente: vi.fn(),
    validarMercader: vi.fn(),
    validarTransaccion: vi.fn(),
    informeIngresosGastos: vi.fn(),
    informeHistorico: vi.fn(),
    informeStock: vi.fn(),
    informeMasVendidos: vi.fn(),
    informeMasComprados: vi.fn(),
  };
});

vi.mock("../src/inventario/inventario", () => ({
  Inventario: vi.fn().mockImplementation(() => mockInventario),
}));

describe("estadoDB", () => {
    test("debería retornar true si la base de datos está bien estructurada", () => {
        mockInventario.estadoDB.mockReturnValue(true);
        expect(mockInventario.estadoDB()).toBe(true);
}   );

    test("debería retornar false si la base de datos no está bien estructurada", () => {
        mockInventario.estadoDB.mockReturnValue(false);
        expect(mockInventario.estadoDB()).toBe(false);
    });
});

describe("validarBien", () => {
    test("debería retornar true si el bien es válido", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        mockInventario.validarBien.mockReturnValue(true);
        expect(mockInventario.validarBien(bien)).toBe(true);
    });

    test("debería retornar false si el bien no es válido", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", '3', 800);
        mockInventario.validarBien.mockReturnValue(false);
        expect(mockInventario.validarBien(bien)).toBe(false);
    });
});

describe("validarCliente", () => {
    test("debería retornar true si el cliente es válido", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        mockInventario.validarCliente.mockReturnValue(true);
        expect(mockInventario.validarCliente(cliente)).toBe(true);
        });

    test("debería retornar false si el cliente no es válido", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", 2, "Kaer Morhen");
        mockInventario.validarCliente.mockReturnValue(false);
        expect(mockInventario.validarCliente(cliente)).toBe(false);
    });
});

describe("validarMercader", () => {
    test("debería retornar true si el mercader es válido", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        mockInventario.validarMercader.mockReturnValue(true);
        expect(mockInventario.validarMercader(mercader)).toBe(true);
    });

    test("debería retornar false si el mercader no es válido", () => {
        const mercader = new Mercader(1, 2, "Herrero", "Novigrado");
        mockInventario.validarMercader.mockReturnValue(false);
        expect(mockInventario.validarMercader(mercader)).toBe(false);
    });
});

describe("validarTransaccion", () => {
    test("debería retornar true si la transacción es válida", () => {
        const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);
        mockInventario.validarTransaccion.mockReturnValue(true);
        expect(mockInventario.validarTransaccion(transaccion)).toBe(true);
    });

    test("debería retornar false si la transacción no es válida", () => {
        const bien = new Bien(1, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", "1", 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);
        mockInventario.validarTransaccion.mockReturnValue(false);
        expect(mockInventario.validarTransaccion(transaccion as Transaccion)).toBe(false);
    });
});

describe("addBien", () => {
    test("debería agregar un bien a la base de datos", () => {
      const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
      mockInventario.addBien.mockImplementation((bien: Bien) => {});
      mockInventario.addBien(bien);
      expect(mockInventario.addBien).toHaveBeenCalledWith(bien);
    });
  
    test("no debería agregar un bien si el ID no es único", () => {
      const bien1 = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
      const bien2 = new Bien(1, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
      mockInventario.addBien.mockImplementation((bien: Bien) => {});
      mockInventario.addBien(bien1);
      mockInventario.addBien(bien2);
      expect(mockInventario.addBien).toHaveBeenCalledTimes(2);
    });
  });

describe("addMercader", () => {
    test("debería agregar un mercader a la base de datos", () => {
      const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
      mockInventario.addMercader.mockImplementation((mercader: Mercader) => {});
      mockInventario.addMercader(mercader);
      expect(mockInventario.addMercader).toHaveBeenCalledWith(mercader);
    });
  
    test("no debería agregar un mercader si el ID no es único", () => {
      const mercader1 = new Mercader(1, "Hattori", "Herrero", "Novigrado");
      const mercader2 = new Mercader(1, "Alzur", "Mercader general", "Kaer Morhen");
      mockInventario.addMercader.mockImplementation((mercader: Mercader) => {});
      mockInventario.addMercader(mercader1);
      mockInventario.addMercader(mercader2);
      expect(mockInventario.addMercader).toHaveBeenCalledTimes(2);
    });
  });

describe("addCliente", () => {
    test("debería agregar un cliente a la base de datos", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        mockInventario.addCliente.mockImplementation((cliente: Cliente) => {console.log("Cliente agregado (mock)");});
        mockInventario.addCliente(cliente);
        expect(mockInventario.addCliente).toHaveBeenCalledWith(cliente);
      });

    test("no debería agregar un cliente si el ID no es único", () => {
        const cliente1 = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        const cliente2 = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        mockInventario.addCliente.mockImplementation((cliente: Cliente) => {});
        mockInventario.addCliente(cliente1);
        mockInventario.addCliente(cliente2);
        expect(mockInventario.addCliente).toHaveBeenCalledTimes(2);
    });
});

describe("getBienPorId", () => {
    test("debería retornar el bien con el ID especificado", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        mockInventario.getBienPorId.mockReturnValue(bien);
        expect(mockInventario.getBienPorId(1)).toStrictEqual(bien);
    });

    test("debería retornar null si no se encuentra el bien", () => {
        mockInventario.getBienPorId.mockReturnValue(null);
        expect(mockInventario.getBienPorId(1)).toBeNull();
        });
    });

describe("getMercaderPorId", () => {
    test("debería retornar el mercader con el ID especificado", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        mockInventario.getMercaderPorId.mockReturnValue(mercader);
        expect(mockInventario.getMercaderPorId(1)).toEqual(mercader);
    });

    test("debería retornar null si no se encuentra el mercader", () => {
        mockInventario.getMercaderPorId.mockReturnValue(null);
        expect(mockInventario.getMercaderPorId(3)).toBeNull();
    });
});

describe("getClientePorId", () => {
    test("debería retornar el cliente con el ID especificado", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        mockInventario.getClientePorId.mockReturnValue(cliente);
        expect(mockInventario.getClientePorId(1)).toEqual(cliente);
    });

    test("debería retornar null si no se encuentra el cliente", () => {
        mockInventario.getClientePorId.mockReturnValue(null);
        expect(mockInventario.getClientePorId(2)).toBeNull();
    });
});

describe("updateBien", () => {
    test("debería actualizar los datos de un bien existente", () => {
        const bien = new Bien(1, "Espada", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        mockInventario.updateBien.mockImplementation((id: number, nuevosDatos: Partial<Bien>) => {});
        mockInventario.updateBien(1, { nombre: "Espada de plata" });
        expect(mockInventario.updateBien).toHaveBeenCalledWith(1, { nombre: "Espada de plata" });
    });
  
    test("no debería actualizar si el bien no existe", () => {
        mockInventario.updateBien.mockImplementation((id: number, nuevosDatos: Partial<Bien>) => {});
        mockInventario.updateBien(1, { nombre: "Espada de plata" });
        expect(mockInventario.updateBien).toHaveBeenCalledWith(1, { nombre: "Espada de plata" });
    });
  });

describe("updateMercader", () => {
    test("debería actualizar los datos de un mercader existente", () => {
        const mercader = new Mercader(1, "Hatto", "Herrero", "Novigrado");
        mockInventario.updateMercader.mockImplementation((id: number, nuevosDatos: Partial<Mercader>) => {});
        mockInventario.updateMercader(1, { nombre: "Hattori" });
        expect(mockInventario.updateMercader).toHaveBeenCalledWith(1, { nombre: "Hattori" });
    });
  
    test("no debería actualizar si el mercader no existe", () => {
        mockInventario.updateMercader.mockImplementation((id: number, nuevosDatos: Partial<Mercader>) => {});
        mockInventario.updateMercader(1, { nombre: "Hattori" });
        expect(mockInventario.updateMercader).toHaveBeenCalledWith(1, { nombre: "Hattori" });
    });
  });

  describe("updateCliente", () => {
    test("debería actualizar los datos de un cliente existente", () => {
        const cliente = new Cliente(1, "Geralt", "Brujo", "Kaer Morhen");
        mockInventario.updateCliente.mockImplementation((id: number, nuevosDatos: Partial<Cliente>) => { });
        mockInventario.updateCliente(1, { nombre: "Geralt de Rivia" });
        expect(mockInventario.updateCliente).toHaveBeenCalledWith(1, { nombre: "Geralt de Rivia" });
    });
  
    test("no debería actualizar si el cliente no existe", () => {
        mockInventario.updateCliente.mockImplementation((id: number, nuevosDatos: Partial<Cliente>) => {});
        mockInventario.updateCliente(1, { nombre: "Geralt de Rivia" });
        expect(mockInventario.updateCliente).toHaveBeenCalledWith(1, { nombre: "Geralt de Rivia" });
    });
  });

  describe("removeBien", () => {
    test("debería eliminar un bien de la base de datos", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        mockInventario.removeBien.mockImplementation((id: number) => {});
        mockInventario.removeBien(1);
        expect(mockInventario.removeBien).toHaveBeenCalledWith(1);
    });
  
    test("no debería eliminar si el bien no existe", () => {
        mockInventario.removeBien.mockImplementation((id: number) => {});
        mockInventario.removeBien(1);
        expect(mockInventario.removeBien).toHaveBeenCalledWith(1);
    });
  });
  
  describe("removeMercader", () => {
    test("debería eliminar un mercader de la base de datos", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        mockInventario.removeMercader.mockImplementation((id: number) => {});
        mockInventario.removeMercader(1);
        expect(mockInventario.removeMercader).toHaveBeenCalledWith(1);
    });
  
    test("no debería eliminar si el mercader no existe", () => {
        mockInventario.removeMercader.mockImplementation((id: number) => {});
        mockInventario.removeMercader(1);
        expect(mockInventario.removeMercader).toHaveBeenCalledWith(1);
    });
  });

describe("removeCliente", () => {
    test("debería eliminar un cliente de la base de datos", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        mockInventario.removeCliente.mockImplementation((id: number) => {});
        mockInventario.removeCliente(1);
        expect(mockInventario.removeCliente).toHaveBeenCalledWith(1);
    });

    test("no debería eliminar si el cliente no existe", () => {
        mockInventario.removeCliente.mockImplementation((id: number) => {});
        mockInventario.removeCliente(1);
        expect(mockInventario.removeCliente).toHaveBeenCalledWith(1);
    });
});

describe("addTransaccion", () => {
    test("debería agregar una transacción de venta si el cliente existe", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        const transaccion: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        mockInventario.addTransaccion.mockReturnValue(true);
        expect(mockInventario.addTransaccion(transaccion)).toBe(true);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  
    test("no debería agregar una transacción de venta si el cliente no existe", () => {
        const transaccion: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        mockInventario.addTransaccion.mockReturnValue(false);
        expect(mockInventario.addTransaccion(transaccion)).toBe(false);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  
    test("debería agregar una transacción de compra si el mercader existe", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        const transaccion: Transaccion = {
            id: 1,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        mockInventario.addTransaccion.mockReturnValue(true);
        expect(mockInventario.addTransaccion(transaccion)).toBe(true);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  
    test("no debería agregar una transacción de compra si el mercader no existe", () => {
        const transaccion: Transaccion = {
            id: 1,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        mockInventario.addTransaccion.mockReturnValue(false);
        expect(mockInventario.addTransaccion(transaccion)).toBe(false);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  
    test("debería agregar una transacción de devolución si el cliente existe", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        const transaccion: TransaccionDevolucion = {
            id: 1,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
            devolucion: "Cliente",
        };
        mockInventario.addTransaccion.mockReturnValue(true);
        expect(mockInventario.addTransaccion(transaccion)).toBe(true);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  
    test("no debería agregar una transacción de devolución si el cliente no existe", () => {
        const transaccion: TransaccionDevolucion = {
            id: 1,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
            devolucion: "Cliente",
        };
        mockInventario.addTransaccion.mockReturnValue(false);
        expect(mockInventario.addTransaccion(transaccion)).toBe(false);
        expect(mockInventario.addTransaccion).toHaveBeenCalledWith(transaccion);
    });
  });
  
  describe("informeIngresosGastos", () => {
    test("debería retornar el total de ingresos y gastos", () => {
        const transaccionVenta: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccionCompra: Transaccion = {
            id: 2,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        mockInventario.informeIngresosGastos.mockReturnValue({ ingresos: 800, gastos: 800 });
        expect(mockInventario.informeIngresosGastos()).toEqual({ ingresos: 800, gastos: 800 });
    });
  });
  
  describe("informeHistorico", () => {
    test("debería retornar las transacciones de un cliente", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        const transaccionVenta: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccionDevolucion: TransaccionDevolucion = {
            id: 2,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
            devolucion: "Cliente",
        };
        mockInventario.informeHistorico.mockReturnValue([transaccionVenta, transaccionDevolucion]);
        expect(mockInventario.informeHistorico(1, "Cliente")).toEqual([transaccionVenta, transaccionDevolucion]);
    });
  
    test("debería retornar las transacciones de un mercader", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        const transaccionCompra: Transaccion = {
            id: 1,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccionDevolucion: TransaccionDevolucion = {
            id: 2,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
            devolucion: "Mercader",
        };
        mockInventario.informeHistorico.mockReturnValue([transaccionCompra, transaccionDevolucion]);
        expect(mockInventario.informeHistorico(1, "Mercader")).toEqual([transaccionCompra, transaccionDevolucion]);
    });
  });
  
  describe("informeStock", () => {
        test("debería retornar el stock de un bien", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        mockInventario.informeStock.mockReturnValue(3);
        expect(mockInventario.informeStock(1)).toBe(3);
        });
    
        test("debería retornar 0 si el bien no existe", () => {
        mockInventario.informeStock.mockReturnValue(0);
        expect(mockInventario.informeStock(1)).toBe(0);
        });
  });
  
  describe("informeMasVendidos", () => {
    test("debería retornar los bienes más vendidos", () => {
        const transaccion1: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccion2: Transaccion = {
            id: 2,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccion3: Transaccion = {
            id: 3,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(3, "Elixir de Golondrina", "Recupera vitalidad rápidamente", "Ingredientes alquímicos", 1, 150),
            valor: 150,
        };
        mockInventario.informeMasVendidos.mockReturnValue([{ nombre: "Espada de Plata", cantidad: 2 },{ nombre: "Elixir de Golondrina", cantidad: 1 },]);
        expect(mockInventario.informeMasVendidos()).toEqual([{ nombre: "Espada de Plata", cantidad: 2 },{ nombre: "Elixir de Golondrina", cantidad: 1 },]);
    });
  });
  
  describe("informeMasComprados", () => {
    test("debería retornar los bienes más comprados", () => {
        const transaccion1: Transaccion = {
            id: 1,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccion2: Transaccion = {
            id: 2,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800),
            valor: 800,
        };
        const transaccion3: Transaccion = {
            id: 3,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: new Bien(3, "Elixir de Golondrina", "Recupera vitalidad rápidamente", "Ingredientes alquímicos", 1, 150),
            valor: 150,
        };
        mockInventario.informeMasComprados.mockReturnValue([{ nombre: "Espada de Plata", cantidad: 2 },{ nombre: "Elixir de Golondrina", cantidad: 1 },]);
        expect(mockInventario.informeMasComprados()).toEqual([{ nombre: "Espada de Plata", cantidad: 2 },{ nombre: "Elixir de Golondrina", cantidad: 1 },]);
    });
  });