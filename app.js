"use strict";(()=>{const A=window.WINTERWATCH_LESSONS,E=window.WINTERWATCH_SOURCES,vt=window.
WINTERWATCH_DATES,la=window.WINTERWATCH_ARTWORK||{},ca=window.WINTERWATCH_LESSON_VISUALS||
{},D=window.WINTERWATCH_ENGINE,S=window.WINTERWATCH_GAMES,re=window.WINTERWATCH_COUNTRIES,
Ae=window.WINTERWATCH_JURISDICTIONS,o=(e,t=document)=>t.querySelector(e),B=(e,t=document)=>[
...t.querySelectorAll(e)],r=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;",
"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),De=e=>{try{if(typeof e!="st\
ring"||/[\u0000-\u0020\u007f]/.test(e))return"#";const t=new URL(e);return t.protocol===
"https:"&&!t.username&&!t.password?t.href:"#"}catch{return"#"}},b=(e,t)=>{const a=E[e];
return`<a href="${r(De(a.url))}" target="_blank" rel="noopener noreferrer">${r(t||
a.title)} ↗</a>`},Te=D.empty,Z="winterwatch-2026-progress-v3";let T="ready",K=null,
Xe=!1,P=0,le=!1;function da(e){if(typeof e!="string"||e.length>12e3)throw Error(
"Invalid progress record");const t=JSON.parse(e);if(!t||t.version!==3)throw Error(
"Unsupported progress record");const a=D.restore(t);return a.generation=Number.isSafeInteger(
t.generation)&&t.generation>0?t.generation:0,a}function Ee(){const e=localStorage.
getItem(Z);if(e===null)return{raw:e,progress:Te(),generation:0,status:"ready"};try{
const t=da(e);return{raw:e,progress:t,generation:t.generation,status:t.opened.length?
"saved":"ready"}}catch{return{raw:e,progress:Te(),generation:0,status:"corrupt"}}}
function ua(){try{const e=Ee();return P=e.generation,K=e.raw,T=e.status,e.progress}catch{
return T="unavailable",Te()}}function wt(e){const t=globalThis.navigator?.locks;
return t?t.request(Z,e):new Promise((a,n)=>{const s=indexedDB.open(Z+"-lock",1);
s.onupgradeneeded=()=>s.result.createObjectStore("writers"),s.onerror=()=>n(s.error),
s.onsuccess=()=>{const i=s.result,l=i.transaction("writers","readwrite");l.oncomplete=
()=>{i.close(),a()},l.onabort=()=>{i.close(),n(l.error||Error("Write interrupted"))},
l.objectStore("writers").count().onsuccess=()=>{try{e()}catch(d){l.abort(),n(d)}}}})}
function Ze(e,t){const a=t?e.progress:D.mergeProgress(e.progress,D.snapshot(c)),
n=JSON.stringify(D.snapshot(c))!==JSON.stringify(D.snapshot(a)),{audience:s,country:i,
context:l,ambience:d}=c;P=e.generation,K=e.raw,T=e.status,Object.assign(c,a,{audience:s,
country:i,context:l,ambience:d}),(n||t)&&(t&&(G={},q=null),clearTimeout(ce),O=[],
Se=new Set(F().filter(u=>u.earned).map(u=>u.id)),x(),o("#lessonDialog").open?(v=
D.firstUnsolved(c,g),I()):o("#infoDialog").open&&M==="progress"&&ea()),se()}function $t(){
try{const e=Ee();if(e.raw===K)return;Ze(e,e.generation!==P||e.raw===null||e.status===
"corrupt")}catch{T="unavailable",se()}}function pa(){const e=D.snapshot(c),t=P;if(le||
!e.opened.length)return;const a=n=>JSON.stringify(t?{...n,generation:t}:n);a(e)!==
K&&wt(()=>{const n=Ee();if(le||t!==P)return;if(n.generation!==t||n.raw===null&&K!==
null){Ze(n,!0);return}const s=D.mergeProgress(n.progress,e),i=a(D.snapshot(s));i!==
n.raw&&localStorage.setItem(Z,i),Xe=!1,Ze({raw:i,progress:s,generation:t,status:"\
saved"},!1)}).catch(()=>{T="unavailable",se(),Xe||(Xe=!0,w("Progress could not b\
e saved. Check whether this browser allows site storage."))})}async function ha(){
le=!0;try{await wt(()=>{const e=Ee(),t=e.generation===Number.MAX_SAFE_INTEGER?1:
e.generation+1,a=JSON.stringify({version:3,generation:t});localStorage.setItem(Z,
a),K=a,P=t,T="ready"})}catch{T="unavailable"}finally{le=!1}}function kt(){return T===
"saved"?"Saved on this device":T==="ready"?"Progress saves on this device":T==="\
corrupt"?"Saved progress could not be read":"Not saved · browser storage unavail\
able"}function At(){return T==="unavailable"?"This browser is not saving progres\
s. Allow site storage to keep it after reload.":T==="corrupt"?"The saved record \
could not be read. New progress can be saved; Reset progress removes the unreada\
ble record.":"Completed quests and decisions, reading bonuses and streak dates/c\
ounts are saved only in this browser."}let c=ua(),Se=new Set(F().filter(e=>e.earned).
map(e=>e.id)),O=[],ce=null,Ke=null,Je=null;function Dt(){const e=document.activeElement;
if(e?.closest?.("#lessonDialog"))return Ke;if(e?.closest?.("#infoDialog"))return Je;
if(e?.closest?.("#mainNav")&&window.matchMedia("(max-width: 800px)").matches)return{
element:o("#menuToggle")};const t=Number(e?.dataset?.door);return Number.isInteger(
t)&&t>=1&&t<=24?{selector:`[data-door="${t}"]`}:{element:e}}function J(e){const t=e?.
selector?o(e.selector):e?.element;t&&t!==document.body&&t.isConnected!==!1&&(!t.
getClientRects||t.getClientRects().length)?t.focus({preventScroll:!0}):o("#calen\
darTitle").focus({preventScroll:!0})}function de(e,t=!1){o(".site-header").classList.
toggle("menu-open",e),o("#menuToggle").setAttribute("aria-expanded",String(e)),t&&
o("#menuToggle").focus()}let Qe="all",g=null,C="play",j=c.audience==="everyone"?
"technical":c.audience,v=0,G={},q=null,M="",Tt=null,fa=null,y=null,Ce="",Re=null;
const et={cyber:"Cybersecurity",ai:"AI & agents",privacy:"Privacy",governance:"R\
ules & standards",ot:"Connected world"},Q="This content has been developed using\
 AI tools by members of the ENISA Ad Hoc Working Group (ARCH AHWG) to support aw\
areness-raising and cyber hygiene initiatives. It does not constitute official E\
NISA guidance or formal regulatory advice.",ue="https://www.enisa.europa.eu/topi\
cs/awareness-and-cyber-hygiene/ar-in-a-box";function Et(){return`<div class="pub\
lisher-card"><img src="assets/winterwatch-mark.svg" alt="" width="40" height="40\
"><p><b>${r(Q)}</b><br><a href="${ue}" target="_blank" rel="noopener noreferrer"\
>Learn more about AR-in-a-Box →</a></p></div>`}const ga=(e=new Date)=>{const t=new Intl.
DateTimeFormat("en-GB",{timeZone:"Etc/GMT-1",year:"numeric",month:"2-digit",day:"\
2-digit"}).formatToParts(e);return Object.fromEntries(t.map(a=>[a.type,a.value]))},
ee=(e=new Date)=>{const t=ga(e);return`${t.year}-${t.month}-${t.day}`};let St=null,
te=!1;function Ct(e=new Date){const t=Object.fromEntries(new Intl.DateTimeFormat(
"en-GB",{timeZone:"Etc/GMT-1",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(
e).map(l=>[l.type,l.value])),a=Date.UTC(Number(t.year),Number(t.month)-1,Number(
t.day)),n=Date.UTC(2026,11,1),s=Date.UTC(2026,11,24);if(a<n)return{phase:"before",
day:0,remaining:24,untilStart:Math.round((n-a)/864e5)};if(a>s)return{phase:"afte\
r",day:24,remaining:0,untilStart:0};const i=Number(t.day);return{phase:"during",
day:i,remaining:24-i,untilStart:0}}const Rt=(e=new Date)=>new Date(e.getTime()-9*
36e5),ae=(e=new Date)=>ee(Rt(e)),Ie=(e=new Date)=>Ct(Rt(e));function ba(e=new Date){
const t=ae(e);return new Date(Date.parse(t+"T08:00:00Z")+864e5)}function It(e,t=new Date){
return ee(e)===ee(t)?"Come back at 09:00 CET.":"Come back tomorrow at 09:00 CET."}
function tt(e=new Date){const t=e.getTime();return A.filter(a=>Date.UTC(2026,11,
a.id,8)>=t)}function pe(e,t){return Object.freeze({src:"assets/ambassador-"+e+".\
webp",alt:"NESTOR "+t+" on the Awareness Raising Ambassador badge. Cybersecurity\
. Powered by ENISA."})}const ma=pe("family","in adult and child forms"),xt=Object.
freeze([pe("adult-female","in adult female form wearing a burgundy sweater"),pe(
"adult-male","in adult male form wearing a green sweater"),pe("child-female","in\
 child female form with a red sweater and pink flower"),pe("child-male","in chil\
d male form wearing a blue sweater")]),ya={};function va(e=new Date){const t=Ie(
e),a=t.phase==="during"?A.find(n=>n.id===t.day):null;return{...t,lesson:a,host:a?
xt[(a.id-1)%xt.length]:ma,brief:a?ya[a.id]||a.takeaway:""}}function wa(e=new Date){
const t=va(e),a=t.lesson,n=(l,d)=>{const u=o(l);u&&u.textContent!==d&&(u.textContent=
d)};n("#adventReminderKicker",a?`DAY ${a.id} · LEARN WITH NESTOR`:t.phase==="af\
ter"?"KEEP LEARNING WITH NESTOR":"A DAILY HELLO FROM NESTOR"),n("#adventTitleMai\
n",a?a.title:t.phase==="after"?"Keep your good habits.":"A little reminder.");const s=o(
"#adventTitleAccent");s&&(s.hidden=!!a),n("#adventTitleAccent",t.phase==="after"?
"A wiser year ahead.":"A wiser December."),n("#adventReminderBrief",a?t.brief:t.
phase==="after"?"NESTOR is here for a refresher. Revisit any day or finish misse\
d lessons at your own pace.":"Meet NESTOR in different forms. One guide, one use\
ful habit and ten minutes of festive learning each day."),n("#nestorRibbonKicker",
a?`DAY ${a.id} WITH NESTOR`:"ONE NESTOR. MANY FORMS."),n("#nestorRibbonDate",a?`${a.
id} December 2026`:"1–24 December 2026");const i=o("#adventHostImage");i&&i.getAttribute(
"src")!==t.host.src&&(window.WINTERWATCH_PORTRAIT?.select(t.host.src),i.setAttribute(
"src",t.host.src),i.setAttribute("alt",t.host.alt))}function he(e=new Date){wa(e);
const t=Ct(e),a=Math.max(0,24-c.completed.length),n=tt(e),s=(u,p)=>{const h=o(u),
f=String(p);h&&h.textContent!==f&&(h.textContent=f)},i=t.phase==="before"?"Start\
s 1 December":t.phase==="after"?"Advent complete":`Day ${t.day} of 24`,l=t.phase===
"before"?"Advent days ahead":t.phase==="during"?"Days remaining after today":"Ad\
vent days remaining";s("#adventCurrentDay",i),s("#adventDaysRemaining",t.remaining),
s("#adventRemainingLabel",l),s("#adventQuestsRemaining",a),s("#adventTiming",t.phase===
"before"?`${t.untilStart} ${t.untilStart===1?"day":"days"} until Day 1 · 1–24 De\
cember 2026 · CET.`:t.phase==="after"?Ie(e).phase==="during"?"The final Advent \
door is released. All 24 lessons are available.":"All 24 lessons are available. \
Revisit any day or finish missed lessons at your own pace.":`${t.day===24?"The f\
inal Advent day is here.":`Today is Day ${t.day}.`} Doors unlock at 09:00 CET; q\
uest progress is separate.`);const d=o("[data-download-advent-reminders]");d&&(d.
disabled=te||n.length===0,d.setAttribute("aria-disabled",String(d.disabled)),d.setAttribute(
"aria-busy",String(te)),d.textContent=te?"Preparing reminders…":n.length?`Add ${n.
length} daily ${n.length===1?"reminder":"reminders"}`:"2026 reminders have ended"),
s("#adventStatusAnnouncement",`${i}. ${t.remaining} Advent ${t.remaining===1?"da\
y":"days"} remaining${t.phase==="during"?" after today":""}. ${a} ${a===1?"quest":
"quests"} left to complete.`)}function Nt(){const e=new Date;he(e),it(),clearTimeout(
St),St=setTimeout(Nt,6e4-e.getTime()%6e4)}function V(){pa(),se();const e=F().filter(
t=>t.earned&&!Se.has(t.id));for(const t of e)Se.add(t.id);e.length&&(O.push(...e),
Lt())}function Lt(){clearTimeout(ce),ce=setTimeout(()=>{const e=O;O=[],Qt(e)},3200)}
function fe(){return D.xp(c)}function w(e){o("#toast").textContent=e;const t=o("\
dialog[open] [data-dialog-status]");t&&(t.textContent=e),o("#toast").classList.add(
"show"),clearTimeout(Tt),Tt=setTimeout(()=>o("#toast").classList.remove("show"),
3200)}function xe(e=new Date){const t=Ie(e);return{...t,releasedThrough:t.phase===
"before"?0:t.day}}function ge(e,t=new Date){return e>(window.WINTERWATCH_PUBLISHED_THROUGH??
24)?!1:Number.isInteger(e)&&e>=1&&e<=24&&Number.isFinite(t.getTime())&&t.getTime()>=
Date.UTC(2026,11,e,8)}function R(e,t=new Date){return ge(e,t)}function Pt(e=new Date){
const t=xe(e);return t.day>(window.WINTERWATCH_PUBLISHED_THROUGH??24)?"Refresh t\
he calendar for the latest published door. Earlier released lessons stay availab\
le.":t.phase==="before"?"Our first door opens on 1 December 2026 at 09:00 CET. S\
ee you then!":ge(24,e)&&c.completed.length===24?"You did it! All 24 days are com\
plete. You can revisit any lesson whenever you like.":t.phase==="during"&&t.day<
24?`${t.day===1?"Day 1 is ready.":`Doors 1–${t.day} are available.`} You can p\
lay any released lesson, including days you missed. ${It(ba(e),e)} Day ${t.day+1}\
 opens on ${t.day+1} December 2026.`:"All 24 doors are available. Play any misse\
d lesson or revisit a reviewed day at your own pace."}function Ne(e,t=new Date){
if(!Number.isInteger(e)||e<1||e>24||!Number.isFinite(t.getTime()))return"";const a=Math.
max(0,Math.ceil((Date.UTC(2026,11,e,8)-t.getTime())/1e3));if(!a&&e>(window.WINTERWATCH_PUBLISHED_THROUGH??
24))return"Refresh the calendar for the latest published door.";if(!a)return"Thi\
s door is ready to open.";const n=Math.floor(a/86400),s=i=>String(i).padStart(2,
"0");return`Come back in: ${n} ${n===1?"day":"days"} ${s(Math.floor(a%86400/3600))}\
:${s(Math.floor(a%3600/60))}:${s(a%60)}.`}function Mt(e,t=new Date){const a=xe(t);
return ge(e,t)?`Day ${e} is available. You can play this lesson now.`:`${a.phase===
"during"&&e===a.day+1?It(new Date(Date.UTC(2026,11,e,8)),t)+" ":""}Day ${e} open\
s on ${e} December 2026 at 09:00 CET. ${Ne(e,t)} All released lessons remain ava\
ilable.`}function at(e,t=new Date){const a=R(e,t),n=a?`Day ${e} is now open. Clo\
se this note to explore it.`:Mt(e,t),s=o("#doorLockMessage");if(s.textContent=n,
a){s.innerHTML=`<p id="doorLockSchedule">${r(n)}</p>`;return}const i=Ne(e,t),l=n.
split(i);if(l.length!==2)return;const d=i.replace(/^Come back in: /,"").replace(
/\.$/,"");s.innerHTML=`<p id="doorLockSchedule">${r(l[0].trim())}</p><div class=\
"locked-countdown"><span>Come back in:</span> <strong role="timer" aria-live="of\
f">${r(d)}</strong></div><p>${r(l[1].trim())}</p>`}function ne(){if(clearTimeout(
Re),Re=null,document.hidden)return;(o("#doorLockDialog").open&&!R(Le)||Ce==="loc\
ked"&&y!==null)&&(Re=setTimeout($a,1e3-new Date().getTime()%1e3))}function $a(){
const e=new Date;if(o("#doorLockDialog").open&&at(Le,e),Ce==="locked")if(R(y,e))
x();else{const t=o("#santaCountdown");t&&(t.textContent=Ne(y,e))}ot!==ae(e)&&it(),
ne()}let nt=null,Le=null;function st(e){$();const t=o("#doorLockDialog");if(Le=e,
!t.open){const a=document.activeElement,n=Number(a?.dataset?.door);nt=Number.isInteger(
n)&&n>=1&&n<=24?{selector:`[data-door="${n}"]`}:{element:a}}at(e),o("#doorLockLi\
sten").dataset.listen=String(e),o("#doorLockListen").setAttribute("aria-label",`\
Listen to the Day ${e} opening message`),t.open||t.showModal(),o("#doorLockAckno\
wledge").focus({preventScroll:!0}),ne()}function ka(){if(o("#lessonDialog").open){
const e=nt?.element;e?.isConnected!==!1&&e?.closest?.("#lessonDialog")?e.focus({
preventScroll:!0}):o("#lessonDialog [data-close]")?.focus({preventScroll:!0})}else
o("#infoDialog").open?o("#infoDialog [data-close-info]")?.focus({preventScroll:!0}):
J(nt)}let ot="";function it(){if(o("#holidayDialog").open&&!Yt()&&o("#holidayDia\
log").close(),o("#welcomeDialog").open&&!Pe()&&o("#welcomeDialog").close(),o("#d\
oorLockDialog").open&&at(Le),o("#nestorDoorMessage").textContent=Pt(),ot===ae()){
Me();return}const e=Number(document.activeElement?.dataset?.door);x(),o("#lesson\
Dialog").open&&!R(g)?(o("#lessonDialog").close(),st(g)):Number.isInteger(e)&&e>=
1&&e<=24&&o(`[data-door="${e}"]`)?.focus({preventScroll:!0}),Me()}function H(){return R(
g)?!0:(o("#lessonDialog").open&&o("#lessonDialog").close(),st(g),!1)}function se(){
o("#navCount").textContent=`${fe().toLocaleString()} XP`,o(".progress-button sma\
ll").textContent=`${c.completed.length} of 24 quests · ${kt()}`,o("#progressRin\
g").style.setProperty("--progress",`${fe()/24}%`),o("#progressButton").setAttribute(
"aria-label",`View progress: ${fe()} XP, ${c.completed.length} of 24 quests comp\
lete`),he()}const Aa=e=>{const t={tree:'<path d="M32 5 18 23h8L13 39h11L9 55h46L\
40 39h11L38 23h8L32 5Z"/><path d="M29 55v8h6v-8M32 15v29"/><path d="m23 30 9 5 9\
-5m-22 15 13 5 14-5"/><circle cx="32" cy="8" r="2"/>',gift:'<path d="M10 30h44v2\
9H10zM6 21h52v10H6zM28 21h8v38"/><path d="M32 21C9 23 10 4 21 9c6 2 11 12 11 12Z\
m0 0C55 23 54 4 43 9c-6 2-11 12-11 12Z"/><path d="m31 21-9 13m11-13 9 13"/>',snowflake:'\
<path d="M32 5v54M8.6 18.5l46.8 27M8.6 45.5l46.8-27M24 10l8 8 8-8M24 54l8-8 8 8M\
10 28l11-3-3-11M54 36l-11 3 3 11M18 50l3-11-11-3M46 14l-3 11 11 3"/><circle cx="\
32" cy="32" r="7"/>',bell:'<path d="M15 46h34l-6-8V26c0-9-5-15-11-15s-11 6-11 15\
v12l-6 8ZM12 47h40M26 50c0 8 12 8 12 0M29 11V7h6v4"/><path d="M17 16c-5 4-7 8-7 \
14m37-14c5 4 7 8 7 14M21 41h23"/>',mug:'<path d="M13 25h32v23c0 11-32 11-32 0V25\
ZM45 29h5c13 0 10 18-5 18M9 58h41M22 17c-6-7 6-8 0-15m11 15c-6-7 6-8 0-15"/><pat\
h d="m23 37 6 6 9-12"/>',shield:'<path d="M32 5 52 14v19c0 16-20 27-20 27S12 49 \
12 33V14L32 5Z"/><path d="m23 32 7 7 13-17M32 11l14 7v15c0 10-14 20-14 20"/><pat\
h d="m7 8 2 4 4 1-4 1-2 4-1-4-4-1 4-1Z"/>',key:'<circle cx="24" cy="23" r="13"/>\
<circle cx="24" cy="23" r="5"/><path d="m33 33 21 21-6 6-7-7 3-3-6-6-3 3-8-8M15 \
7l-3-5m-6 15-5-1m43 1 6-2"/>',star:'<path d="m32 5 7 19 20 1-16 13 5 20-16-11-17\
 11 6-20L5 25l20-1L32 5Z"/><path d="m32 18 4 11 12 1-9 7 2 11-9-6-10 6 3-11-9-7 \
12-1 4-11Z"/>',clock:'<circle cx="32" cy="35" r="22"/><circle cx="32" cy="35" r=\
"17"/><path d="M32 22v14l9 6M26 7h12M32 7v6M50 15l4-4M14 15l-4-4"/>',sparkle:'<p\
ath d="M31 5c3 16 7 20 22 25-15 4-19 9-22 26-4-17-8-22-23-26 15-5 19-9 23-25Z"/>\
<path d="M51 2c1 7 3 10 9 12-6 2-8 5-9 11-2-6-4-9-10-11 6-2 8-5 10-12ZM12 46c1 5\
 3 7 7 8-4 1-6 3-7 8-1-5-3-7-7-8 4-1 6-3 7-8Z"/>'};return`<svg viewBox="0 0 64 6\
6" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" s\
troke-linejoin="round" aria-hidden="true">${t[e]||t.star}</svg>`};function Da(e,t=new Date){
if(!A.find(i=>i.id===e))return{status:"empty"};if(!R(e,t))return{id:e,status:"lo\
cked",done:0};const n=c.completed.includes(e),s=c.opened.includes(e);return{id:e,
status:n?"reviewed":s?"in-progress":"not-started",done:s?Math.min(3,(c.solved[e]||
[]).length):0}}function Ot(){const e=document.activeElement,t=!!e?.closest?.("#s\
antaListContent"),a=e?.id==="santaDayPicker"?"#santaDayPicker":e?.hasAttribute?.(
"data-listen-santa")?"[data-listen-santa]":"[data-open]",n=new Date,s=A.filter(f=>R(
f.id,n)),i=c.opened.filter(f=>R(f,n));A.some(f=>f.id===y)||(y=i[i.length-1]||xe(
n).releasedThrough||1);const l=Da(y,n),d=A.find(f=>f.id===y);Ce=l.status;const u={
locked:"UPCOMING DOOR","not-started":"NOT OPENED YET","in-progress":"LESSON IN P\
ROGRESS",reviewed:"REVIEWED"}[l.status];let p="";if(l.status==="locked")p=`<h3>A\
 new habit awaits.</h3><p>Day ${y} opens on ${y} December 2026 at 09:00 CET.</p>\
<p id="santaCountdown" class="santa-countdown" role="timer" aria-live="off">${r(
Ne(y,n))}</p><p>Play any released door while you wait.</p><button type="button" \
class="button button-green" data-open="${y}">Opening details for Day ${y}</butto\
n>`;else if(l.status==="reviewed"){const f=S[y].habit,L=f.filter(m=>/^Do:/i.test(
m)).map(m=>m.replace(/^Do:\s*/i,"")),k=f.filter(m=>/^Do not:/i.test(m)).map(m=>m.
replace(/^Do not:\s*/i,""));p=`<h3>${r(d.short)}</h3><section class="santa-habit\
s"><h4><span aria-hidden="true">✓</span> Nice habits</h4><ul>${L.map(m=>`<li>${r(
m)}</li>`).join("")}</ul><h4><span aria-hidden="true">×</span> Naughty traps</h4\
><ul>${k.map(m=>`<li>${r(m)}</li>`).join("")}</ul></section><p class="santa-sign\
off">Even Santa verifies twice.</p><button type="button" class="button button-gr\
een" data-open="${y}">Revisit Day ${y}</button>`}else{const f=l.status==="in-pro\
gress";p=`<h3>${r(d.short)}</h3>${f?`<p class="santa-progress">${l.done} of 3 de\
cisions complete</p><progress max="3" value="${l.done}" aria-label="Day ${y} dec\
isions complete">${l.done} of 3</progress><p>${r(T==="saved"?"Your progress is s\
aved on this device.":At())}</p>`:"<p>This door is still ready for you. Open it \
whenever you’re ready.</p>"}<div class="santa-waiting"><h4>Your habit recap is\
 waiting.</h4><p>Finish the lesson to reveal its Nice habits and Naughty traps.<\
/p></div><button type="button" class="button button-green" data-open="${y}">${f?
"Continue":"Open"} Day ${y}</button>`}o("#santaListContent").innerHTML=`<label c\
lass="santa-picker" for="santaDayPicker">Choose a door<select id="santaDayPicker\
" data-santa-select>${A.map(f=>`<option value="${f.id}" ${f.id===y?"selected":""}\
>Day ${f.id} · ${R(f.id,n)?c.completed.includes(f.id)?"reviewed":c.opened.includes(
f.id)?"in progress":"ready":"upcoming"}</option>`).join("")}</select></label><p \
class="santa-day"><span aria-hidden="true">${String(y).padStart(2,"0")}</span> D\
ay ${y} · ${r(u)}</p>${p}<button type="button" class="santa-listen" data-listen\
-santa data-listen="${y}" aria-label="Listen to Day ${y}" aria-pressed="false">${we(
"Listen")}</button>`;for(const f of B("[data-chalet-day]"))f.classList.toggle("i\
s-santa-selected",Number(f.dataset.chaletDay)===y);const h=o("#santaDayPicker");
h&&(h.value=String(y)),o("#santaStatusAnnouncement").textContent=`Santa’s list: \
Day ${y}, ${u.toLowerCase()}.`,t&&(o(a,o("#santaListContent"))||o("#santaDayPick\
er"))?.focus({preventScroll:!0}),ne()}function Ta(e){const t=e.contexts??S[e.id]?.
contexts;return c.context==="all"||t?.includes(c.context)}function Ea(e){return Object.
fromEntries(["all",...Object.keys(et)].map(t=>[t,e.filter(a=>t==="all"||a.category===
t).length]))}function x(){$();const e=A.filter(Ta);for(const[n,s]of Object.entries(
Ea(e))){const i=o(`[data-category="${n}"] [data-category-count]`);i&&(i.textContent=
n==="all"?String(s):`(${s})`)}const t=xe();y===null&&(y=c.opened.filter(n=>R(n)).
slice(-1)[0]||t.releasedThrough||1);const a=e.filter(n=>Qe==="all"||n.category===
Qe);o("#doorsGrid").innerHTML=a.map(n=>{const s=R(n.id),i=!s,l=s&&c.opened.includes(
n.id),d=s&&c.completed.includes(n.id),u=t.phase==="during"&&t.day===n.id,p=c.audience===
"everyone"?S[n.id]?.role||"Upcoming door":`${c.audience} perspective`,h=d?"compl\
eted":i?"upcoming":u?"today":l?"opened":"available",f=d?c.readings.includes(n.id)?
"Reviewed · source bonus earned":"Reviewed · lesson complete":"Opened · lesson\
 to finish",L=`Opens ${n.id} Dec · 09:00 CET`,k=d?"Reviewed":l?"In progress":i?
"Upcoming":u?"Today’s door":"Ready to open",m=i?Mt(n.id):l||d?`${f}. ${p}.`:"O\
pen this lesson.",mn=String(n.id).padStart(2,"0"),ra=`tone-${(n.id-1)%8}`;return`\
<div class="door-card ${ra}${n.id===y?" is-santa-selected":""}${i?" is-upcoming":
""}" data-chalet-day="${n.id}">
        <button class="advent-door ${ra}${l||d?" is-unwrapped":""}${u&&!d?" is-t\
oday":""}${i?" is-upcoming":""}" data-door="${n.id}" data-door-status="${h}" typ\
e="button"
          aria-label="Day ${n.id}: ${r(n.short)}. ${r(m)}" title="${r(i?L:n.title)}\
"${i?' aria-disabled="true"':""}>
          <span class="chalet-door-number">${mn}</span>
          <span class="chalet-door-title">${r(n.short)}</span>
          <span class="chalet-door-state">${d?'<span aria-hidden="true">✓</span>\
 ':""}${k}</span>
        </button>
        <button type="button" class="door-listen" data-listen="${n.id}" aria-lab\
el="Listen to Day ${n.id}" aria-pressed="false">${we("Listen")}</button>
      </div>`}).join(""),Ot(),o("#emptyState").hidden=a.length>0,o("#announcer").
textContent=`${a.length} lessons shown`,o("#modeLabel").textContent=t.phase==="b\
efore"?"A daily December tradition.":t.phase==="during"?`Day ${t.day} of 24 · da\
ily unlock at 09:00 CET.`:"All 24 lessons are available.",o("#modeDetail").textContent=
"Released lessons stay available. A new door opens at 09:00 CET.",o("#nestorDoor\
Message").textContent=Pt(),o("#contextFilter").value=c.context,ot=ae(),B("[data-\
audience]").forEach(n=>{const s=n.dataset.audience===c.audience;n.classList.toggle(
"active",s),n.setAttribute("aria-pressed",s)})}function z(e){if($(),!A.find(s=>s.
id===e))return;if(y=e,Ot(),!R(e)){st(e),!o("#lessonDialog").open&&/^#day=/.test(
location.hash)&&history.replaceState(null,"","#calendar");return}o("#lessonDialo\
g").open||(Ke=Dt()),o("#welcomeDialog").open&&o("#welcomeDialog").close(),o("#ho\
lidayDialog").open&&rt==="christmas"&&o("#holidayDialog").close(),de(!1);const a=c.
opened.includes(e);a||(c.opened.push(e),V(),w("+10 XP · A little wiser already.")),
o("#infoDialog").open&&o("#infoDialog").close(),g=e,C="play",v=D.firstUnsolved(c,
e),q=null,j=c.audience==="everyone"?"technical":c.audience,I(),o("#lessonDialog").
open||o("#lessonDialog").showModal(),history.replaceState(null,"",`#day=${e}`),x(),
e===24&&!Ht?ct():e===1&&!a&&!lt&&Pe()&&Bt()}let Ht=!1,Wt=!1,be=null,rt="lesson",
lt=!1,Ut=null,Ft=!1;function Pe(e=new Date){const t=Ie(e);return t.phase==="duri\
ng"&&t.day===1&&ge(1,e)}function Yt(e=rt,t=new Date){return e==="christmas"?ee(t)===
"2026-12-25"&&ge(24,t):e==="lesson"&&g===24&&o("#lessonDialog").open&&R(24,t)}function ct(e="\
lesson"){if(!Yt(e))return;$();const t=o("#holidayDialog");t.open||(be=document.activeElement),
rt=e,Ht=!0,ee()==="2026-12-25"&&(Wt=!0),o("#holidayKicker").textContent=e==="chr\
istmas"?"25 DECEMBER · A FESTIVE HELLO FROM NESTOR":"DAY 24 · A FESTIVE HELLO F\
ROM NESTOR",o("#holidayAcknowledge").textContent=e==="christmas"?"Continue the c\
alendar":"Back to Day 24",t.open||t.showModal(),t.scrollTop=0,o("#holidayClose").
focus({preventScroll:!0})}function Sa(){o("#lessonDialog").open?be?.isConnected!==
!1&&be?.closest?.("#lessonDialog")?be.focus({preventScroll:!0}):o("#lessonDialog\
 [data-holiday-greeting]")?.focus({preventScroll:!0}):J({element:be})}function Bt(){
if(!Pe())return;$();const e=o("#welcomeDialog");e.open||(Ut=document.activeElement),
lt=!0,e.open||e.showModal(),e.scrollTop=0,o("#welcomeClose").focus({preventScroll:!0})}
function Ca(){o("#lessonDialog").open?o("#lessonDialog [data-close]")?.focus({preventScroll:!0}):
J({element:Ut})}function Me(){if(!(!Ft||["#lessonDialog","#infoDialog","#doorLoc\
kDialog","#holidayDialog","#welcomeDialog","#accessibilityDialog"].some(e=>o(e).
open))){if(ee()==="2026-12-25"&&!Wt){ct("christmas");return}Pe()&&!lt&&!c.opened.
includes(1)&&!c.completed.includes(1)&&Bt()}}function oe(){queueMicrotask(Me)}function Ra(e){
return typeof e=="string"&&/^assets\/lessons\/[a-z0-9-]+\.webp$/.test(e)?e:""}function W(e){
const t=ca[e.id],a=t&&la[t.artwork];return a&&Ra(a.src)?{...t,...a}:null}function Ia(e){
const t=W(e);return t?`<figure class="lesson-visual"><div class="lesson-visual-i\
mage"><img src="${r(t.src)}" alt="${r(t.alt)}" width="1536" height="1024" decodi\
ng="async"><span class="artwork-label">ILLUSTRATIVE ARTWORK</span></div><figcapt\
ion><div class="lab-kicker">SEE THE LESSON</div><p class="visual-caption">${r(t.
caption)}</p><dl>${[["The risk",t.risk],["The signal",t.signal],["Your action",t.
action]].map(([a,n])=>`<div><dt>${a}</dt><dd>${r(n)}</dd></div>`).join("")}</dl>\
<small>AI-generated concept scene, not an incident photograph.</small></figcapti\
on></figure>`:""}function xa(e){const t=W(e);return t?`<div class="illustrated-c\
ard-hint"><img src="${r(t.src)}" alt="${r(t.alt)}" width="93" height="62" loadin\
g="lazy"><span>Your lesson illustration is included in both card formats.<small>\
Square: 1080 × 1080 · Status: 1080 × 1920 · labelled AI-generated.</small></span\
></div>`:""}const Na=Math.floor(Math.random()*4294967296)||1;function Oe(e,t){const a=Array.
from({length:e},(n,s)=>s);t=(t^Na)>>>0||1,t=Math.imul(t^t>>>16,73244475)>>>0,t=Math.
imul(t^t>>>16,73244475)>>>0,t=(t^t>>>16)>>>0||1;for(let n=e-1;n>0;n--){t^=t<<13,
t^=t>>>17,t^=t<<5;const s=Math.floor((t>>>0)/4294967296*(n+1));[a[n],a[s]]=[a[s],
a[n]]}return a}function jt(e,t){return Oe(e.options.length,t)}function La(e,t){const a=Oe(
e,t);return e>1&&a.every((n,s)=>n===s)&&([a[0],a[1]]=[a[1],a[0]]),a}function U(e,t,a=!1){
const n=`${e}-${t}`,s=S[e].steps[t];if(!G[n]){const i=!a&&c.solved[e]?.includes(
t);G[n]={selected:[],order:s.kind==="order"?La(s.items.length,e*97+t*19):[],habits:s.
kind==="habits"?s.cards.map(l=>null):[],hint:!1,response:null,result:i?{correct:!0,
earned:0,revisit:!0}:null}}return G[n]}function Pa(e){return`<div class="framewo\
rk-notes"><span>CONNECT THE LESSON</span>${S[e.id].frameworks.map(t=>`<div><b>${b(
t.source,t.code)}</b><p>${r(t.why)}</p></div>`).join("")}</div>`}function Ma(e,t){
if(!t.result)return"";{const a=t.result,n=a.correct?'<button class="button butto\
n-green" data-next-stage>Continue →</button>':'<button class="button button-gr\
een" data-retry-step>Try again →</button>';return`<div class="decision-feedbac\
k" role="status" tabindex="-1"><p>${r(a.feedback||(a.correct?"Decision completed\
.":"Try again."))}</p>${n}</div>`}}function Oa(e){const t=S[e.id],a=W(e),n=c.completed.
includes(e.id),s=c.readings.includes(e.id),i=`<div class="game-stage-track" aria\
-label="Daily decision progress">${t.steps.map((k,m)=>`<button data-stage="${m}"\
 ${m>D.firstUnsolved(c,e.id)?"disabled":""} class="${c.solved[e.id]?.includes(m)?
"solved":""} ${v===m?"current":""}"><span>${c.solved[e.id]?.includes(m)?"✦":String(
m+1).padStart(2,"0")}</span><small>${r(["Understand","Decide","Protect"][m])}</s\
mall></button>`).join("")}<div><b>${me(e.id)}</b><small>/100 XP</small></div></d\
iv>`,l=`<div class="game-cover">${a?`<img src="${r(a.src)}" alt="${r(a.alt)}" wi\
dth="400" height="267" decoding="async">`:""}<div><span class="game-role">${r(t.
role)}</span><p>${r(t.setup)}</p><small>Illustrative choices with feedback · sou\
rce facts in the case file</small></div></div>`;if(v>=3&&n)return`${i}<section c\
lass="day-reward" data-day-reward tabindex="-1"><div class="reward-wreath" aria-\
hidden="true"><span>✦</span><i></i><i></i><i></i></div><div class="lab-kicker">D\
AY ${e.id} PROTECTED · ${s?"100":"80"} XP</div><h3>You made the decisions.<br>N\
ow make the habit stick.</h3><p>${r(e.takeaway)}</p><div class="reward-habits">${t.
habit.map(k=>`<p>${r(k)}</p>`).join("")}</div><div class="reward-buttons"><butto\
n class="button button-green" data-tab="sources">${s?"Revisit your source bonus":
"Unwrap the reading bonus · +20 XP"} →</button><button class="button button-sof\
t" data-replay-day>Replay decisions</button></div><button class="subtle-button" \
data-celebrate="day">Replay the celebration ✧</button></section>${Pa(e)}`;const d=Math.
min(v,2),u=t.steps[d],p=U(e.id,d),h=!!p.result;let f="";const L={select:"Check m\
y decision",order:"Check the sequence",habits:"Check my habits"}[u.kind];return u.
kind==="choice"&&(f=`<div class="decision-options">${jt(u,e.id*13+d*7).map((k,m)=>`\
<button data-game-choice="${k}" ${h?"disabled":""} class="${h&&p.response===k?"c\
hosen":""}"><span>${String.fromCharCode(65+m)}</span><span class="decision-optio\
n-text">${r(u.options[k].text)}</span><i aria-hidden="true">↗</i></button>`).join(
"")}</div>`),u.kind==="select"&&(f=`<p class="interaction-hint">Choose every use\
ful option, then check your decision.</p><div class="evidence-options">${Oe(u.options.
length,e.id*13+d*7).map(k=>`<button role="checkbox" aria-checked="${p.selected.includes(
k)}" data-evidence-option="${k}" ${h?"disabled":""}><span>${p.selected.includes(
k)?"✓":"+"}</span>${r(u.options[k].text)}</button>`).join("")}</div>`),u.kind===
"order"&&(f=`<p class="interaction-hint">Move the cards into sequence. The arrow\
 controls also work with a keyboard.</p><ol class="sequence-cards">${p.order.map(
(k,m)=>`<li><span class="sequence-position">${m+1}</span><p>${r(u.items[k].text)}\
</p><div><button data-order-from="${m}" data-order-direction="-1" ${h||m===0?"di\
sabled":""} aria-label="Move item ${m+1} up">↑</button><button data-order-from="${m}\
" data-order-direction="1" ${h||m===p.order.length-1?"disabled":""} aria-label="\
Move item ${m+1} down">↓</button></div></li>`).join("")}</ol>`),u.kind==="habi\
ts"&&(f=`<p class="interaction-hint">Mark each move as a habit to do or a habit \
to avoid.</p><div class="habit-round">${Oe(u.cards.length,e.id*71+d*29).map(k=>{
const m=u.cards[k];return`<div><p>${r(m.text)}</p><div role="group" aria-label="${r(
m.text)}"><button data-habit-index="${k}" data-habit-value="do" aria-pressed="${p.
habits[k]===!0}" ${h?"disabled":""}>Do ✓</button><button data-habit-index="${k}\
" data-habit-value="avoid" aria-pressed="${p.habits[k]===!1}" ${h?"disabled":""}\
>Do not ×</button></div></div>`}).join("")}</div>`),`${i}${l}<section class="de\
cision-round"><div class="decision-kicker"><span>DECISION ${d+1} OF 3</span><b>${c.
solved[e.id]?.includes(d)?"20 XP earned":"20 XP to discover"}</b></div><h3 tabin\
dex="-1" data-decision-title>${r(u.title)}</h3><p>${r(u.body)}</p>${f}${h?"":`<d\
iv class="decision-actions">${L?`<button type="button" class="button button-gree\
n check-decision" data-check-step>${r(L)} →</button>`:""}<button type="button"\
 class="clue-button" data-game-hint aria-expanded="${!!p.hint}" aria-controls="g\
ameClue">${p.hint?"Hide the clue":"A little clue?"} ✧</button></div><div class="\
game-clue" id="gameClue" ${p.hint?"":"hidden"}>${r(u.hint)}</div>`}${Ma(u,p)}${window.
WINTERWATCH_GRADER?"":'<p role="status">Answer checking is unavailable in this v\
iew. You can explore the questions, briefing and playbook.</p>'}</section><p cla\
ss="game-reassurance">Try, learn and try again. A wrong answer does not remove e\
arned points.</p>`}async function Gt(e,t,a){if(!window.WINTERWATCH_GRADER)return w(
"Answer checking is currently unavailable. You can still explore the briefing an\
d playbook."),null;try{const n=await window.WINTERWATCH_GRADER(e,t,a);if(typeof n?.
correct!="boolean"||typeof n.feedback!="string")throw Error();return n}catch{return w(
"Answer checking is unavailable. Please try again later."),null}}async function qt(e){
const t=A.find(i=>i.id===g);if(!t||v>2||!H())return;const a=S[t.id].steps[v],n=U(
t.id,v);if(n.result)return;const s=a.kind==="choice"?e:a.kind==="select"?n.selected:
a.kind==="order"?n.order:n.habits;if(!(a.kind==="choice"&&(!Number.isInteger(s)||
s<0||s>=a.options.length))){if(a.kind==="habits"&&s.some(i=>typeof i!="boolean")){
w("Classify each habit before checking.");return}if(a.kind==="select"&&!s.length){
w("Choose the evidence you would use.");return}n.response=Array.isArray(s)?[...s]:
s;{if(n.pending)return;n.pending=!0;const i=v,l=P,d=await Gt(t.id,i,n.response);
if(n.pending=!1,!d||g!==t.id||v!==i||P!==l||!H()||G[t.id+"-"+i]!==n)return;n.result=
{...D.recordStep(c,t.id,i,d.correct),feedback:d.feedback}}n.result.completed&&D.
recordLearningDay(c,ae()),V(),I(),x(),o(".decision-feedback")?.focus({preventScroll:!0}),
n.result.completed?dt("day"):n.result.earned&&w(`+${n.result.earned} XP · Decisi\
on unlocked.`)}}function Ha(){H()&&(v=Math.min(3,v+1),I(),o("#lessonDialog").scrollTop=
0,v===3?o("[data-day-reward]")?.focus({preventScroll:!0}):o("[data-decision-titl\
e]")?.focus({preventScroll:!0}))}function Wa(e){const t=S[e.id].reading,a=E[t.source],
n=c.readings.includes(e.id);return`<section class="reading-quest ${n?"reading-wo\
n":""}"><div class="reading-quest-top"><span class="reading-book" aria-hidden="t\
rue">▱</span><div><div class="lab-kicker">THE EVIDENCE BONUS · 20 XP</div><h3>${n?
"One source. A little more wisdom.":"Go one layer deeper."}</h3></div><b>${n?"✓ \
UNLOCKED":"+20 XP"}</b></div><p>${r(t.locator)} · ${b(t.source,"Open the primar\
y source")}</p>${a.excerpt?`<blockquote>“${r(a.excerpt)}”<cite>${r(a.excerptAt||
a.org)}</cite></blockquote>`:""}<p class="reading-question">${r(t.question)}</p>\
<div class="reading-options">${jt(t,e.id*43).map(s=>`<button data-reading-answer\
="${s}" ${n?"disabled":""} class="">${r(t.options[s].text)}</button>`).join("")}\
</div><div class="reading-feedback" role="status" tabindex="-1">${n?"✦ Evidence \
bonus earned. "+r(q||"Reading completed."):q?r(q):"Read, connect the evidence an\
d choose the best answer. Points reward the answer, not a claim that an external\
 page was read."}</div>${n?'<button class="subtle-button" data-celebrate="readin\
g">Replay the reading celebration ✧</button>':""}</section>`}async function Ua(e){
const t=A.find(s=>s.id===g);if(!t||!H())return;const a=S[t.id].reading;let n;{const s=P,
i=await Gt(t.id,3,e);if(!i||g!==t.id||s!==P||!H())return;n=D.recordReading(c,t.id,
i.correct),q=i.feedback}n.earned&&(V(),x()),I(),o(".reading-feedback")?.focus({preventScroll:!0}),
n.earned&&dt("reading")}function dt(e,t=!1){if(!["day","reading"].includes(e)||(O.
length&&Lt(),w(t?"Celebration replayed · your earned points stay the same.":e===
"day"?`Day ${g} complete · ${me(g)} XP earned.`:"Evidence bonus unlocked · +20 \
XP."),ie()))return;const a=document.createElement("div");a.className=`celebratio\
n-layer ${e==="reading"?"reading-celebration":"day-celebration"}`,a.setAttribute(
"aria-hidden","true"),a.innerHTML=`<div class="celebration-emblem">${e==="readin\
g"?"▱":"✦"}<span>${e==="reading"?"A LITTLE MORE WISDOM":"DAY "+g+" PROTECTED"}\
</span></div>${Array.from({length:e==="reading"?9:22},(n,s)=>`<i style="--x:${5+
s*37%90}%;--size:${14+s%4*7}px;--delay:${s%6*45}ms">${s%3===0?"✧":s%3===1?"❄":
"✦"}</i>`).join("")}`,B(".celebration-layer").forEach(n=>n.remove()),(o("#less\
onDialog").open?o("#lessonDialog"):document.body).append(a),setTimeout(()=>a.remove(),
e==="reading"?2e3:2600)}function Fa(e){const t=S[e.id].legal||[];return t.length?
`<div class="legal-brief"><div class="lab-kicker">FROM THE RULE TO THE DECISION<\
/div>${t.map(a=>`<article><b>${b(a.source,a.article)}</b><blockquote>“${r(a.excerpt)}\
”</blockquote><p>${r(a.meaning)}</p></article>`).join("")}<small>Short excerpt\
s need the full article, legal role, national context and current application da\
te.</small></div>`:""}function Ya(){return'<section class="jurisdiction-atlas" a\
ria-label="Country training profiles"><div class="atlas-heading"><div><div class\
="lab-kicker">EXPLORE THE JURISDICTION</div><h3>One world. Different duties.</h3\
></div><span class="publisher-name">ENISA ARCH-AHWG</span></div><img src="assets\
/training-jurisdictions.svg" width="900" height="400" alt="World overview and Eu\
rope detail highlighting Belgium, Finland, France, Germany, Ireland, Italy, Neth\
erlands and Spain."><p>Eight detailed NIS2 profiles. All 27 EU countries can be \
selected using the tiles or list; this does not detect your location or determin\
e which law applies.</p><p class="source-note">Generalised boundaries: <a href="\
https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noope\
ner noreferrer">Natural Earth, public domain ↗</a>. Highlighting shows this edit\
ion’s coverage, not legal status.</p></section>'}function ut(e=!1){return`<div\
 class="country-prompt"><h3>Choose your country to find official contacts.</h3><\
