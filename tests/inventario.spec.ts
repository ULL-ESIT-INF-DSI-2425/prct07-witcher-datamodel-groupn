import { describe, test, expect, beforeEach } from "vitest";
import { Inventario } from "../src/inventario/inventario";
import { Bien } from "../src/elements/Bien";
import { Mercader } from "../src/elements/Mercader";
import { Cliente } from "../src/elements/Cliente";
import { Transaccion, TransaccionDevolucion } from "../src/elements/Transaccion";
import { db } from "../src/db/lowdb";

describe("Inventario", () => {
let inventario: Inventario;

beforeEach(() => {
    inventario = new Inventario();
    db.data = {
    bienes: [],
    clientes: [],
    mercaderes: [],
    transacciones: [],
    };
});

describe("estadoDB", () => {
    test("debería retornar true si la base de datos está bien estructurada", () => {
        db.data = {
            bienes: [{ id: 21, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 }],
            clientes: [{ id: 1, nombre: "Geralt", raza: "Brujo", ubicacion: "Kaer Morhen" }],
            mercaderes: [{ id: 1, nombre: "Hattori", tipo: "Herrero", ubicacion: "Novigrado" }],
            transacciones: [],
        };
        expect(inventario.estadoDB()).toBe(true);
}   );

    test("debería retornar false si la base de datos no está bien estructurada", () => {
        db.data = {
            bienes: [{ id: 21, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: "3", valor: 800 }],
            clientes: [],
            mercaderes: [],
            transacciones: [],
        };
        expect(inventario.estadoDB()).toBe(false);
    });
});

describe("validarBien", () => {
    test("debería retornar true si el bien es válido", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        expect(inventario.validarBien(bien)).toBe(true);
    });

    test("debería retornar false si el bien no es válido", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", '3', 800);
        expect(inventario.validarBien(bien)).toBe(false);
    });
});

describe("validarCliente", () => {
    test("debería retornar true si el cliente es válido", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        expect(inventario.validarCliente(cliente)).toBe(true);
        });

    test("debería retornar false si el cliente no es válido", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", 2, "Kaer Morhen");
        expect(inventario.validarCliente(cliente)).toBe(false);
    });
});

describe("validarMercader", () => {
    test("debería retornar true si el mercader es válido", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        expect(inventario.validarMercader(mercader)).toBe(true);
    });

    test("debería retornar false si el mercader no es válido", () => {
        const mercader = new Mercader(1, 2, "Herrero", "Novigrado");
        expect(inventario.validarMercader(mercader)).toBe(false);
    });
});

describe("validarTransaccion", () => {
    test("debería retornar true si la transacción es válida", () => {
        const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);
        expect(inventario.validarTransaccion(transaccion)).toBe(true);
    });

    test("debería retornar false si la transacción no es válida", () => {
        const bien = new Bien(1, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", "1", 150);
        const transaccion = new Transaccion(1, "compra", 1, new Date().toISOString(), bien, 150);
        expect(inventario.validarTransaccion(transaccion as Transaccion)).toBe(false);
    });
});

describe("addBien", () => {
    test("debería agregar un bien a la base de datos", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        inventario.addBien(bien);
        expect(db.data?.bienes).toContainEqual(bien);
    });

    test("no debería agregar un bien si el ID no es único", () => {
        const bien1 = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        const bien2 = new Bien(1, "Poción de Golondrina", "Recupera vitalidad", "Ingredientes alquímicos", 1, 150);
        inventario.addBien(bien1);
        inventario.addBien(bien2);
        expect(db.data?.bienes.length).toBe(1);
    });
});

describe("addMercader", () => {
    test("debería agregar un mercader a la base de datos", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        inventario.addMercader(mercader);
        expect(db.data?.mercaderes).toContainEqual(mercader);
    });

    test("no debería agregar un mercader si el ID no es único", () => {
        const mercader1 = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        const mercader2 = new Mercader(1, "Alzur", "Mercarer general", "Kaer Morhen");
        inventario.addMercader(mercader1);
        inventario.addMercader(mercader2);
        expect(db.data?.mercaderes.length).toBe(1);
    });
});

