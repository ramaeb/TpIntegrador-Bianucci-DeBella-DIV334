//VARIABLES
let productosBackend = [];// Productos que vienen del backend
let carrito = [];// Carrito que se guarda en localStorage

const contenedorProductos = document.getElementById("seccion-productos");
const contenedorCarrito   = document.getElementById("contenedor-carrito");
const mensajeBienvenida  = document.getElementById("mensaje-bienvenida");

//LOGICA USUARIO
function verificarUsuario() {
    const nombreUsuario = sessionStorage.getItem("nombreUsuario");
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
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
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

//INICIALIZACION
function init() {
    verificarUsuario();
    vaciarCarrito();
    cargarCarritoLocal();   
    cargarProductos();      
    mostrarCarrito();        
}

init();