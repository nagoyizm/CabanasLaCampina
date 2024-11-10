/* CARRUSEL */
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const numImages = images.length / 2; // Número de imágenes originales
let currentIndex = 0;
updateIndicators(); // Asegúrate de que el primer indicador esté activo

// Crear los indicadores de imagen
const indicatorsContainer = document.getElementById('indicador');
indicatorsContainer.classList.add('indicators'); // Clase para el contenedor de indicadores

// Crear los círculos de indicadores
for (let i = 0; i < numImages; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator'); // Clase para cada indicador
    indicator.dataset.index = i; // Almacenar el índice de la imagen
    indicatorsContainer.appendChild(indicator); // Agregar el indicador al contenedor

    // Agregar evento de clic para navegar a la imagen correspondiente
    indicator.addEventListener('click', () => {
        currentIndex = i; // Actualizar el índice actual
        showImage(); // Mostrar la imagen correspondiente
        resetCarousel(); // Reiniciar el temporizador del carrusel
    });
}

// Función para mostrar la imagen y actualizar los indicadores
function showImage() {
    carousel.style.transform = `translateX(${-100 * currentIndex}vw)`;
    updateIndicators(); // Actualizar el estado de los indicadores
}

// Función para actualizar el estado de los indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex); // Agregar clase activa al indicador correspondiente
    });
}

let carouselInterval; // Variable para almacenar el intervalo del carrusel

function showNextImage() {
    carousel.classList.add('no-animation'); // Agregar clase para desactivar animaciones
    currentIndex++;
    if (currentIndex >= numImages) currentIndex = 0; // Reiniciar si se pasa del número de imágenes
    showImage(); // Mostrar la imagen correspondiente
}

// Cambiar de imagen cada 5 segundos
function startCarousel() {
    carouselInterval = setInterval(showNextImage, 5000); // Iniciar el intervalo del carrusel
}

function resetCarousel() {
    clearInterval(carouselInterval); // Limpiar el intervalo anterior
    startCarousel(); // Reiniciar el intervalo
}

// Iniciar el carrusel al cargar
startCarousel(); 


//FUNCION MENU HAMBURGUESA

/* menu de hamburguesa */
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('visible');
    menu.classList.toggle('hidden');
}




/* FUNCION PARA NAVBAR */
document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('#navbar a, #botonBanner, #botonPopup, #mobile-menu a'); // Selecciona todos los enlaces del navbar y el botón con ID

    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            console.log(`Clicked link: ${this.getAttribute('href')}`); // Verificar el clic

            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetElement = document.querySelector(targetId); // Selecciona el elemento destino
            
            // Verificar si el elemento de destino existe
            if (!targetElement) {
                console.error(`Elemento no encontrado: ${targetId}`);
                return; // Salir si el elemento no existe
            }
            
            const navbar = document.getElementById("navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 0; // Verifica si la navbar existe y obtiene su altura
            
            // Verificar si el h2 existe antes de calcular la posición
            const h2Element = targetElement.querySelector('h2'); // Selecciona el h2 dentro de la sección
            if (!h2Element) {
                console.error(`Elemento h2 no encontrado en: ${targetId}`);
                return; // Salir si el h2 no existe
            }
            
            // Calcula la posición del h2 ajustada por el alto de la navbar
            const targetPosition = h2Element.getBoundingClientRect().top + window.pageYOffset; 
            
            // Asegúrate de que el h2 esté visible en la parte superior del viewport
            const adjustedPosition = targetPosition - navbarHeight; // Ajusta la posición para que el h2 quede visible

            // Ajusta la posición de la sección para que quede debajo de la navbar
            const sectionTopPosition = targetPosition - navbarHeight; // Ajusta la posición de la sección

            const startPosition = window.pageYOffset; // Posición actual del scroll
            const distance = sectionTopPosition - startPosition; // Distancia a recorrer
            const duration = 800; // Duración de la animación en milisegundos
            let startTime = null;

            console.log(`Target Position: ${sectionTopPosition}, Start Position: ${startPosition}, Distance: ${distance}`);

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1); // Progreso de la animación
                const ease = easeInOutCubic(progress); // Función de easing
                window.scrollTo(0, startPosition + distance * ease); // Desplaza la ventana ajustada por el alto de la navbar
                if (timeElapsed < duration) requestAnimationFrame(animation); // Continúa la animación
            }

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // Nueva función de easing
            }

            requestAnimationFrame(animation); // Inicia la animación

            // Agregar un timeout para evitar el desplazamiento inmediato a la siguiente sección
            setTimeout(() => {
                resetCarousel(); // Reiniciar el temporizador del carrusel
            }, 800); // Asegúrate de que el tiempo coincida con la duración de la animación
        });
    });
});


