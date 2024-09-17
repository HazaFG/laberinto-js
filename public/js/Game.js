const my_canvas = document.getElementById('my_canvas');
const ctx = my_canvas.getContext('2d');

// Modo pantalla completa
const pantallaCompleta = document.getElementById('pantalla_completa');
pantallaCompleta.addEventListener('click', function () {
    if (my_canvas.requestFullscreen) {
        my_canvas.requestFullscreen();
    } else if (my_canvas.mozRequestFullScreen) { // Firefox
        my_canvas.mozRequestFullScreen();
    } else if (my_canvas.webkitRequestFullscreen) { // Chrome, Safari y Opera
        my_canvas.webkitRequestFullscreen();
    } else if (my_canvas.msRequestFullscreen) { // IE/Edge
        my_canvas.msRequestFullscreen();
    }
});

// Redimensionar el canvas al tamaño de la pantalla
function ajustarCanvas() {
    my_canvas.width = 700;
    my_canvas.height = 400;
}

document.addEventListener('fullscreenchange', ajustarCanvas);
document.addEventListener('webkitfullscreenchange', ajustarCanvas);
document.addEventListener('mozfullscreenchange', ajustarCanvas);
document.addEventListener('MSFullscreenChange', ajustarCanvas);

function getRandomColor() {
    var trans = '0.5'; // 50% transparency
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
        color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')'; // add the transparency
    return color;
}

let teclasPresionadas = {
    left: false,
    up: false,
    right: false,
    down: false,
    disparo: false,
};

let score = 0;
let x = 0;
let y = 0;
var pausa = false;
let vidasNpc = 7;
let vidas = 40;

let direccionDisparo = true;

let disparoActivo = false; // Variable para manejar el estado de disparo
// let disparo = "";
let municion = 80;

let direccion = "";
const bloque = 32;

//11
let roca = new Image();
roca.src = '../assets/pared.png';

//11
let p95 = new Image();
p95.src = '../assets/95.png';

//11
let piedra = new Image();
piedra.src = '../assets/80.png';

//11
let piedrita = new Image();
piedrita.src = '../assets/90.png';

//92
let tarjeta1 = new Image();
tarjeta1.src = '../assets/tarjeta1.png';

//92
let arbusto = new Image();
arbusto.src = '../assets/92.png';

let alertaMostrada = false; // Variable global


//MAQUINAS DE CRACK

// 54
let maquina1 = new Image();
maquina1.src = '../assets/33.png';
// 55
let maquina2 = new Image();
maquina2.src = '../assets/31.png';
// 56
let maquina3 = new Image();
maquina3.src = '../assets/32.png';
// 57
let maquina4 = new Image();
maquina4.src = '../assets/33.png';


//10
let suelo = new Image();
suelo.src = '../assets/suelo.png';

//12
let paredIzq = new Image();
paredIzq.src = '../assets/paredIzq.png';

//13
let paredDer = new Image();
paredDer.src = '../assets/paredDer.png';

//14
let paredInf = new Image();
paredInf.src = '../assets/paredInf.png';

//15
let paredSup = new Image();
paredSup.src = '../assets/paredSup.png';

//16
let esqInfIzq = new Image();
esqInfIzq.src = '../assets/esqInfizq.png';

//18
let esqInfDer = new Image();
esqInfDer.src = '../assets/esqInfDer.png';

//19
let esqSupIzq = new Image();
esqSupIzq.src = '../assets/esqSupIzq.png';

//20
let esqSupDer = new Image();
esqSupDer.src = '../assets/esqSupDer.png';

//50
let esq1 = new Image();
esq1.src = '../assets/esq1.png';

//51
let esq2 = new Image();
esq2.src = '../assets/esq2.png';

//52
let esq3 = new Image();
esq3.src = '../assets/esq3.png';

//53
let esq4 = new Image();
esq4.src = '../assets/esq4.png';

//60
let p60 = new Image();
p60.src = '../assets/piso.png';

//60
let p61 = new Image();
p61.src = '../assets/61.png';

let p98 = new Image();
p98.src = '../assets/98.png';

let p97 = new Image();
p97.src = '../assets/98.png';

//60
let tarjeta2 = new Image();
tarjeta2.src = '../assets/tarjeta2.png';

//60
let tarjeta3 = new Image();
tarjeta3.src = '../assets/tarjeta3.png';

//60
let p62 = new Image();
p62.src = '../assets/62.png';

//63
let p63 = new Image();
p63.src = '../assets/63.png';

// PAREDES DE COLOR NEGRO

//21
let p21 = new Image();
p21.src = '../assets/21.png';

//22
let p22 = new Image();
p22.src = '../assets/22.png';

//23
let p23 = new Image();
p23.src = '../assets/23.png';

//24
let p24 = new Image();
p24.src = '../assets/24.png';

//25
let p25 = new Image();
p25.src = '../assets/25.png';

//26
let p26 = new Image();
p26.src = '../assets/26.png';

//27
let p27 = new Image();
p27.src = '../assets/27.png';

//28
let p28 = new Image();
p28.src = '../assets/28.png';

// //29
let p29 = new Image();
p29.src = '../assets/29.png';


//30
let p30 = new Image();
p30.src = '../assets/30.png';

