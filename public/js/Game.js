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

// Cuando se activa o sale del modo pantalla completa, ajustar el tamaño del canvas
document.addEventListener('fullscreenchange', ajustarCanvas);
document.addEventListener('webkitfullscreenchange', ajustarCanvas);
document.addEventListener('mozfullscreenchange', ajustarCanvas);
document.addEventListener('MSFullscreenChange', ajustarCanvas);

let x = 0;
let y = 0;
var pausa = false;

let direccion = "";
const bloque = 32;

const mapa = [
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, ],
    [11, 11, 11, 11, 10, 10, 10, 11, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, ],
    [81, 82, 83, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 11, 80, 11, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, ],
    [11, 81, 82, 83, 12, 10, 13, 11, 11, 11, 80, 10, 11, 11, 11, 12, 10, 51, 14, 14, 14, 14, 14, 14, 14, 14, 14, 18, 11, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, ],
    [90, 84, 85, 86, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 87, 88, 89, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 80, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, ],
    [90, 11, 11, 11, 12, 10, 50, 15, 15, 15, 15, 10, 15, 15, 15, 53, 10, 50, 15, 15, 15, 15, 15, 15, 15, 20, 11, 11, 12, 10, 51, 14, 14, 14, 14, 14, 14, 52, 51, 18, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [11, 11, 90, 11, 12, 10, 51, 14, 14, 14, 14, 14, 14, 14, 14, 14, 52, 10, 51, 14, 14, 14, 14, 52, 10, 13, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [11, 11, 11, 90, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 50, 20, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 51, 18, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 12, 10, 13, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 12, 13, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 11, 11, 11, 19, 15, 15, 15, 15, 15, 53, 10, 13, 11, 11, 11, 11, 12, 10, 50, 15, 15, 53, 10, 13, 11, 11, 11, 11, 11, 11, 31, 33, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 11, 11, 32, 34, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 11, 11, 12, 10, 51, 14, 14, 14, 52, 10, 13, 11, 11, 11, 11, 16, 14, 14, 14, 14, 14, 14, 18, 11, 11, 11, 11, 11, 11, 16, 18, 11, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 11, 11, 11, 16, 10, 18, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 11, 11, 11, 10, 11, 10, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 12, 10, 50, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, ],
    [11, 90, 11, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, ],
    [81, 82, 83, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 52, 10, 13, 11, ],
    [84, 85, 86, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [87, 88, 89, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 21, 22, 22, 53, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 24, 62, 61, 60, 10, 13, 11, 11, 11, 11, 11, 12, 10, 51, 14, 14, 14, 14, 14, 52, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 13, 11, ],
    [11, 27, 28, 29, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 50, 15, 31, 33, 30, 30, 35, 36, 37, 30, 30, 30, 30, 11, 11, 12, 10, 13, 11, ],
    [11, 81, 82, 83, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 32, 34, 30, 30, 38, 39, 30, 30, 30, 30, 30, 11, 11, 16, 10, 18, 11, ],
    [11, 84, 85, 86, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 51, 14, 18, 30, 30, 30, 30, 40, 30, 30, 30, 30, 30, 11, 11, 11, 10, 11, 11, ],
    [11, 87, 88, 89, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 30, 30, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 81, 82, 83, 12, 10, 50, 15, 15, 15, 15, 15, 53, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [80, 84, 85, 86, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 19, 15, 15, 15, 53, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 87, 88, 89, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 17, 11, 12, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 51, 14, 14, 14, 18, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 16, 10, 18, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],

];

class Rectangulo {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    colisionPared(row, col) {
        if (mapa[col] && mapa[row][col] === 11 || mapa[row] && mapa[row][col] === 13 || mapa[row] && mapa[row][col] === 14 || mapa[row] && mapa[row][col] === 16 || mapa[row] && mapa[row][col] === 17 || mapa[row] && mapa[row][col] === 18 || mapa[row] && mapa[row][col] === 19 
            || mapa[row] && mapa[row][col] === 20  || mapa[row] && mapa[row][col] === 21  || mapa[row] && mapa[row][col] === 22  || mapa[row] && mapa[row][col] === 23  || mapa[row] && mapa[row][col] === 24  || mapa[row] && mapa[row][col] === 25  || mapa[row] && mapa[row][col] === 26  || mapa[row] && mapa[row][col] === 27  
            || mapa[row] && mapa[row][col] === 28 || mapa[row] && mapa[row][col] === 31 
            || mapa[row] && mapa[row][col] === 32 || mapa[row] && mapa[row][col] === 80 || mapa[row] && mapa[row][col] === 81 || mapa[row] && mapa[row][col] === 82 || mapa[row] && mapa[row][col] === 83
            || mapa[row] && mapa[row][col] === 84 || mapa[row] && mapa[row][col] === 85 || mapa[row] && mapa[row][col] === 86 || mapa[row] && mapa[row][col] === 87 || mapa[row] && mapa[row][col] === 88 || mapa[row] && mapa[row][col] === 89) {
            console.log("EL PEPE ETE SECH")
            // Ajustar posición para evitar la colisión
            switch (direccion) {
                case "left":
                    this.x += 5;
                    break;
                case "up":
                    this.y += 5;
                    break;
                case "right":
                    this.x -= 5;
                    break;
                case "down":
                    this.y -= 5;
                    break;
            }
        }
    }
}

let rectangulo = new Rectangulo(128, 32, 32, 32);

//11
let roca = new Image();
roca.src = '../assets/pared.png';

//11
let piedra = new Image();
piedra.src = '../assets/80.png';

//11
let piedrita = new Image();
piedrita.src = '../assets/90.png';


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

//60
let p62 = new Image();
p62.src = '../assets/62.png';

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


let img = new Image(); 
img.src = '../assets/nave.png';

let xOffset = 0; // Desplazamiento del mapa en el eje X
let yOffset = 0; // Desplazamiento del mapa en el eje Y

function pintar() {
    update();
    dibujarMatriz();
    requestAnimationFrame(pintar);
}

function dibujarMatriz() {
    ctx.clearRect(0, 0, my_canvas.width, my_canvas.height); // Limpia el canvas antes de dibujar

    for (let i = 0; i < mapa.length; i++) {
        for (let j = 0; j < mapa[i].length; j++) {
            const valor = mapa[i][j];
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
            if (valor ===  61 && mapa[i][j] === 61) {
                ctx.drawImage(p61, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }

            //Madera con agua
            if (valor ===  62 && mapa[i][j] === 62) {
                ctx.drawImage(p62, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }




        }
    }

    // Dibuja la nave
    ctx.drawImage(img, rectangulo.x - xOffset, rectangulo.y - yOffset, rectangulo.w, rectangulo.h);
}

function update() {
    if (!pausa) {
        switch (direccion) {
            case "left":
                rectangulo.x -= 5;
                break;
            case "up":
                rectangulo.y -= 5;
                break;
            case "right":
                rectangulo.x += 5;
                break;
            case "down":
                rectangulo.y += 5;
                break;
        }

        // Verificar colisión con las paredes
        const col = Math.floor(rectangulo.x / bloque); // Usar la posición real sin compensar el offset
        const row = Math.floor(rectangulo.y / bloque);

        // Corrige el desplazamiento en la detección
        if (col >= 0 && col < mapa[0].length && row >= 0 && row < mapa.length) {
            rectangulo.colisionPared(row, col);
        }

        // Control de la cámara para que siga al rectángulo
        xOffset = rectangulo.x - (my_canvas.width / 2 - rectangulo.w / 2);
        yOffset = rectangulo.y - (my_canvas.height / 2 - rectangulo.h / 2);

    } else {
        ctx.fillStyle = "rgba(255, 100, 51, 0.5)";
        ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
        ctx.strokeText("PAUSA", my_canvas.width / 2 - 30, my_canvas.height / 2);
    }
}


requestAnimationFrame(pintar);
