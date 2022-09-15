
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

// Preview resúmen del carrito html ventacubiertas
function previewCarrito(){
    domExport.DOMCarrito.innerHTML = `<div class="carritoWrapper"><a href="carrito.html"><img class="imgCarrito" src="../img/carrito.png" alt="carrito de compras"> <span>${variablesExport.carrito.length} ITEM(S) - </span><span>$ ${variablesExport.totalPreviewCarrito} TOTAL</span><span class="arrowCarrito"><img src="../img/arrow.png" alt="indicador carrito"></span></a></div>`
    domExport.DOMCarrito.style.display = 'block'
}

// Function para cargar datos comprador storage y preview carrito, si los hubiera
function cargarDatosStorage () {
    if (sessionStorage.getItem('nombreApellido') !== null && JSON.parse(sessionStorage.getItem('nombreApellido')) !== ''){
        variablesExport.nombreUsuario = JSON.parse(sessionStorage.getItem('nombreApellido'))
        variablesExport.email = JSON.parse(sessionStorage.getItem('email'))
        domExport.nombreApellido.value = variablesExport.nombreUsuario
        domExport.email.value = variablesExport.email
        domExport.alertaCompra.innerText = ''
        domExport.btnContinuarCompra.style.display = 'none'
        domExport.grillaWrapper.style.opacity = '1'
        previewCarrito()
    }
}

// Function para cargar datos del carrito storage si los hubiera
function cargarCarritoStorage () {
    sessionStorage.getItem('carrito') !== null ? variablesExport.carrito = JSON.parse(sessionStorage.getItem('carrito')) : false
}

function mostrarCarrito() {
    if (variablesExport.carrito.length !== 0){
        // Total precio carrito que viene del preview html ventacubiertas en 0, el total para el html carrito se maneja de forma independiente y se va actualizando en caso de continuar comprando
        variablesExport.totalPreviewCarrito = 0
        // Quitando los repetidos para no mostrar un producto adicional igual en el carrito cada vez que se hace click en agregar
        const productosRepetidos = [...new Set(variablesExport.carrito)]
        for (let idProducto of productosRepetidos){
            // Obtener producto del array que coincida con el id
            const productoPorId = variablesExport.stockCubiertas.filter(idStockCubiertas => idStockCubiertas.id == idProducto)
            // Ver en el array del carrito cuántos repetidos hay
            const unidadesProducto = variablesExport.carrito.reduce((total, id) => {
                // Si coinciden los id, los sumo al total
                return id === idProducto ? total += 1 : total
            }, 0)
            // Añadiendo vistas de cada producto comprado al html carrito
            domExport.prodCarrito.innerHTML += `<div class="producto">
                                                <p class="descripcionCubierta">${productoPorId[0].descripcion}</p>
                                                <div class="imgProducto"><img src="../img/catalogos/cubiertas/${productoPorId[0].descripcion}.png" alt="imagen-cubierta-${productoPorId[0].descripcion}"></div>
                                                <p class="medidaCubierta">${productoPorId[0].medida}</p>
                                                <p class="precioCubierta"><strong>$${productoPorId[0].precio}</strong><span class="btnQuitar"><img class="imgCesto ${productoPorId[0].id}" src="../img/cesto.png" alt="quitar item carrito"></span></p>
                                                <p class="cantidad">Cantidad: ${unidadesProducto}</p>
                                                <p class="subTotal"><strong>Subtotal: </strong>$${productoPorId[0].precio * unidadesProducto}
                                            </div>`
        // Subtotal x productos
        variablesExport.subTotal = productoPorId[0].precio * unidadesProducto
        // Actualizando total precio carrito 
        variablesExport.totalPreviewCarrito += variablesExport.subTotal
        // Guardando en storage total precio carrito para referencia en html ventacubiertas
        functionExport.guardarCarritoStorage()
        // Añandiendo al DOM carrito el precio total de la compra
        domExport.totalCompra.innerHTML = `<strong>Total de su compra: </strong>$${variablesExport.totalPreviewCarrito}`
        // Function para remover productos
        removerProducto()
        }
    } else{
        // Seteo total preview carrito a 0
        variablesExport.totalPreviewCarrito = 0
        sessionStorage.setItem('totalPreviewCarrito', JSON.stringify(variablesExport.totalPreviewCarrito))
        // Mostar msj carrito vacío
        functionExport.msjCarritoVacio()
    }
}

