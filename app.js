"use strict";(()=>{const k=window.WINTERWATCH_LESSONS,I=window.WINTERWATCH_SOURCES,kt=window.
WINTERWATCH_DATES,ha=window.WINTERWATCH_ARTWORK||{},fa=window.WINTERWATCH_LESSON_VISUALS||
{},D=window.WINTERWATCH_ENGINE,S=window.WINTERWATCH_GAMES,le=window.WINTERWATCH_COUNTRIES,
Ae=window.WINTERWATCH_JURISDICTIONS,s=(e,t=document)=>t.querySelector(e),H=(e,t=document)=>[
...t.querySelectorAll(e)],r=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;",
"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),De=e=>{try{if(typeof e!="st\
ring"||/[\u0000-\u0020\u007f]/.test(e))return"#";const t=new URL(e);return t.protocol===
"https:"&&!t.username&&!t.password?t.href:"#"}catch{return"#"}},m=(e,t)=>{const a=I[e];
return`<a href="${r(De(a.url))}" target="_blank" rel="noopener noreferrer">${r(t||
a.title)} ↗</a>`},Te=D.empty,J="winterwatch-2026-progress-v3";let E="ready",Q=null,
Xe=!1,M=0,ce=!1;function ga(e){if(typeof e!="string"||e.length>12e3)throw Error(
"Invalid progress record");const t=JSON.parse(e);if(!t||t.version!==3)throw Error(
"Unsupported progress record");const a=D.restore(t);return a.generation=Number.isSafeInteger(
t.generation)&&t.generation>0?t.generation:0,a}function Ee(){const e=localStorage.
getItem(J);if(e===null)return{raw:e,progress:Te(),generation:0,status:"ready"};try{
const t=ga(e);return{raw:e,progress:t,generation:t.generation,status:t.opened.length?
"saved":"ready"}}catch{return{raw:e,progress:Te(),generation:0,status:"corrupt"}}}
function ba(){try{const e=Ee();return M=e.generation,Q=e.raw,E=e.status,e.progress}catch{
return E="unavailable",Te()}}function At(e){const t=globalThis.navigator?.locks;
return t?t.request(J,e):new Promise((a,n)=>{const o=indexedDB.open(J+"-lock",1);
o.onupgradeneeded=()=>o.result.createObjectStore("writers"),o.onerror=()=>n(o.error),
o.onsuccess=()=>{const i=o.result,l=i.transaction("writers","readwrite");l.oncomplete=
()=>{i.close(),a()},l.onabort=()=>{i.close(),n(l.error||Error("Write interrupted"))},
l.objectStore("writers").count().onsuccess=()=>{try{e()}catch(d){l.abort(),n(d)}}}})}
function Ze(e,t){const a=t?e.progress:D.mergeProgress(e.progress,D.snapshot(c)),
n=JSON.stringify(D.snapshot(c))!==JSON.stringify(D.snapshot(a)),{audience:o,country:i,
context:l,ambience:d}=c;M=e.generation,Q=e.raw,E=e.status,Object.assign(c,a,{audience:o,
country:i,context:l,ambience:d}),(n||t)&&(t&&(V={},z=null),clearTimeout(de),W=[],
Se=new Set(G().filter(u=>u.earned).map(u=>u.id)),N(),s("#lessonDialog").open?(v=
D.firstUnsolved(c,g),R()):s("#infoDialog").open&&O==="progress"&&oa()),se()}function Dt(){
try{const e=Ee();if(e.raw===Q)return;Ze(e,e.generation!==M||e.raw===null||e.status===
"corrupt")}catch{E="unavailable",se()}}function ma(){const e=D.snapshot(c),t=M;if(ce||
!e.opened.length)return;const a=n=>JSON.stringify(t?{...n,generation:t}:n);a(e)!==
Q&&At(()=>{const n=Ee();if(ce||t!==M)return;if(n.generation!==t||n.raw===null&&Q!==
null){Ze(n,!0);return}const o=D.mergeProgress(n.progress,e),i=a(D.snapshot(o));i!==
n.raw&&localStorage.setItem(J,i),Xe=!1,Ze({raw:i,progress:o,generation:t,status:"\
saved"},!1)}).catch(()=>{E="unavailable",se(),Xe||(Xe=!0,A("Progress could not b\
e saved. Check whether this browser allows site storage."))})}async function ya(){
ce=!0;try{await At(()=>{const e=Ee(),t=e.generation===Number.MAX_SAFE_INTEGER?1:
e.generation+1,a=JSON.stringify({version:3,generation:t});localStorage.setItem(J,
a),Q=a,M=t,E="ready"})}catch{E="unavailable"}finally{ce=!1}}function Tt(){return E===
"saved"?"Saved in this browser":E==="ready"?"Progress saves in this browser":E===
"corrupt"?"Saved progress could not be read":"Not saved · browser storage unavai\
lable"}function Et(){return E==="unavailable"?"This browser is not saving progre\
ss. Allow site storage to keep it after reload.":E==="corrupt"?"The saved record\
 could not be read. New progress can be saved; Reset progress removes the unread\
able record.":"Completed quests and decisions, reading bonuses and streak dates/\
counts are saved only in this browser."}let c=ba(),Se=new Set(G().filter(e=>e.earned).
map(e=>e.id)),W=[],de=null,Ke=null,Je=null;function St(){const e=document.activeElement;
if(e?.closest?.("#lessonDialog"))return Ke;if(e?.closest?.("#infoDialog"))return Je;
if(e?.closest?.("#mainNav")&&window.matchMedia("(max-width: 800px)").matches)return{
element:s("#menuToggle")};const t=Number(e?.dataset?.door);return Number.isInteger(
t)&&t>=1&&t<=24?{selector:`[data-door="${t}"]`}:{element:e}}function j(e){const t=e?.
selector?s(e.selector):e?.element;t&&t!==document.body&&t.isConnected!==!1&&(!t.
getClientRects||t.getClientRects().length)?t.focus({preventScroll:!0}):s("#calen\
darTitle").focus({preventScroll:!0})}function ue(e,t=!1){s(".site-header").classList.
toggle("menu-open",e),s("#menuToggle").setAttribute("aria-expanded",String(e)),t&&
s("#menuToggle").focus()}function Ct(){ue(!1),location.hash="#calendar";const e=s(
"#calendarTitle");e.scrollIntoView?.({block:"start"}),e.focus({preventScroll:!0})}
const T=s("#tourDialog");let xt=null,Ce=0;function Qe(e){const t=H("[data-tour-s\
tep]",T),a=t[e];if(!a)return;Ce=e,t.forEach((o,i)=>{o.hidden=i!==e}),s("#tourCou\
nt").textContent=String(e+1)+" of "+t.length;const n=s("#tourProgress");n.max=t.
length,n.value=e+1,s("#tourTip").textContent=a.dataset.tourTip,s("[data-tour-bac\
k]",T).disabled=e===0,s("[data-tour-next]",T).textContent=e===t.length-1?"Finish":
"Next",T.scrollTop=0,T.open&&s("h3",a).focus({preventScroll:!0})}function va(e){
!T||T.open||(w(),xt={element:e},T.returnValue="",T.showModal(),Qe(0))}let et="al\
l",g=null,C="play",q=c.audience==="everyone"?"technical":c.audience,v=0,V={},z=null,
O="",Rt=null,wa=null,y=null,xe="",Re=null;const tt={cyber:"Cybersecurity",ai:"AI\
 & agents",privacy:"Privacy",governance:"Rules & standards",ot:"Connected world"},
