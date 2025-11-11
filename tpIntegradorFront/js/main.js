import { cargarProductos } from "./views/listarProductos.js";

/*=====================
  VARIABLES DEL DOM
=======================*/
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const formNombre = document.getElementById("form-nombre");

/*=====================
  MENU RESPONSIVE
=======================*/
menuToggle.addEventListener("click", () => {menuLinks.classList.toggle("active");});

// Cerrar al hacer clic en un enlace
document.querySelectorAll("#menu-links a").forEach(link => {
  link.addEventListener("click", () => {menuLinks.classList.remove("active");});
});

/*===================
    FUNCIONES
=====================*/
function ingresarNombre() {
    formNombre.addEventListener("submit", (event) => {

        event.preventDefault();

        const nombreUsuario = document.getElementById("input-nombre").value.trim();
        
        if (nombreUsuario === "") {
            alert("Por favor, ingresa un nombre válido.");
            return;
        }

        localStorage.setItem("nombreUsuario", nombreUsuario);
        
        cargarProductos(); 
    });
}
 

/*===================
    FUNCION INITs
=====================*/

function init(){
    ingresarNombre();
}

init();

