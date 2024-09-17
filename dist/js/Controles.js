document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:  // Flecha izquierda
            teclasPresionadas.left = true;
            break;
        case 38:  // Flecha arriba
            teclasPresionadas.up = true;
            break;
        case 39:  // Flecha derecha
            teclasPresionadas.right = true;
            break;
        case 40:  // Flecha abajo
            teclasPresionadas.down = true;
            break;
        case 32:  // Barra espaciadora
            pausa = true;
            break;
        case 87:  // Tecla W (disparo)
            teclasPresionadas.disparo = true;
            break;
    }  
};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:  // Flecha izquierda
            teclasPresionadas.left = false;
            break;
        case 38:  // Flecha arriba
            teclasPresionadas.up = false;
            break;
        case 39:  // Flecha derecha
            teclasPresionadas.right = false;
            break;
        case 40:  // Flecha abajo
            teclasPresionadas.down = false;
            break;
        case 32:  // Barra espaciadora
            pausa = false;
            break;
        case 87:  // Tecla W (disparo)
            teclasPresionadas.disparo = false;
            break;
    }
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.cambiarDireccionDisparo(true); // Disparo hacia la izquierda
    }
    if (event.key === 'ArrowRight') {
        player.cambiarDireccionDisparo(false); // Disparo hacia la derecha
    }
});

// window.addEventListener('keyup', () => {
//     direccion = ""; // Detener el movimiento al soltar la tecla
// });