//Pistola
let pistola1 = new Image();
pistola1.src = '../assets/gun.png';

//Pistola2
let pistola2 = new Image();
pistola2.src = '../assets/gun1.png';


//MESA DE CRACK

//31
let p31 = new Image();
p31.src = '../assets/31.png';

//32
let p32 = new Image();
p32.src = '../assets/32.png';

//31
let p33 = new Image();
p33.src = '../assets/33.png';

//32
let p34 = new Image();
p34.src = '../assets/34.png';

//32
let p35 = new Image();
p35.src = '../assets/35.png';

//32
let p36 = new Image();
p36.src = '../assets/36.png';

//32
let p37 = new Image();
p37.src = '../assets/37.png';

//38
let p38 = new Image();
p38.src = '../assets/38.png';

//38
let p39 = new Image();
p39.src = '../assets/39.png';

//38
let p40 = new Image();
p40.src = '../assets/40.png';

let p41 = new Image();
p41.src = '../assets/41.png';

//32
let p42 = new Image();
p42.src = '../assets/42.png';

//32
let p43 = new Image();
p43.src = '../assets/43.png';

//38
let p44 = new Image();
p44.src = '../assets/44.png';

//38
let p45 = new Image();
p45.src = '../assets/45.png';

//38
let p46 = new Image();
p46.src = '../assets/46.png';

//38
let p47 = new Image();
p47.src = '../assets/47.png';

//38
let p48 = new Image();
p48.src = '../assets/48.png';


//80 ARBOLES
let p81 = new Image();
p81.src = '../assets/81.png';
//80 ARBOLES
let p82 = new Image();
p82.src = '../assets/82.png';
//80 ARBOLES
let p83 = new Image();
p83.src = '../assets/83.png';
//80 ARBOLES
let p84 = new Image();
p84.src = '../assets/84.png';
//80 ARBOLES
let p85 = new Image();
p85.src = '../assets/85.png';
//80 ARBOLES
let p86 = new Image();
p86.src = '../assets/86.png';
//80 ARBOLES
let p87 = new Image();
p87.src = '../assets/87.png';
//80 ARBOLES
let p88 = new Image();
p88.src = '../assets/88.png';
//80 ARBOLES
let p89 = new Image();
p89.src = '../assets/89.png';

//CONTROL DE LAS TARJETAS

let removerTarjeta1 = false;
let removerTarjeta2 = false;
let removerTarjeta3 = false;

