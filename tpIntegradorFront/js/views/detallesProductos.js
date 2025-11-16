async function cargarDetallesProductos(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener el producto");
        }

        const producto = data.payload[0];
        mostrarDetallesProductos(producto);

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

function mostrarDetallesProductos(productos) {
    const main = document.getElementById("main-content");
    let htmlProductos = `
        <div class="contenedor-detalles-productos">
    `;

    productos.forEach(prod => {
        htmlProductos += `
            <div class="card-detalle-producto">
                <img src="${prod.imagen_url}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>Precio: $${prod.precio}</p>
                <button class="btn-carrito" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
                <button class="btn-detalles" onclick="verDetallesProducto(${prod.id})">Ver detalles</button>
            </div>
        `;
    });

    htmlProductos += `</div>`; 

    main.innerHTML = htmlProductos;
}

window.cargarDetallesProductos = cargarDetallesProductos;
export { cargarDetallesProductos };