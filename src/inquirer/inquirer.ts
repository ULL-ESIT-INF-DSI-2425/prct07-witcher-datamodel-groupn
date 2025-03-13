import inquirer from "inquirer"
import { Inventario } from "../inventario/inventario.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";
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
                await gestionarMercaderes();
                break;
            case 'Gestionar Clientes':
                await gestionarClientes();
                break;
            case 'Salir':
                process.exit(0);
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
                choices: ['Añadir Bien', 'Consultar Bienes', 'Eliminar Bienes','Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Bien':
                await addBien();
                break;
            case 'Consultar Bienes':
                await console.log(inventario.getBienes());
                break;
            case 'Eliminar Bienes':
                await removeBien();
                break;
            case 'Main Menu':
                await main();
                break;
            case 'Salir':
                process.exit(0);
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
            //validate: (input: string) => {
            //    return !isNaN(parseInt(input)) || "No es numero";
            //},
            filter: (input: string) => parseInt(input)
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
            filter: (input: string) => parseInt(input)
        }, 
        {
            type: 'input',
            name: 'valor',
            message: 'Ingrese el valor:',
            filter: (input: string) => parseInt(input)
        }, 
    ]);

    // Crear un nuevo objeto Bien y agregarlo
    const bien = new Bien(id, nombre, descripcion, material, peso, valor);
    inventario.addBien(bien);
}

async function removeBien() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del bien a eliminar:',
            validate: (input) => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        },
    ]);

    const bienId = Number(id);

    inventario.removeBien(bienId);
}


async function gestionarMercaderes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Mercader', 'Consultar Mercaderes', 'Eliminar Mercaderes', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Mercader':
                await addMercader();
                break;
            case 'Consultar Mercaderes':
                await console.log(inventario.getMercaderes());
                break;
            case 'Eliminar Mercaderes':
                await removeMercader();
                break;
            case 'Main Menu':
                await main();
                break;
            case 'Salir':
                process.exit(0);
                break;
        }

    }


}

async function addMercader(){
    const { id, nombre, tipo, ubicacion  } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID:',
            //validate: (input: string) => {
            //    return !isNaN(parseInt(input)) || "No es numero";
            //},
            filter: (input: string) => parseInt(input)
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre:',
        },
        {
            type: 'input',
            name: 'tipo',
            message: 'Ingrese el tipo:',
        }, 
        {
            type: 'input',
            name: 'ubicacion',
            message: 'Ingrese la ubicacion:',
        },
    ]);

    // Crear un nuevo objeto Bien y agregarlo
    const mercader = new Mercader(id, nombre, tipo, ubicacion);
    inventario.addMercader(mercader);
}

async function removeMercader() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del mercader a eliminar:',
            validate: (input) => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        },
    ]);

    const mercaderId = Number(id);

    inventario.removeMercader(mercaderId);
}


async function gestionarClientes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Cliente', 'Consultar Clientes','Eliminar Clientes', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Cliente':
                await addCliente();
                break;
            case 'Consultar Clientes':
                await console.log(inventario.getClientes());
                break;
            case 'Eliminar Clientes':
                await removeCliente();
                break;
            case 'Main Menu':
                await main();
                break;
            case 'Salir':
                process.exit(0);
                break;
        }

    }


}

async function addCliente(){
    const { id, nombre, raza, ubicacion  } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID:',
            //validate: (input: string) => {
            //    return !isNaN(parseInt(input)) || "No es numero";
            //},
            filter: (input: string) => parseInt(input)
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre:',
        },
        {
            type: 'input',
            name: 'raza',
            message: 'Ingrese la raza:',
        }, 
        {
            type: 'input',
            name: 'ubicacion',
            message: 'Ingrese la ubicacion:',
        },
    ]);

    // Crear un nuevo objeto Bien y agregarlo
    const cliente = new Cliente(id, nombre, raza, ubicacion);
    inventario.addCliente(cliente);
}

async function removeCliente() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del cliente a eliminar:',
            validate: (input) => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        },
    ]);

    const clienteId = Number(id);

    inventario.removeCliente(clienteId);
}

main();