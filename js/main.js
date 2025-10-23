/*Variables DOM*/
const barraBusqueda = document.getElementById("input-nombre");
const botonIngresar = document.getElementById("boton-ingresar");

/*Funcion para ingresar en nombre*/
function ingresarNombre(){
    let nombreUsuario = barraBusqueda.value;
    if(nombreUsuario == "" || nombreUsuario == ""){
        alert("Por favor, ingresa un nombre válido.");
    }
    else{
        alert("¡Bienvenido, " + nombreUsuario + "!");
    }

}