/* FUNCION CIRCULO */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const radius = 280; // Aumenta el radio del círculo (ajusta según sea necesario)

// Actualiza las dimensiones del canvas
canvas.width = 610; // Ajusta el ancho del canvas
canvas.height = 610; // Ajusta la altura del canvas

const centerX = canvas.width / 2; // Recalcula el centro X
const centerY = canvas.height / 2; // Recalcula el centro Y
let startAngle = 0; // Ángulo inicial del dibujo
let endAngle = 0;   // Ángulo donde termina el dibujo
const speed = 0.1; // Velocidad del dibujo (ajustable)
let hasDrawn = false; // Estado para verificar si ya se ha dibujado

let lastScrollY = window.pageYOffset; // Variable para rastrear la última posición de desplazamiento

// Función para dibujar el círculo progresivamente
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada frame

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = "#E3D7BB"; // Color del contorno del círculo
    ctx.lineWidth = 40;        // Grosor del contorno
    ctx.stroke();

    // Incrementa el ángulo final para dar el efecto de dibujo
    endAngle += speed;

    // Si el círculo está completo, detén la animación
    if (endAngle >= 2 * Math.PI + 0.1) { // Ajusta el ángulo final un poco más allá de 2π
        endAngle = 2 * Math.PI + 0.1; // Asegúrate de que termine un poco más allá de 2π
        return; // Detener la función aquí
    }

    // Si el círculo no está completo, vuelve a llamar a draw()
    requestAnimationFrame(draw);
}

// Función para reiniciar el dibujo
function resetCircle() {
    startAngle = 0; // Reiniciar el ángulo inicial
    endAngle = 0;   // Reiniciar el ángulo final
    hasDrawn = false; // Reiniciar el estado de dibujo
}

// Inicia el dibujo
draw();

// Agregar evento de scroll para reiniciar el círculo
window.addEventListener('scroll', () => {
    const circleSection = canvas.getBoundingClientRect();
    const currentScrollY = window.pageYOffset; // Posición actual del scroll

    // Verificar si la sección del círculo está visible en la ventana
    if (circleSection.top < window.innerHeight && circleSection.bottom > 0) {
        // Solo dibujar si se está bajando y no se ha dibujado antes
        if (currentScrollY > lastScrollY && !hasDrawn) {
            resetCircle(); // Reiniciar el círculo si está visible
            draw(); // Iniciar el dibujo
            hasDrawn = true; // Marcar como dibujado
        }
    } else {
        // Si el círculo sale de la vista, permitir que se dibuje de nuevo al entrar
        if (circleSection.bottom < 0) {
            hasDrawn = false; // Permitir que se dibuje de nuevo al salir
        }
    }

    lastScrollY = currentScrollY; // Actualizar la última posición de desplazamiento
});


//funciones de manejo de mapa recinto

function isPointInside(area, px, py) {
    const { minX, maxX, minY, maxY } = area.bounds;
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
}

class Area {
    constructor(id, x1, y1, x2, y2, x3, y3, x4, y4) {
        this.id = id;
        this.coordinates = { x1, y1, x2, y2, x3, y3, x4, y4 };
        this.bounds = {
            minX: Math.min(x1, x2, x3, x4),
            maxX: Math.max(x1, x2, x3, x4),
            minY: Math.min(y1, y2, y3, y4),
            maxY: Math.max(y1, y2, y3, y4)
        };
    }

