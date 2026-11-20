'use strict';
(() => {
  const lessons = window.WINTERWATCH_LESSONS;
  const sources = window.WINTERWATCH_SOURCES;
  const dates = window.WINTERWATCH_DATES;
  const artworks = window.WINTERWATCH_ARTWORK || {};
  const lessonVisuals = window.WINTERWATCH_LESSON_VISUALS || {};
  const engine=window.WINTERWATCH_ENGINE;
  const games=window.WINTERWATCH_GAMES;
  const countries=window.WINTERWATCH_COUNTRIES;
  const jurisdictions=window.WINTERWATCH_JURISDICTIONS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = value => { try {if(typeof value!=='string'||/[\u0000-\u0020\u007f]/.test(value))return '#';const u = new URL(value); return u.protocol === 'https:'&&!u.username&&!u.password ? u.href : '#';} catch {return '#';} };
  const sourceLink = (id, label) => {const s=sources[id];return `<a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${esc(label || s.title)} ↗</a>`;};
  const emptyState = engine.empty;
  const progressKey='winterwatch-2026-progress-v3';
  let storageStatus='ready',lastSaved=null,storageWarningShown=false;
  function decodeProgress(value){
    if(typeof value!=='string'||value.length>12000)throw Error('Invalid progress record');
    const record=JSON.parse(value);
    if(!record||record.version!==3)throw Error('Unsupported progress record');
    return engine.restore(record);
  }
  function loadProgress(){
    let value;try{value=localStorage.getItem(progressKey);}catch{storageStatus='unavailable';return emptyState();}
    if(value===null)return emptyState();
    try{const saved=decodeProgress(value);lastSaved=value;storageStatus='saved';return saved;}
    catch{storageStatus='corrupt';return emptyState();}
  }
  function saveProgress(){
    const value=JSON.stringify(engine.snapshot(state));if(value===lastSaved)return;
    try{localStorage.setItem(progressKey,value);lastSaved=value;storageStatus='saved';storageWarningShown=false;}
    catch{storageStatus='unavailable';if(!storageWarningShown){storageWarningShown=true;toast('Progress could not be saved. Check whether this browser allows site storage.');}}
  }
  function clearSavedProgress(){
    try{localStorage.removeItem(progressKey);lastSaved=null;storageStatus='ready';}
    catch{storageStatus='unavailable';toast('The saved record could not be cleared. Use your browser’s site-data controls.');}
  }
  function storageLabel(){return storageStatus==='saved'?'Saved on this device':storageStatus==='ready'?'Progress saves on this device':storageStatus==='corrupt'?'Saved progress could not be read':'Not saved · browser storage unavailable';}
  function storageNotice(){return storageStatus==='unavailable'?'This browser is not saving progress. Allow site storage to keep it after reload.':storageStatus==='corrupt'?'The saved record could not be read. New progress can be saved; Reset progress removes the unreadable record.':'Completed quests and decisions, reading bonuses and streak dates/counts are saved only in this browser.';}
  let state=loadProgress();
  let knownBadgeIds=new Set(badges().filter(b=>b.earned).map(b=>b.id)),pendingBadges=[],badgeTimer=null;
  let lessonReturnFocus=null,infoReturnFocus=null;
  function focusTarget(){const el=document.activeElement;if(el?.closest?.('#lessonDialog'))return lessonReturnFocus;if(el?.closest?.('#infoDialog'))return infoReturnFocus;if(el?.closest?.('#mainNav')&&window.matchMedia('(max-width: 800px)').matches)return {element:$('#menuToggle')};const day=Number(el?.dataset?.door);return Number.isInteger(day)&&day>=1&&day<=24?{selector:`[data-door="${day}"]`}:{element:el};}
  function restoreFocus(target){const el=(target?.selector?$(target.selector):target?.element);if(el&&el!==document.body&&el.isConnected!==false&&(!el.getClientRects||el.getClientRects().length))el.focus({preventScroll:true});else $('#calendarTitle').focus({preventScroll:true});}
  function setMenu(open,returnFocus=false){$('.site-header').classList.toggle('menu-open',open);$('#menuToggle').setAttribute('aria-expanded',String(open));if(returnFocus)$('#menuToggle').focus();}
  let category='all', activeId=null, activeTab='play', modalLens=state.audience==='everyone'?'technical':state.audience;
  let currentStage=0,stageDrafts={},readingFeedback=null,infoView='';
  let toastTimer=null, clockTimer=null;
  const label={cyber:'Cybersecurity',ai:'AI & agents',privacy:'Privacy',governance:'Rules & standards',ot:'Connected world'};
  const initiative="An initiative of ENISA’s Awareness Raising and Cyber-Hygiene Ad-Hoc Working Group";
  const arInABoxUrl="https://www.enisa.europa.eu/topics/awareness-and-cyber-hygiene/ar-in-a-box";
  function initiativeHtml(){return `<div class="publisher-card"><img src="assets/winterwatch-mark.svg" alt="" width="40" height="40"><p><b>${esc(initiative)}</b><br><a href="${arInABoxUrl}" target="_blank" rel="noopener noreferrer">Learn more about AR-in-a-Box →</a></p></div>`;}
  const localDate=(now=new Date())=>{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Etc/GMT-1',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);return Object.fromEntries(p.map(x=>[x.type,x.value]));};
  const todayKey=(now=new Date())=>{const d=localDate(now);return `${d.year}-${d.month}-${d.day}`;};
  let adventTimer=null,reminderExportPending=false;
  function adventStatus(now=new Date()){
    const d=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Etc/GMT-1',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).map(x=>[x.type,x.value]));
    const today=Date.UTC(Number(d.year),Number(d.month)-1,Number(d.day)),start=Date.UTC(2026,11,1),end=Date.UTC(2026,11,24);
    if(today<start)return {phase:'before',day:0,remaining:24,untilStart:Math.round((start-today)/86400000)};
    if(today>end)return {phase:'after',day:24,remaining:0,untilStart:0};
    const day=Number(d.day);return {phase:'during',day,remaining:24-day,untilStart:0};
  }
  // A learning day runs 09:00–08:59 CET, independent of the visitor's timezone.
  const releaseWindowTime=(now=new Date())=>new Date(now.getTime()-9*3600000);
  const releaseWindowKey=(now=new Date())=>todayKey(releaseWindowTime(now));
  const releaseWindowStatus=(now=new Date())=>adventStatus(releaseWindowTime(now));
  function nextReleaseTime(now=new Date()){
    const key=releaseWindowKey(now);return new Date(Date.parse(key+'T08:00:00Z')+86400000);
  }
  function returnPrompt(at,now=new Date()){
    return todayKey(at)===todayKey(now)?'Come back at 09:00 CET.':'Come back tomorrow at 09:00 CET.';
  }
  function upcomingAdventLessons(now=new Date()){
    // All 2026 Advent sessions are in CET: 09:00 CET is 08:00 UTC.
    const time=now.getTime();return lessons.filter(l=>Date.UTC(2026,11,l.id,8)>=time);
  }
  const adventNestorFamily=Object.freeze({src:'assets/nestor-advent-reminder.webp',width:768,height:512,alt:'NESTOR shown in adult and child forms, in Christmas sweaters and winter boots, holding a calendar marked 1–24 December 2026.'});
  const adventNestorHosts=Object.freeze([
    {src:'assets/nestor-burgundy.webp',width:512,height:640,alt:'NESTOR in an adult form, wearing a burgundy Christmas sweater and winter boots, holding a bell and a calendar marked 1–24 December 2026.'},
    {src:'assets/nestor-green.webp',width:480,height:640,alt:'NESTOR in an adult form, wearing a green Christmas sweater and winter boots, holding a bell and a calendar marked 1–24 December 2026.'},
    {src:'assets/nestor-red.webp',width:512,height:640,alt:'NESTOR in a child form, with a pink flower, red Christmas sweater and winter boots, holding a bell and a calendar marked 1–24 December 2026.'},
    {src:'assets/nestor-blue.webp',width:512,height:640,alt:'NESTOR in a child form, wearing a blue Christmas sweater and winter boots, holding a bell and a calendar marked 1–24 December 2026.'}
  ]);
  const adventBriefs=Object.freeze({
    1:'Explore how exposed refrigeration controls can affect everyday services. Choose the first response, useful warning signs and safer supplier access.',
    2:'Practise choosing an AI supplier. Ask about data, security evidence, responsibilities, incident support and a usable exit.',
    3:'Follow a stolen integration token across connected services. Decide what to revoke, what to investigate and what to ask a supplier.',
    4:'Discover how a dependency can expose build secrets. Practise reducing access, reconstructing the chain and responding to an affected release.',
    5:'Learn why a patch is only part of recovery. Look for persistence and choose the steps needed before returning a service to use.',
    6:'Investigate an unusual successful login. Practise protecting identities, spotting suspicious data access and asking your provider useful questions.',
    7:'Trace the reported Binance attack across several handoffs. Find opportunities to interrupt the chain and check whether containment is complete.',
    8:'Examine an impersonation attempt involving a CFO on screen. Choose an independent way to verify the action and apply the habit at home.',
    9:'Explore how AI assistance can connect attack steps. Separate evidence from assessment, join warning signals and choose a proportionate response.',
    10:'See how untrusted instructions can reach an assistant’s tools. Practise limiting permissions and protecting the boundary around sensitive actions.',
    11:'Explore an identity story that looks convincing. Compare independent evidence and choose fair checks that protect people and their data.',
    12:'Practise pausing before sharing information with AI. Minimise sensitive inputs, check outputs and choose a safer family-photo habit.',
    13:'Work through a suspected personal-data breach. Identify who needs to know, record awareness and prepare useful notification information.',
    14:'Explore NIS2 scope, national reporting routes and incident decisions. Practise finding the right authority and keeping reporting responsibilities clear.',
    15:'Turn supplier promises into practical resilience. Explore contract responsibilities, continuity evidence and distinct incident-reporting timestamps.',
    16:'Ask how connected products stay secure after purchase. Explore support, updates, manufacturer practices and the calendar used in the lesson.',
    17:'Practise classifying an AI use case before assigning a deadline. Work through the lesson’s dated timeline and distinguish different milestones.',
    18:'Practise recognising when a person should step in. Explore useful AI learning, human decision boundaries and how to recheck a changed assistant.',
    19:'Investigate a fictional invoice-access problem. Distinguish signing in from permission to view a record and choose a responsible reporting route.',
    20:'Work through a fictional bank assistant reading a poisoned document. Separate information from instructions and limit what the assistant can do.',
    21:'Connect warning signs around sensitive data. Explore a published case and practise choosing an accountable escalation and a useful provider update.',
    22:'Prepare an incident handoff before it is needed. Match stakeholders to their roles and choose a rehearsal with clear scope and authorisation.',
    23:'Turn an advisory into a practical coverage check. Connect it to your assets, suppliers, controls and the person responsible for action.',
    24:'Bring the season’s habits together in everyday decisions about family payments, work assistants and supplier alerts. Choose one habit to carry forward.'
  });
  function adventReminderModel(now=new Date()){
    const status=releaseWindowStatus(now),lesson=status.phase==='during'?lessons.find(l=>l.id===status.day):null;
    return {...status,lesson,host:lesson?adventNestorHosts[(lesson.id-1)%adventNestorHosts.length]:adventNestorFamily,brief:lesson?adventBriefs[lesson.id]:''};
  }
  function updateAdventReminder(now=new Date()){
    const model=adventReminderModel(now),l=model.lesson;
    const set=(selector,value)=>{const node=$(selector);if(node&&node.textContent!==value)node.textContent=value;};
    set('#adventReminderKicker',l?`DAY ${l.id} · LEARN WITH NESTOR`:model.phase==='after'?'KEEP LEARNING WITH NESTOR':'A DAILY HELLO FROM NESTOR');
    set('#adventTitleMain',l?l.title:model.phase==='after'?'Keep your good habits.':'A little reminder.');
    const accent=$('#adventTitleAccent');if(accent)accent.hidden=!!l;
    set('#adventTitleAccent',model.phase==='after'?'A wiser year ahead.':'A wiser December.');
    set('#adventReminderBrief',l?model.brief:model.phase==='after'?'NESTOR is here for a refresher. Revisit any day or finish missed lessons at your own pace.':'Meet NESTOR in different forms. One guide, one useful habit and ten minutes of festive learning each day.');
    set('#nestorRibbonKicker',l?`DAY ${l.id} WITH NESTOR`:'ONE NESTOR. MANY FORMS.');
    set('#nestorRibbonDate',l?`${l.id} December 2026`:'1–24 December 2026');
    const image=$('#adventHostImage');if(image){image.setAttribute('src',model.host.src);image.setAttribute('alt',model.host.alt);image.setAttribute('width',String(model.host.width));image.setAttribute('height',String(model.host.height));}
  }
  function updateAdventTracker(now=new Date()){
    updateAdventReminder(now);
    const current=adventStatus(now),left=Math.max(0,24-state.completed.length),upcoming=upcomingAdventLessons(now);
    const set=(selector,value)=>{const node=$(selector),text=String(value);if(node&&node.textContent!==text)node.textContent=text;};
    const day=current.phase==='before'?'Starts 1 December':current.phase==='after'?'Advent complete':`Day ${current.day} of 24`;
    const remainingLabel=current.phase==='before'?'Advent days ahead':current.phase==='during'?'Days remaining after today':'Advent days remaining';
    set('#adventCurrentDay',day);set('#adventDaysRemaining',current.remaining);set('#adventRemainingLabel',remainingLabel);set('#adventQuestsRemaining',left);
    set('#adventTiming',current.phase==='before'?`${current.untilStart} ${current.untilStart===1?'day':'days'} until Day 1 · 1–24 December 2026 · CET.`:current.phase==='after'?(releaseWindowStatus(now).phase==='during'?'The final Advent door is released. All 24 lessons are available.':'All 24 lessons are available. Revisit any day or finish missed lessons at your own pace.'):`${current.day===24?'The final Advent day is here.':`Today is Day ${current.day}.`} Doors unlock at 09:00 CET; quest progress is separate.`);
    const button=$('[data-download-advent-reminders]');if(button){button.disabled=reminderExportPending||upcoming.length===0;button.setAttribute('aria-disabled',String(button.disabled));button.setAttribute('aria-busy',String(reminderExportPending));button.textContent=reminderExportPending?'Preparing reminders…':upcoming.length?`Add ${upcoming.length} daily ${upcoming.length===1?'reminder':'reminders'}`:'2026 reminders have ended';}
    set('#adventStatusAnnouncement',`${day}. ${current.remaining} Advent ${current.remaining===1?'day':'days'} remaining${current.phase==='during'?' after today':''}. ${left} ${left===1?'quest':'quests'} left to complete.`);
  }
  function tickAdventTracker(){const now=new Date();updateAdventTracker(now);syncDailyDoors();clearTimeout(adventTimer);adventTimer=setTimeout(tickAdventTracker,60000-now.getTime()%60000);}

  function refreshProgress(){
    saveProgress();updateProgress();
    const unlocked=badges().filter(b=>b.earned&&!knownBadgeIds.has(b.id));
    for(const b of unlocked)knownBadgeIds.add(b.id);
    if(unlocked.length){pendingBadges.push(...unlocked);scheduleBadgeReward();}
  }
  function scheduleBadgeReward(){clearTimeout(badgeTimer);badgeTimer=setTimeout(()=>{const earned=pendingBadges;pendingBadges=[];showBadgeReward(earned);},3200);}
  function points(){return engine.xp(state);}
  function toast(msg){$('#toast').textContent=msg;const status=$('dialog[open] [data-dialog-status]');if(status)status.textContent=msg;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200);}
  function dailyAccess(now=new Date()){
    const status=releaseWindowStatus(now);return {...status,releasedThrough:status.phase==='before'?0:status.day};
  }
  function doorReleased(id,now=new Date()){
    return Number.isInteger(id)&&id>=1&&id<=24&&Number.isFinite(now.getTime())&&now.getTime()>=Date.UTC(2026,11,id,8);
  }
  function available(id,now=new Date()){
    return doorReleased(id,now);
  }
  function nestorDoorMessage(now=new Date()){
    const a=dailyAccess(now);
    if(a.phase==='before')return 'Our first door opens on 1 December 2026 at 09:00 CET. See you then!';
    if(doorReleased(24,now)&&state.completed.length===24)return 'You did it! All 24 days are complete. You can revisit any lesson whenever you like.';
    if(a.phase==='during'&&a.day<24){
      const ready=a.day===1?'Day 1 is ready.':`Doors 1–${a.day} are available.`;
      return `${ready} You can play any released lesson, including days you missed. ${returnPrompt(nextReleaseTime(now),now)} Day ${a.day+1} opens on ${a.day+1} December 2026.`;
    }
    return 'All 24 doors are available. Play any missed lesson or revisit a reviewed day at your own pace.';
  }
  function doorCountdown(id,now=new Date()){
    if(!Number.isInteger(id)||id<1||id>24||!Number.isFinite(now.getTime()))return '';
    const minutes=Math.max(0,Math.ceil((Date.UTC(2026,11,id,8)-now.getTime())/60000));
    if(!minutes)return 'This door is ready to open.';
    const days=Math.floor(minutes/1440),hours=Math.floor(minutes%1440/60),mins=minutes%60;
    const unit=(n,word)=>`${n} ${word}${n===1?'':'s'}`;
    return `Time remaining: ${unit(days,'day')}, ${unit(hours,'hour')} and ${unit(mins,'minute')}.`;
  }
  function lockedDoorMessage(id,now=new Date()){
    const a=dailyAccess(now);
    if(doorReleased(id,now))return `Day ${id} is available. You can play this lesson now.`;
    return `${a.phase==='during'&&id===a.day+1?returnPrompt(new Date(Date.UTC(2026,11,id,8)),now)+' ':''}Day ${id} opens on ${id} December 2026 at 09:00 CET. ${doorCountdown(id,now)} All released lessons remain available.`;
  }
  let lockReturnFocus=null,lockedDoorId=null;
  function showDoorLock(id){
    stopListening();
    const dialog=$('#doorLockDialog');lockedDoorId=id;
    if(!dialog.open){const el=document.activeElement,day=Number(el?.dataset?.door);lockReturnFocus=Number.isInteger(day)&&day>=1&&day<=24?{selector:`[data-door="${day}"]`}:{element:el};}
    $('#doorLockMessage').textContent=lockedDoorMessage(id);
    $('#doorLockListen').dataset.listen=String(id);$('#doorLockListen').setAttribute('aria-label',`Listen to the Day ${id} opening message`);
    if(!dialog.open)dialog.showModal();$('#doorLockAcknowledge').focus({preventScroll:true});
  }
  function restoreDoorLockFocus(){
    if($('#lessonDialog').open){const el=lockReturnFocus?.element;if(el?.isConnected!==false&&el?.closest?.('#lessonDialog'))el.focus({preventScroll:true});else $('#lessonDialog [data-close]')?.focus({preventScroll:true});}
    else if($('#infoDialog').open)$('#infoDialog [data-close-info]')?.focus({preventScroll:true});
    else restoreFocus(lockReturnFocus);
  }
  let renderedDoorDay='';
  function syncDailyDoors(){
    if($('#holidayDialog').open&&!holidayGreetingAllowed())$('#holidayDialog').close();
    if($('#welcomeDialog').open&&!welcomeGreetingAllowed())$('#welcomeDialog').close();
    if($('#doorLockDialog').open)$('#doorLockMessage').textContent=available(lockedDoorId)?`Day ${lockedDoorId} is now open. Close this note to explore it.`:lockedDoorMessage(lockedDoorId);
    $('#nestorDoorMessage').textContent=nestorDoorMessage();
    if(renderedDoorDay===releaseWindowKey()){syncCalendarGreetings();return;}
    const focusedDay=Number(document.activeElement?.dataset?.door);renderDoors();
    if($('#lessonDialog').open&&!available(activeId)){$('#lessonDialog').close();showDoorLock(activeId);}
    else if(Number.isInteger(focusedDay)&&focusedDay>=1&&focusedDay<=24)$(`[data-door="${focusedDay}"]`)?.focus({preventScroll:true});
    syncCalendarGreetings();
  }
  function activeDoorAllowed(){
    if(available(activeId))return true;
    if($('#lessonDialog').open)$('#lessonDialog').close();showDoorLock(activeId);return false;
  }
  function updateProgress(){
    $('#navCount').textContent=`${points().toLocaleString()} XP`;
    $('.progress-button small').textContent=`${state.completed.length} of 24 quests · ${storageLabel()}`;
    $('#progressRing').style.setProperty('--progress',`${points()/24}%`);
    $('#progressButton').setAttribute('aria-label',`View progress: ${points()} XP, ${state.completed.length} of 24 quests complete`);
    updateAdventTracker();
  }
  const icon = name => {
    const paths={
      tree:'<path d="M32 5 18 23h8L13 39h11L9 55h46L40 39h11L38 23h8L32 5Z"/><path d="M29 55v8h6v-8M32 15v29"/><path d="m23 30 9 5 9-5m-22 15 13 5 14-5"/><circle cx="32" cy="8" r="2"/>',
      gift:'<path d="M10 30h44v29H10zM6 21h52v10H6zM28 21h8v38"/><path d="M32 21C9 23 10 4 21 9c6 2 11 12 11 12Zm0 0C55 23 54 4 43 9c-6 2-11 12-11 12Z"/><path d="m31 21-9 13m11-13 9 13"/>',
      snowflake:'<path d="M32 5v54M8.6 18.5l46.8 27M8.6 45.5l46.8-27M24 10l8 8 8-8M24 54l8-8 8 8M10 28l11-3-3-11M54 36l-11 3 3 11M18 50l3-11-11-3M46 14l-3 11 11 3"/><circle cx="32" cy="32" r="7"/>',
      bell:'<path d="M15 46h34l-6-8V26c0-9-5-15-11-15s-11 6-11 15v12l-6 8ZM12 47h40M26 50c0 8 12 8 12 0M29 11V7h6v4"/><path d="M17 16c-5 4-7 8-7 14m37-14c5 4 7 8 7 14M21 41h23"/>',
      mug:'<path d="M13 25h32v23c0 11-32 11-32 0V25ZM45 29h5c13 0 10 18-5 18M9 58h41M22 17c-6-7 6-8 0-15m11 15c-6-7 6-8 0-15"/><path d="m23 37 6 6 9-12"/>',
      shield:'<path d="M32 5 52 14v19c0 16-20 27-20 27S12 49 12 33V14L32 5Z"/><path d="m23 32 7 7 13-17M32 11l14 7v15c0 10-14 20-14 20"/><path d="m7 8 2 4 4 1-4 1-2 4-1-4-4-1 4-1Z"/>',
      key:'<circle cx="24" cy="23" r="13"/><circle cx="24" cy="23" r="5"/><path d="m33 33 21 21-6 6-7-7 3-3-6-6-3 3-8-8M15 7l-3-5m-6 15-5-1m43 1 6-2"/>',
      star:'<path d="m32 5 7 19 20 1-16 13 5 20-16-11-17 11 6-20L5 25l20-1L32 5Z"/><path d="m32 18 4 11 12 1-9 7 2 11-9-6-10 6 3-11-9-7 12-1 4-11Z"/>',
      clock:'<circle cx="32" cy="35" r="22"/><circle cx="32" cy="35" r="17"/><path d="M32 22v14l9 6M26 7h12M32 7v6M50 15l4-4M14 15l-4-4"/>',
      sparkle:'<path d="M31 5c3 16 7 20 22 25-15 4-19 9-22 26-4-17-8-22-23-26 15-5 19-9 23-25Z"/><path d="M51 2c1 7 3 10 9 12-6 2-8 5-9 11-2-6-4-9-10-11 6-2 8-5 10-12ZM12 46c1 5 3 7 7 8-4 1-6 3-7 8-1-5-3-7-7-8 4-1 6-3 7-8Z"/>'
    };
    return `<svg viewBox="0 0 64 66" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.star}</svg>`;
  };
  function renderDoors(){
    stopListening();
    const access=dailyAccess();
    const visible=lessons.filter(l=>(category==='all'||l.category===category)&&(state.context==='all'||games[l.id].contexts.includes(state.context)));
    $('#doorsGrid').innerHTML=visible.map(l=>{
      const released=available(l.id),upcoming=!released,opened=released&&state.opened.includes(l.id),completed=released&&state.completed.includes(l.id),current=access.phase==='during'&&access.day===l.id;
      const lens=state.audience==='everyone'?games[l.id].role:`${state.audience} perspective`;
      return `<div class="door-card"><button class="advent-door tone-${(l.id-1)%8}${opened||completed?' is-unwrapped':''}${current&&!completed?' is-today':''}${upcoming?' is-upcoming':''}" data-door="${l.id}" data-door-status="${completed?'completed':upcoming?'upcoming':current?'today':opened?'opened':'available'}" aria-label="Day ${l.id}: ${esc(l.title)}. ${upcoming?lockedDoorMessage(l.id):completed?'Reviewed. Lesson complete. Revisit this day':opened?'Opened. Lesson to finish. Continue this day':current?'Today’s door. Open lesson':'Available. Open this day'}." ${upcoming?'aria-disabled="true"':''}><span class="door-inner"><span class="inner-icon">${completed?'✦':'✧'}</span><strong>${esc(l.short)}</strong><small>${esc(lens)}</small><span class="door-progress-status">${completed?state.readings.includes(l.id)?'Reviewed · source bonus earned':'Reviewed · lesson complete':'Opened · lesson to finish'}</span>${completed?'<span class="door-explored">✓</span>':''}</span><span class="door-leaf left"></span><span class="door-leaf right"></span><span class="door-cover"><span class="door-top-star" aria-hidden="true">✧</span><span class="door-day">DECEMBER</span><span class="door-number">${String(l.id).padStart(2,'0')}</span><span class="door-illustration">${icon(l.icon)}</span><span class="door-topic">${esc(l.short)}</span><span class="door-category">${upcoming?`Opens ${l.id} Dec · 09:00 CET`:esc(label[l.category])}</span></span></button><button type="button" class="door-listen" data-listen="${l.id}" aria-label="Listen to Day ${l.id}" aria-pressed="false">${speakerLabel('Listen')}</button></div>`;
    }).join('');
    $('#emptyState').hidden=visible.length>0;
    $('#announcer').textContent=`${visible.length} lessons shown`;
    $('#modeLabel').textContent=access.phase==='before'?'A daily December tradition.':access.phase==='during'?`Day ${access.day} of 24 · daily unlock at 09:00 CET.`:'All 24 lessons are available.';
    $('#modeDetail').textContent='Released lessons stay available. A new door opens at 09:00 CET.';
    $('#nestorDoorMessage').textContent=nestorDoorMessage();
    $('#contextFilter').value=state.context;renderedDoorDay=releaseWindowKey();
    $$('[data-audience]').forEach(b=>{const on=b.dataset.audience===state.audience;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on);});
  }
  function openLesson(id){
    stopListening();
    const l=lessons.find(x=>x.id===id);if(!l)return;
    if(!available(id)){showDoorLock(id);if(!$('#lessonDialog').open&&/^#day=/.test(location.hash))history.replaceState(null,'','#calendar');return;}
    if(!$('#lessonDialog').open)lessonReturnFocus=focusTarget();
    if($('#welcomeDialog').open)$('#welcomeDialog').close();
    if($('#holidayDialog').open&&holidayMode==='christmas')$('#holidayDialog').close();
    setMenu(false);
    const already=state.opened.includes(id);
    if(!already){state.opened.push(id);refreshProgress();toast('+10 XP · A little wiser already.');}
    if($('#infoDialog').open)$('#infoDialog').close();
    const show=()=>{activeId=id;activeTab='play';currentStage=engine.firstUnsolved(state,id);readingFeedback=null;modalLens=state.audience==='everyone'?'technical':state.audience;renderLesson();if(!$('#lessonDialog').open)$('#lessonDialog').showModal();history.replaceState(null,'',`#day=${id}`);renderDoors();if(id===24&&!holidayGreetingShown)showHolidayGreeting();else if(id===1&&!already&&!welcomeGreetingShown&&welcomeGreetingAllowed())showWelcomeGreeting();};
    show();
  }
  let holidayGreetingShown=false,christmasGreetingShown=false,holidayReturnFocus=null,holidayMode='lesson';
  let welcomeGreetingShown=false,welcomeReturnFocus=null,greetingsReady=false;
  function welcomeGreetingAllowed(now=new Date()){
    const status=releaseWindowStatus(now);return status.phase==='during'&&status.day===1&&doorReleased(1,now);
  }
  function holidayGreetingAllowed(mode=holidayMode,now=new Date()){
    return mode==='christmas'?todayKey(now)==='2026-12-25'&&doorReleased(24,now):mode==='lesson'&&activeId===24&&$('#lessonDialog').open&&available(24,now);
  }
  function showHolidayGreeting(mode='lesson'){
    if(!holidayGreetingAllowed(mode))return;
    const dialog=$('#holidayDialog');if(!dialog.open)holidayReturnFocus=document.activeElement;
    holidayMode=mode;holidayGreetingShown=true;if(todayKey()==='2026-12-25')christmasGreetingShown=true;
    $('#holidayKicker').textContent=mode==='christmas'?'25 DECEMBER · A FESTIVE HELLO FROM NESTOR':'DAY 24 · A FESTIVE HELLO FROM NESTOR';
    $('#holidayAcknowledge').textContent=mode==='christmas'?'Continue the calendar':'Back to Day 24';
    if(!dialog.open)dialog.showModal();dialog.scrollTop=0;$('#holidayClose').focus({preventScroll:true});
  }
  function restoreHolidayFocus(){
    if($('#lessonDialog').open){if(holidayReturnFocus?.isConnected!==false&&holidayReturnFocus?.closest?.('#lessonDialog'))holidayReturnFocus.focus({preventScroll:true});else $('#lessonDialog [data-holiday-greeting]')?.focus({preventScroll:true});}
    else restoreFocus({element:holidayReturnFocus});
  }
  function showWelcomeGreeting(){
    if(!welcomeGreetingAllowed())return;
    const dialog=$('#welcomeDialog');if(!dialog.open)welcomeReturnFocus=document.activeElement;
    welcomeGreetingShown=true;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;$('#welcomeClose').focus({preventScroll:true});
  }
  function restoreWelcomeFocus(){
    if($('#lessonDialog').open)$('#lessonDialog [data-close]')?.focus({preventScroll:true});else restoreFocus({element:welcomeReturnFocus});
  }
  function syncCalendarGreetings(){
    if(!greetingsReady||['#lessonDialog','#infoDialog','#doorLockDialog','#holidayDialog','#welcomeDialog','#accessibilityDialog'].some(selector=>$(selector).open))return;
    if(todayKey()==='2026-12-25'&&!christmasGreetingShown){showHolidayGreeting('christmas');return;}
    if(welcomeGreetingAllowed()&&!welcomeGreetingShown&&!state.opened.includes(1)&&!state.completed.includes(1))showWelcomeGreeting();
  }
  function scheduleCalendarGreetings(){queueMicrotask(syncCalendarGreetings);}
  function safeArtworkPath(path){return typeof path==='string'&&/^assets\/lessons\/[a-z0-9-]+\.webp$/.test(path)?path:'';}
  function visualFor(l){
    const visual=lessonVisuals[l.id],art=visual&&artworks[visual.artwork];
    return art&&safeArtworkPath(art.src)?{...visual,...art}:null;
  }
  function artworkFigure(l){
    const v=visualFor(l);if(!v)return '';
    return `<figure class="lesson-visual"><div class="lesson-visual-image"><img src="${esc(v.src)}" alt="${esc(v.alt)}" width="1536" height="1024" decoding="async"><span class="artwork-label">ILLUSTRATIVE ARTWORK</span></div><figcaption><div class="lab-kicker">SEE THE LESSON</div><p class="visual-caption">${esc(v.caption)}</p><dl>${[['The risk',v.risk],['The signal',v.signal],['Your action',v.action]].map(([label,text])=>`<div><dt>${label}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl><small>AI-generated concept scene, not an incident photograph.</small></figcaption></figure>`;
  }
  function shareArtworkHint(l){
    const v=visualFor(l);if(!v)return '';
    return `<div class="illustrated-card-hint"><img src="${esc(v.src)}" alt="${esc(v.alt)}" width="93" height="62" loading="lazy"><span>Your lesson illustration is included in both card formats.<small>Square: 1080 × 1080 · Status: 1080 × 1920 · labelled AI-generated.</small></span></div>`;
  }
  const pageSeed=Math.floor(Math.random()*0x100000000)||1;
  function optionOrder(count,seed){const order=Array.from({length:count},(_,i)=>i);seed=(seed^pageSeed)>>>0||1;seed=Math.imul(seed^(seed>>>16),0x45d9f3b)>>>0;seed=Math.imul(seed^(seed>>>16),0x45d9f3b)>>>0;seed=(seed^(seed>>>16))>>>0||1;for(let i=count-1;i>0;i--){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const j=Math.floor((seed>>>0)/0x100000000*(i+1));[order[i],order[j]]=[order[j],order[i]];}return order;}
  const answerPositions=new Map();
  for(const group of ['choice','reading']){const questions=Object.values(games).flatMap(g=>group==='reading'?[g.reading]:g.steps.filter(s=>s.kind==='choice'));for(const count of new Set(questions.map(q=>q.options.length))){const matching=questions.filter(q=>q.options.length===count);optionOrder(matching.length,group==='choice'?1879:4231).forEach((index,i)=>answerPositions.set(matching[index],i%count));}}
  function answerOrder(question,seed){const order=optionOrder(question.options.length,seed),correct=question.options.findIndex(o=>o.correct),current=order.indexOf(correct),desired=answerPositions.get(question);if(Number.isInteger(desired))[order[current],order[desired]]=[order[desired],order[current]];return order;}
  function sequenceOrder(count,seed){const order=optionOrder(count,seed);if(count>1&&order.every((n,i)=>n===i))[order[0],order[1]]=[order[1],order[0]];return order;}
  function draftFor(id,index,fresh=false){
    const key=`${id}-${index}`,step=games[id].steps[index];
    if(!stageDrafts[key]){
      const solved=!fresh&&state.solved[id]?.includes(index);
      stageDrafts[key]={selected:solved&&step.kind==='select'?step.options.flatMap((o,i)=>o.correct?[i]:[]):[],order:step.kind==='order'?solved?Array.from({length:step.items.length},(_,i)=>i):sequenceOrder(step.items.length,id*97+index*19):[],habits:step.kind==='habits'?step.cards.map(c=>solved?c.good:null):[],hint:false,response:solved&&step.kind==='choice'?step.options.findIndex(o=>o.correct):null,result:solved?{correct:true,earned:0,revisit:true}:null};
    }
    return stageDrafts[key];
  }
  function frameworkNotes(l){return `<div class="framework-notes"><span>CONNECT THE LESSON</span>${games[l.id].frameworks.map(f=>`<div><b>${sourceLink(f.source,f.code)}</b><p>${esc(f.why)}</p></div>`).join('')}</div>`;}
  function stepFeedback(step,draft){
    if(!draft.result)return '';
    const r=draft.result;let why=step.success;
    if(step.kind==='choice'&&Number.isInteger(draft.response))why=step.options[draft.response]?.feedback||step.success;
    if(!r.correct&&step.kind!=='choice')why=step.kind==='order'?'The chain is not in the right order yet. Follow the first change in trust, then what it enables.':'Some choices need another look. Use the explanations below, then try again.';
    const details=step.kind==='habits'?step.cards.map((c,i)=>`<li><b>${c.good?'Do':'Do not'}:</b> ${esc(c.text)} — ${esc(c.why)}</li>`).join(''):step.kind==='select'?step.options.map(o=>`<li><b>${o.correct?'Useful':'Shortcut to avoid'}:</b> ${esc(o.text)} — ${esc(o.feedback)}</li>`).join(''):step.kind==='order'&&r.correct?step.items.map(i=>`<li><b>${esc(i.text)}</b> ${esc(i.detail)}</li>`).join(''):'';
    return `<div class="decision-feedback ${r.correct?'is-right':'is-learning'}" role="status" tabindex="-1"><span>${r.correct?'✦ '+(r.earned?`+${r.earned} XP`:'DECISION REVISITED'):'↻ A CHANCE TO RECONSIDER'}</span><h4>${r.correct?'That decision strengthens the boundary.':'Here is what that choice could lead to.'}</h4><p>${esc(why)}</p>${details?`<ul>${details}</ul>`:''}<div class="decision-feedback-actions">${r.correct?`<button class="button button-green" data-next-stage>${currentStage===2?'See my day reward':'Continue the story'} →</button>`:`<button class="button button-green" data-retry-step>Try another decision →</button>`}<button class="subtle-button" data-tab="briefing">Open the case file →</button></div></div>`;
  }
  function playHtml(l){
    const game=games[l.id],v=visualFor(l),won=state.completed.includes(l.id),read=state.readings.includes(l.id);
    const progress=`<div class="game-stage-track" aria-label="Daily decision progress">${game.steps.map((s,i)=>`<button data-stage="${i}" ${i>engine.firstUnsolved(state,l.id)?'disabled':''} class="${state.solved[l.id]?.includes(i)?'solved':''} ${currentStage===i?'current':''}"><span>${state.solved[l.id]?.includes(i)?'✦':String(i+1).padStart(2,'0')}</span><small>${esc(['Understand','Decide','Protect'][i])}</small></button>`).join('')}<div><b>${lessonPoints(l.id)}</b><small>/100 XP</small></div></div>`;
    const cover=`<div class="game-cover">${v?`<img src="${esc(v.src)}" alt="${esc(v.alt)}" width="400" height="267" decoding="async">`:''}<div><span class="game-role">${esc(game.role)}</span><p>${esc(game.setup)}</p><small>Illustrative choices with feedback · source facts in the case file</small></div></div>`;
    if(currentStage>=3&&won)return `${progress}<section class="day-reward" data-day-reward tabindex="-1"><div class="reward-wreath" aria-hidden="true"><span>✦</span><i></i><i></i><i></i></div><div class="lab-kicker">DAY ${l.id} PROTECTED · ${read?'100':'80'} XP</div><h3>You made the decisions.<br>Now make the habit stick.</h3><p>${esc(l.takeaway)}</p><div class="reward-habits">${game.habit.map(h=>`<p>${esc(h)}</p>`).join('')}</div><div class="reward-buttons"><button class="button button-green" data-tab="sources">${read?'Revisit your source bonus':'Unwrap the reading bonus · +20 XP'} →</button><button class="button button-soft" data-replay-day>Replay decisions</button></div><button class="subtle-button" data-celebrate="day">Replay the celebration ✧</button></section>${frameworkNotes(l)}`;
    const index=Math.min(currentStage,2),step=game.steps[index],draft=draftFor(l.id,index),answered=!!draft.result;
    let controls='';const checkLabel={select:'Check my decision',order:'Check the sequence',habits:'Check my habits'}[step.kind];
    if(step.kind==='choice')controls=`<div class="decision-options">${answerOrder(step,l.id*13+index*7).map((i,n)=>`<button data-game-choice="${i}" ${answered?'disabled':''} class="${answered&&draft.response===i?'chosen':''}"><span>${String.fromCharCode(65+n)}</span><span class="decision-option-text">${esc(step.options[i].text)}</span><i aria-hidden="true">↗</i></button>`).join('')}</div>`;
    if(step.kind==='select')controls=`<p class="interaction-hint">Choose every useful option, then check your decision.</p><div class="evidence-options">${optionOrder(step.options.length,l.id*13+index*7).map(i=>`<button role="checkbox" aria-checked="${draft.selected.includes(i)}" data-evidence-option="${i}" ${answered?'disabled':''}><span>${draft.selected.includes(i)?'✓':'+'}</span>${esc(step.options[i].text)}</button>`).join('')}</div>`;
    if(step.kind==='order')controls=`<p class="interaction-hint">Move the cards into sequence. The arrow controls also work with a keyboard.</p><ol class="sequence-cards">${draft.order.map((item,position)=>`<li><span class="sequence-position">${position+1}</span><p>${esc(step.items[item].text)}</p><div><button data-order-from="${position}" data-order-direction="-1" ${answered||position===0?'disabled':''} aria-label="Move item ${position+1} up">↑</button><button data-order-from="${position}" data-order-direction="1" ${answered||position===draft.order.length-1?'disabled':''} aria-label="Move item ${position+1} down">↓</button></div></li>`).join('')}</ol>`;
    if(step.kind==='habits')controls=`<p class="interaction-hint">Mark each move as a habit to do or a habit to avoid.</p><div class="habit-round">${optionOrder(step.cards.length,l.id*71+index*29).map(i=>{const c=step.cards[i];return `<div><p>${esc(c.text)}</p><div role="group" aria-label="${esc(c.text)}"><button data-habit-index="${i}" data-habit-value="do" aria-pressed="${draft.habits[i]===true}" ${answered?'disabled':''}>Do ✓</button><button data-habit-index="${i}" data-habit-value="avoid" aria-pressed="${draft.habits[i]===false}" ${answered?'disabled':''}>Do not ×</button></div></div>`;}).join('')}</div>`;
    return `${progress}${cover}<section class="decision-round"><div class="decision-kicker"><span>DECISION ${index+1} OF 3</span><b>${state.solved[l.id]?.includes(index)?'20 XP earned':'20 XP to discover'}</b></div><h3 tabindex="-1" data-decision-title>${esc(step.title)}</h3><p>${esc(step.body)}</p>${controls}${!answered?`<div class="decision-actions">${checkLabel?`<button type="button" class="button button-green check-decision" data-check-step>${esc(checkLabel)} →</button>`:''}<button type="button" class="clue-button" data-game-hint aria-expanded="${!!draft.hint}" aria-controls="gameClue">${draft.hint?'Hide the clue':'A little clue?'} ✧</button></div><div class="game-clue" id="gameClue" ${draft.hint?'':'hidden'}>${esc(step.hint)}</div>`:''}${stepFeedback(step,draft)}</section><p class="game-reassurance">Try, learn and try again. A wrong answer does not remove earned points.</p>`;
  }
  function submitStep(choice){
    const l=lessons.find(x=>x.id===activeId);if(!l||currentStage>2||!activeDoorAllowed())return;
    const step=games[l.id].steps[currentStage],d=draftFor(l.id,currentStage);if(d.result)return;
    const response=step.kind==='choice'?choice:step.kind==='select'?d.selected:step.kind==='order'?d.order:d.habits;
    if(step.kind==='choice'&&(!Number.isInteger(response)||response<0||response>=step.options.length))return;
    if(step.kind==='habits'&&response.some(x=>typeof x!=='boolean')){toast('Classify each habit before checking.');return;}
    if(step.kind==='select'&&!response.length){toast('Choose the evidence you would use.');return;}
    d.response=Array.isArray(response)?[...response]:response;d.result=engine.awardStep(state,l.id,currentStage,step,response);if(d.result.completed)engine.recordLearningDay(state,releaseWindowKey());
    refreshProgress();renderLesson();renderDoors();
    $('.decision-feedback')?.focus({preventScroll:true});
    if(d.result.completed)celebrate('day');else if(d.result.earned)toast(`+${d.result.earned} XP · Decision unlocked.`);
  }
  function nextStage(){if(!activeDoorAllowed())return;currentStage=Math.min(3,currentStage+1);renderLesson();$('#lessonDialog').scrollTop=0;if(currentStage===3)$('[data-day-reward]')?.focus({preventScroll:true});else $('[data-decision-title]')?.focus({preventScroll:true});}
  function readingHtml(l){
    const r=games[l.id].reading,source=sources[r.source],done=state.readings.includes(l.id);
    return `<section class="reading-quest ${done?'reading-won':''}"><div class="reading-quest-top"><span class="reading-book" aria-hidden="true">▱</span><div><div class="lab-kicker">THE EVIDENCE BONUS · 20 XP</div><h3>${done?'One source. A little more wisdom.':'Go one layer deeper.'}</h3></div><b>${done?'✓ UNLOCKED':'+20 XP'}</b></div><p>${esc(r.locator)} · ${sourceLink(r.source,'Open the primary source')}</p>${source.excerpt?`<blockquote>“${esc(source.excerpt)}”<cite>${esc(source.excerptAt||source.org)}</cite></blockquote>`:''}<p class="reading-question">${esc(r.question)}</p><div class="reading-options">${answerOrder(r,l.id*43).map(i=>`<button data-reading-answer="${i}" ${done?'disabled':''} class="${done&&r.options[i].correct?'is-correct':''}">${esc(r.options[i].text)}</button>`).join('')}</div><div class="reading-feedback" role="status" tabindex="-1">${done?'✦ Evidence bonus earned. '+esc(r.options.find(x=>x.correct).feedback):readingFeedback?esc(readingFeedback):'Read, connect the evidence and choose the best answer. Points reward the answer, not a claim that an external page was read.'}</div>${done?'<button class="subtle-button" data-celebrate="reading">Replay the reading celebration ✧</button>':''}</section>`;
  }
  function submitReading(answer){
    const l=lessons.find(x=>x.id===activeId);if(!l||!activeDoorAllowed())return;
    const r=games[l.id].reading,result=engine.awardReading(state,l.id,r,answer);
    readingFeedback=r.options[answer]?.feedback||'Choose one of the supplied answers.';
    if(result.earned){refreshProgress();renderDoors();}
    renderLesson();$('.reading-feedback')?.focus({preventScroll:true});if(result.earned)celebrate('reading');
  }
  function celebrate(kind,replay=false){
    if(!['day','reading'].includes(kind))return;if(pendingBadges.length)scheduleBadgeReward();
    toast(replay?'Celebration replayed · your earned points stay the same.':kind==='day'?`Day ${activeId} complete · ${lessonPoints(activeId)} XP earned.`:'Evidence bonus unlocked · +20 XP.');
    if(motionPaused())return;
    const layer=document.createElement('div');layer.className=`celebration-layer ${kind==='reading'?'reading-celebration':'day-celebration'}`;layer.setAttribute('aria-hidden','true');
    layer.innerHTML=`<div class="celebration-emblem">${kind==='reading'?'▱':'✦'}<span>${kind==='reading'?'A LITTLE MORE WISDOM':'DAY '+activeId+' PROTECTED'}</span></div>${Array.from({length:kind==='reading'?9:22},(_,i)=>`<i style="--x:${5+i*37%90}%;--size:${14+i%4*7}px;--delay:${i%6*45}ms">${i%3===0?'✧':i%3===1?'❄':'✦'}</i>`).join('')}`;
    $$('.celebration-layer').forEach(x=>x.remove());($('#lessonDialog').open?$('#lessonDialog'):document.body).append(layer);setTimeout(()=>layer.remove(),kind==='reading'?2000:2600);
  }
  function legalBriefHtml(l){
    const clauses=games[l.id].legal||[];if(!clauses.length)return '';
    return `<div class="legal-brief"><div class="lab-kicker">FROM THE RULE TO THE DECISION</div>${clauses.map(c=>`<article><b>${sourceLink(c.source,c.article)}</b><blockquote>“${esc(c.excerpt)}”</blockquote><p>${esc(c.meaning)}</p></article>`).join('')}<small>Short excerpts need the full article, legal role, national context and current application date.</small></div>`;
  }
  function countryMap(){return `<section class="jurisdiction-atlas" aria-label="Country training profiles"><div class="atlas-heading"><div><div class="lab-kicker">EXPLORE THE JURISDICTION</div><h3>One world. Different duties.</h3></div><span class="publisher-name">ENISA ARCH AHWG</span></div><img src="assets/training-jurisdictions.svg" width="900" height="400" alt="World overview and Europe detail highlighting Belgium, Finland, France, Germany, Ireland, Italy, Netherlands and Spain."><p>Eight detailed NIS2 profiles. All 27 EU countries can be selected using the tiles or list; this does not detect your location or determine which law applies.</p><p class="source-note">Generalised boundaries: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth, public domain ↗</a>. Highlighting shows this edition’s coverage, not legal status.</p></section>`;}
  function countrySelect(mapOpen=false){return `<div class="country-prompt"><h3>Choose your country to find official contacts.</h3><p>Select a country on the map or in the list. Then match the incident to the route below and confirm the responsible authority, entity and sector. Your choice stays in this page; it does not detect your location.</p></div><label class="country-select">Country for this exercise <select data-country-select><option value="" disabled ${state.country?'':'selected'}>Select your country…</option>${jurisdictions.map(c=>`<option value="${c.id}" ${c.id===state.country?'selected':''}>${esc(c.name)}</option>`).join('')}</select></label><details class="country-atlas-inline" ${mapOpen?'open':''}><summary>About the eight detailed country profiles</summary>${countryMap()}</details>`;}
  function contactRoutesHtml(){
    const j=jurisdictions.find(x=>x.id===state.country),c=countries.find(x=>x.id===state.country);
    if(!j)return `<section class="country-card"><h3>Choose a country to view contact routes.</h3><p>No jurisdiction is assumed. For a cross-border organisation, involve privacy / legal to establish the competent authorities.</p></section>`;
    return `<section class="country-card"><p class="country-selection-status" role="status">Showing contact routes for <b>${esc(j.name)}</b>.</p><h3>Match the issue to the responsible party.</h3>${c?'':`<p>This edition has no detailed NIS2 profile for ${esc(j.name)}. Use the official directories below to find its current authorities; no national commencement or deadline is assumed.</p>`}<div class="stakeholder-cards"><article><b>Cyber incident · national CSIRT / competent authority</b><p>${c?`${esc(c.authority)}. <a href="${esc(safeUrl(c.report))}" target="_blank" rel="noopener noreferrer">${esc(c.reportLabel)} ↗</a>`:`${sourceLink('csirts','Open the national CSIRT directory')} and find ${esc(j.name)}`}. Confirm the designated reporting channel, significance threshold and entity scope.</p></article><article><b>Personal-data breach · competent DPA</b><p>${c?`<a href="${esc(safeUrl(c.privacy))}" target="_blank" rel="noopener noreferrer">${esc(c.privacyLabel)} ↗</a>`:`${sourceLink('dpas','Open the EDPB authority directory')} and find ${esc(j.name)}`}. Confirm competence for the controller and any cross-border processing; a processor informs its controller.</p></article><article><b>Financial services · sector authority</b><p>Covered financial entities use their competent authority’s DORA process${c?.financial?` · <a href="${esc(safeUrl(c.financial))}" target="_blank" rel="noopener noreferrer">${esc(c.financialLabel)} ↗</a>`:''}. Confirm the entity’s supervisor and current reporting procedure.</p></article><article><b>Connected product · manufacturer reporting</b><p>Applicable manufacturers follow the ${sourceLink('cra','CRA Single Reporting Platform guidance')}. Assess the product role and reporting trigger separately.</p></article><article><b>AI issue · designated national authority</b><p>${sourceLink('aiNational','Open AI Act national resources')} and select ${esc(j.name)}. Check the AI use, operator role and current competent authority.</p></article><article><b>Suspected crime · national police</b><p>${sourceLink('police','Find national cybercrime reporting routes')} for ${esc(j.name)}. Europol’s directory points to national routes; it is not a public incident-reporting desk.</p></article></div><p class="source-note">Country selection does not decide entity scope, DPA competence or every applicable reporting duty. More than one route may apply. Confirm recipients from official sources before sharing sensitive information.</p></section>`;
  }
  function countryCard(){
    const c=countries.find(x=>x.id===state.country);
    if(!c)return contactRoutesHtml();
    return `${contactRoutesHtml()}<section class="country-card"><div class="country-card-heading"><span>${esc(c.status)}</span><h3>${esc(c.name)} · NIS2 profile</h3>${c.effective?`<p>National NIS2 commencement: <b>${formatDate(c.effective)}</b></p>`:'<p>Check for a current enacted NIS2 commencement date in the official sources.</p>'}</div><p>${esc(c.note)}</p>${c.milestones.length?`<div class="national-milestones">${c.milestones.map(d=>`<div><time>${formatDate(d.date)}</time><b>${esc(d.name)}</b><p>${esc(d.detail)} ${sourceLink(d.source,'Source')}</p></div>`).join('')}</div>`:''}<p class="source-note">${sourceLink(c.source,'Read the national source')}. Verify current scope, enactment and later changes before relying on these dates.</p></section>`;
  }
  function incidentProcessHtml(l){
    const v=visualFor(l);
    return `<div class="incident-process"><div class="lab-kicker">NIST SP 800-61 REV. 3 · CSF 2.0</div><h3>Follow the incident. Keep learning.</h3><p>Detect, Respond and Recover describe incident handling. Govern, Identify and Protect support preparation; improvement feeds every part. These are connected functions, not six mandatory steps in a line.</p><div class="process-cards"><article><b>01 · DETECT</b><p>${esc(v?.signal||'Connect relevant identity, service and data signals.')}</p></article><article><b>02 · RESPOND</b><p>Scope the impact, preserve evidence, contain affected authority and coordinate the right stakeholders.</p></article><article><b>03 · RECOVER</b><p>Restore a trusted, tested workflow; monitor it and communicate the recovery state.</p></article></div><p class="improve-note"><b>↻ Improve:</b> review the missed signal, the handoff and the control. Assign and verify a corrective action. ${sourceLink('nistIR','Read the framework')}</p></div>`;
  }
  function stakeholdersHtml(l){
    return `<details class="stakeholder-guide" open><summary>Who needs to be involved?</summary><div>${countrySelect()}${contactRoutesHtml()}<div class="stakeholder-cards"><article><b>Your team</b><p>Incident lead, security, operations, business owner and privacy / legal. Record times, impact, decisions and unknowns.</p></article><article><b>Customers and suppliers</b><p>Use agreed security contacts, escalation and evidence arrangements. A processor informs its controller without undue delay where Article 33(2) applies. ${sourceLink('gdpr','GDPR roles')}</p></article></div><p class="source-note">Facts and assistance can be shared before the root cause is final. Use secure channels and minimise unnecessary personal data or secrets.</p></div></details>`;
  }
  function lessonTabHtml(l){
    if(activeTab==='play'||activeTab==='mission')return playHtml(l);
    if(activeTab==='briefing')return `<button type="button" class="briefing-listen" data-listen-panel aria-pressed="false">${speakerLabel('Listen to this briefing')}</button>${artworkFigure(l)}<div class="briefing-layout"><div><h3>What happened?</h3><p>${esc(l.summary)}</p><h4>What went wrong — or what could fail</h4><p>${esc(l.failure)}</p><p class="source-note">Evidence: ${l.sources.slice(0,2).map(id=>sourceLink(id,sources[id].org)).join(' · ')}. Operational actions below are training recommendations.</p></div><aside class="takeaway"><div class="eyebrow">YOUR TAKEAWAY</div><h3>${esc(l.takeaway)}</h3><p>Small actions, shared across teams. Earn up to <b>100 XP</b> with this lesson.</p><button class="mission-link" data-tab="play">Play the decisions →</button></aside></div><div class="lens-switch" role="group" aria-label="Choose lesson perspective">${['technical','business','operations'].map(a=>`<button data-lens="${a}" class="${a===modalLens?'active':''}" aria-pressed="${a===modalLens}">${a[0].toUpperCase()+a.slice(1)}</button>`).join('')}</div><div class="lens-card"><b>FOR ${esc(modalLens.toUpperCase())} TEAMS</b><p>${esc(l.lenses[modalLens])}</p></div>`;
    if(activeTab==='timeline')return `<h3>The moments that matter.</h3><ol class="timeline">${l.timeline.map(([d,t])=>`<li><time>${esc(d)}</time><p>${esc(t)}</p></li>`).join('')}</ol><div class="fact-callout">${/fictional/i.test(l.kind)?'This is an invented training scenario.':l.kind.includes('workshop')||l.kind.includes('practice')||l.kind.includes('Everyday')?'Workflow moments and verified source dates are distinguished above.':'Dates describe the cited case or legal milestone, not a live incident feed.'}</div>`;
    if(activeTab==='lab')return `<div class="lab-kicker">CONFIGURE · OBSERVE · VALIDATE</div><h3>Make the control testable.</h3><p>Tool-agnostic recipe for your SIEM, identity, endpoint, network or governance workflow. Field names below are illustrative; map them to your own telemetry and permissions.</p><ol class="config-list">${l.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="code-header"><span>ILLUSTRATIVE LOGIC · NOT A DROP-IN RULE</span><button class="copy-button" data-copy-rule>Copy</button></div><pre class="code-block">${esc(l.logic)}</pre>${l.hunt?`<h4>${esc(l.hunt.title)}</h4><p>${esc(l.hunt.setup)}</p><div class="code-header"><span>READ-ONLY KQL · TUNE BEFORE ALERTING</span><button class="copy-button" data-copy-hunt>Copy</button></div><pre class="code-block">${esc(l.hunt.code)}</pre>`:''}<div class="lab-meta"><div><h4>Safe validation</h4><p>${esc(l.test)}</p></div><div><h4>Tuning & visibility limits</h4><p>${esc(l.noise)}</p></div></div><div class="fact-callout lab-callout">Use written authorisation, agreed scope and synthetic data. Validate telemetry and thresholds before enabling blocking. Product-specific deployment steps must follow current vendor documentation.</div>`;
    if(activeTab==='playbook')return `${incidentProcessHtml(l)}${stakeholdersHtml(l)}<h3>A calm plan for a difficult moment.</h3><p>Adapt the sequence to your incident severity and safety needs. Record times, decisions, evidence and unknowns.</p><ol class="playbook-list">${l.response.map(r=>{const [owner,...rest]=r.split(' · ');return `<li><b>${esc(owner)}</b><p>${esc(rest.join(' · '))}</p></li>`;}).join('')}</ol><div class="response-footer"><p>Consider customer / supplier contracts, data protection, sector rules and criminal reporting separately.</p><div class="playbook-downloads"><button class="button button-green" data-download-playbook>Download Christmas playbook (PDF) ↓</button><button class="subtle-button" data-download-playbook-text>Plain-text version ↓</button><small>A4 PDF · public lesson content · no learner progress</small></div></div><button class="subtle-button" data-reporting>Authority routes & reporting clocks →</button>`;
    return `${readingHtml(l)}${legalBriefHtml(l)}<h3>Read more. Make the connection.</h3><p>Primary sources and official guidance. Distinguish reported evidence, provider assessments, legal duties and our training recommendations.</p><ul class="source-list">${l.sources.map(id=>{const s=sources[id];return `<li>${sourceLink(id)}<small>${esc(s.org)} · ${esc(s.kind)}</small>${s.excerpt?`<blockquote>“${esc(s.excerpt)}”<cite>${esc(s.excerptAt||s.org)}</cite></blockquote>`:''}<p><b>Read & reflect:</b> ${esc(s.activity)}</p></li>`;}).join('')}</ul><p class="source-note">ISO excerpts come only from public overview pages; the licensed standards are needed for exact requirements. Legal scope, national procedures and later changes need checking for an actual organisation.</p><div class="share-box"><div class="lab-kicker">GOOD IDEAS ARE BETTER SHARED</div><h3>Send a little wisdom.</h3>${shareArtworkHint(l)}<label class="share-label" for="shareDraft">Public lesson post</label><textarea id="shareDraft" rows="7" readonly autocomplete="off" spellcheck="false">${esc(shareText(l))}</textarea><div class="share-actions"><button class="button button-green" data-linkedin>in &nbsp; LinkedIn ↗</button><button data-copy-post>Copy post</button><button data-card="square">Square card ↓</button><button data-card="status">Status card ↓</button><button data-native-share>Share…</button></div><p class="source-note">Sharing uses public lesson content only. The post is copied first, then LinkedIn opens this public lesson. If a popup is blocked, use the link below. Edit it in your social app. Source and social platforms handle visits under their own privacy terms. Nothing posts automatically.</p><p class="source-note"><a href="${esc(linkedinUrl(l))}" target="_blank" rel="noopener noreferrer">Open LinkedIn after copying the post ↗</a></p></div>`;
  }
  function lessonPoints(id){return engine.dayXp(state,id);}
  function renderLesson(){
    stopListening();
    const l=lessons.find(x=>x.id===activeId);if(!l||!activeDoorAllowed())return;
    const complete=state.completed.includes(l.id);
    $('#lessonContent').innerHTML=`<p class="sr-only" data-dialog-status role="status" aria-live="polite"></p><div class="modal-heading"><button class="close-dialog" data-close aria-label="Close lesson">×</button><div class="modal-topline">DAY ${String(l.id).padStart(2,'0')} / 24 <span>·</span> ${esc(label[l.category].toUpperCase())}<span class="status-badge">${esc(l.kind)}</span></div><h2 id="lessonTitle">${esc(l.title)}</h2><div class="lesson-access-tools"><button type="button" data-listen-panel aria-pressed="false">${speakerLabel('Listen')}</button><button type="button" data-accessibility aria-label="Accessibility" aria-haspopup="dialog" aria-controls="accessibilityDialog"><svg class="control-icon accessibility-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1" fill="currentColor"/><path d="m7 10 5 1 5-1m-5 1v5m0-2-3 4m3-4 3 4"/></svg><span class="accessibility-label">Accessibility</span></button></div><p class="listen-status" data-listen-status role="status" aria-live="polite"></p><p>${esc(l.takeaway)} <span class="lesson-duration">${l.minutes} min · ${lessonPoints(l.id)} / 100 XP</span></p>${l.id===24?'<button type="button" class="holiday-replay" data-holiday-greeting>Nestor’s holiday hello</button>':''}</div><div class="lesson-tabs" role="tablist" aria-label="Lesson sections">${[['play','Play the day'],['briefing','Case file'],['timeline','The story'],['lab','Defend'],['playbook','Respond'],['sources','Read & earn']].map(([id,n])=>`<button role="tab" id="tab-${id}" aria-controls="lessonPanel" aria-selected="${activeTab===id}" tabindex="${activeTab===id?'0':'-1'}" data-tab="${id}" class="${activeTab===id?'active':''}">${n}${id==='play'&&complete?' ✓':id==='sources'&&state.readings.includes(l.id)?' ✦':''}</button>`).join('')}</div><div class="tab-content" id="lessonPanel" role="tabpanel" aria-labelledby="tab-${activeTab}" tabindex="0">${lessonTabHtml(l)}</div><div class="modal-footer"><button class="complete-button ${complete?'done':''}" data-return-game>${complete?'✦ Day protected · '+lessonPoints(l.id)+' XP':'→ Resume the decisions'}</button><div class="day-navigation"><button data-prev ${l.id===1?'disabled':''} aria-label="Previous day"><span class="day-nav-arrow" aria-hidden="true">←</span></button><small><strong>Day ${l.id}</strong> of 24</small><button data-next ${l.id===24?'disabled':''} aria-label="Next day"><span>Next</span><span class="day-nav-arrow" aria-hidden="true">→</span></button></div></div>`;
  }
  function setTab(tab){if(!activeDoorAllowed())return;if(tab==='mission')tab='play';if(!['play','briefing','timeline','lab','playbook','sources'].includes(tab))return;activeTab=tab;renderLesson();$('#lessonDialog').scrollTop=0;$(`[role="tab"][data-tab="${tab}"]`).focus({preventScroll:true});}
  const lessonUrl=id=>`https://aware-by-design.github.io/Winterwatch-site/#day=${id}`;
  const linkedinUrl=l=>'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(lessonUrl(l.id));
  function shareText(l){return `Day ${l.id}/24 · Winterwatch Cyber & AI Advent\n\n${l.title}\n\nToday’s takeaway: ${l.takeaway}\n\nOne action: ${l.lenses[state.audience==='everyone'?'operations':state.audience]}\n\n${/fictional/i.test(l.kind)?'Fictional training scenario, informed by '+sources[l.sources[0]].org+'.':`Source: ${sources[l.sources[0]].org}.`}\n${sources[l.sources[0]].url}\n\nPlay this lesson: ${lessonUrl(l.id)}\n\n#CyberSecurity #AI #Privacy #Winterwatch\n\n${initiative}\nLearn more about AR-in-a-Box: ${arInABoxUrl}`;
  }
  async function copy(text,success='Copied.'){try{await navigator.clipboard.writeText(text);toast(success);return true;}catch{toast('Clipboard unavailable. Select and copy the text shown.');return false;}}
  function download(content,name,type='text/plain;charset=utf-8'){const b=content instanceof Blob?content:new Blob([content],{type});const url=URL.createObjectURL(b);const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  function playbookPdfPath(id){return Number.isInteger(id)&&id>=1&&id<=24?`assets/playbooks/winterwatch-day-${String(id).padStart(2,'0')}-playbook.pdf?edition=final-audit-20261119`:'';}
  function downloadPlaybook(l){const href=playbookPdfPath(l?.id);if(!href){toast('Playbook unavailable.');return;}const a=document.createElement('a');a.href=href;a.download=href.split('/').pop().split('?')[0];document.body.append(a);a.click();a.remove();toast('Your Christmas PDF playbook download is ready.');}
  function playbookText(l){return `WINTERWATCH · DAY ${l.id}\n${l.title}\n\n${l.kind}\n\nBRIEFING\n${l.summary}\n\nTAKEAWAY\n${l.takeaway}\n\nTECHNICAL\n${l.lenses.technical}\n\nBUSINESS\n${l.lenses.business}\n\nOPERATIONS\n${l.lenses.operations}\n\nCONTROL RECIPE (illustrative; map to your telemetry)\n${l.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n${l.logic}\n\nSAFE VALIDATION\n${l.test}\n\nLIMITATIONS\n${l.noise}\n\nPLAYBOOK\n${l.response.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\nLEARNING DECISIONS\n${games[l.id].steps.map((s,i)=>`${i+1}. ${s.title}: ${s.success}`).join('\n')}\n\nREAD MORE\n${l.sources.map(id=>`${sources[id].title}\n${sources[id].url}\nActivity: ${sources[id].activity}`).join('\n\n')}\n\nTraining recommendations are separate from source findings. Confirm current legal scope and product documentation. Test only with explicit authorisation and agreed scope.\n\n${initiative}\nLearn more about AR-in-a-Box: ${arInABoxUrl}\n`;}
  const artworkCache=new Map();
  function loadArtwork(l){
    const visual=visualFor(l);if(!visual)return Promise.resolve(null);
    if(!artworkCache.has(visual.src))artworkCache.set(visual.src,new Promise(resolve=>{
      const img=new Image();img.decoding='async';
      img.onload=()=>resolve(img);img.onerror=()=>{artworkCache.delete(visual.src);resolve(null);};
      // Only allowlisted same-origin image paths ever enter this image loader.
      img.src=visual.src;
    }));
    return artworkCache.get(visual.src);
  }
  function wrappedLines(ctx,text,width){
    const lines=[];let line='';
    for(const word of String(text).split(/\s+/)){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;}
    if(line)lines.push(line);return lines;
  }
  function cardText(ctx,text,box,{size=24,minSize=16,family='Arial',color='#e8e5ce',spacing=1.25}={}){
    let fontSize=size,lines;
    do {ctx.font=`${fontSize}px ${family}`;lines=wrappedLines(ctx,text,box.w);if(lines.length*fontSize*spacing<=box.h||fontSize<=minSize)break;fontSize-=1;}while(fontSize>=minSize);
    const maxLines=Math.max(1,Math.floor(box.h/(fontSize*spacing)));
    if(lines.length>maxLines){lines=lines.slice(0,maxLines);let last=lines[maxLines-1];while(last&&ctx.measureText(last+'…').width>box.w)last=last.slice(0,-1);lines[maxLines-1]=last+'…';}
    ctx.fillStyle=color;ctx.textBaseline='top';lines.forEach((line,i)=>ctx.fillText(line,box.x,box.y+i*fontSize*spacing));
  }
  function containArtwork(ctx,img,box){
    const scale=Math.min(box.w/img.naturalWidth,box.h/img.naturalHeight);
    const width=img.naturalWidth*scale,height=img.naturalHeight*scale;
    ctx.drawImage(img,box.x+(box.w-width)/2,box.y+(box.h-height)/2,width,height);
  }
  function trackedText(ctx,text,x,y,{size=18,color='#c9d2bc',tracking=6,family='Arial'}={}){ctx.font=`${size}px ${family}`;ctx.fillStyle=color;ctx.textBaseline='top';let cx=x;for(const ch of text){ctx.fillText(ch,cx,y);cx+=ctx.measureText(ch).width+tracking;}}
  function socialCardLayout(shape){
    if(shape==='status')return {height:1920,headerY:103,subY:150,dayY:252,title:{x:90,y:340,w:900,h:245},image:{x:80,y:650,w:920,h:615},creditY:1290,takeawayLabelY:1344,takeaway:{x:95,y:1380,w:890,h:180},actionLabelY:1598,action:{x:95,y:1630,w:890,h:83},source:{x:95,y:1740,w:890,h:50},reviewY:1798,tagsY:1830};
    return {height:1080,headerY:73,subY:117,dayY:188,title:{x:80,y:250,w:920,h:154},image:{x:80,y:425,w:470,h:315},creditY:756,takeawayLabelY:443,takeaway:{x:585,y:481,w:415,h:245},actionLabelY:794,action:{x:80,y:822,w:920,h:55},source:{x:80,y:903,w:920,h:43},reviewY:965,tagsY:1002};
  }
  async function makeCard(l,shape){
    const layout=socialCardLayout(shape),visual=visualFor(l),img=await loadArtwork(l);
    if(visual&&!img)return null;
    const c=document.createElement('canvas');c.width=1080;c.height=layout.height;
    const ctx=c.getContext('2d');if(!ctx)return null;
    ctx.fillStyle='#163c31';ctx.fillRect(0,0,1080,c.height);
    const g=ctx.createRadialGradient(920,c.height*.8,5,500,c.height*.5,1000);g.addColorStop(0,'#31523c');g.addColorStop(1,'#12372e');ctx.fillStyle=g;ctx.fillRect(0,0,1080,c.height);
    ctx.strokeStyle='#b6a06b';ctx.lineWidth=2;ctx.strokeRect(38,38,1004,c.height-76);ctx.strokeRect(48,48,984,c.height-96);
    const x=shape==='status'?90:80;
    trackedText(ctx,'✳ WINTERWATCH',x,layout.headerY,{size:26,color:'#bda16a',tracking:8});
    trackedText(ctx,'A CYBER & AI ADVENT',x,layout.subY,{size:18,color:'#c9d2bc',tracking:6});
    cardText(ctx,`DAY ${String(l.id).padStart(2,'0')} / 24     ·     ${label[l.category].toUpperCase()}`,{x,y:layout.dayY,w:920,h:35},{size:22,minSize:18,color:'#c3a56c'});
    cardText(ctx,l.title,layout.title,{size:shape==='status'?80:58,minSize:shape==='status'?58:42,family:'Georgia',color:'#f5eedc',spacing:1.12});
    if(img)containArtwork(ctx,img,layout.image);
    cardText(ctx,'AI-generated concept · not incident evidence',{x:layout.image.x,y:layout.creditY,w:920,h:26},{size:shape==='status'?15:14,minSize:13,color:'#b9c9aa'});
    cardText(ctx,'THE TAKEAWAY',{x:layout.takeaway.x,y:layout.takeawayLabelY,w:layout.takeaway.w,h:25},{size:14,minSize:13,color:'#c5ad71'});
    cardText(ctx,l.takeaway,layout.takeaway,{size:shape==='status'?43:34,minSize:25,family:'Georgia',color:'#e8e5ce',spacing:1.25});
    cardText(ctx,'ONE ACTION TO TAKE',{x:layout.action.x,y:layout.actionLabelY,w:920,h:24},{size:13,minSize:12,color:'#c5ad71'});
    cardText(ctx,visual?.action||l.takeaway,layout.action,{size:shape==='status'?26:22,minSize:18,color:'#c6d5bd'});
    cardText(ctx,`SOURCE: ${sources[l.sources[0]].org}`,layout.source,{size:shape==='status'?18:16,minSize:13,color:'#c0af7e'});
    cardText(ctx,'ENISA ARCH AHWG · '+(/fictional/i.test(l.kind)?'Fictional training scenario':'Public learning card'),{x:layout.action.x,y:layout.reviewY,w:920,h:25},{size:shape==='status'?16:14,minSize:12,color:'#a2b69b'});
    cardText(ctx,`Play: aware-by-design.github.io/Winterwatch-site/#day=${l.id}`,{x:layout.action.x,y:layout.tagsY,w:920,h:28},{size:shape==='status'?18:16,minSize:14,color:'#dfcea5'});
    return new Promise(resolve=>c.toBlob(resolve,'image/png'));
  }
  async function exportCard(shape,native=false){const l=lessons.find(x=>x.id===activeId);if(!l)return;const blob=await makeCard(l,shape);if(!blob){toast('Card export could not complete. Copy the post instead.');return;}const file=new File([blob],`winterwatch-day-${String(l.id).padStart(2,'0')}-${shape}.png`,{type:'image/png'});if(native&&navigator.canShare?.({files:[file]})){try{await navigator.share({files:[file],title:l.title,text:shareText(l)});return;}catch(e){if(e.name==='AbortError')return;}}download(blob,file.name);toast(shape==='status'?'1080 × 1920 status card downloaded.':'1080 × 1080 social card downloaded.');}

  function showInfo(title,subtitle,body){stopListening();if(!$('#infoDialog').open)infoReturnFocus=focusTarget();setMenu(false);infoView='';if($('#lessonDialog').open)$('#lessonDialog').close();$('#infoContent').innerHTML=`<p class="sr-only" data-dialog-status role="status" aria-live="polite"></p><div class="modal-heading"><button class="close-dialog" data-close-info aria-label="Close panel">×</button><div class="eyebrow">THE WINTERWATCH FIELD NOTES</div><h2 id="infoTitle">${esc(title)}</h2><p>${esc(subtitle)}</p></div><div class="guide-content">${body}</div>`;$('#infoDialog').showModal();$('#infoDialog').scrollTop=0;}
  function guide(){showInfo('Learn by making the decision.','Three decisions, one useful habit, and an evidence bonus behind every pair of doors.',`<div class="guide-game-loop"><article><span>01 · ENTER THE STORY</span><h3>Take a role.</h3><p>Become a customer, supplier, employee, responder or person at home. Read the situation and what is at stake.</p></article><article><span>02 · MAKE THE MOVES</span><h3>See the consequence.</h3><p>Choose actions, sort an attack sequence, select evidence or classify habits. Feedback explains why a decision helps or fails. You can try again.</p></article><article><span>03 · GO TO THE SOURCE</span><h3>Earn a little more wisdom.</h3><p>Answer a source question, explore the relevant article or framework, and take a practical habit into everyday life.</p></article></div><h3>Choose a place to start.</h3><div class="starter-games"><button data-open="2">I buy or manage a service <span>Customer–supplier decisions →</span></button><button data-open="7">I want to follow a real attack <span>The Binance chain →</span></button><button data-open="8">I work with money or approvals <span>The DNB impersonation attempt →</span></button><button data-open="12">I use AI in everyday life <span>Privacy and reliable answers →</span></button><button data-open="20">I build or deploy AI <span>An OWASP financial-assistant case →</span></button></div><h3>How the points work.</h3><p>Open a day’s lesson for 10 XP. Resolve each of its three decision rounds for 20 XP. Completing the day adds 10 XP and a celebration: 80 XP for the day’s work. Answer the source question for another 20 XP and a reading celebration. There are 2,400 XP to explore.</p><p>Wrong answers explain the risk and let you retry. Replaying a won round never adds duplicate points. Progress, XP, badges and your learning streak stay on this device across reloads when browser storage is available. They are learning rewards, not proof of compliance or professional certification.</p><div class="guide-actions"><button class="button button-green" data-progress>View progress</button><button class="button button-soft" data-dates>Countries, dates & duties →</button></div>`);}
  function showDates(){showInfo('Dates and duties, in context.','EU milestones and eight national NIS2 profiles.',`<p>Choose a country, then check the entity, sector, role and current source. Enacted law, phased duty, proposal and voluntary framework are different kinds of information.</p>${countrySelect(true)}${countryCard()}<h3>The EU milestones.</h3><div class="milestone-list">${dates.map(d=>`<article><time>${formatDate(d.date)}</time><div><b>${esc(d.name)}</b><p>${esc(d.detail)} ${sourceLink(d.source,'Official source')}</p></div></article>`).join('')}</div><p class="source-note">The AI dates follow the current amended Commission timeline. GDPR, DORA and applicable national cyber duties can already apply; a later AI or product milestone is not a general grace period.</p><h3>Match the instrument to the decision.</h3><div class="duty-cards"><article><b>${sourceLink('gdpr','GDPR · Articles 5, 28, 32–34')}</b><p>Purpose, roles, processor arrangements, security, breach assessment and people’s risk.</p></article><article><b>${sourceLink('nis','NIS2 · Articles 21 and 23')}</b><p>Applicable entity risk management, direct suppliers, significance and national reporting routes.</p></article><article><b>${sourceLink('dora','DORA · Articles 28–30')}</b><p>Covered financial entities, ICT providers, evidence, incident assistance and exit arrangements.</p></article><article><b>${sourceLink('craLaw','CRA · reporting and Annex I')}</b><p>Product role, vulnerability handling, lifecycle support and phased requirements.</p></article><article><b>${sourceLink('aiLaw','AI Act · current text and Article 50')}</b><p>Provider / deployer role, intended use, risk category, transparency and current transitions.</p></article></div><h3>Frameworks help organise the work.</h3><p>${sourceLink('nistIR','NIST incident response')}, ${sourceLink('csf','CSF 2.0')}, ${sourceLink('rmf','AI RMF')}, ${sourceLink('owaspApi','OWASP API Security')}, ${sourceLink('owaspPrompt','OWASP GenAI')} and ${sourceLink('enisaGuide','ENISA guidance')} support different parts of the decisions. ISO management standards remain linked in the case sources.</p><div class="guide-actions"><button class="button button-green" data-export-dates ${state.country?'':'disabled'}>${countries.some(c=>c.id===state.country)?'Download EU + selected-country milestones':'Download EU milestones'} ↓</button><button class="subtle-button" data-open="17">Play the dates challenge →</button></div>`);infoView='dates';}
  function formatDate(d){return new Intl.DateTimeFormat('en-GB',{timeZone:'Etc/GMT-1',day:'2-digit',month:'short',year:'numeric'}).format(new Date(d+'T12:00:00Z'));}
  function reporting(){showInfo('The right people. The right clock.','Training reference · reporting duties can overlap and depend on scope.',`${countrySelect(true)}${countryCard()}<h3>Preserve evidence. Involve the incident lead early.</h3><p>Record awareness and classification times, facts, affected services, known impact, uncertainty, containment and assistance required. Involve security, privacy / legal, operations, supplier owners and communications. Verify recipients and secure channels from official sources.</p><div class="report-table" role="region" aria-label="Incident reporting reference" tabindex="0"><table><caption class="sr-only">Incident routes, triggers and timing references</caption><thead><tr><th scope="col">Route</th><th scope="col">Trigger / recipient</th><th scope="col">Timing reference</th></tr></thead><tbody><tr><td>${sourceLink('gdpr','GDPR Art. 33–34')}</td><td>Controller → competent DPA for a reportable personal-data breach. Processor → controller without undue delay.</td><td>Without undue delay and, where feasible, within 72h of awareness, unless the breach is unlikely to pose a risk to people’s rights and freedoms. High-risk individual communication: without undue delay; separate conditions and exceptions.</td></tr><tr><td>${sourceLink('nis','NIS2 Art. 23')}</td><td>In-scope significant incident → national CSIRT / competent authority under national rules.</td><td>24h early warning; 72h notification; final within one month after notification. Trust-service and ongoing-incident exceptions apply.</td></tr><tr><td>${sourceLink('doraClock','DORA reporting RTS')}</td><td>Covered financial entity → competent authority for a major ICT-related incident.</td><td>Initial: generally within 4h of major classification, no later than 24h from awareness; later classification has its own rule. Intermediate ≤72h after initial; final ≤1 month after intermediate / latest update.</td></tr><tr><td>${sourceLink('cra','CRA reporting')}</td><td>Applicable manufacturer → Single Reporting Platform.</td><td>24h early warning; 72h full notification. Final: exploited vulnerability ≤14 days after a corrective measure is available; severe incident within a month of the 72h notification.</td></tr></tbody></table></div><p class="source-note">These are timing references, not a decision that a particular incident is reportable. Do not wait until a maximum deadline when a duty requires action without undue delay.</p><h3>Find the correct channel.</h3><ul><li>${sourceLink('csirts','National CSIRT directory')} — assistance and current national routing. Confirm the designated NIS2 endpoint.</li><li>${sourceLink('dpas','EDPB national authority directory')} — identify the competent DPA and its breach-reporting process.</li><li>${sourceLink('cra','CRA Single Reporting Platform guidance')} — follow the official platform link.</li><li>Financial sector: use your competent authority’s DORA process. Suspected crime: involve the incident lead and appropriate national law enforcement; urgent physical danger follows local emergency procedures.</li></ul><h3>A small reporting drill.</h3><p>Fictional scenario: the controller becomes aware of a reportable breach at <b>10:00 CET on 6 November 2026</b>. Which is the 72-hour reference point?</p><div class="drill-options"><button data-clock-answer="wrong">7 November, 10:00</button><button data-clock-answer="right">9 November, 10:00</button><button data-clock-answer="wrong">After the forensic report is finished</button></div><p id="clockFeedback" role="status">The legal duty still says without undue delay. Use this as a calculation exercise.</p><div class="fact-callout">Agree authority participation before a test. Use marked drafts or an agreed exercise channel; never submit a fictitious incident as a real notification.</div><div class="guide-actions"><button class="button button-green" data-open="22">Open the reporting quest →</button><button class="subtle-button" data-dates>Milestone dates →</button></div>`);infoView='reporting';}
  function badges(){
    const complete=state.completed,count=cat=>complete.filter(id=>lessons[id-1].category===cat).length;
    return [
      {id:'first-spark',name:'First spark',desc:'Unwrap your first door',earned:state.opened.length>0,icon:'✧',art:'sparkle'},
      {id:'first-quest',name:'First shield',desc:'Complete your first quest',earned:complete.length>=1,icon:'✓',art:'shield'},
      {id:'habit-builder',name:'Habit builder',desc:'Complete 5 quests',earned:complete.length>=5,icon:'✦',art:'tree'},
      {id:'weekly-watcher',name:'Weekly watcher',desc:'Complete 7 quests',earned:complete.length>=7,icon:'✳',art:'star'},
      {id:'halfway',name:'Halfway guardian',desc:'Complete 12 quests',earned:complete.length>=12,icon:'◇',art:'gift'},
      {id:'all-quests',name:'Calendar defender',desc:'Complete all 24 quests',earned:complete.length===24,icon:'♜',art:'shield'},
      {id:'agent-guardian',name:'Agent guardian',desc:'Complete 3 AI quests',earned:count('ai')>=3,icon:'✳',art:'key'},
      {id:'privacy-keeper',name:'Privacy keeper',desc:'Complete all 4 privacy quests',earned:count('privacy')>=4,icon:'◇',art:'key'},
      {id:'supplier-ally',name:'Supplier ally',desc:'Complete 3 quests involving suppliers',earned:complete.filter(id=>games[id].contexts.includes('supplier')).length>=3,icon:'⌘',art:'shield'},
      {id:'evidence-explorer',name:'Evidence explorer',desc:'Earn 6 source bonuses',earned:state.readings.length>=6,icon:'▱',art:'mug'},
      {id:'deep-reader',name:'Deep reader',desc:'Earn all 24 source bonuses',earned:state.readings.length===24,icon:'▱',art:'star'},
      {id:'connected-guardian',name:'Connected-world guardian',desc:'Complete both connected-world quests',earned:count('ot')===2,icon:'❄',art:'snowflake'},
      {id:'three-day-streak',name:'Three-day flame',desc:'Reach a 3-day learning streak',earned:(state.streak?.best||0)>=3,icon:'✧',art:'bell'},
      {id:'seven-day-streak',name:'Seven-day beacon',desc:'Reach a 7-day learning streak',earned:(state.streak?.best||0)>=7,icon:'✦',art:'tree'},
      {id:'winterwatch-champion',name:'Winterwatch champion',desc:'Complete every quest and source bonus',earned:complete.length===24&&state.readings.length===24,icon:'♜',art:'gift'}
    ];
  }
  function showBadgeReward(earned,replay=false){
    const valid=earned.filter(b=>badges().some(current=>current.id===b.id&&current.earned));if(!valid.length)return;pendingBadges=pendingBadges.filter(b=>!valid.some(v=>v.id===b.id));if(!pendingBadges.length)clearTimeout(badgeTimer);
    toast(`${replay?'Badge celebration replayed':'Badge unlocked'}: ${valid.map(b=>b.name).join(', ')}.`);
    if(motionPaused())return;
    const layer=document.createElement('div');layer.className='celebration-layer badge-celebration';layer.setAttribute('aria-hidden','true');
    const reward=document.createElement('div');reward.className='badge-reward';
    const symbol=document.createElement('span');symbol.className='badge-reward-symbol';symbol.textContent=valid[0].icon;reward.append(symbol);
    const kicker=document.createElement('strong');kicker.textContent=replay?'YOUR MILESTONE':'MILESTONE UNLOCKED';reward.append(kicker);
    const title=document.createElement('h3');title.textContent=valid[0].name;reward.append(title);
    const detail=document.createElement('p');detail.textContent=valid.length>1?`Plus ${valid.length-1} more milestone${valid.length>2?'s':''}. Find them in Your progress.`:valid[0].desc;reward.append(detail);
    layer.append(reward);$$('.celebration-layer').forEach(x=>x.remove());($('#lessonDialog').open?$('#lessonDialog'):$('#infoDialog').open?$('#infoDialog'):document.body).append(layer);setTimeout(()=>layer.remove(),2600);
  }
  function progress(){
    showInfo('Your progress.',storageLabel(),`<div class="progress-stats"><div class="progress-stat"><strong>${points().toLocaleString()}</strong><span>of 2,400 XP</span></div><div class="progress-stat"><strong>${state.completed.length}<small>/24</small></strong><span>quests complete</span></div><div class="progress-stat"><strong>${state.readings.length}<small>/24</small></strong><span>source bonuses earned</span></div><div class="progress-stat"><strong>${engine.streakCount(state,releaseWindowKey())}</strong><span>day learning streak</span></div></div><p class="streak-note">Complete a new quest on consecutive learning days to build your streak. Learning days begin at 09:00 CET. Best streak: <b>${state.streak.best} day${state.streak.best===1?'':'s'}</b>. Saved streaks survive reloads.</p><div class="xp-track"><span style="width:${points()/24}%"></span></div><p class="reading-progress">${Object.values(state.solved).reduce((n,a)=>n+a.length,0)} / 72 decision rounds resolved</p><h3>A mantelpiece of milestones.</h3><p>${badges().filter(b=>b.earned).length} of ${badges().length} badges unlocked. ${storageStatus==='unavailable'?'Browser storage must be available to keep earned badges.':'Milestones stay earned when you return.'}</p><div class="badges-grid">${badges().map(b=>`<article class="badge ${b.earned?'earned':''}"><span class="badge-art" aria-hidden="true">${icon(b.art)}</span><b>${esc(b.name)}</b><small>${b.earned?'Unlocked · ':'Not yet earned · '}${esc(b.desc)}</small>${b.earned?`<button class="subtle-button" data-badge-celebrate="${b.id}" aria-label="Replay celebration for ${esc(b.name)}">Celebrate again ✦</button>`:''}</article>`).join('')}</div><h3>Choose your next discovery.</h3><div class="completion-list">${lessons.map(l=>`<button class="${state.completed.includes(l.id)?'done':''}" data-open="${l.id}"><span>${String(l.id).padStart(2,'0')}</span>${esc(l.short)}<small>${lessonPoints(l.id)} XP</small></button>`).join('')}</div><p class="source-note">${esc(storageNotice())} Progress is not uploaded or included in shared lessons. Browser settings control retention; clearing site data or using another browser starts a fresh journey.</p><div class="guide-actions progress-close-actions"><button type="button" class="button button-green" data-close-info>Close progress</button></div>`);infoView='progress';$('#infoDialog [data-close-info]')?.setAttribute('aria-label','Close progress');
  }
  function confirmReset(){
    showInfo('Reset all your progress?','This cannot be undone.',`<p>This clears saved quests, XP, reading bonuses, badges and streaks from this browser.</p><div class="guide-actions reset-confirm-actions"><button type="button" class="button button-soft" data-cancel-reset>Cancel</button><button type="button" class="button button-green" data-confirm-reset>Yes, reset my progress</button></div>`);infoView='reset-confirm';$('#infoDialog [data-cancel-reset]')?.focus({preventScroll:true});
  }
  function about(){
    showInfo('A little wonder. A useful habit.','Cybersecurity, AI and privacy belong to everyone who builds, leads or keeps things running.',`<h3>Contact and feedback</h3><p>For content corrections and accessibility feedback, <a href="https://github.com/aware-by-design/Winterwatch-site/issues" target="_blank" rel="noopener noreferrer">contact the calendar maintainers through public GitHub issues ↗</a>. GitHub is an external service and handles submissions under its own terms.</p><h3>AI assistance and editorial review</h3><p>AI tools assisted with drafting, code, illustrations and review. Illustrations are labelled AI-generated. Claims are linked to sources and dated; mistakes can remain. Operational use needs current source checks and qualified review.</p><h3>24 doors. Three perspectives.</h3><p>Winterwatch pairs a quiet festive setting with practical learning. Explore recent incidents, everyday hygiene, customer–supplier dependencies, response playbooks and EU-first regulatory milestones. Each lesson includes technical, business and operations perspectives. The collection connects awareness raising with practical cyber-hygiene habits.</p><h3>Evidence, with the labels left on.</h3><p>Primary-source incidents, provider assessments, disclosed vulnerabilities, legal duties and fictional exercises are labelled separately. Operational recipes are authored training examples, not vendor-certified rules. The calendar does not update itself. Check current cases, reporting routes and country guidance at their official sources.</p><h3>Learn without an account.</h3><p>The calendar asks for no name, email, account or personal details. It has no analytics, advertising trackers, third-party scripts, remote fonts or learner-data server. When browser storage is available, the calendar saves minimal progress in this browser: which lessons and decisions you finished, reading bonuses, and your last learning-window date with streak counts. XP and milestone badges are reconstructed from that progress. Raw answers, personal details and display preferences are not saved. No progress is uploaded or exported. Use Reset progress beside View progress on the calendar to remove it after confirmation.</p><h3>When you follow a link.</h3><p>Sources and social platforms open only when you choose them. Social posts and cards use public lesson content. Those services handle visits under their own terms. This site is hosted on GitHub Pages, which logs and stores visitors’ IP addresses for security purposes. <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection" target="_blank" rel="noopener noreferrer">GitHub Pages data collection ↗</a> · <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub privacy statement ↗</a>. The calendar has no access to those visitor logs.</p><h3>A calm, accessible December.</h3><p>Each door becomes available on its December date at 09:00 CET and remains available. Play any released day, including lessons you missed. After 24 December at 09:00 CET, all 24 lessons remain available at your own pace. Use Accessibility for three text sizes, pause animations, high contrast and easier reading. Listen buttons use an English voice installed on your device; speech stops when you change a lesson or close it. Keyboard navigation and reduced-motion support are also included. Display choices last for this tab only. There is no sound by default.</p><div class="guide-actions"><button class="button button-green" data-sources>Research & sources →</button><button class="subtle-button" data-guide>Field guide →</button></div>${initiativeHtml()}`);
  }
  function allSources(){showInfo('Follow the evidence.','Primary research, public authorities, legal texts and standards bodies.',`<p>Some source sites can restrict automated retrieval; corroborating official guidance is linked where available. A historical patch version or deadline is not a recommendation to use obsolete software or law.</p><div class="fact-callout">Follow each claim back to its source. Check the publication date, current legal text and relevant national authority before applying it. Case findings and defensive training recommendations are labelled separately.</div><ul class="source-list">${Object.entries(sources).map(([id,s])=>`<li>${sourceLink(id)}<small>${esc(s.org)} · ${esc(s.kind)}</small></li>`).join('')}</ul><div class="guide-actions"><button class="button button-green" data-export-sources>Download source register ↓</button><button class="subtle-button" data-about>About this collection</button></div>${initiativeHtml()}`);}
  function milestoneCalendar(){
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Winterwatch//2026 milestones//EN','CALSCALE:GREGORIAN'];
    const e=s=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
    const country=countries.find(c=>c.id===state.country);
    const milestones=[...dates.map(d=>({...d,scope:'EU'})),...(country?.milestones||[]).map(d=>({...d,scope:country.name}))];
    for(const [i,d] of milestones.entries()){const next=new Date(d.date+'T12:00:00Z');next.setUTCDate(next.getUTCDate()+1);lines.push('BEGIN:VEVENT',`UID:winterwatch-${state.country}-${d.date}-${i}@calendar.local`,'DTSTAMP:20261106T000000Z',`DTSTART;VALUE=DATE:${d.date.replaceAll('-','')}`,`DTEND;VALUE=DATE:${next.toISOString().slice(0,10).replaceAll('-','')}`,`SUMMARY:${e(d.scope+' · '+d.name)}`,`DESCRIPTION:${e(d.detail+' Confirm the applicable entity, cohort, role and current law. This is a learning milestone, not an organisation-specific deadline. '+sources[d.source].url)}`,'END:VEVENT');}lines.push('END:VCALENDAR');
    return foldCalendarLines(lines);
  }
  function foldCalendarLines(lines){
    // Fold long iCalendar lines by UTF-8 octets, as required by RFC 5545.
    const enc=new TextEncoder();const folded=lines.map(line=>{if(/^[\x20-\x7e]*$/.test(line)){const parts=[line.slice(0,74)];for(let i=74;i<line.length;i+=73)parts.push(' '+line.slice(i,i+73));return parts.join('\r\n');}let out='',part='',bytes=0;for(const ch of line){const n=enc.encode(ch).length;if(bytes+n>74){out+=part+'\r\n ';part='';bytes=1;}part+=ch;bytes+=n;}return out+part;}).join('\r\n')+'\r\n';
    return folded;
  }
  function validInviteImage(image){return image?.type==='image/jpeg'&&typeof image.data==='string'&&image.data.length>0&&image.data.length<=14000&&image.data.length%4===0&&/^[A-Za-z0-9+/]+={0,2}$/.test(image.data);}
  function adventInviteHtml(l,image=null){
    const banner=validInviteImage(image)?`<img src="data:image/jpeg;base64,${image.data}" alt="Day ${l.id} with Nestor: ${esc(l.title)}" width="600" height="225" style="display:block;width:100%;height:auto;border:0;border-radius:14px 14px 0 0">`:`<div style="background:#173d31;color:#fff8e6;padding:28px;border-radius:14px 14px 0 0"><p style="margin:0 0 10px;color:#e8ca8e;font-size:14px">DAY ${l.id} WITH NESTOR</p><h1 style="font:30px/1.2 Georgia,serif;margin:0">${esc(l.title)}</h1></div>`;
    return `<div lang="en" style="max-width:600px;margin:0 auto;background:#f8f6ef;color:#173d31;font-family:Arial,Helvetica,sans-serif;border:1px solid #d4ddcd;border-radius:14px">${banner}<div style="padding:25px 28px"><p style="margin:0 0 18px;font-size:14px;font-weight:bold;color:#455943">${l.id} December 2026 &nbsp;·&nbsp; 09:00–09:10 CET</p><h2 style="font:26px/1.25 Georgia,serif;margin:0 0 14px">One day. One useful habit.</h2><p style="font-size:16px;line-height:1.65;margin:0 0 20px">${esc(adventBriefs[l.id]||l.takeaway)}</p><div style="padding:16px 18px;background:#e9efdf;border-left:4px solid #bfa26b;border-radius:5px"><p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#455943">KEEP THIS HABIT</p><p style="font:20px/1.4 Georgia,serif;margin:0">${esc(l.takeaway)}</p></div><p style="font-size:14px;line-height:1.6;margin:20px 0 24px">Join Nestor for three practical decisions, then explore the day’s briefing and sources in your Winterwatch calendar.</p><div style="border-top:1px solid #ccd7c5;padding-top:18px;font-size:12px;line-height:1.6;color:#455943"><p style="margin:0 0 10px">AI-assisted conceptual illustration; not incident evidence.</p><strong>${esc(initiative)}</strong><br><a href="${arInABoxUrl}" style="color:#173d31;text-decoration:underline">Learn more about AR-in-a-Box</a></div></div></div>`;
  }
  function drawAdventInviteBanner(l,image,width=600){
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(width*.375);const ctx=canvas.getContext('2d');if(!ctx)return null;ctx.scale(width/600,width/600);
    const iw=image.naturalWidth||image.width,ih=image.naturalHeight||image.height,scale=Math.max(600/iw,225/ih),w=iw*scale,h=ih*scale;
    ctx.fillStyle='#173d31';ctx.fillRect(0,0,600,225);ctx.drawImage(image,600-w,(225-h)/2,w,h);
    const shade=ctx.createLinearGradient(0,0,600,0);shade.addColorStop(0,'#12352b');shade.addColorStop(.66,'#12352bf5');shade.addColorStop(.84,'#12352b80');shade.addColorStop(1,'#12352b00');ctx.fillStyle=shade;ctx.fillRect(0,0,600,225);
    ctx.fillStyle='#e8ca8e';ctx.fillRect(27,22,30,2);ctx.font='bold 14px Arial';ctx.textBaseline='top';ctx.fillText(`DAY ${String(l.id).padStart(2,'0')} WITH NESTOR`,27,34);
    cardText(ctx,l.title,{x:27,y:64,w:367,h:103},{size:29,minSize:22,family:'Georgia',color:'#fff8e6',spacing:1.12});
    ctx.fillStyle='#e8ca8e';ctx.font='14px Arial';ctx.fillText(`${l.id} DECEMBER 2026  ·  10 MINUTES`,27,189);return canvas;
  }
  function adventReminderCalendar(now=new Date(),images=new Map()){
    const e=value=>String(value).replace(/\\/g,'\\\\').replace(/\r\n|\r|\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
    const upcoming=upcomingAdventLessons(now);if(!upcoming.length)return '';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//ENISA ARCH AHWG//Winterwatch Advent 2026//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Winterwatch Advent 2026','X-WR-TIMEZONE:CET'];
    for(const l of upcoming){
      const date=`202612${String(l.id).padStart(2,'0')}`,image=images.get(l.id),brief=adventBriefs[l.id]||l.takeaway;
      const description=`Day ${l.id} with Nestor\n${l.title}\n\n${brief}\n\nKeep this habit: ${l.takeaway}\n\n${l.id} December 2026 · 09:00–09:10 CET. Three practical decisions, then the day’s briefing and sources.\n\nAI-assisted conceptual illustration; not incident evidence.\n\n${initiative}\nLearn more about AR-in-a-Box: ${arInABoxUrl}`;
      lines.push('BEGIN:VEVENT',`UID:winterwatch-arch-ahwg-2026-day-${String(l.id).padStart(2,'0')}@calendar.local`,'DTSTAMP:20261119T000000Z',`DTSTART:${date}T080000Z`,`DTEND:${date}T081000Z`,`SUMMARY:${e(`Winterwatch with Nestor · Day ${l.id}: ${l.title}`)}`,`DESCRIPTION:${e(description)}`);
      if(validInviteImage(image))lines.push(`IMAGE;DISPLAY=FULLSIZE;FMTTYPE=image/jpeg;ENCODING=BASE64;VALUE=BINARY:${image.data}`);
      lines.push(`X-ALT-DESC;FMTTYPE=text/html:${e(adventInviteHtml(l,image))}`,'TRANSP:TRANSPARENT','STATUS:CONFIRMED','SEQUENCE:4','BEGIN:VALARM','ACTION:DISPLAY','TRIGGER:PT0M',`DESCRIPTION:${e(`Day ${l.id} with Nestor: ${l.title}. ${brief}`)}`,'END:VALARM','END:VEVENT');
    }
    lines.push('END:VCALENDAR');return foldCalendarLines(lines);
  }
  const reminderImageCache=new Map();
  async function embeddedReminderImage(l){
    const visual=visualFor(l);if(!visual)return null;
    const key=`${l.id}:${visual.src}:${l.title}`;
    if(!reminderImageCache.has(key))reminderImageCache.set(key,(async()=>{
      let timeout;try{
        const image=await Promise.race([loadArtwork(l),new Promise(resolve=>{timeout=setTimeout(()=>resolve(null),8000);})]);if(!image)return null;
        for(const width of [600,480]){
          const canvas=drawAdventInviteBanner(l,image,width);if(!canvas)return null;
          for(const quality of [.82,.70,.56,.42]){const data=canvas.toDataURL('image/jpeg',quality);if(data.startsWith('data:image/jpeg;base64,')&&data.length-23<=14000)return {type:'image/jpeg',data:data.slice(23)};}
        }
        return null;
      }catch{return null;}finally{clearTimeout(timeout);}
    })());
    const result=await reminderImageCache.get(key);if(!result)reminderImageCache.delete(key);return result;
  }
  async function exportAdventReminders(){
    if(reminderExportPending)return;
    const now=new Date(),upcoming=upcomingAdventLessons(now),count=upcoming.length;
    if(!count){toast('The 2026 reminder schedule has ended. All 24 lessons remain available.');return;}
    reminderExportPending=true;updateAdventTracker(now);
    try{
      const pairs=await Promise.all(upcoming.map(async l=>[l.id,await embeddedReminderImage(l)])),images=new Map(pairs.filter(([,image])=>image));
      download(adventReminderCalendar(now,images),'winterwatch-advent-2026-reminders.ics','text/calendar;charset=utf-8');
      const missing=upcoming.some(l=>!images.has(l.id));toast(`${count} daily ${count===1?'reminder':'reminders'} downloaded.${missing?' Some images could not be included.':''}`);
    }finally{reminderExportPending=false;updateAdventTracker();}
  }
  function exportDates(){if(!jurisdictions.some(c=>c.id===state.country)){toast('Choose a country first.');return;}download(milestoneCalendar(),`winterwatch-eu-${state.country}-milestones.ics`,'text/calendar;charset=utf-8');toast(countries.some(c=>c.id===state.country)?'EU and selected-country milestones downloaded. Review applicability before adding them.':'EU milestones downloaded. This country has no detailed national milestone profile in this edition.');}
  // Display choices live only in this tab; progress remains a separate checkpoint.
  let textSize='normal',highContrast=false,easierReading=false,pauseAnimations=false;
  let accessibilityReturnFocus=null,speechToken=0,listeningKey='',speechUtterance=null;
  const motionPaused=()=>pauseAnimations||window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function speakerLabel(text){return `<svg class="control-icon speaker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg><span>${esc(text)}</span>`;}
  function setListenButton(button,playing){
    const briefing=button.hasAttribute('data-listen-panel')&&button.classList.contains('briefing-listen');
    button.setAttribute('aria-pressed',String(playing));
    button.innerHTML=speakerLabel(playing?'Stop listening':briefing?'Listen to this briefing':'Listen');
    const id=Number(button.dataset.listen);
    button.setAttribute('aria-label',Number.isInteger(id)&&id>=1&&id<=24?`${playing?'Stop listening to':'Listen to'} Day ${id}${button.id==='doorLockListen'?' opening message':''}`:playing?'Stop listening':briefing?'Listen to this briefing':'Listen to this lesson section');
  }
  function stopListening(){
    speechToken++;listeningKey='';speechUtterance=null;
    try{window.speechSynthesis?.cancel();}catch{/* A missing device service must not block learning. */}
    $$('[data-listen],[data-listen-panel]').forEach(b=>{setListenButton(b,false);});
  }
  function listenNotice(button,message){
    const status=button.closest?.('dialog')?.querySelector('[data-listen-status]');
    if(status)status.textContent=message;else if(message)toast(message);
  }
  function listenText(text,key,button){
    if(listeningKey===key){stopListening();return;}
    stopListening();listenNotice(button,'');
    const synth=window.speechSynthesis,Utterance=window.SpeechSynthesisUtterance;
    if(!synth||typeof Utterance!=='function'){listenNotice(button,'Read aloud is not available in this browser. You can use your device’s screen reader.');return;}
    let voices;try{voices=synth.getVoices().filter(v=>v.localService===true);}catch{voices=[];}
    const voice=voices.find(v=>/^en[-_]/i.test(v.lang))||voices.find(v=>/^en$/i.test(v.lang));
    if(!voice){listenNotice(button,'No English device voice is ready. Enable an English offline voice in your device settings, then try Listen again.');return;}
    const words=String(text).replace(/\s+/g,' ').trim().split(' '),chunks=[];
    for(const word of words){if(!chunks.length||chunks[chunks.length-1].length+word.length>180)chunks.push(word);else chunks[chunks.length-1]+=' '+word;}
    if(!chunks.join('').trim())return;
    listeningKey=key;setListenButton(button,true);
    const token=speechToken;
    const speak=()=>{
      if(token!==speechToken)return;
      const chunk=chunks.shift();if(!chunk){stopListening();return;}
      const utterance=new Utterance(chunk);speechUtterance=utterance;utterance.voice=voice;utterance.lang=voice.lang;utterance.rate=1;
      utterance.onend=()=>{if(token===speechToken)speak();};
      utterance.onerror=()=>{if(token===speechToken){stopListening();listenNotice(button,'Your device could not read this text. Please try again or use a screen reader.');}};
      try{synth.speak(utterance);}catch{stopListening();listenNotice(button,'Read aloud is unavailable on this device.');}
    };
    speak();
  }
  function listenDoor(id,button){
    const l=lessons.find(l=>l.id===id);if(!l)return;
    const text=available(id)?`Day ${id}. ${l.title}. What to expect. ${adventBriefs[id]}. Today’s takeaway. ${l.takeaway}`:lockedDoorMessage(id);
    listenText(text,`door-${id}`,button);
  }
  function listenPanel(button){
    if(!$('#lessonDialog').open||!activeDoorAllowed())return;
    const panel=$('#lessonPanel').cloneNode(true);
    panel.querySelectorAll('svg,textarea,[aria-hidden="true"],details:not([open])').forEach(n=>n.remove());
    panel.querySelectorAll('button').forEach(n=>{
      if(n.matches('[data-game-choice],[data-evidence-option],[data-habit-index],[data-reading-answer]'))n.replaceWith(document.createTextNode(` Option: ${n.textContent}. `));
      else n.remove();
    });
    // Separate blocks for natural speech without inserting executable markup.
    panel.querySelectorAll('p,li,h3,h4,dt,dd,pre').forEach(n=>n.append(document.createTextNode('. ')));
    listenText(`Day ${activeId}. ${lessons[activeId-1].title}. ${panel.textContent}`,`panel-${activeId}-${activeTab}`,button);
  }
  function applyAccessibility(){
    document.body.setAttribute('data-text-size',textSize);
    document.body.classList.toggle('high-contrast',highContrast);
    document.body.classList.toggle('easier-reading',easierReading);
    document.documentElement?.setAttribute('data-text-size',textSize);
    document.body.classList.toggle('pause-animations',motionPaused());
    $('#accessTextSize').value=textSize;$('#accessContrast').checked=highContrast;$('#accessReading').checked=easierReading;
    $('#accessMotion').checked=motionPaused();$('#accessMotion').disabled=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAmbience();
  }
  function resetAccessibility(){
    stopListening();textSize='normal';highContrast=false;easierReading=false;pauseAnimations=false;state.ambience=true;
    applyAccessibility();
    $('#accessibilityStatus').textContent=motionPaused()?'Accessibility settings reset. Your device’s reduced-motion preference keeps animations paused.':'Accessibility settings reset. Animations are allowed again.';
  }
  function showAccessibility(){
    stopListening();
    const dialog=$('#accessibilityDialog');if(dialog.open)return;
    accessibilityReturnFocus={element:document.activeElement};applyAccessibility();dialog.showModal();$('#accessibilityClose').focus({preventScroll:true});
  }
  function syncAtmosphereLayout(){const r=$('.hero')?.getBoundingClientRect();if(r&&Number.isFinite(r.height)&&r.height>0)$('#snow').style.setProperty('--snow-distance',`${r.height+40}px`);}
  function setAmbience(){const on=state.ambience&&!motionPaused();document.body.classList.toggle('pause-animations',motionPaused());$('.hero').classList.toggle('paused',!on);$('#snow').classList.toggle('paused',!on);$('#snow').hidden=!on;$('#ambienceButton').setAttribute('aria-pressed',String(on));$('#ambienceText').textContent=on?'Snow on':'Still & cosy';$('#ambienceIcon').textContent=on?'❄':'✧';}
  $('#snow').innerHTML=Array.from({length:104},(_,i)=>`<span style="--x:${(i*37.17)%100}%;--s:${1+i%5}px;--o:${.22+(i%6)*.1};--d:${8+i%15}s;--delay:-${i%29}s;--drift:${-24+i%61}px"></span>`).join('');
  document.addEventListener('click',async e=>{
    const b=e.target.closest('button,a');if(!b)return;
    if(b.hasAttribute('data-accessibility')){showAccessibility();return;}
    if(b.hasAttribute('data-reset-accessibility')){resetAccessibility();return;}
    if(b.hasAttribute('data-close-accessibility')){$('#accessibilityDialog').close();return;}
    if(b.hasAttribute('data-listen')){listenDoor(Number(b.dataset.listen),b);return;}
    if(b.hasAttribute('data-listen-panel')){listenPanel(b);return;}
    if(b.closest?.('#lessonDialog')&&!b.hasAttribute('data-close')&&!activeDoorAllowed()){e.preventDefault();return;}
    if(b.closest?.('#mainNav')&&b.getAttribute('href')==='#calendar'){e.preventDefault();setMenu(false);location.hash='#calendar';$('#calendarTitle').scrollIntoView?.({block:'start'});$('#calendarTitle').focus({preventScroll:true});return;}
    if(b.hasAttribute('data-close-door-lock')){$('#doorLockDialog').close();return;}
    if(b.hasAttribute('data-close-holiday')){$('#holidayDialog').close();return;}
    if(b.hasAttribute('data-close-welcome')){$('#welcomeDialog').close();return;}
    if(b.hasAttribute('data-welcome-start')){$('#welcomeDialog').close();openLesson(1);return;}
    if(b.hasAttribute('data-holiday-greeting')){showHolidayGreeting();return;}
    if(b.id==='menuToggle'){setMenu($('#menuToggle').getAttribute('aria-expanded')!=='true');return;}
    if(b.hasAttribute('data-game-choice')){submitStep(Number(b.dataset.gameChoice));return;}
    if(b.hasAttribute('data-evidence-option')){const step=games[activeId]?.steps[currentStage],i=Number(b.dataset.evidenceOption);if(step?.kind!=='select'||!Number.isInteger(i)||i<0||i>=step.options.length)return;const d=draftFor(activeId,currentStage);if(d.result)return;d.selected=d.selected.includes(i)?d.selected.filter(n=>n!==i):[...d.selected,i];renderLesson();$(`[data-evidence-option="${i}"]`)?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-order-from')){const d=draftFor(activeId,currentStage),from=Number(b.dataset.orderFrom),direction=Number(b.dataset.orderDirection),to=from+direction;if(d.result||!Number.isInteger(from)||![-1,1].includes(direction)||from<0||from>=d.order.length||to<0||to>=d.order.length)return;[d.order[from],d.order[to]]=[d.order[to],d.order[from]];renderLesson();$(`[data-order-from="${to}"]:not(:disabled)`)?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-habit-index')){const i=Number(b.dataset.habitIndex),step=games[activeId]?.steps[currentStage];if(step?.kind!=='habits'||!Number.isInteger(i)||i<0||i>=step.cards.length||!['do','avoid'].includes(b.dataset.habitValue))return;const d=draftFor(activeId,currentStage);if(d.result)return;d.habits[i]=b.dataset.habitValue==='do';renderLesson();$(`[data-habit-index="${i}"][data-habit-value="${b.dataset.habitValue}"]`)?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-check-step')){submitStep();return;}
    if(b.hasAttribute('data-next-stage')){if(currentStage<=2&&state.solved[activeId]?.includes(currentStage))nextStage();return;}
    if(b.hasAttribute('data-retry-step')){const d=draftFor(activeId,currentStage);d.result=null;d.response=null;renderLesson();$('[data-decision-title]')?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-game-hint')){const d=draftFor(activeId,currentStage);d.hint=!d.hint;renderLesson();$('[data-game-hint]')?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-stage')){const i=Number(b.dataset.stage);if(Number.isInteger(i)&&i>=0&&i<=2&&i<=engine.firstUnsolved(state,activeId)){currentStage=i;setTab('play');}return;}
    if(b.hasAttribute('data-return-game')){currentStage=engine.firstUnsolved(state,activeId);setTab('play');return;}
    if(b.hasAttribute('data-replay-day')){for(let i=0;i<3;i++){delete stageDrafts[`${activeId}-${i}`];draftFor(activeId,i,true);}currentStage=0;setTab('play');return;}
    if(b.hasAttribute('data-reading-answer')){submitReading(Number(b.dataset.readingAnswer));return;}
    if(b.dataset.badgeCelebrate){const badge=badges().find(x=>x.id===b.dataset.badgeCelebrate&&x.earned);if(badge)showBadgeReward([badge],true);return;}
    if(b.dataset.celebrate){if(b.dataset.celebrate==='day'&&state.completed.includes(activeId)||b.dataset.celebrate==='reading'&&state.readings.includes(activeId))celebrate(b.dataset.celebrate,true);return;}
    if(b.dataset.door){openLesson(Number(b.dataset.door));return;}
    if(b.dataset.open){openLesson(Number(b.dataset.open),false);return;}
    if(b.hasAttribute('data-audience')){state.audience=b.dataset.audience;refreshProgress();renderDoors();return;}
    if(b.hasAttribute('data-category')){category=b.dataset.category;$$('[data-category]').forEach(x=>{const on=x===b;x.classList.toggle('active',on);x.setAttribute('aria-pressed',on);});renderDoors();return;}
    if(b.hasAttribute('data-close')){$('#lessonDialog').close();return;}
    if(b.hasAttribute('data-close-info')){$('#infoDialog').close();return;}
    if(b.dataset.tab){setTab(b.dataset.tab);return;}
    if(b.dataset.lens&&['technical','business','operations'].includes(b.dataset.lens)){modalLens=b.dataset.lens;renderLesson();$(`[data-lens="${modalLens}"]`)?.focus({preventScroll:true});return;}
    if(b.hasAttribute('data-prev')){openLesson(activeId-1,false);return;}
    if(b.hasAttribute('data-next')){openLesson(activeId+1,false);return;}
    if(b.hasAttribute('data-copy-hunt')){await copy(lessons[activeId-1].hunt.code,'Read-only hunting example copied. Verify host coverage and tune first.');return;}
    if(b.hasAttribute('data-copy-rule')){await copy(lessons[activeId-1].logic,'Illustrative logic copied. Map fields before use.');return;}
    if(b.hasAttribute('data-download-playbook')){downloadPlaybook(lessons.find(l=>l.id===activeId));return;}
    if(b.hasAttribute('data-download-playbook-text')){download(playbookText(lessons[activeId-1]),`winterwatch-day-${String(activeId).padStart(2,'0')}-playbook.txt`);toast('Plain-text playbook downloaded.');return;}
    if(b.hasAttribute('data-copy-post')){await copy(shareText(lessons[activeId-1]),'Post copied. Ready to paste into your social app.');return;}
    if(b.hasAttribute('data-linkedin')){const l=lessons[activeId-1];const copied=await copy(shareText(l),'Lesson post copied. Paste it into your LinkedIn post.');if(copied)window.open(linkedinUrl(l),'_blank','noopener,noreferrer');return;}
    if(b.dataset.card){await exportCard(b.dataset.card);return;}
    if(b.hasAttribute('data-native-share')){await exportCard('status',true);return;}
    if(b.dataset.country){chooseCountry(b.dataset.country);return;}
    if(b.hasAttribute('data-guide')){guide();return;}
    if(b.hasAttribute('data-dates')){showDates();return;}
    if(b.hasAttribute('data-reporting')){reporting();return;}
    if(b.hasAttribute('data-progress')||b.id==='progressButton'){progress();return;}
    if(b.hasAttribute('data-about')){about();return;}
    if(b.hasAttribute('data-sources')){allSources();return;}
    if(b.hasAttribute('data-download-advent-reminders')){await exportAdventReminders();return;}
    if(b.hasAttribute('data-export-dates')){exportDates();return;}
    if(b.hasAttribute('data-export-sources')){download(JSON.stringify({sources},null,2),'winterwatch-source-register.json','application/json');toast('Source register downloaded.');return;}
    if(b.hasAttribute('data-reset-progress')){confirmReset();return;}
    if(b.hasAttribute('data-cancel-reset')){if(infoView==='reset-confirm')$('#infoDialog').close();return;}
    if(b.hasAttribute('data-confirm-reset')){if(!$('#infoDialog').open||infoView!=='reset-confirm')return;const {audience,country,context,ambience}=state;state={...emptyState(),audience,country,context,ambience};stageDrafts={};readingFeedback=null;clearTimeout(badgeTimer);pendingBadges=[];knownBadgeIds=new Set();clearSavedProgress();updateProgress();renderDoors();setAmbience();$('#infoDialog').close();toast(storageStatus==='unavailable'?'Progress reset in this page; check browser storage to clear the saved record.':'Saved progress cleared. A fresh December awaits.');return;}
    if(b.dataset.clockAnswer){$('#clockFeedback').textContent=b.dataset.clockAnswer==='right'?'✓ Correct: 9 November 2026 at 10:00 CET. Assess and report without undue delay; do not wait for the reference limit.':'Try again. Add 72 hours to the awareness time; the forensic report does not start this clock.';return;}
    if(b.id==='ambienceButton'){state.ambience=!state.ambience;refreshProgress();setAmbience();}
  });
  function chooseCountry(id,fromSelect=false){if(!jurisdictions.some(c=>c.id===id))return;const scope=$('#lessonDialog').open?$('#lessonDialog'):$('#infoDialog').open?$('#infoDialog'):document;const atlasWasOpen=Boolean($('.country-atlas-inline',scope)?.open);state.country=id;refreshProgress();if($('#lessonDialog').open)renderLesson();else if(infoView==='dates')showDates();else if(infoView==='reporting')reporting();if(atlasWasOpen)$('.country-atlas-inline',scope)?.setAttribute('open','');const control=fromSelect?$('[data-country-select]',scope):$(`[data-country="${id}"]`,scope);control?.focus({preventScroll:true});}
  document.addEventListener('change',e=>{
    if(e.target.id==='accessTextSize'&&['normal','larger','largest'].includes(e.target.value)){textSize=e.target.value;applyAccessibility();return;}
    if(e.target.id==='accessMotion'){pauseAnimations=e.target.checked;applyAccessibility();return;}
    if(e.target.id==='accessContrast'){highContrast=e.target.checked;applyAccessibility();return;}
    if(e.target.id==='accessReading'){easierReading=e.target.checked;applyAccessibility();return;}
    if(e.target.matches('[data-country-select]'))chooseCountry(e.target.value,true);if(e.target.id==='contextFilter'&&['all','customer','supplier','work','home','finance'].includes(e.target.value)){state.context=e.target.value;refreshProgress();renderDoors();}});
  $('#accessibilityDialog').addEventListener('close',()=>{if(!$('#accessibilityDialog').open){restoreFocus(accessibilityReturnFocus);scheduleCalendarGreetings();}});
  $('#lessonDialog').addEventListener('cancel',stopListening);
  $('#doorLockDialog').addEventListener('close',()=>{if(!$('#doorLockDialog').open){stopListening();restoreDoorLockFocus();scheduleCalendarGreetings();}});
  $('#holidayDialog').addEventListener('close',()=>{if(!$('#holidayDialog').open){restoreHolidayFocus();scheduleCalendarGreetings();}});
  $('#welcomeDialog').addEventListener('close',()=>{if(!$('#welcomeDialog').open){restoreWelcomeFocus();scheduleCalendarGreetings();}});
  $('#lessonDialog').addEventListener('close',()=>{if($('#lessonDialog').open)return;stopListening();if(/^#day=/.test(location.hash))history.replaceState(null,'','#calendar');clearTimeout(clockTimer);if(!$('#infoDialog').open)restoreFocus(lessonReturnFocus);scheduleCalendarGreetings();});
  $('#infoDialog').addEventListener('close',()=>{if(!$('#infoDialog').open&&!$('#lessonDialog').open)restoreFocus(infoReturnFocus);scheduleCalendarGreetings();});
  for(const dialog of [$('#lessonDialog'),$('#infoDialog'),$('#doorLockDialog'),$('#holidayDialog'),$('#welcomeDialog'),$('#accessibilityDialog')]) dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#menuToggle').getAttribute('aria-expanded')==='true'){setMenu(false,true);return;}if(e.target.matches('[role="tab"]')&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const tabs=$$('[role="tab"]');let i=tabs.indexOf(e.target);i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;const id=tabs[i].dataset.tab;setTab(id);$(`[role="tab"][data-tab="${id}"]`).focus();}});
  window.addEventListener('storage',e=>{
    if(e.key!==progressKey&&e.key!==null)return;
    try{if(e.storageArea&&e.storageArea!==localStorage)return;}catch{return;}
    let incoming;try{incoming=e.newValue===null?emptyState():decodeProgress(e.newValue);}catch{storageStatus='corrupt';updateProgress();return;}
    const {audience,country,context,ambience}=state;
    state={...incoming,audience,country,context,ambience};lastSaved=e.newValue;storageStatus=e.newValue===null?'ready':'saved';
    stageDrafts={};readingFeedback=null;clearTimeout(badgeTimer);pendingBadges=[];knownBadgeIds=new Set(badges().filter(b=>b.earned).map(b=>b.id));
    updateProgress();renderDoors();if($('#lessonDialog').open){currentStage=engine.firstUnsolved(state,activeId);renderLesson();}else if(infoView==='progress')progress();
  });
  window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#day=(\d{1,2})$/);if(m)openLesson(Number(m[1]),false);});
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',applyAccessibility);
  window.addEventListener('resize',syncAtmosphereLayout);
  window.addEventListener('pagehide',stopListening);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopListening();if(!document.hidden){updateAdventTracker();syncDailyDoors();}});
  applyAccessibility();renderDoors();updateProgress();syncAtmosphereLayout();setAmbience();tickAdventTracker();
  if(typeof window.ResizeObserver==='function'){const observer=new window.ResizeObserver(syncAtmosphereLayout);observer.observe($('.hero'));}
  const deepLink=location.hash.match(/^#day=(\d{1,2})$/);if(deepLink)openLesson(Number(deepLink[1]),false);
  greetingsReady=true;syncCalendarGreetings();
})();
