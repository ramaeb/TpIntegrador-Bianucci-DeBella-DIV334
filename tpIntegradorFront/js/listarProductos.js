
async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener productos");
        }

        const productos = data.payload;
        mostrarProductos(productos);

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

function mostrarProductos(productos) {
    const main = document.getElementById("main");
    let htmlProductos = `
        <h2 class="titulo-productos">Nuestros Productos</h2>
        <div class="contenedor-productos">
    `;

    productos.forEach(prod => {
        if (prod.estado !== 1) return;
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

    htmlProductos += `</div>`; 

    main.innerHTML = htmlProductos;
}

export { cargarProductos };
