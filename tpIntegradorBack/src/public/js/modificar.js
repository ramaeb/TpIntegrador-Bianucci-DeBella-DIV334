let getProduct_form = document.getElementById("getProduct-form");
let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorModificarProducto = document.getElementById("modificar-producto");
let url = "http://localhost:3000/api/products";


getProduct_form.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(formData)
    let data = Object.fromEntries(formData.entries());
    console.log(data)

    let idProd = data.idProd;

    try {
        let respuesta = await fetch(`${url}/${idProd}`)
    
        let datos = await respuesta.json();

        let producto = datos.payload[0];

        mostrarProducto(producto);

    } catch (error) {
        console.log(error);
    }
    
});

function mostrarProducto(producto) {
    let htmlProducto = `
            <div class="card-producto">
                <img src="${producto.imagen_url}" alt="${producto.nombre}">
                <p> Id: ${producto.id} </p>
                <h5> Nombre: ${producto.nombre} </h5>
                <p><strong>Precio: ${producto.precio}</strong></p>
                <button class="boton-modificar" id="updateProduct_button">Modificar Producto</button>
            </div> 
        `;

        contenedorProductos.innerHTML = htmlProducto;

        let botonModificar = document.getElementById("updateProduct_button");

        botonModificar.addEventListener("click", () => {
            formularioModificarProducto(event, producto);
        });
}

function formularioModificarProducto(event, producto){
    event.stopPropagation();
    
    let html_modificarProducto= `
        <div id="div-formulario-modificar"> 
            <form id="formulario-modificar">

                <input type="hidden" name="id" id="idProd" value="${producto.id}" required>

                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" value="${producto.nombre}" required>

                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" name="descripcion" rows="3" required>${producto.descripcion}</textarea>

                <label for="precio">Precio</label>
                <input type="number" id="precio" name="precio" value="${producto.precio}" required>

                <label for="categoria">Categoría</label>
                <input type="text" id="categoria" name="categoria" value="${producto.categoria}" required>

                <label for="imagen_url">URL de la imagen</label>
                <input type="text" id="imagen_url" name="imagen_url" value="${producto.imagen_url}" required>

                <select id="estado" name="estado" required>
                    <option value="1" ${producto.estado === 1 ? "selected" : ""}>Activo</option>
                    <option value="0" ${producto.estado === 0 ? "selected" : ""}>Inactivo</option>
                </select>

                <button class="boton-modificar" type="submit">Guardar cambios</button>
            </form>
        </div>
    `
    contenedorModificarProducto.innerHTML = html_modificarProducto;

    let formularioModificar = document.getElementById("formulario-modificar");

    formularioModificar.addEventListener( "submit", async event => {
        
        event.preventDefault();
        
        let formData = new FormData(event.target);
        let data = Object.fromEntries(formData.entries());
        
        try {
            let respuesta = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            let resultado = await respuesta.json();

            if(resultado.ok)
            {
                contenedorProductos.innerHTML = "";
                contenedorModificarProducto.innerHTML = "";
            }else{
                console.error("Error: ", respuesta.message);
            }

        } catch (error){

            console.error("Error al enviar los datos:", error)
        }

    })
}