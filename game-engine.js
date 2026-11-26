"use strict";(()=>{const d=()=>({opened:[],solved:{},readings:[],completed:[],streak:{lastDay:null,
current:0,best:0},audience:"everyone",country:"",context:"all",ambience:!0}),c=e=>typeof e==
"string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(e+"T00:00:00\
Z"))&&new Date(e+"T00:00:00Z").toISOString().slice(0,10)===e,i=(e,t)=>(Date.parse(
e+"T00:00:00Z")-Date.parse(t+"T00:00:00Z"))/864e5;function u(e){const t=d();if(!e||
typeof e!="object"||Array.isArray(e)||e.version!==3)return t;const r=a=>Array.isArray(
a)?[...new Set(a.filter(o=>Number.isInteger(o)&&o>=1&&o<=24))].sort((o,s)=>o-s):
[];t.opened=r(e.opened),t.readings=r(e.readings).filter(a=>t.opened.includes(a));
for(const a of t.opened){const o=e.solved&&typeof e.solved=="object"&&Object.hasOwn(
e.solved,a)?e.solved[a]:null;if(!Array.isArray(o))continue;const s=[];for(let l=0;l<
3&&o.includes(l);l++)s.push(l);s.length&&(t.solved[a]=s),s.length===3&&t.completed.
push(a)}const n=e.streak;if(n&&typeof n=="object"){const a=l=>Number.isInteger(l)&&
l>=0?Math.min(l,t.completed.length):0,o=a(n.best),s=Math.min(a(n.current),o);t.streak=
{lastDay:s&&c(n.lastDay)?n.lastDay:null,current:c(n.lastDay)?s:0,best:o}}return t}
function k(e){const t=u({version:3,opened:e.opened,solved:e.solved,readings:e.readings,
streak:e.streak});return{version:3,opened:t.opened,solved:t.solved,readings:t.readings,
streak:t.streak}}function b(e,t){const r=u(t);if(!e.opened.length)return r;const n={
...e.solved};for(const[s,l]of Object.entries(r.solved))l.length>(n[s]?.length||0)&&
(n[s]=l);const a=u({version:3,opened:[...e.opened,...r.opened],solved:n,readings:[
...e.readings,...r.readings],streak:e.streak});if(!r.completed.some(s=>!e.completed.
includes(s)))return a;const o=[e.streak,r.streak].filter(s=>s.lastDay).sort((s,l)=>s.
lastDay.localeCompare(l.lastDay));if(o.length){const s=o[0],l=o[o.length-1],m=i(
l.lastDay,s.lastDay),p=m<=l.current?Math.max(l.current,s.current+m):l.current;a.
streak={lastDay:l.lastDay,current:Math.min(p,a.completed.length),best:Math.min(a.
completed.length,Math.max(p,e.streak.best,r.streak.best))}}return a}function D(e,t){
if(!c(t)||!e.completed.length)return;e.streak||={lastDay:null,current:0,best:0};
const r=e.streak.lastDay;if(c(r)&&i(t,r)<=0)return;const n=c(r)&&i(t,r)===1;e.streak.
current=Math.min(e.completed.length,n?e.streak.current+1:1),e.streak.lastDay=t,e.
streak.best=Math.max(e.streak.best,e.streak.current)}function v(e,t){const r=e.streak&&
c(e.streak.lastDay)&&c(t)?i(t,e.streak.lastDay):NaN;return r>=0&&r<=1?e.streak.current:
0}function I(e,t){if(!e)return!1;if(e.kind==="choice")return Number.isInteger(t)&&
t>=0&&t<e.options.length&&e.options[t].correct===!0;if(e.kind==="select"){if(!Array.
isArray(t)||t.some(a=>!Number.isInteger(a)||a<0||a>=e.options.length))return!1;const r=new Set(
t),n=e.options.flatMap((a,o)=>a.correct?[o]:[]);return r.size===n.length&&n.every(
a=>r.has(a))}return e.kind==="order"?Array.isArray(t)&&t.length===e.items.length&&
t.every((r,n)=>Number.isInteger(r)&&r===n):e.kind==="habits"?Array.isArray(t)&&t.
length===e.cards.length&&t.every((r,n)=>typeof r=="boolean"&&r===e.cards[n].good):
!1}function N(e,t,r,n,a){return f(e,t,r,I(n,a))}function f(e,t,r,n){if(!Number.isInteger(
t)||t<1||t>24||!Number.isInteger(r)||r<0||r>2||!e.opened.includes(t)||r>y(e,t))return{
correct:!1,earned:0,completed:!1};if(n!==!0)return{correct:!1,earned:0,completed:!1};
e.solved[t]||=[];const a=!e.solved[t].includes(r);a&&e.solved[t].push(r);const o=e.
solved[t].length===3&&!e.completed.includes(t);return o&&e.completed.push(t),{correct:!0,
earned:(a?20:0)+(o?10:0),completed:o}}function w(e,t,r,n){return!e.opened.includes(
t)||!Number.isInteger(n)||n<0||n>=r.options.length?{correct:!1,earned:0}:g(e,t,r.
options[n].correct===!0)}function g(e,t,r){if(!e.opened.includes(t))return{correct:!1,
earned:0};const n=r===!0&&!e.readings.includes(t);return n&&e.readings.push(t),{
correct:r,earned:n?20:0}}function h(e,t){return(e.opened.includes(t)?10:0)+(e.solved[t]?.
length||0)*20+(e.completed.includes(t)?10:0)+(e.readings.includes(t)?20:0)}function A(e){
return Array.from({length:24},(t,r)=>h(e,r+1)).reduce((t,r)=>t+r,0)}function y(e,t){
for(let r=0;r<3;r++)if(!e.solved[t]?.includes(r))return r;return 3}window.WINTERWATCH_ENGINE=
Object.freeze({empty:d,restore:u,snapshot:k,mergeProgress:b,recordLearningDay:D,
streakCount:v,recordStep:f,recordReading:g,dayXp:h,xp:A,firstUnsolved:y})})();
