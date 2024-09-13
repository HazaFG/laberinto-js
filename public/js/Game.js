const my_canvas = document.getElementById('my_canvas');
const ctx = my_canvas.getContext('2d');

let x = 0;
let y = 0;
let paredes = []
var pausa = false
let score = 0;

let direccion = ""
velocidad = x * 2;

const bloque = 32; // Tamaño de cada celda
const mapa = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

class Rectangulo {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    colisionPared(pared) {
        if (this.x < pared.x + pared.w &&
            this.x + this.w > pared.x &&
            this.y < pared.y + pared.h &&
            this.y + this.h > pared.y) {
            // Ajusta la posición para evitar la colisión
            switch(direccion) {
                case "left":
                    this.x += 2;
                    break;
                case "up":
                    this.y += 2;
                    break;
                case "right":
                    this.x -= 2;
                    break;
                case "down":
                    this.y -= 2;
                    break;
            }
        }
    }
}

let rectangulo = new Rectangulo(my_canvas.width / 2, my_canvas.height / 2, 32, 32);

let roca = new Image();
roca.src = '../assets/pared.png';

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

            if (valor === 1) { // Dibuja paredes
                ctx.drawImage(roca, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
            }
        }
    }

    ctx.drawImage(img, my_canvas.width / 2 - rectangulo.w / 2, my_canvas.height / 2 - rectangulo.h / 2, rectangulo.w, rectangulo.h);
}

function update() {
    if (!pausa) {
        let nuevoX = rectangulo.x;
        let nuevoY = rectangulo.y;

        switch(direccion) {
            case "left":
                nuevoX -= 0.5;
                xOffset -= 0.5; // Mueve el mapa hacia la derecha
                break;
            case "up":
                nuevoY -= 0.5;
                yOffset -= 0.5; // Mueve el mapa hacia abajo
                break;
            case "right":
                nuevoX += 0.5;
                xOffset += 0.5; // Mueve el mapa hacia la izquierda
                break;
            case "down":
                nuevoY += 0.5;
                yOffset += 0.5; // Mueve el mapa hacia arriba
                break;
        }

        // Verificar colisión con el mapa
        const col = Math.floor((rectangulo.x - xOffset) / bloque);
        const row = Math.floor((rectangulo.y - yOffset) / bloque);
        
        if (mapa[row] && mapa[row][col] === 1) {
            rectangulo.colisionPared({x: col * bloque, y: row * bloque, w: bloque, h: bloque});
        }

    } else {
        ctx.fillStyle = "rgb(255, 100, 51, 0.5)";
        ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
        ctx.strokeText("PAUSA", my_canvas.width / 2 - 30, my_canvas.height / 2);
    }
}

requestAnimationFrame(pintar);
