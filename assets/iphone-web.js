(() => {
 const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
 const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
 if (ios && !standalone()) {
   const button = document.createElement('button');
   button.className = 'iphone-install'; button.textContent = 'Add Saarthi to your iPhone';
   button.addEventListener('click', () => modal(`<div class="eyebrow">HC Saarthi on your iPhone</div><h2>Your desk. One tap away.</h2><ol><li>Open this page in Safari.</li><li>Tap Share, then Add to Home Screen.</li><li>Keep Open as Web App switched on, if shown, and tap Add.</li></ol><p>Open the Saarthi icon from your Home Screen. An internet connection is required.</p><p class="disclosure">This is an interactive concept preview. Data and requests are illustrative; portfolio inputs remain in the current session.</p>`));
   document.querySelector('header').insertAdjacentElement('afterend',button);
 }
 // Restore the selected screen when Safari's Back gesture changes the hash.
 addEventListener('popstate', () => {
   const target = location.hash.slice(1) || 'home';
   if (['home','research','opportunities','portfolio','services'].includes(target)) {
     document.querySelector('dialog[open]')?.close(); page = target; render(); scrollTo(0,0);
   }
 });
})();