ee="This content has been developed using AI tools by members of the ENISA Ad Ho\
c Working Group (ARCH AHWG) to support awareness-raising and cyber hygiene initi\
atives. It does not constitute official ENISA guidance or formal regulatory advi\
ce.",pe="https://www.enisa.europa.eu/topics/awareness-and-cyber-hygiene/ar-in-a-\
box";function $a(){return`<div class="publisher-card"><img src="assets/winterwat\
ch-mark.svg" alt="" width="40" height="40"><p><b>${r(ee)}</b><br><a href="${pe}"\
 target="_blank" rel="noopener noreferrer">Learn more about AR-in-a-Box →</a></p\
></div>`}const ka=(e=new Date)=>{const t=new Intl.DateTimeFormat("en-GB",{timeZone:"\
Etc/GMT-1",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e);return Object.
fromEntries(t.map(a=>[a.type,a.value]))},te=(e=new Date)=>{const t=ka(e);return`${t.
year}-${t.month}-${t.day}`};let It=null,ae=!1;function Nt(e=new Date){const t=Object.
fromEntries(new Intl.DateTimeFormat("en-GB",{timeZone:"Etc/GMT-1",year:"numeric",
month:"2-digit",day:"2-digit"}).formatToParts(e).map(l=>[l.type,l.value])),a=Date.
UTC(Number(t.year),Number(t.month)-1,Number(t.day)),n=Date.UTC(2026,11,1),o=Date.
UTC(2026,11,24);if(a<n)return{phase:"before",day:0,remaining:24,untilStart:Math.
round((n-a)/864e5)};if(a>o)return{phase:"after",day:24,remaining:0,untilStart:0};
const i=Number(t.day);return{phase:"during",day:i,remaining:24-i,untilStart:0}}const Lt=(e=new Date)=>new Date(
e.getTime()-9*36e5),ne=(e=new Date)=>te(Lt(e)),Ie=(e=new Date)=>Nt(Lt(e));function Aa(e=new Date){
const t=ne(e);return new Date(Date.parse(t+"T08:00:00Z")+864e5)}function Pt(e,t=new Date){
return te(e)===te(t)?"Come back at 09:00 CET.":"Come back tomorrow at 09:00 CET."}
function at(e=new Date){const t=e.getTime();return k.filter(a=>Date.UTC(2026,11,
a.id,8)>=t)}function he(e,t){return Object.freeze({src:"assets/ambassador-"+e+".\
webp",alt:"NESTOR "+t+" on the Awareness Raising Ambassador badge. Cybersecurity\
. Powered by ENISA."})}const Da=he("family","in adult and child forms"),Mt=Object.
freeze([he("adult-female","in adult female form wearing a burgundy sweater"),he(
"adult-male","in adult male form wearing a green sweater"),he("child-female","in\
 child female form with a red sweater and pink flower"),he("child-male","in chil\
d male form wearing a blue sweater")]),Ta={};function Ea(e=new Date){const t=Ie(
e),a=t.phase==="during"?k.find(n=>n.id===t.day):null;return{...t,lesson:a,host:a?
Mt[(a.id-1)%Mt.length]:Da,brief:a?Ta[a.id]||a.takeaway:""}}function Sa(e=new Date){
const t=Ea(e),a=t.lesson,n=(l,d)=>{const u=s(l);u&&u.textContent!==d&&(u.textContent=
d)};n("#adventReminderKicker",a?`DAY ${a.id} · LEARN WITH NESTOR`:t.phase==="af\
ter"?"KEEP LEARNING WITH NESTOR":"A DAILY HELLO FROM NESTOR"),n("#adventTitleMai\
n",a?a.title:t.phase==="after"?"Keep your good habits.":"A little reminder.");const o=s(
"#adventTitleAccent");o&&(o.hidden=!!a),n("#adventTitleAccent",t.phase==="after"?
"A wiser year ahead.":"A wiser December."),n("#adventReminderBrief",a?t.brief:t.
phase==="after"?"NESTOR is here for a refresher. Revisit any day or finish misse\
d lessons at your own pace.":"Meet NESTOR in different forms. One guide, one use\
ful habit and ten minutes of festive learning each day."),n("#nestorRibbonKicker",
a?`DAY ${a.id} WITH NESTOR`:"ONE NESTOR. MANY FORMS."),n("#nestorRibbonDate",a?`${a.
id} December 2026`:"1–24 December 2026");const i=s("#adventHostImage");i&&i.getAttribute(
"src")!==t.host.src&&(window.WINTERWATCH_PORTRAIT?.select(t.host.src),i.setAttribute(
"src",t.host.src),i.setAttribute("alt",t.host.alt))}function fe(e=new Date){Sa(e);
const t=Nt(e),a=Math.max(0,24-c.completed.length),n=at(e),o=(u,p)=>{const h=s(u),
f=String(p);h&&h.textContent!==f&&(h.textContent=f)},i=t.phase==="before"?"Start\
s 1 December":t.phase==="after"?"Advent complete":`Day ${t.day} of 24`,l=t.phase===
"before"?"Advent days ahead":t.phase==="during"?"Days remaining after today":"Ad\
vent days remaining";o("#adventCurrentDay",i),o("#adventDaysRemaining",t.remaining),
o("#adventRemainingLabel",l),o("#adventQuestsRemaining",a),o("#adventTiming",t.phase===
"before"?`${t.untilStart} ${t.untilStart===1?"day":"days"} until Day 1 · 1–24 De\
cember 2026 · CET.`:t.phase==="after"?Ie(e).phase==="during"?"The final Advent \
door is released. All 24 lessons are available.":"All 24 lessons are available. \
Revisit any day or finish missed lessons at your own pace.":`${t.day===24?"The f\
inal Advent day is here.":`Today is Day ${t.day}.`} Doors unlock at 09:00 CET; q\
uest progress is separate.`);const d=s("[data-download-advent-reminders]");d&&(d.
disabled=ae||n.length===0,d.setAttribute("aria-disabled",String(d.disabled)),d.setAttribute(
"aria-busy",String(ae)),d.textContent=ae?"Preparing reminders…":n.length?`Add ${n.
length} daily ${n.length===1?"reminder":"reminders"}`:"2026 reminders have ended"),
o("#adventStatusAnnouncement",`${i}. ${t.remaining} Advent ${t.remaining===1?"da\
y":"days"} remaining${t.phase==="during"?" after today":""}. ${a} ${a===1?"quest":
"quests"} left to complete.`)}function Ot(){const e=new Date;fe(e),lt(),clearTimeout(
It),It=setTimeout(Ot,6e4-e.getTime()%6e4)}function _(){ma(),se();const e=G().filter(
t=>t.earned&&!Se.has(t.id));for(const t of e)Se.add(t.id);e.length&&(W.push(...e),
Ht())}function Ht(){clearTimeout(de),de=setTimeout(()=>{const e=W;W=[],na(e)},3200)}
function nt(){return D.xp(c)}function A(e){s("#toast").textContent=e;const t=s("\
dialog[open] [data-dialog-status]");t&&(t.textContent=e),s("#toast").classList.add(
"show"),clearTimeout(Rt),Rt=setTimeout(()=>s("#toast").classList.remove("show"),
3200)}function Ne(e=new Date){const t=Ie(e);return{...t,releasedThrough:t.phase===
"before"?0:t.day}}function ge(e,t=new Date){return e>(window.WINTERWATCH_PUBLISHED_THROUGH??
24)?!1:Number.isInteger(e)&&e>=1&&e<=24&&Number.isFinite(t.getTime())&&t.getTime()>=
Date.UTC(2026,11,e,8)}function x(e,t=new Date){return ge(e,t)}function Wt(e=new Date){
const t=Ne(e);return t.day>(window.WINTERWATCH_PUBLISHED_THROUGH??24)?"Refresh t\
he calendar for the latest published door. Earlier released lessons stay availab\
le.":t.phase==="before"?"Our first door opens on 1 December 2026 at 09:00 CET. S\
ee you then!":ge(24,e)&&c.completed.length===24?"You did it! All 24 days are com\
plete. You can revisit any lesson whenever you like.":t.phase==="during"&&t.day<
24?`${t.day===1?"Day 1 is ready.":`Doors 1–${t.day} are available.`} You can p\
lay any released lesson, including days you missed. ${Pt(Aa(e),e)} Day ${t.day+1}\
 opens on ${t.day+1} December 2026.`:"All 24 doors are available. Play any misse\
d lesson or revisit a reviewed day at your own pace."}function Le(e,t=new Date){
if(!Number.isInteger(e)||e<1||e>24||!Number.isFinite(t.getTime()))return"";const a=Math.
max(0,Math.ceil((Date.UTC(2026,11,e,8)-t.getTime())/1e3));if(!a&&e>(window.WINTERWATCH_PUBLISHED_THROUGH??
24))return"Refresh the calendar for the latest published door.";if(!a)return"Thi\
s door is ready to open.";const n=Math.floor(a/86400),o=i=>String(i).padStart(2,
"0");return`Come back in: ${n} ${n===1?"day":"days"} ${o(Math.floor(a%86400/3600))}\
:${o(Math.floor(a%3600/60))}:${o(a%60)}.`}function Ut(e,t=new Date){const a=Ne(t);
return ge(e,t)?`Day ${e} is available. You can play this lesson now.`:`${a.phase===
"during"&&e===a.day+1?Pt(new Date(Date.UTC(2026,11,e,8)),t)+" ":""}Day ${e} open\
s on ${e} December 2026 at 09:00 CET. ${Le(e,t)} All released lessons remain ava\
ilable.`}function ot(e,t=new Date){const a=x(e,t),n=a?`Day ${e} is now open. Clo\
se this note to explore it.`:Ut(e,t),o=s("#doorLockMessage");if(o.textContent=n,
a){o.innerHTML=`<p id="doorLockSchedule">${r(n)}</p>`;return}const i=Le(e,t),l=n.
split(i);if(l.length!==2)return;const d=i.replace(/^Come back in: /,"").replace(
/\.$/,"");o.innerHTML=`<p id="doorLockSchedule">${r(l[0].trim())}</p><div class=\
"locked-countdown"><span>Come back in:</span> <strong role="timer" aria-live="of\
f">${r(d)}</strong></div><p>${r(l[1].trim())}</p>`}function oe(){if(clearTimeout(
Re),Re=null,document.hidden)return;(s("#doorLockDialog").open&&!x(Pe)||xe==="loc\
ked"&&y!==null)&&(Re=setTimeout(Ca,1e3-new Date().getTime()%1e3))}function Ca(){
const e=new Date;if(s("#doorLockDialog").open&&ot(Pe,e),xe==="locked")if(x(y,e))
N();else{const t=s("#santaCountdown");t&&(t.textContent=Le(y,e))}rt!==ne(e)&&lt(),
oe()}let st=null,Pe=null;function it(e){w();const t=s("#doorLockDialog");if(Pe=e,
!t.open){const a=document.activeElement,n=Number(a?.dataset?.door);st=Number.isInteger(
n)&&n>=1&&n<=24?{selector:`[data-door="${n}"]`}:{element:a}}ot(e),s("#doorLockLi\
sten").dataset.listen=String(e),s("#doorLockListen").setAttribute("aria-label",`\
Listen to the Day ${e} opening message`),t.open||t.showModal(),s("#doorLockAckno\
wledge").focus({preventScroll:!0}),oe()}function xa(){if(s("#lessonDialog").open){
const e=st?.element;e?.isConnected!==!1&&e?.closest?.("#lessonDialog")?e.focus({
preventScroll:!0}):s("#lessonDialog [data-close]")?.focus({preventScroll:!0})}else
s("#infoDialog").open?s("#infoDialog [data-close-info]")?.focus({preventScroll:!0}):
j(st)}let rt="";function lt(){if(s("#holidayDialog").open&&!qt()&&s("#holidayDia\
log").close(),s("#welcomeDialog").open&&!Me()&&s("#welcomeDialog").close(),s("#d\
oorLockDialog").open&&ot(Pe),s("#nestorDoorMessage").textContent=Wt(),rt===ne()){
Oe();return}const e=Number(document.activeElement?.dataset?.door);N(),s("#lesson\
Dialog").open&&!x(g)?(s("#lessonDialog").close(),it(g)):Number.isInteger(e)&&e>=
1&&e<=24&&s(`[data-door="${e}"]`)?.focus({preventScroll:!0}),Oe()}function U(){return x(
g)?!0:(s("#lessonDialog").open&&s("#lessonDialog").close(),it(g),!1)}function se(){
const e=nt(),t=c.completed.length,a=Tt(),n=`${e.toLocaleString()} XP`,o=`${t} of\
 24 quests`;s("#navCount").textContent=n,s(".progress-button small").textContent=
`${o} · ${a}`,s("#progressRing").style.setProperty("--progress",`${e/24}%`),s("\
#progressButton").setAttribute("aria-label",`View progress: ${n}, ${o} complete`),
s("#calendarProgress")&&(s("#calendarProgressCount").textContent=`${o} complete`,
s("#calendarProgressXp").textContent=n,s("#calendarProgressBar").value=t,s("#cal\
endarProgressStorage").textContent=a),fe()}const Ra=e=>{const t={tree:'<path d="\
M32 5 18 23h8L13 39h11L9 55h46L40 39h11L38 23h8L32 5Z"/><path d="M29 55v8h6v-8M3\
2 15v29"/><path d="m23 30 9 5 9-5m-22 15 13 5 14-5"/><circle cx="32" cy="8" r="2\
"/>',gift:'<path d="M10 30h44v29H10zM6 21h52v10H6zM28 21h8v38"/><path d="M32 21C\
9 23 10 4 21 9c6 2 11 12 11 12Zm0 0C55 23 54 4 43 9c-6 2-11 12-11 12Z"/><path d=\
"m31 21-9 13m11-13 9 13"/>',snowflake:'<path d="M32 5v54M8.6 18.5l46.8 27M8.6 45\
.5l46.8-27M24 10l8 8 8-8M24 54l8-8 8 8M10 28l11-3-3-11M54 36l-11 3 3 11M18 50l3-\
11-11-3M46 14l-3 11 11 3"/><circle cx="32" cy="32" r="7"/>',bell:'<path d="M15 4\
6h34l-6-8V26c0-9-5-15-11-15s-11 6-11 15v12l-6 8ZM12 47h40M26 50c0 8 12 8 12 0M29\
 11V7h6v4"/><path d="M17 16c-5 4-7 8-7 14m37-14c5 4 7 8 7 14M21 41h23"/>',mug:'<\
path d="M13 25h32v23c0 11-32 11-32 0V25ZM45 29h5c13 0 10 18-5 18M9 58h41M22 17c-\
6-7 6-8 0-15m11 15c-6-7 6-8 0-15"/><path d="m23 37 6 6 9-12"/>',shield:'<path d=\
"M32 5 52 14v19c0 16-20 27-20 27S12 49 12 33V14L32 5Z"/><path d="m23 32 7 7 13-1\
7M32 11l14 7v15c0 10-14 20-14 20"/><path d="m7 8 2 4 4 1-4 1-2 4-1-4-4-1 4-1Z"/>',
key:'<circle cx="24" cy="23" r="13"/><circle cx="24" cy="23" r="5"/><path d="m33\
 33 21 21-6 6-7-7 3-3-6-6-3 3-8-8M15 7l-3-5m-6 15-5-1m43 1 6-2"/>',star:'<path d\
="m32 5 7 19 20 1-16 13 5 20-16-11-17 11 6-20L5 25l20-1L32 5Z"/><path d="m32 18 \
4 11 12 1-9 7 2 11-9-6-10 6 3-11-9-7 12-1 4-11Z"/>',clock:'<circle cx="32" cy="3\
5" r="22"/><circle cx="32" cy="35" r="17"/><path d="M32 22v14l9 6M26 7h12M32 7v6\
M50 15l4-4M14 15l-4-4"/>',sparkle:'<path d="M31 5c3 16 7 20 22 25-15 4-19 9-22 2\
6-4-17-8-22-23-26 15-5 19-9 23-25Z"/><path d="M51 2c1 7 3 10 9 12-6 2-8 5-9 11-2\
-6-4-9-10-11 6-2 8-5 10-12ZM12 46c1 5 3 7 7 8-4 1-6 3-7 8-1-5-3-7-7-8 4-1 6-3 7-\
8Z"/>'};return`<svg viewBox="0 0 64 66" fill="none" stroke="currentColor" stroke\
-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${t[e]||
t.star}</svg>`};function Ia(e,t=new Date){if(!k.find(i=>i.id===e))return{status:"\
empty"};if(!x(e,t))return{id:e,status:"locked",done:0};const n=c.completed.includes(
e),o=c.opened.includes(e);return{id:e,status:n?"reviewed":o?"in-progress":"not-s\
tarted",done:o?Math.min(3,(c.solved[e]||[]).length):0}}function Ft(){const e=document.
activeElement,t=!!e?.closest?.("#santaListContent"),a=e?.id==="santaDayPicker"?"\
#santaDayPicker":e?.hasAttribute?.("data-listen-santa")?"[data-listen-santa]":"[\
data-open]",n=new Date,o=k.filter(f=>x(f.id,n)),i=c.opened.filter(f=>x(f,n));k.some(
f=>f.id===y)||(y=i[i.length-1]||Ne(n).releasedThrough||1);const l=Ia(y,n),d=k.find(
f=>f.id===y);xe=l.status;const u={locked:"UPCOMING DOOR","not-started":"NOT OPEN\
ED YET","in-progress":"LESSON IN PROGRESS",reviewed:"REVIEWED"}[l.status];let p="";
if(l.status==="locked")p=`<h3>A new habit awaits.</h3><p>Day ${y} opens on ${y} \
December 2026 at 09:00 CET.</p><p id="santaCountdown" class="santa-countdown" ro\
le="timer" aria-live="off">${r(Le(y,n))}</p><p>Play any released door while you \
wait.</p><button type="button" class="button button-green" data-open="${y}">Open\
ing details for Day ${y}</button>`;else if(l.status==="reviewed"){const f=S[y].habit,
P=f.filter(b=>/^Do:/i.test(b)).map(b=>b.replace(/^Do:\s*/i,"")),$=f.filter(b=>/^Do not:/i.
test(b)).map(b=>b.replace(/^Do not:\s*/i,""));p=`<h3>${r(d.short)}</h3><section \
class="santa-habits"><h4><span aria-hidden="true">✓</span> Nice habits</h4><ul>${P.
map(b=>`<li>${r(b)}</li>`).join("")}</ul><h4><span aria-hidden="true">×</span> N\
aughty traps</h4><ul>${$.map(b=>`<li>${r(b)}</li>`).join("")}</ul></section><p c\
lass="santa-signoff">Even Santa verifies twice.</p><button type="button" class="\
button button-green" data-open="${y}">Revisit Day ${y}</button>`}else{const f=l.
status==="in-progress";p=`<h3>${r(d.short)}</h3>${f?`<p class="santa-progress">${l.
done} of 3 decisions complete</p><progress max="3" value="${l.done}" aria-label=\
"Day ${y} decisions complete">${l.done} of 3</progress><p>${r(E==="saved"?"Your \
progress is saved on this device.":Et())}</p>`:"<p>This door is still ready for \
you. Open it whenever you’re ready.</p>"}<div class="santa-waiting"><h4>Your h\
abit recap is waiting.</h4><p>Finish the lesson to reveal its Nice habits and Na\
ughty traps.</p></div><button type="button" class="button button-green" data-ope\
n="${y}">${f?"Continue":"Open"} Day ${y}</button>`}s("#santaListContent").innerHTML=
`<label class="santa-picker" for="santaDayPicker">Choose a door<select id="santa\
DayPicker" data-santa-select>${k.map(f=>`<option value="${f.id}" ${f.id===y?"sel\
ected":""}>Day ${f.id} · ${x(f.id,n)?c.completed.includes(f.id)?"reviewed":c.opened.
includes(f.id)?"in progress":"ready":"upcoming"}</option>`).join("")}</select></\
label><p class="santa-day"><span aria-hidden="true">${String(y).padStart(2,"0")}\
</span> Day ${y} · ${r(u)}</p>${p}<button type="button" class="santa-listen" da\
ta-listen-santa data-listen="${y}" aria-label="Listen to Day ${y}" aria-pressed=\
"false">${we("Listen")}</button>`;for(const f of H("[data-chalet-day]"))f.classList.
toggle("is-santa-selected",Number(f.dataset.chaletDay)===y);const h=s("#santaDay\
Picker");h&&(h.value=String(y)),s("#santaStatusAnnouncement").textContent=`Santa\
’s list: Day ${y}, ${u.toLowerCase()}.`,t&&(s(a,s("#santaListContent"))||s("#s\
antaDayPicker"))?.focus({preventScroll:!0}),oe()}function Na(e){const t=e.contexts??
S[e.id]?.contexts;return c.context==="all"||t?.includes(c.context)}function La(e){
return Object.fromEntries(["all",...Object.keys(tt)].map(t=>[t,e.filter(a=>t==="\
all"||a.category===t).length]))}function N(){w();const e=k.filter(Na);for(const[
n,o]of Object.entries(La(e))){const i=s(`[data-category="${n}"] [data-category-c\
ount]`);i&&(i.textContent=n==="all"?String(o):`(${o})`)}const t=Ne();y===null&&(y=
c.opened.filter(n=>x(n)).slice(-1)[0]||t.releasedThrough||1);const a=e.filter(n=>et===
"all"||n.category===et);s("#doorsGrid").innerHTML=a.map(n=>{const o=x(n.id),i=!o,
l=o&&c.opened.includes(n.id),d=o&&c.completed.includes(n.id),u=t.phase==="during"&&
t.day===n.id,p=c.audience==="everyone"?S[n.id]?.role||"Upcoming door":`${c.audience}\
 perspective`,h=d?"completed":i?"upcoming":u?"today":l?"opened":"available",f=d?
c.readings.includes(n.id)?"Reviewed · source bonus earned":"Reviewed · lesson c\
omplete":"Opened · lesson to finish",P=`Opens ${n.id} Dec · 09:00 CET`,$=d?"Re\
viewed":l?"In progress":i?"Upcoming":u?"Today’s door":"Ready to open",b=i?Ut(n.
id):l||d?`${f}. ${p}.`:"Open this lesson.",An=String(n.id).padStart(2,"0"),pa=`t\
one-${(n.id-1)%8}`;return`<div class="door-card ${pa}${n.id===y?" is-santa-selec\
ted":""}${i?" is-upcoming":""}" data-chalet-day="${n.id}">
        <button class="advent-door ${pa}${l||d?" is-unwrapped":""}${u&&!d?" is-t\
oday":""}${i?" is-upcoming":""}" data-door="${n.id}" data-door-status="${h}" typ\
e="button"
          aria-label="Day ${n.id}: ${r(n.short)}. ${r(b)}" title="${r(i?P:n.title)}\
"${i?' aria-disabled="true"':""}>
          <span class="chalet-door-number">${An}</span>
          <span class="chalet-door-title">${r(n.short)}</span>
          <span class="chalet-door-state">${d?'<span aria-hidden="true">✓</span>\
 ':""}${$}</span>
        </button>
        <button type="button" class="door-listen" data-listen="${n.id}" aria-lab\
el="Listen to Day ${n.id}" aria-pressed="false">${we("Listen")}</button>
      </div>`}).join(""),Ft(),s("#emptyState").hidden=a.length>0,s("#announcer").
textContent=`${a.length} lessons shown`,s("#modeLabel").textContent=t.phase==="b\
efore"?"A daily December tradition.":t.phase==="during"?`Day ${t.day} of 24 · da\
ily unlock at 09:00 CET.`:"All 24 lessons are available.",s("#modeDetail").textContent=
"Released lessons stay available. A new door opens at 09:00 CET.",s("#nestorDoor\
Message").textContent=Wt(),s("#contextFilter").value=c.context,rt=ne(),H("[data-\
audience]").forEach(n=>{const o=n.dataset.audience===c.audience;n.classList.toggle(
"active",o),n.setAttribute("aria-pressed",o)})}function X(e){if(w(),!k.find(o=>o.
id===e))return;if(y=e,Ft(),!x(e)){it(e),!s("#lessonDialog").open&&/^#day=/.test(
location.hash)&&history.replaceState(null,"","#calendar");return}s("#lessonDialo\
g").open||(Ke=St()),s("#welcomeDialog").open&&s("#welcomeDialog").close(),s("#ho\
lidayDialog").open&&ct==="christmas"&&s("#holidayDialog").close(),ue(!1);const a=c.
opened.includes(e);a||(c.opened.push(e),_(),A("+10 XP · A little wiser already.")),
s("#infoDialog").open&&s("#infoDialog").close(),g=e,C="play",v=D.firstUnsolved(c,
e),z=null,q=c.audience==="everyone"?"technical":c.audience,R(),s("#lessonDialog").
open||s("#lessonDialog").showModal(),history.replaceState(null,"",`#day=${e}`),N(),
e===24&&!Yt?ut():e===1&&!a&&!dt&&Me()&&Vt()}let Yt=!1,Gt=!1,be=null,ct="lesson",
dt=!1,Bt=null,jt=!1;function Me(e=new Date){const t=Ie(e);return t.phase==="duri\
ng"&&t.day===1&&ge(1,e)}function qt(e=ct,t=new Date){return e==="christmas"?te(t)===
"2026-12-25"&&ge(24,t):e==="lesson"&&g===24&&s("#lessonDialog").open&&x(24,t)}function ut(e="\
lesson"){if(!qt(e))return;w();const t=s("#holidayDialog");t.open||(be=document.activeElement),
ct=e,Yt=!0,te()==="2026-12-25"&&(Gt=!0),s("#holidayKicker").textContent=e==="chr\
istmas"?"25 DECEMBER · A FESTIVE HELLO FROM NESTOR":"DAY 24 · A FESTIVE HELLO F\
ROM NESTOR",s("#holidayAcknowledge").textContent=e==="christmas"?"Continue the c\
alendar":"Back to Day 24",t.open||t.showModal(),t.scrollTop=0,s("#holidayClose").
focus({preventScroll:!0})}function Pa(){s("#lessonDialog").open?be?.isConnected!==
!1&&be?.closest?.("#lessonDialog")?be.focus({preventScroll:!0}):s("#lessonDialog\
 [data-holiday-greeting]")?.focus({preventScroll:!0}):j({element:be})}function Vt(){
if(!Me())return;w();const e=s("#welcomeDialog");e.open||(Bt=document.activeElement),
dt=!0,e.open||e.showModal(),e.scrollTop=0,s("#welcomeClose").focus({preventScroll:!0})}
function Ma(){s("#lessonDialog").open?s("#lessonDialog [data-close]")?.focus({preventScroll:!0}):
j({element:Bt})}function Oe(){if(!(!jt||T?.open||["#lessonDialog","#infoDialog",
"#doorLockDialog","#holidayDialog","#welcomeDialog","#accessibilityDialog"].some(
e=>s(e).open))){if(te()==="2026-12-25"&&!Gt){ut("christmas");return}Me()&&!dt&&!c.
opened.includes(1)&&!c.completed.includes(1)&&Vt()}}function Z(){queueMicrotask(
Oe)}function Oa(e){return typeof e=="string"&&/^assets\/lessons\/[a-z0-9-]+\.webp$/.
test(e)?e:""}function F(e){const t=fa[e.id],a=t&&ha[t.artwork];return a&&Oa(a.src)?
{...t,...a}:null}function Ha(e){const t=F(e);return t?`<figure class="lesson-vis\
ual"><div class="lesson-visual-image"><img src="${r(t.src)}" alt="${r(t.alt)}" w\
idth="1536" height="1024" decoding="async"><span class="artwork-label">ILLUSTRAT\
IVE ARTWORK</span></div><figcaption><div class="lab-kicker">SEE THE LESSON</div>\
<p class="visual-caption">${r(t.caption)}</p><dl>${[["The risk",t.risk],["The si\
gnal",t.signal],["Your action",t.action]].map(([a,n])=>`<div><dt>${a}</dt><dd>${r(
n)}</dd></div>`).join("")}</dl><small>AI-generated concept scene, not an inciden\
t photograph.</small></figcaption></figure>`:""}function Wa(e){const t=F(e);return t?
`<div class="illustrated-card-hint"><img src="${r(t.src)}" alt="${r(t.alt)}" wid\
th="93" height="62" loading="lazy"><span>Your lesson illustration is included in\
 both card formats.<small>Square: 1080 × 1080 · Status: 1080 × 1920 · labelled A\
I-generated.</small></span></div>`:""}const Ua=Math.floor(Math.random()*4294967296)||
1;function He(e,t){const a=Array.from({length:e},(n,o)=>o);t=(t^Ua)>>>0||1,t=Math.
imul(t^t>>>16,73244475)>>>0,t=Math.imul(t^t>>>16,73244475)>>>0,t=(t^t>>>16)>>>0||
1;for(let n=e-1;n>0;n--){t^=t<<13,t^=t>>>17,t^=t<<5;const o=Math.floor((t>>>0)/4294967296*
(n+1));[a[n],a[o]]=[a[o],a[n]]}return a}function zt(e,t){return He(e.options.length,
t)}function Fa(e,t){const a=He(e,t);return e>1&&a.every((n,o)=>n===o)&&([a[0],a[1]]=
[a[1],a[0]]),a}function Y(e,t,a=!1){const n=`${e}-${t}`,o=S[e].steps[t];if(!V[n]){
const i=!a&&c.solved[e]?.includes(t);V[n]={selected:[],order:o.kind==="order"?Fa(
o.items.length,e*97+t*19):[],habits:o.kind==="habits"?o.cards.map(l=>null):[],hint:!1,
response:null,result:i?{correct:!0,earned:0,revisit:!0}:null}}return V[n]}function Ya(e){
return`<div class="framework-notes"><span>CONNECT THE LESSON</span>${S[e.id].frameworks.
map(t=>`<div><b>${m(t.source,t.code)}</b><p>${r(t.why)}</p></div>`).join("")}</d\
iv>`}function Ga(e,t){if(!t.result)return"";{const a=t.result,n=a.correct?'<butt\
on class="button button-green" data-next-stage>Continue →</button>':'<button c\
lass="button button-green" data-retry-step>Try again →</button>';return`<div c\
lass="decision-feedback" role="status" tabindex="-1"><p>${r(a.feedback||(a.correct?
"Decision completed.":"Try again."))}</p>${n}</div>`}}function Ba(e){const t=S[e.
id],a=F(e),n=c.completed.includes(e.id),o=c.readings.includes(e.id),i=`<div clas\
s="game-stage-track" aria-label="Daily decision progress">${t.steps.map(($,b)=>`\
<button data-stage="${b}" ${b>D.firstUnsolved(c,e.id)?"disabled":""} class="${c.
solved[e.id]?.includes(b)?"solved":""} ${v===b?"current":""}"><span>${c.solved[e.
id]?.includes(b)?"✦":String(b+1).padStart(2,"0")}</span><small>${r(["Understan\
d","Decide","Protect"][b])}</small></button>`).join("")}<div><b>${me(e.id)}</b><\
small>/100 XP</small></div></div>`,l=`<div class="game-cover">${a?`<img src="${r(
a.src)}" alt="${r(a.alt)}" width="400" height="267" decoding="async">`:""}<div><\
span class="game-role">${r(t.role)}</span><p>${r(t.setup)}</p><small>Illustrativ\
e choices with feedback · source facts in the case file</small></div></div>`;if(v>=
3&&n)return`${i}<section class="day-reward" data-day-reward tabindex="-1"><div c\
lass="reward-wreath" aria-hidden="true"><span>✦</span><i></i><i></i><i></i></div\
><div class="lab-kicker">DAY ${e.id} PROTECTED · ${o?"100":"80"} XP</div><h3>Yo\
u made the decisions.<br>Now make the habit stick.</h3><p>${r(e.takeaway)}</p><d\
iv class="reward-habits">${t.habit.map($=>`<p>${r($)}</p>`).join("")}</div><div \
class="reward-buttons"><button class="button button-green" data-tab="sources">${o?
"Revisit your source bonus":"Unwrap the reading bonus · +20 XP"} →</button><but\
ton class="button button-soft" data-replay-day>Replay decisions</button></div><b\
utton class="subtle-button" data-celebrate="day">Replay the celebration ✧</butto\
n></section>${Ya(e)}`;const d=Math.min(v,2),u=t.steps[d],p=Y(e.id,d),h=!!p.result;
let f="";const P={select:"Check my decision",order:"Check the sequence",habits:"\
Check my habits"}[u.kind];return u.kind==="choice"&&(f=`<div class="decision-opt\
ions">${zt(u,e.id*13+d*7).map(($,b)=>`<button data-game-choice="${$}" ${h?"disab\
led":""} class="${h&&p.response===$?"chosen":""}"><span>${String.fromCharCode(65+
b)}</span><span class="decision-option-text">${r(u.options[$].text)}</span><i ar\
ia-hidden="true">↗</i></button>`).join("")}</div>`),u.kind==="select"&&(f=`<p \
class="interaction-hint">Choose every useful option, then check your decision.</\
p><div class="evidence-options">${He(u.options.length,e.id*13+d*7).map($=>`<butt\
on role="checkbox" aria-checked="${p.selected.includes($)}" data-evidence-option\
="${$}" ${h?"disabled":""}><span>${p.selected.includes($)?"✓":"+"}</span>${r(u.
options[$].text)}</button>`).join("")}</div>`),u.kind==="order"&&(f=`<p class="i\
nteraction-hint">Move the cards into sequence. The arrow controls also work with\
 a keyboard.</p><ol class="sequence-cards">${p.order.map(($,b)=>`<li><span class\
="sequence-position">${b+1}</span><p>${r(u.items[$].text)}</p><div><button data-\
order-from="${b}" data-order-direction="-1" ${h||b===0?"disabled":""} aria-label\
="Move item ${b+1} up">↑</button><button data-order-from="${b}" data-order-dir\
ection="1" ${h||b===p.order.length-1?"disabled":""} aria-label="Move item ${b+1}\
 down">↓</button></div></li>`).join("")}</ol>`),u.kind==="habits"&&(f=`<p clas\
s="interaction-hint">Mark each move as a habit to do or a habit to avoid.</p><di\
v class="habit-round">${He(u.cards.length,e.id*71+d*29).map($=>{const b=u.cards[$];
return`<div><p>${r(b.text)}</p><div role="group" aria-label="${r(b.text)}"><butt\
on data-habit-index="${$}" data-habit-value="do" aria-pressed="${p.habits[$]===!0}\
" ${h?"disabled":""}>Do ✓</button><button data-habit-index="${$}" data-habit-v\
alue="avoid" aria-pressed="${p.habits[$]===!1}" ${h?"disabled":""}>Do not ×</but\
ton></div></div>`}).join("")}</div>`),`${i}${l}<section class="decision-round"><\
div class="decision-kicker"><span>DECISION ${d+1} OF 3</span><b>${c.solved[e.id]?.
includes(d)?"20 XP earned":"20 XP to discover"}</b></div><h3 tabindex="-1" data-\
decision-title>${r(u.title)}</h3><p>${r(u.body)}</p>${f}${h?"":`<div class="deci\
sion-actions">${P?`<button type="button" class="button button-green check-decisi\
on" data-check-step>${r(P)} →</button>`:""}<button type="button" class="clue-b\
utton" data-game-hint aria-expanded="${!!p.hint}" aria-controls="gameClue">${p.hint?
"Hide the clue":"A little clue?"} ✧</button></div><div class="game-clue" id="gam\
eClue" ${p.hint?"":"hidden"}>${r(u.hint)}</div>`}${Ga(u,p)}${window.WINTERWATCH_GRADER?
"":'<p role="status">Answer checking is unavailable in this view. You can explor\
e the questions, briefing and playbook.</p>'}</section><p class="game-reassuranc\
e">Try, learn and try again. A wrong answer does not remove earned points.</p>`}
async function _t(e,t,a){if(!window.WINTERWATCH_GRADER)return A("Answer checking\
 is currently unavailable. You can still explore the briefing and playbook."),null;
try{const n=await window.WINTERWATCH_GRADER(e,t,a);if(typeof n?.correct!="boolea\
n"||typeof n.feedback!="string")throw Error();return n}catch{return A("Answer ch\
ecking is unavailable. Please try again later."),null}}async function Xt(e){const t=k.
find(i=>i.id===g);if(!t||v>2||!U())return;const a=S[t.id].steps[v],n=Y(t.id,v);if(n.
result)return;const o=a.kind==="choice"?e:a.kind==="select"?n.selected:a.kind===
"order"?n.order:n.habits;if(!(a.kind==="choice"&&(!Number.isInteger(o)||o<0||o>=
a.options.length))){if(a.kind==="habits"&&o.some(i=>typeof i!="boolean")){A("Cla\
ssify each habit before checking.");return}if(a.kind==="select"&&!o.length){A("C\
hoose the evidence you would use.");return}n.response=Array.isArray(o)?[...o]:o;
{if(n.pending)return;n.pending=!0;const i=v,l=M,d=await _t(t.id,i,n.response);if(n.
pending=!1,!d||g!==t.id||v!==i||M!==l||!U()||V[t.id+"-"+i]!==n)return;n.result={
...D.recordStep(c,t.id,i,d.correct),feedback:d.feedback}}n.result.completed&&D.recordLearningDay(
c,ne()),_(),R(),N(),s(".decision-feedback")?.focus({preventScroll:!0}),n.result.
completed?pt("day"):n.result.earned&&A(`+${n.result.earned} XP · Decision unlock\
ed.`)}}function ja(){U()&&(v=Math.min(3,v+1),R(),s("#lessonDialog").scrollTop=0,
v===3?s("[data-day-reward]")?.focus({preventScroll:!0}):s("[data-decision-title]")?.
focus({preventScroll:!0}))}function qa(e){const t=S[e.id].reading,a=I[t.source],
n=c.readings.includes(e.id);return`<section class="reading-quest ${n?"reading-wo\
n":""}"><div class="reading-quest-top"><span class="reading-book" aria-hidden="t\
rue">▱</span><div><div class="lab-kicker">THE EVIDENCE BONUS · 20 XP</div><h3>${n?
"One source. A little more wisdom.":"Go one layer deeper."}</h3></div><b>${n?"✓ \
UNLOCKED":"+20 XP"}</b></div><p>${r(t.locator)} · ${m(t.source,"Open the primar\
y source")}</p>${a.excerpt?`<blockquote>“${r(a.excerpt)}”<cite>${r(a.excerptAt||
a.org)}</cite></blockquote>`:""}<p class="reading-question">${r(t.question)}</p>\
<div class="reading-options">${zt(t,e.id*43).map(o=>`<button data-reading-answer\
="${o}" ${n?"disabled":""} class="">${r(t.options[o].text)}</button>`).join("")}\
</div><div class="reading-feedback" role="status" tabindex="-1">${n?"✦ Evidence \
bonus earned. "+r(z||"Reading completed."):z?r(z):"Read, connect the evidence an\
d choose the best answer. Points reward the answer, not a claim that an external\
 page was read."}</div>${n?'<button class="subtle-button" data-celebrate="readin\
g">Replay the reading celebration ✧</button>':""}</section>`}async function Va(e){
const t=k.find(o=>o.id===g);if(!t||!U())return;const a=S[t.id].reading;let n;{const o=M,
i=await _t(t.id,3,e);if(!i||g!==t.id||o!==M||!U())return;n=D.recordReading(c,t.id,
i.correct),z=i.feedback}n.earned&&(_(),N()),R(),s(".reading-feedback")?.focus({preventScroll:!0}),
n.earned&&pt("reading")}function pt(e,t=!1){if(!["day","reading"].includes(e)||(W.
length&&Ht(),A(t?"Celebration replayed · your earned points stay the same.":e===
"day"?`Day ${g} complete · ${me(g)} XP earned.`:"Evidence bonus unlocked · +20 \
XP."),re()))return;const a=document.createElement("div");a.className=`celebratio\
n-layer ${e==="reading"?"reading-celebration":"day-celebration"}`,a.setAttribute(
"aria-hidden","true"),a.innerHTML=`<div class="celebration-emblem">${e==="readin\
g"?"▱":"✦"}<span>${e==="reading"?"A LITTLE MORE WISDOM":"DAY "+g+" PROTECTED"}\
</span></div>${Array.from({length:e==="reading"?9:22},(n,o)=>`<i style="--x:${5+
o*37%90}%;--size:${14+o%4*7}px;--delay:${o%6*45}ms">${o%3===0?"✧":o%3===1?"❄":
"✦"}</i>`).join("")}`,H(".celebration-layer").forEach(n=>n.remove()),(s("#less\
onDialog").open?s("#lessonDialog"):document.body).append(a),setTimeout(()=>a.remove(),
e==="reading"?2e3:2600)}function za(e){const t=S[e.id].legal||[];return t.length?
`<div class="legal-brief"><div class="lab-kicker">FROM THE RULE TO THE DECISION<\
/div>${t.map(a=>`<article><b>${m(a.source,a.article)}</b><blockquote>“${r(a.excerpt)}\
”</blockquote><p>${r(a.meaning)}</p></article>`).join("")}<small>Short excerpt\
s need the full article, legal role, national context and current application da\
te.</small></div>`:""}function _a(){return'<section class="jurisdiction-atlas" a\
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
ion’s coverage, not legal status.</p></section>'}function ht(e=!1){return`<div\
 class="country-prompt"><h3>Choose your country to find official contacts.</h3><\
p>Select a country on the map or in the list. Then match the incident to the rou\
te below and confirm the responsible authority, entity and sector. Your choice s\
tays in this page; it does not detect your location.</p></div><label class="coun\
try-select">Country for this exercise <select data-country-select><option value=\
"" disabled ${c.country?"":"selected"}>Select your country…</option>${Ae.map(t=>`\
<option value="${t.id}" ${t.id===c.country?"selected":""}>${r(t.name)}</option>`).
join("")}</select></label><details class="country-atlas-inline" ${e?"open":""}><\
summary>About the eight detailed country profiles</summary>${_a()}</details>`}function ft(){
const e=Ae.find(a=>a.id===c.country),t=le.find(a=>a.id===c.country);return e?`<s\
ection class="country-card"><p class="country-selection-status" role="status">Sh\
owing contact routes for <b>${r(e.name)}</b>.</p><h3>Match the issue to the resp\
onsible party.</h3>${t?"":`<p>This edition has no detailed NIS2 profile for ${r(
e.name)}. Use the official directories below to find its current authorities; no\
 national commencement or deadline is assumed.</p>`}<div class="stakeholder-card\
s"><article><b>Cyber incident · national CSIRT / competent authority</b><p>${t?
`${r(t.authority)}. <a href="${r(De(t.report))}" target="_blank" rel="noopener n\
oreferrer">${r(t.reportLabel)} ↗</a>`:`${m("csirts","Open the national CSIRT d\
irectory")} and find ${r(e.name)}`}. Confirm the designated reporting channel, s\
ignificance threshold and entity scope.</p></article><article><b>Personal-data b\
reach · competent DPA</b><p>${t?`<a href="${r(De(t.privacy))}" target="_blank" \
rel="noopener noreferrer">${r(t.privacyLabel)} ↗</a>`:`${m("dpas","Open the ED\
PB authority directory")} and find ${r(e.name)}`}. Confirm competence for the co\
ntroller and any cross-border processing; a processor informs its controller.</p\
></article><article><b>Financial services · sector authority</b><p>Covered finan\
cial entities use their competent authority’s DORA process${t?.financial?` · <\
a href="${r(De(t.financial))}" target="_blank" rel="noopener noreferrer">${r(t.financialLabel)}\
 ↗</a>`:""}. Confirm the entity’s supervisor and current reporting procedure.<\
