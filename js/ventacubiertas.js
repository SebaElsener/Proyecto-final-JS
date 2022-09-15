
// Importando módulos functions, variables y DOM
import {variablesExport} from './variables.js'
import {domExport} from './DOM.js'
import {functionExport} from './functions.js'

// Fetch url
const traerDatos = () =>{
    fetch('https://www.mockachino.com/2db31ba0-0410-4e/users')
    .then((response) => response.json())
    .then((datos) => {
        // Volcando al array de productos el contenido del json
        variablesExport.stockCubiertas = datos.data
        // Llamado a la function para mostrar los productos en DOM
        functionExport.generarGrillaProductos()
    })
}

traerDatos()

// Cargando datos guardados en storage
functionExport.cargarDatosStorage()

// Evento click para validar y continuar la compra una vez ingresados los datos
domExport.btnContinuarCompra.addEventListener("click", (e) => {
    e.preventDefault()
    functionExport.validarDatos()
})
