const my_canvas = document.getElementById('my_canvas');
const ctx = my_canvas.getContext('2d');

let x = 0;
let y = 0;
var pausa = false;

let direccion = "";
const bloque = 32;

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

    colisionPared(row, col) {
        if (mapa[row] && mapa[row][col] === 1) {
            console.log("EL PEPE ETE SECH")
            // Ajustar posición para evitar la colisión
            switch (direccion) {
                case "left":
                    this.x += 0.5;
                    break;
                case "up":
                    this.y += 0.5;
                    break;
                case "right":
                    this.x -= 0.5;
                    break;
                case "down":
                    this.y -= 0.5;
                    break;
            }
        }
    }
}

let rectangulo = new Rectangulo(my_canvas.width / 2 - 25, my_canvas.height / 2 - 25, 50, 50);

let roca = new Image();
roca.src = '../assets/pared.png';

let img = new Image(); 
img.src = '../assets/nave.png';

let xOffset = 0; // Desplazamiento del mapa en el eje X
let yOffset = 0; // Desplazamiento del mapa en el eje Y


console.log(xOffset)

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
            if (valor === 1) {
                ctx.drawImage(roca, j * bloque - xOffset, i * bloque - yOffset, bloque, bloque);
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
                rectangulo.x -= 0.5;
                break;
            case "up":
                rectangulo.y -= 0.5;
                break;
            case "right":
                rectangulo.x += 0.5;
                break;
            case "down":
                rectangulo.y += 0.5;
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
