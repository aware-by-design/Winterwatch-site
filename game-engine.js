'use strict';
(() => {
  const empty=()=>({opened:[],solved:{},readings:[],completed:[],audience:'everyone',country:'de',context:'all',release:false,ambience:true});
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
  window.WINTERWATCH_ENGINE=Object.freeze({empty,evaluate,awardStep,awardReading,dayXp,xp,firstUnsolved});
})();
