let contenedorProductos = document.getElementById("contenedor-productos");

async function obtenerProductos() {
    try {
        let respuesta = await fetch("http://localhost:3000/api/products");

        let data = await respuesta.json();
        

        if(respuesta.ok) {
            
            let productos = data.payload;

            mostrarProductos(productos);

        } else {
            alert(data.message)
        }


    } catch (error) {
        console.error(error);
    }
}

function mostrarProductos(productos) {
    let htmlProductos = "";

    productos.forEach(prod => {
        let claseEstado = "estado-activo";
        if(prod.estado == 1){
            prod.estado = "ACTIVO";
            claseEstado = "estado-activo";
        } else {
            prod.estado = "INACTIVO";
            claseEstado = "estado-inactivo";
        }
        let estadoTexto = prod.estado == 1 ? "ACTIVO" : "INACTIVO";

        htmlProductos += `
            <div class="card-producto">
                <img src="${prod.imagen_url}" alt="${prod.nombre}">
                <p>Id: ${prod.id}</p>
                <h5>${prod.nombre}</h5>
                <p>$${prod.precio}</p>
                <p class=${claseEstado}>${prod.estado}</p>
                <button class="boton-baja" type="submit">Dar Baja</button>
            </div>
        `;
    });
    contenedorProductos.innerHTML = htmlProductos;
    
}
//BAJA LOGICA.
contenedorProductos.addEventListener("click", async (event) => {
            if(event.target.classList.contains("boton-baja")){
                let card = event.target.closest(".card-producto");
                let idProducto = card.querySelector("p").textContent.split(": ")[1];
        // Llamada al endpoint de "dar baja lógica"
            let respuesta = await fetch(`http://localhost:3000/api/products/baja/${idProducto}`, {
                method: "PUT"
            });

            let texto = await respuesta.text();
            console.log("RESPUESTA DEL BACKEND:", texto);
            if (respuesta.ok) {
                // Actualizar la card visualmente
                let estadoElement = card.querySelector("p.estado-activo, p.estado-inactivo");
                estadoElement.textContent = "INACTIVO";
                estadoElement.classList.remove("estado-activo");
                estadoElement.classList.add("estado-inactivo");

                alert("Producto dado de baja");
            } else {
                alert("Error al dar de baja el producto");
            }
        }});
//Funcion para dar la baja logica de productos
function init() {
    obtenerProductos();
}

init();