p>Select a country on the map or in the list. Then match the incident to the rou\
te below and confirm the responsible authority, entity and sector. Your choice s\
tays in this page; it does not detect your location.</p></div><label class="coun\
try-select">Country for this exercise <select data-country-select><option value=\
"" disabled ${c.country?"":"selected"}>Select your country…</option>${Ae.map(t=>`\
<option value="${t.id}" ${t.id===c.country?"selected":""}>${r(t.name)}</option>`).
join("")}</select></label><details class="country-atlas-inline" ${e?"open":""}><\
summary>About the eight detailed country profiles</summary>${Ya()}</details>`}function pt(){
const e=Ae.find(a=>a.id===c.country),t=re.find(a=>a.id===c.country);return e?`<s\
ection class="country-card"><p class="country-selection-status" role="status">Sh\
owing contact routes for <b>${r(e.name)}</b>.</p><h3>Match the issue to the resp\
onsible party.</h3>${t?"":`<p>This edition has no detailed NIS2 profile for ${r(
e.name)}. Use the official directories below to find its current authorities; no\
 national commencement or deadline is assumed.</p>`}<div class="stakeholder-card\
s"><article><b>Cyber incident · national CSIRT / competent authority</b><p>${t?
`${r(t.authority)}. <a href="${r(De(t.report))}" target="_blank" rel="noopener n\
oreferrer">${r(t.reportLabel)} ↗</a>`:`${b("csirts","Open the national CSIRT d\
irectory")} and find ${r(e.name)}`}. Confirm the designated reporting channel, s\
ignificance threshold and entity scope.</p></article><article><b>Personal-data b\
reach · competent DPA</b><p>${t?`<a href="${r(De(t.privacy))}" target="_blank" \
rel="noopener noreferrer">${r(t.privacyLabel)} ↗</a>`:`${b("dpas","Open the ED\
PB authority directory")} and find ${r(e.name)}`}. Confirm competence for the co\
ntroller and any cross-border processing; a processor informs its controller.</p\
></article><article><b>Financial services · sector authority</b><p>Covered finan\
cial entities use their competent authority’s DORA process${t?.financial?` · <\
a href="${r(De(t.financial))}" target="_blank" rel="noopener noreferrer">${r(t.financialLabel)}\
 ↗</a>`:""}. Confirm the entity’s supervisor and current reporting procedure.<\
