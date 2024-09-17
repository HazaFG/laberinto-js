import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Escape from Scariff</h1>
    
    <!-- Imagen centrada -->
    <img src="./assets/instrucciones.png" alt="Instrucciones" class="w-40 h-40 mb-6"/>

    <div class="card">
      <a href="./views/Game.html" class="text-blue-500 hover:underline">JUGAR</a>
    </div>

    <p class="read-the-docs mt-4 text-gray-500">
      Creado por Hazael Flores
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

