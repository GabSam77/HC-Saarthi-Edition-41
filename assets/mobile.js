(()=>{
 const items=[['home','Home','M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9'],['portfolio','My Portfolio','M3 7h18v14H3zM8 7V3h8v4M3 12h18M10 12v3h4v-3'],['research','Research','M4 3h12v18H4zM16 7h4v14h-4M7 7h6M7 11h6M7 15h6'],['opportunities','Opportunities','M3 21h18M5 21V9h6v12M11 21V3h8v18M8 12v1M8 16v1M14 7h2M14 11h2M14 15h2'],['services','Services','M12 3v3M4.2 6.2l2.1 2.1M2 14h20M5 14a7 7 0 0 1 14 0M4 18h16M3 21h18M19.8 6.2l-2.1 2.1']];
 const nav=document.createElement('nav');nav.className='mobile-navigation';nav.setAttribute('aria-label','Mobile navigation');
 nav.innerHTML=items.map(([id,label,path])=>`<a href="#${id}" data-page="${id}" aria-label="${id==='opportunities'?'Opportunities':label}"><svg class="mobile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg><span>${label}</span></a>`).join('');
 document.body.append(nav);
 const desktop=document.querySelector('header nav');const mq=matchMedia('(max-width:820px)');
 function active(){let current=location.hash.slice(1)||'home';document.querySelectorAll('nav a[data-page]').forEach(a=>{a.classList.toggle('active',a.dataset.page===current);if(a.dataset.page===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});document.title=document.title.replace(/^SAARTHI/,'HC Saarthi')}
 function layout(){desktop.style.display=mq.matches?'none':'';nav.hidden=!mq.matches;active()}
 mq.addEventListener('change',layout);addEventListener('hashchange',()=>{active();window.scrollTo(0,0)});layout();
 const tagTables=()=>document.querySelectorAll('.pr-table-wrap').forEach(el=>{el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label','Portfolio table. Scroll horizontally to see all columns.')});
 new MutationObserver(()=>{tagTables();active()}).observe(document.querySelector('#app'),{childList:true});tagTables();
})();
