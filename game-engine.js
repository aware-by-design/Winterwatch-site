'use strict';
(() => {
  const empty=()=>({opened:[],solved:{},readings:[],completed:[],streak:{lastDay:null,current:0,best:0},audience:'everyone',country:'de',context:'all',release:false,ambience:true});
  const isDay=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
  const dayGap=(first,last)=>(Date.parse(first+'T00:00:00Z')-Date.parse(last+'T00:00:00Z'))/86400000;
  function restore(record){
    const s=empty();
    if(!record||typeof record!=='object'||Array.isArray(record)||record.version!==3)return s;
    const ids=value=>Array.isArray(value)?[...new Set(value.filter(n=>Number.isInteger(n)&&n>=1&&n<=24))].sort((a,b)=>a-b):[];
    s.opened=ids(record.opened);
    s.readings=ids(record.readings).filter(id=>s.opened.includes(id));
    for(const id of s.opened){
      const rounds=record.solved&&typeof record.solved==='object'&&Object.hasOwn(record.solved,id)?record.solved[id]:null;
      if(!Array.isArray(rounds))continue;
      const prefix=[];for(let i=0;i<3&&rounds.includes(i);i++)prefix.push(i);
      if(prefix.length)s.solved[id]=prefix;
      if(prefix.length===3)s.completed.push(id);
    }
    const streak=record.streak;
    if(streak&&typeof streak==='object'){
      const bounded=n=>Number.isInteger(n)&&n>=0?Math.min(n,s.completed.length):0;
      const best=bounded(streak.best),current=Math.min(bounded(streak.current),best);
      s.streak={lastDay:current&&isDay(streak.lastDay)?streak.lastDay:null,current:isDay(streak.lastDay)?current:0,best};
    }
    return s;
  }
  function snapshot(s){
    const clean=restore({version:3,opened:s.opened,solved:s.solved,readings:s.readings,streak:s.streak});
    return {version:3,opened:clean.opened,solved:clean.solved,readings:clean.readings,streak:clean.streak};
  }
  function recordLearningDay(s,today){
    if(!isDay(today)||!s.completed.length)return;
    s.streak ||= {lastDay:null,current:0,best:0};
    const previous=s.streak.lastDay;
    if(isDay(previous)&&dayGap(today,previous)<=0)return;
    const consecutive=isDay(previous)&&dayGap(today,previous)===1;
    s.streak.current=Math.min(s.completed.length,consecutive?s.streak.current+1:1);
    s.streak.lastDay=today;s.streak.best=Math.max(s.streak.best,s.streak.current);
  }
  function streakCount(s,today){
    return s.streak&&isDay(s.streak.lastDay)&&isDay(today)&&dayGap(today,s.streak.lastDay)<=1?s.streak.current:0;
  }
  function evaluate(step,response){
    if(!step)return false;
    if(step.kind==='choice')return Number.isInteger(response)&&response>=0&&response<step.options.length&&step.options[response].correct===true;
    if(step.kind==='select'){
      if(!Array.isArray(response)||response.some(n=>!Number.isInteger(n)||n<0||n>=step.options.length))return false;
      const selected=new Set(response),correct=step.options.flatMap((o,i)=>o.correct?[i]:[]);
      return selected.size===correct.length&&correct.every(n=>selected.has(n));
    }
    if(step.kind==='order')return Array.isArray(response)&&response.length===step.items.length&&response.every((n,i)=>Number.isInteger(n)&&n===i);
    if(step.kind==='habits')return Array.isArray(response)&&response.length===step.cards.length&&response.every((v,i)=>typeof v==='boolean'&&v===step.cards[i].good);
    return false;
  }
  function awardStep(s,id,index,step,response){
    if(!Number.isInteger(id)||id<1||id>24||!Number.isInteger(index)||index<0||index>2||!s.opened.includes(id)||index>firstUnsolved(s,id))return {correct:false,earned:0,completed:false};
    const correct=evaluate(step,response);if(!correct)return {correct:false,earned:0,completed:false};
    s.solved[id] ||= [];const fresh=!s.solved[id].includes(index);if(fresh)s.solved[id].push(index);
    const finished=s.solved[id].length===3&&!s.completed.includes(id);
    if(finished)s.completed.push(id);
    return {correct:true,earned:(fresh?20:0)+(finished?10:0),completed:finished};
  }
  function awardReading(s,id,reading,response){
    if(!s.opened.includes(id)||!Number.isInteger(response)||response<0||response>=reading.options.length)return {correct:false,earned:0};
    const correct=reading.options[response].correct===true,fresh=correct&&!s.readings.includes(id);
    if(fresh)s.readings.push(id);return {correct,earned:fresh?20:0};
  }
  function dayXp(s,id){return (s.opened.includes(id)?10:0)+(s.solved[id]?.length||0)*20+(s.completed.includes(id)?10:0)+(s.readings.includes(id)?20:0);}
  function xp(s){return Array.from({length:24},(_,i)=>dayXp(s,i+1)).reduce((a,b)=>a+b,0);}
  function firstUnsolved(s,id){for(let i=0;i<3;i++)if(!s.solved[id]?.includes(i))return i;return 3;}
  window.WINTERWATCH_ENGINE=Object.freeze({empty,restore,snapshot,recordLearningDay,streakCount,evaluate,awardStep,awardReading,dayXp,xp,firstUnsolved});
})();
