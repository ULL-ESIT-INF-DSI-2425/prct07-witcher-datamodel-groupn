/**
 * Módulo principal para la gestión de inventario en The Witcher.
 * Utiliza Inquirer.js para la interfaz interactiva en línea de comandos.
 */
import inquirer from "inquirer"
import { Inventario } from "../inventario/inventario.js";
import { Bien } from "../elements/Bien.js";
import { Mercader } from "../elements/Mercader.js";
import { Cliente } from "../elements/Cliente.js";
import { Transaccion, TransaccionDevolucion } from "../elements/Transaccion.js";
//import { addAbortListener } from "events";

/**
 *  Objeto que representa el inventario de la tienda
 */
const inventario = new Inventario();

/**
 * Función principal que inicia el menú de la tienda
 */
export async function main() {
    
    while (true) {
        const { opcion }  = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Gestionar Bienes', 'Gestionar Mercaderes', 'Gestionar Clientes', 'Transacciones', 'Informes', 'Salir'],
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
            case 'Informes':
                await gestionarInformes();
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
export async function addBien() {
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
export async function consultarBienes() {
    const { criterio } = await inquirer.prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Seleccione criterio de búsqueda:',
            choices: ['Nombre', 'Material', 'Valor (ascendente)', 'Valor (descendente)', 'Mostrar todos']
        }
    ]);

    const bienes = inventario.getBienes();

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
export async function removeBien() {
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
export async function modificarBien() {
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
    // Se pasa el ID del bien para preservar el identificador original.
    const nuevosDatos = await obtenerDatosBien(bien.id);
    inventario.updateBien(Number(id), nuevosDatos);
}

/**
 * Solicita al usuario los datos de un bien.
 */
export async function obtenerDatosBien(id?: number) {
    if (id === undefined) {
        id = inventario.ultimoIdBien();
    }
    const { nombre, descripcion, material, peso, valor } = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'descripcion', message: 'Descripción:' }, 
        { type: 'input', name: 'material', message: 'Material:' }, 
        { type: 'input', name: 'peso', message: 'Peso:', filter: input => parseInt(input) }, 
        { type: 'input', name: 'valor', message: 'Valor:', filter: input => parseInt(input) }, 
    ]);
    return new Bien( id, nombre, descripcion, material, peso, valor);
}

/**
 * Menú interactivo para gestionar mercaderes.
 */
export async function gestionarMercaderes(){
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
export async function addMercader() {
    const mercader = await obtenerDatosMercader();
    inventario.addMercader(mercader);
}

/**
 * Consulta la lista de mercaderes registrados.
 */
export async function consultarMercaderes() {
    console.log(inventario.getMercaderes());
}

/**
 * Consulta el criterio a la hora de buscar información sobre un mercader
 */
export async function localizarMercader() {
    const { criterio } = await inquirer.prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Seleccione criterio de búsqueda:',
            choices: ['Nombre', 'Tipo', 'Ubicación', 'Main Menu', 'Salir']
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
        case 'Menu principal':
            await main();
            break;
        case 'Salir':
            process.exit(0);
            break;
    }
}

/**
 * Muestra los mercaderes que tengan el nombre especificado
 */
