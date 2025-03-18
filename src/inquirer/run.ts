import { Inventario } from "../inventario/inventario.js";
import { main } from "./inquirer.js";

const comprobarInventario = new Inventario();

if(comprobarInventario.estadoDB()){
    main();
} else {
    console.log("Mal formato en la DB.");
}