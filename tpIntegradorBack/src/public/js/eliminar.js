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
                <button class="boton-baja" type="submit">Eliminar Producto</button>
            </div>
        `;
    });
    contenedorProductos.innerHTML = htmlProductos;
    
    //BAJA LOGICA.
    
}
contenedorProductos.addEventListener("click", async (event) => {
            if(event.target.classList.contains("boton-baja")){
                let card = event.target.closest(".card-producto");
                let idProducto = card.querySelector("p").textContent.split(": ")[1];
                if (window.confirm("¿Quieres guardar los cambios?")) {
                // El usuario hizo clic en "Aceptar"
                // Llamada al endpoint de "dar baja lógica"
                    let respuesta = await fetch(`http://localhost:3000/api/products/eliminar/${idProducto}`, {
                        method: "PUT"
                    });

                    let texto = await respuesta.text();
                    console.log("RESPUESTA DEL BACKEND:", texto);
                    if (respuesta.ok) {
                        alert("Producto eliminado correctamente");
                    } else {
                        alert(data.message);
                    }
                    obtenerProductos();
                } 
                else {
                // El usuario hizo clic en "Cancelar"
                    alert("Operación cancelada");
                }
        }});
//Funcion para dar la baja logica de productos
function init() {
    obtenerProductos();
}

init();