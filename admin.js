/* ====================================================
   Photography Admin — client JS
   ==================================================== */

let DATA = { COLLECTIONS: [], PROJECTS: [], PHOTOS: {} };
let pendingFiles = []; // {file, previewUrl}

// ── helpers ──────────────────────────────────────────
const $ = id => document.getElementById(id);
const post = (url, body) => fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(r => r.json());
const del  = (url)       => fetch(url, { method:'DELETE' }).then(r => r.json());

function toast(msg, type='ok') {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.className = ''; }, 2800);
}

// ── sidebar navigation ────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = $('panel-' + btn.dataset.panel);
    if (panel) panel.classList.add('active');
  });
});

// ── load data from server ─────────────────────────────
async function loadData() {
  const res = await fetch('/api/data');
  DATA = await res.json();
  renderAll();
}

function renderAll() {
  renderSummary();
  renderCollections();
  renderProjects();
  renderPhotos();
  populateSelects();
}

function renderSummary() {
  $('summary').innerHTML = `
    <span>${DATA.COLLECTIONS.length} collections</span>
    <span>${DATA.PROJECTS.length} projects</span>
    <span>${Object.values(DATA.PHOTOS).flat().length} photos</span>`;
}

// ── Collections panel ─────────────────────────────────
function renderCollections() {
  const grid = $('collections-grid');
  if (!DATA.COLLECTIONS.length) { grid.innerHTML = '<div class="empty">No collections yet. Create one →</div>'; return; }
  grid.innerHTML = DATA.COLLECTIONS.map(c => `
    <div class="card">
      ${c.cover ? `<img class="card-img" src="${c.cover}" alt="${c.title}" onerror="this.style.display='none'">` : '<div class="card-img-placeholder">🗂</div>'}
      <div class="card-body">
        <div class="card-title">${c.title}</div>
        <div class="card-sub">${c.slug}</div>
        <div class="card-sub" style="margin-top:4px">${c.blurb || ''}</div>
        <div class="card-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteCollection('${c.slug}')">Delete</button>
        </div>
      </div>
    </div>`).join('');
}

async function deleteCollection(slug) {
  if (!confirm(`Delete collection "${slug}"?`)) return;
  const r = await del('/api/collection/' + slug);
  if (r.ok) { toast('Collection deleted'); await loadData(); }
  else toast(r.error || 'Error', 'err');
}

// ── Projects panel ────────────────────────────────────
function renderProjects() {
  const grid = $('projects-grid');
  const filter = $('projects-col-filter').value;
  const list = filter ? DATA.PROJECTS.filter(p => p.collection === filter) : DATA.PROJECTS;
  if (!list.length) { grid.innerHTML = '<div class="empty">No projects yet.</div>'; return; }
  grid.innerHTML = list.map(p => `
    <div class="card">
      ${p.cover ? `<img class="card-img" src="${p.cover}" alt="${p.title}" onerror="this.style.display='none'">` : '<div class="card-img-placeholder">📁</div>'}
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-sub">${p.slug} · ${p.collection}</div>
        <div class="card-sub" style="margin-top:2px">${[p.location, p.year].filter(Boolean).join(', ')}</div>
        <div class="card-sub" style="margin-top:4px">${p.blurb || ''}</div>
        <div class="card-sub" style="margin-top:4px;color:var(--accent2)">${(DATA.PHOTOS[p.slug]||[]).length} photos</div>
        <div class="card-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteProject('${p.slug}')">Delete</button>
        </div>
      </div>
    </div>`).join('');
}

$('projects-col-filter').addEventListener('change', renderProjects);

async function deleteProject(slug) {
  if (!confirm(`Delete project "${slug}" and all its photos?`)) return;
  const r = await del('/api/project/' + slug);
  if (r.ok) { toast('Project deleted'); await loadData(); }
  else toast(r.error || 'Error', 'err');
}