const mapa = [
    [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 11, 11, 11, 11, 11, 11, 10, 10, ],
    [11, 11, 11, 11, 10, 10, 10, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 81, 82, 83, 10, ],
    [81, 82, 83, 11, 12, 10, 13, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 84, 85, 86, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 87, 88, 89, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 31, 32, 11, 11, 11, 11, 11, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 11, 80, 11, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 57, 34, 80, 81, 82, 83, 11, 11, ],
    [11, 81, 82, 83, 12, 10, 13, 11, 11, 11, 80, 10, 11, 11, 11, 12, 10, 51, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 18, 80, 84, 85, 86, 11, 11, ],
    [90, 84, 85, 86, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 80, 92, 95, 11, 80, 11, 95, 11, 95, 11, 11, 90, 80, 11, 11, 11, 11, 80, 87, 88, 89, 11, 11, ],
    [11, 87, 88, 89, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 81, 82, 83, 81, 82, 83, 11, 80, 11, 11, 11, 11, 11, 80, 80, 80, 80, 80, 11, 11, 11, 11, 11, ],
    [11, 11, 80, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 84, 85, 86, 84, 85, 86, 11, 80, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 87, 88, 89, 87, 88, 89, 11, 11, 11, 92, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, ],
    [90, 11, 92, 92, 12, 10, 50, 15, 15, 15, 15, 10, 15, 15, 15, 53, 10, 50, 15, 15, 15, 15, 15, 15, 15, 20, 92, 90, 12, 10, 51, 14, 14, 14, 14, 14, 14, 52, 51, 18, 11, ],
    [11, 11, 11, 92, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 11, 12, 10, 13, 80, 92, 92, 95, 11, 11, 12, 13, 11, 11, ],
    [11, 11, 90, 92, 12, 10, 51, 14, 14, 14, 14, 14, 14, 14, 14, 14, 52, 10, 51, 14, 14, 14, 14, 52, 10, 13, 92, 11, 12, 10, 13, 11, 81, 82, 83, 11, 92, 12, 13, 11, 11, ],
    [11, 11, 11, 90, 12, 10, 13, 92, 92, 92, 92, 92, 92, 92, 92, 11, 12, 10, 13, 11, 92, 11, 95, 12, 10, 13, 80, 92, 12, 10, 13, 11, 84, 85, 86, 92, 90, 12, 13, 11, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 92, 11, 81, 82, 83, 81, 82, 83, 11, 12, 10, 13, 81, 82, 83, 80, 12, 10, 13, 80, 11, 12, 10, 50, 20, 87, 88, 89, 92, 11, 12, 13, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 92, 11, 84, 85, 86, 84, 85, 86, 11, 12, 10, 13, 84, 85, 86, 80, 12, 10, 13, 11, 92, 12, 10, 51, 18, 81, 82, 83, 11, 90, 12, 13, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 92, 11, 87, 88, 89, 87, 88, 89, 11, 12, 10, 13, 87, 88, 89, 80, 12, 10, 13, 92, 90, 12, 10, 13, 11, 84, 85, 86, 92, 11, 12, 13, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 92, 80, 11, 80, 80, 11, 80, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 13, 11, 87, 88, 89, 90, 11, 12, 13, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 92, 11, 11, 19, 15, 15, 15, 15, 15, 53, 10, 13, 81, 82, 83, 11, 12, 10, 50, 15, 15, 53, 10, 13, 11, 81, 82, 83, 11, 92, 55, 32, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 92, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 13, 84, 85, 86, 11, 12, 10, 10, 10, 10, 10, 10, 13, 11, 84, 85, 86, 92, 11, 33, 34, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 92, 11, 11, 12, 10, 51, 14, 14, 14, 52, 10, 13, 87, 88, 89, 11, 16, 14, 14, 14, 14, 14, 14, 18, 11, 87, 88, 89, 11, 11, 16, 18, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 92, 11, 11, 16, 10, 18, 11, 11, 11, 12, 10, 13, 11, 11, 92, 11, 21, 22, 22, 22, 22, 22, 22, 23, 11, 92, 92, 11, 11, 11, 11, 11, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 92, 21, 22, 22, 63, 22, 22, 22, 23, 12, 10, 13, 80, 95, 80, 80, 27, 28, 28, 28, 28, 28, 28, 29, 80, 11, 80, 90, 11, 11, 11, 11, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 92, 24, 25, 25, 63, 25, 25, 25, 26, 12, 10, 50, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 92, 24, 25, 25, 62, 98, 61, 25, 26, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 92, 27, 28, 28, 28, 28, 28, 28, 29, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 52, 10, 13, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 92, 90, 90, 90, 90, 11, 11, 90, 80, 80, 80, 80, 80, 80, 90, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 92, 81, 82, 83, 11, 11, 11, 11, 80, 80, 80, 80, 80, 80, 90, 11, 95, 11, 81, 82, 83, 81, 82, 83, 81, 82, 83, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 92, 84, 85, 86, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, 11, 84, 85, 86, 84, 85, 86, 84, 85, 86, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 21, 22, 22, 53, 10, 13, 92, 87, 88, 89, 80, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 95, 87, 88, 89, 87, 88, 89, 87, 88, 89, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 24, 70, 98, 60, 10, 13, 80, 81, 82, 83, 11, 12, 10, 51, 14, 14, 14, 14, 14, 52, 10, 13, 11, 11, 95, 80, 80, 80, 80, 80, 80, 80, 80, 80, 11, 11, 12, 10, 13, 11, ],
    [11, 27, 28, 29, 12, 10, 13, 11, 84, 85, 86, 11, 12, 10, 13, 95, 90, 90, 80, 95, 12, 10, 50, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 31, 32, 12, 10, 13, 11, ],
    [11, 81, 82, 83, 12, 10, 13, 11, 87, 88, 89, 80, 12, 10, 13, 11, 81, 82, 83, 80, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 54, 34, 16, 10, 18, 11, ],
    [11, 84, 85, 86, 12, 10, 13, 80, 11, 11, 11, 11, 12, 10, 13, 11, 84, 85, 86, 95, 12, 10, 51, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 18, 11, 11, 10, 11, 11, ],
    [11, 87, 88, 89, 12, 10, 13, 11, 11, 80, 11, 11, 12, 10, 13, 11, 87, 88, 89, 80, 12, 10, 13, 80, 95, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 11, 21, 22, 63, 22, 23, ],
    [11, 81, 82, 83, 12, 10, 50, 15, 15, 15, 15, 15, 53, 10, 13, 11, 95, 11, 95, 11, 12, 10, 13, 11, 95, 81, 82, 83, 81, 82, 83, 81, 82, 83, 95, 11, 24, 25, 63, 25, 26, ],
    [80, 84, 85, 86, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 19, 15, 15, 15, 53, 10, 13, 95, 11, 84, 85, 86, 84, 85, 86, 84, 85, 86, 11, 11, 24, 25, 62, 99, 26, ],
    [47, 87, 88, 89, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 17, 48, 12, 31, 56, 10, 10, 10, 13, 11, 95, 87, 88, 89, 87, 88, 89, 87, 88, 89, 11, 11, 27, 28, 28, 28, 29, ],
    [36, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 39, 40, 41, 12, 33, 34, 14, 14, 14, 18, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [42, 43, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 45, 46, 16, 14, 18, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],

];

class Proyectil {
    constructor(x, y, direccionDisparo) {
        this.x = x;  // Posición inicial x
        this.y = y;  // Posición inicial y
        this.direccionDisparo = direccionDisparo; // Dirección del disparo (false = derecha, true = izquierda)
        this.radio = 3; // Tamaño del proyectil
        this.color = 'blue';
        this.velocidad = 5; // Velocidad del proyectil
    }

    mover() {
        if (this.direccionDisparo) {
            this.x -= this.velocidad; // Mueve el proyectil hacia la izquierda
        } else {
            this.x += this.velocidad; // Mueve el proyectil hacia la derecha
        }
    }


    dibujar(ctx, xOffset, yOffset) {
        ctx.beginPath();
        // Cambia el color dependiendo de si es un proyectil del NPC
        if (this.esDelNpc) {
            ctx.fillStyle = "red"; 
        } else {
            ctx.fillStyle = "blue"; 
        }
        ctx.arc(this.x - xOffset, this.y - yOffset, this.radio, 0, Math.PI * 2); // Ajusta la posición según el offset
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Npc {
    constructor(x, y, w, h, vidas) {
        this.x = x;  // Posición en X
        this.y = y;  // Posición en Y
        this.w = w;  // Ancho del NPC
        this.h = h;  // Altura del NPC
        this.frameIndex = 0;
        this.numFrames = 8;
        this.tickCount = 2;
        this.ticksPerFrame = 15;
        this.moveSpeed = 0.2;  // Velocidad de movimiento hacia la izquierda
        this.proyectiles = []; // Lista de proyectiles disparados por el NPC
        this.vidas = vidas;
    }

    updateAnimation() {
        this.colisionPared();
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            this.frameIndex += 1;

            if (this.frameIndex >= this.numFrames) {
                this.frameIndex = 0;
            }
        }

        // Verificar si el NPC tiene vidas
        if (this.vidas > 0) {
            // Mueve el NPC hacia la izquierda lentamente
            this.x -= this.moveSpeed;

            // Reubica el NPC si se sale del área visible
            if(this.x <= 100) {
                this.x = 900;
            }
        } else {
            // Reubicar el NPC a una nueva posición cuando se quede sin vidas
            this.reubicar();
        }

        // Mueve y actualiza todos los proyectiles
        this.proyectiles.forEach(proyectil => proyectil.mover());
    }

    reubicar() {
        // Establece una nueva posición aleatoria o predeterminada
        this.x = Math.random() * (my_canvas.width - this.w);
        this.y = Math.random() * (my_canvas.height - this.h);

        // Reinicia las vidas o realiza cualquier otra configuración necesaria
        this.vidas = 3; // Por ejemplo, reinicia las vidas del NPC

        // Puedes ajustar la velocidad o el comportamiento si es necesario
        this.moveSpeed = 0.2; // Reinicia la velocidad de movimiento
    }

    colisionPared(row, col) {
        if (mapa[col] && mapa[row][col] === 10) {
            console.log('npc gay')
        }
    }

    draw(ctx, npcSprite, xOffset, yOffset) {
        const frameWidth = npcSprite.width / this.numFrames;
        const frameHeight = npcSprite.height;
    
        // Calculamos la posición ajustada en base al desplazamiento del mapa
        const npcX = this.x - xOffset;
        const npcY = this.y - yOffset;
    
        // Verificar si el NPC está dentro del área visible antes de dibujarlo
        if (npcX + this.w > 0 && npcX < 500 && npcY + this.h > 0 && npcY < 500) {
            // Dibuja el NPC solo si está dentro del área visible del canvas
            ctx.drawImage(
                npcSprite,
                this.frameIndex * frameWidth, 0,
                frameWidth, frameHeight,
                npcX, npcY,
                this.w, this.h
            );
        }
    
        // Dibuja todos los proyectiles
        this.proyectiles.forEach(proyectil => proyectil.dibujar(ctx, xOffset, yOffset));
    }
    

    disparar() {
        // Crea un nuevo proyectil y lo agrega a la lista de proyectiles
        const nuevoProyectil = new Proyectil(this.x + this.w / 2, this.y + this.h / 2, true); // Dispara a la derecha
        this.proyectiles.push(nuevoProyectil);
    }

    reproducirSonido() {
        if (sonidoDisparo) {
            sonidoDisparo.play(); // Reproduce el sonido al disparar
        }
    }
}


class Rectangulo {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.frameIndex = 0;
        this.numFrames = 8;
        this.tickCount = 2;
        this.ticksPerFrame = 15;
        this.proyectiles = []; // Array para almacenar los proyectiles
        this.municion = 80; // Ahora es una propiedad de la instancia
        this.direccionDisparo = false; // Dirección de disparo (false = derecha, true = izquierda)
    }

    updateAnimation() {
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            this.frameIndex += 1;

            if (this.frameIndex >= this.numFrames) {
                this.frameIndex = 0;
            }
        }
        
    }

    draw(ctx, img, xOffset, yOffset) {
        const frameWidth = img.width / this.numFrames;
        const frameHeight = img.height;

        ctx.drawImage(
            img,
            this.frameIndex * frameWidth, 0,
            frameWidth, frameHeight,
            this.x - xOffset, this.y - yOffset,
            this.w, this.h
        );

        // Dibuja todos los proyectiles
        this.proyectiles.forEach(proyectil => proyectil.dibujar(ctx, xOffset, yOffset));
    }

    colisionPared(row, col, direccion) {
        const obstaculos = [11, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 62, 31, 32, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 95, 51];

        if (mapa[row] && obstaculos.includes(mapa[row][col])) {
            console.log("COLISIÓN DETECTADA");
            return true;
        }

        //TARJETA 1
        if (mapa[col] && mapa[row][col] === 70){
            console.log("colision con tarjeta")
            console.log(removerTarjeta1)
            this.municion = 80;
            removerTarjeta1 = true;
            alertaMostrada = false;
        }

        //TARJETA 2
        if (mapa[col] && mapa[row][col] === 61){
            console.log("colision con tarjeta2")
            console.log(removerTarjeta2)
            this.municion = 80;
            removerTarjeta2 = true;
            alertaMostrada = false;
        }

        //TARJETA 3
        if (mapa[col] && mapa[row][col] === 99){
            console.log("colision con tarjeta3")
            console.log(removerTarjeta3)
            this.municion = 80;
            removerTarjeta3 = true;
            alertaMostrada = false;
        }

        //VALIDACION TARJETA 1
        if (mapa[col] && mapa[row][col] === 54) {
            if (!alertaMostrada) { // Verifica si ya se mostró el alert
                if (removerTarjeta1 === true) {
                    alert("HOLA, EL NÚMERO A ESCRIBIR AL FINAL ES 2 (Presiona space para desacoplarse)");
                } else {
                    alert("HOLA, NO PUEDES ACCEDER AL NÚMERO DE ESTA MÁQUINA PORQUE NO TIENES LA TARJETA NÚMERO 1 (Presiona space para desacoplarse)");
                }
                alertaMostrada = true; // Marca que ya se mostró el alert
            }
            console.log("Contacto con la maquina 1");
        }

        //VALIDACION TARJETA 2
        if (mapa[col] && mapa[row][col] === 55) {
            if (!alertaMostrada) { // Verifica si ya se mostró el alert
                if (removerTarjeta2 === true) {
                    alert("HOLA, EL NÚMERO A ESCRIBIR AL FINAL ES 1 (Presiona space para desacoplarse)");
                } else {
                    alert("HOLA, NO PUEDES ACCEDER AL NÚMERO DE ESTA MÁQUINA PORQUE NO TIENES LA TARJETA NUMERO 2 (Presiona space para desacoplarse)");
                }
                alertaMostrada = true; // Marca que ya se mostró el alert
            }
            console.log("Contacto con la maquina 2");
        }
        
        //VALIDACION TARJETA 3
        if (mapa[col] && mapa[row][col] === 56) {
            if (!alertaMostrada) { // Verifica si ya se mostró el alert
                if (removerTarjeta3 === true) {
                    alert("HOLA, EL NÚMERO A ESCRIBIR AL FINAL ES 0, SI CUENTAS CON LAS OTRAS 2 TARJETAS DIRÍGETE A LA MÁQUINA FINAL (Presiona space para desacoplarse)");
                } else {
                    alert("HOLA, NO PUEDES ACCEDER AL NUMERO DE ESTA MÁQUINA PORQUE NO TIENES LA TARJETA NUMERO 2 (Presiona space para desacoplarse)");
                }
                alertaMostrada = true; // Marca que ya se mostró el alert
            }
            console.log("Contacto con la maquina 3");
        }

        //VALIDACION TARJETA 4
        if (mapa[col] && mapa[row][col] === 57) {
            if (!alertaMostrada) { // Verifica si ya se mostró el alert
                if (removerTarjeta1 === true && removerTarjeta2 === true && removerTarjeta3 === true) {
                    let respuesta = prompt("Por favor, ingresa los números mostrados en las máquinas:", "");

                    // Verifica si el usuario ha ingresado un valor
                    if (respuesta === '201' || respuesta === "102" || respuesta === "021" || respuesta === "120" || respuesta === "210" || respuesta === "012") {
                        alert("FELICIDADES, GANASTE!!!!")
                        window.location.href = '../../index.html';
                    } else {
                        alert("ERROR, HAS SIDO ELIMINADO")
                        window.location.href = '../../index.html';
                    }
                } 
                alertaMostrada = true; // Marca que ya se mostró el alert
            }

            console.log("Contacto con la maquina 3");
        }
        

        return false;
    }

    disparo() {
        if (this.municion > 0) {
            // Ajusta horizontalmente el proyectil dependiendo de la dirección
            let xProyectil = this.direccionDisparo ? this.x : this.x + this.w; 
            let yProyectil = this.y + this.h / 2; // En el medio vertical del jugador
            
            // Crea un nuevo proyectil con la dirección actual del disparo
            let nuevoProyectil = new Proyectil(xProyectil, yProyectil, this.direccionDisparo);
            this.proyectiles.push(nuevoProyectil);

            this.municion--; // Disminuir la munición
            this.reproducirSonido(); // Reproducir sonido al disparar
        }
        
        if (this.municion === 0) console.log("YA NO HAY MUNICION");
    }

    cambiarDireccionDisparo(direccion) {
        this.direccionDisparo = direccion; // Cambia la dirección del disparo (true: izquierda, false: derecha)
    }

    reproducirSonido() {
        if (sonidoDisparo) {
            sonidoDisparo.play(); // Reproduce el sonido al disparar
        }
    }
}

