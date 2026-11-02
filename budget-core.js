(function(root){
 'use strict';
 const valid=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0;
 function family(v){
  if(['Planes','Helicopters'].includes(v.class))return 'aircraft';
  if(['Motorcycles','Cycles'].includes(v.class)||['raptor','rrocket','chimera','stryder'].includes(v.id))return 'wheels';
  if(['Car','Amphibious_Automobile','Submarinecar'].includes(v.type)&&['Compacts','Coupes','Muscle','Off-Road','Open Wheel','SUVs','Sedans','Sports','Sports Classics','Supers','Vans','Emergency'].includes(v.class))return 'cars';
  return 'others';
 }
 function profile(v,data){
  if(data.bennys[v.id])return 'bennys';
  if(['Planes','Helicopters'].includes(v.class))return 'aircraft';
  if(['Motorcycles','Cycles'].includes(v.class))return 'motorcycle';
  if(data.weaponized.includes(v.id))return 'weaponized';
  if(v.class==='Open Wheel')return 'openwheel';
  if(v.class==='Emergency')return 'emergency';
  if(v.class==='Supers')return 'super';
  if(data.tuners.includes(v.id))return 'tuner';
  if(v.class==='Sports Classics')return 'classic';
  return 'road';
 }
 function estimate(v,data,settings={},edit={}){
  const leeway=Math.min(40,Math.max(20,Number(settings.leeway)||30))/100;
  const full=settings.full!==false,hsw=settings.hsw!==false&&v.hsw===true;
  const conversion=data.bennys[v.id];
  const corrected=valid(edit.regularPrice)?edit.regularPrice:v.regularPrice;
  const override=valid(edit.budgetPurchasePrice)?edit.budgetPurchasePrice:null;
  let purchase=override??(conversion?conversion.donorPrice:corrected);
  let priceBasis=override!==null?'Your acquisition estimate':conversion?'New donor, keeps the original car':'Catalogue regular price';
  if(settings.priceMode==='trade'&&!conversion&&override===null&&valid(v.tradePrice)){purchase=v.tradePrice;priceBasis='Trade price, unlock required';}
  const missing=[];
  if(!valid(purchase)){purchase=null;missing.push('Acquisition price');}
  const bennyCost=conversion?(valid(corrected)?corrected:conversion.cost):0;
  if(v.route==='conversion'&&!conversion)missing.push('Donor and conversion details');
  const hswReference=data.hsw[v.id];
  const hswCost=hsw?(hswReference?.cost??data.fallbackHsw):0;
  const estimatedHsw=hsw&&!hswReference;
  const kind=profile(v,data),allowance=data.profiles[kind];
  // HSW performance replaces normal performance, rather than adding both tiers.
  const performance=full?(hsw?data.hswPerformanceAllowance:allowance.performance):0;
  const cosmetics=full?allowance.cosmetics:0;
  const special=full?(data.special[v.id]?.cost||0):0;
  const mods=performance+cosmetics+special;
  const upgradeSubtotal=bennyCost+hswCost+mods;
  const buffer=Math.round(upgradeSubtotal*leeway);
  const total=(purchase??0)+upgradeSubtotal+buffer;
  return {id:v.id,name:v.name,make:v.make,vehicle:v,priority:edit.watchPriority==='high'?'high':'low',family:family(v),purchase,priceBasis,bennyCost,hswCost,estimatedHsw,performance,cosmetics,special,mods,upgradeSubtotal,buffer,total,complete:missing.length===0,missing,profile:kind,leeway};
 }
 function total(rows){
  const t={count:rows.length,purchase:0,bennyCost:0,hswCost:0,mods:0,buffer:0,total:0,missing:0,estimatedHsw:0,hswCount:0};
  for(const r of rows){for(const k of ['purchase','bennyCost','hswCost','mods','buffer','total'])t[k]+=r[k]??0;t.missing+=Number(!r.complete);t.estimatedHsw+=Number(r.estimatedHsw);t.hswCount+=Number(r.hswCost>0);}
  return t;
 }
 function calculate(vehicles,states,edits,data,settings={}){
  const rows=vehicles.filter(v=>!v.copyOf&&(states[v.id]||v.status)==='watchlist').map(v=>estimate(v,data,settings,edits[v.id]||{})).filter(r=>!settings.scope||settings.scope==='all'||r.family===settings.scope);
  return {rows,all:total(rows),high:total(rows.filter(r=>r.priority==='high')),low:total(rows.filter(r=>r.priority==='low'))};
 }
 root.AtlasBudget={estimate,calculate,total,family,profile};
})(globalThis);