// ── Photos panel ──────────────────────────────────────
function renderPhotos() {
  const grid = $('photos-grid');
  const filter = $('photos-project-filter').value;
  let entries = [];
  if (filter) {
    entries = (DATA.PHOTOS[filter] || []).map((ph, i) => ({ ph, project: filter, i }));
  } else {
    Object.entries(DATA.PHOTOS).forEach(([proj, photos]) =>
      photos.forEach((ph, i) => entries.push({ ph, project: proj, i })));
  }
  if (!entries.length) { grid.innerHTML = '<div class="empty">No photos yet. Upload some →</div>'; return; }
  grid.innerHTML = entries.map(({ ph, project, i }) => `
    <div class="photo-card">
      <img src="${ph.srcSmall}" alt="${ph.title || ''}" loading="lazy" onerror="this.src=''">
      <div class="photo-overlay">
        <button class="btn btn-danger btn-sm" onclick="deletePhoto('${project}', ${i})">🗑 Delete</button>
        <span style="font-size:11px;color:#aaa">${ph.title || project}</span>
      </div>
      <div class="photo-label">${ph.title || ph.srcSmall.split('/').pop()}</div>
    </div>`).join('');
}

$('photos-project-filter').addEventListener('change', renderPhotos);

async function deletePhoto(project, index) {
  if (!confirm('Delete this photo?')) return;
  const r = await del(`/api/photo/${project}/${index}`);
  if (r.ok) { toast('Photo deleted'); await loadData(); }
  else toast(r.error || 'Error', 'err');
}

// ── Populate selects with live data ───────────────────
function populateSelects() {
  const cols = DATA.COLLECTIONS;
  const projs = DATA.PROJECTS;

  // upload panel
  setOptions($('up-collection'), cols, c => ({ v: c.slug, l: c.title }), 'Select collection…');
  // up-project is filtered on change of up-collection
  filterProjectSelect();

  // new project
  setOptions($('np-collection'), cols, c => ({ v: c.slug, l: c.title }), 'Select collection…');

  // photos filter
  setOptions($('photos-project-filter'), projs, p => ({ v: p.slug, l: p.title }), 'All projects');

  // projects col filter
  setOptions($('projects-col-filter'), cols, c => ({ v: c.slug, l: c.title }), 'All');
}

function setOptions(sel, items, mapper, placeholder) {
  const prev = sel.value;
  sel.innerHTML = `<option value="">${placeholder}</option>` +
    items.map(i => { const { v, l } = mapper(i); return `<option value="${v}" ${v===prev?'selected':''}>${l}</option>`; }).join('');
}

$('up-collection').addEventListener('change', filterProjectSelect);
function filterProjectSelect() {
  const col = $('up-collection').value;
  const projs = col ? DATA.PROJECTS.filter(p => p.collection === col) : DATA.PROJECTS;
  setOptions($('up-project'), projs, p => ({ v: p.slug, l: p.title }), 'Select project…');
}

// ── Upload zone ───────────────────────────────────────
const zone = $('upload-zone');
const fileInput = $('file-input');
zone.addEventListener('click', () => fileInput.click());
zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); addFiles(e.dataTransfer.files); });
fileInput.addEventListener('change', () => addFiles(fileInput.files));

function addFiles(fileList) {
  for (const f of fileList) {
    if (!f.type.startsWith('image/')) continue;
    const url = URL.createObjectURL(f);
    pendingFiles.push({ file: f, previewUrl: url });
  }
  renderPreviews();
  renderMetaForms();
}

function removeFile(index) {
  URL.revokeObjectURL(pendingFiles[index].previewUrl);
  pendingFiles.splice(index, 1);
  renderPreviews();
  renderMetaForms();
}

function renderPreviews() {
  $('preview-list').innerHTML = pendingFiles.map((pf, i) => `
    <div class="preview-item">
      <img src="${pf.previewUrl}" alt="">
      <button class="rm" onclick="removeFile(${i})">✕</button>
    </div>`).join('');
}