//Sonido de disparo
const sonidoDisparo = new Audio('../assets/disparo.mp3');
// let npc = new Npc(390, 400, 32, 32, 2, npcSprite, 7, 15);  // 4 frames, cambio cada 5 ticks


const npcSprite = new Image()
npcSprite.src = "../assets/npcLeft.png"

// Cargar la imagen
const img = new Image();
img.src = '../assets/player.png';

let player = new Rectangulo(160, 128, 22, 32);


// let npc = new Npc(800, 400, 21, 32);
let npc = [
    new Npc(300, 90, 21, 32, vidasNpc),
    new Npc(400, 110, 21, 32, vidasNpc),

    new Npc(300, 500, 21, 32, vidasNpc),
    new Npc(400, 520, 21, 32, vidasNpc),

    new Npc(600, 600, 21, 32, vidasNpc),
    new Npc(500, 600, 21, 32, vidasNpc),

    new Npc(300, 700, 21, 32, vidasNpc),
    new Npc(400, 800, 21, 32, vidasNpc),

    new Npc(300, 900, 21, 32, vidasNpc),
    new Npc(400, 1000, 21, 32, vidasNpc),

    new Npc(500, 1000, 21, 32, vidasNpc),
    new Npc(700, 1100, 21, 32, vidasNpc),

];






