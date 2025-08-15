(function(){
  const TL = document.getElementById('timeline');
  const yearEl = document.getElementById('y5'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // ——— Helpers ———
  const toISO = (d)=> (d instanceof Date? d : new Date(d)).toISOString().slice(0,10);
  const midYear = (y)=> new Date(Number(y)||2000,5,15);
  const safeText = (s)=> (s==null? '' : String(s));

  // Build flat list of photos with back-references
  const items = [];
  (window.PROJECTS||[]).forEach(proj => {
    const photos = (window.PHOTOS||{})[proj.slug]||[];
    photos.forEach((ph, i) => {
      const date = ph.meta?.date || (proj.year ? toISO(midYear(proj.year)) : undefined);
      items.push({
        project: proj,
        photo: ph,
        idx: i,
        sortKey: date ? new Date(date).getTime() : (proj.year ? midYear(proj.year).getTime() : 0)
      });
    });
  });

  // Newest first
  items.sort((a,b)=> b.sortKey - a.sortKey);

  // Render timeline
  TL.innerHTML = items.map(({project, photo}, n)=>{
    const dateLabel = photo.meta?.date || (project.year? `${project.year}` : '');
    const sub = [project.title, project.location, project.year].filter(Boolean).join(' • ');
    return `
      <article class="tl-item" data-i="${n}">
        <div class="tl-time"><span class="tl-dot" aria-hidden="true"></span><span>${safeText(dateLabel)}</span></div>
        <button class="tl-card" data-i="${n}" aria-label="Open story for ${safeText(photo.title)||'photo'}">
          <div class="tl-media">
            <img src="${photo.srcSmall}" srcset="${photo.srcSmall} 800w, ${photo.srcLarge} 1600w" sizes="(max-width:700px) 100vw, 50vw" alt="${safeText(photo.title)}" loading="lazy" />
          </div>
          <div class="tl-meta">
            <div class="tl-title">${safeText(photo.title)||'Untitled'}</div>
            <div class="tl-sub">${safeText(sub)}</div>
          </div>
        </button>
      </article>`
  }).join('');

  // Reveal-on-scroll
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold: .18});
  TL.querySelectorAll('.tl-item').forEach(el=> io.observe(el));

  // ——— Split View Overlay ———
  const root = document.createElement('div');
  root.className = 'sv-backdrop';
  root.innerHTML = `
    <div class="sv-inner" role="dialog" aria-modal="true" aria-label="Photo details">
      <div class="sv-media"><img id="sv-img" alt="" /></div>
      <aside class="sv-pane">
        <div class="sv-head">
          <h2 id="sv-title"></h2>
          <a id="sv-proj" href="#"></a>
        </div>
        <div id="sv-story" class="sv-story"></div>
        <dl class="sv-meta" id="sv-meta"></dl>
        <div class="sv-controls">
          <div>
            <button class="sv-btn" data-act="prev" aria-label="Previous">← Prev</button>
            <button class="sv-btn" data-act="next" aria-label="Next">Next →</button>
          </div>
          <div>
            <a class="sv-btn" id="sv-dl" download>Download</a>
            <button class="sv-btn sv-x" data-act="close" aria-label="Close">✕</button>
          </div>
        </div>
      </aside>
    </div>`;
  document.body.appendChild(root);

  const IMG = root.querySelector('#sv-img');
  const T  = root.querySelector('#sv-title');
  const P  = root.querySelector('#sv-proj');
  const S  = root.querySelector('#sv-story');
  const M  = root.querySelector('#sv-meta');
  const DL = root.querySelector('#sv-dl');

  let index = 0; // current index within items

  function fill(i){
    index = (i + items.length) % items.length;
    const {project, photo} = items[index];
    // Preload next
    const nxt = new Image(); nxt.src = (items[(index+1)%items.length]?.photo?.srcLarge) || photo.srcLarge;

    IMG.src = photo.srcLarge;
    IMG.alt = photo.title || '';
    T.textContent = photo.title || 'Untitled';
    P.textContent = project.title;
    P.href = `project.html?p=${encodeURIComponent(project.slug)}`;
    S.textContent = photo.story || '';
    DL.href = photo.srcLarge;

    // Build metadata grid
    const mm = photo.meta || {};
    const metaPairs = [
      ['Date', mm.date || (project.year ? `${project.year}` : '')],
      ['Location', mm.location || project.location || ''],
      ['Camera', mm.camera || ''],
      ['Lens', mm.lens || ''],
      ['Shutter', mm.shutter || ''],
      ['Aperture', mm.aperture || ''],
      ['ISO', mm.iso || ''],
      ['Focal', mm.focalLength || '']
    ].filter(([,v])=> !!v);

    M.innerHTML = metaPairs.map(([k,v])=>`<div><dt>${k}</dt><dd>${safeText(v)}</dd></div>`).join('');
  }

  function open(i){ fill(i); root.classList.add('open'); document.addEventListener('keydown', onKey); }
  function close(){ root.classList.remove('open'); document.removeEventListener('keydown', onKey); }
  function next(){ fill(index+1); }
  function prev(){ fill(index-1); }

  function onKey(e){ if(e.key==='Escape') return close(); if(e.key==='ArrowRight') return next(); if(e.key==='ArrowLeft') return prev(); }

  // Mouse-pan (disabled on touch)
  let canPan = matchMedia('(pointer:fine)').matches;
  root.querySelector('.sv-media').addEventListener('pointermove', (e)=>{
    if(!canPan) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;   // 0..1
    const y = (e.clientY - box.top)  / box.height;  // 0..1
    // Subtle translate, why: increase sense of depth
    const dx = (x - .5) * 10; // px
    const dy = (y - .5) * 10; // px
    IMG.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)`;
  });
  root.querySelector('.sv-media').addEventListener('pointerleave', ()=>{ IMG.style.transform = 'translate(0,0)'; });

  // Click handling
  TL.addEventListener('click', (e)=>{
    const btn = e.target.closest('.tl-card'); if(!btn) return;
    const i = Number(btn.dataset.i)||0;
    open(i);
  });

  root.addEventListener('click', (e)=>{
    const act = e.target.getAttribute('data-act');
    if(act==='close') return close();
    if(act==='next') return next();
    if(act==='prev') return prev();
    if(e.target === root) return close();
  });
})();