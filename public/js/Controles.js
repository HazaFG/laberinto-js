//Controles
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            direccion = "left"
            pausa = false
            break;
        case 38:
            direccion = "up"
            pausa = false
            break;
        case 39:
            direccion = "right"
            pausa = false
            break;
        case 40:
            direccion = "down"
            pausa = false
            break;
        case 32:
            pausa = true;                 
            direccion = "velocidad"
    }  
};