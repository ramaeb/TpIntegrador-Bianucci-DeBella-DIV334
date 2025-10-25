/*Variables DOM*/
const barraBusqueda = document.getElementById("input-nombre");
const botonIngresar = document.getElementById("boton-ingresar");

const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const divSaludoBienvenida = document.getElementById("div-saludo-bienvenida");
const nombreUsuarioGuardado = localStorage.getItem("nombreUsuario");

//Responsive para cerrar y abrir el menu navegacion desde el celu...
menuToggle.addEventListener("click", () => {menuLinks.classList.toggle("active");});

// Cerrar al hacer clic en un enlace
document.querySelectorAll("#menu-links a").forEach(link => {
  link.addEventListener("click", () => {menuLinks.classList.remove("active");});
});


function mostrarSaludoBienvenida(){
    if(nombreUsuarioGuardado){
        divSaludoBienvenida.innerHTML = `<p>¡Bienvenido, ${nombreUsuarioGuardado}!</p>`;
    }
}




/*Funcion para ingresar en nombre*/
function ingresarNombre(){
    let nombreUsuario = barraBusqueda.value;
    //Faltaria un regex para validar nombres raros o con numeros etc.
    if(nombreUsuario == "" || nombreUsuario == ""){
        alert("Por favor, ingresa un nombre válido."); 
    }
    else{
        alert("¡Bienvenido, " + nombreUsuario + "!");
        //Redirecciona a la pagina de productos (Vemos si hacemos un innerhtml y usamos la misma pagina)
        window.location.href = "productos.html";
        nombreUsuarioGuardado = localStorage.setItem("nombreUsuario", nombreUsuario);
    }

}
mostrarSaludoBienvenida();