export async function localizarMercaderPorNombre() {
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

/**
 * Muestra los mercaderes que tengan el tipo especificado
 */
export async function localizarMercaderPorTipo() {
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

/**
 * Muestra los mercaderes que se encuentren en la ubicación especificada
 */
export async function localizarMercaderPorUbicacion() {
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
export async function removeMercader() {
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
export async function modificarMercader() {
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
 * @returns \{Mercader\} Objeto de tipo Mercader con los datos ingresados.
 */
export async function obtenerDatosMercader() {
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
export async function gestionarClientes(){
   while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Añadir Cliente', 'Consultar Clientes', 'Localizar Cliente', 'Modificar Cliente', 'Eliminar Clientes', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Añadir Cliente':
                await addCliente();
                break;
            case 'Consultar Clientes':
                await consultarClientes();
                break;
            case 'Localizar Cliente':
                await localizarCliente();
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
export async function addCliente() {
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
export async function consultarClientes() {
    console.log(inventario.getClientes());
}

/**
 * Consulta el criterio a la hora de buscar información sobre un cliente
 */
export async function localizarCliente() {
    const { criterio } = await inquirer.prompt([
        {
            type: 'list',
            name: 'criterio',
            message: 'Seleccione criterio de búsqueda:',
            choices: ['Nombre', 'Raza', 'Ubicación', 'Main Menu', 'Salir']
        }
    ]);

    switch(criterio) {
        case 'Nombre':
            await localizarClientePorNombre();
            break;
        case 'Raza':
            await localizarClientePorRaza();
            break;
        case 'Ubicación':
            await localizarClientePorUbicacion();
            break;
        case 'Menu principal':
            await main();
            break;
        case 'Salir':
            process.exit(0);
            break;
    }
}

/**
 * Muestra los clientes que tengan el nombre especificado
 */
export async function localizarClientePorNombre() {
    const { nombre } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el Nombre del cliente que desea localizar:',
        },
    ]);

    const clientes = inventario.getClientesPorNombre(nombre);
    if (clientes) {
        console.log(clientes);
    }
}

/**
 * Muestra los clientes que tengan la raza especificada
 */
export async function localizarClientePorRaza() {
    const { raza } = await inquirer.prompt([
        {
            type: 'input',
            name: 'raza',
            message: 'Ingrese la raza de los clientes que desea localizar:',
        },
    ]);

    const clientes = inventario.getClientesPorRaza(raza);
    if (clientes) {
        console.log(clientes);
    }
}

/**
 * Muestra los clientes que esten en la ubicación especificada
 */
export async function localizarClientePorUbicacion() {
    const { ubicacion } = await inquirer.prompt([
        {
            type: 'input',
            name: 'ubicacion',
            message: 'Ingrese la ubicación de los clientes que desea localizar:',
        },
    ]);

    const clientes = inventario.getClientesPorUbicacion(ubicacion);
    if (clientes) {
        console.log(clientes);
    }
}

/**
 * Elimina un cliente del inventario por su ID.
 */
export async function removeCliente() {
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
export async function modificarCliente() {
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
 * @returns Cliente Objeto de tipo Cliente con los datos ingresados.
 */
export async function obtenerDatosCliente() {
    const { id, nombre, raza, ubicacion } = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID:', filter: input => parseInt(input) },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'raza', message: 'Raza:' }, 
        { type: 'input', name: 'ubicacion', message: 'Ubicación:' },
    ]);
    return new Cliente(id, nombre, raza, ubicacion);
}

/**
 * Función que gestiona las transacciones
 */
export async function gestionarTransaccion(){
while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Venta', 'Compra','Devolucion','Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Venta':
                await transaccionVenta();
                break;
            case 'Compra':
                await transaccionCompra();
                break;
            case 'Devolucion':
                await transaccionDevolucion();
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
 * Función que destiona las transacciones de bienes vendidos
 */
export async function transaccionVenta(){
    //obtener datos de la venta
    const transaccion = await obtenerDatosVenta();
    if (transaccion) {
        inventario.addTransaccion(transaccion);
        inventario.removeBien(transaccion.bien.id);
    } else {
        console.log("Error. Bien no encontrado.");
    }
    //inventario.addTransaccion(transaccion);

}

/**
 * Función que destiona las transacciones de bienes comprados
 */
export async function transaccionCompra(){
    const transaccion = await obtenerDatosCompra();
    if (transaccion) {

        inventario.addTransaccion(transaccion);
        inventario.addBien(transaccion.bien);
        //addBien();
    } else {
        console.log("Error. Bien no encontrado.");
    }
    //inventario.addTransaccion(transaccion);
}

/**
 * Función que destiona las transacciones de bienes devueltos
 */
export async function transaccionDevolucion(){
    const transaccion = await obtenerDatosDevolucion();
    if (transaccion) {
        // FUNCIONAMIENTO DEVOLUCION: dev de un cliente, añadimos el bien a la db. dev a un mercader, eliminamos el bien de la db.
        if(transaccion.devolucion === "Cliente") {
            const result = inventario.addTransaccion(transaccion);
            if (result) {
                inventario.addBien(transaccion.bien);
            }
            
        } else if(transaccion.devolucion === "Mercader") {
            const result = inventario.addTransaccion(transaccion);
            if (result) {
                inventario.removeBien(transaccion.bien.id);
            }
            
        }
        
    } else {
        console.log("Error. Bien no encontrado.");
    }  
}

/**
 * Función que obtiene los datos de una venta de un bien
 * @returns Datos de la venta de un bien o 'undefined' si no existe.
 */
export async function obtenerDatosVenta(){
    const { idInvolucrado, fecha, bienId } = await inquirer.prompt([
        
        { type: 'input', name: 'idInvolucrado', message: 'Id del cliente:', filter: input => parseInt(input)}, 
        { type: 'input', name: 'fecha', message: 'Fecha:' }, 
        { type: 'input', name: 'bienId', message: 'Id del Bien:', filter: input => parseInt(input) }, 
        
    ]);
    
    const id = inventario.idTransaccion();
    
    const tipo = "venta";
    const bien = inventario.getBienPorId(bienId);

    if(bien) {
        const valor = bien.valor;
        return new Transaccion(id, tipo, idInvolucrado, fecha, bien, valor);
    } else {
        return undefined;
    }
}

/**
 * Función que obtiene los datos de una compra de un bien
 * @returns Datos de la compra de un bien o 'undefined' si no existe.
 */
/* istanbul ignore next */
export async function obtenerDatosCompra(){

    const { idMercader, fecha } = await inquirer.prompt([
        { type: 'input', name: 'idMercader', message: 'Id del Mercader:', filter: input => parseInt(input)}, 
        { type: 'input', name: 'fecha', message: 'Fecha:' }, 
    ]);
    
    const id = inventario.idTransaccion();
    
    const tipo = "compra";
    const dev = undefined;
    console.log("Introduzca los datos del Bien: ");
    const bien = await obtenerDatosBien();
    
    if(bien && !isNaN(bien.peso) && !isNaN(bien.valor) ) {
        const valor = bien.valor;
        return new Transaccion(id, tipo, idMercader, fecha, bien, valor);
    } else {
        return undefined;
    }
}

/**
 * Función que obtiene los datos de una devolución de un bien
 * @returns Datos de la devolución de un bien o 'undefined' si no existe.
 */
export async function obtenerDatosDevolucion(){

    const { dev, idInvolucrado, fecha, bienId } = await inquirer.prompt([
        
        { type: 'input', name: 'dev', message: 'Devolución de Cliente o Mercader: (Cliente | Mercader)' },
        { type: 'input', name: 'idInvolucrado', message: 'Id del Cliente o Mercader:', filter: input => parseInt(input)}, 
        { type: 'input', name: 'fecha', message: 'Fecha:' }, 
        
    ]);

    const id = inventario.idTransaccion();
    
    const tipo = "devolucion";
    let bien: Bien | null = null;

    // si dev es de un cliente se obtiene los datos del bien para añadirlo a la db, si dev es Mercader el bien ya está en la db y se elimina(BUSCAR FUNCIONAMIENTO DEVOLUCION) porque se le devuelve al mercader
    if(dev === "Cliente") {
        // obtener bien
        console.log("Introduzca los atributos del Bien: ");
        bien = await obtenerDatosBien();

    } else if(dev === "Mercader") {
        const { bienId } = await inquirer.prompt([
            { type: 'input', name: 'bienId', message: 'ID del bien en Stock a devolver: ', filter: input => parseInt(input) },
        ]);
        bien = inventario.getBienPorId(bienId);
    } else {
        console.log("Error. Devolución debe ser de Cliente o Mercader");
        return undefined;
    }
    
    if(bien && (dev === "Cliente" || dev === "Mercader") && !isNaN(bien.peso) && !isNaN(bien.valor) ) {
        const valor = bien.valor;
        return new TransaccionDevolucion(id, tipo, idInvolucrado, fecha, bien, valor, dev);
    } else {
        return undefined;
    }
    
}

/**
 * Función que gestiona los diferentes informes que se pueden pedir
 */
export async function gestionarInformes(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Stock de un bien', 'Bienes más vendidos', 'Bienes más comprados','Total de ingresos y gastos', 'Histórico transacciones cliente o mercader', 'Main Menu', 'Salir'],
            },
        ]);

        switch(opcion) {
            case 'Stock de un bien':
                await informeStockBien();
                break;
            case 'Bienes más vendidos':
                await console.log(inventario.informeMasVendidos());
                break;
            case 'Bienes más comprados':
                await console.log(inventario.informeMasComprados());
                break;
            case 'Total de ingresos y gastos':
                await console.log(inventario.informeIngresosGastos());
                break;
            case 'Histórico transacciones cliente o mercader':
                await informeHistorial();
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
 * Función para la obtención de un informe de stock de un bien
 */
export async function informeStockBien(){
    
    const { idBien } = await inquirer.prompt([
        { type: 'input', name: 'idBien', message: 'Id del Bien:', filter: input => parseInt(input)}, 
    ]);
        
    console.log("Stock total: ");
    console.log(inventario.informeStock(idBien));
}

/**
 * Función para la obtención de un informe con el historial de transacciones de un mercader o cliente en específico
 */
/* istanbul ignore next */
export async function informeHistorial(){
    while (true) {
        const { opcion } = await inquirer.prompt([
            {
                type: 'list', 
                name: 'opcion',
                message: 'Seleccione una opcion: ',
                choices: ['Cliente', 'Mercader', 'Main Menu', 'Salir'],
            },
        ]);

        //let idUsuario: number = 0;

        let idUsuario:number = 0;

        if (opcion === "Cliente" || opcion === "Mercader"){
            ({ idUsuario } = await inquirer.prompt([
                { type: 'input', name: 'idUsuario', message: 'Id del Cliente o Mercader:', filter: input => parseInt(input)}, 
            ]));
        }

        switch(opcion) {
            case 'Cliente':
                //console.log(idUsuario);
                await console.log(inventario.informeHistorico(idUsuario, "Cliente"));
                break;
            case 'Mercader':
                //console.log(idUsuario);
                await console.log(inventario.informeHistorico(idUsuario, "Mercader"));
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





/*
async function informeIngresosGastos(){
    //obtener datos de la venta
    const transaccion = await obtenerDatosVenta();
    if (transaccion) {
        inventario.addTransaccion(transaccion);
        inventario.removeBien(transaccion.bien.id);
    } else {
        console.log("Error. Bien no encontrado.");
    }
    //inventario.addTransaccion(transaccion);

}*/




//main();