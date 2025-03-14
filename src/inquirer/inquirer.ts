/**
 * Módulo principal para la gestión de inventario en The Witcher.
 * Utiliza Inquirer.js para la interfaz interactiva en línea de comandos.
 */
import inquirer from "inquirer"
import { Inventario } from "../inventario/inventario.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";
import { addAbortListener } from "events";
/**
 *  Objeto que representa el inventario de la tienda
 */
let inventario = new Inventario();
/**
 * Función principal que inicia el menú de la tienda
 */
export async function main() {
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Gestionar Bienes', 'Gestionar Mercaderes', 'Gestionar Clientes', 'Transacciones', 'Salir'],
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
            case 'Transacciones':
                await gestionarTransaccion();
                break;
            case 'Salir':
                process.exit(0);
                break;
        }
    }
}
/**
 * Función que gestiona los bienes de la tienda
 */
async function gestionarBienes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Bien', 'Consultar Bienes','Modificar Bienes', 'Eliminar Bienes','Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Bien':
                await addBien();
                break;
            case 'Consultar Bienes':
                await consultarBienes();
                break;
            case 'Modificar Bienes':
                await modificarBien();
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
/**
 * Añade un nuevo bien al inventario.
 */
async function addBien() {
    const bien = await obtenerDatosBien();
    inventario.addBien(bien);
}
// async function addBien(){
//     const { id, nombre, descripcion, material, peso, valor  } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'id',
//             message: 'Ingrese el ID:',
//             //validate: (input: string) => {
//             //    return !isNaN(parseInt(input)) || "No es numero";
//             //},
//             filter: (input: string) => parseInt(input)
//         },
//         {
//             type: 'input',
//             name: 'nombre',
//             message: 'Ingrese el nombre:',
//         },
//         {
//             type: 'input',
//             name: 'descripcion',
//             message: 'Ingrese la descripcion:',
//         }, 
//         {
//             type: 'input',
//             name: 'material',
//             message: 'Ingrese el material:',
//         }, 
//         {
//             type: 'input',
//             name: 'peso',
//             message: 'Ingrese el peso:',
//             filter: (input: string) => parseInt(input)
//         }, 
//         {
//             type: 'input',
//             name: 'valor',
//             message: 'Ingrese el valor:',
//             filter: (input: string) => parseInt(input)
//         }, 
//     ]);

//     // Crear un nuevo objeto Bien y agregarlo
//     const bien = new Bien(id, nombre, descripcion, material, peso, valor);
//     inventario.addBien(bien);
// }
/**
 * Consulta bienes en el inventario según distintos criterios.
 */
async function consultarBienes() {
    const { criterio } = await inquirer.prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Seleccione criterio de búsqueda:',
            choices: ['Nombre', 'Material', 'Valor (ascendente)', 'Valor (descendente)', 'Mostrar todos']
        }
    ]);

    let bienes = inventario.getBienes();

    switch(criterio) {
        case 'Nombre':
            if (bienes) {
                bienes.sort((a, b) => a.nombre.localeCompare(b.nombre));
            }
            break;
        case 'Material':
            if (bienes) {
                bienes.sort((a, b) => a.material.localeCompare(b.material));
            }
            break;
        case 'Valor (ascendente)':
            if (bienes) {
                bienes.sort((a, b) => a.valor - b.valor);
            }
            break;
        case 'Valor (descendente)':
            if (bienes) {
                bienes.sort((a, b) => b.valor - a.valor);
            }
            break;
    }
    console.log(bienes);
}
/**
 * Elimina un bien del inventario por su ID.
 */
async function removeBien() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del bien a eliminar:',
            validate: (input) => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        },
    ]);

    inventario.removeBien(Number(id));
}
/**
 * Modifica un bien existente en el inventario.
 */