describe("addCliente", () => {
    test("debería agregar un cliente a la base de datos", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        inventario.addCliente(cliente);
        expect(db.data?.clientes).toContainEqual(cliente);
    });

    test("no debería agregar un cliente si el ID no es único", () => {
        const cliente1 = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        const cliente2 = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        inventario.addCliente(cliente1);
        inventario.addCliente(cliente2);
        expect(db.data?.clientes.length).toBe(1);
    });
});

describe("getBienPorId", () => {
    // test("debería retornar el bien con el ID especificado", () => {
    //     const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
    //     db.data?.bienes.push(bien);
    //     expect(inventario.getBienPorId(1)).toStrictEqual(bien);
    // });

    test("debería retornar null si no se encuentra el bien", () => {
        expect(inventario.getBienPorId(1)).toBeNull();
        });
    });

describe("getMercaderPorId", () => {
    test("debería retornar el mercader con el ID especificado", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        db.data?.mercaderes.push(mercader);
        expect(inventario.getMercaderPorId(1)).toEqual(mercader);
    });

    test("debería retornar null si no se encuentra el mercader", () => {
        expect(inventario.getMercaderPorId(3)).toBeNull();
    });
});

describe("getClientePorId", () => {
    test("debería retornar el cliente con el ID especificado", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        db.data?.clientes.push(cliente);
        expect(inventario.getClientePorId(1)).toEqual(cliente);
    });

    test("debería retornar null si no se encuentra el cliente", () => {
        expect(inventario.getClientePorId(2)).toBeNull();
    });
});

describe("updateBien", () => {
    // test("debería actualizar los datos de un bien existente", () => {
    //     const bien = new Bien(1, "Espada", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
    //     db.data?.bienes.push(bien);
    //     inventario.updateBien(1, { nombre: "Espada de plata" });
    //     expect(db.data?.bienes[0].nombre).toBe("Espada de plata");
    // });

    test("no debería actualizar si el bien no existe", () => {
        inventario.updateBien(1, { nombre: "Espada de plata" });
        expect(db.data?.bienes.length).toBe(0);
    });
});

describe("updateMercader", () => {
    test("debería actualizar los datos de un mercader existente", () => {
        const mercader = new Mercader(1, "Hatto", "Herrero", "Novigrado");
        db.data?.mercaderes.push(mercader);
        inventario.updateMercader(1, { nombre: "Hattori" });
        expect(db.data?.mercaderes[0].nombre).toBe("Hattori");
    });

    // test("no debería actualizar si el mercader no existe", () => {
    //     inventario.updateMercader(1, { nombre: "Hattori" });
    //     expect(db.data?.mercaderes.length).toBe(0);
    // });
});

describe("updateCliente", () => {
    test("debería actualizar los datos de un cliente existente", () => {
        const cliente = new Cliente(1, "Geralt", "Brujo", "Kaer Morhen");
        db.data?.clientes.push(cliente);
        inventario.updateCliente(1, { nombre: "Geralt de Rivia" });
        expect(db.data?.clientes[0].nombre).toBe("Geralt de Rivia");
    });

    // test("no debería actualizar si el cliente no existe", () => {
    //     inventario.updateCliente(1, { nombre: "Geralt de Rivia" });
    //     expect(db.data?.clientes.length).toBe(0);
    // });
});

describe("removeBien", () => {
    test("debería eliminar un bien de la base de datos", () => {
        const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
        db.data?.bienes.push(bien);
        inventario.removeBien(1);
        expect(db.data?.bienes.length).toBe(0);
    });

    test("no debería eliminar si el bien no existe", () => {
        inventario.removeBien(1);
        expect(db.data?.bienes.length).toBe(0);
    });
});

