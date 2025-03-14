import { describe, expect, test } from "vitest";
import { Bien } from "../src/elements/Bien"
import { Mercader } from "../src/elements/Mercader"
import { Cliente } from "../src/elements/Cliente"
import { Transaccion } from "../src/elements/Transaccion";
//import inquirer from "inquirer";
//import { lowdb } from "../src/db/lowdb";
//import { inquirer } from "../src/inquirer/inquirer";
import { Inventario } from "../src/inventario/inventario";

/**
 * Pruebas unitarias para la clase Bien.
 */
describe("Bien", () => {
    
  test("Debe crear un objeto Bien con las propiedades correctas", () => {
      const bien = new Bien(1, "Espada de Acero", "Una espada para humanos", "Acero", 3, 150);
      
      expect(bien.id).toBe(1);
      expect(bien.nombre).toBe("Espada de Acero");
      expect(bien.descripcion).toBe("Una espada para humanos");
      expect(bien.material).toBe("Acero");
      expect(bien.peso).toBe(3);
      expect(bien.valor).toBe(150);
  });
  
  test("Debe inicializar el stock correctamente", () => {
      const bien = new Bien(2, "Poción de Golondrina", "Recupera vitalidad", "Vidrio", 1, 50);
      
      expect(bien.stock).toBeUndefined(); // Ya que no se inicializa en el constructor
  });
});

/**
 * Pruebas unitarias para la clase Cliente.
 */
describe("Cliente", () => {
    
  test("Debe crear un objeto Cliente con las propiedades correctas", () => {
      const cliente = new Cliente(1, "Geralt de Rivia", "Brujo", "Kaer Morhen");
      
      expect(cliente.id).toBe(1);
      expect(cliente.nombre).toBe("Geralt de Rivia");
      expect(cliente.raza).toBe("Brujo");
      expect(cliente.ubicacion).toBe("Kaer Morhen");
  });
  
  test("Debe permitir la creación de diferentes clientes", () => {
      const cliente1 = new Cliente(2, "Yennefer de Vengerberg", "Humana", "Vengerberg");
      const cliente2 = new Cliente(3, "Jaskier", "Humano", "Redania");
      
      expect(cliente1.nombre).toBe("Yennefer de Vengerberg");
      expect(cliente2.nombre).toBe("Jaskier");
      expect(cliente1.raza).toBe("Humana");
      expect(cliente2.ubicacion).toBe("Redania");
  });
});

/**
 * Pruebas unitarias para la clase Mercader.
 */
describe("Mercader", () => {
    
  test("Debe crear un objeto Mercader con las propiedades correctas", () => {
      const mercader = new Mercader(1, "Hattori", "Herrero", "Novigrado");
      
      expect(mercader.id).toBe(1);
      expect(mercader.nombre).toBe("Hattori");
      expect(mercader.tipo).toBe("Herrero");
      expect(mercader.ubicacion).toBe("Novigrado");
  });
  
  test("Debe permitir la creación de diferentes mercaderes", () => {
      const mercader1 = new Mercader(2, "Éibhear Hattori", "Forjador de espadas", "Novigrado");
      const mercader2 = new Mercader(3, "Yoana", "Armera", "Kaer Trolde");
      
      expect(mercader1.nombre).toBe("Éibhear Hattori");
      expect(mercader2.nombre).toBe("Yoana");
      expect(mercader1.tipo).toBe("Forjador de espadas");
      expect(mercader2.ubicacion).toBe("Kaer Trolde");
  });
});

/**
 * Pruebas unitarias para la clase Transaccion.
 */
describe("Transaccion", () => {
    
  test("Debe crear un objeto Transaccion con las propiedades correctas", () => {
      const bien = new Bien(1, "Espada de Plata", "Espada contra monstruos", "Plata", 2, 200);
      const transaccion = new Transaccion(1, "venta", 1001, "2025-03-14", bien, 200);
      
      expect(transaccion.id).toBe(1);
      expect(transaccion.tipo).toBe("venta");
      expect(transaccion.idInvolucrado).toBe(1001);
      expect(transaccion.fecha).toBe("2025-03-14");
      expect(transaccion.bien).toBe(bien);
      expect(transaccion.valor).toBe(200);
  });
  
  test("Debe permitir diferentes tipos de transacciones", () => {
      const bien1 = new Bien(2, "Armadura de Grifo", "Armadura de escuela de brujos", "Acero", 10, 500);
      const transaccion1 = new Transaccion(2, "compra", 2002, "2025-03-14", bien1, 500);
      const transaccion2 = new Transaccion(3, "devolucion", 3003, "2025-03-14", bien1, 500);
      
      expect(transaccion1.tipo).toBe("compra");
      expect(transaccion2.tipo).toBe("devolucion");
      expect(transaccion1.valor).toBe(500);
      expect(transaccion2.bien.nombre).toBe("Armadura de Grifo");
  });
});


//let series = new coleccionSeries()

// describe("Test Elements", () => {
    
//     test("TEST BIEN", () => {
//       let bien1 = new Bien(1, "bien1", "desc1", "mate1", 10, 100);
//       //expect(coleccionSeries.allInfo()).toEqual([serie1, serie2]);
//     });

//     test("TEST MERCADER", () => {
//       let mercader1 = new Mercader(1, "mercader1", "tipo1", "ubi1");
//       //expect(coleccionSeries.allInfo()).toEqual([serie1, serie2]);
//     });

//     test("TEST CLIENTE", () => {
//       let cliente1 = new Cliente(1, "cliente1", "raza1", "ubi1");
//       //expect(coleccionSeries.allInfo()).toEqual([serie1, serie2]);
//     });

//   });
