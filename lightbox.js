<!-- ============================ /lightbox.js =========================== -->
(function(){
  let items=[], index=0;
  const root=document.createElement('div'); root.className='lb-backdrop';
  root.innerHTML=`
    <div class="lb-inner" role="dialog" aria-modal="true">
      <div class="lb-media"><img id="lb-img" alt=""></div>
      <div class="lb-meta">
        <div class="lb-left"><div id="lb-title" class="lb-title"></div><div id="lb-caption" class="lb-caption"></div></div>
        <div class="lb-controls"><button class="lb-btn" data-act="prev" aria-label="Previous">←</button><button class="lb-btn" data-act="next" aria-label="Next">→</button><a class="lb-btn" id="lb-dl" download>Download</a></div>
      </div>
      <button class="lb-btn lb-x" data-act="close" aria-label="Close">✕</button>
    </div>`;
  document.body.appendChild(root);
  const img=root.querySelector('#lb-img'), t=root.querySelector('#lb-title'), c=root.querySelector('#lb-caption'), dl=root.querySelector('#lb-dl');
  function show(i){ index=(i+items.length)%items.length; const it=items[index]; const pre=new Image(); pre.src=items[(index+1)%items.length]?.srcLarge||it.srcLarge; img.src=it.srcLarge; t.textContent=it.title||''; c.textContent=it.caption||''; dl.href=it.srcLarge; }
  function onKey(e){ if(e.key==='Escape') close(); if(e.key==='ArrowRight') show(index+1); if(e.key==='ArrowLeft') show(index-1); }
  function open({items:arr,index:i=0}){ items=arr||[]; index=i; if(!items.length) return; show(index); root.classList.add('open'); document.addEventListener('keydown',onKey); }
  function close(){ root.classList.remove('open'); document.removeEventListener('keydown',onKey); img.src=''; }
  root.addEventListener('click',(e)=>{ const act=e.target.getAttribute('data-act'); if(act==='close') return close(); if(act==='next') return show(index+1); if(act==='prev') return show(index-1); if(e.target===root) return close(); });
  let sx=0,sy=0; root.addEventListener('pointerdown',(e)=>{sx=e.clientX;sy=e.clientY;root.setPointerCapture(e.pointerId);});
  root.addEventListener('pointerup',(e)=>{const dx=e.clientX-sx,dy=e.clientY-sy; if(Math.abs(dx)>40 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) show(index+1); else show(index-1);} });
  window.Lightbox={open,close};
})();
// === Web Share + basic focus handling ===
(function(){
  if(!window.Lightbox) return; // use existing implementation
  const originalOpen = window.Lightbox.open;
  const originalClose = window.Lightbox.close;
  let prevFocus = null;

  window.Lightbox.open = function(args){
    prevFocus = document.activeElement;
    originalOpen(args);
    const dialog = document.querySelector('.lb-inner');
    const closeBtn = document.querySelector('.lb-x');
    if(closeBtn) closeBtn.focus();
    // Add share button if supported
    const controls = document.querySelector('.lb-controls');
    if(controls && !document.getElementById('lb-share')){
      const btn = document.createElement('button');
      btn.className = 'lb-btn'; btn.id = 'lb-share'; btn.textContent = 'Share';
      btn.addEventListener('click', ()=>{
        try{
          const img = document.getElementById('lb-img');
          const title = document.getElementById('lb-title')?.textContent||'Photo';
          const url = img?.src || location.href;
          if(navigator.share){ navigator.share({title, url}).catch(()=>{}); }
        }catch(e){}
      });
      controls.appendChild(btn);
    }
    // Focus trap (very light)
    function onKey(e){
      if(e.key!=='Tab') return; const f = dialog.querySelectorAll('a,button'); if(!f.length) return;
      const first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
    dialog && dialog.addEventListener('keydown', onKey);
  };

  window.Lightbox.close = function(){
    originalClose();
    if(prevFocus && document.body.contains(prevFocus)) prevFocus.focus();
  };
})();