async function modificarBien() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del bien a modificar:',
            validate: input => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        }
    ]);
    
    const bien = inventario.getBienPorId(Number(id));
    if (!bien) {
        console.log("Bien no encontrado.");
        return;
    }
    
    console.log("Datos actuales:", bien);
    const nuevosDatos = await obtenerDatosBien();
    inventario.updateBien(Number(id), nuevosDatos);
}
/**
 * Solicita al usuario los datos de un bien.
 */
async function obtenerDatosBien() {
    const { id, nombre, descripcion, material, peso, valor } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID:', filter: input => parseInt(input) },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'descripcion', message: 'Descripción:' }, 
        { type: 'input', name: 'material', message: 'Material:' }, 
        { type: 'input', name: 'peso', message: 'Peso:', filter: input => parseInt(input) }, 
        { type: 'input', name: 'valor', message: 'Valor:', filter: input => parseInt(input) }, 
    ]);
    return new Bien(id, nombre, descripcion, material, peso, valor);
}
/**
 * Menú interactivo para gestionar mercaderes.
 */
async function gestionarMercaderes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Mercader', 'Consultar Mercaderes','Modificar Mercader', 'Localizar Mercaderes', 'Eliminar Mercaderes', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Mercader':
                await addMercader();
                break;
            case 'Consultar Mercaderes':
                await consultarMercaderes();
                break;
            case 'Modificar Mercader':
                await modificarMercader();
                break;
            case 'Localizar Mercaderes':
                await localizarMercader();
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
/**
 * Añade un nuevo mercader al inventario.
 */
async function addMercader() {
    const mercader = await obtenerDatosMercader();
    inventario.addMercader(mercader);
}
/**
 * Consulta la lista de mercaderes registrados.
 */
async function consultarMercaderes() {
    console.log(inventario.getMercaderes());
}

/**
 * Consulta el criterio a la hora de buscar información sobre un mercader
 */
async function localizarMercader() {
    const { criterio } = await inquirer.prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Seleccione criterio de búsqueda:',
            choices: ['Nombre', 'Tipo', 'Ubicación']
        }
    ]);

    switch(criterio) {
        case 'Nombre':
            await localizarMercaderPorNombre();
            break;
        case 'Tipo':
            await localizarMercaderPorTipo();
            break;
        case 'Ubicación':
            await localizarMercaderPorUbicacion();
            break;
    }
}

async function localizarMercaderPorNombre() {
    const { nombre } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el Nombre del mercader que desea localizar:',
        },
    ]);

    const mercaderes = inventario.getMercaderesPorNombre(nombre);
    if (mercaderes) {
        console.log(mercaderes);
    }
}

async function localizarMercaderPorTipo() {
    const { tipo } = await inquirer.prompt([
        {
            type: 'input',
            name: 'tipo',
            message: 'Ingrese el Tipo del mercader que desea localizar:',
        },
    ]);

    const mercaderes = inventario.getMercaderesPorTipo(tipo);
    if (mercaderes) {
        console.log(mercaderes);
    }
}

async function localizarMercaderPorUbicacion() {
    const { ubicacion } = await inquirer.prompt([
        {
            type: 'input',
            name: 'ubicacion',
            message: 'Ingrese la ubicación de los mercaderes que desea localizar:',
        },
    ]);

    const mercaderes = inventario.getMercaderesPorUbicacion(ubicacion);
    if (mercaderes) {
        console.log(mercaderes);
    }
}

// async function addMercader(){
//     const { id, nombre, tipo, ubicacion  } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'id',
//             message: 'Ingrese el ID:',
//             //validate: (input: string) => {
//             //    return !isNaN(parseInt(input)) || "No es numero";
//             //},
//             filter: (input: string) => parseInt(input)
//         },
//         {
//             type: 'input',
//             name: 'nombre',
//             message: 'Ingrese el nombre:',
//         },
//         {
//             type: 'input',
//             name: 'tipo',
//             message: 'Ingrese el tipo:',
//         }, 
//         {
//             type: 'input',
//             name: 'ubicacion',
//             message: 'Ingrese la ubicacion:',
//         },
//     ]);

