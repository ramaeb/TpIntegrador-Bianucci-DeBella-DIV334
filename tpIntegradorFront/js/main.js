import { cargarProductos } from "./views/listarProductos.js";

/*=====================
  VARIABLES DEL DOM
=======================*/
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const formularioNombre = document.getElementById("form-nombre");
const main = document.querySelector("main");

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


//Logueo temporal de admin
function redireccionaLogin() {
     main.innerHTML = `
        <section id="sect-login">
            <h1 id="titulo-login">Bienvenido</h1>
            <p id="parrafo-login">Ingresar usuario y contraseña</p>

            <form id="form-login" onsubmit="logueoAdmin(); return false;">
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
}

//Funcion temporal para logueo admin (falta completar logica de usuario y contraseña) muestra el CRUD luego de loguearse.
function logueoAdmin(){
    main.innerHTML = `<section id="sect-bienvenida">
                        <h1 id="titulo-bienvenida">Bienvenido ADMIN !</h1>
                    </section>
            <section id="sect-crud">
            <ul id="listado-crud">
                <a href="index.html">
                    <li class="links-header"><span>GET</span></li>
                </a>
                <a href="get.html">
                    <li class="links-header"><span>Get : id</span></li>
                </a>
                <a href="post.html">
                    <li class="links-header"><span>POST</span></li>
                </a>
                <a href="put.html">
                    <li class="links-header"><span>PUT</span></li>
                </a>
                <a href="delete.html">
                    <li class="links-header"><span>DELETE</span></li>
                </a>
            </ul>

    </header>`;

}


// Permitir que los botones HTML pueda llamar funciones.
window.redireccionaLogin = redireccionaLogin;
window.ingresarNombre = ingresarNombre;
