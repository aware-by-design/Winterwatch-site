"use strict";(()=>{const a="winterwatch-2026-display-v1";const s={textSize:"normal",highContrast:false,
easierReading:false,pauseAnimations:false};function i(){try{const e=sessionStorage.
getItem(a);const t=e&&e.length<256?JSON.parse(e):{};return{textSize:["larger","l\
argest"].includes(t?.textSize)?t.textSize:"normal",highContrast:t?.highContrast===
true,easierReading:t?.easierReading===true,pauseAnimations:t?.pauseAnimations===
true}}catch{return{...s}}}function o(e){try{if(Object.keys(s).every(t=>e[t]===s[t]))
sessionStorage.removeItem(a);else sessionStorage.setItem(a,JSON.stringify(e))}catch{}}
function n(e,t){document.documentElement?.setAttribute("data-text-size",e.textSize);
document.body.setAttribute("data-text-size",e.textSize);document.body.classList.
toggle("high-contrast",e.highContrast);document.body.classList.toggle("easier-re\
ading",e.easierReading);document.body.classList.toggle("pause-animations",e.pauseAnimations||
t)}window.WINTERWATCH_DISPLAY=Object.freeze({read:i,save:o,apply:n});if(document.
body?.hasAttribute?.("data-accessibility-statement")){const e=window.matchMedia(
"(prefers-reduced-motion: reduce)");const t=()=>n(i(),e.matches);t();window.addEventListener(
"pageshow",t);e.addEventListener("change",t)}})();
