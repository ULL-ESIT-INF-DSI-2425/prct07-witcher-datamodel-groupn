import inquirer from "inquirer"
import { Inventario } from "../inventario/inventario.js";
import { Bien } from "../elements/Bien.js";
import { addAbortListener } from "events";

let inventario = new Inventario();

export async function main() {
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Gestionar Bienes', 'Gestionar Mercaderes', 'Gestionar Clientes', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Gestionar Bienes':
                await gestionarBienes();
                break;
            case 'Gestionar Mercaderes':

                break;
            case 'Gestionar Clientes':

                break;
            case 'Salir':
                return;
                break;
        }
    }
}

async function gestionarBienes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Bien', 'Consultar Bienes', 'Main Menu'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Bien':
                await addBien();
                break;
            case 'Consultar Bienes':
                await console.log(inventario.getBienes());
                break;
            case 'Main Menu':

                break;
            case 'Salir':
                return;
                break;
        }

    }


}

async function addBien(){
    const { id, nombre, descripcion, material, peso, valor  } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID:',
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre:',
        },
        {
            type: 'input',
            name: 'descripcion',
            message: 'Ingrese la descripcion:',
        }, 
        {
            type: 'input',
            name: 'material',
            message: 'Ingrese el material:',
        }, 
        {
            type: 'input',
            name: 'peso',
            message: 'Ingrese el peso:',
        }, 
        {
            type: 'input',
            name: 'valor',
            message: 'Ingrese el valor:',
        }, 
    ]);

    // Crear un nuevo objeto Bien y agregarlo
    const bien = new Bien(id, nombre, descripcion, material, peso, valor);
    inventario.addBien(bien);
}

main();