<!-- ============================= /site.js ============================== -->
// Footer years + nav active
(function(){
  ['y','y2','y3','y4'].forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=new Date().getFullYear();});
  const here=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href.endsWith(here)) a.classList.add('active');
    if(here==='index.html' && href==='./') a.classList.add('active');
  });
})();


// === Sticky CTA inject + year/nav active ===
(function(){
  ['y','y2','y3','y4','y5'].forEach(id=>{const el=document.getElementById(id); if(el) el.textContent=new Date().getFullYear();});
  const here=(location.pathname.split('/').pop()||'index.html');
  document.querySelectorAll('.nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href.endsWith(here)) a.classList.add('active');
    if(here==='index.html' && href==='./') a.classList.add('active');
  });


  if(!document.querySelector('.cta-bar')){
    const contact = { email: 'hello@example.com', label: 'Get in touch' }; // TODO: set your email
    const root = document.createElement('div');
    root.className = 'cta-bar';
    root.innerHTML = `
      <div class="cta-inner">
        <p>Have a project in mind? Let’s make it happen.</p>
        <a class="cta-btn" href="mailto:${contact.email}">${contact.label}</a>
      </div>`;
  document.body.appendChild(root);
  }
})();
