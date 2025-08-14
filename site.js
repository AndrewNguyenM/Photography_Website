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
