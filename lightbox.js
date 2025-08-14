<!-- ======================================================================
/lightbox.js
Full-screen image viewer with keyboard + swipe
====================================================================== -->
<script>
  const Lightbox = (() => {
    let items = [];
    let index = 0;

    // Elements
    const root = document.createElement('div');
    root.className = 'lb-backdrop';
    root.innerHTML = `
      <div class="lb-inner" role="dialog" aria-modal="true">
        <div class="lb-media"><img id="lb-img" alt="" /></div>
        <div class="lb-meta">
          <div class="lb-left">
            <div id="lb-title" class="lb-title"></div>
            <div id="lb-caption" class="lb-caption"></div>
          </div>
          <div class="lb-controls">
            <button class="lb-btn" data-act="prev" aria-label="Previous (←)">←</button>
            <button class="lb-btn" data-act="next" aria-label="Next (→)">→</button>
            <a class="lb-btn" id="lb-dl" download>Download</a>
          </div>
        </div>
        <button class="lb-btn lb-x" data-act="close" aria-label="Close (Esc)">✕</button>
      </div>`;
    document.body.appendChild(root);
    const img = root.querySelector('#lb-img');
    const tEl = root.querySelector('#lb-title');
    const cEl = root.querySelector('#lb-caption');
    const dlEl = root.querySelector('#lb-dl');

    function show(i){
      index = (i + items.length) % items.length;
      const it = items[index];
      // Preload next for snappy nav
      const next = new Image(); next.src = items[(index+1)%items.length].srcLarge;
      img.src = it.srcLarge;
      tEl.textContent = it.title || '';
      cEl.textContent = it.caption || '';
      dlEl.href = it.srcLarge;
    }

    function open({items:arr,index:i=0}){
      items = arr; index = i;
      show(index);
      root.classList.add('open');
      document.addEventListener('keydown', onKey);
    }
    function close(){
      root.classList.remove('open');
      document.removeEventListener('keydown', onKey);
      img.src = '';
    }
    function onKey(e){
      if(e.key==='Escape') close();
      if(e.key==='ArrowRight') show(index+1);
      if(e.key==='ArrowLeft') show(index-1);
    }

    // Click actions
    root.addEventListener('click', (e)=>{
      const act = e.target.getAttribute('data-act');
      if (act === 'close') return close();
      if (act === 'next') return show(index+1);
      if (act === 'prev') return show(index-1);
      if (e.target === root) return close();
    });

    // Basic swipe
    let sx=0, sy=0;
    root.addEventListener('pointerdown',(e)=>{ sx=e.clientX; sy=e.clientY; root.setPointerCapture(e.pointerId); });
    root.addEventListener('pointerup',(e)=>{
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) show(index+1); else show(index-1);
      }
    });

    return { open, close };
  })();
</script>
