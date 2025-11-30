//VARIABLES
let productosBackend = [];// Productos que vienen del backend
let carrito = [];// Carrito que se guarda en localStorage

const contenedorProductos = document.getElementById("seccion-productos");
const contenedorCarrito   = document.getElementById("contenedor-carrito");


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

    productos.forEach(prod => {
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

    carrito.push(producto);

    actualizarCarrito();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
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
                ${item.nombre} - $${item.precio}
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </li>
        `;
        total += item.precio;
    });

    html += `</ul>
        <p><strong>Total: $${total}</strong></p>
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
    `;

    contenedorCarrito.innerHTML = html;
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

//INICIALIZACION
function init() {
    //vaciarCarrito(); OJO! CON ESTO ROMPEMOS CUANDO VUELVO DEL LOGIN, LO COMENTO.
    cargarCarritoLocal();   
    cargarProductos();      
    mostrarCarrito();        
}

document.addEventListener("DOMContentLoaded", () => {
    init();
});
