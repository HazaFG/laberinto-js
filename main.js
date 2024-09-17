import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
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
