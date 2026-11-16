/* HC Saarthi — invitation-only landing experience (prototype access only). */
(()=>{
'use strict';
const ROOT=document.getElementById('saarthi-public-root');
const ACCESS_KEY='saarthi-preview-access';
const DEMO_CODE='HCAL';
const featureGroups=[
 {name:'Intelligence & portfolio',rows:[['Research & market intelligence',1,1,1],['Property records & portfolio view',1,1,1],['Watchlists & alerts',1,1,1],['Portfolio analysis & tools',0,1,1],['Bespoke portfolio intelligence',0,0,1]]},
 {name:'Opportunities',rows:[['Standard opportunity access',1,1,1],['Curated opportunities',0,1,1],['Priority opportunity access',0,0,1]]},
 {name:'Advisory',rows:[['Standard property assessment',1,1,1],['Specialist advice',0,1,1],['Bespoke real estate strategy',0,0,1],['Land / development assessment',0,0,1],['Negotiation support',0,0,1]]},
 {name:'Services & execution',rows:[['Access to trusted specialists',1,1,1],['Coordinated specialist support',0,1,1],['End-to-end execution support',0,0,1]]},
 {name:'Relationship',rows:[['Digital / platform support',1,1,1],['Human relationship coverage',0,1,1],['Dedicated relationship lead',0,0,1],['On-demand / concierge support',0,0,1]]}
];
const tiers=[
 {name:'Saarthi',tag:'DIGITAL',sub:'Explore and manage',desc:'Digital access to research, property records, standard opportunities and specialist discovery.',benefits:['Research & market intelligence','Property records and watchlists','Standard opportunities','Digital support']},
 {name:'Saarthi Plus',tag:'DIGITAL + ASSISTED',sub:'Analyse and act',desc:'Portfolio analysis, curated opportunities and specialist guidance when you need it.',benefits:['Everything in Saarthi','Portfolio analysis tools','Curated opportunities','Specialist advice and coordination']},
 {name:'Saarthi Plus+',tag:'BESPOKE',sub:'One relationship. Full coordination.',desc:'Bespoke intelligence, priority access and dedicated support for complex portfolios.',benefits:['Everything in Saarthi Plus','Bespoke strategy and land assessment','Priority opportunities','Dedicated lead and execution support']}
];
const capitalSlides=[
 {tag:'01 / REAL ESTATE NETWORK',heading:'Close to the market. Across India.',image:'hdfc-capital-development.webp',alt:'Illustrative Indian residential development',eyebrow:'DEVELOPER RELATIONSHIPS',items:[
  ['Established relationships','The HDFC ecosystem has built long-standing relationships with developers across India.'],
  ['A view of actual performance','Project-level investing provides experience of how developers manage construction, sales and collections.'],
  ['Why this matters','Saarthi can draw on this experience to bring more informed perspectives to clients’ real estate decisions.']
 ]},
 {tag:'02 / INSTITUTIONAL EXPERIENCE',heading:'Real estate investing experience across market cycles.',image:'office.png',alt:'Illustrative institutional architecture',eyebrow:'HDFC CAPITAL & THE HDFC BANK GROUP',items:[
  ['Specialist real estate platform','HDFC Capital is part of the HDFC Bank Group and focuses on real estate investment management.'],
  ['Experience through changing markets','The investment team’s history spans the global financial crisis, sector reforms and subsequent market cycles.'],
  ['A foundation for Saarthi','The aim is to bring that real estate knowledge together with portfolio tools, opportunities and specialist services.']
 ]}
];
let capitalSlideIndex=0;
let groupIndex=0,selectedTier=1;
// Manual-only comparison: no timers, observers or auto-advance.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function setGroup(index){
 groupIndex=(index+featureGroups.length)%featureGroups.length;
 const region=ROOT.querySelector('#lp-matrix-region');if(!region)return;
 region.innerHTML=matrix();
 region.classList.remove('lp-slide-enter');
 if(!reducedMotion.matches){void region.offsetWidth;region.classList.add('lp-slide-enter')}
 ROOT.querySelectorAll('[data-group]').forEach(b=>{
  const active=Number(b.dataset.group)===groupIndex;
  b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;
 });
 const counter=ROOT.querySelector('#lp-slide-count');
 if(counter)counter.textContent=String(groupIndex+1).padStart(2,'0')+' / '+String(featureGroups.length).padStart(2,'0');
 const next=ROOT.querySelector('#lp-slide-next');
 if(next)next.textContent='NEXT  '+featureGroups[(groupIndex+1)%featureGroups.length].name;
 ROOT.querySelector(`[data-group="${groupIndex}"]`)?.scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'nearest',inline:'center'});
}

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const check=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 6"/></svg>`;
const cross=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`;
const arr=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"/></svg>`;
function hasAccess(){try{return !!sessionStorage.getItem(ACCESS_KEY)}catch{return false}}
function onHome(){return location.hash==='#home'||location.hash===''}
function tierCards(){return tiers.map((t,i)=>`<button type="button" class="tier-card ${i===2?'tier-dark':''} ${i===selectedTier?'tier-picked':''}" data-tier="${i}" aria-pressed="${i===selectedTier}"><span class="tier-top"><span class="tier-index">0${i+1} / 03</span><span class="tier-tag">${t.tag}</span></span><span class="tier-card-body"><strong>${t.name}</strong><em>${t.sub}</em><span class="tier-description">${t.desc}</span></span><span class="tier-benefits">${t.benefits.map(b=>`<span>${check}${b}</span>`).join('')}</span><span class="tier-foot">Explore benefits ${arr}</span></button>`).join('')}
function matrix(){const g=featureGroups[groupIndex];return `<div class="matrix-heading"><div><span class="lp-eyebrow">SERVICE COMPARISON</span><h3>${g.name}</h3></div><span>Included in each tier</span></div><div class="matrix-scroll" role="region" aria-label="Feature availability across Saarthi tiers" tabindex="0"><table class="lp-matrix"><thead><tr><th scope="col">Capability</th>${tiers.map((t,i)=>`<th scope="col" class="${selectedTier===i?'matrix-active':''}">${t.name}</th>`).join('')}</tr></thead><tbody>${g.rows.map(r=>`<tr><th scope="row">${r[0]}</th>${r.slice(1).map((v,i)=>`<td class="${selectedTier===i?'matrix-active':''}"><span class="matrix-state ${v?'included':'excluded'}" aria-label="${v?'Included':'Not included'}">${v?check:cross}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="matrix-disclaimer">Illustrative service architecture, subject to final product and client eligibility approvals.</p>`}
function capitalSlide(){
 const c=capitalSlides[capitalSlideIndex];
 return `<div class="lp-proof-image"><img src="assets/${c.image}" loading="lazy" alt="${c.alt}"><span>INDIA'S REAL ESTATE LANDSCAPE <small>ILLUSTRATIVE IMAGE</small></span></div>
 <div class="lp-proof-insights"><span class="lp-proof-overline">${c.eyebrow}</span><h3>${c.heading}</h3><div class="lp-proof-steps">${c.items.map((item,i)=>`<div><span>0${i+1}</span><div><strong>${item[0]}</strong><p>${item[1]}</p></div></div>`).join('')}</div></div>`;
}
function capitalCarousel(){return `<div class="lp-capital-carousel" role="region" aria-roledescription="carousel" aria-label="HDFC Capital capabilities" tabindex="0">
 <div class="lp-proof-feature" id="lp-capital-slide" aria-live="polite" aria-atomic="true">${capitalSlide()}</div>
 <button type="button" class="lp-capital-arrow lp-capital-prev" data-capital-prev aria-label="Previous HDFC Capital capability"><span aria-hidden="true">&#8592;</span></button>
 <button type="button" class="lp-capital-arrow lp-capital-next" data-capital-next aria-label="Next HDFC Capital capability"><span aria-hidden="true">&#8594;</span></button>
 <div class="lp-capital-controls"><span class="lp-capital-counter" id="lp-capital-counter">01 <span>/</span> 02</span><div class="lp-capital-dots" aria-label="Select HDFC Capital capability">${capitalSlides.map((c,i)=>`<button type="button" data-capital-slide="${i}" class="${i===capitalSlideIndex?'active':''}" aria-label="Slide ${i+1}: ${c.eyebrow.toLowerCase()}" aria-current="${i===capitalSlideIndex?'true':'false'}"></button>`).join('')}</div><span class="lp-capital-caption" id="lp-capital-caption">${capitalSlides[capitalSlideIndex].tag}</span></div>
 </div>`}
function setCapitalSlide(index){
 capitalSlideIndex=(index+capitalSlides.length)%capitalSlides.length;
 const frame=ROOT.querySelector('#lp-capital-slide');if(!frame)return;
 frame.innerHTML=capitalSlide();
 frame.classList.remove('lp-capital-enter');
 if(!reducedMotion.matches){void frame.offsetWidth;frame.classList.add('lp-capital-enter')}
 const counter=ROOT.querySelector('#lp-capital-counter');if(counter)counter.innerHTML=String(capitalSlideIndex+1).padStart(2,'0')+' <span>/</span> '+String(capitalSlides.length).padStart(2,'0');
 const caption=ROOT.querySelector('#lp-capital-caption');if(caption)caption.textContent=capitalSlides[capitalSlideIndex].tag;
 ROOT.querySelectorAll('[data-capital-slide]').forEach(b=>{const active=Number(b.dataset.capitalSlide)===capitalSlideIndex;b.classList.toggle('active',active);b.setAttribute('aria-current',String(active))});
}
function publicHTML(){return `<div class="lp-site lp37-site"><main id="lp-main">
<section class="lp-hero lp37-hero"><div class="lp-hero-copy"><div class="lp-overline"><span class="lp-red-dot"></span> HDFC CAPITAL / SAARTHI</div><h1>Your trusted guide to<br><span>real estate wealth.</span></h1><p>Understand your real estate portfolio, make more informed decisions, discover relevant opportunities and coordinate the services your properties need.</p><div class="lp-hero-note"><span class="lp-hero-line"></span><span>A connected real estate platform for business families and family offices</span></div></div><div class="lp-hero-visual"><img src="assets/saarthi-hero-india.webp" alt="Illustrative Indian city architecture"></div></section>
<section class="lp37-about" id="about"><div class="lp37-about-image"><img src="assets/hdfc-capital-development.webp" alt="Illustrative residential real estate development"></div><div class="lp37-about-copy"><span class="lp-eyebrow">ABOUT HDFC CAPITAL</span><h2>Institutional capital. A commitment to housing.</h2><p>HDFC Capital Advisors Limited, a subsidiary of HDFC Bank, is a real estate private equity investment manager focused on affordable and mid-income housing in India. Through the funds it manages, HDFC Capital provides long-term debt and equity capital to established developers, combining flexible financing with partnerships, active asset management and a focus on sustainable development. Its ambition is to help expand India's housing supply by bringing together capital, sector expertise and innovation.</p><a class="lp37-link" href="https://hdfccapital.com/" target="_blank" rel="noopener noreferrer">Know more about HDFC Capital <span aria-hidden="true">↗</span></a></div></section>
<section class="lp37-why" id="why"><div class="lp37-section-intro"><span class="lp-eyebrow">WHY SAARTHI</span><h2>One connected view of your real estate world.</h2><p>Real estate ownership is rarely a single transaction. Saarthi brings together the information, opportunities and execution support needed across the life of an asset.</p></div>
<article class="lp37-feature"><div class="lp39-viz lp39-portfolio"><div class="lp39-kicker"><span>01 / PORTFOLIO</span></div><div class="lp39-portfolio-top"><div><strong>One portfolio.<br>Full perspective.</strong></div></div><div class="lp39-chart"><div class="lp39-chart-title">ASSET MIX <span>ILLUSTRATIVE</span></div><div class="lp39-stacked"><i></i><i></i><i></i><i></i></div><div class="lp39-legend"><span>● Residential</span><span>● Commercial</span><span>● Land</span><span>● Other</span></div></div><div class="lp39-mini-row"><div><span>↗</span><b>Returns</b><small>Track performance</small></div><div><span>◎</span><b>Risk</b><small>See concentration</small></div><div><span>▤</span><b>Documents</b><small>One digital locker</small></div></div><div class="lp39-bottom">RETURNS · RISK · RECORDS <span>↗</span></div></div><div class="lp37-feature-copy"><span class="lp-eyebrow">01 / MY PORTFOLIO</span><h3>Know what you own. Understand what it means.</h3><p>See your properties, returns, risks and records together. Understand where your wealth sits—and which assets need attention.</p><a href="#portfolio" class="lp37-link">Explore My Portfolio <span>↗</span></a></div></article>
<article class="lp37-feature lp37-reverse"><div class="lp39-viz lp39-research"><div class="lp39-kicker"><span>02 / RESEARCH</span></div><div class="lp39-research-map"><div class="lp39-map-grid"></div><div class="lp39-map-route"></div><i class="lp39-pin pin-a"></i><i class="lp39-pin pin-b"></i><i class="lp39-pin pin-c"></i><i class="lp39-pin pin-d"></i><div class="lp39-map-insight"><small>LOCATION INTELLIGENCE</small><strong>Know the neighbourhood.</strong></div></div><div class="lp39-bottom">LOCATION · CONTEXT · INSIGHT <span>↗</span></div></div><div class="lp37-feature-copy"><span class="lp-eyebrow">02 / RESEARCH & INTELLIGENCE</span><h3>See the market beyond the headline.</h3><p>Explore cities and micro-markets through location-led research, infrastructure trends and the forces shaping demand.</p><a href="#research" class="lp37-link">Explore Research & Intelligence <span>↗</span></a></div></article>
<article class="lp37-feature"><div class="lp39-viz lp39-opportunities"><div class="lp39-kicker"><span>03 / OPPORTUNITIES</span></div><div class="lp39-op-grid"><div class="lp39-op-large"><img src="assets/architecture.jpg" alt="Illustrative commercial architecture"><div><strong>Real estate,<br>more ways in.</strong></div></div><div class="lp39-op-small"><img src="assets/hdfc-capital-development.webp" alt="Illustrative residential development"><span>UPCOMING PROJECTS</span></div><div class="lp39-op-small"><img src="assets/research3.jpg" alt="Illustrative land and development landscape"><span>LAND</span></div></div><div class="lp39-bottom">PROJECTS · LAND · CO-INVESTMENTS <span>↗</span></div></div><div class="lp37-feature-copy"><span class="lp-eyebrow">03 / OPPORTUNITIES</span><h3>Discover opportunities with greater context.</h3><p>Discover projects, land, income assets and co-investments through a curated, clearly organised view.</p><a href="#opportunities" class="lp37-link">Explore Opportunities <span>↗</span></a></div></article>
<article class="lp37-feature lp37-reverse"><div class="lp39-viz lp39-services"><div class="lp39-kicker"><span>04 / SERVICES</span></div><div class="lp39-service-title"><strong>From request<br>to resolution.</strong></div><div class="lp39-service-card"><div class="lp39-service-card-head"><span class="lp39-svc-icon">⌂</span><div><b>Title documentation</b><small>In specialist review</small></div><em>IN PROGRESS</em></div><div class="lp39-progress"><span></span></div><div class="lp39-progress-label"><span>REQUEST RECEIVED</span><span>SPECIALIST REVIEW</span><span>COMPLETION</span></div></div><div class="lp39-bottom">SERVICES · STATUS · FOLLOW-THROUGH <span>↗</span></div></div><div class="lp37-feature-copy"><span class="lp-eyebrow">04 / SERVICES</span><h3>From a decision to the work that follows.</h3><p>From title checks to valuations and property management, request specialist support against an asset and follow its progress in one place.</p><a href="#services" class="lp37-link">Explore Services <span>↗</span></a></div></article></section>
<section class="lp-membership lp37-membership" id="membership"><div class="lp-section-head lp-tier-head"><div><span class="lp-eyebrow">MEMBERSHIP BENEFITS</span><h2>Support shaped around your needs.</h2></div><p>Explore how the proposed Saarthi membership levels differ in intelligence, opportunity access and specialist support.</p></div><div class="lp-comparison" id="lp-comparison"><div class="lp-compare-top"><div><span class="lp-eyebrow">WHAT'S INCLUDED</span><h2>Explore the benefits.</h2></div><span class="lp-compare-hint">Five categories. Select a topic or use the arrows to compare.</span></div><div class="lp-group-tabs" role="tablist" aria-label="Compare benefit categories">${featureGroups.map((g,i)=>`<button type="button" role="tab" aria-selected="${i===groupIndex}" tabindex="${i===groupIndex?'0':'-1'}" class="${i===groupIndex?'active':''}" data-group="${i}">${g.name}</button>`).join('')}</div><div class="lp-compare-stage" id="lp-compare-stage"><div class="lp-slide-toolbar"><div class="lp-slide-meta"><span id="lp-slide-mode">BROWSE BENEFITS</span><strong id="lp-slide-count">01 / 05</strong><span id="lp-slide-next">NEXT  Opportunities</span></div><div class="lp-slide-actions"><button type="button" data-slide-prev aria-label="Previous benefit category" title="Previous category">&#8592;</button><button type="button" data-slide-next aria-label="Next benefit category" title="Next category">&#8594;</button></div></div><div id="lp-matrix-region" aria-live="off">${matrix()}</div></div></div></section>
</main><section class="sh34-disclosures" aria-label="Important legal and platform disclosures">
  <div class="sh34-head"><div><span class="sh34-eyebrow">IMPORTANT INFORMATION</span><h2>Disclosures &amp; important notices</h2></div><span class="sh34-status">PRIVATE PLATFORM PREVIEW</span></div>
  <p class="sh34-lead">Saarthi is a concept-stage demonstration associated with HDFC Capital Advisors Limited (HCAL). Content is provided solely to illustrate a proposed platform experience. It is not an offer, invitation, recommendation or commitment to undertake any investment or provide any service.</p>
  <div class="sh34-keypoints"><span>Not an offer or solicitation</span><span>No investment advice</span><span>Illustrative data and opportunities</span><span>No guaranteed outcomes</span></div>
  <details class="sh34-details"><summary><span>Read the full important disclosures</span><span class="sh34-plus" aria-hidden="true"></span></summary>
    <div class="sh34-detail-grid">
      <div><h3>1. Purpose &amp; status</h3><p>This website is a prototype for discussion with selected audiences. Features, membership tiers, eligibility, pricing, service scope and operating arrangements are indicative and subject to internal, legal, compliance and regulatory approvals. No client, advisory, fiduciary or contractual relationship is created by accessing this preview.</p></div>
      <div><h3>2. Investments &amp; risk</h3><p>Opportunity listings, transaction terms, yields, IRRs, valuations, forecasts and other investment information may be fictional or illustrative. They are not verified offers, allocations or assurances of availability. Real estate and securities investments involve risk, including loss of capital and illiquidity. Past performance does not predict future results.</p></div>
      <div><h3>3. No professional advice</h3><p>Research, analytics, portfolio risk indicators and other information are general illustrations only. They are not investment, legal, tax, accounting, valuation or other professional advice and should not be relied upon to make decisions. Independent due diligence and advice from appropriately qualified professionals are required.</p></div>
      <div><h3>4. Third parties &amp; services</h3><p>Developer names, project links and third-party references are for illustration or discovery only. They do not imply endorsement, verified inventory or a partnership. Service requests are simulated; no instruction, order, engagement, booking or communication is transmitted to HCAL or any third party through this preview.</p></div>
      <div><h3>5. Data, documents &amp; security</h3><p>Sample properties, portfolio values, service tickets and documents are demonstration records. This prototype uses browser-based access and storage and is not a production-grade secure client portal or document vault. Do not enter or upload personal, confidential, financial, title or other sensitive information.</p></div>
      <div><h3>6. Accuracy, group entities &amp; limitations</h3><p>Information, including historical statistics and statements about HCAL or the HDFC Bank Group, is subject to source dates, definitions, verification and change without notice. References to the HDFC Bank Group do not imply any guarantee by HDFC Bank or another group entity. HCAL and relevant group entities make no representation that this prototype is complete, accurate, available or suitable for any purpose, to the extent permitted by applicable law.</p></div>
    </div>
    <p class="sh34-legal-note">Any future live platform, investment or service offering would be governed solely by its applicable definitive documentation, disclosures, eligibility criteria, contractual terms and regulatory requirements. This text is draft website disclosure language and requires HCAL Legal &amp; Compliance approval before external publication.</p>
  </details>
</section>
<footer class="lp-footer"><span>HDFC CAPITAL <span class="lp-footer-divider">/</span> SAARTHI</span><span>Private platform preview · Features and tiers illustrative</span><span>© ${new Date().getFullYear()} · Saarthi</span></footer></div>`}
function sync(){const home=onHome();document.documentElement.classList.toggle('saarthi-public',home);if(home){if(!ROOT.innerHTML)ROOT.innerHTML=publicHTML()}else{ROOT.innerHTML=''}const signout=document.getElementById('saarthi-signout');if(signout)signout.hidden=true;}
function openLogin(){if(true){location.hash='#portfolio';sync();return;}const modal=ROOT.querySelector('#lp-login-overlay');if(!modal)return;modal.hidden=false;document.body.classList.add('lp-modal-open');modal.querySelector('input').focus();}
function closeLogin(){const modal=ROOT.querySelector('#lp-login-overlay');if(modal)modal.hidden=true;document.body.classList.remove('lp-modal-open')}
function openMembership(){const modal=ROOT.querySelector('#lp-membership-overlay');if(!modal)return;modal.hidden=false;const form=modal.querySelector('#lp-membership-form');form.hidden=false;modal.querySelector('#lp-membership-confirm').hidden=true;form.elements.tier.value=tiers[selectedTier].name;document.body.classList.add('lp-modal-open');form.elements.name.focus()}
function closeMembership(){const modal=ROOT.querySelector('#lp-membership-overlay');if(modal)modal.hidden=true;document.body.classList.remove('lp-modal-open')}

ROOT.addEventListener('click',e=>{const anchor=e.target.closest('.lp-nav a[href^="#"],.lp-secondary[href^="#"]');if(anchor){const target=ROOT.querySelector(anchor.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});return}}const membership=e.target.closest('[data-open-membership]');if(membership){openMembership();return}if(e.target.closest('[data-close-membership]')){closeMembership();return}const login=e.target.closest('[data-open-login]');if(login){openLogin();return}if(e.target.closest('[data-close-login]')){closeLogin();return}const tier=e.target.closest('[data-tier]');if(tier){
 selectedTier=Number(tier.dataset.tier);
 ROOT.querySelector('.lp-tier-grid').innerHTML=tierCards();
 setGroup(0);
 ROOT.querySelector('#lp-comparison')?.scrollIntoView({behavior:reducedMotion.matches?'auto':'smooth',block:'start'});
 return;
}
if(e.target.closest('[data-capital-prev]')){setCapitalSlide(capitalSlideIndex-1);return}
if(e.target.closest('[data-capital-next]')){setCapitalSlide(capitalSlideIndex+1);return}
const capitalDot=e.target.closest('[data-capital-slide]');if(capitalDot){setCapitalSlide(Number(capitalDot.dataset.capitalSlide));return}
if(e.target.closest('[data-slide-prev]')){setGroup(groupIndex-1);return}
if(e.target.closest('[data-slide-next]')){setGroup(groupIndex+1);return}

const group=e.target.closest('[data-group]');if(group){setGroup(Number(group.dataset.group));return}});
ROOT.addEventListener('submit',e=>{if(e.target.id!=='lp-membership-form')return;e.preventDefault();const f=e.target;const record={name:f.elements.name.value.trim(),email:f.elements.email.value.trim(),tier:f.elements.tier.value,notes:f.elements.notes.value.trim(),created:new Date().toISOString(),preview:true};if(!record.name||!f.elements.email.checkValidity())return;try{const prior=JSON.parse(localStorage.getItem('hc-saarthi-membership-preview')||'[]');prior.push(record);localStorage.setItem('hc-saarthi-membership-preview',JSON.stringify(prior.slice(-20)))}catch{}f.hidden=true;ROOT.querySelector('#lp-membership-confirm').hidden=false;});
ROOT.addEventListener('submit',e=>{if(e.target.id!=='lp-login-form')return;e.preventDefault();const f=e.target;const email=f.elements.email.value.trim();const code=f.elements.code.value.trim();const error=ROOT.querySelector('#lp-login-error');if(!email||!f.elements.email.checkValidity()){error.textContent='Enter a valid email address.';return}if(code!==DEMO_CODE){error.textContent='Invitation code not recognised for this preview.';return}try{sessionStorage.setItem(ACCESS_KEY,email)}catch{error.textContent='This browser cannot maintain a preview session.';return}closeLogin();location.hash='#portfolio';sync();if(typeof window.render==='function')window.render();});
window.addEventListener('hashchange',sync);
document.addEventListener('click',e=>{if(e.target.id==='saarthi-signout'){try{sessionStorage.removeItem(ACCESS_KEY)}catch{}location.hash='#home';ROOT.innerHTML='';sync();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLogin();closeMembership();}if(e.target.closest?.('.lp-capital-carousel')&&['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();setCapitalSlide(capitalSlideIndex+(e.key==='ArrowRight'?1:-1));return}const tab=e.target.closest?.('[data-group]');if(tab&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?featureGroups.length-1:groupIndex+(e.key==='ArrowRight'?1:-1);setGroup(next);ROOT.querySelector(`[data-group="${groupIndex}"]`)?.focus()}});
let capitalTouchStart=null;
ROOT.addEventListener('touchstart',e=>{if(e.target.closest('.lp-capital-carousel'))capitalTouchStart={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
ROOT.addEventListener('touchend',e=>{if(!capitalTouchStart)return;const end=e.changedTouches[0];const dx=end.clientX-capitalTouchStart.x,dy=end.clientY-capitalTouchStart.y;capitalTouchStart=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.3)setCapitalSlide(capitalSlideIndex+(dx<0?1:-1));},{passive:true});
sync();
})();
