window.addEventListener("DOMContentLoaded", () => {
    const nombreUsuario = localStorage.getItem("nombreUsuario") || "Usuario";
    const contenedor = document.getElementById("contenedor-productos");

    // Lista temporal de productos
    const productos = [
        { nombre: "Windows 11 Pro", precio: 25000 },
        { nombre: "Office 2021", precio: 20000 },
        { nombre: "Antivirus Kaspersky", precio: 12000 },
        { nombre: "Adobe Photoshop", precio: 30000 },
        { nombre: "Visual Studio 2022", precio: 18000 }
    ];

    // Estructura HTML generada dinámicamente
    contenedor.innerHTML = `
        <h2>¡Hola, ${nombreUsuario}! Estos son nuestros productos:</h2>
        <div class="lista-productos">
            ${productos.map(p => `
                <div class="producto">
                    <h3>${p.nombre}</h3>
                    <p>Precio: $${p.precio}</p>
                    <button>Agregar al carrito</button>
                </div>
            `).join("")}
        </div>
    `;
});
