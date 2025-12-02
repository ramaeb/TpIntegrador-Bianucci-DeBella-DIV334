sessionStorage.removeItem("nombreUsuario");
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

    const nombreUsuario = document.getElementById("input-nombre").value;
    
    // Regex para permitir solo letras (incluye acentos y ñ)
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;

    // Validación: debe tener al menos un caracter y pasar el regex
    if (!nombreUsuario || !regexNombre.test(nombreUsuario)) {
        alert("Por favor, ingresa un nombre válido (solo letras).");
        return;
    }

    // Guardar en sessionStorage
    sessionStorage.setItem("nombreUsuario", nombreUsuario);
    
    // Redirigir a la página de productos
    window.location.href = "listarProductos.html";
});


async function logueoAdmin(){
    //Tomo los valores de los inputs
    const usuario = document.getElementById("input-usuario").value;
    const password = document.getElementById("input-password").value;
    console.log("USUARIO ENVIADO -->", usuario);
    console.log("PASSWORD ENVIADO -->", password);

    const respuesta = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({usuario, password}),
    })
    
    const data = await respuesta.json();
    if (respuesta.ok){
        alert("Login exitoso. Bienvenido " + data.user);
        
        //Redireccionar al dashboard
        window.location.href = "http://localhost:3000/dashboard/index";

    }else{
        alert("Error: " + data.message);
    }
    console.log(data);
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
                    <button type="button" id="boton-login">Ingresar</button>
                </div>
            </form>
        </section>
    `;
    document.getElementById("boton-login").addEventListener("click", logueoAdmin);
}

// Permitir que los botones HTML pueda llamar funciones.
window.redireccionaLogin = redireccionaLogin;
