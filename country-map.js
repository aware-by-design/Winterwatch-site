"use strict";(()=>{const f=window.WINTERWATCH_COUNTRIES||[];const m=new Map(f.map(e=>[e.id,e]));
const b=[["se","Sweden",4,0],["fi","Finland",5,0],["ie","Ireland",0,1],["dk","De\
nmark",3,1],["ee","Estonia",5,1],["nl","Netherlands",2,2],["de","Germany",3,2],[
"pl","Poland",4,2],["lv","Latvia",5,2],["be","Belgium",1,3],["lu","Luxembourg",2,
3],["cz","Czechia",3,3],["sk","Slovakia",4,3],["lt","Lithuania",5,3],["fr","Fran\
ce",1,4],["at","Austria",3,4],["hu","Hungary",4,4],["ro","Romania",5,4],["pt","P\
ortugal",0,5],["es","Spain",1,5],["it","Italy",2,5],["si","Slovenia",3,5],["hr",
"Croatia",4,5],["bg","Bulgaria",5,5],["mt","Malta",2,6],["gr","Greece",5,6],["cy",
"Cyprus",6,6]];const l=[{key:"enacted",label:"NIS2 law enacted",test:e=>/^enacted$/i.
test(e)},{key:"staged",label:"Enacted, staged cohorts",test:e=>/^enacted/i.test(
e)&&/staged/i.test(e)},{key:"pending",label:"Pending in linked official material",
test:e=>/pending/i.test(e)},{key:"unverified",label:"Enactment not verified",test:e=>/not verified/i.
test(e)},{key:"none",label:"Official directories available",test:()=>false}];const y=e=>e?
l.find(t=>t.test(String(e.status||"")))||l[3]:l[4];let k=0;let c=null;function i(e,t,o){
const n=document.createElement(e);if(t)n.className=t;if(o!=null)n.textContent=o;
return n}function $(e){const t=`cm-title-${++k}`;const o=e.value;const n=i("div",
"country-map");n.setAttribute("role","group");n.setAttribute("aria-labelledby",t);
const u=i("div","cm-head");u.append(i("span","cm-title","Select your country to \
see contact routes"));u.firstChild.id=t;u.append(i("span","cm-hint",`All 27 EU c\
ountries selectable · ${m.size} detailed NIS2 profiles · schematic positions`));
n.append(u);const v=i("div","cm-grid");for(const[a,r,p,w]of b){const h=m.get(a);
const S=y(h);const A=` cm-c${p} cm-r${w}`;{const s=i("button",`cm-tile cm-${S.key}${A}`,
a.toUpperCase());s.type="button";s.dataset.mapCountry=a;s.setAttribute("aria-pre\
ssed",String(a===o));s.setAttribute("aria-label",`${r}: ${S.label}. Show contact\
 routes`);s.title=`${r} · ${h?.status||"Find current authorities in official di\
rectories"}`;s.addEventListener("click",()=>E(e,a));v.append(s)}}n.append(v);const d=i(
"ul","cm-legend");d.setAttribute("aria-label","Map key");for(const a of l){if(a.
key!=="none"&&!f.some(p=>y(p).key===a.key))continue;const r=i("li");r.append(i("\
span",`cm-swatch cm-${a.key}`),document.createTextNode(a.label));d.append(r)}n.append(
d);return n}function E(e,t){if(!b.some(([o])=>o===t)||e.value===t)return;c={code:t,
scope:e.closest("dialog")||document};e.value=t;e.dispatchEvent(new Event("change",
{bubbles:true}))}function g(e){for(const t of e.querySelectorAll("label.country-\
select")){const o=t.previousElementSibling;if(o&&o.classList.contains("country-m\
ap"))continue;const n=t.querySelector("[data-country-select]");if(!n)continue;t.
before($(n))}if(c){const t=c.scope.querySelector(`.country-map [data-map-country\
="${c.code}"]`);if(t){t.focus({preventScroll:true});c=null}}}g(document);new MutationObserver(
e=>{for(const t of e)if(t.addedNodes.length){g(document);break}}).observe(document.
body,{childList:true,subtree:true})})();
