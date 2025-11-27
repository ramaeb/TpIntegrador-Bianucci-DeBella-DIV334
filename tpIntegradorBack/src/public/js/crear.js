let getProduct_form = document.getElementById("crearProducto-form");
let listaProductos = document.getElementById("lista-productos");

//agarramos la informacion del formulario.


//luego del boton crear hacemos... :
getProduct_form.addEventListener("submit", async (event) => {
    
    //Validacion precio
    let precio = parseFloat(document.getElementById("precio").value);
    if (!precio || precio <= 0) {
        alert("El precio debe ser un número mayor a 0");
        return;
    }

    let nuevoProducto = { 
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: precio,
        categoria: document.getElementById("categoria").value,
        imagen_url: document.getElementById("imagen").value,
        estado: parseInt(document.getElementById("estado").value)
    };
    event.preventDefault();
    
    

    //Fetch para crear el producto:
    respuesta = await fetch("http://localhost:3000/api/products/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto)
    });
    data = await respuesta.json();
    console.log(data);
    if(precio == 0 || precio < 0){
        alert("El precio no puede ser 0 o menor a 0");
        return;
    }
    //Reseteamos formularios si esta todo OK.
    if(respuesta.ok){
        alert("Producto creado con exito");
        getProduct_form.reset();

    } else {
        alert(data.message);
    }

    
});
