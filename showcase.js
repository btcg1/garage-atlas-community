(()=>{'use strict';
const slides=[{"id": "eurosx32", "name": "Euros X32", "make": "Annis", "image": "assets/vehicles/eurosx32.webp", "hsw": true, "class": "Coupes"}, {"id": "krieger", "name": "Krieger", "make": "Benefactor", "image": "assets/vehicles/krieger.webp", "hsw": false, "class": "Supers"}, {"id": "comet6", "name": "Comet S2", "make": "Pfister", "image": "assets/vehicles/comet6.webp", "hsw": false, "class": "Sports"}, {"id": "dominator10", "name": "Dominator FX", "make": "Vapid", "image": "assets/vehicles/dominator10.webp", "hsw": false, "class": "Muscle"}, {"id": "turismo2", "name": "Turismo Classic", "make": "Grotti", "image": "assets/vehicles/turismo2.webp", "hsw": true, "class": "Sports Classics"}, {"id": "elegy2", "name": "Elegy RH8", "make": "Annis", "image": "assets/vehicles/elegy2.webp", "hsw": false, "class": "Sports"}];
const root=document.getElementById('vehicle-showcase');
if(!root)return;
const img=root.querySelector('img'),make=root.querySelector('.feature-bottom small'),name=root.querySelector('h2'),badge=root.querySelector('.feature-hsw'),count=document.getElementById('showcase-count'),pause=document.getElementById('showcase-pause');
let index=0,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches,timer;
function pauseLabel(){pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',paused?'Play showcase':'Pause showcase');}
function show(next){index=(next+slides.length)%slides.length;const car=slides[index];img.src=car.image;img.alt='Stock '+[car.make,car.name].filter(Boolean).join(' ');make.textContent=car.make||'GTA ONLINE';name.textContent=car.name;root.dataset.model=car.id==='eurosx32'?'X32':car.name.toUpperCase();badge.textContent=car.hsw?'HSW AVAILABLE ↗':car.class;count.textContent=(index+1)+' / '+slides.length;root.setAttribute('aria-label','Featured vehicles, '+car.name+', '+(index+1)+' of '+slides.length);}
function restart(){clearInterval(timer);timer=setInterval(()=>{if(!paused&&!document.hidden&&root.offsetParent&&!root.matches(':hover')&&!root.contains(document.activeElement))show(index+1);},6000);}
document.getElementById('showcase-prev').addEventListener('click',()=>{show(index-1);restart();});
document.getElementById('showcase-next').addEventListener('click',()=>{show(index+1);restart();});
pause.addEventListener('click',()=>{paused=!paused;pauseLabel();restart();});
root.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(index+(event.key==='ArrowLeft'?-1:1));restart();}});
show(0);pauseLabel();restart();
})();
