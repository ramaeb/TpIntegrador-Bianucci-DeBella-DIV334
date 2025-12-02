//LOGICA USUARIO
function verificarUsuario() {
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    if (!nombreUsuario) {
        window.location.href = "index.html";
    } else {
        // Mostrar mensaje de bienvenida
        const mensajeBienvenida = document.getElementById("mensaje-bienvenida");
        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `¡Bienvenido, ${nombreUsuario}!`;
        }
    }
}
//Importamos JSPDF LIBRERIA PARA GENERAR PDF

//VARIABLES
let productosBackend = [];// Productos que vienen del backend
let carrito = [];// Carrito que se guarda en localStorage
nombreUsuario = localStorage.getItem("nombreUsuario");

const contenedorProductos = document.getElementById("seccion-productos");
const contenedorCarrito   = document.getElementById("contenedor-carrito");
const mensajeBienvenida  = document.getElementById("mensaje-bienvenida");


//LOGICA CARGA PRODUCTOS
async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        
        const data = await response.json();
       
        if (!response.ok) {
            throw new Error(data.message || "Error al obtener productos");
        }

        productosBackend = data.payload;
        mostrarProductos(productosBackend);

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

function mostrarProductos(productos) {

    let htmlProductos = ``;

    productos.filter(prod => prod.estado == 1).forEach(prod => {
        htmlProductos += `
            <div class="card-producto">
                <img src="${prod.imagen_url}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>Precio: $${prod.precio}</p>
                <button class="btn-carrito" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
                <button class="btn-detalles" onclick="cargarDetallesProductos(${prod.id})">Ver detalles</button>
            </div>
        `;
    });
    
    contenedorProductos.innerHTML = htmlProductos;

}

//LOGICA CARRITO
function agregarAlCarrito(idProducto) {
    const producto = productosBackend.find(p => p.id === idProducto);
    if (!producto) return;

    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function mostrarCarrito() {
    let html = "<h2>Carrito</h2>";

    if (carrito.length === 0) {
        html += "<p>El carrito esta vacio</p>";
        contenedorCarrito.innerHTML = html;
        return;
    }

    html += `<ul>`;
    let total = 0;

    carrito.forEach((item, index) => {
        html += `
            <li class="item-carrito">
                ${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </li>
        `;
        total += item.precio * item.cantidad;
    });

    html += `</ul>
        <p><strong>Total: $${total}</strong></p>
        <div id="div-botones-carrito"><button onclick="vaciarCarrito()">Vaciar carrito</button>
        <button onclick="continuaCompra()">Continuar</button>
        </div>
    `;

    contenedorCarrito.innerHTML = html;
}

function eliminarProducto(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad -= 1;
    } else {
        carrito.splice(indice, 1);
    }
    actualizarCarrito();
}


function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function actualizarCarrito() {
    guardarCarrito();
    mostrarCarrito();
}

//LOCALSTORAGE
function guardarCarrito() {
    localStorage.setItem("carrito_backend", JSON.stringify(carrito));
}

function cargarCarritoLocal() {
    const data = localStorage.getItem("carrito_backend");
    if (data) carrito = JSON.parse(data);
}

/*
============

    logica ticket...

========

*/

function continuaCompra(){

    let fechaHoy = new Date().toLocaleDateString(); //fecha de hoy.
    contenedorProductos.innerHTML = ``;
    contenedorCarrito.innerHTML = ``;

    let total = 0;

    let html = `<h2>TICKET</h2>
    <span id="fecha-hoy">${fechaHoy}</span>`;
    
    
    carrito.forEach((item, index) => {
        html += `
            <li class="item-carrito">
                ${item.nombre} - $${item.precio} x ${item.cantidad} <span id="item-precio">$${item.precio * item.cantidad}</span>
            </li>
        `;
        total += item.precio * item.cantidad;
    });
    html += `</ul>
        <p id="total-precio">Total: $${total}</strong></p>
        <button onclick="descargaTicket()">Descargar Ticket</button>
        </div>
    `;
    mensajeBienvenida.innerHTML = `Gracias por su compra, ${nombreUsuario}`;
    carritoPdf = contenedorCarrito;
    contenedorCarrito.innerHTML = html;

    alert("Gracias por su compra, " + nombreUsuario + "!"); 
    console.log(new Date().toLocaleDateString());
    
}

function descargaTicket(){
    const { jsPDF } = window.jspdf;
    const documento = new jsPDF();
    const texto = carritoPdf.innerText; 
    documento.text(`Nombre: ${nombreUsuario}` +"\n" + texto  ,10, 10, align="left");
    documento.save(`ticket${nombreUsuario}.pdf`);
}



//INICIALIZACION
function init() {
    verificarUsuario();
    vaciarCarrito();
    cargarCarritoLocal();   
    cargarProductos();      
    mostrarCarrito();        
}

init();