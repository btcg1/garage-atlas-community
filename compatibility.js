(function(global){
  'use strict';
  let data=null, failure=false;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const filters=[{value:'',label:'All upgrade eligibility'},{value:'hsw',label:'HSW eligible'},{value:'bennys',label:'Benny’s donor or custom model'},{value:'bennys-donor',label:'Benny’s conversion donors'},{value:'bennys-custom',label:'Benny’s custom models'},{value:'imani',label:'Full Imani Tech eligible'},{value:'jammer',label:'Missile jammer eligible'},{value:'jammer-only',label:'Jammer without full Imani Tech'},{value:'review',label:'Compatibility needs verification'}];
  function get(vehicle){
    const v=typeof vehicle==='string'?{id:vehicle}:vehicle||{};
    const modelId=v.copyOf||v.id||'';
    const id=data?.variantAliases?.[modelId]||modelId;
    const custom=data?.bennys?.find(x=>x.id===id)||null;
    const conversions=(data?.bennys||[]).filter(x=>x.donorIds.includes(id));
    const jammerInfo=data?.jammer?.[id]||null;
    const full=!!data?.imaniFull?.includes(id);
    return {id:modelId,loaded:!!data,failed:failure,hsw:data?data.hsw.ids.includes(id):!!v.hsw,bennys:!!custom||conversions.length>0,bennysDonor:conversions.length>0,bennysCustom:!!custom,conversions,donorIds:custom?.donorIds||[],jammer:!!jammerInfo,remote:full,imani:full?'full':jammerInfo?'jammer':'none',jammerInfo,workshop:jammerInfo?data.workshops[jammerInfo.workshop]:null,review:data?.disputed?.[id]||null};
  }
  function matches(v,filter){
    if(!filter||filter==='all')return true;
    const c=get(v);
    return ({hsw:c.hsw,bennys:c.bennys,'bennys-donor':c.bennysDonor,'bennys-custom':c.bennysCustom,imani:c.imani==='full','full-imani':c.imani==='full',jammer:c.jammer,'jammer-only':c.jammer&&c.imani!=='full',review:!!c.review})[filter]===true;
  }
  function installedKeys(v){
    const c=get(v),keys=[];
    if(c.hsw)keys.push('hsw');
    if(c.bennysCustom)keys.push('bennys');
    if(c.jammer)keys.push('jammer');
    if(c.remote)keys.push('remote');
    return keys;
  }
  function supports(v,key){return installedKeys(v).includes(key)}
  function badges(v){
    const c=get(v),out=[];
    if(c.hsw)out.push(['hsw','HSW eligible']);
    if(c.bennysDonor)out.push(['bennys','Benny’s donor']);
    if(c.bennysCustom)out.push(['bennys','Benny’s custom model']);
    if(c.imani==='full')out.push(['imani','Full Imani Tech']);
    else if(c.jammer)out.push(['jammer','Jammer eligible']);
    if(c.review)out.push(['review','Verify compatibility']);
    if(!out.length)return '';
    return '<div class="compat-badges" aria-label="Model upgrade eligibility">'+out.map(([style,label])=>`<span class="compat-badge compat-${style}">${esc(label)}</span>`).join('')+'</div>';
  }
  function source(key,label){
    const s=data?.sources?.[key];
    return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(label||s.label)} ↗</a>`:'';
  }
  function modelName(id){
    const m=data?.modelNames?.[id];return m||id;
  }
  function modelLink(id){return `<button type="button" class="compat-model-link" data-detail="${esc(id)}">${esc(modelName(id))}</button>`}
  function detail(v){
    const c=get(v);
    if(!data)return `<section class="compat-detail"><h3>Upgrade eligibility</h3><p>${failure?'Upgrade compatibility could not load. Refresh to try again.':'Loading upgrade compatibility.'}</p></section>`;
    let rows='';
    rows+=`<div class="compat-fact"><strong>Hao’s Special Works</strong><p>${c.hsw?`Eligible on ${esc(data.hsw.platforms.join(', '))}. Visit ${esc(data.hsw.workshop)}. ${esc(data.hsw.prerequisite)} ${source(data.hsw.source)}`:'No HSW conversion is listed for this model.'}</p>${c.hsw?`<p class="muted">Unavailable on ${esc(data.hsw.unavailablePlatforms.join(', '))}.</p>`:''}</div>`;
    if(c.bennysDonor){
      rows+=`<div class="compat-fact"><strong>Benny’s conversion donor</strong><p>This is the base model. Convert it at Benny’s Original Motor Works in Strawberry to ${c.conversions.map(x=>modelLink(x.id)).join(' or ')}. The conversion changes the model. Further performance, interior and cosmetic work costs extra. ${source('bennys')}</p><p class="muted">Record a completed conversion against its custom model in your collection.</p></div>`;
    }else if(c.bennysCustom){
      rows+=`<div class="compat-fact"><strong>Benny’s custom model</strong><p>This is the conversion result, built from ${c.donorIds.map(modelLink).join(' or ')} at Benny’s Original Motor Works. A donor purchase and conversion are separate costs. This badge does not mark your own customization work as completed. ${source('bennys')}</p></div>`;
    }else rows+='<div class="compat-fact"><strong>Benny’s conversions</strong><p>No Benny’s conversion or custom model is listed for this vehicle.</p></div>';
    if(c.jammer){
      rows+=`<div class="compat-fact"><strong>${c.imani==='full'?'Full Imani Tech eligibility':'Missile lock-on jammer eligibility'}</strong><p>${c.imani==='full'?'Supports a missile lock-on jammer or a remote control unit. These share an upgrade slot, so choose one. Armor plating, weapons and mines vary by model.':'Supports the jammer upgrade. This does not grant the Imani remote control unit or the full Imani Tech package.'}</p><p><b>Install at ${esc(c.workshop.label)}.</b> ${esc(c.workshop.requirements)}</p>${c.jammerInfo.note?`<p>${esc(c.jammerInfo.note)}</p>`:''}<p class="compat-sources">${source(c.imani==='full'?'imani':c.jammerInfo.source)} ${source(c.jammerInfo.reference||c.workshop.source)}${c.jammerInfo.modelSource?` <a href="${esc(c.jammerInfo.modelSource)}" target="_blank" rel="noopener noreferrer">Exact model specification ↗</a>`:''}</p></div>`;
    }else rows+='<div class="compat-fact"><strong>Imani Tech and missile jammer</strong><p>No confirmed full Imani Tech or missile jammer upgrade is listed for this exact model.</p></div>';
    if(c.review)rows+=`<div class="compat-fact compat-review"><strong>Source disagreement</strong><p>${esc(c.review.note)} ${source(c.review.source)} <a href="${esc(c.review.modelSource)}" target="_blank" rel="noopener noreferrer">Exact model specification ↗</a></p></div>`;
    return `<section class="compat-detail"><h3>Upgrade eligibility</h3><p class="muted">Model compatibility is separate from upgrades installed on your vehicle. Checked ${esc(data.checked)}.</p>${rows}</section>`;
  }
  const api={get,matches,badges,detail,installedKeys,supports,filters,ready:null};
  api.ready=fetch('compatibility.json?v=20261103').then(r=>{if(!r.ok)throw Error('Compatibility data unavailable');return r.json()}).then(value=>{data=value;global.dispatchEvent?.(new Event('atlas:compatibility-ready'));return api}).catch(()=>{failure=true;global.dispatchEvent?.(new Event('atlas:compatibility-ready'));return api});
  global.AtlasCompatibility=api;
})(window);