describe("removeMercader", () => {
    test("debería eliminar un mercader de la base de datos", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        db.data?.mercaderes.push(mercader);
        inventario.removeMercader(1);
        expect(db.data?.mercaderes.length).toBe(0);
    });

    test("no debería eliminar si el mercader no existe", () => {
        inventario.removeMercader(1);
        expect(db.data?.mercaderes.length).toBe(0);
    });
});

describe("removeCliente", () => {
    test("debería eliminar un cliente de la base de datos", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        db.data?.clientes.push(cliente);
        inventario.removeCliente(1);
        expect(db.data?.clientes.length).toBe(0);
    });

    test("no debería eliminar si el cliente no existe", () => {
        inventario.removeCliente(1);
        expect(db.data?.clientes.length).toBe(0);
        });
});

describe("addTransaccion", () => {
    // test("debería agregar una transacción de venta si el cliente existe", () => {
    //     const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
    //     db.data?.clientes.push(cliente);
    //     const transaccion: Transaccion = {
    //         id: 1,
    //         tipo: "venta",
    //         idInvolucrado: 1,
    //         fecha: "20/03/2025",
    //         bien: { id: 1, nombre: "Espada", descripcion: "Espada de acero", material: "acero", peso: 2.5, valor: 100 },
    //         valor: 100,
    //     };
    //     expect(inventario.addTransaccion(transaccion)).toBe(true);
    //     expect(db.data?.transacciones).toContainEqual(transaccion);
    // });

    test("no debería agregar una transacción de venta si el cliente no existe", () => {
        const transaccion: Transaccion = {
        id: 1,
        tipo: "venta",
        idInvolucrado: 1,
        fecha: "20/03/2025",
        bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
        valor: 800,
        };
        expect(inventario.addTransaccion(transaccion)).toBe(false);
        expect(db.data?.transacciones.length).toBe(0);
    });

    // test("debería agregar una transacción de compra si el mercader existe", () => {
    //     const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
    //     db.data?.mercaderes.push(mercader);
    //     const transaccion: Transaccion = {
    //         id: 1,
    //         tipo: "compra",
    //         idInvolucrado: 1,
    //         fecha: "20/03/2025",
    //         bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
    //         valor: 800,
    //     };
    //     expect(inventario.addTransaccion(transaccion)).toBe(true);
    //     expect(db.data?.transacciones).toContainEqual(transaccion);
    // });

    test("no debería agregar una transacción de compra si el mercader no existe", () => {
        const transaccion: Transaccion = {
        id: 1,
        tipo: "compra",
        idInvolucrado: 1,
        fecha: "20/03/2025",
        bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
        valor: 800,
        };
        expect(inventario.addTransaccion(transaccion)).toBe(false);
        expect(db.data?.transacciones.length).toBe(0);
    });

    // test("debería agregar una transacción de devolución si el cliente existe", () => {
    //     const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
    //     db.data?.clientes.push(cliente);
    //     const transaccion: TransaccionDevolucion = {
    //         id: 1,
    //         tipo: "devolucion",
    //         idInvolucrado: 1,
    //         fecha: "20/03/2025",
    //         bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
    //         valor: 800,
    //         devolucion: "Cliente",
    //     };
    //     expect(inventario.addTransaccion(transaccion)).toBe(true);
    //     expect(db.data?.transacciones).toContainEqual(transaccion);
    // });

    test("no debería agregar una transacción de devolución si el cliente no existe", () => {
        const transaccion: TransaccionDevolucion = {
        id: 1,
        tipo: "devolucion",
        idInvolucrado: 1,
        fecha: "20/03/2025",
        bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
        valor: 800,
        devolucion: "Cliente",
        };
        expect(inventario.addTransaccion(transaccion)).toBe(false);
        expect(db.data?.transacciones.length).toBe(0);
    });
});