    getAdjustedCoordinates(scaleX, scaleY) {
        return {
            minX: this.bounds.minX * scaleX,
            maxX: this.bounds.maxX * scaleX,
            minY: this.bounds.minY * scaleY,
            maxY: this.bounds.maxY * scaleY,
        };
    }
}

const areas = [
    new Area(1, 955, 315, 1070, 340, 765, 535, 930, 565),
    new Area(1, 471, 506, 543, 569, 320, 608, 454, 654),
    new Area(5, 687, 308, 823, 309, 477, 505, 582, 560),
    new Area(2, 712, 597, 840, 597, 712, 728, 884, 695),
    new Area(3, 1216, 537, 1313, 496, 1216, 667, 1467, 559),
    new Area(3, 858, 308, 937, 308, 606, 600, 663, 627),
    new Area(3,543,616,650,616,417,801,649,802),
    new Area(3,428,312,560,312.395,491,415,491),
    new Area(3,351,444,394,444,319,518,373,516),
    new Area(4,393,186,569,149,426,307,621,273),
    new Area(6,192,332,416,361,162,418,390,419),
    new Area(7,337,274,380,263,361,319,410,310),
    new Area(7,611,224,673,207,639,263,700,249),
    new Area(8,150,564,250,564,175,688,275,675),
    new Area(9,248,267,334,283,248,325,334,325),
    new Area(9,1125,458,1239,413,1189,534,1300,492)
];


document.addEventListener('DOMContentLoaded', () => {
    const imgRecintoActual = document.querySelectorAll("#imgRecintoActual, #imgRecintoNuevo, #imgRecintoNuevo2");

    // Crear el pop-up
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.position = 'absolute';
    popup.style.display = 'none'; // Ocultar inicialmente
    document.body.appendChild(popup);

    imgRecintoActual.forEach(img => {
        img.addEventListener("click", (event) => {
            const rect = img.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const scaleX = rect.width / img.naturalWidth;
            const scaleY = rect.height / img.naturalHeight;

            imgRecintoActual[0].style.transition = 'opacity 0.3s';
            imgRecintoActual[2].style.transition = 'opacity 0.3s';
            imgRecintoActual[0].style.opacity = 0;
            imgRecintoActual[2].style.opacity = 1;

            setTimeout(() => {
                let foundArea = null;
                for (const area of areas) {
                    const adjustedBounds = area.getAdjustedCoordinates(scaleX, scaleY);
                    if (isPointInside({ bounds: adjustedBounds }, x, y)) {
                        foundArea = area;
                        break;
                    }
                }

                if (foundArea) {
                    imgRecintoActual[1].src = `./src/img/recintoEntero${foundArea.id}.png`;
                    console.log(foundArea.id);
                  
                    let nombreInstancias = "";
                    switch(foundArea.id){
                        case 1: nombreInstancias = "Cabañas 2 a 4 personas"; break;
                        case 2: nombreInstancias = "Recepcion"; break;
                        case 3: nombreInstancias = "Jardines y senderos"; break;
                        case 4: nombreInstancias = "Suites"; break;
                        case 5: nombreInstancias = "Cabañas 5 a 7 personas"; break;
                        case 6: nombreInstancias = "Piscina"; break;
                        case 7: nombreInstancias = "Quinchos"; break;
                        case 8: nombreInstancias = "Lavanderia"; break;
                        case 9: nombreInstancias = "Juegos de niños"; break;
                    }
                    let nombreHref=""
                     switch (nombreInstancias){
                        case "Cabañas 2 a 4 personas": nombreHref="cabanas";document.getElementById('selectCabanas').value='cabaña de 2 a 4 personas';break;
                        case "Suites": nombreHref="suites";break;
                        case "Cabañas 5 a 7 personas": nombreHref="cabanas";document.getElementById('selectCabanas').value='cabaña de 5 a 7 personas';break;
                     }

                    // Crear el contenido del pop-up
                    popup.innerHTML =`<div class="smooth-scroll relative flex flex-col items-center justify-center p-4 rounded-md bg-fondoCrema" >
                            <button class="absolute top-0 right-[2px] text-black close-popup" id="close-popup">[x]</button> 
                            <img class="m-4 w-64 rounded-xl" src="./src/img/fotosTarjetas/${foundArea.id}.jpg" alt="Imagen"><br>
                            <h4 class="font-whisper text-3xl">${nombreInstancias}</h4>
                            <p class="font-antic">descripcion de esta instalacion</p>
                            <a id="botonPopup" href="#${nombreHref}"><button class="px-4 m-4 text-fondoCrema bg-green-700 font-antic rounded-sm">Mas informacion</button</a>
                        </div>`;

                    // Ajustar la posición inicial del pop-up
                    popup.style.left = `${event.pageX}px`;
                    popup.style.top = `${event.pageY}px`;
                    popup.style.display = 'block';

                    // Añadir la clase de transición
                    popup.classList.add('fade-in');
                    
                    // Asegurarse de que offsetHeight está actualizado para la condición de ajuste hacia arriba
                    requestAnimationFrame(() => {
                        if ([2, 3, 8].includes(foundArea.id)) {
                            popup.style.top = `${event.pageY - popup.offsetHeight}px`;
                        }
                    });

                    imgRecintoActual[1].style.opacity = 1;
                    imgRecintoActual[2].style.opacity = 0;
                } else {
                    console.log("No area found");
                    imgRecintoActual[0].style.opacity = 1;
                    imgRecintoActual[1].style.opacity = 0;
                    imgRecintoActual[2].style.opacity = 0;
                }
            }, 300);
        });
    });

    // Cerrar el pop-up
    document.addEventListener('click', (event) => {
        if (event.target.id === 'close-popup' || !popup.contains(event.target)) {
            popup.classList.remove('fade-in'); // Remover la clase para la transición
            popup.style.display = 'none';
        }
    });
});

