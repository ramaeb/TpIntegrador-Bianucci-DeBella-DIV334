/*Variables DOM*/
const barraBusqueda = document.getElementById("input-nombre");
const botonIngresar = document.getElementById("boton-ingresar");
let main = document.getElementById("main");
let divNav = document.getElementById("div-ul-li");
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");
const divSaludoBienvenida = document.getElementById("div-saludo-bienvenida");
let nombreUsuarioGuardado = localStorage.getItem("nombreUsuario");

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

//Saca el html del inicio
function redireccionaLogin(){
    divNav.innerHTML = `<div id="div-ul-li">
                            <ul>
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="index.html">Sobre nosotros</a></li>
                                <li><a onclick="redireccionaLogin()" ><img src="img\avatar.png" alt=""></a></li>
                            </ul>
                        </div>`;
    main.innerHTML = `<section id="sect-login">
                        <h1 id="titulo-login">Bienvenido</h1>
                        <p id="parrafo-login">Ingresar usuario y contraseña</p>
                        <span id="input-central"><input type="text" id="input-nombre" placeholder="Usuario"></span>
                        <span id="input-central"><input type="text" id="input-nombre" placeholder="Contraseña"></span>
                        <span id="span-boton-login"><button id="boton-login" onclick="">Ingresar</button></span>
                    </section>`;
}

/*Funcion para ingresar el nombre*/
function ingresarNombre(){
    let nombreUsuario = barraBusqueda.value;
    //Faltaria un regex para validar nombres raros o con numeros etc.
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    if (nombreUsuario === "" || !regexNombre.test(nombreUsuario)) {
        alert("Por favor, ingresa un nombre válido (solo letras).");
    }else{
        alert("¡Bienvenido, " + nombreUsuario + "!");
        //Redirecciona a la pagina de productos (Vemos si hacemos un innerhtml y usamos la misma pagina)
        nombreUsuarioGuardado = localStorage.setItem("nombreUsuario", nombreUsuario);
        redireccionaLogin();
    }
}

//mostrarSaludoBienvenida();
