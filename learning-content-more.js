"use strict";window.WINTERWATCH_GRADER=async function(s,r,o){const c=window.WINTERWATCH_GAMES[s];
const e=r===3?c?.reading:c?.steps[r];if(!e?.sealed)throw Error("Question unavail\
able");const d=!e.kind||e.kind==="choice";const a=d?o:0;if(!Number.isInteger(a)||
a<0||a>=e.sealed.boxes.length)throw Error("Invalid option");const y=e.kind==="se\
lect"?[...o].sort((t,i)=>t-i):o;const l=t=>Uint8Array.from(atob(t),i=>i.charCodeAt(
0));const n=globalThis.crypto.subtle;const w=await n.importKey("raw",new TextEncoder().
encode(JSON.stringify([2026,s,r,y])),atob("UEJLREYy"),false,["deriveKey"]);const E=await n.
deriveKey({name:atob("UEJLREYy"),hash:atob("U0hBLTI1Ng=="),iterations:21e4,salt:l(
e.sealed.salt)},w,{name:atob("QUVTLUdDTQ=="),length:256},false,["decrypt"]);const b=l(
e.sealed.boxes[a]);let h;try{h=await n.decrypt({name:atob("QUVTLUdDTQ=="),iv:b.subarray(
0,12)},E,b.subarray(12))}catch(t){if(d||t.name!=="OperationError")throw t;return{
correct:false,feedback:"Check the brief and try again."}}return JSON.parse(new TextDecoder().
decode(h))};