function renderMetaForms() {
  $('photo-meta-forms').innerHTML = pendingFiles.map((pf, i) => `
    <div class="meta-block" id="meta-block-${i}">
      <div class="meta-header">
        <img class="meta-thumb" src="${pf.previewUrl}" alt="">
        <span class="meta-name">${pf.file.name}</span>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Title</label><input id="mt-title-${i}" placeholder="e.g. Front three-quarter" /></div>
        <div class="form-group"><label>Story / caption</label><input id="mt-story-${i}" placeholder="Optional" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Camera</label><input id="mt-camera-${i}" placeholder="Canon T7" /></div>
        <div class="form-group"><label>Lens</label><input id="mt-lens-${i}" placeholder="50mm f/1.8" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Shutter</label><input id="mt-shutter-${i}" placeholder="1/250s" /></div>
        <div class="form-group"><label>Aperture</label><input id="mt-aperture-${i}" placeholder="f/2.8" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>ISO</label><input id="mt-iso-${i}" placeholder="400" /></div>
        <div class="form-group"><label>Focal length</label><input id="mt-focal-${i}" placeholder="50mm" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>📍 Location name</label><input id="mt-location-${i}" placeholder="Tokyo, Japan" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>🌐 Latitude</label><input id="mt-lat-${i}" placeholder="35.6762" /></div>
        <div class="form-group"><label>🌐 Longitude</label><input id="mt-lng-${i}" placeholder="139.6503" /></div>
      </div>
    </div>`).join('');
}

$('upload-btn').addEventListener('click', async () => {
  const collection = $('up-collection').value;
  const project = $('up-project').value;
  if (!collection || !project) return toast('Select a collection and project first', 'err');
  if (!pendingFiles.length) return toast('No files selected', 'err');

  let done = 0;
  for (let i = 0; i < pendingFiles.length; i++) {
    const pf = pendingFiles[i];
    // 1. upload file
    const form = new FormData();
    form.append('file', pf.file);
    form.append('collection', collection);
    form.append('project', project);
    const upRes = await fetch('/api/upload-image', { method: 'POST', body: form }).then(r => r.json());
    if (!upRes.ok) { toast(`Upload failed: ${upRes.error}`, 'err'); continue; }

    // 2. save photo metadata
    const meta = {
      camera: $(`mt-camera-${i}`)?.value.trim() || '',
      lens:   $(`mt-lens-${i}`)?.value.trim() || '',
      shutter:$(`mt-shutter-${i}`)?.value.trim() || '',
      aperture:$(`mt-aperture-${i}`)?.value.trim() || '',
      iso:    $(`mt-iso-${i}`)?.value.trim() || '',
      focalLength: $(`mt-focal-${i}`)?.value.trim() || '',
      location: $(`mt-location-${i}`)?.value.trim() || '',
      lat: $(`mt-lat-${i}`)?.value.trim() || '',
      lng: $(`mt-lng-${i}`)?.value.trim() || ''
    };
    await post('/api/add-photo', {
      project,
      srcSmall: upRes.path,
      srcLarge: upRes.path,
      w: 0, h: 0,
      title: $(`mt-title-${i}`)?.value.trim() || '',
      story: $(`mt-story-${i}`)?.value.trim() || '',
      meta
    });
    done++;
  }

  pendingFiles = [];
  renderPreviews();
  renderMetaForms();
  toast(`✅ ${done} photo${done!==1?'s':''} uploaded and saved`);
  await loadData();
});

// ── New Project ───────────────────────────────────────
$('save-project-btn').addEventListener('click', async () => {
  const slug = $('np-slug').value.trim();
  const collection = $('np-collection').value;
  const title = $('np-title').value.trim();
  if (!slug || !collection || !title) return toast('Slug, collection and title required', 'err');
  const r = await post('/api/add-project', {
    slug, collection, title,
    year: $('np-year').value.trim(),
    location: $('np-location').value.trim(),
    blurb: $('np-blurb').value.trim(),
    cover: $('np-cover').value.trim()
  });
  if (r.ok) { toast('Project saved ✅'); await loadData(); ['np-slug','np-title','np-year','np-location','np-blurb','np-cover'].forEach(id => $(id).value=''); }
  else toast(r.error || 'Error', 'err');
});

// ── New Collection ────────────────────────────────────
$('save-col-btn').addEventListener('click', async () => {
  const slug = $('nc-slug').value.trim();
  const title = $('nc-title').value.trim();
  if (!slug || !title) return toast('Slug and title required', 'err');
  const r = await post('/api/add-collection', {
    slug, title,
    blurb: $('nc-blurb').value.trim(),
    cover: $('nc-cover').value.trim()
  });
  if (r.ok) { toast('Collection saved ✅'); await loadData(); ['nc-slug','nc-title','nc-blurb','nc-cover'].forEach(id => $(id).value=''); }
  else toast(r.error || 'Error', 'err');
});

// ── boot ─────────────────────────────────────────────
loadData();