/p></article><article><b>Connected product · manufacturer reporting</b><p>Applic\
able manufacturers follow the ${m("cra","CRA Single Reporting Platform guidance")}\
. Assess the product role and reporting trigger separately.</p></article><articl\
e><b>AI issue · designated national authority</b><p>${m("aiNational","Open AI A\
ct national resources")} and select ${r(e.name)}. Check the AI use, operator rol\
e and current competent authority.</p></article><article><b>Suspected crime · na\
tional police</b><p>${m("police","Find national cybercrime reporting routes")} f\
or ${r(e.name)}. Europol’s directory points to national routes; it is not a publ\
ic incident-reporting desk.</p></article></div><p class="source-note">Country se\
lection does not decide entity scope, DPA competence or every applicable reporti\
ng duty. More than one route may apply. Confirm recipients from official sources\
 before sharing sensitive information.</p></section>`:'<section class="country-c\
ard"><h3>Choose a country to view contact routes.</h3><p>No jurisdiction is assu\
med. For a cross-border organisation, involve privacy / legal to establish the c\
ompetent authorities.</p></section>'}function Zt(){const e=le.find(t=>t.id===c.country);
return e?`${ft()}<section class="country-card"><div class="country-card-heading"\
><span>${r(e.status)}</span><h3>${r(e.name)} · NIS2 profile</h3>${e.effective?`\
<p>National NIS2 commencement: <b>${yt(e.effective)}</b></p>`:"<p>Check for a cu\
rrent enacted NIS2 commencement date in the official sources.</p>"}</div><p>${r(
e.note)}</p>${e.milestones.length?`<div class="national-milestones">${e.milestones.
map(t=>`<div><time>${yt(t.date)}</time><b>${r(t.name)}</b><p>${r(t.detail)} ${m(
t.source,"Source")}</p></div>`).join("")}</div>`:""}<p class="source-note">${m(e.
source,"Read the national source")}. Verify current scope, enactment and later c\
hanges before relying on these dates.</p></section>`:ft()}function Xa(e){const t=F(
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
d verify a corrective action. ${m("nistIR","Read the framework")}</p></div>`}function Za(e){
return`<details class="stakeholder-guide" open><summary>Who needs to be involved\
?</summary><div>${ht()}${ft()}<div class="stakeholder-cards"><article><b>Your te\
am</b><p>Incident lead, security, operations, business owner and privacy / legal\
. Record times, impact, decisions and unknowns.</p></article><article><b>Custome\
rs and suppliers</b><p>Use agreed security contacts, escalation and evidence arr\
angements. A processor informs its controller without undue delay where Article \
33(2) applies. ${m("gdpr","GDPR roles")}</p></article></div><p class="source-not\
e">Facts and assistance can be shared before the root cause is final. Use secure\
 channels and minimise unnecessary personal data or secrets.</p></div></details>`}
