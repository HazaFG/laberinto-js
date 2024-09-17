import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Escape from Scariff</h1>
    <div class="card">
      <a href = "./views/Game.html">JUGAR</a>
    </div>
    <p class="read-the-docs">
      Creado por Hazael Flores
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