function mandarWSP(mensaje) {
    const url = `https://wa.me/56979004253?text=${mensaje}`; // El enlace que deseas abrir
    window.open(url, '_blank'); // Abre el enlace en una nueva ventana o pestaña
}

//funcion para modal para mandar arriendo




const botonEnvioSuites=document.getElementById('botonEnvioSuites');
// Temporariamente desactivar la funcionalidad del botón
botonEnvioSuites.addEventListener('click',(event)=>  
{   
    event.preventDefault();
   
    let adicional = document.getElementById('adicional').value || ''; // Guardar como texto vacío si no hay contenido
    const fechaInicio = new Date(document.getElementById('fechaInicio').value); // Obtener el valor del input
    const fechaTermino = new Date(document.getElementById('fechaTermino').value); // Obtener el valor del input
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const diaCheckIn = String(fechaInicio.getDate()).padStart(2, '0'); // Corregido: padStart debe aplicarse después de convertir a String
    const mesCheckIn = meses[fechaInicio.getMonth()]; // Obtener el nombre del mes
    const anioCheckin = fechaInicio.getFullYear();
    const diaCheckOut = String(fechaTermino.getDate()).padStart(2, '0'); // Corregido: padStart debe aplicarse después de convertir a String
    const mesCheckOut = meses[fechaTermino.getMonth()]; // Obtener el nombre del mes
    const anioCheckOut = fechaTermino.getFullYear();

    const inputs = ['selectSuites','cantidadPersonas', 'infantesSuite'];
    const [selectSuites, cantidadPersonas, infantes] = inputs.map(id => document.getElementById(id).value);
    console.log(selectSuites, fechaInicio, fechaTermino, cantidadPersonas, infantes);

    
    if (fechaInicio > fechaTermino) {
        alert("La fecha de inicio no puede ser después de la fecha de término.");
        return; // Salir de la función si la validación falla
    }
    if (fechaTermino < fechaInicio) {
        alert("La fecha de término no puede ser antes de la fecha de inicio.");
        return; // Salir de la función si la validación falla
    }

    if (cantidadPersonas === "0" || cantidadPersonas < 1) { // Verifica si es 0 o negativo
        alert("Tiene que especificar un número de personas."); // Alerta si el valor es 0 o negativo
        return; // Salir de la función si la validación falla
    }

    if (infantes !== "Sí" && infantes !== "No") {
        alert("Tiene que especificar si viene con infantes");
        return; // Salir de la función si la validación falla
    }
   

    let mensaje = `Hola!\nMe gustaría reservar una ${selectSuites} con check-in el ${diaCheckIn} de ${mesCheckIn} del ${anioCheckin} y check-out el ${diaCheckOut} de ${mesCheckOut} del ${anioCheckOut}.\nLa cantidad de personas es ${cantidadPersonas}.\n${infantes} contamos con infante acompañante.\n${adicional}`; // Corregido: espacio agregado antes de "desde"

    mensaje = encodeURIComponent(mensaje);
    mandarWSP(mensaje);
    document.getElementById('fechaInicio').value=''
    document.getElementById('fechaTermino').value=''
    // Reiniciar los valores de todos los inputs
    inputs.forEach(id => {
        document.getElementById(id).value = ''; // Establecer el valor de cada input a vacío
    });
    document.getElementById('adicional').value = ''; // Asegurarse de reiniciar el campo adicional
});