function Ka(e){return C==="play"||C==="mission"?Ba(e):C==="briefing"?`<button ty\
pe="button" class="briefing-listen" data-listen-panel aria-pressed="false">${we(
"Listen to this briefing")}</button>${Ha(e)}<div class="briefing-layout"><div><h\
3>What happened?</h3><p>${r(e.summary)}</p><h4>What went wrong or could go wrong\
?</h4><p>${r(e.failure)}</p><p class="source-note">Evidence: ${e.sources.slice(0,
2).map(t=>m(t,I[t].org)).join(" · ")}. Operational actions below are training r\
ecommendations.</p></div><aside class="takeaway"><div class="eyebrow">YOUR TAKEA\
WAY</div><h3>${r(e.takeaway)}</h3><p>Small actions, shared across teams. Earn up\
 to <b>100 XP</b> with this lesson.</p><button class="mission-link" data-tab="pl\
ay">Play the decisions →</button></aside></div><div class="lens-switch" role="gr\
oup" aria-label="Choose lesson perspective">${["technical","business","operation\
s"].map(t=>`<button data-lens="${t}" class="${t===q?"active":""}" aria-pressed="${t===
q}">${t[0].toUpperCase()+t.slice(1)}</button>`).join("")}</div><div class="lens-\
card"><b>FOR ${r(q.toUpperCase())} TEAMS</b><p>${r(e.lenses[q])}</p></div>`:C===
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
yment steps must follow current vendor documentation.</div>`:C==="playbook"?`${Xa(
e)}${Za(e)}<h3>A calm plan for a difficult moment.</h3><p>Adapt the sequence to \
your incident severity and safety needs. Record times, decisions, evidence and u\
nknowns.</p><ol class="playbook-list">${e.response.map(t=>{const[a,...n]=t.split(
" · ");return`<li><b>${r(a)}</b><p>${r(n.join(" · "))}</p></li>`}).join("")}</\
ol><div class="response-footer"><p>Consider customer / supplier contracts, data \
protection, sector rules and criminal reporting separately.</p><div class="playb\
ook-downloads"><button class="button button-green" data-download-playbook>Downlo\
ad Christmas playbook (PDF) ↓</button><button class="subtle-button" data-downloa\
d-playbook-text>Plain-text version ↓</button><small>A4 PDF · public lesson conte\
nt · no learner progress</small></div></div><button class="subtle-button" data-r\
eporting>Authority routes & reporting clocks →</button>`:`${qa(e)}${za(e)}<h3>\
Read more. Make the connection.</h3><p>Primary sources and official guidance. Di\
stinguish reported evidence, provider assessments, legal duties and our training\
 recommendations.</p><ul class="source-list">${e.sources.map(t=>{const a=I[t];return`\
<li>${m(t)}<small>${r(a.org)} · ${r(a.kind)}</small>${a.excerpt?`<blockquote>“${r(
a.excerpt)}”<cite>${r(a.excerptAt||a.org)}</cite></blockquote>`:""}<p><b>Read \
& reflect:</b> ${r(a.activity)}</p></li>`}).join("")}</ul><p class="source-note"\
>ISO excerpts come only from public overview pages; the licensed standards are n\
eeded for exact requirements. Legal scope, national procedures and later changes\
 need checking for an actual organisation.</p><div class="share-box"><div class=\