describe("informeIngresosGastos", () => {
    test("debería retornar el total de ingresos y gastos", () => {
        const transaccionVenta: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
        };
            const transaccionCompra: Transaccion = {
            id: 2,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
        };
        db.data?.transacciones.push(transaccionVenta, transaccionCompra);
        expect(inventario.informeIngresosGastos()).toEqual({ ingresos: 800, gastos: 800 });
    });
});

describe("informeHistorico", () => {
    test("debería retornar las transacciones de un cliente", () => {
        const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
        db.data?.clientes.push(cliente);
        const transaccionVenta: Transaccion = {
            id: 1,
            tipo: "venta",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
        };
        const transaccionDevolucion: TransaccionDevolucion = {
            id: 2,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
            devolucion: "Cliente",
        };
        db.data?.transacciones.push(transaccionVenta, transaccionDevolucion);
        expect(inventario.informeHistorico(1, "Cliente")).toEqual([transaccionVenta, transaccionDevolucion]);
    });

    test("debería retornar las transacciones de un mercader", () => {
        const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
        db.data?.mercaderes.push(mercader);
        const transaccionCompra: Transaccion = {
            id: 1,
            tipo: "compra",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
        };
        const transaccionDevolucion: TransaccionDevolucion = {
            id: 2,
            tipo: "devolucion",
            idInvolucrado: 1,
            fecha: "20/03/2025",
            bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
            valor: 800,
            devolucion: "Mercader",
        };
        db.data?.transacciones.push(transaccionCompra, transaccionDevolucion);
        expect(inventario.informeHistorico(1, "Mercader")).toEqual([transaccionCompra, transaccionDevolucion]);
    });
});

describe("informeStock", () => {
// test("debería retornar el stock de un bien", () => {
//     const bien = new Bien(1, "Espada de Plata", "Arma de plata para monstruos", "Acero de Mahakam", 3, 800);
//     db.data?.bienes.push(bien);
//   expect(inventario.informeStock(1)).toBe(3);
// });

test("debería retornar 0 si el bien no existe", () => {
expect(inventario.informeStock(1)).toBe(0);
});
});

describe("informeMasVendidos", () => {
test("debería retornar los bienes más vendidos", () => {
const transaccion1: Transaccion = {
id: 1,
tipo: "venta",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
valor: 800,
};
const transaccion2: Transaccion = {
id: 2,
tipo: "venta",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
valor: 800,
};
const transaccion3: Transaccion = {
id: 3,
tipo: "venta",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 3, nombre: "Elixir de Golondrina", descripcion: "Recupera vitalidad rápidamente", material: "Ingredientes alquímicos", peso: 1, valor: 150 },
valor: 150,
};
db.data?.transacciones.push(transaccion1, transaccion2, transaccion3);
expect(inventario.informeMasVendidos()).toEqual([{ nombre: "Espada de Plata de Kaer Morhen", cantidad: 2 }, { nombre: "Elixir de Golondrina", cantidad: 1 }]);
});
});

describe("informeMasComprados", () => {
test("debería retornar los bienes más comprados", () => {
const transaccion1: Transaccion = {
id: 1,
tipo: "compra",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
valor: 800,
};
const transaccion2: Transaccion = {
id: 2,
tipo: "compra",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 1, nombre: "Espada de Plata de Kaer Morhen", descripcion: "Una reliquia forjada en la fortaleza bruja", material: "Acero de Mahakam", peso: 3, valor: 800 },
valor: 800,
};
const transaccion3: Transaccion = {
id: 3,
tipo: "compra",
idInvolucrado: 1,
fecha: "20/03/2025",
bien: { id: 3, nombre: "Elixir de Golondrina", descripcion: "Recupera vitalidad rápidamente", material: "Ingredientes alquímicos", peso: 1, valor: 150 },
valor: 150,
};
db.data?.transacciones.push(transaccion1, transaccion2, transaccion3);
expect(inventario.informeMasComprados()).toEqual([{ nombre: "Espada de Plata de Kaer Morhen", cantidad: 2 }, { nombre: "Elixir de Golondrina", cantidad: 1 }]);
});
});
});