// Function remover producto
function removerProducto() {
    // Bucle para botones remover producto carrito
    for (let i=0; i < domExport.btnQuitarProducto.length; i++){
        domExport.btnQuitarProducto[i].addEventListener("click", function (){
            // Asignando el id del producto removido
            let idProductoRemovido = this.classList[1]
            // Generando array sin los productos removidos
            let productosRemovidos = variablesExport.carrito.filter(id => id !== idProductoRemovido)
            // Asignando el array resultante al carrito
            variablesExport.carrito = productosRemovidos
            // Guardando nuevo carrito en storage
            functionExport.guardarCarritoStorage()
            // Limpiar DOM carrito
            domExport.prodCarrito.innerHTML = ''
            // Volver a llenar DOM carrito sin los productos borrados
            mostrarCarrito()
        }, false)
    }
}

// Function finalizar compra
function finCompra(){
    // Obtener datos email para msj final de carrito
    let emailSessionStorage = JSON.parse(sessionStorage.getItem('email'))
    swal({
        title: "¡Muchas gracias!",
        text: `Hemos enviado un mail a su casilla ${emailSessionStorage} con los datos para el pago`,
        icon: "success",
        button: "Cerrar",
    });
    // Vaciar carrito
    variablesExport.carrito = []
    // Vaciar storage
    sessionStorage.clear()
    // Ocultar botones acciones carrito
    domExport.accionesCarrito.style.display = 'none'
    // Mensaje DOM carrito compra finalizada
    domExport.prodCarrito.innerHTML = `<br><br><strong>¡MUCHAS GRACIAS POR SU COMPRA!</strong><br><br>DIRIJASE A LA <a href="./ventacubiertas.html">PAGINA DE VENTAS</a> PARA REALIZAR UNA NUEVA COMPRA`
    domExport.prodCarrito.style.display = 'block'
    domExport.prodCarrito.style.textAlign = 'center'
}

// Function para validar datos, si los campos no son vacíos habilita las cards de productos para comprar con animaciones opacity (y deshabilita el botón de "continuar compra". Si los campos están vacíos manda msj pidiendo completarlos)
const validarDatos = () => {
    let nombreUsuario = domExport.nombreApellido.value
    let email = domExport.email.value
    if (nombreUsuario.length == 0 || email.length == 0) {
        domExport.alertaCompra.style.aligntext = 'center'
        domExport.alertaCompra.innerText = 'Por favor ingrese su nombre, apellido y email'
    } else {
        domExport.alertaCompra.innerText = ''
        domExport.btnContinuarCompra.style.display = 'none'
        domExport.grillaWrapper.style.opacity = '1'
        // Guardando datos personales comprador en storage
        sessionStorage.setItem('nombreApellido', JSON.stringify(nombreUsuario))
        sessionStorage.setItem('email', JSON.stringify(email))
    }
}

// Function para generar la grilla de productos con el array
function generarGrillaProductos() {
    for (let cubierta of variablesExport.stockCubiertas) {
        let html = `<div class="cajaProducto" id="${cubierta.id}">
                        <img class="imgProducto" src="../img/catalogos/cubiertas/${cubierta.descripcion}.png" alt="imagen-cubierta-${cubierta.descripcion}">
                        <p class="precioCubierta"><strong>$ ${cubierta.precio}</strong></p>
                        <p class="descripcionCubierta">${cubierta.descripcion}</p>
                        <p class="medidaCubierta">${cubierta.medida}</p>
                        <button class="btnAgregarProducto">+ al carrito</button>
                    </div>`
        domExport.contenedorProductos.innerHTML += html
    }
    // Bucle event click botones "agregar" de las cards asociados al id de cada objeto del array
    for (let i=0; i < domExport.btnAgregar.length; i++){
        domExport.btnAgregar[i].addEventListener("click", function (){
            // Toastify carrito
            Toastify({
                text: "Producto agregado al carrito",
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
            // Guardando id del producto clickeado
            let idProductoAgregado = this.parentElement.id
            // Pusheando id de productos elegidos al carrito
            variablesExport.carrito.push(idProductoAgregado)
            // Obtengo el producto que coincide con el click para extraer el valor del producto para el total del preview del carrito
            const productoPorId = variablesExport.stockCubiertas.find(idProducto => idProducto.id == idProductoAgregado)
            // Guardando el valor del producto al total preview carrito
            variablesExport.totalPreviewCarrito += productoPorId.precio
            // Guardando carrito y total preview carrito en storage
            functionExport.guardarCarritoStorage()
            // Llamando function preview carrito
            functionExport.previewCarrito()
        }, false)
    }
}

// Function a exportar para validar form html index
export function validarFormIndex(){
    // Evento click enviar formulario
    domIndex.formIndexBtnSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        if (domIndex.formIndexNombre.value.length == 0 ||
            domIndex.formIndexMail.value.length == 0 ||
            domIndex.formIndexCiudad.value.length == 0 ||
            domIndex.formIndexSugerencias.value.length == 0){
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
    msjCarritoVacio,
    previewCarrito,
    cargarDatosStorage,
    validarDatos,
    generarGrillaProductos,
    cargarCarritoStorage,
    mostrarCarrito,
    finCompra
}