/p></article><article><b>Connected product · manufacturer reporting</b><p>Applic\
able manufacturers follow the ${b("cra","CRA Single Reporting Platform guidance")}\
. Assess the product role and reporting trigger separately.</p></article><articl\
e><b>AI issue · designated national authority</b><p>${b("aiNational","Open AI A\
ct national resources")} and select ${r(e.name)}. Check the AI use, operator rol\
e and current competent authority.</p></article><article><b>Suspected crime · na\
tional police</b><p>${b("police","Find national cybercrime reporting routes")} f\
or ${r(e.name)}. Europol’s directory points to national routes; it is not a publ\
ic incident-reporting desk.</p></article></div><p class="source-note">Country se\
lection does not decide entity scope, DPA competence or every applicable reporti\
ng duty. More than one route may apply. Confirm recipients from official sources\
 before sharing sensitive information.</p></section>`:'<section class="country-c\
ard"><h3>Choose a country to view contact routes.</h3><p>No jurisdiction is assu\
med. For a cross-border organisation, involve privacy / legal to establish the c\
ompetent authorities.</p></section>'}function Vt(){const e=re.find(t=>t.id===c.country);
return e?`${pt()}<section class="country-card"><div class="country-card-heading"\
><span>${r(e.status)}</span><h3>${r(e.name)} · NIS2 profile</h3>${e.effective?`\
<p>National NIS2 commencement: <b>${gt(e.effective)}</b></p>`:"<p>Check for a cu\
rrent enacted NIS2 commencement date in the official sources.</p>"}</div><p>${r(
e.note)}</p>${e.milestones.length?`<div class="national-milestones">${e.milestones.
map(t=>`<div><time>${gt(t.date)}</time><b>${r(t.name)}</b><p>${r(t.detail)} ${b(
t.source,"Source")}</p></div>`).join("")}</div>`:""}<p class="source-note">${b(e.
source,"Read the national source")}. Verify current scope, enactment and later c\
hanges before relying on these dates.</p></section>`:pt()}function Ba(e){const t=W(
e);return`<div class="incident-process"><div class="lab-kicker">NIST SP 800-61 R\
EV. 3 · CSF 2.0</div><h3>Follow the incident. Keep learning.</h3><p>Detect, Resp\
ond and Recover describe incident handling. Govern, Identify and Protect support\
 preparation; improvement feeds every part. These are connected functions, not s\