const botonEnvioCabanas=document.getElementById('botonEnvioCabanas');
botonEnvioCabanas.addEventListener('click',(event)=> 
{   event.preventDefault();

    
    let adicional = document.getElementById('adicionalC').value || ''; // Guardar como texto vacío si no hay contenido
    const fechaInicio = new Date(document.getElementById('fechaInicioC').value); // Obtener el valor del input
    const fechaTermino = new Date(document.getElementById('fechaTerminoC').value); // Obtener el valor del input
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const diaCheckIn = String(fechaInicio.getDate()).padStart(2, '0'); // Corregido: padStart debe aplicarse después de convertir a String
    const mesCheckIn = meses[fechaInicio.getMonth()]; // Obtener el nombre del mes
    const anioCheckin = fechaInicio.getFullYear();
    const diaCheckOut = String(fechaTermino.getDate()).padStart(2, '0'); // Corregido: padStart debe aplicarse después de convertir a String
    const mesCheckOut = meses[fechaTermino.getMonth()]; // Obtener el nombre del mes
    const anioCheckOut = fechaTermino.getFullYear();

    const inputs = ['selectCabanas','cantidadPersonasC', 'mascotaC'];
    const [selectCabanas, cantidadPersonas, mascotas] = inputs.map(id => document.getElementById(id).value);
    console.log(selectCabanas, fechaInicio, fechaTermino, cantidadPersonas, mascotas);


    if (fechaInicio > fechaTermino) {
        alert("La fecha de inicio no puede ser después de la fecha de término.");
        return; // Salir de la función si la validación falla
    }
    if (fechaTermino < fechaInicio) {
        alert("La fecha de término no puede ser antes de la fecha de inicio.");
        return; // Salir de la función si la validación falla
    }

    if (cantidadPersonas === "0" || cantidadPersonas < 1) { // Verifica si es 0 o negativo
        alert("Tiene que especificar un número de personas."); // Alerta si el valor es 0 o negativo
        return; // Salir de la función si la validación falla
    }

    if (mascotas !== "Si" && mascotas !== "No") {
        alert("Tiene que especificar si viene con mascotas");
        return; // Salir de la función si la validación falla
    }
   

    let mensaje = `Hola!\nMe gustaría reservar una ${selectCabanas} con check-in el ${diaCheckIn} de ${mesCheckIn} del ${anioCheckin} y check-out el ${diaCheckOut} de ${mesCheckOut} del ${anioCheckOut}.\nLa cantidad de personas es ${cantidadPersonas}.\n${mascotas} contamos con mascota.\n${adicional}`; // Corregido: espacio agregado antes de "desde"


    mensaje = encodeURIComponent(mensaje);
    mandarWSP(mensaje);
    
    document.getElementById('fechaInicioC').value=''
    document.getElementById('fechaTerminoC').value=''
    // Reiniciar los valores de todos los inputs
    inputs.forEach(id => {
        document.getElementById(id).value = ''; // Establecer el valor de cada input a vacío
    });
    document.getElementById('adicionalC').value = ''; // Asegurarse de reiniciar el campo adicional

});

