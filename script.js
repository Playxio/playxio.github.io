const titulo = document.querySelector(".right h1");
const subtitulo = document.querySelector(".right h2");
const texto = document.querySelector(".right p");
const botones = document.querySelectorAll(".buttons a");
const personaje = document.querySelector(".left img");
const logo = document.querySelector(".logo");

// Estado inicial
[titulo, subtitulo, texto, personaje, logo].forEach(el => {
    el.style.opacity = "0";
});

titulo.style.transform = "translateY(-50px)";
subtitulo.style.transform = "translateY(-40px)";
texto.style.transform = "translateY(-30px)";
logo.style.transform = "scale(.6)";
personaje.style.transform = "translateX(-120px)";

botones.forEach(btn=>{
    btn.style.opacity="0";
    btn.style.transform="translateY(30px)";
});

// Animaciones
setTimeout(()=>{
    personaje.style.transition=".8s";
    personaje.style.opacity="1";
    personaje.style.transform="translateX(0)";
},200);

setTimeout(()=>{
    logo.style.transition=".6s";
    logo.style.opacity="1";
    logo.style.transform="scale(1)";
},500);

setTimeout(()=>{
    titulo.style.transition=".7s";
    titulo.style.opacity="1";
    titulo.style.transform="translateY(0)";
},700);

setTimeout(()=>{
    subtitulo.style.transition=".7s";
    subtitulo.style.opacity="1";
    subtitulo.style.transform="translateY(0)";
},900);

setTimeout(()=>{
    texto.style.transition=".7s";
    texto.style.opacity="1";
    texto.style.transform="translateY(0)";
},1100);

botones.forEach((btn,index)=>{
    setTimeout(()=>{
        btn.style.transition=".5s";
        btn.style.opacity="1";
        btn.style.transform="translateY(0)";
    },1300+(index*150));
});

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach(el=>observer.observe(el));





window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    if (mobileMenu.classList.contains("open")) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";

    }

});

    const enlacesMenu = mobileMenu.querySelectorAll("a");

    enlacesMenu.forEach(enlace => {

        enlace.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });

}

/* ===========================
   NAVBAR SCROLL
=========================== */

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}