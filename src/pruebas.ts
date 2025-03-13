import { Bien } from "./elements/Bien.js";
import { Cliente } from "./elements/Cliente.js";
import { Mercader } from "./elements/Mercader.js";
import { Inventario } from "./inventario/inventario.js";

let prueba = new Inventario;

//prueba.getAll();

//console.log(prueba.getAll());
//console.log("BIEN: ");

let bien3 = new Bien(6, "bien6", "desc6", "mat6", 3, 10);

console.log(prueba.getAll());
prueba.addBien(bien3);
console.log(prueba.getAll());
//console.log(prueba.getBienes());
//console.log("ALL: ");
//console.log(prueba.getAll());

/*
{
  "bienes": [
    {"id": 1, "nombre": "bien1", "descipcion": "desc1", "material": "mat1", "peso": 10, "valor": 100},
    {"id": 2, "nombre": "bien2", "descipcion": "desc2", "material": "mat2", "peso": 15, "valor": 200}
  ],
  "mercaderes": [
    {"id": 1, "nombre": "mercader1", "tipo": "tipo1", "ubicacion": "ubi1"},
    {"id": 2, "nombre": "mercader2", "tipo": "tipo2", "ubicacion": "ubi2"}
  ],
  "clientes": [
    {"id": 1, "nombre": "cli1", "raza": "raza1", "ubicacion": "ubi1"},
    {"id": 2, "nombre": "cli2", "raza": "raza2", "ubicacion": "ubi2"}
  ]
}
*/