const cabana1=`Cabaña familiar de 7 personas*: cuenta con una pieza matrimonial con baño privado en el primer piso, living-comedor con cocina y baño independiente. En el segundo piso abierto, se encuentran tres camas de una plaza y una habitación con dos camas de una plaza. La cabaña incluye:

    Ropa de cama, juego de toallas y rollo de papel higiénico(x2).
    Vajilla, refrigerador y microondas.
    Televisor con DirecTV.
    Quincho para asados y comedor en terraza.
    Estacionamiento privado.
    Acceso a juegos infantiles.
    Acceso a piscinas (solo verano hasta Semana Santa).
    Calefacción (solo invierno).

IMPORTANTE: La cabaña no cuenta con Wi-Fi ni artículos de aseo e higiene personal.
*Puede haber 1 infante extra si puede dormir en cama matrimonial con sus responsables. Opción de 1 futón para persona extra con valor adicional (consultar disponibilidad al momento de reservar)`

const cabana2=`Cabaña familiar para 2-4 personas*: cuenta con una pieza en el primer piso con cama matrimonial, living-comedor con cocina y baño independiente. En el segundo piso abierto, se encuentran dos camas de una plaza. La cabaña incluye:

    Ropa de cama, juego de toallas y rollo de papel higiénico(x1).
    Vajilla, refrigerador y microondas.
    Televisor con DirecTV.
    Quincho para asados y comedor en terraza.
    Estacionamiento privado.
    Acceso a juegos infantiles.
    Acceso a piscinas (solo verano hasta Semana Santa).
    Calefacción (solo invierno).

IMPORTANTE: La cabaña no cuenta con Wi-Fi ni artículos de aseo e higiene personal.
*Puede haber 1 infante extra si puede dormir en cama matrimonial con sus responsables.
Opción de 1 futón para persona extra con valor adicional (consultar disponibilidad al momento de reservar).`

const selectCabanas=document.getElementById('selectCabanas')
selectCabanas.addEventListener('change',()=>{
        if(selectCabanas.value === 'cabaña de 5 a 7 personas') {
            document.getElementById('imagenCabana1').src='./src/img/cabanas/5.jpg';
            document.getElementById('imagenCabana2').src='./src/img/cabanas/6.jpg';
            document.getElementById('imagenCabana3').src='./src/img/cabanas/7.jpg';
            document.getElementById('imagenCabana4').src='./src/img/cabanas/8.jpg';
            document.getElementById('parrafoCabanas').textContent=cabana1;
        }else{
            document.getElementById('imagenCabana1').src='./src/img/cabanas/1.jpg';
            document.getElementById('imagenCabana2').src='./src/img/cabanas/2.jpg';
            document.getElementById('imagenCabana3').src='./src/img/cabanas/3.jpg';
            document.getElementById('imagenCabana4').src='./src/img/cabanas/4.jpg';
            document.getElementById('parrafoCabanas').textContent=cabana2;

        }
    
    })

const suite1=`Suites para 1-2 personas* en 1er piso: cuentan con una cama de dos plazas, una pequeña cocinilla eléctrica para comidas menores (desayunos/onces), ducha en dormitorio frente a cama, y un baño privado. Posee vista al jardín (con opción de sillón cama extra por costo adicional y según disponibilidad). Incluye:

    Ropa de cama, juego de toallas, secador de cabello, rollo de papel higiénico(x1), jabón líquido(20ml), shampoo/acondicionador(20ml) y crema humectante(20ml).
    Vajilla, frigobar y televisor con DirecTV.
    Acceso a quinchos grandes y comedores comunitarios al exterior.
    Estacionamiento.
    Acceso a juegos infantiles.
    Acceso a piscinas (solo verano).

IMPORTANTE: Las suites no cuentan con Wi-Fi ni artículos de aseo e higiene personal. Se prohíbe la música después de las 21:00. No se aceptan mascotas en los suites.
*Puede haber 1 infante extra si puede dormir en cama matrimonial con sus responsables y/o cama inflable adicional.`

