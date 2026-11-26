"use strict";(()=>{const o=["adult-female","adult-male","child-female","child-male"];const c=new Map(
["family",...o].map(t=>{const e="ambassador-"+t;return["assets/"+e+".webp",e]}));
let s;function d(t){const e=c.get(t);if(!e||document.documentElement.dataset.nestorPreview===
e)return;document.documentElement.dataset.nestorPreview=e;const a=document.createElement(
"link");a.rel="stylesheet";a.href="assets/"+e+"-preview.css";a.setAttribute("blo\
cking","render");document.head.appendChild(a);if(s)s.remove();s=a}const r=Math.floor(
(Date.now()-Date.UTC(2026,11,1,8))/864e5);const i=r>=0&&r<24?o[r%o.length]:"fami\
ly";const l="assets/ambassador-"+i+".webp";d(l);const n=document.createElement("\
link");n.rel="preload";n.as="image";n.fetchPriority="high";n.href=l;document.head.
appendChild(n);for(const t of["error","load"]){document.addEventListener(t,({target:e})=>{
if(e.id==="adventHostImage")e.toggleAttribute("data-load-failed",t==="error")},true)}
window.WINTERWATCH_PORTRAIT={select:d}})();
