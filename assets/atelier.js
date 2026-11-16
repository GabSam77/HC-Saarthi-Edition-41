/* Progressive enhancement only: calculations, events and content remain native. */
(()=>{'use strict';
const app=document.getElementById('app');if(!app)return;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
const paths={overview:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',assets:'M3 21V7l8-4v18M11 10h10v11M6 9h2M6 13h2M6 17h2M15 13h2M15 17h2M2 21h20',cash:'M3 4v16h18M6 15l4-5 4 3 6-8',scenarios:'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',risk:'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM12 8v5M12 16h.01'};
let queued=false,lastView='',pointerFrame=0;const seen=new WeakSet();
function decorate(){queued=false;
 app.querySelectorAll('.cio-tab').forEach(el=>{if(el.querySelector('.atelier-tab-icon'))return;const d=paths[el.dataset.tab];if(!d)return;el.insertAdjacentHTML('afterbegin',`<svg class="atelier-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`);});
 app.querySelectorAll('.deal-symbol svg path,.deal-symbol svg rect').forEach(el=>{if(!el.hasAttribute('pathLength'))el.setAttribute('pathLength','1');});
 const current=app.dataset.page+':'+(app.querySelector('[data-cio-view]')?.dataset.cioView||'');
 const changed=current!==lastView;lastView=current;
 if(reduce.matches||typeof app.animate!=='function')return;
 if(changed){const head=app.querySelector('.cio-heading,.page-heading');head?.animate([{opacity:.35,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:550,easing:'cubic-bezier(.16,1,.3,1)'});}
 const nodes=app.querySelectorAll('.deal-entry,.service-group');let i=0;
 nodes.forEach(el=>{if(seen.has(el))return;seen.add(el);const box=el.getBoundingClientRect();if(box.top>innerHeight+100)return;el.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:620,delay:Math.min(i++*65,260),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});});
}
new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(decorate);}}).observe(app,{childList:true,subtree:true});
app.addEventListener('pointermove',ev=>{if(reduce.matches||!fine.matches||pointerFrame)return;const surface=ev.target.closest('.cio-capital-surface');if(!surface)return;pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!surface.isConnected)return;const r=surface.getBoundingClientRect();surface.style.setProperty('--light-x',((ev.clientX-r.left)/r.width*100)+'%');surface.style.setProperty('--light-y',((ev.clientY-r.top)/r.height*100)+'%');});},{passive:true});
reduce.addEventListener?.('change',()=>{if(reduce.matches)app.getAnimations?.({subtree:true}).forEach(a=>a.cancel());});
decorate();
})();