const suite2=`cuentan con una cama de dos plazas, una pequeña cocinilla eléctrica para comidas menores (desayunos/onces) y un baño con ducha (con opción de sillón cama extra por costo adicional y según disponibilidad) con vista al jardín y ventilador.
Incluyen:
    Ropa de cama, juego de toallas, secador de cabello, rollo de papel higiénico(x1), jabón líquido(20ml), shampoo/acondicionador(20ml) y crema humectante(20ml).
    Vajilla, frigobar y televisor con DirecTV.
    Acceso a quinchos grandes y comedores comunitarios al exterior.
    Estacionamiento.
    Acceso a juegos infantiles.
    Acceso a piscinas (solo verano hasta Semana Santa).

IMPORTANTE: Las suites no cuentan con Wi-Fi ni artículos de aseo e higiene personal. Se prohíbe la música después de las 21:00. No se aceptan mascotas en las suites. No conectar artículos de alta carga eléctrica.
*Puede haber 1 infante extra si puede dormir en cama matrimonial con sus responsables y/o cama inflable adicional.`

const suite3=`cuentan con una cama de dos plazas, una pequeña cocinilla eléctrica para comidas menores (desayunos/onces) y un baño con ducha (con opción de sillón cama extra por costo adicional y según disponibilidad) con vista hacia el interior.
Incluyen:
    Ropa de cama, juego de toallas, secador de cabello, rollo de papel higiénico(x1), jabón líquido(20ml), shampoo/acondicionador(20ml) y crema humectante(20ml).
    Vajilla, frigobar y televisor con DirecTV.
    Acceso a quinchos grandes y comedores comunitarios al exterior.
    Estacionamiento.
    Acceso a juegos infantiles.
    Acceso a piscinas (solo verano hasta Semana Santa).

IMPORTANTE: Las suites no cuentan con Wi-Fi ni artículos de aseo e higiene personal. Se prohíbe la música después de las 21:00. No se aceptan mascotas en las suites. No conectar artículos de alta carga eléctrica.
*Puede haber 1 infante extra si puede dormir en cama matrimonial con sus responsables y/o cama inflable adicional.`

const selectSuites=document.getElementById('selectSuites')
selectSuites.addEventListener('change',()=>{
        if(selectSuites.value === 'suite de primer piso') {
            document.getElementById('imagenSuite1').src='./src/img/suites/1.jpg';
            document.getElementById('imagenSuite2').src='./src/img/suites/2.jpg';
            document.getElementById('imagenSuite3').src='./src/img/suites/3.jpg';
            document.getElementById('imagenSuite4').src='./src/img/suites/4.jpg';
            document.getElementById('parrafoSuites').textContent=suite1;
        }else if(selectSuites.value==='suite de segundo piso deluxe'){
            document.getElementById('imagenSuite1').src='./src/img/suites/5.jpg';
            document.getElementById('imagenSuite2').src='./src/img/suites/6.jpg';
            document.getElementById('imagenSuite3').src='./src/img/suites/7.jpg';
            document.getElementById('imagenSuite4').src='./src/img/suites/8.jpg';
            document.getElementById('parrafoSuites').textContent=suite2;

        }else if(selectSuites.value==='suite de segundo piso standart'){
            document.getElementById('imagenSuite1').src='./src/img/suites/9.jpg';
            document.getElementById('imagenSuite2').src='./src/img/suites/10.jpg';
            document.getElementById('imagenSuite3').src='./src/img/suites/11.jpg';
            document.getElementById('imagenSuite4').src='./src/img/suites/12.jpg';
            document.getElementById('parrafoSuites').textContent=suite3;
        }
    
    })