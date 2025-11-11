import { cargarProductos } from "./views/listarProductos.js";

/*=====================
  VARIABLES DEL DOM
=======================*/
const menuToggle = document.getElementById("menu-toggle");
const menuLinks = document.getElementById("menu-links");

const secSobreNosotros = document.getElementById("sect-sobre-nosotros");
const secTituloCentral = document.getElementById("sect-titulo-central");
const secComoComprar = document.getElementById("sect-como-comprar");


/*=====================
  MENU RESPONSIVE
=======================*/
menuToggle.addEventListener("click", () => {menuLinks.classList.toggle("active");});

// Cerrar al hacer clic en un enlace
document.querySelectorAll("#menu-links a").forEach(link => {
  link.addEventListener("click", () => {menuLinks.classList.remove("active");});
});


/*===================
    SECCIONES
=====================*/
function tituloCentral() {
    const htmlTituloCentral = `
        <h1 id="titulo-central">
            Pixel<span id="span-titulo-disk">Disk</span>
        </h1>
        <p id="parrafo-titulo-central">Lo mejor para tus licencias.</p>
        <p id="parrafo-titulo-ingresa-nombre">Ingresa tu nombre para continuar</p>
        <div> 
            <form id="form-nombre">
                <input type="text" id="input-nombre" placeholder="Tu nombre" required>
                <button type="submit" id="boton-ingresar">Ingresar</button>
            </form>
        </div> 
    `;
    secTituloCentral.innerHTML = htmlTituloCentral;
    ingresarNombre();
}


function sobreNosotros() {
    const htmlQuienesSomos = `
        <section id="sobre-nosotros">
            <h2>¿Quiénes somos?</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quae at enim sint nisi, 
                quis minima odio cupiditate natus vitae veritatis quas dolore et itaque quaerat adipisci perspiciatis ea? Consectetur.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam molestias eius minus placeat. 
                Aut possimus voluptates eius eum atque placeat eaque nam perspiciatis. Laboriosam quaerat 
                reprehenderit deserunt soluta a iure?
            </p>
            <img src="" alt="Imagen sobre nosotros">
        </section>
    `;
    secSobreNosotros.innerHTML = htmlQuienesSomos;
}

function comoComprar() {
    const htmlComoComprar = `
        <h2 id="titulo-como-comprar">¿Como comprar?</h2>
            <span id="span-parrafo-como-comprar"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quae at enim sint nisi, quis minima odio cupiditate natus vitae veritatis quas dolore et itaque quaerat adipisci perspiciatis ea? Consectetur. 
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quaerat deleniti distinctio tempore ut delectus qui maxime necessitatibus magni officiis, vero nemo quisquam, quam eligendi ratione eos aperiam soluta illum!
            </p></span>
    `
    secComoComprar.innerHTML = htmlComoComprar;
}


/*===================
    FUNCIONES
=====================*/
function ingresarNombre() {
    const formNombre = document.getElementById("form-nombre");

    formNombre.addEventListener("submit", (e) => {

        e.preventDefault();

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
    tituloCentral();
    sobreNosotros();
    comoComprar();
}

init();

