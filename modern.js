(()=>{
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;

  // Header shadow on scroll — why: depth & separation
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{ if(!header) return; header.classList.toggle('scrolled', window.scrollY > 6); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Auto tag reveal targets (no HTML edits needed)
  const candidates = document.querySelectorAll('.project-tile, .masonry-item, .gallery-main img');
  candidates.forEach(el=> el.setAttribute('data-reveal',''));

  // IntersectionObserver reveal
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
  },{threshold:.18});
  document.querySelectorAll('[data-reveal]').forEach(el=> io.observe(el));

  // Subtle tilt on hover (cards/images)
  if(!prefersReduced && finePointer){
    const MAX=8; // why: keep motion tasteful
    const applyTilt = (el)=>{
      const onMove = (e)=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5; // -0.5..0.5
        const y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(800px) rotateX(${(-y*MAX).toFixed(2)}deg) rotateY(${(x*MAX).toFixed(2)}deg)`;
      };
      const reset = ()=>{ el.style.transform=''; };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', reset);
    };
    document.querySelectorAll('.project-tile, .masonry-item').forEach(applyTilt);
  }

  // Optional: smooth-anchors fallback for older Safari
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();
