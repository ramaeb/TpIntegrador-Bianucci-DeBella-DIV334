let getProduct_form = document.getElementById("getProduct-form");
let contenedorProductos = document.getElementById("contenedor-productos");
let url = "http://localhost:3000/api/products";

getProduct_form.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    let idProd = data.idProd;

    try {
        let respuesta = await fetch(`${url}/${idProd}`)
    
        let datos = await respuesta.json();

        let producto = datos.payload[0];

        mostrarProductoPorSuId(producto);

    } catch (error) {
        console.log(error);
    }
    
});

function mostrarProductoPorSuId (producto) {
    let htmlProducto = `
            <div class="card-producto">
                <img src="${producto.imagen_url}" alt="${producto.nombre}">
                <p> Id: ${producto.id} </p>
                <h5> Nombre: ${producto.nombre} </h5>
                <p><strong>Precio: ${producto.precio}</strong></p>
            </div> 
        `;

        contenedorProductos.innerHTML = htmlProducto;
}
    