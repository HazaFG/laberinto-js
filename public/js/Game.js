const my_canvas = document.getElementById('my_canvas');
const ctx = my_canvas.getContext('2d');

let x = 0;
let y = 0;
var pausa = false;

let direccion = "";
const bloque = 32;

const mapa = [
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, ],
    [11, 11, 11, 11, 10, 10, 10, 11, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 15, 15, 15, 15, 10, 15, 15, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 14, 14, 14, 14, 14, 14, 14, 14, 14, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 10, 10, 10, 10, 11, 11, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 10, 10, 10, 11, 10, 10, 11, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 10, 10, 10, 11, 11, 10, 10, 11, 11, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 10, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 10, 10, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 10, 11, 10, 11, 11, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 10, 10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 19, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 21, 27, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 22, 29, 10, 10, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 14, 14, 14, 14, 14, 10, 10, 13, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 10, 10, 10, 11, ],
    [11, 23, 25, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 10, 10, 10, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 11, 11, 11, 10, 11, 11, ],
    [11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 30, 30, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 15, 15, 15, 15, 15, 10, 10, 13, 11, 11, 11, 11, 11, 12, 10, 13, 11, 11, 11, 11, 11, 30, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13, 11, 19, 15, 15, 15, 10, 10, 13, 11, 11, 11, 11, 11, 11, 30, 30, 30, 30, 30, 30, 11, 11, 10, 10, 10, 11, ],
    [11, 11, 11, 11, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 17, 11, 12, 10, 10, 10, 10, 10, 13, 11, 11, 11, 11, 11, 11, 11, 30, 30, 30, 30, 30, 11, 11, 11, 11, 11, 11, ],
    [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 10, 10, 14, 14, 14, 18, 11, 11, 11, 11, 11, 11, 11, 11, 30, 30, 30, 30, 11, 11, 11, 11, 11, 11, ],
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
            || mapa[row] && mapa[row][col] === 20  || mapa[row] && mapa[row][col] === 21  || mapa[row] && mapa[row][col] === 22  || mapa[row] && mapa[row][col] === 23  || mapa[row] && mapa[row][col] === 24  || mapa[row] && mapa[row][col] === 25  || mapa[row] && mapa[row][col] === 26  || mapa[row] && mapa[row][col] === 27  || mapa[row] && mapa[row][col] === 28) {
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

//29
let p29 = new Image();
p29.src = '../assets/pared.png';

//28
let p28 = new Image();
p28.src = '../assets/28.png';

//30
let p30 = new Image();
p30.src = '../assets/30.png';


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

            //ESQUINA INFERIOR IZQUIERDA
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
            if (valor ===  30 && mapa[i][j] === 30) {
                ctx.drawImage(p30, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
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