//     // Crear un nuevo objeto Bien y agregarlo
//     const mercader = new Mercader(id, nombre, tipo, ubicacion);
//     inventario.addMercader(mercader);
// }
/**
 * Elimina un mercader del inventario por su ID.
 */
async function removeMercader() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del mercader a eliminar:',
            validate: (input) => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        },
    ]);

    inventario.removeMercader(Number(id));
}
/**
 * Modifica los datos de un mercader existente.
 */
async function modificarMercader() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del mercader a modificar:',
            validate: input => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        }
    ]);
    
    const mercader = inventario.getMercaderPorId(Number(id));
    if (!mercader) {
        console.log("Mercader no encontrado.");
        return;
    }
    
    console.log("Datos actuales:", mercader);
    const nuevosDatos = await obtenerDatosMercader();
    inventario.updateMercader(Number(id), nuevosDatos);
}
/**
 * Solicita al usuario los datos de un mercader.
 * @returns {Mercader} Objeto de tipo Mercader con los datos ingresados.
 */
async function obtenerDatosMercader() {
    const { id, nombre, tipo, ubicacion } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID:', filter: input => parseInt(input) },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'tipo', message: 'Tipo:' }, 
        { type: 'input', name: 'ubicacion', message: 'Ubicación:' },
    ]);
    return new Mercader(id, nombre, tipo, ubicacion);
}

/**
 * Menú interactivo para gestionar clientes.
 */
async function gestionarClientes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Cliente', 'Consultar Clientes','Eliminar Clientes', 'Modificar Cliente', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Cliente':
                await addCliente();
                break;
            case 'Consultar Clientes':
                await consultarClientes();
                break;
            case 'Modificar Cliente':
                await modificarCliente();
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
/**
 * Añade un nuevo cliente al inventario.
 */
async function addCliente() {
    const cliente = await obtenerDatosCliente();
    inventario.addCliente(cliente);
}

// async function addCliente(){
//     const { id, nombre, raza, ubicacion  } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'id',
//             message: 'Ingrese el ID:',
//             //validate: (input: string) => {
//             //    return !isNaN(parseInt(input)) || "No es numero";
//             //},
//             filter: (input: string) => parseInt(input)
//         },
//         {
//             type: 'input',
//             name: 'nombre',
//             message: 'Ingrese el nombre:',
//         },
//         {
//             type: 'input',
//             name: 'raza',
//             message: 'Ingrese la raza:',
//         }, 
//         {
//             type: 'input',
//             name: 'ubicacion',
//             message: 'Ingrese la ubicacion:',
//         },
//     ]);

//     // Crear un nuevo objeto Bien y agregarlo
//     const cliente = new Cliente(id, nombre, raza, ubicacion);
//     inventario.addCliente(cliente);
// }

/**
 * Consulta la lista de clientes registrados.
 */
async function consultarClientes() {
    console.log(inventario.getClientes());
}
/**
 * Elimina un cliente del inventario por su ID.
 */
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
/**
 * Modifica los datos de un cliente existente.
 */
async function modificarCliente() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Ingrese el ID del cliente a modificar:',
            validate: input => isNaN(Number(input)) ? "Debe ingresar un número válido." : true
        }
    ]);
    
    const cliente = inventario.getClientePorId(Number(id));
    if (!cliente) {
        console.log("Cliente no encontrado.");
        return;
    }
    
    console.log("Datos actuales:", cliente);
    const nuevosDatos = await obtenerDatosCliente();
    inventario.updateCliente(Number(id), nuevosDatos);
}
/**
 * Solicita al usuario los datos de un cliente.
 * @returns {Cliente} Objeto de tipo Cliente con los datos ingresados.
 */
async function obtenerDatosCliente() {
    const { id, nombre, raza, ubicacion } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID:', filter: input => parseInt(input) },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'raza', message: 'Raza:' }, 
        { type: 'input', name: 'ubicacion', message: 'Ubicación:' },
    ]);
    return new Cliente(id, nombre, raza, ubicacion);
}

async function gestionarTransaccion(){

}

main();