let xOffset = 0; // Desplazamiento del mapa en el eje X
let yOffset = 0; // Desplazamiento del mapa en el eje Y


const gif = new Image();
gif.src = '../assets/life.gif';

const bala = new Image();
bala.src = '../assets/bullet.png';

function pintar() {
    update();
    dibujarMatriz();

    // Dibujar NPCs
    npc.forEach(npcInstance => {
        npcInstance.draw(ctx, npcSprite, xOffset, yOffset);
    });


    // Dibujar el score en la esquina superior
    ctx.strokeText(`score: ${score}`, 240, 20);
    ctx.drawImage(gif, 180, 7, 22, 22);  

    ctx.drawImage(bala, 130, 7, 22, 22);  
    // Dibujar la munición en el canvas
    ctx.fillText(player.municion, 150, 22); 

    ctx.fillStyle = 'black'
    ctx.fillText(vidas, 210, 22); 
    

    // Dibujar al jugador
    player.draw(ctx, img, xOffset, yOffset);

    // Llamada recursiva para continuar animando
    requestAnimationFrame(pintar);
}

function dibujarMatriz() {
    ctx.clearRect(0, 0, my_canvas.width, my_canvas.height); // Limpia el canvas antes de dibujar

    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            const valor = mapa[i][j];

            //TARJETA 1
            if (valor === 70 && mapa[i][j] === 70) {
                ctx.drawImage(tarjeta1, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            // CONTROL DE LA TARJETA 
            if(removerTarjeta1 === true){
                if (valor === 70 && mapa[i][j] === 70) {
                    ctx.drawImage(pistola2, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
                }
            }
            //Madera con agua (RECUERDA ESTO NO LO TIENES QUE LE REPETIR)
            if (valor ===  98 && mapa[i][j] === 98) {
                ctx.drawImage(p98, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //CONTROL DE LA TARJETA 2

            //Madera con agua (RECUERDA ESTO NO LO TIENES QUE LE REPETIR)
            if (valor ===  61 && mapa[i][j] === 61) {
                ctx.drawImage(tarjeta2, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            if(removerTarjeta2 === true){
                if (valor === 61 && mapa[i][j] === 61) {
                    ctx.drawImage(p61, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
                }
            }

            //CONTROL DE LA TARJETA 3

            //Madera con agua (RECUERDA ESTO NO LO TIENES QUE LE REPETIR)
            if (valor ===  99 && mapa[i][j] === 99) {
                ctx.drawImage(tarjeta3, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            if(removerTarjeta3 === true){
                if (valor === 99 && mapa[i][j] === 99) {
                    ctx.drawImage(p98, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
                }
            }

            //MAQUINAS DE CRACK

            //MAQUINA 1
            if (valor === 54 && mapa[i][j] === 54) {
                ctx.drawImage(maquina1, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //MAQUINA 2
            if (valor === 55 && mapa[i][j] === 55) {
                ctx.drawImage(maquina2, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //MAQUINA 3
            if (valor === 56 && mapa[i][j] === 56) {
                ctx.drawImage(maquina3, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //MAQUINA 4
            if (valor === 57 && mapa[i][j] === 57) {
                ctx.drawImage(maquina4, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }


            // Dibuja las paredes
            if (valor === 11 && mapa[i][j] === 11) {
                ctx.drawImage(roca, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            // PISTOLA 
            if (valor === 90 && mapa[i][j] === 90) {
                ctx.drawImage(pistola1, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //SUELO DEL MAPA
            if (valor === 10 && mapa[i][j] === 10) {
                ctx.drawImage(suelo, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PARED IZQUIERDA
            if (valor === 12 && mapa[i][j] === 12) {
                ctx.drawImage(paredIzq, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PARED DERECHA
            if (valor === 13 && mapa[i][j] === 13) {
                ctx.drawImage(paredDer, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PARED INFERIOR
            if (valor === 14 && mapa[i][j] === 14) {
                ctx.drawImage(paredInf, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PARED SUPERIOR
            if (valor === 15 && mapa[i][j] === 15) {
                ctx.drawImage(paredSup, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PARED SUPERIOR
            if (valor === 16 && mapa[i][j] === 16) {
                ctx.drawImage(esqInfIzq, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //ESQUINA INFERIOR IZQUIERDA
            if (valor ===  17 && mapa[i][j] === 17) {
                ctx.drawImage(esqInfDer, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //ESQUINA INFERIOR IZQUIERDA
            if (valor ===  18 && mapa[i][j] === 18) {
                ctx.drawImage(esqInfDer, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //ESQUINA SUPERIOR IZQUIERDA
            if (valor ===  19 && mapa[i][j] === 19) {
                ctx.drawImage(esqSupIzq, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //ESQUINA SUPERIOR DERECHA
            if (valor ===  20 && mapa[i][j] === 20) {
                ctx.drawImage(esqSupDer, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //RELLENO DE ESQUINA
            if (valor ===  50 && mapa[i][j] === 50) {
                ctx.drawImage(esq1, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //RELLENO DE ESQUINA
            if (valor ===  51 && mapa[i][j] === 51) {
                ctx.drawImage(esq2, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            
            //RELLENO DE ESQUINA
            if (valor ===  52 && mapa[i][j] === 52) {
                ctx.drawImage(esq3, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //RELLENO DE ESQUINA
            if (valor ===  53 && mapa[i][j] === 53) {
                ctx.drawImage(esq4, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //MAQUINAS


            //MUROS DE COLOR NEGRO

            if (valor ===  21 && mapa[i][j] === 21) {
                ctx.drawImage(p21, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  22 && mapa[i][j] === 22) {
                ctx.drawImage(p22, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  23 && mapa[i][j] === 23) {
                ctx.drawImage(p23, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  24 && mapa[i][j] === 24) {
                ctx.drawImage(p24, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  25 && mapa[i][j] === 25) {
                ctx.drawImage(p25, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  26 && mapa[i][j] === 26) {
                ctx.drawImage(p26, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  27 && mapa[i][j] === 27) {
                ctx.drawImage(p27, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  28 && mapa[i][j] === 28) {
                ctx.drawImage(p28, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  29 && mapa[i][j] === 29) {
                ctx.drawImage(p29, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  30 && mapa[i][j] === 30) {
                ctx.drawImage(p30, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }



            //MESA DE CRACK
            if (valor ===  31 && mapa[i][j] === 31) {
                ctx.drawImage(p31, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  32 && mapa[i][j] === 32) {
                ctx.drawImage(p32, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  33 && mapa[i][j] === 33) {
                ctx.drawImage(p33, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  34 && mapa[i][j] === 34) {
                ctx.drawImage(p34, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  35 && mapa[i][j] === 35) {
                ctx.drawImage(p35, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  36 && mapa[i][j] === 36) {
                ctx.drawImage(p36, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  37 && mapa[i][j] === 37) {
                ctx.drawImage(p37, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  38 && mapa[i][j] === 38) {
                ctx.drawImage(p38, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  39 && mapa[i][j] === 39) {
                ctx.drawImage(p39, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  40 && mapa[i][j] === 40) {
                ctx.drawImage(p40, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  41 && mapa[i][j] === 41) {
                ctx.drawImage(p41, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  42 && mapa[i][j] === 42) {
                ctx.drawImage(p42, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  43 && mapa[i][j] === 43) {
                ctx.drawImage(p43, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  44 && mapa[i][j] === 44) {
                ctx.drawImage(p44, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  45 && mapa[i][j] === 45) {
                ctx.drawImage(p45, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  46 && mapa[i][j] === 46) {
                ctx.drawImage(p46, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  47 && mapa[i][j] === 47) {
                ctx.drawImage(p47, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  48 && mapa[i][j] === 48) {
                ctx.drawImage(p48, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PIEDRA Y ARBOLES
            if (valor ===  80 && mapa[i][j] === 80) {
                ctx.drawImage(piedra, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  81 && mapa[i][j] === 81) {
                ctx.drawImage(p81, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  82 && mapa[i][j] === 82) {
                ctx.drawImage(p82, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  83 && mapa[i][j] === 83) {
                ctx.drawImage(p83, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  84 && mapa[i][j] === 84) {
                ctx.drawImage(p84, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  85 && mapa[i][j] === 85) {
                ctx.drawImage(p85, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  86 && mapa[i][j] === 86) {
                ctx.drawImage(p86, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  87 && mapa[i][j] === 87) {
                ctx.drawImage(p87, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  88 && mapa[i][j] === 88) {
                ctx.drawImage(p88, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            if (valor ===  89 && mapa[i][j] === 89) {
                ctx.drawImage(p89, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //PIEDRITA
            if (valor ===  90 && mapa[i][j] === 90) {
                ctx.drawImage(piedrita, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //Madera con tierra
            if (valor ===  60 && mapa[i][j] === 60) {
                ctx.drawImage(p60, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //Madera con agua
            if (valor ===  62 && mapa[i][j] === 62) {
                ctx.drawImage(p62, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            //Madera con agua HACIA ABAJO
            if (valor ===  63 && mapa[i][j] === 63) {
                ctx.drawImage(p63, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //Madera con agua HACIA LA DERECHA
            if (valor ===  64 && mapa[i][j] === 64) {
                ctx.drawImage(p64, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //ARBUSTO
            if (valor ===  92 && mapa[i][j] === 92) {
                ctx.drawImage(arbusto, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
            //ARBUSTO
            if (valor ===  95 && mapa[i][j] === 95) {
                ctx.drawImage(p95, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
        }
    }

    // Dibuja la nave
    ctx.drawImage(img, player.x - xOffset, player.y - yOffset, player.w, player.h);
    ctx.drawImage(npcSprite, npc.x - xOffset, npc.y - yOffset, npc.w, npc.h);
}

let npcTimer = 0; // Temporizador para controlar la frecuencia de disparo del NPC
const npcFireRate = 100; // NPC disparará cada 100 actualizaciones

function update() {
    npc.forEach(npcInstance => {
        npcInstance.updateAnimation();
    });

    if (!pausa) {
        let movimientoX = 0;
        let movimientoY = 0;

        if (teclasPresionadas.left) {
            img.src = '../assets/playerLeft.png';
            movimientoX = -1;
            direccionDisparo = true;
        }
        if (teclasPresionadas.up) {
            movimientoY = -1;
        }
        if (teclasPresionadas.right) {
            img.src = '../assets/player.png';
            movimientoX = 1;
            direccionDisparo = false;
        }
        if (teclasPresionadas.down) {
            movimientoY = 1;
        }

        if (teclasPresionadas.disparo) {
            player.disparo();
            teclasPresionadas.disparo = false; // Solo dispara una vez por tecla
        }

        const nuevaX = player.x + movimientoX;
        const nuevaY = player.y + movimientoY;

        const col = Math.floor(nuevaX / bloque);
        const row = Math.floor(nuevaY / bloque);

        if (col >= 0 && col < mapa[0].length && row >= 0 && row < mapa.length) {
            if (!player.colisionPared(row, col, direccion)) {
                player.x = nuevaX;
                player.y = nuevaY;
            }
        }

        // Actualizar la animación del jugador
        player.updateAnimation();

        // Incrementar el temporizador del NPC y disparar si se cumple el tiempo
        npcTimer += 2;
        if (npcTimer >= npcFireRate) {
            npc.forEach(npcInstance => {
                npcInstance.disparar();
            });
            npcTimer = 0; // Restablecer el temporizador
        }

        // Detectar colisión entre proyectiles del jugador y todos los NPCs
        player.proyectiles.forEach(proyectil => {
            proyectil.mover();

            // Recorre los NPCs
            npc.forEach(npcInstance => {
                if (detectarColision(proyectil, npcInstance)) {
                    console.log("El jugador golpeó al NPC");

                    // Reducir las vidas del NPC
                    npcInstance.vidas -= 1;
                    console.log("Vidas restantes del NPC:", npcInstance.vidas);

                    // Si las vidas del NPC llegan a 0, reubicarlo
                    if (npcInstance.vidas <= 0) {
                        console.log("NPC sin vidas. Reubicando...");
                        score += 50;
                        npcInstance.reubicar(); // Reubica el NPC
                    }
                }
            });
        });
        // Mover proyectiles del NPC y detectar colisiones con el jugador
        npc.forEach(npcInstance => {
            npcInstance.proyectiles.forEach(proyectil => {
                proyectil.mover();

                if (detectarColision(proyectil, player)) {
                    console.log("El NPC golpeó al jugador");
                    vidas = vidas - 1;
                    if(vidas <= 0){
                        alert("Has sido eliminado, inténtalo de nuevo.")
                        window.location.href = '../../index.html';
                    }
                }
            });
        });

        // Filtrar los proyectiles del jugador para mantener solo los dentro del canvas
        player.proyectiles = player.proyectiles.filter(proyectil => {
            return proyectil.x >= -proyectil.radio;
        });

        // Limpiar el canvas y dibujar el jugador y los NPCs
        ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
        player.draw(ctx, img, xOffset, yOffset);
        npc.forEach(npcInstance => {
            npcInstance.draw(ctx, npcSprite, xOffset, yOffset);
        });

        // Controlar la cámara para que siga al jugador
        xOffset = player.x - (my_canvas.width / 2 - player.w / 2);
        yOffset = player.y - (my_canvas.height / 2 - player.h / 2);

    } else {
        ctx.fillStyle = "rgba(255, 100, 51, 0.5)";
        ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
        ctx.strokeText("PAUSA", my_canvas.width / 2 - 30, my_canvas.height / 2);
    }
}



// Función para detectar colisión entre un proyectil y un objetivo, que chamba tan jodida es esta
function detectarColision(proyectil, objetivo) {
    const distanciaX = proyectil.x - (objetivo.x + objetivo.w / 2);
    const distanciaY = proyectil.y - (objetivo.y + objetivo.h / 2);
    const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

    // La perra colisión si la distancia es menor al radio del proyectil más un margen de seguridad
    const margen = 10; // Ajusta este valor según el tamaño del objetivo
    return distancia < proyectil.radio + margen;
}

        // Función para actualizar el temporizador
let seconds = 0;
let minutes = 0;

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    let secondsStr = seconds < 10 ? "0" + seconds : seconds;
    let minutesStr = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById('timer').innerText = `${minutesStr}:${secondsStr}`;
}

// Actualizar el temporizador cada segundo
setInterval(updateTimer, 1000);



requestAnimationFrame(pintar);