ix mandatory steps in a line.</p><div class="process-cards"><article><b>01 · DET\
ECT</b><p>${r(t?.signal||"Connect relevant identity, service and data signals.")}\
</p></article><article><b>02 · RESPOND</b><p>Scope the impact, preserve evidence\
, contain affected authority and coordinate the right stakeholders.</p></article\
><article><b>03 · RECOVER</b><p>Restore a trusted, tested workflow; monitor it a\
nd communicate the recovery state.</p></article></div><p class="improve-note"><b\
>↻ Improve:</b> review the missed signal, the handoff and the control. Assign an\
d verify a corrective action. ${b("nistIR","Read the framework")}</p></div>`}function ja(e){
return`<details class="stakeholder-guide" open><summary>Who needs to be involved\
?</summary><div>${ut()}${pt()}<div class="stakeholder-cards"><article><b>Your te\
am</b><p>Incident lead, security, operations, business owner and privacy / legal\
. Record times, impact, decisions and unknowns.</p></article><article><b>Custome\
rs and suppliers</b><p>Use agreed security contacts, escalation and evidence arr\
angements. A processor informs its controller without undue delay where Article \
33(2) applies. ${b("gdpr","GDPR roles")}</p></article></div><p class="source-not\
e">Facts and assistance can be shared before the root cause is final. Use secure\
 channels and minimise unnecessary personal data or secrets.</p></div></details>`}
function Ga(e){return C==="play"||C==="mission"?Oa(e):C==="briefing"?`<button ty\
pe="button" class="briefing-listen" data-listen-panel aria-pressed="false">${we(
"Listen to this briefing")}</button>${Ia(e)}<div class="briefing-layout"><div><h\
3>What happened?</h3><p>${r(e.summary)}</p><h4>What went wrong or could go wrong\
?</h4><p>${r(e.failure)}</p><p class="source-note">Evidence: ${e.sources.slice(0,
2).map(t=>b(t,E[t].org)).join(" · ")}. Operational actions below are training r\
ecommendations.</p></div><aside class="takeaway"><div class="eyebrow">YOUR TAKEA\
WAY</div><h3>${r(e.takeaway)}</h3><p>Small actions, shared across teams. Earn up\
 to <b>100 XP</b> with this lesson.</p><button class="mission-link" data-tab="pl\
ay">Play the decisions →</button></aside></div><div class="lens-switch" role="gr\
oup" aria-label="Choose lesson perspective">${["technical","business","operation\
s"].map(t=>`<button data-lens="${t}" class="${t===j?"active":""}" aria-pressed="${t===
j}">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div><div class="lens-\
card"><b>FOR ${r(j.toUpperCase())} TEAMS</b><p>${r(e.lenses[j])}</p></div>`:C===
"timeline"?`<h3>The moments that matter.</h3><ol class="timeline">${e.timeline.map(
([t,a])=>`<li><time>${r(t)}</time><p>${r(a)}</p></li>`).join("")}</ol><div class\
="fact-callout">${/fictional/i.test(e.kind)?"This is an invented training scenar\
io.":e.kind.includes("workshop")||e.kind.includes("practice")||e.kind.includes("\
Everyday")?"Workflow moments and verified source dates are distinguished above.":
"Dates describe the cited case or legal milestone, not a live incident feed."}</\
div>`:C==="lab"?`<div class="lab-kicker">CONFIGURE · OBSERVE · VALIDATE</div><h3\
>Make the control testable.</h3><p>Tool-agnostic recipe for your SIEM, identity,\
 endpoint, network or governance workflow. Field names below are illustrative; m\
ap them to your own telemetry and permissions.</p><ol class="config-list">${e.steps.
map(t=>`<li>${r(t)}</li>`).join("")}</ol><div class="code-header"><span>ILLUSTRA\
TIVE LOGIC · NOT A DROP-IN RULE</span><button class="copy-button" data-copy-rule\
>Copy</button></div><pre class="code-block">${r(e.logic)}</pre>${e.hunt?`<h4>${r(
e.hunt.title)}</h4><p>${r(e.hunt.setup)}</p><div class="code-header"><span>READ-\
ONLY KQL · TUNE BEFORE ALERTING</span><button class="copy-button" data-copy-hunt\
>Copy</button></div><pre class="code-block">${r(e.hunt.code)}</pre>`:""}<div cla\
ss="lab-meta"><div><h4>Safe validation</h4><p>${r(e.test)}</p></div><div><h4>Tun\
ing & visibility limits</h4><p>${r(e.noise)}</p></div></div><div class="fact-cal\
lout lab-callout">Use written authorisation, agreed scope and synthetic data. Va\
lidate telemetry and thresholds before enabling blocking. Product-specific deplo\
yment steps must follow current vendor documentation.</div>`:C==="playbook"?`${Ba(
e)}${ja(e)}<h3>A calm plan for a difficult moment.</h3><p>Adapt the sequence to \
your incident severity and safety needs. Record times, decisions, evidence and u\
nknowns.</p><ol class="playbook-list">${e.response.map(t=>{const[a,...n]=t.split(
" · ");return`<li><b>${r(a)}</b><p>${r(n.join(" · "))}</p></li>`}).join("")}</\
ol><div class="response-footer"><p>Consider customer / supplier contracts, data \
protection, sector rules and criminal reporting separately.</p><div class="playb\
ook-downloads"><button class="button button-green" data-download-playbook>Downlo\
ad Christmas playbook (PDF) ↓</button><button class="subtle-button" data-downloa\
d-playbook-text>Plain-text version ↓</button><small>A4 PDF · public lesson conte\
nt · no learner progress</small></div></div><button class="subtle-button" data-r\
eporting>Authority routes & reporting clocks →</button>`:`${Wa(e)}${Fa(e)}<h3>\
Read more. Make the connection.</h3><p>Primary sources and official guidance. Di\
stinguish reported evidence, provider assessments, legal duties and our training\
 recommendations.</p><ul class="source-list">${e.sources.map(t=>{const a=E[t];return`\
<li>${b(t)}<small>${r(a.org)} · ${r(a.kind)}</small>${a.excerpt?`<blockquote>“${r(
a.excerpt)}”<cite>${r(a.excerptAt||a.org)}</cite></blockquote>`:""}<p><b>Read \
& reflect:</b> ${r(a.activity)}</p></li>`}).join("")}</ul><p class="source-note"\
>ISO excerpts come only from public overview pages; the licensed standards are n\
eeded for exact requirements. Legal scope, national procedures and later changes\
 need checking for an actual organisation.</p><div class="share-box"><div class=\
"lab-kicker">GOOD IDEAS ARE BETTER SHARED</div><h3>Send a little wisdom.</h3>${xa(
e)}<label class="share-label" for="shareDraft">Public lesson post</label><textar\
ea id="shareDraft" rows="7" readonly autocomplete="off" spellcheck="false">${r(We(
e))}</textarea><div class="share-actions"><button class="button button-green" da\
ta-linkedin>in &nbsp; LinkedIn ↗</button><button data-copy-post>Copy post</butto\
n><button data-card="square">Square card ↓</button><button data-card="status">St\
atus card ↓</button><button data-native-share>Share…</button></div><p class="sou\
rce-note">Sharing uses public lesson content only. The post is copied first, the\
n LinkedIn opens this public lesson. If a popup is blocked, use the link below. \
Edit it in your social app. Source and social platforms handle visits under thei\
r own privacy terms. Nothing posts automatically.</p><p class="source-note"><a h\
ref="${r(zt(e))}" target="_blank" rel="noopener noreferrer">Open LinkedIn after \
copying the post ↗</a></p></div>`}function me(e){return D.dayXp(c,e)}function I(){
$();const e=A.find(a=>a.id===g);if(!e||!H())return;const t=c.completed.includes(
e.id);o("#lessonContent").innerHTML=`<p class="sr-only" data-dialog-status role=\
"status" aria-live="polite"></p><div class="modal-heading"><button class="close-\
dialog" data-close aria-label="Close lesson">×</button><div class="modal-topline\
">DAY ${String(e.id).padStart(2,"0")} / 24 <span>·</span> ${r(et[e.category].toUpperCase())}\
<span class="status-badge">${r(e.kind)}</span></div><h2 id="lessonTitle">${r(e.title)}\
</h2><div class="lesson-access-tools"><button type="button" data-listen-panel ar\
ia-pressed="false">${we("Listen")}</button><button type="button" data-accessibil\
ity aria-label="Accessibility" aria-haspopup="dialog" aria-controls="accessibili\
tyDialog"><svg class="control-icon accessibility-icon" viewBox="0 0 24 24" fill=\
"none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-li\
nejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="1\
0"/><circle cx="12" cy="7" r="1" fill="currentColor"/><path d="m7 10 5 1 5-1m-5 \
1v5m0-2-3 4m3-4 3 4"/></svg><span class="accessibility-label">Accessibility</spa\
n></button></div><p class="listen-status" data-listen-status role="status" aria-\
live="polite"></p><p>${r(e.takeaway)} <span class="lesson-duration">${e.minutes}\
 min · ${me(e.id)} / 100 XP</span></p>${e.id===24?'<button type="button" class=\
"holiday-replay" data-holiday-greeting>Nestor’s holiday hello</button>':""}</d\
iv><div class="lesson-tabs" role="tablist" aria-label="Lesson sections">${[["pla\
y","Play the day"],["briefing","Case file"],["timeline","The story"],["lab","Def\
end"],["playbook","Respond"],["sources","Read & earn"]].map(([a,n])=>`<button ro\
le="tab" id="tab-${a}" aria-controls="lessonPanel" aria-selected="${C===a}" tabi\
ndex="${C===a?"0":"-1"}" data-tab="${a}" class="${C===a?"active":""}">${n}${a===
"play"&&t?" ✓":a==="sources"&&c.readings.includes(e.id)?" ✦":""}</button>`).
join("")}</div><div class="tab-content" id="lessonPanel" role="tabpanel" aria-la\
belledby="tab-${C}" tabindex="0">${Ga(e)}</div><div class="modal-footer"><button\
 class="complete-button ${t?"done":""}" data-return-game>${t?"✦ Day protected · "+
me(e.id)+" XP":"→ Resume the decisions"}</button><div class="day-navigation"><\
button data-prev ${e.id===1?"disabled":""} aria-label="Previous day"><span class\
="day-nav-arrow" aria-hidden="true">←</span></button><small><strong>Day ${e.id}\
</strong> of 24</small><button data-next ${e.id===24?"disabled":""} aria-label="\
Next day"><span>Next</span><span class="day-nav-arrow" aria-hidden="true">→</spa\
n></button></div></div>`}function ye(e){H()&&(e==="mission"&&(e="play"),["play",
"briefing","timeline","lab","playbook","sources"].includes(e)&&(C=e,I(),o("#less\
onDialog").scrollTop=0,o(`[role="tab"][data-tab="${e}"]`).focus({preventScroll:!0})))}
const ht="https://aware-by-design.github.io/Winterwatch-site/",He=e=>`${ht}#day=${e}`,
zt=e=>"https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(
He(e.id));function We(e){return`Day ${e.id}/24 · Winterwatch Cyber & AI Advent

${e.title}

Today’s takeaway: ${e.takeaway}

One action: ${e.lenses[c.audience==="everyone"?"operations":c.audience]}

${/fictional/i.test(e.kind)?"Fictional training scenario, informed by "+E[e.sources[0]].
org+".":`Source: ${E[e.sources[0]].org}.`}
${E[e.sources[0]].url}

Play this lesson: ${He(e.id)}

#CyberSecurity #AI #Privacy #Winterwatch

${Q}
Learn more about AR-in-a-Box: ${ue}`}async function Ue(e,t="Copied."){try{return await navigator.
clipboard.writeText(e),w(t),!0}catch{return w("Clipboard unavailable. Select and\
 copy the text shown."),!1}}function Fe(e,t){const a=URL.createObjectURL(e),n=document.
createElement("a");n.href=a,n.download=t,document.body.append(n),n.click(),n.remove(),
setTimeout(()=>URL.revokeObjectURL(a),3e4)}function _t(e,t){Fe(new Blob([e],{type:"\
text/calendar;charset=utf-8"}),t)}function qa(e){return Number.isInteger(e)&&e>=
1&&e<=24?`assets/playbooks/winterwatch-day-${String(e).padStart(2,"0")}-playbook\
.pdf?edition=ai-attribution-20261125`:""}function Va(e){const t=qa(e?.id);if(!t){
w("Playbook unavailable.");return}const a=document.createElement("a");a.href=t,a.
download=t.split("/").pop().split("?")[0],document.body.append(a),a.click(),a.remove(),
w("Your Christmas PDF playbook download is ready.")}function za(e){return`WINTER\
WATCH · DAY ${e.id}
${e.title}

${e.kind}

BRIEFING
${e.summary}

TAKEAWAY
${e.takeaway}

TECHNICAL
${e.lenses.technical}

BUSINESS
${e.lenses.business}

OPERATIONS
${e.lenses.operations}

CONTROL RECIPE (illustrative; map to your telemetry)
${e.steps.map((t,a)=>`${a+1}. ${t}`).join(`
`)}

${e.logic}

SAFE VALIDATION
${e.test}

LIMITATIONS
${e.noise}

PLAYBOOK
${e.response.map((t,a)=>`${a+1}. ${t}`).join(`
`)}

LEARNING DECISIONS
${S[e.id].steps.map((t,a)=>`${a+1}. ${t.title}: ${t.success}`).join(`
`)}

READ MORE
${e.sources.map(t=>`${E[t].title}
${E[t].url}
Activity: ${E[t].activity}`).join(`

`)}

Training recommendations are separate from source findings. Confirm current lega\
l scope and product documentation. Test only with explicit authorisation and agr\
eed scope.

${Q}
Learn more about AR-in-a-Box: ${ue}
`}const Ye=new Map;function Xt(e){const t=W(e);return t?(Ye.has(t.src)||Ye.set(t.
src,new Promise(a=>{const n=new Image;n.decoding="async",n.onload=()=>a(n),n.onerror=
()=>{Ye.delete(t.src),a(null)},n.src=t.src})),Ye.get(t.src)):Promise.resolve(null)}
function _a(e,t,a){const n=[];let s="";for(const i of String(t).split(/\s+/)){const l=s?
s+" "+i:i;s&&e.measureText(l).width>a?(n.push(s),s=i):s=l}return s&&n.push(s),n}
function N(e,t,a,{size:n=24,minSize:s=16,family:i="Arial",color:l="#e8e5ce",spacing:d=1.25}={}){
let u=n,p;do{if(e.font=`${u}px ${i}`,p=_a(e,t,a.w),p.length*u*d<=a.h||u<=s)break;
u-=1}while(u>=s);const h=Math.max(1,Math.floor(a.h/(u*d)));if(p.length>h){p=p.slice(
0,h);let f=p[h-1];for(;f&&e.measureText(f+"…").width>a.w;)f=f.slice(0,-1);p[h-
1]=f+"…"}e.fillStyle=l,e.textBaseline="top",p.forEach((f,L)=>e.fillText(f,a.x,
a.y+L*u*d))}function Xa(e,t,a){const n=Math.min(a.w/t.naturalWidth,a.h/t.naturalHeight),
s=t.naturalWidth*n,i=t.naturalHeight*n;e.drawImage(t,a.x+(a.w-s)/2,a.y+(a.h-i)/2,
s,i)}function Zt(e,t,a,n,{size:s=18,color:i="#c9d2bc",tracking:l=6,family:d="Ari\
al"}={}){e.font=`${s}px ${d}`,e.fillStyle=i,e.textBaseline="top";let u=a;for(const p of t)
e.fillText(p,u,n),u+=e.measureText(p).width+l}function Za(e){return e==="status"?
{height:1920,headerY:103,subY:150,dayY:252,title:{x:90,y:340,w:900,h:245},image:{
x:80,y:650,w:920,h:615},creditY:1290,takeawayLabelY:1344,takeaway:{x:95,y:1380,w:890,
h:180},actionLabelY:1598,action:{x:95,y:1630,w:890,h:83},source:{x:95,y:1725,w:890,
h:50},reviewY:1780,tagsY:1843}:{height:1080,headerY:73,subY:117,dayY:188,title:{
x:80,y:250,w:920,h:154},image:{x:80,y:425,w:470,h:315},creditY:756,takeawayLabelY:443,
takeaway:{x:585,y:481,w:415,h:245},actionLabelY:794,action:{x:80,y:822,w:920,h:55},
source:{x:80,y:885,w:920,h:43},reviewY:937,tagsY:1003}}async function Ka(e,t){const a=Za(
t),n=W(e),s=await Xt(e);if(n&&!s)return null;const i=document.createElement("can\
vas");i.width=1080,i.height=a.height;const l=i.getContext("2d");if(!l)return null;
l.fillStyle="#163c31",l.fillRect(0,0,1080,i.height);const d=l.createRadialGradient(
920,i.height*.8,5,500,i.height*.5,1e3);d.addColorStop(0,"#31523c"),d.addColorStop(
1,"#12372e"),l.fillStyle=d,l.fillRect(0,0,1080,i.height),l.strokeStyle="#b6a06b",
l.lineWidth=2,l.strokeRect(38,38,1004,i.height-76),l.strokeRect(48,48,984,i.height-
96);const u=t==="status"?90:80;Zt(l,"✳ WINTERWATCH",u,a.headerY,{size:26,color:"\
#bda16a",tracking:8}),Zt(l,"A CYBER & AI ADVENT",u,a.subY,{size:18,color:"#c9d2b\
c",tracking:6}),N(l,`DAY ${String(e.id).padStart(2,"0")} / 24     ·     ${et[e.
category].toUpperCase()}`,{x:u,y:a.dayY,w:920,h:35},{size:22,minSize:18,color:"#\
c3a56c"}),N(l,e.title,a.title,{size:t==="status"?80:58,minSize:t==="status"?58:42,
family:"Georgia",color:"#f5eedc",spacing:1.12}),s&&Xa(l,s,a.image),N(l,"AI-gener\
ated concept · not incident evidence",{x:a.image.x,y:a.creditY,w:920,h:26},{size:t===
"status"?15:14,minSize:13,color:"#b9c9aa"}),N(l,"THE TAKEAWAY",{x:a.takeaway.x,y:a.
takeawayLabelY,w:a.takeaway.w,h:25},{size:14,minSize:13,color:"#c5ad71"}),N(l,e.
takeaway,a.takeaway,{size:t==="status"?43:34,minSize:25,family:"Georgia",color:"\
#e8e5ce",spacing:1.25}),N(l,"ONE ACTION TO TAKE",{x:a.action.x,y:a.actionLabelY,
w:920,h:24},{size:13,minSize:12,color:"#c5ad71"}),N(l,n?.action||e.takeaway,a.action,
{size:t==="status"?26:22,minSize:18,color:"#c6d5bd"});const p=/fictional/i.test(
e.kind)?"Fictional training scenario":"Public learning card";return N(l,`SOURCE:\
 ${E[e.sources[0]].org} · ${p}`,a.source,{size:t==="status"?18:16,minSize:13,color:"\
#c0af7e"}),N(l,Q,{x:a.source.x,y:a.reviewY,w:a.source.w,h:a.tagsY-a.reviewY-3},{
size:18,minSize:16,spacing:1.15,color:"#c6d5bd"}),N(l,`Play: aware-by-design.git\
hub.io/Winterwatch-site/#day=${e.id}`,{x:a.action.x,y:a.tagsY,w:920,h:28},{size:t===
"status"?18:16,minSize:14,color:"#dfcea5"}),new Promise(h=>i.toBlob(h,"image/png"))}
async function ft(e,t=!1){const a=A.find(i=>i.id===g);if(!a)return;const n=await Ka(
a,e);if(!n){w("Card export could not complete. Copy the post instead.");return}const s=new File(
[n],`winterwatch-day-${String(a.id).padStart(2,"0")}-${e}.png`,{type:"image/png"});
if(t&&navigator.canShare?.({files:[s]}))try{await navigator.share({files:[s],title:a.
title,text:We(a)});return}catch(i){if(i.name==="AbortError")return}Fe(n,s.name),
w(e==="status"?"1080 × 1920 status card downloaded.":"1080 × 1080 social card d\
ownloaded.")}function _(e,t,a){$(),o("#infoDialog").open||(Je=Dt()),de(!1),M="",
o("#lessonDialog").open&&o("#lessonDialog").close(),o("#infoContent").innerHTML=
`<p class="sr-only" data-dialog-status role="status" aria-live="polite"></p><div\
 class="modal-heading"><button class="close-dialog" data-close-info aria-label="\
Close panel">×</button><div class="eyebrow">THE WINTERWATCH FIELD NOTES</div><h2\
 id="infoTitle">${r(e)}</h2><p>${r(t)}</p></div><div class="guide-content">${a}<\
/div>`,o("#infoDialog").showModal(),o("#infoDialog").scrollTop=0}function Ja(){_(
"Learn by making the decision.","Three decisions, one useful habit, and an evide\
nce bonus behind every pair of doors.",'<div class="guide-game-loop"><article><s\
pan>01 · ENTER THE STORY</span><h3>Take a role.</h3><p>Become a customer, suppli\
er, employee, responder or person at home. Read the situation and what is at sta\
ke.</p></article><article><span>02 · MAKE THE MOVES</span><h3>See the consequenc\
e.</h3><p>Choose actions, sort an attack sequence, select evidence or classify h\
abits. Feedback explains why a decision helps or fails. You can try again.</p></\
article><article><span>03 · GO TO THE SOURCE</span><h3>Earn a little more wisdom\
.</h3><p>Answer a source question, explore the relevant article or framework, an\
d take a practical habit into everyday life.</p></article></div><h3>Choose a pla\
ce to start.</h3><div class="starter-games"><button data-open="2">I buy or manag\
e a service <span>Customer–supplier decisions →</span></button><button data-open\
="7">I want to follow a real attack <span>The Binance chain →</span></button><bu\
tton data-open="8">I work with money or approvals <span>The DNB impersonation at\
tempt →</span></button><button data-open="12">I use AI in everyday life <span>Pr\
ivacy and reliable answers →</span></button><button data-open="20">I build or de\
ploy AI <span>An OWASP financial-assistant case →</span></button></div><h3>How t\
he points work.</h3><p>Open a day’s lesson for 10 XP. Resolve each of its three \
decision rounds for 20 XP. Completing the day adds 10 XP and a celebration: 80 X\
P for the day’s work. Answer the source question for another 20 XP and a reading\
 celebration. There are 2,400 XP to explore.</p><p>Wrong answers explain the ris\
k and let you retry. Replaying a won round never adds duplicate points. Progress\
, XP, badges and your learning streak stay on this device across reloads when br\
owser storage is available. They are learning rewards, not proof of compliance o\
r professional certification.</p><div class="guide-actions"><button class="butto\
n button-green" data-progress>View progress</button><button class="button button\
-soft" data-dates>Countries, dates & duties →</button></div>')}function Kt(){_(
"Dates and duties, in context.","EU milestones and eight national NIS2 profiles.",
`<p>Choose a country, then check the entity, sector, role and current source. En\
acted law, phased duty, proposal and voluntary framework are different kinds of \
information.</p>${ut(!0)}${Vt()}<h3>The EU milestones.</h3><div class="milestone\
-list">${vt.map(e=>`<article><time>${gt(e.date)}</time><div><b>${r(e.name)}</b><\
p>${r(e.detail)} ${b(e.source,"Official source")}</p></div></article>`).join("")}\
</div><p class="source-note">The AI dates follow the current amended Commission \
timeline. GDPR, DORA and applicable national cyber duties can already apply; a l\
ater AI or product milestone is not a general grace period.</p><h3>Match the ins\
trument to the decision.</h3><div class="duty-cards"><article><b>${b("gdpr","GDP\
R · Articles 5, 28, 32–34")}</b><p>Purpose, roles, processor arrangements, se\
curity, breach assessment and people’s risk.</p></article><article><b>${b("nis",
"NIS2 · Articles 21 and 23")}</b><p>Applicable entity risk management, direct s\
uppliers, significance and national reporting routes.</p></article><article><b>${b(
"dora","DORA · Articles 28–30")}</b><p>Covered financial entities, ICT provid\
ers, evidence, incident assistance and exit arrangements.</p></article><article>\
<b>${b("craLaw","CRA · reporting and Annex I")}</b><p>Product role, vulnerabili\
ty handling, lifecycle support and phased requirements.</p></article><article><b\
>${b("aiLaw","AI Act · current text and Article 50")}</b><p>Provider / deployer\
 role, intended use, risk category, transparency and current transitions.</p></a\
rticle></div><h3>Frameworks help organise the work.</h3><p>${b("nistIR","NIST in\
cident response")}, ${b("csf","CSF 2.0")}, ${b("rmf","AI RMF")}, ${b("owaspApi",
"OWASP API Security")}, ${b("owaspPrompt","OWASP GenAI")} and ${b("enisaGuide","\
ENISA guidance")} support different parts of the decisions. ISO management stand\
ards remain linked in the case sources.</p><div class="guide-actions"><button cl\
ass="button button-green" data-export-dates ${c.country?"":"disabled"}>${re.some(
e=>e.id===c.country)?"Download EU + selected-country milestones":"Download EU mi\
lestones"} ↓</button><button class="subtle-button" data-open="17">Play the dates\
 challenge →</button></div>`),M="dates"}function gt(e){return new Intl.DateTimeFormat(
"en-GB",{timeZone:"Etc/GMT-1",day:"2-digit",month:"short",year:"numeric"}).format(
new Date(e+"T12:00:00Z"))}function Jt(){_("The right people. The right clock.","\
Training reference · reporting duties can overlap and depend on scope.",`${ut(!0)}${Vt()}\
<h3>Preserve evidence. Involve the incident lead early.</h3><p>Record awareness \
and classification times, facts, affected services, known impact, uncertainty, c\
ontainment and assistance required. Involve security, privacy / legal, operation\
s, supplier owners and communications. Verify recipients and secure channels fro\
m official sources.</p><div class="report-table" role="region" aria-label="Incid\
ent reporting reference" tabindex="0"><table><caption class="sr-only">Incident r\
outes, triggers and timing references</caption><thead><tr><th scope="col">Route<\
/th><th scope="col">Trigger / recipient</th><th scope="col">Timing reference</th\
></tr></thead><tbody><tr><td>${b("gdpr","GDPR Art. 33–34")}</td><td>Controller\
 → competent DPA for a reportable personal-data breach. Processor → controller w\
ithout undue delay.</td><td>Without undue delay and, where feasible, within 72h \
of awareness, unless the breach is unlikely to pose a risk to people’s rights an\
d freedoms. High-risk individual communication: without undue delay; separate co\
nditions and exceptions.</td></tr><tr><td>${b("nis","NIS2 Art. 23")}</td><td>In-\
scope significant incident → national CSIRT / competent authority under national\
 rules.</td><td>24h early warning; 72h notification; final within one month afte\
r notification. Trust-service and ongoing-incident exceptions apply.</td></tr><t\
r><td>${b("doraClock","DORA reporting RTS")}</td><td>Covered financial entity → \
competent authority for a major ICT-related incident.</td><td>Initial: generally\
 within 4h of major classification, no later than 24h from awareness; later clas\
sification has its own rule. Intermediate ≤72h after initial; final ≤1 month aft\
er intermediate / latest update.</td></tr><tr><td>${b("cra","CRA reporting")}</t\
d><td>Applicable manufacturer → Single Reporting Platform.</td><td>24h early war\
ning; 72h full notification. Final: exploited vulnerability ≤14 days after a cor\
rective measure is available; severe incident within a month of the 72h notifica\
tion.</td></tr></tbody></table></div><p class="source-note">These are timing ref\
erences, not a decision that a particular incident is reportable. Do not wait un\
til a maximum deadline when a duty requires action without undue delay.</p><h3>F\
ind the correct channel.</h3><ul><li>${b("csirts","National CSIRT directory")}: \
assistance and current national routing. Confirm the designated NIS2 endpoint.</\
li><li>${b("dpas","EDPB national authority directory")}: identify the competent \
DPA and its breach-reporting process.</li><li>${b("cra","CRA Single Reporting Pl\
atform guidance")}: follow the official platform link.</li><li>Financial sector:\
 use your competent authority’s DORA process. Suspected crime: involve the incid\
ent lead and appropriate national law enforcement; urgent physical danger follow\
s local emergency procedures.</li></ul><h3>A small reporting drill.</h3><p>Ficti\
onal scenario: the controller becomes aware of a reportable breach at <b>10:00 C\
ET on 6 November 2026</b>. Which is the 72-hour reference point?</p><div class="\
drill-options"><button data-clock-answer="wrong">7 November, 10:00</button><butt\
on data-clock-answer="right">9 November, 10:00</button><button data-clock-answer\
="wrong">After the forensic report is finished</button></div><p id="clockFeedbac\
k" role="status">The legal duty still says without undue delay. Use this as a ca\
lculation exercise.</p><div class="fact-callout">Agree authority participation b\
efore a test. Use marked drafts or an agreed exercise channel; never submit a fi\
ctitious incident as a real notification.</div><div class="guide-actions"><butto\
n class="button button-green" data-open="22">Open the reporting quest →</button>\
<button class="subtle-button" data-dates>Milestone dates →</button></div>`),M=
"reporting"}function F(){const e=c.completed,t=a=>e.filter(n=>A[n-1].category===
a).length;return[{id:"first-spark",name:"First spark",desc:"Unwrap your first do\
or",earned:c.opened.length>0,icon:"✧",art:"sparkle"},{id:"first-quest",name:"F\
irst shield",desc:"Complete your first quest",earned:e.length>=1,icon:"✓",art:"\
shield"},{id:"habit-builder",name:"Habit builder",desc:"Complete 5 quests",earned:e.
length>=5,icon:"✦",art:"tree"},{id:"weekly-watcher",name:"Weekly watcher",desc:"\
Complete 7 quests",earned:e.length>=7,icon:"✳",art:"star"},{id:"halfway",name:"\
Halfway guardian",desc:"Complete 12 quests",earned:e.length>=12,icon:"◇",art:"\
gift"},{id:"all-quests",name:"Calendar defender",desc:"Complete all 24 quests",earned:e.
length===24,icon:"♜",art:"shield"},{id:"agent-guardian",name:"Agent guardian",
desc:"Complete 3 AI quests",earned:t("ai")>=3,icon:"✳",art:"key"},{id:"privacy\
-keeper",name:"Privacy keeper",desc:"Complete all 4 privacy quests",earned:t("pr\
ivacy")>=4,icon:"◇",art:"key"},{id:"supplier-ally",name:"Supplier ally",desc:"\
Complete 3 quests involving suppliers",earned:e.filter(a=>S[a]?.contexts.includes(
"supplier")).length>=3,icon:"⌘",art:"shield"},{id:"evidence-explorer",name:"Ev\
idence explorer",desc:"Earn 6 source bonuses",earned:c.readings.length>=6,icon:"\
▱",art:"mug"},{id:"deep-reader",name:"Deep reader",desc:"Earn all 24 source bo\
nuses",earned:c.readings.length===24,icon:"▱",art:"star"},{id:"connected-guard\
ian",name:"Connected-world guardian",desc:"Complete both connected-world quests",
earned:t("ot")===2,icon:"❄",art:"snowflake"},{id:"three-day-streak",name:"Thre\
e-day flame",desc:"Reach a 3-day learning streak",earned:(c.streak?.best||0)>=3,
icon:"✧",art:"bell"},{id:"seven-day-streak",name:"Seven-day beacon",desc:"Reac\
h a 7-day learning streak",earned:(c.streak?.best||0)>=7,icon:"✦",art:"tree"},
{id:"winterwatch-champion",name:"Winterwatch champion",desc:"Complete every ques\
t and source bonus",earned:e.length===24&&c.readings.length===24,icon:"♜",art:"\
gift"}]}function Qt(e,t=!1){const a=e.filter(p=>F().some(h=>h.id===p.id&&h.earned));
if(!a.length||(O=O.filter(p=>!a.some(h=>h.id===p.id)),O.length||clearTimeout(ce),
w(`${t?"Badge celebration replayed":"Badge unlocked"}: ${a.map(p=>p.name).join("\
, ")}.`),ie()))return;const n=document.createElement("div");n.className="celebra\
tion-layer badge-celebration",n.setAttribute("aria-hidden","true");const s=document.
createElement("div");s.className="badge-reward";const i=document.createElement("\
span");i.className="badge-reward-symbol",i.textContent=a[0].icon,s.append(i);const l=document.
createElement("strong");l.textContent=t?"YOUR MILESTONE":"MILESTONE UNLOCKED",s.
append(l);const d=document.createElement("h3");d.textContent=a[0].name,s.append(
d);const u=document.createElement("p");u.textContent=a.length>1?`Plus ${a.length-
1} more milestone${a.length>2?"s":""}. Find them in Your progress.`:a[0].desc,s.
append(u),n.append(s),B(".celebration-layer").forEach(p=>p.remove()),(o("#lesson\
Dialog").open?o("#lessonDialog"):o("#infoDialog").open?o("#infoDialog"):document.
body).append(n),setTimeout(()=>n.remove(),2600)}function ea(){_("Your progress.",
kt(),`<div class="progress-stats"><div class="progress-stat"><strong>${fe().toLocaleString()}\
</strong><span>of 2,400 XP</span></div><div class="progress-stat"><strong>${c.completed.
length}<small>/24</small></strong><span>quests complete</span></div><div class="\
progress-stat"><strong>${c.readings.length}<small>/24</small></strong><span>sour\
ce bonuses earned</span></div><div class="progress-stat"><strong>${D.streakCount(
c,ae())}</strong><span>day learning streak</span></div></div><p class="streak-no\
te">Complete a new quest on consecutive learning days to build your streak. Lear\
ning days begin at 09:00 CET. Best streak: <b>${c.streak.best} day${c.streak.best===
1?"":"s"}</b>. Saved streaks survive reloads.</p><div class="xp-track"><span sty\
le="width:${fe()/24}%"></span></div><p class="reading-progress">${Object.values(
c.solved).reduce((e,t)=>e+t.length,0)} / 72 decision rounds resolved</p><h3>A ma\
ntelpiece of milestones.</h3><p>${F().filter(e=>e.earned).length} of ${F().length}\
 badges unlocked. ${T==="unavailable"?"Browser storage must be available to keep\
 earned badges.":"Milestones stay earned when you return."}</p><div class="badge\
s-grid">${F().map(e=>`<article class="badge ${e.earned?"earned":""}"><span class\
="badge-art" aria-hidden="true">${Aa(e.art)}</span><b>${r(e.name)}</b><small>${e.
earned?"Unlocked · ":"Not yet earned · "}${r(e.desc)}</small>${e.earned?`<butt\
on class="subtle-button" data-badge-celebrate="${e.id}" aria-label="Replay celeb\
ration for ${r(e.name)}">Celebrate again ✦</button>`:""}</article>`).join("")}\
</div><h3>Choose your next discovery.</h3><div class="completion-list">${A.map(e=>`\
<button class="${c.completed.includes(e.id)?"done":""}" data-open="${e.id}"><spa\
n>${String(e.id).padStart(2,"0")}</span>${r(e.short)}<small>${me(e.id)} XP</smal\
l></button>`).join("")}</div><p class="source-note">${r(At())} Progress is not u\
ploaded or included in shared lessons. Browser settings control retention; clear\
ing site data or using another browser starts a fresh journey.</p><div class="gu\
ide-actions progress-close-actions"><button type="button" class="button button-g\
reen" data-close-info>Close progress</button></div>`),M="progress",o("#infoDialo\
g [data-close-info]")?.setAttribute("aria-label","Close progress")}function Qa(){
_("Reset all your progress?","This cannot be undone.",'<p>This clears saved ques\
ts, XP, reading bonuses, badges and streaks from this browser.</p><div class="gu\
ide-actions reset-confirm-actions"><button type="button" class="button button-so\
ft" data-cancel-reset>Cancel</button><button type="button" class="button button-\
green" data-confirm-reset>Yes, reset my progress</button></div>'),M="reset-confi\
rm",o("#infoDialog [data-cancel-reset]")?.focus({preventScroll:!0})}function en(){
_("A little wonder. A useful habit.","Cybersecurity, AI and privacy belong to ev\
eryone who builds, leads or keeps things running.",`<h3>Contact and feedback</h3\
><p>For content corrections and accessibility feedback, <a href="https://github.\
com/aware-by-design/Winterwatch-site/issues" target="_blank" rel="noopener noref\
errer">contact the calendar maintainers through public GitHub issues ↗</a>. Repo\
rts are visible immediately. Include the page or door and leave out personal inf\
ormation and quiz solutions. For security findings, <a href="https://github.com/\
aware-by-design/Winterwatch-site/security/advisories/new" target="_blank" rel="n\
oopener noreferrer">report a vulnerability privately on GitHub</a>.</p><h3>AI as\
sistance and editorial review</h3><p>AI tools assisted with drafting, code, illu\
strations and review. Illustrations are labelled AI-generated. Claims are linked\
 to sources and dated; mistakes can remain. Operational use needs current source\
 checks and qualified review.</p><h3>24 doors. Three perspectives.</h3><p>Winter\
watch pairs a quiet festive setting with practical learning. Explore recent inci\
dents, everyday hygiene, customer–supplier dependencies, response playbooks and \
EU-first regulatory milestones. Each lesson includes technical, business and ope\
rations perspectives. The collection connects awareness raising with practical c\
yber-hygiene habits.</p><h3>Evidence, with the labels left on.</h3><p>Primary-so\
urce incidents, provider assessments, disclosed vulnerabilities, legal duties an\
d fictional exercises are labelled separately. Operational recipes are authored \
training examples, not vendor-certified rules. The calendar does not update itse\
lf. Check current cases, reporting routes and country guidance at their official\
 sources.</p><h3>Learn without an account.</h3><p>The calendar asks for no name,\
 email, account or personal details. It has no analytics, advertising trackers, \
third-party scripts or remote fonts. Quiz answers are checked on your device. Yo\
ur selections are never sent to a grading service. When browser storage is avail\
able, the calendar saves minimal progress in this browser: which lessons and dec\
isions you finished, reading bonuses, and your last learning-window date with st\
reak counts. XP and milestone badges are reconstructed from that progress. The c\
heckpoint excludes raw answers and personal details. After a reset, it holds onl\
y a counter that keeps older tabs from restoring cleared progress. Display choic\
es you change are kept separately for this tab. No progress is uploaded or expor\
ted. Use Reset progress beside View progress on the calendar to remove it after \
confirmation.</p><h3>When you follow a link.</h3><p>Sources and social platforms\
 open only when you choose them. Social posts and cards use public lesson conten\
t. Those services handle visits under their own terms. This site is hosted on Gi\
tHub Pages, which logs and stores visitors’ IP addresses for security purposes. \
<a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what\
-is-github-pages#data-collection" target="_blank" rel="noopener noreferrer">GitH\
ub Pages data collection ↗</a> · <a href="https://docs.github.com/en/site-policy\
/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopene\
r noreferrer">GitHub privacy statement ↗</a>. The calendar has no access to thos\
e visitor logs.</p><h3>A calm, accessible December.</h3><p>Each door becomes ava\
ilable on its December date at 09:00 CET and remains available. Play any release\
d day, including lessons you missed. After 24 December at 09:00 CET, all 24 less\
ons remain available at your own pace. Use Accessibility for three text sizes, p\
ause animations, high contrast and easier reading. Listen buttons use an English\
 voice installed on your device; speech stops when you change a lesson or close \
it. Keyboard navigation and reduced-motion support are also included. Display ch\
oices last for this tab only. There is no sound by default.</p><div class="guide\
-actions"><button class="button button-green" data-sources>Research & sources →<\
/button><button class="subtle-button" data-guide>Field guide →</button></div>${Et()}`)}
function tn(){_("Follow the evidence.","Primary research, public authorities, le\
gal texts and standards bodies.",`<p>Some source sites can restrict automated re\
trieval; corroborating official guidance is linked where available. A historical\
 patch version or deadline is not a recommendation to use obsolete software or l\
aw.</p><div class="fact-callout">Follow each claim back to its source. Check the\
 publication date, current legal text and relevant national authority before app\
lying it. Case findings and defensive training recommendations are labelled sepa\
rately.</div><ul class="source-list">${Object.entries(E).map(([e,t])=>`<li>${b(e)}\
<small>${r(t.org)} · ${r(t.kind)}</small></li>`).join("")}</ul><div class="guid\
e-actions"><button class="button button-green" data-export-sources>Download sour\
ce register ↓</button><button class="subtle-button" data-about>About this collec\
tion</button></div>${Et()}`)}function an(){const e=["BEGIN:VCALENDAR","VERSION:2\
.0","PRODID:-//Winterwatch//2026 milestones//EN","CALSCALE:GREGORIAN"],t=s=>s.replace(
/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"),a=re.
find(s=>s.id===c.country),n=[...vt.map(s=>({...s,scope:"EU"})),...(a?.milestones||
[]).map(s=>({...s,scope:a.name}))];for(const[s,i]of n.entries()){const l=new Date(
i.date+"T12:00:00Z");l.setUTCDate(l.getUTCDate()+1),e.push("BEGIN:VEVENT",`UID:w\
interwatch-${c.country}-${i.date}-${s}@calendar.local`,"DTSTAMP:20261106T000000Z",
`DTSTART;VALUE=DATE:${i.date.replaceAll("-","")}`,`DTEND;VALUE=DATE:${l.toISOString().
slice(0,10).replaceAll("-","")}`,`SUMMARY:${t(i.scope+" · "+i.name)}`,`DESCRIPT\
ION:${t(i.detail+" Confirm the applicable entity, cohort, role and current law. \
This is a learning milestone, not an organisation-specific deadline. "+E[i.source].
url)}`,"END:VEVENT")}return e.push("END:VCALENDAR"),ta(e)}function ta(e){const t=new TextEncoder;
return e.map(n=>{if(/^[\x20-\x7e]*$/.test(n)){const d=[n.slice(0,74)];for(let u=74;u<
n.length;u+=73)d.push(" "+n.slice(u,u+73));return d.join(`\r
`)}let s="",i="",l=0;for(const d of n){const u=t.encode(d).length;l+u>74&&(s+=i+
`\r
 `,i="",l=1),i+=d,l+=u}return s+i}).join(`\r
`)+`\r
`}function bt(e){return e?.type==="image/jpeg"&&typeof e.data=="string"&&e.data.
length>0&&e.data.length<=14e3&&e.data.length%4===0&&/^[A-Za-z0-9+/]+={0,2}$/.test(
e.data)}function nn(e,t=null){const a=bt(t)?`<img src="data:image/jpeg;base64,${t.
data}" alt="" width="600" height="225" style="display:block;width:100%;height:au\
to;border:0">`:"";return`<div lang="en" style="max-width:600px;margin:0 auto;pad\
ding:24px;background:#f8f6ef;color:#173d31;font-family:Arial,Helvetica,sans-seri\
f">
      ${a}
      <p>${e.id} December 2026 · 09:00–09:10 CET</p>
      <a href="${He(e.id)}" style="display:block;padding:18px;background:#e9efdf\
;border:3px double #987337;border-radius:8px;color:#173d31;text-align:center">
        Open door ${e.id}<br><strong style="font: bold 24px Georgia,serif">${r(e.
short)}</strong>
      </a>
      <p>Join Nestor for three practical decisions when the door opens.</p>
      <p><a href="${ht}" style="color:#173d31">View the full Winterwatch calenda\
r</a></p>
      <div style="border-top:1px solid #ccd7c5;padding-top:12px;font-size:12px">\

        ${a?"<p>AI-assisted conceptual illustration; not incident evidence.</p>":
""}
        <p>${r(Q)}</p><a href="${ue}" style="color:#173d31">Learn more about AR-\
in-a-Box</a>
      </div>
    </div>`}function sn(e,t,a=600){const n=document.createElement("canvas");n.width=
a,n.height=Math.round(a*.375);const s=n.getContext("2d");if(!s)return null;s.scale(
a/600,a/600);const i=t.naturalWidth||t.width,l=t.naturalHeight||t.height,d=Math.
max(600/i,225/l),u=i*d,p=l*d;s.fillStyle="#173d31",s.fillRect(0,0,600,225),s.drawImage(
t,600-u,(225-p)/2,u,p);const h=s.createLinearGradient(0,0,600,0);return h.addColorStop(
0,"#12352b"),h.addColorStop(.66,"#12352bf5"),h.addColorStop(.84,"#12352b80"),h.addColorStop(
1,"#12352b00"),s.fillStyle=h,s.fillRect(0,0,600,225),s.fillStyle="#e8ca8e",s.fillRect(
27,22,30,2),s.font="bold 14px Arial",s.textBaseline="top",s.fillText(`DAY ${String(
e.id).padStart(2,"0")} WITH NESTOR`,27,34),N(s,e.short,{x:27,y:64,w:367,h:103},{
size:29,minSize:22,family:"Georgia",color:"#fff8e6",spacing:1.12}),s.fillStyle="\
#e8ca8e",s.font="14px Arial",s.fillText(`${e.id} DECEMBER 2026  ·  10 MINUTES`,
27,189),n}function on(e=new Date,t=new Map){const a=i=>String(i).replace(/\\/g,"\
\\\\").replace(/\r\n|\r|\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"),n=tt(
e);if(!n.length)return"";const s=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//ENI\
SA ARCH-AHWG//Winterwatch Advent 2026//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",
"X-WR-CALNAME:Winterwatch Advent 2026","X-WR-TIMEZONE:CET"];for(const i of n){const l=String(
i.id).padStart(2,"0"),d=`202612${l}`,u=t.get(i.id),p=He(i.id),h=[`Day ${i.id} wi\
th Nestor · ${i.short}`,`Open door ${i.id}: ${p}
Full Winterwatch calendar: ${ht}`,`${i.id} December 2026 · 09:00–09:10 CET. Join\
 Nestor for three practical decisions when the door opens.`,...bt(u)?["AI-assist\
ed conceptual illustration; not incident evidence."]:[],`${Q}
Learn more about AR-in-a-Box: ${ue}`].join(`

`);s.push("BEGIN:VEVENT",`UID:winterwatch-arch-ahwg-2026-day-${l}@calendar.local`,
"DTSTAMP:20261126T000000Z",`DTSTART:${d}T080000Z`,`DTEND:${d}T081000Z`,`SUMMARY:${a(
`Winterwatch with Nestor · Day ${i.id}: ${i.short}`)}`,`URL:${p}`,`DESCRIPTION:${a(
h)}`),bt(u)&&s.push(`IMAGE;DISPLAY=FULLSIZE;FMTTYPE=image/jpeg;ENCODING=BASE64;V\
ALUE=BINARY:${u.data}`),s.push(`X-ALT-DESC;FMTTYPE=text/html:${a(nn(i,u))}`,"TRA\
NSP:TRANSPARENT","STATUS:CONFIRMED","SEQUENCE:6","BEGIN:VALARM","ACTION:DISPLAY",
"TRIGGER:PT0M",`DESCRIPTION:${a(`Winterwatch door ${i.id}: ${i.short}`)}`,"END:V\
ALARM","END:VEVENT")}return s.push("END:VCALENDAR"),ta(s)}const Be=new Map;async function rn(e){
const t=W(e);if(!t)return null;const a=`${e.id}:${t.src}:${e.short}`;Be.has(a)||
Be.set(a,(async()=>{let s;try{const i=await Promise.race([Xt(e),new Promise(l=>{
s=setTimeout(()=>l(null),8e3)})]);if(!i)return null;for(const l of[600,480]){const d=sn(
e,i,l);if(!d)return null;for(const u of[.82,.7,.56,.42]){const p=d.toDataURL("im\
age/jpeg",u);if(p.startsWith("data:image/jpeg;base64,")&&p.length-23<=14e3)return{
type:"image/jpeg",data:p.slice(23)}}}return null}catch{return null}finally{clearTimeout(
s)}})());const n=await Be.get(a);return n||Be.delete(a),n}async function ln(){if(te)
return;const e=new Date,t=tt(e),a=t.length;if(!a){w("The 2026 reminder schedule \
has ended. All 24 lessons remain available.");return}te=!0,he(e);try{const n=await Promise.
all(t.map(async l=>[l.id,await rn(l)])),s=new Map(n.filter(([,l])=>l));_t(on(e,s),
"winterwatch-advent-2026-reminders.ics");const i=t.some(l=>W(l)&&!s.has(l.id));w(
`${a} daily ${a===1?"reminder":"reminders"} downloaded.${i?" Some images could n\
ot be included.":""}`)}finally{te=!1,he()}}function cn(){if(!Ae.some(e=>e.id===c.
country)){w("Choose a country first.");return}_t(an(),`winterwatch-eu-${c.country}\
-milestones.ics`),w(re.some(e=>e.id===c.country)?"EU and selected-country milest\
ones downloaded. Review applicability before adding them.":"EU milestones downlo\
aded. This country has no detailed national milestone profile in this edition.")}
const mt=window.WINTERWATCH_DISPLAY;let{textSize:je,highContrast:Ge,easierReading:qe,
pauseAnimations:Ve}=mt.read(),aa=null,ve=0,ze="",na=null;const dn={advent:"the d\
aily welcome",welcome:"the welcome message",holiday:"the holiday message"},ie=()=>Ve||
window.matchMedia("(prefers-reduced-motion: reduce)").matches;function we(e){return`\
<svg class="control-icon speaker-icon" viewBox="0 0 24 24" fill="none" stroke="c\
urrentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" a\
ria-hidden="true" focusable="false"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M\
15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg><span>${r(e)}</span>`}function sa(e,t){
const a=e.hasAttribute("data-listen-panel")&&e.classList.contains("briefing-list\
en");if(e.setAttribute("aria-pressed",String(t)),e.innerHTML=we(t?"Stop listenin\
g":a?"Listen to this briefing":"Listen"),e.hasAttribute("data-listen-message")){
e.setAttribute("aria-label",(t?"Stop listening to ":"Listen to ")+dn[e.dataset.listenMessage]);
return}const n=Number(e.dataset.listen);e.setAttribute("aria-label",Number.isInteger(
n)&&n>=1&&n<=24?`${t?"Stop listening to":"Listen to"} Day ${n}${e.id==="doorLock\
Listen"?" opening message":""}`:t?"Stop listening":a?"Listen to this briefing":"\
Listen to this lesson section")}function $(){ve++,ze="",na=null;try{window.speechSynthesis?.
cancel()}catch{}B("[data-listen],[data-listen-panel],[data-listen-message]").forEach(
e=>{sa(e,!1)})}function $e(e,t){const a=e.closest?.("dialog")?.querySelector("[d\
ata-listen-status]");a?a.textContent=t:t&&w(t)}function X(...e){const t=[],a='[h\
idden],[inert],[aria-hidden="true"],.sr-only,svg,script,style,progress,[data-lis\
ten],[data-listen-panel],[data-listen-message],[data-listen-status],.lesson-acce\
ss-tools,.close-dialog';function n(s){if(s.nodeType===3){t.push(s.nodeValue);return}
if(s.nodeType!==1||s.matches(a))return;const i=window.getComputedStyle(s);if(i.display===
"none"||i.visibility!=="visible")return;const l=i.display!=="inline"&&i.display!==
"contents";if(l&&t.push(`
`),s.tagName==="BR")t.push(`
`);else if(s.tagName==="SELECT")t.push(s.selectedOptions[0]?.textContent||"");else if(s.
tagName==="TEXTAREA")s.readOnly&&t.push(s.value);else if(s.tagName==="DETAILS"&&
!s.open){const d=s.querySelector(":scope > summary");d&&n(d)}else for(const d of s.
childNodes)n(d);l&&t.push(`
`)}for(const s of e)s&&(n(s),t.push(`
`));return t.join("").split(/\n+/).map(s=>s.replace(/\s+/g," ").trim()).filter(Boolean).
join(`
`)}function ke(e,t,a){if(ze===t){$();return}$(),$e(a,"");const n=window.speechSynthesis,
s=window.SpeechSynthesisUtterance;if(!n||typeof s!="function"){$e(a,"Read aloud \
is not available in this browser. You can use your device’s screen reader.");return}
let i;try{i=n.getVoices().filter(h=>h.localService===!0)}catch{i=[]}const l=i.find(
h=>/^en[-_]/i.test(h.lang))||i.find(h=>/^en$/i.test(h.lang));if(!l){$e(a,"No Eng\
lish device voice is ready. Enable an English offline voice in your device setti\
ngs, then try Listen again.");return}const d=[];for(let h of e.split(/\n+/)){for(h=
h.trim();h.length>180;){const f=h.lastIndexOf(" ",180),L=f>0?f:180;d.push(h.slice(
0,L)),h=h.slice(L).trimStart()}h&&d.push(h)}if(!d.length)return;ze=t,sa(a,!0);const u=ve,
p=()=>{if(u!==ve)return;const h=d.shift();if(!h){$();return}const f=new s(h);na=
f,f.voice=l,f.lang=l.lang,f.rate=1,f.onend=()=>{u===ve&&p()},f.onerror=()=>{u===
ve&&($(),$e(a,"Your device could not read this text. Please try again or use a s\
creen reader."))};try{n.speak(f)}catch{$(),$e(a,"Read aloud is unavailable on th\
is device.")}};p()}function un(e,t){if(t.id==="doorLockListen"){ke(X(o(".door-lo\
ck-banner")),"lock-"+e,t);return}const a=o(`[data-door="${e}"]`);a&&ke("Day "+X(
a).replace(/^0(?=\d\b)/,""),"door-"+e,t)}function pn(e){ke(X(o(".santa-scroll")),
"santa-"+y+"-"+Ce,e)}function hn(e){if(!o("#lessonDialog").open||!H())return;const t=e.
classList.contains("briefing-listen"),a=o("#lessonPanel"),n=t?X(a):X(o("#lessonC\
ontent .modal-heading"),o('#lessonContent [aria-selected="true"]'),a);ke(n,(t?"b\
riefing-":"panel-")+g+"-"+C,e)}function fn(e){const t=e.dataset.listenMessage,a=t===
"advent"?X(o("#adventWelcomeCopy"),o(".nestor-day-ribbon")):X(o(t==="welcome"?"#\
welcomeDialog .holiday-copy":"#holidayDialog .holiday-copy"));ke(a,"message-"+t,
e)}function Y(e=!1){const t={textSize:je,highContrast:Ge,easierReading:qe,pauseAnimations:Ve};
mt.apply(t,window.matchMedia("(prefers-reduced-motion: reduce)").matches),e===!0&&
mt.save(t),o("#accessTextSize").value=je,o("#accessContrast").checked=Ge,o("#acc\
essReading").checked=qe,o("#accessMotion").checked=ie(),o("#accessMotion").disabled=
window.matchMedia("(prefers-reduced-motion: reduce)").matches,_e()}function gn(){
$(),je="normal",Ge=!1,qe=!1,Ve=!1,c.ambience=!0,Y(!0),o("#accessibilityStatus").
textContent=ie()?"Accessibility settings reset. Your device’s reduced-motion pre\
ference keeps animations paused.":"Accessibility settings reset. Animations are \
allowed again."}function bn(){$();const e=o("#accessibilityDialog");e.open||(aa=
{element:document.activeElement},Y(),e.showModal(),o("#accessibilityClose").focus(
{preventScroll:!0}))}function yt(){const e=o(".hero")?.getBoundingClientRect();e&&
Number.isFinite(e.height)&&e.height>0&&o("#snow").style.setProperty("--snow-dist\
ance",`${e.height+40}px`)}function _e(){const e=c.ambience&&!ie();document.body.
classList.toggle("pause-animations",ie()),o(".hero").classList.toggle("paused",!e),
o("#snow").classList.toggle("paused",!e),o("#snow").hidden=!e,o("#ambienceButton").
setAttribute("aria-pressed",String(e)),o("#ambienceText").textContent=e?"Snow on":
"Still & cosy",o("#ambienceIcon").textContent=e?"❄":"✧"}o("#snow").innerHTML=
Array.from({length:104},(e,t)=>`<span style="--x:${t*37.17%100}%;--s:${1+t%5}px;\
--o:${.22+t%6*.1};--d:${8+t%15}s;--delay:-${t%29}s;--drift:${-24+t%61}px"></span\
>`).join(""),document.addEventListener("click",async e=>{ze&&e.target.closest("#\
lessonPanel summary")&&$();const t=e.target.closest("button,a");if(t){if(t.hasAttribute(
"data-accessibility")){bn();return}if(t.hasAttribute("data-reset-accessibility")){
gn();return}if(t.hasAttribute("data-close-accessibility")){o("#accessibilityDial\
og").close();return}if(t.hasAttribute("data-listen-message")){fn(t);return}if(t.
hasAttribute("data-listen-santa")){pn(t);return}if(t.hasAttribute("data-listen")){
un(Number(t.dataset.listen),t);return}if(t.hasAttribute("data-listen-panel")){hn(
t);return}if(t.closest?.("#lessonDialog")&&!t.hasAttribute("data-close")&&!H()){
e.preventDefault();return}if(t.closest?.("#mainNav")&&t.getAttribute("href")==="\
#calendar"){e.preventDefault(),de(!1),location.hash="#calendar",o("#calendarTitl\
e").scrollIntoView?.({block:"start"}),o("#calendarTitle").focus({preventScroll:!0});
return}if(t.hasAttribute("data-close-door-lock")){o("#doorLockDialog").close();return}
if(t.hasAttribute("data-close-holiday")){o("#holidayDialog").close();return}if(t.
hasAttribute("data-close-welcome")){o("#welcomeDialog").close();return}if(t.hasAttribute(
"data-welcome-start")){o("#welcomeDialog").close(),z(1);return}if(t.hasAttribute(
"data-holiday-greeting")){ct();return}if(t.id==="menuToggle"){de(o("#menuToggle").
getAttribute("aria-expanded")!=="true");return}if(t.hasAttribute("data-game-choi\
ce")){qt(Number(t.dataset.gameChoice));return}if(t.hasAttribute("data-evidence-o\
ption")){const a=S[g]?.steps[v],n=Number(t.dataset.evidenceOption);if(a?.kind!==
"select"||!Number.isInteger(n)||n<0||n>=a.options.length)return;const s=U(g,v);if(s.
result)return;s.selected=s.selected.includes(n)?s.selected.filter(i=>i!==n):[...s.
selected,n],I(),o(`[data-evidence-option="${n}"]`)?.focus({preventScroll:!0});return}
if(t.hasAttribute("data-order-from")){const a=U(g,v),n=Number(t.dataset.orderFrom),
s=Number(t.dataset.orderDirection),i=n+s;if(a.result||!Number.isInteger(n)||![-1,
1].includes(s)||n<0||n>=a.order.length||i<0||i>=a.order.length)return;[a.order[n],
a.order[i]]=[a.order[i],a.order[n]],I(),o(`[data-order-from="${i}"]:not(:disable\
d)`)?.focus({preventScroll:!0});return}if(t.hasAttribute("data-habit-index")){const a=Number(
t.dataset.habitIndex),n=S[g]?.steps[v];if(n?.kind!=="habits"||!Number.isInteger(
a)||a<0||a>=n.cards.length||!["do","avoid"].includes(t.dataset.habitValue))return;
const s=U(g,v);if(s.result)return;s.habits[a]=t.dataset.habitValue==="do",I(),o(
`[data-habit-index="${a}"][data-habit-value="${t.dataset.habitValue}"]`)?.focus(
{preventScroll:!0});return}if(t.hasAttribute("data-check-step")){qt();return}if(t.
hasAttribute("data-next-stage")){v<=2&&c.solved[g]?.includes(v)&&Ha();return}if(t.
hasAttribute("data-retry-step")){const a=U(g,v);a.result=null,a.response=null,I(),
o("[data-decision-title]")?.focus({preventScroll:!0});return}if(t.hasAttribute("\
data-game-hint")){const a=U(g,v);a.hint=!a.hint,I(),o("[data-game-hint]")?.focus(
{preventScroll:!0});return}if(t.hasAttribute("data-stage")){const a=Number(t.dataset.
stage);Number.isInteger(a)&&a>=0&&a<=2&&a<=D.firstUnsolved(c,g)&&(v=a,ye("play"));
return}if(t.hasAttribute("data-return-game")){v=D.firstUnsolved(c,g),ye("play");
return}if(t.hasAttribute("data-replay-day")){for(let a=0;a<3;a++)delete G[`${g}-${a}`],
U(g,a,!0);v=0,ye("play");return}if(t.hasAttribute("data-reading-answer")){Ua(Number(
t.dataset.readingAnswer));return}if(t.dataset.badgeCelebrate){const a=F().find(n=>n.
id===t.dataset.badgeCelebrate&&n.earned);a&&Qt([a],!0);return}if(t.dataset.celebrate){
(t.dataset.celebrate==="day"&&c.completed.includes(g)||t.dataset.celebrate==="re\
ading"&&c.readings.includes(g))&&dt(t.dataset.celebrate,!0);return}if(t.dataset.
door){z(Number(t.dataset.door));return}if(t.dataset.open){z(Number(t.dataset.open),
!1);return}if(t.hasAttribute("data-audience")){c.audience=t.dataset.audience,V(),
x();return}if(t.hasAttribute("data-category")){Qe=t.dataset.category,B("[data-ca\
tegory]").forEach(a=>{const n=a===t;a.classList.toggle("active",n),a.setAttribute(
"aria-pressed",n)}),x();return}if(t.hasAttribute("data-close")){o("#lessonDialog").
close();return}if(t.hasAttribute("data-close-info")){o("#infoDialog").close();return}
if(t.dataset.tab){ye(t.dataset.tab);return}if(t.dataset.lens&&["technical","busi\
ness","operations"].includes(t.dataset.lens)){j=t.dataset.lens,I(),o(`[data-lens\
="${j}"]`)?.focus({preventScroll:!0});return}if(t.hasAttribute("data-prev")){z(g-
1,!1);return}if(t.hasAttribute("data-next")){z(g+1,!1);return}if(t.hasAttribute(
"data-copy-hunt")){await Ue(A[g-1].hunt.code,"Read-only hunting example copied. \
Verify host coverage and tune first.");return}if(t.hasAttribute("data-copy-rule")){
await Ue(A[g-1].logic,"Illustrative logic copied. Map fields before use.");return}
if(t.hasAttribute("data-download-playbook")){Va(A.find(a=>a.id===g));return}if(t.
hasAttribute("data-download-playbook-text")){Fe(new Blob([za(A[g-1])],{type:"tex\
t/plain;charset=utf-8"}),`winterwatch-day-${String(g).padStart(2,"0")}-playbook.\
txt`),w("Plain-text playbook downloaded.");return}if(t.hasAttribute("data-copy-p\
ost")){await Ue(We(A[g-1]),"Post copied. Ready to paste into your social app.");
return}if(t.hasAttribute("data-linkedin")){const a=A[g-1];await Ue(We(a),"Lesson\
 post copied. Paste it into your LinkedIn post.")&&window.open(zt(a),"_blank","n\
oopener,noreferrer");return}if(t.dataset.card==="square"){await ft("square");return}
if(t.dataset.card==="status"){await ft("status");return}if(t.hasAttribute("data-\
native-share")){await ft("status",!0);return}if(t.dataset.country){oa(t.dataset.
country);return}if(t.hasAttribute("data-guide")){Ja();return}if(t.hasAttribute("\
data-dates")){Kt();return}if(t.hasAttribute("data-reporting")){Jt();return}if(t.
hasAttribute("data-progress")||t.id==="progressButton"){ea();return}if(t.hasAttribute(
"data-about")){en();return}if(t.hasAttribute("data-sources")){tn();return}if(t.hasAttribute(
"data-download-advent-reminders")){await ln();return}if(t.hasAttribute("data-exp\
ort-dates")){cn();return}if(t.hasAttribute("data-export-sources")){Fe(new Blob([
JSON.stringify({sources:E},null,2)],{type:"application/json"}),"winterwatch-sour\
ce-register.json"),w("Source register downloaded.");return}if(t.hasAttribute("da\
ta-reset-progress")){Qa();return}if(t.hasAttribute("data-cancel-reset")){M==="re\
set-confirm"&&o("#infoDialog").close();return}if(t.hasAttribute("data-confirm-re\
set")){if(le||!o("#infoDialog").open||M!=="reset-confirm")return;await ha();const{
audience:a,country:n,context:s,ambience:i}=c;c={...Te(),audience:a,country:n,context:s,
ambience:i},G={},q=null,clearTimeout(ce),O=[],Se=new Set,se(),x(),_e(),o("#infoD\
ialog").close(),w(T==="unavailable"?"Progress reset in this page; check browser \
storage to clear the saved record.":"Saved progress cleared. A fresh December aw\
aits.");return}if(t.dataset.clockAnswer){o("#clockFeedback").textContent=t.dataset.
clockAnswer==="right"?"✓ Correct: 9 November 2026 at 10:00 CET. Assess and repor\
t without undue delay; do not wait for the reference limit.":"Try again. Add 72 \
hours to the awareness time; the forensic report does not start this clock.";return}
t.id==="ambienceButton"&&(c.ambience=!c.ambience,V(),_e())}});function oa(e,t=!1){
const a=Ae.find(d=>d.id===e);if(!a)return;const n=a.id,s=o("#lessonDialog").open?
o("#lessonDialog"):o("#infoDialog").open?o("#infoDialog"):document,i=!!o(".count\
ry-atlas-inline",s)?.open;c.country=n,V(),o("#lessonDialog").open?I():M==="dates"?
Kt():M==="reporting"&&Jt(),i&&o(".country-atlas-inline",s)?.setAttribute("open",
""),o(t?"[data-country-select]":`[data-country="${n}"]`,s)?.focus({preventScroll:!0})}
document.addEventListener("change",e=>{if(e.target.id==="santaDayPicker"){const t=Number(
e.target.value);A.some(a=>a.id===t)&&(y=t,$(),x(),o("#santaDayPicker")?.focus({preventScroll:!0}));
return}if(e.target.id==="accessTextSize"&&["normal","larger","largest"].includes(
e.target.value)){je=e.target.value,Y(!0);return}if(e.target.id==="accessMotion"){
Ve=e.target.checked,Y(!0);return}if(e.target.id==="accessContrast"){Ge=e.target.
checked,Y(!0);return}if(e.target.id==="accessReading"){qe=e.target.checked,Y(!0);
return}e.target.matches("[data-country-select]")&&oa(e.target.value,!0),e.target.
id==="contextFilter"&&["all","customer","supplier","work","home","finance"].includes(
e.target.value)&&(c.context=e.target.value,V(),x())}),o("#accessibilityDialog").
addEventListener("close",()=>{o("#accessibilityDialog").open||(J(aa),oe())}),o("\
#lessonDialog").addEventListener("cancel",$),o("#doorLockDialog").addEventListener(
"close",()=>{o("#doorLockDialog").open||($(),ka(),oe(),ne())}),o("#holidayDialog").
addEventListener("close",()=>{o("#holidayDialog").open||($(),Sa(),oe())}),o("#we\
lcomeDialog").addEventListener("close",()=>{o("#welcomeDialog").open||($(),Ca(),
oe())}),o("#lessonDialog").addEventListener("close",()=>{o("#lessonDialog").open||
($(),/^#day=/.test(location.hash)&&history.replaceState(null,"","#calendar"),clearTimeout(
fa),o("#infoDialog").open||J(Ke),oe())}),o("#infoDialog").addEventListener("clos\
e",()=>{!o("#infoDialog").open&&!o("#lessonDialog").open&&J(Je),oe()});for(const e of[
o("#lessonDialog"),o("#infoDialog"),o("#doorLockDialog"),o("#holidayDialog"),o("\
#welcomeDialog"),o("#accessibilityDialog")])e.addEventListener("click",t=>{if(t.
target===e){const a=e.getBoundingClientRect();(t.clientX<a.left||t.clientX>a.right||
t.clientY<a.top||t.clientY>a.bottom)&&e.close()}});document.addEventListener("ke\
ydown",e=>{if(e.key==="Escape"&&o("#menuToggle").getAttribute("aria-expanded")===
"true"){de(!1,!0);return}if(e.target.matches('[role="tab"]')&&["ArrowRight","Arr\
owLeft","Home","End"].includes(e.key)){e.preventDefault();const t=B('[role="tab"\
]');let a=t.indexOf(e.target);a=e.key==="Home"?0:e.key==="End"?t.length-1:(a+(e.
key==="ArrowRight"?1:-1)+t.length)%t.length;const n=t[a].dataset.tab;ye(n),o(`[r\
ole="tab"][data-tab="${n}"]`).focus()}}),window.addEventListener("storage",e=>{if(!(e.
key!==Z&&e.key!==null)){try{if(e.storageArea&&e.storageArea!==localStorage)return}catch{
return}$t()}}),window.addEventListener("pageshow",$t),window.addEventListener("h\
ashchange",()=>{const e=location.hash.match(/^#day=(\d{1,2})$/);e&&z(Number(e[1]),
!1)}),window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("ch\
ange",Y),window.addEventListener("resize",yt),window.addEventListener("pagehide",
$),document.addEventListener("visibilitychange",()=>{document.hidden&&($(),clearTimeout(
Re)),document.hidden||(he(),it(),ne())}),Y(),x(),se(),yt(),_e(),Nt(),ne(),typeof window.
ResizeObserver=="function"&&new window.ResizeObserver(yt).observe(o(".hero"));const ia=location.
hash.match(/^#day=(\d{1,2})$/);ia&&z(Number(ia[1]),!1),Ft=!0,Me()})();
