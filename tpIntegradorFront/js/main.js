import { cargarProductos } from "./views/listarProductos.js";

/*=====================
  VARIABLES DEL DOM
=======================*/
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const formularioNombre = document.getElementById("form-nombre");
const main = document.querySelector("main");
const botonLogin = document.getElementById("boton-login");

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
//Formulario para ingresar el nombre y mostrar los productos
formularioNombre.addEventListener("submit", (event) => {

    event.preventDefault();

    const nombreUsuario = document.getElementById("input-nombre").value.trim();

    // Regex para permitir solo letras (incluye acentos y ñ)
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

    // Validación
    if (nombreUsuario === "" || !regexNombre.test(nombreUsuario)) {
        alert("Por favor, ingresa un nombre válido (solo letras).");
        return;
    }

    // Guardar en LocalStorage
    localStorage.setItem("nombreUsuario", nombreUsuario);

    // Redireccionar o cargar productos
    cargarProductos();
});


function logueoAdmin(){
    //Tomo los valores de los inputs
    const usuario = document.getElementById("input-usuario").value;
    const password = document.getElementById("input-password").value;
    fetch('http://localhost:3000/login', {
        method: 'POST',
        
    })
    console.log(usuario, password);
}
//Logueo temporal de admin
function redireccionaLogin() {
     main.innerHTML = `
        <section id="sect-login">
            <h1 id="titulo-login">Bienvenido</h1>
            <p id="parrafo-login">Ingresar usuario y contraseña</p>

            <form id="form-login">
                <div class="input-login">
                    <input type="text" id="input-usuario" placeholder="Usuario" required>
                </div>
                <div class="input-login">
                    <input type="password" id="input-password" placeholder="Contraseña" required>
                </div>
                <div class="boton-login">
                    <button type="submit" id="boton-login">Ingresar</button>
                </div>
            </form>
        </section>
    `;
    document.getElementById("form-login").addEventListener("submit", logueoAdmin);
}

// Permitir que los botones HTML pueda llamar funciones.
window.redireccionaLogin = redireccionaLogin;
