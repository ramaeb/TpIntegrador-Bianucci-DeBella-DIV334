async function cargarProductos() {
    try {
        const response = await fetch("http://localhost:3000/products");
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
    const main = document.getElementById("main-content");
    let htmlProductos = `<h2 class="titulo-productos">Nuestros Productos</h2>`;

    productos.forEach(prod => {
        htmlProductos += `
            <div class="card-producto">
                <img src="${prod.imagen || 'img/default.png'}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>Precio: $${prod.precio}</p>
                <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
            </div>
        `;
    });

    main.innerHTML = htmlProductos;
}


export { cargarProductos };
