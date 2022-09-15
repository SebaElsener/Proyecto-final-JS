
// Importando módulos functions, variables y DOM
import {domExport} from './DOM.js'
import {variablesExport} from './variables.js'
import {functionExport} from './functions.js'

// Fetch url
const traerDatos = () =>{
    fetch('https://www.mockachino.com/2db31ba0-0410-4e/users')
    .then((response) => response.json())
    .then((datos) => {
        // Volcando al array de productos el contenido del json
        variablesExport.stockCubiertas = datos.data
        // Llamado a la function para mostrar los productos en DOM
        functionExport.mostrarCarrito()
    })
}

// Trayendo la información del carrito desde el storage
if (JSON.parse(sessionStorage.getItem('carrito')) == null || variablesExport.carrito.length == 0){
    // Si lo encuentra vacío (en storage o en la variable), pide ir a la página de compra
    functionExport.msjCarritoVacio()
} else{
    // Si hay datos, los carga del storage
    functionExport.cargarCarritoStorage()
    // Function fetch
    traerDatos()
}

// Evento botón finalizar compra
domExport.btnFinalizarCompra.addEventListener('click', function() {
    functionExport.finCompra()
})
