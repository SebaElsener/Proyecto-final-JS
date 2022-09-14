
// Importando módulos variables y DOM
import {variablesExport} from './variables.js'
import {domExport, domIndex} from './DOM.js'

// Function para guardar carrito y total precio carrito en storage
function guardarCarritoStorage () {
    sessionStorage.setItem('carrito', JSON.stringify(variablesExport.carrito));
    sessionStorage.setItem('totalPreviewCarrito', JSON.stringify(variablesExport.totalPreviewCarrito));
}

// Function mostrar msj carrito vacío
function msjCarritoVacio() {
    domExport.accionesCarrito.style.display = 'none'
    domExport.prodCarrito.innerHTML = `<br><br><strong>CARRITO VACIO, POR FAVOR DIRIJASE A LA <a href="./ventacubiertas.html">PAGINA DE VENTAS</a> PARA AGREGAR PRODUCTOS</strong>`
    domExport.prodCarrito.style.textAlign = 'center'
    domExport.prodCarrito.style.padding = '0rem 5rem'
}

export function validarFormIndex(){
    // Evento click enviar formulario
    domIndex.formIndexBtnSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        if (domIndex.formIndexNombre.value.length == 0 || domIndex.formIndexMail.value.length == 0 || domIndex.formIndexCiudad.value.length == 0 || domIndex.formIndexSugerencias.value.length == 0){
            Toastify({
                text: "Por favor, complete todos los campos marcados con *",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                offset: {
                    x: 40,
                    y: 85,
                },
                duration: 1800
            }).showToast();
        } else{
            Toastify({
                text: "Sus comentarios han sido enviados, muchas gracias",
                position: "left",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                offset: {
                    x: 40,
                    y: 85,
                },
                duration: 2000
            }).showToast();
            // Reset valores de los campos formulario
            domIndex.formIndexNombre.value = ''
            domIndex.formIndexMail.value = ''
            domIndex.formIndexCiudad.value = ''
            domIndex.formIndexSugerencias.value = ''
        }
    })
}

// Objeto para exportar funciones
export const functionExport = {
    guardarCarritoStorage,
    msjCarritoVacio
}