(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function n(i){let t=0;const o=c=>{t=c,i.innerHTML=`count is ${t}`};i.addEventListener("click",()=>o(t+1)),o(0)}document.querySelector("#app").innerHTML=`
  <div>
    <h1>Escape from Scariff</h1>
    <div class="card">
      <a href = "./views/Game.html">JUGAR</a>
    </div>
    <p class="read-the-docs">
      Creado por Hazael Flores
    </p>
  </div>
`;n(document.querySelector("#counter"));