"lab-kicker">GOOD IDEAS ARE BETTER SHARED</div><h3>Send a little wisdom.</h3>${Wa(
e)}<label class="share-label" for="shareDraft">Public lesson post</label><textar\
ea id="shareDraft" rows="7" readonly autocomplete="off" spellcheck="false">${r(Ue(
e))}</textarea><div class="share-actions"><button class="button button-green" da\
ta-linkedin>in &nbsp; LinkedIn ↗</button><button data-copy-post>Copy post</butto\
n><button data-card="square">Square card ↓</button><button data-card="status">St\
atus card ↓</button><button data-native-share>Share…</button></div><p class="sou\
rce-note">Sharing uses public lesson content only. The post is copied first, the\
n LinkedIn opens this public lesson. If a popup is blocked, use the link below. \
Edit it in your social app. Source and social platforms handle visits under thei\
r own privacy terms. Nothing posts automatically.</p><p class="source-note"><a h\
ref="${r(Kt(e))}" target="_blank" rel="noopener noreferrer">Open LinkedIn after \
copying the post ↗</a></p></div>`}function me(e){return D.dayXp(c,e)}function R(){
w();const e=k.find(a=>a.id===g);if(!e||!U())return;const t=c.completed.includes(
e.id);s("#lessonContent").innerHTML=`<p class="sr-only" data-dialog-status role=\
"status" aria-live="polite"></p><div class="modal-heading"><button class="close-\
dialog" data-close aria-label="Close lesson">×</button><div class="modal-topline\
">DAY ${String(e.id).padStart(2,"0")} / 24 <span>·</span> ${r(tt[e.category].toUpperCase())}\
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
belledby="tab-${C}" tabindex="0">${Ka(e)}</div><div class="modal-footer"><button\
 class="complete-button ${t?"done":""}" data-return-game>${t?"✦ Day protected · "+
me(e.id)+" XP":"→ Resume the decisions"}</button><div class="day-navigation"><\
button data-prev ${e.id===1?"disabled":""} aria-label="Previous day"><span class\
="day-nav-arrow" aria-hidden="true">←</span></button><small><strong>Day ${e.id}\
</strong> of 24</small><button data-next ${e.id===24?"disabled":""} aria-label="\
Next day"><span>Next</span><span class="day-nav-arrow" aria-hidden="true">→</spa\
n></button></div></div>`}function ye(e){U()&&(e==="mission"&&(e="play"),["play",
"briefing","timeline","lab","playbook","sources"].includes(e)&&(C=e,R(),s("#less\
onDialog").scrollTop=0,s(`[role="tab"][data-tab="${e}"]`).focus({preventScroll:!0})))}
const gt="https://aware-by-design.github.io/Winterwatch-site/",We=e=>`${gt}#day=${e}`,
Kt=e=>"https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(
We(e.id));function Ue(e){return`Day ${e.id}/24 · Winterwatch Cyber & AI Advent

${e.title}

Today’s takeaway: ${e.takeaway}

One action: ${e.lenses[c.audience==="everyone"?"operations":c.audience]}

${/fictional/i.test(e.kind)?"Fictional training scenario, informed by "+I[e.sources[0]].
org+".":`Source: ${I[e.sources[0]].org}.`}
${I[e.sources[0]].url}

Play this lesson: ${We(e.id)}

#CyberSecurity #AI #Privacy #Winterwatch

${ee}
Learn more about AR-in-a-Box: ${pe}`}async function Fe(e,t="Copied."){try{return await navigator.
clipboard.writeText(e),A(t),!0}catch{return A("Clipboard unavailable. Select and\
 copy the text shown."),!1}}function bt(e,t){const a=URL.createObjectURL(e),n=document.
createElement("a");n.href=a,n.download=t,document.body.append(n),n.click(),n.remove(),
setTimeout(()=>URL.revokeObjectURL(a),3e4)}function Jt(e,t){bt(new Blob([e],{type:"\
text/calendar;charset=utf-8"}),t)}function Ja(e){return Number.isInteger(e)&&e>=
1&&e<=24?`assets/playbooks/winterwatch-day-${String(e).padStart(2,"0")}-playbook\
.pdf?edition=ai-attribution-20261125`:""}function Qa(e){const t=Ja(e?.id);if(!t){
A("Playbook unavailable.");return}const a=document.createElement("a");a.href=t,a.
download=t.split("/").pop().split("?")[0],document.body.append(a),a.click(),a.remove(),
A("Your Christmas PDF playbook download is ready.")}function en(e){return`WINTER\
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
${e.sources.map(t=>`${I[t].title}
${I[t].url}
Activity: ${I[t].activity}`).join(`

`)}

Training recommendations are separate from source findings. Confirm current lega\
l scope and product documentation. Test only with explicit authorisation and agr\
eed scope.

${ee}
Learn more about AR-in-a-Box: ${pe}
`}const Ye=new Map;function Qt(e){const t=F(e);return t?(Ye.has(t.src)||Ye.set(t.
src,new Promise(a=>{const n=new Image;n.decoding="async",n.onload=()=>a(n),n.onerror=
()=>{Ye.delete(t.src),a(null)},n.src=t.src})),Ye.get(t.src)):Promise.resolve(null)}
function tn(e,t,a){const n=[];let o="";for(const i of String(t).split(/\s+/)){const l=o?
o+" "+i:i;o&&e.measureText(l).width>a?(n.push(o),o=i):o=l}return o&&n.push(o),n}
function L(e,t,a,{size:n=24,minSize:o=16,family:i="Arial",color:l="#e8e5ce",spacing:d=1.25}={}){
let u=n,p;do{if(e.font=`${u}px ${i}`,p=tn(e,t,a.w),p.length*u*d<=a.h||u<=o)break;
u-=1}while(u>=o);const h=Math.max(1,Math.floor(a.h/(u*d)));if(p.length>h){p=p.slice(
0,h);let f=p[h-1];for(;f&&e.measureText(f+"…").width>a.w;)f=f.slice(0,-1);p[h-
1]=f+"…"}e.fillStyle=l,e.textBaseline="top",p.forEach((f,P)=>e.fillText(f,a.x,
a.y+P*u*d))}function an(e,t,a){const n=Math.min(a.w/t.naturalWidth,a.h/t.naturalHeight),
o=t.naturalWidth*n,i=t.naturalHeight*n;e.drawImage(t,a.x+(a.w-o)/2,a.y+(a.h-i)/2,
o,i)}function ea(e,t,a,n,{size:o=18,color:i="#c9d2bc",tracking:l=6,family:d="Ari\
al"}={}){e.font=`${o}px ${d}`,e.fillStyle=i,e.textBaseline="top";let u=a;for(const p of t)
e.fillText(p,u,n),u+=e.measureText(p).width+l}function nn(e){return e==="status"?
{height:1920,headerY:103,subY:150,dayY:252,title:{x:90,y:340,w:900,h:245},image:{
x:80,y:650,w:920,h:615},creditY:1290,takeawayLabelY:1344,takeaway:{x:95,y:1380,w:890,
h:180},actionLabelY:1598,action:{x:95,y:1630,w:890,h:83},source:{x:95,y:1725,w:890,
h:50},reviewY:1780,tagsY:1843}:{height:1080,headerY:73,subY:117,dayY:188,title:{
x:80,y:250,w:920,h:154},image:{x:80,y:425,w:470,h:315},creditY:756,takeawayLabelY:443,
takeaway:{x:585,y:481,w:415,h:245},actionLabelY:794,action:{x:80,y:822,w:920,h:55},
source:{x:80,y:885,w:920,h:43},reviewY:937,tagsY:1003}}async function on(e,t){const a=nn(
t),n=F(e),o=await Qt(e);if(n&&!o)return null;const i=document.createElement("can\
vas");i.width=1080,i.height=a.height;const l=i.getContext("2d");if(!l)return null;
l.fillStyle="#163c31",l.fillRect(0,0,1080,i.height);const d=l.createRadialGradient(
920,i.height*.8,5,500,i.height*.5,1e3);d.addColorStop(0,"#31523c"),d.addColorStop(
1,"#12372e"),l.fillStyle=d,l.fillRect(0,0,1080,i.height),l.strokeStyle="#b6a06b",
l.lineWidth=2,l.strokeRect(38,38,1004,i.height-76),l.strokeRect(48,48,984,i.height-
96);const u=t==="status"?90:80;ea(l,"✳ WINTERWATCH",u,a.headerY,{size:26,color:"\
#bda16a",tracking:8}),ea(l,"A CYBER & AI ADVENT",u,a.subY,{size:18,color:"#c9d2b\
c",tracking:6}),L(l,`DAY ${String(e.id).padStart(2,"0")} / 24     ·     ${tt[e.
category].toUpperCase()}`,{x:u,y:a.dayY,w:920,h:35},{size:22,minSize:18,color:"#\
c3a56c"}),L(l,e.title,a.title,{size:t==="status"?80:58,minSize:t==="status"?58:42,
family:"Georgia",color:"#f5eedc",spacing:1.12}),o&&an(l,o,a.image),L(l,"AI-gener\
ated concept · not incident evidence",{x:a.image.x,y:a.creditY,w:920,h:26},{size:t===
"status"?15:14,minSize:13,color:"#b9c9aa"}),L(l,"THE TAKEAWAY",{x:a.takeaway.x,y:a.
takeawayLabelY,w:a.takeaway.w,h:25},{size:14,minSize:13,color:"#c5ad71"}),L(l,e.
takeaway,a.takeaway,{size:t==="status"?43:34,minSize:25,family:"Georgia",color:"\
#e8e5ce",spacing:1.25}),L(l,"ONE ACTION TO TAKE",{x:a.action.x,y:a.actionLabelY,
w:920,h:24},{size:13,minSize:12,color:"#c5ad71"}),L(l,n?.action||e.takeaway,a.action,
{size:t==="status"?26:22,minSize:18,color:"#c6d5bd"});const p=/fictional/i.test(
e.kind)?"Fictional training scenario":"Public learning card";return L(l,`SOURCE:\
 ${I[e.sources[0]].org} · ${p}`,a.source,{size:t==="status"?18:16,minSize:13,color:"\
#c0af7e"}),L(l,ee,{x:a.source.x,y:a.reviewY,w:a.source.w,h:a.tagsY-a.reviewY-3},
{size:18,minSize:16,spacing:1.15,color:"#c6d5bd"}),L(l,`Play: aware-by-design.gi\
thub.io/Winterwatch-site/#day=${e.id}`,{x:a.action.x,y:a.tagsY,w:920,h:28},{size:t===
"status"?18:16,minSize:14,color:"#dfcea5"}),new Promise(h=>i.toBlob(h,"image/png"))}
async function mt(e,t=!1){const a=k.find(i=>i.id===g);if(!a)return;const n=await on(
a,e);if(!n){A("Card export could not complete. Copy the post instead.");return}const o=new File(
[n],`winterwatch-day-${String(a.id).padStart(2,"0")}-${e}.png`,{type:"image/png"});
if(t&&navigator.canShare?.({files:[o]}))try{await navigator.share({files:[o],title:a.
title,text:Ue(a)});return}catch(i){if(i.name==="AbortError")return}bt(n,o.name),
A(e==="status"?"1080 × 1920 status card downloaded.":"1080 × 1080 social card d\
ownloaded.")}function ie(e,t,a){w(),s("#infoDialog").open||(Je=St()),ue(!1),O="",
s("#lessonDialog").open&&s("#lessonDialog").close(),s("#infoContent").innerHTML=
`<p class="sr-only" data-dialog-status role="status" aria-live="polite"></p><div\
 class="modal-heading"><button class="close-dialog" data-close-info aria-label="\
Close panel">×</button><div class="eyebrow">THE WINTERWATCH FIELD NOTES</div><h2\
 id="infoTitle">${r(e)}</h2><p>${r(t)}</p></div><div class="guide-content">${a}<\
/div>`,s("#infoDialog").showModal(),s("#infoDialog").scrollTop=0}function sn(){ie(
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
-soft" data-dates>Countries, dates & duties →</button></div>')}function ta(){ie(
"Dates and duties, in context.","EU milestones and eight national NIS2 profiles.",
`<p>Choose a country, then check the entity, sector, role and current source. En\
acted law, phased duty, proposal and voluntary framework are different kinds of \
information.</p>${ht(!0)}${Zt()}<h3>The EU milestones.</h3><div class="milestone\
-list">${kt.map(e=>`<article><time>${yt(e.date)}</time><div><b>${r(e.name)}</b><\
p>${r(e.detail)} ${m(e.source,"Official source")}</p></div></article>`).join("")}\
</div><p class="source-note">The AI dates follow the current amended Commission \
timeline. GDPR, DORA and applicable national cyber duties can already apply; a l\
ater AI or product milestone is not a general grace period.</p><h3>Match the ins\
trument to the decision.</h3><div class="duty-cards"><article><b>${m("gdpr","GDP\
R · Articles 5, 28, 32–34")}</b><p>Purpose, roles, processor arrangements, se\
curity, breach assessment and people’s risk.</p></article><article><b>${m("nis",
"NIS2 · Articles 21 and 23")}</b><p>Applicable entity risk management, direct s\
uppliers, significance and national reporting routes.</p></article><article><b>${m(
"dora","DORA · Articles 28–30")}</b><p>Covered financial entities, ICT provid\
ers, evidence, incident assistance and exit arrangements.</p></article><article>\
<b>${m("craLaw","CRA · reporting and Annex I")}</b><p>Product role, vulnerabili\
ty handling, lifecycle support and phased requirements.</p></article><article><b\
>${m("aiLaw","AI Act · current text and Article 50")}</b><p>Provider / deployer\
 role, intended use, risk category, transparency and current transitions.</p></a\
rticle></div><h3>Frameworks help organise the work.</h3><p>${m("nistIR","NIST in\
cident response")}, ${m("csf","CSF 2.0")}, ${m("rmf","AI RMF")}, ${m("owaspApi",
"OWASP API Security")}, ${m("owaspPrompt","OWASP GenAI")} and ${m("enisaGuide","\
ENISA guidance")} support different parts of the decisions. ISO management stand\
ards remain linked in the case sources.</p><div class="guide-actions"><button cl\
ass="button button-green" data-export-dates ${c.country?"":"disabled"}>${le.some(
e=>e.id===c.country)?"Download EU + selected-country milestones":"Download EU mi\
lestones"} ↓</button><button class="subtle-button" data-open="17">Play the dates\
 challenge →</button></div>`),O="dates"}function yt(e){return new Intl.DateTimeFormat(
"en-GB",{timeZone:"Etc/GMT-1",day:"2-digit",month:"short",year:"numeric"}).format(
new Date(e+"T12:00:00Z"))}function aa(){ie("The right people. The right clock.",
"Training reference · reporting duties can overlap and depend on scope.",`${ht(
!0)}${Zt()}<h3>Preserve evidence. Involve the incident lead early.</h3><p>Record\
 awareness and classification times, facts, affected services, known impact, unc\
ertainty, containment and assistance required. Involve security, privacy / legal\
, operations, supplier owners and communications. Verify recipients and secure c\
hannels from official sources.</p><div class="report-table" role="region" aria-l\
abel="Incident reporting reference" tabindex="0"><table><caption class="sr-only"\
>Incident routes, triggers and timing references</caption><thead><tr><th scope="\
col">Route</th><th scope="col">Trigger / recipient</th><th scope="col">Timing re\
ference</th></tr></thead><tbody><tr><td>${m("gdpr","GDPR Art. 33–34")}</td><td\
>Controller → competent DPA for a reportable personal-data breach. Processor → c\
ontroller without undue delay.</td><td>Without undue delay and, where feasible, \
within 72h of awareness, unless the breach is unlikely to pose a risk to people’\
s rights and freedoms. High-risk individual communication: without undue delay; \
separate conditions and exceptions.</td></tr><tr><td>${m("nis","NIS2 Art. 23")}<\
/td><td>In-scope significant incident → national CSIRT / competent authority und\
er national rules.</td><td>24h early warning; 72h notification; final within one\
 month after notification. Trust-service and ongoing-incident exceptions apply.<\
/td></tr><tr><td>${m("doraClock","DORA reporting RTS")}</td><td>Covered financia\
l entity → competent authority for a major ICT-related incident.</td><td>Initial\
: as early as possible, within 4h of major classification and normally within 24\
h of awareness. If the incident is classified as major more than 24h after aware\
ness, notify within 4h of classification under Article 5(2). Intermediate: withi\
n 72h of initial notification. Final: within 1 month of the intermediate report \
or its latest update. See Article 5(4)–(6) for weekend and bank holiday rules, e\
xclusions and authority decisions.</td></tr><tr><td>${m("cra","CRA reporting")}<\
/td><td>Applicable manufacturer → Single Reporting Platform.</td><td>24h early w\
arning; 72h full notification. Final: exploited vulnerability ≤14 days after a c\
orrective measure is available; severe incident within a month of the 72h notifi\
cation.</td></tr></tbody></table></div><p class="source-note">These are timing r\
eferences, not a decision that a particular incident is reportable. Do not wait \
until a maximum deadline when a duty requires action without undue delay.</p><h3\
>Find the correct channel.</h3><ul><li>${m("csirts","National CSIRT directory")}\
: assistance and current national routing. Confirm the designated NIS2 endpoint.\
</li><li>${m("dpas","EDPB national authority directory")}: identify the competen\
t DPA and its breach-reporting process.</li><li>${m("cra","CRA Single Reporting \
Platform guidance")}: follow the official platform link.</li><li>Financial secto\
r: use your competent authority’s DORA process. Suspected crime: involve the inc\
ident lead and appropriate national law enforcement; urgent physical danger foll\
ows local emergency procedures.</li></ul><h3>A small reporting drill.</h3><p>Fic\
tional scenario: the controller becomes aware of a reportable breach at <b>10:00\
 CET on 6 November 2026</b>. Which is the 72-hour reference point?</p><div class\
="drill-options"><button data-clock-answer="wrong">7 November, 10:00</button><bu\
tton data-clock-answer="right">9 November, 10:00</button><button data-clock-answ\
er="wrong">After the forensic report is finished</button></div><p id="clockFeedb\
ack" role="status">The legal duty still says without undue delay. Use this as a \
calculation exercise.</p><div class="fact-callout">Agree authority participation\
 before a test. Use marked drafts or an agreed exercise channel; never submit a \
fictitious incident as a real notification.</div><div class="guide-actions"><but\
ton class="button button-green" data-open="22">Open the reporting quest →</butto\
n><button class="subtle-button" data-dates>Milestone dates →</button></div>`),
O="reporting"}function G(){const e=c.completed,t=a=>e.filter(n=>k[n-1].category===
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
gift"}]}function na(e,t=!1){const a=e.filter(p=>G().some(h=>h.id===p.id&&h.earned));
if(!a.length||(W=W.filter(p=>!a.some(h=>h.id===p.id)),W.length||clearTimeout(de),
A(`${t?"Badge celebration replayed":"Badge unlocked"}: ${a.map(p=>p.name).join("\
, ")}.`),re()))return;const n=document.createElement("div");n.className="celebra\
tion-layer badge-celebration",n.setAttribute("aria-hidden","true");const o=document.
createElement("div");o.className="badge-reward";const i=document.createElement("\
span");i.className="badge-reward-symbol",i.textContent=a[0].icon,o.append(i);const l=document.
createElement("strong");l.textContent=t?"YOUR MILESTONE":"MILESTONE UNLOCKED",o.
append(l);const d=document.createElement("h3");d.textContent=a[0].name,o.append(
d);const u=document.createElement("p");u.textContent=a.length>1?`Plus ${a.length-
1} more milestone${a.length>2?"s":""}. Find them in Your progress.`:a[0].desc,o.
append(u),n.append(o),H(".celebration-layer").forEach(p=>p.remove()),(s("#lesson\
Dialog").open?s("#lessonDialog"):s("#infoDialog").open?s("#infoDialog"):document.
body).append(n),setTimeout(()=>n.remove(),2600)}function oa(){ie("Your progress.",
Tt(),`<div class="progress-stats"><div class="progress-stat"><strong>${nt().toLocaleString()}\
</strong><span>of 2,400 XP</span></div><div class="progress-stat"><strong>${c.completed.
length}<small>/24</small></strong><span>quests complete</span></div><div class="\
progress-stat"><strong>${c.readings.length}<small>/24</small></strong><span>sour\
ce bonuses earned</span></div><div class="progress-stat"><strong>${D.streakCount(
c,ne())}</strong><span>day learning streak</span></div></div><p class="streak-no\
te">Complete a new quest on consecutive learning days to build your streak. Lear\
ning days begin at 09:00 CET. Best streak: <b>${c.streak.best} day${c.streak.best===
1?"":"s"}</b>. Saved streaks survive reloads.</p><div class="xp-track"><span sty\
le="width:${nt()/24}%"></span></div><p class="reading-progress">${Object.values(
c.solved).reduce((e,t)=>e+t.length,0)} / 72 decision rounds resolved</p><h3>A ma\
ntelpiece of milestones.</h3><p>${G().filter(e=>e.earned).length} of ${G().length}\
 badges unlocked. ${E==="unavailable"?"Browser storage must be available to keep\
 earned badges.":"Milestones stay earned when you return."}</p><div class="badge\
s-grid">${G().map(e=>`<article class="badge ${e.earned?"earned":""}"><span class\
="badge-art" aria-hidden="true">${Ra(e.art)}</span><b>${r(e.name)}</b><small>${e.
earned?"Unlocked · ":"Not yet earned · "}${r(e.desc)}</small>${e.earned?`<butt\
on class="subtle-button" data-badge-celebrate="${e.id}" aria-label="Replay celeb\
ration for ${r(e.name)}">Celebrate again ✦</button>`:""}</article>`).join("")}\
</div><h3>Choose your next discovery.</h3><div class="completion-list">${k.map(e=>`\
<button class="${c.completed.includes(e.id)?"done":""}" data-open="${e.id}"><spa\
n>${String(e.id).padStart(2,"0")}</span>${r(e.short)}<small>${me(e.id)} XP</smal\
l></button>`).join("")}</div><p class="source-note">${r(Et())} Progress is not u\
ploaded or included in shared lessons. Browser settings control retention; clear\
ing site data or using another browser starts a fresh journey.</p><div class="gu\
ide-actions progress-close-actions"><button type="button" class="button button-g\
reen" data-close-info>Close progress</button></div>`),O="progress",s("#infoDialo\
g [data-close-info]")?.setAttribute("aria-label","Close progress")}function rn(){
ie("Reset all your progress?","This cannot be undone.",'<p>This clears saved que\
sts, XP, reading bonuses, badges and streaks from this browser.</p><div class="g\
uide-actions reset-confirm-actions"><button type="button" class="button button-s\
oft" data-cancel-reset>Cancel</button><button type="button" class="button button\
-green" data-confirm-reset>Yes, reset my progress</button></div>'),O="reset-conf\
irm",s("#infoDialog [data-cancel-reset]")?.focus({preventScroll:!0})}function ln(){
ie("A little wonder. A useful habit.","Cybersecurity, AI and privacy belong to e\
veryone who builds, leads or keeps things running.",`
      <h3>Contact and feedback</h3><p>For content corrections and accessibility \
feedback, <a href="https://github.com/aware-by-design/Winterwatch-site/issues" t\
arget="_blank" rel="noopener noreferrer">contact the calendar maintainers throug\
h public GitHub issues ↗</a>. Reports are visible immediately. Include the page \
or door and leave out personal information and quiz solutions. For security find\
ings, <a href="https://github.com/aware-by-design/Winterwatch-site/security/advi\
sories/new" target="_blank" rel="noopener noreferrer">report a vulnerability pri\
vately on GitHub</a>.</p>
      <h3>24 doors. Three perspectives.</h3>
      <p>Explore real cyber incidents and fictional training scenarios from tech\
nical, business and operations perspectives. Check the date and official source \
before applying guidance.</p>
      <h3>Learn without an account.</h3>
      <p>Winterwatch uses no analytics or advertising trackers. Quiz answers sta\
y in your browser. Progress is saved there when browser storage is available. Us\
e <strong>Reset progress</strong> on the calendar to clear your saved progress.<\
/p>
      <h3>When you follow a link.</h3>
      <p>External sites handle visits under their own terms. GitHub Pages hosts \
Winterwatch and logs and stores visitors’ IP addresses for security purposes. Wi\
nterwatch has no access to those visitor logs. <a href="https://docs.github.com/\
en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection"\
 target="_blank" rel="noopener noreferrer">GitHub Pages data collection ↗</a> · \
<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-\
privacy-statement" target="_blank" rel="noopener noreferrer">GitHub privacy stat\
ement ↗</a></p>
      <div class="guide-actions"><button class="subtle-button" data-guide>Field \
guide →</button></div>${$a()}`)}function cn(){const e=["BEGIN:VCALENDAR","VERS\
ION:2.0","PRODID:-//Winterwatch//2026 milestones//EN","CALSCALE:GREGORIAN"],t=o=>o.
replace(/\\/g,"\\\\").replace(/\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"),
a=le.find(o=>o.id===c.country),n=[...kt.map(o=>({...o,scope:"EU"})),...(a?.milestones||
[]).map(o=>({...o,scope:a.name}))];for(const[o,i]of n.entries()){const l=new Date(
i.date+"T12:00:00Z");l.setUTCDate(l.getUTCDate()+1),e.push("BEGIN:VEVENT",`UID:w\
interwatch-${c.country}-${i.date}-${o}@calendar.local`,"DTSTAMP:20261106T000000Z",
`DTSTART;VALUE=DATE:${i.date.replaceAll("-","")}`,`DTEND;VALUE=DATE:${l.toISOString().
slice(0,10).replaceAll("-","")}`,`SUMMARY:${t(i.scope+" · "+i.name)}`,`DESCRIPT\
ION:${t(i.detail+" Confirm the applicable entity, cohort, role and current law. \
This is a learning milestone, not an organisation-specific deadline. "+I[i.source].
url)}`,"END:VEVENT")}return e.push("END:VCALENDAR"),sa(e)}function sa(e){const t=new TextEncoder;
return e.map(n=>{if(/^[\x20-\x7e]*$/.test(n)){const d=[n.slice(0,74)];for(let u=74;u<
n.length;u+=73)d.push(" "+n.slice(u,u+73));return d.join(`\r
`)}let o="",i="",l=0;for(const d of n){const u=t.encode(d).length;l+u>74&&(o+=i+
`\r
 `,i="",l=1),i+=d,l+=u}return o+i}).join(`\r
`)+`\r
`}function vt(e){return e?.type==="image/jpeg"&&typeof e.data=="string"&&e.data.
length>0&&e.data.length<=14e3&&e.data.length%4===0&&/^[A-Za-z0-9+/]+={0,2}$/.test(
e.data)}const ia="Make three practical decisions with NESTOR, then choose a habi\
t to practise.";function dn(e,t=null){const a=String(e.id).padStart(2,"0"),n=r(e.
short),o=vt(t)?`<p style="margin:18px 0 5px"><img src="data:image/jpeg;base64,${t.
data}" alt="" width="600" height="225" style="display:block;width:100%;height:au\
to;border:0;border-radius:6px"></p>
         <p style="margin:0 0 14px;font-size:12px">AI-assisted conceptual illust\
ration; not incident evidence.</p>`:"";return`<div lang="en" style="max-width:60\
0px;margin:0 auto;background:#f8f6ef;color:#173d31;border:1px solid #cbd7c2;bord\
er-radius:14px;font-family:Arial,Helvetica,sans-serif;line-height:1.5">
      <div style="padding:22px 24px;background:#173d31;color:#fff8e6;border-radi\
us:13px 13px 0 0">
        <p style="margin:0 0 5px;color:#e8ca8e;font-size:13px;font-weight:bold;l\
etter-spacing:1px">DAY ${a} WITH NESTOR</p>
        <h1 style="margin:0;color:#fff8e6;font:normal 28px/1.25 Georgia,serif">O\
ne day. One useful habit.</h1>
      </div>
      <div style="padding:20px 24px">
        <p style="margin:0 0 14px;font-size:14px;font-weight:bold">${e.id} Decem\
ber 2026 · 09:00–09:10 CET</p>
        <a href="${We(e.id)}" aria-label="Open door ${e.id} · ${n}" style="disp\
lay:block;position:relative;padding:15px 14px;color:#374b3d;background:#dfe3d8;b\
order:4px double #987337;border-radius:9px;text-align:center;text-decoration:non\
e">
          <span aria-hidden="true" style="position:absolute;top:9px;right:10px;w\
idth:9px;height:9px;border:1px solid #8b682e;background:#d5ab60;border-radius:50\
%"></span>
          <span style="display:block;font:normal 36px/1.1 Georgia,serif">${a}</s\
pan>
          <strong style="display:block;margin-top:4px;font:bold 23px/1.3 Georgia\
,serif">${n}</strong>
          <span style="display:block;margin-top:6px;font-size:14px;text-decorati\
on:underline">Open door ${e.id}</span>
        </a>
        <div style="margin:16px 0;padding:12px 14px;background:#e9efdf;border-le\
ft:4px solid #bfa26b;border-radius:5px">
          <p style="margin:0 0 4px;font-size:13px;font-weight:bold">YOUR DAILY C\
HALLENGE</p>
          <p style="margin:0">${ia}</p>
        </div>
        <p style="margin:0 0 18px"><a href="${gt}" style="color:#173d31;text-dec\
oration:underline">View the full Winterwatch calendar</a></p>
        ${o}
        <div style="border-top:1px solid #cbd7c2;padding-top:12px;font-size:12px\
">
          <p style="margin:0 0 6px">${r(ee)}</p>
          <a href="${pe}" style="color:#173d31;text-decoration:underline">Learn \
more about AR-in-a-Box</a>
        </div>
      </div>
    </div>`}function un(e,t,a=600){const n=document.createElement("canvas");n.width=
a,n.height=Math.round(a*.375);const o=n.getContext("2d");if(!o)return null;o.scale(
a/600,a/600);const i=t.naturalWidth||t.width,l=t.naturalHeight||t.height,d=Math.
max(600/i,225/l),u=i*d,p=l*d;o.fillStyle="#173d31",o.fillRect(0,0,600,225),o.drawImage(
t,600-u,(225-p)/2,u,p);const h=o.createLinearGradient(0,0,600,0);return h.addColorStop(
0,"#12352b"),h.addColorStop(.66,"#12352bf5"),h.addColorStop(.84,"#12352b80"),h.addColorStop(
1,"#12352b00"),o.fillStyle=h,o.fillRect(0,0,600,225),o.fillStyle="#e8ca8e",o.fillRect(
27,22,30,2),o.font="bold 14px Arial",o.textBaseline="top",o.fillText(`DAY ${String(
e.id).padStart(2,"0")} WITH NESTOR`,27,34),L(o,e.short,{x:27,y:64,w:367,h:103},{
size:29,minSize:22,family:"Georgia",color:"#fff8e6",spacing:1.12}),o.fillStyle="\
#e8ca8e",o.font="14px Arial",o.fillText(`${e.id} DECEMBER 2026  ·  10 MINUTES`,
27,189),n}function pn(e=new Date,t=new Map){const a=i=>String(i).replace(/\\/g,"\
\\\\").replace(/\r\n|\r|\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;"),n=at(
e);if(!n.length)return"";const o=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//ENI\
SA ARCH-AHWG//Winterwatch Advent 2026//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH",
"X-WR-CALNAME:Winterwatch Advent 2026","X-WR-TIMEZONE:CET"];for(const i of n){const l=String(
i.id).padStart(2,"0"),d=`202612${l}`,u=t.get(i.id),p=We(i.id),h=[`Day ${i.id} wi\
th Nestor · ${i.short}`,`Open door ${i.id}: ${p}
Full Winterwatch calendar: ${gt}`,`${i.id} December 2026 · 09:00–09:10 CET. ${ia}`,
...vt(u)?["AI-assisted conceptual illustration; not incident evidence."]:[],`${ee}\

Learn more about AR-in-a-Box: ${pe}`].join(`

`);o.push("BEGIN:VEVENT",`UID:winterwatch-arch-ahwg-2026-day-${l}@calendar.local`,
"DTSTAMP:20261127T000000Z",`DTSTART:${d}T080000Z`,`DTEND:${d}T081000Z`,`SUMMARY:${a(
`Winterwatch with Nestor · Day ${i.id}: ${i.short}`)}`,`URL:${p}`,`DESCRIPTION:${a(
h)}`),vt(u)&&o.push(`IMAGE;DISPLAY=FULLSIZE;FMTTYPE=image/jpeg;ENCODING=BASE64;V\
ALUE=BINARY:${u.data}`),o.push(`X-ALT-DESC;FMTTYPE=text/html:${a(dn(i,u))}`,"TRA\
NSP:TRANSPARENT","STATUS:CONFIRMED","SEQUENCE:7","BEGIN:VALARM","ACTION:DISPLAY",
"TRIGGER:PT0M",`DESCRIPTION:${a(`Winterwatch door ${i.id}: ${i.short}`)}`,"END:V\
ALARM","END:VEVENT")}return o.push("END:VCALENDAR"),sa(o)}const Ge=new Map;async function hn(e){
const t=F(e);if(!t)return null;const a=`${e.id}:${t.src}:${e.short}`;Ge.has(a)||
Ge.set(a,(async()=>{let o;try{const i=await Promise.race([Qt(e),new Promise(l=>{
o=setTimeout(()=>l(null),8e3)})]);if(!i)return null;for(const l of[600,480]){const d=un(
e,i,l);if(!d)return null;for(const u of[.82,.7,.56,.42]){const p=d.toDataURL("im\
age/jpeg",u);if(p.startsWith("data:image/jpeg;base64,")&&p.length-23<=14e3)return{
type:"image/jpeg",data:p.slice(23)}}}return null}catch{return null}finally{clearTimeout(
o)}})());const n=await Ge.get(a);return n||Ge.delete(a),n}async function fn(){if(ae)
return;const e=new Date,t=at(e),a=t.length;if(!a){A("The 2026 reminder schedule \
has ended. All 24 lessons remain available.");return}ae=!0,fe(e);try{const n=await Promise.
all(t.map(async l=>[l.id,await hn(l)])),o=new Map(n.filter(([,l])=>l));Jt(pn(e,o),
"winterwatch-advent-2026-reminders.ics");const i=t.some(l=>F(l)&&!o.has(l.id));A(
`${a} daily ${a===1?"reminder":"reminders"} downloaded.${i?" Some images could n\
ot be included.":""}`)}finally{ae=!1,fe()}}function gn(){if(!Ae.some(e=>e.id===c.
country)){A("Choose a country first.");return}Jt(cn(),`winterwatch-eu-${c.country}\
-milestones.ics`),A(le.some(e=>e.id===c.country)?"EU and selected-country milest\
ones downloaded. Review applicability before adding them.":"EU milestones downlo\
aded. This country has no detailed national milestone profile in this edition.")}
const wt=window.WINTERWATCH_DISPLAY;let{textSize:Be,highContrast:je,easierReading:qe,
pauseAnimations:Ve}=wt.read(),ra=null,ve=0,ze="",la=null;const bn={advent:"the d\
aily welcome",welcome:"the welcome message",holiday:"the holiday message"},re=()=>Ve||
window.matchMedia("(prefers-reduced-motion: reduce)").matches;function we(e){return`\
<svg class="control-icon speaker-icon" viewBox="0 0 24 24" fill="none" stroke="c\
urrentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" a\
ria-hidden="true" focusable="false"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M\
15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg><span>${r(e)}</span>`}function ca(e,t){
const a=e.hasAttribute("data-listen-panel")&&e.classList.contains("briefing-list\
en");if(e.setAttribute("aria-pressed",String(t)),e.innerHTML=we(t?"Stop listenin\
g":a?"Listen to this briefing":"Listen"),e.hasAttribute("data-listen-message")){
e.setAttribute("aria-label",(t?"Stop listening to ":"Listen to ")+bn[e.dataset.listenMessage]);
return}const n=Number(e.dataset.listen);e.setAttribute("aria-label",Number.isInteger(
n)&&n>=1&&n<=24?`${t?"Stop listening to":"Listen to"} Day ${n}${e.id==="doorLock\
Listen"?" opening message":""}`:t?"Stop listening":a?"Listen to this briefing":"\
Listen to this lesson section")}function w(){ve++,ze="",la=null;try{window.speechSynthesis?.
cancel()}catch{}H("[data-listen],[data-listen-panel],[data-listen-message]").forEach(
e=>{ca(e,!1)})}function $e(e,t){const a=e.closest?.("dialog")?.querySelector("[d\
ata-listen-status]");a?a.textContent=t:t&&A(t)}function K(...e){const t=[],a='[h\
idden],[inert],[aria-hidden="true"],.sr-only,svg,script,style,progress,[data-lis\
ten],[data-listen-panel],[data-listen-message],[data-listen-status],.lesson-acce\
ss-tools,.close-dialog';function n(o){if(o.nodeType===3){t.push(o.nodeValue);return}
if(o.nodeType!==1||o.matches(a))return;const i=window.getComputedStyle(o);if(i.display===
"none"||i.visibility!=="visible")return;const l=i.display!=="inline"&&i.display!==
"contents";if(l&&t.push(`
`),o.tagName==="BR")t.push(`
`);else if(o.tagName==="SELECT")t.push(o.selectedOptions[0]?.textContent||"");else if(o.
tagName==="TEXTAREA")o.readOnly&&t.push(o.value);else if(o.tagName==="DETAILS"&&
!o.open){const d=o.querySelector(":scope > summary");d&&n(d)}else for(const d of o.
childNodes)n(d);l&&t.push(`
`)}for(const o of e)o&&(n(o),t.push(`
`));return t.join("").split(/\n+/).map(o=>o.replace(/\s+/g," ").trim()).filter(Boolean).
join(`
`)}function ke(e,t,a){if(ze===t){w();return}w(),$e(a,"");const n=window.speechSynthesis,
o=window.SpeechSynthesisUtterance;if(!n||typeof o!="function"){$e(a,"Read aloud \
is not available in this browser. You can use your device’s screen reader.");return}
let i;try{i=n.getVoices().filter(h=>h.localService===!0)}catch{i=[]}const l=i.find(
h=>/^en[-_]/i.test(h.lang))||i.find(h=>/^en$/i.test(h.lang));if(!l){$e(a,"No Eng\
lish device voice is ready. Enable an English offline voice in your device setti\
ngs, then try Listen again.");return}const d=[];for(let h of e.split(/\n+/)){for(h=
h.trim();h.length>180;){const f=h.lastIndexOf(" ",180),P=f>0?f:180;d.push(h.slice(
0,P)),h=h.slice(P).trimStart()}h&&d.push(h)}if(!d.length)return;ze=t,ca(a,!0);const u=ve,
p=()=>{if(u!==ve)return;const h=d.shift();if(!h){w();return}const f=new o(h);la=
f,f.voice=l,f.lang=l.lang,f.rate=1,f.onend=()=>{u===ve&&p()},f.onerror=()=>{u===
ve&&(w(),$e(a,"Your device could not read this text. Please try again or use a s\
creen reader."))};try{n.speak(f)}catch{w(),$e(a,"Read aloud is unavailable on th\
is device.")}};p()}function mn(e,t){if(t.id==="doorLockListen"){ke(K(s(".door-lo\
ck-banner")),"lock-"+e,t);return}const a=s(`[data-door="${e}"]`);a&&ke("Day "+K(
a).replace(/^0(?=\d\b)/,""),"door-"+e,t)}function yn(e){ke(K(s(".santa-scroll")),
"santa-"+y+"-"+xe,e)}function vn(e){if(!s("#lessonDialog").open||!U())return;const t=e.
classList.contains("briefing-listen"),a=s("#lessonPanel"),n=t?K(a):K(s("#lessonC\
ontent .modal-heading"),s('#lessonContent [aria-selected="true"]'),a);ke(n,(t?"b\
riefing-":"panel-")+g+"-"+C,e)}function wn(e){const t=e.dataset.listenMessage,a=t===
"advent"?K(s("#adventWelcomeCopy"),s(".nestor-day-ribbon")):K(s(t==="welcome"?"#\
welcomeDialog .holiday-copy":"#holidayDialog .holiday-copy"));ke(a,"message-"+t,
e)}function B(e=!1){const t={textSize:Be,highContrast:je,easierReading:qe,pauseAnimations:Ve};
wt.apply(t,window.matchMedia("(prefers-reduced-motion: reduce)").matches),e===!0&&
wt.save(t),s("#accessTextSize").value=Be,s("#accessContrast").checked=je,s("#acc\
essReading").checked=qe,s("#accessMotion").checked=re(),s("#accessMotion").disabled=
window.matchMedia("(prefers-reduced-motion: reduce)").matches,_e()}function $n(){
w(),Be="normal",je=!1,qe=!1,Ve=!1,c.ambience=!0,B(!0),s("#accessibilityStatus").
textContent=re()?"Accessibility settings reset. Your device’s reduced-motion pre\
ference keeps animations paused.":"Accessibility settings reset. Animations are \
allowed again."}function kn(){w();const e=s("#accessibilityDialog");e.open||(ra=
{element:document.activeElement},B(),e.showModal(),s("#accessibilityClose").focus(
{preventScroll:!0}))}function $t(){const e=s(".hero")?.getBoundingClientRect();e&&
Number.isFinite(e.height)&&e.height>0&&s("#snow").style.setProperty("--snow-dist\
ance",`${e.height+40}px`)}function _e(){const e=c.ambience&&!re();document.body.
classList.toggle("pause-animations",re()),s(".hero").classList.toggle("paused",!e),
s("#snow").classList.toggle("paused",!e),s("#snow").hidden=!e,s("#ambienceButton").
setAttribute("aria-pressed",String(e)),s("#ambienceText").textContent=e?"Snow on":
"Still & cosy",s("#ambienceIcon").textContent=e?"❄":"✧"}s("#snow").innerHTML=
Array.from({length:104},(e,t)=>`<span style="--x:${t*37.17%100}%;--s:${1+t%5}px;\
--o:${.22+t%6*.1};--d:${8+t%15}s;--delay:-${t%29}s;--drift:${-24+t%61}px"></span\
>`).join(""),document.addEventListener("click",async e=>{ze&&e.target.closest("#\
lessonPanel summary")&&w();const t=e.target.closest("button,a");if(t){if(t.hasAttribute(
"data-tour-open")){va(t);return}if(t.closest?.("#tourDialog")){t.hasAttribute("d\
ata-tour-close")?T.close():t.hasAttribute("data-tour-play")?T.close("calendar"):
t.hasAttribute("data-tour-back")?Qe(Ce-1):t.hasAttribute("data-tour-next")&&(Ce+
1===H("[data-tour-step]",T).length?T.close():Qe(Ce+1));return}if(t.hasAttribute(
"data-accessibility")){kn();return}if(t.hasAttribute("data-reset-accessibility")){
$n();return}if(t.hasAttribute("data-close-accessibility")){s("#accessibilityDial\
og").close();return}if(t.hasAttribute("data-listen-message")){wn(t);return}if(t.
hasAttribute("data-listen-santa")){yn(t);return}if(t.hasAttribute("data-listen")){
mn(Number(t.dataset.listen),t);return}if(t.hasAttribute("data-listen-panel")){vn(
t);return}if(t.closest?.("#lessonDialog")&&!t.hasAttribute("data-close")&&!U()){
e.preventDefault();return}if(t.closest?.("#mainNav")&&t.getAttribute("href")==="\
#calendar"){e.preventDefault(),Ct();return}if(t.hasAttribute("data-close-door-lo\
ck")){s("#doorLockDialog").close();return}if(t.hasAttribute("data-close-holiday")){
s("#holidayDialog").close();return}if(t.hasAttribute("data-close-welcome")){s("#\
welcomeDialog").close();return}if(t.hasAttribute("data-welcome-start")){s("#welc\
omeDialog").close(),X(1);return}if(t.hasAttribute("data-holiday-greeting")){ut();
return}if(t.id==="menuToggle"){ue(s("#menuToggle").getAttribute("aria-expanded")!==
"true");return}if(t.hasAttribute("data-game-choice")){Xt(Number(t.dataset.gameChoice));
return}if(t.hasAttribute("data-evidence-option")){const a=S[g]?.steps[v],n=Number(
t.dataset.evidenceOption);if(a?.kind!=="select"||!Number.isInteger(n)||n<0||n>=a.
options.length)return;const o=Y(g,v);if(o.result)return;o.selected=o.selected.includes(
n)?o.selected.filter(i=>i!==n):[...o.selected,n],R(),s(`[data-evidence-option="${n}\
"]`)?.focus({preventScroll:!0});return}if(t.hasAttribute("data-order-from")){const a=Y(
g,v),n=Number(t.dataset.orderFrom),o=Number(t.dataset.orderDirection),i=n+o;if(a.
result||!Number.isInteger(n)||![-1,1].includes(o)||n<0||n>=a.order.length||i<0||
i>=a.order.length)return;[a.order[n],a.order[i]]=[a.order[i],a.order[n]],R(),s(`\
[data-order-from="${i}"]:not(:disabled)`)?.focus({preventScroll:!0});return}if(t.
hasAttribute("data-habit-index")){const a=Number(t.dataset.habitIndex),n=S[g]?.steps[v];
if(n?.kind!=="habits"||!Number.isInteger(a)||a<0||a>=n.cards.length||!["do","avo\
id"].includes(t.dataset.habitValue))return;const o=Y(g,v);if(o.result)return;o.habits[a]=
t.dataset.habitValue==="do",R(),s(`[data-habit-index="${a}"][data-habit-value="${t.
dataset.habitValue}"]`)?.focus({preventScroll:!0});return}if(t.hasAttribute("dat\
a-check-step")){Xt();return}if(t.hasAttribute("data-next-stage")){v<=2&&c.solved[g]?.
includes(v)&&ja();return}if(t.hasAttribute("data-retry-step")){const a=Y(g,v);a.
result=null,a.response=null,R(),s("[data-decision-title]")?.focus({preventScroll:!0});
return}if(t.hasAttribute("data-game-hint")){const a=Y(g,v);a.hint=!a.hint,R(),s(
"[data-game-hint]")?.focus({preventScroll:!0});return}if(t.hasAttribute("data-st\
age")){const a=Number(t.dataset.stage);Number.isInteger(a)&&a>=0&&a<=2&&a<=D.firstUnsolved(
c,g)&&(v=a,ye("play"));return}if(t.hasAttribute("data-return-game")){v=D.firstUnsolved(
c,g),ye("play");return}if(t.hasAttribute("data-replay-day")){for(let a=0;a<3;a++)
delete V[`${g}-${a}`],Y(g,a,!0);v=0,ye("play");return}if(t.hasAttribute("data-re\
ading-answer")){Va(Number(t.dataset.readingAnswer));return}if(t.dataset.badgeCelebrate){
const a=G().find(n=>n.id===t.dataset.badgeCelebrate&&n.earned);a&&na([a],!0);return}
if(t.dataset.celebrate){(t.dataset.celebrate==="day"&&c.completed.includes(g)||t.
dataset.celebrate==="reading"&&c.readings.includes(g))&&pt(t.dataset.celebrate,!0);
return}if(t.dataset.door){X(Number(t.dataset.door));return}if(t.dataset.open){X(
Number(t.dataset.open),!1);return}if(t.hasAttribute("data-audience")){c.audience=
t.dataset.audience,_(),N();return}if(t.hasAttribute("data-category")){et=t.dataset.
category,H("[data-category]").forEach(a=>{const n=a===t;a.classList.toggle("acti\
ve",n),a.setAttribute("aria-pressed",n)}),N();return}if(t.hasAttribute("data-clo\
se")){s("#lessonDialog").close();return}if(t.hasAttribute("data-close-info")){s(
"#infoDialog").close();return}if(t.dataset.tab){ye(t.dataset.tab);return}if(t.dataset.
lens&&["technical","business","operations"].includes(t.dataset.lens)){q=t.dataset.
lens,R(),s(`[data-lens="${q}"]`)?.focus({preventScroll:!0});return}if(t.hasAttribute(
"data-prev")){X(g-1,!1);return}if(t.hasAttribute("data-next")){X(g+1,!1);return}
if(t.hasAttribute("data-copy-hunt")){await Fe(k[g-1].hunt.code,"Read-only huntin\
g example copied. Verify host coverage and tune first.");return}if(t.hasAttribute(
"data-copy-rule")){await Fe(k[g-1].logic,"Illustrative logic copied. Map fields \
before use.");return}if(t.hasAttribute("data-download-playbook")){Qa(k.find(a=>a.
id===g));return}if(t.hasAttribute("data-download-playbook-text")){bt(new Blob([en(
k[g-1])],{type:"text/plain;charset=utf-8"}),`winterwatch-day-${String(g).padStart(
2,"0")}-playbook.txt`),A("Plain-text playbook downloaded.");return}if(t.hasAttribute(
"data-copy-post")){await Fe(Ue(k[g-1]),"Post copied. Ready to paste into your so\
cial app.");return}if(t.hasAttribute("data-linkedin")){const a=k[g-1];await Fe(Ue(
a),"Lesson post copied. Paste it into your LinkedIn post.")&&window.open(Kt(a),"\
_blank","noopener,noreferrer");return}if(t.dataset.card==="square"){await mt("sq\
uare");return}if(t.dataset.card==="status"){await mt("status");return}if(t.hasAttribute(
"data-native-share")){await mt("status",!0);return}if(t.dataset.country){da(t.dataset.
country);return}if(t.hasAttribute("data-guide")){sn();return}if(t.hasAttribute("\
data-dates")){ta();return}if(t.hasAttribute("data-reporting")){aa();return}if(t.
hasAttribute("data-progress")||t.id==="progressButton"){oa();return}if(t.hasAttribute(
"data-about")){ln();return}if(t.hasAttribute("data-download-advent-reminders")){
await fn();return}if(t.hasAttribute("data-export-dates")){gn();return}if(t.hasAttribute(
"data-reset-progress")){rn();return}if(t.hasAttribute("data-cancel-reset")){O===
"reset-confirm"&&s("#infoDialog").close();return}if(t.hasAttribute("data-confirm\
-reset")){if(ce||!s("#infoDialog").open||O!=="reset-confirm")return;await ya();const{
audience:a,country:n,context:o,ambience:i}=c;c={...Te(),audience:a,country:n,context:o,
ambience:i},V={},z=null,clearTimeout(de),W=[],Se=new Set,se(),N(),_e(),s("#infoD\
ialog").close(),A(E==="unavailable"?"Progress reset in this page; check browser \
storage to clear the saved record.":"Saved progress cleared. A fresh December aw\
aits.");return}if(t.dataset.clockAnswer){s("#clockFeedback").textContent=t.dataset.
clockAnswer==="right"?"✓ Correct: 9 November 2026 at 10:00 CET. Assess and repor\
t without undue delay; do not wait for the reference limit.":"Try again. Add 72 \
hours to the awareness time; the forensic report does not start this clock.";return}
t.id==="ambienceButton"&&(c.ambience=!c.ambience,_(),_e())}});function da(e,t=!1){
const a=Ae.find(d=>d.id===e);if(!a)return;const n=a.id,o=s("#lessonDialog").open?
s("#lessonDialog"):s("#infoDialog").open?s("#infoDialog"):document,i=!!s(".count\
ry-atlas-inline",o)?.open;c.country=n,_(),s("#lessonDialog").open?R():O==="dates"?
ta():O==="reporting"&&aa(),i&&s(".country-atlas-inline",o)?.setAttribute("open",
""),s(t?"[data-country-select]":`[data-country="${n}"]`,o)?.focus({preventScroll:!0})}
document.addEventListener("change",e=>{if(e.target.id==="santaDayPicker"){const t=Number(
e.target.value);k.some(a=>a.id===t)&&(y=t,w(),N(),s("#santaDayPicker")?.focus({preventScroll:!0}));
return}if(e.target.id==="accessTextSize"&&["normal","larger","largest"].includes(
e.target.value)){Be=e.target.value,B(!0);return}if(e.target.id==="accessMotion"){
Ve=e.target.checked,B(!0);return}if(e.target.id==="accessContrast"){je=e.target.
checked,B(!0);return}if(e.target.id==="accessReading"){qe=e.target.checked,B(!0);
return}e.target.matches("[data-country-select]")&&da(e.target.value,!0),e.target.
id==="contextFilter"&&["all","customer","supplier","work","home","finance"].includes(
e.target.value)&&(c.context=e.target.value,_(),N())}),s("#accessibilityDialog").
addEventListener("close",()=>{s("#accessibilityDialog").open||(j(ra),Z())}),s("#\
lessonDialog").addEventListener("cancel",w),s("#doorLockDialog").addEventListener(
"close",()=>{s("#doorLockDialog").open||(w(),xa(),Z(),oe())}),s("#holidayDialog").
addEventListener("close",()=>{s("#holidayDialog").open||(w(),Pa(),Z())}),s("#wel\
comeDialog").addEventListener("close",()=>{s("#welcomeDialog").open||(w(),Ma(),Z())}),
s("#lessonDialog").addEventListener("close",()=>{s("#lessonDialog").open||(w(),/^#day=/.
test(location.hash)&&history.replaceState(null,"","#calendar"),clearTimeout(wa),
s("#infoDialog").open||j(Ke),Z())}),s("#infoDialog").addEventListener("close",()=>{
!s("#infoDialog").open&&!s("#lessonDialog").open&&j(Je),Z()}),T?.addEventListener(
"close",()=>{T.open||(T.returnValue==="calendar"?Ct():j(xt),Z())});for(const e of[
s("#lessonDialog"),s("#infoDialog"),s("#doorLockDialog"),s("#holidayDialog"),s("\
#welcomeDialog"),s("#accessibilityDialog"),T])e?.addEventListener("click",t=>{if(t.
target===e){const a=e.getBoundingClientRect();(t.clientX<a.left||t.clientX>a.right||
t.clientY<a.top||t.clientY>a.bottom)&&e.close()}});document.addEventListener("ke\
ydown",e=>{if(e.key==="Escape"&&s("#menuToggle").getAttribute("aria-expanded")===
"true"){ue(!1,!0);return}if(e.target.matches('[role="tab"]')&&["ArrowRight","Arr\
owLeft","Home","End"].includes(e.key)){e.preventDefault();const t=H('[role="tab"\
]');let a=t.indexOf(e.target);a=e.key==="Home"?0:e.key==="End"?t.length-1:(a+(e.
key==="ArrowRight"?1:-1)+t.length)%t.length;const n=t[a].dataset.tab;ye(n),s(`[r\
ole="tab"][data-tab="${n}"]`).focus()}}),window.addEventListener("storage",e=>{if(!(e.
key!==J&&e.key!==null)){try{if(e.storageArea&&e.storageArea!==localStorage)return}catch{
return}Dt()}}),window.addEventListener("pageshow",Dt),window.addEventListener("h\
ashchange",()=>{const e=location.hash.match(/^#day=(\d{1,2})$/);e&&X(Number(e[1]),
!1)}),window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("ch\
ange",B),window.addEventListener("resize",$t),window.addEventListener("pagehide",
w),document.addEventListener("visibilitychange",()=>{document.hidden&&(w(),clearTimeout(
Re)),document.hidden||(fe(),lt(),oe())}),B(),N(),se(),$t(),_e(),Ot(),oe(),typeof window.
ResizeObserver=="function"&&new window.ResizeObserver($t).observe(s(".hero"));const ua=location.
hash.match(/^#day=(\d{1,2})$/);ua&&X(Number(ua[1]),!1),jt=!0,Oe()})();
