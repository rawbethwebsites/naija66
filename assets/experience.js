/* Naija 66 visual layer. The original game engine and profile storage stay in index.html. */
window.NaijaExperience = (() => {
  'use strict';
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const zoneLabel = (id) => String(id || '').split('-').filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1)).join('-');
  const paths = {
    arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
    quiz: '<path d="m13 2-8 12h6l-1 8 9-12h-6l1-8Z"/>',
    whosaidit: '<path d="M5 5h14v11h-8l-5 4v-4H5V5Z"/><path d="M8 9h8m-8 3h5"/>',
    namestate: '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
    jollof: '<path d="M3 11h18a9 9 0 0 1-18 0Zm3 10h12M8 7c-3-3 3-3 0-6m8 6c-3-3 3-3 0-6"/>',
    pidgin: '<path d="M4 4h11v10H9l-4 3v-3H4V4Zm13 4h3v11h-3v3l-4-3h-2v-3"/><path d="M7 8h5m-5 3h3"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3m7 1 2 2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>'
  };
  const icon = (name, className='') => `<svg class="exp-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.star}</svg>`;
  const zoneNotes = {
    'north-west': 'Another corner of home. Another reason to be proud.',
    'north-east': 'A place in our story. A new stop on your journey.',
    'north-central': 'Meet in the middle. Let the next round begin.',
    'south-west': 'Home or away, there’s always more to discover.',
    'south-east': 'Bring your knowledge. Leave with a new story.',
    'south-south': 'Take the scenic route. Stay for one more round.'
  };
  let highlightedZone = null;

  function brand() {
    return `<button class="exp-brand" onclick="go('landing')" aria-label="Naija 66 home"><img src="assets/tbn-mark.webp" alt="The Boost Nation" width="34" height="34"><span class="exp-brand-divider"></span><span class="exp-wordmark">naija<span>66</span><span class="exp-brand-dot">.</span></span></button>`;
  }
  function player() {
    if (!profile.displayName) return '';
    return `<button class="exp-player" onclick="go('profile-view')" aria-label="View profile for ${escape(profile.displayName)}"><span class="exp-avatar">${avatar(profile.displayName, 36)}</span><span class="exp-player-copy"><strong>${escape(profile.displayName)}</strong><small>${Number(profile.totalScore || 0).toLocaleString()} pts</small></span>${icon('arrow')}</button>`;
  }
  function header(isMap=false) {
    return `<header class="exp-header">${brand()}<div class="exp-header-right">${isMap ? `<button class="exp-home" onclick="go('landing')">${icon('back')}<span>Home</span></button>` : `<div class="exp-date"><span>Independence Day</span><strong>01 / 10 / 2026</strong></div>`}${player()}</div></header>`;
  }
  function start() {
    if (!profile.displayName) return go('profile-setup');
    if (!profile.ageTier) return go('age-select');
    if (!profile.stateOfOrigin) return go('state-select');
    go('map-hub');
  }
  function showGames() {
    const section = document.getElementById('exp-games');
    section?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
    const heading = section?.querySelector('h2');
    if (heading) { heading.tabIndex=-1; heading.focus({preventScroll:true}); }
  }
  function landing() {
    const returning = Boolean(profile.displayName && profile.ageTier && profile.stateOfOrigin);
    const descriptions = {
      quiz: 'Quick thinking. Big Naija energy.', whosaidit: 'You know the words. But who said them?',
      namestate: 'Three clues. One place called home.', jollof: 'Real fact or premium gist?', pidgin: 'You sabi the meaning?'
    };
    app.innerHTML = `<div class="experience exp-landing">
      ${header()}
      <section class="exp-hero" aria-labelledby="exp-title">
        <div class="exp-hero-copy">
          <p class="exp-eyebrow"><span class="exp-flag" aria-hidden="true"></span>66 years. Still one of a kind.</p>
          <h1 id="exp-title">This is<br>our <span>Naija.</span></h1>
          <p class="exp-intro">The stories. The slang. The things only we get.<br class="exp-desktop-break"> A little play. A whole lot of pride.</p>
        </div>
        <figure class="exp-hero-art">
          <img src="assets/floating-nigeria-reference.webp" alt="A floating Nigeria-shaped landscape with forests, rivers and miniature landmarks in warm golden light" width="736" height="860" fetchpriority="high" decoding="async">
          <figcaption>Many places.<br><strong>One home.</strong></figcaption>
          <span class="exp-art-coordinate" aria-hidden="true">NIGERIA · WEST AFRICA</span>
        </figure>
        <div class="exp-hero-actions">
          <button class="exp-primary" onclick="NaijaExperience.start()">${returning ? 'Continue your journey' : 'Oya, let’s play'}${icon('arrow')}</button>
          <button class="exp-text-action" onclick="NaijaExperience.showGames()">Meet the games<span aria-hidden="true">↓</span></button>
          <p class="exp-helper">${returning ? `Welcome back, ${escape(profile.displayName)}. Your next round is waiting.` : 'Made for everyone who calls Nigeria home.'}</p>
        </div>
      </section>
      <div class="exp-facts" aria-label="About the games">
        <div><strong>66<span>sec</span></strong><p>One quick round</p></div>
        <span class="exp-facts-rule" aria-hidden="true"></span>
        <div><strong>05</strong><p>Ways to rep Naija</p></div>
        <span class="exp-facts-rule" aria-hidden="true"></span>
        <div><strong>01</strong><p>Country. All of us.</p></div>
        <p class="exp-facts-note">From home.<br>From the diaspora.<br><span>We dey together.</span></p>
      </div>
      <section id="exp-games" class="exp-games" aria-labelledby="exp-games-title">
        <div class="exp-section-heading"><div><p class="exp-eyebrow">Come for the game. Stay for the gist.</p><h2 id="exp-games-title">How Naija are you?</h2></div><p>Pick a place on the map.<br>Choose your kind of challenge.</p></div>
        <ul class="exp-game-list">${GAMES.map((g,i) => `<li class="exp-game-summary"><span class="exp-game-number">0${i+1}</span><span class="exp-game-symbol">${icon(g.id)}</span><h3>${escape(g.title)}</h3><p>${descriptions[g.id]}</p><span class="exp-game-duration">${icon('timer')}66-second round</span></li>`).join('')}</ul>
        <button class="exp-text-action" onclick="NaijaExperience.start()">Find your first game ${icon('arrow')}</button>
      </section>
      <footer class="exp-footer"><div class="exp-footer-brand"><img src="assets/tbn-mark.webp" alt="" width="24" height="24"><span>A Boost Nation project.<br><strong>Made of us. Made for us.</strong></span></div><p>Local design preview<br><span>Reference artwork — not cleared for publication.</span></p></footer>
    </div>`;
  }
  function zones() {
    return window.NAIJA_GEOGRAPHY?.zones || [];
  }
  function completed(id) {
    return (profile.completedZones || []).includes(id);
  }
  function selected() {
    const all = zones();
    if (!all.some(z => z.id === highlightedZone)) highlightedZone = all.some(z => z.id === profile.zone) ? profile.zone : (all[0]?.id || 'south-west');
    return all.find(z => z.id === highlightedZone);
  }
  function mapSvg() {
    const geo = window.NAIJA_GEOGRAPHY;
    if (!geo) return `<div class="exp-map-fallback">${icon('compass')}<p>The map couldn’t load. You can still choose a zone below.</p></div>`;
    const current = selected();
    const labels = {'south-east':[432,500], 'south-south':[187,595]};
    return `<svg class="exp-geography" viewBox="${geo.viewBox}" role="group" aria-labelledby="geo-title geo-desc">
      <title id="geo-title">Explore Nigeria’s six geopolitical zones</title><desc id="geo-desc">Select a region to see its states and choose a game. Large zone buttons below offer the same controls.</desc>
      <defs>
        <linearGradient id="geo-north-west" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#DCBC73"/><stop offset="1" stop-color="#96733D"/></linearGradient>
        <linearGradient id="geo-north-east" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#CC9A5E"/><stop offset="1" stop-color="#8D643D"/></linearGradient>
        <linearGradient id="geo-north-central" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#A7B477"/><stop offset="1" stop-color="#5E8050"/></linearGradient>
        <linearGradient id="geo-south-west" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#79AF75"/><stop offset="1" stop-color="#3E754D"/></linearGradient>
        <linearGradient id="geo-south-east" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#7CAF89"/><stop offset="1" stop-color="#437957"/></linearGradient>
        <linearGradient id="geo-south-south" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#4F9B82"/><stop offset="1" stop-color="#25694F"/></linearGradient>
        <filter id="geo-shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#000D08" flood-opacity=".7"/></filter>
        <pattern id="geo-texture" width="14" height="14" patternUnits="userSpaceOnUse"><path d="m2 9 3-4 3 4M10 2v3" fill="none" stroke="#F5E8BB" stroke-width=".65" opacity=".18"/></pattern>
        <clipPath id="geo-clip"><path d="${geo.outline}"/></clipPath>
      </defs>
      <g aria-hidden="true" class="geo-depth" filter="url(#geo-shadow)"><path d="${geo.outline}" transform="translate(0,13)" fill="#443D23"/><path d="${geo.outline}" transform="translate(0,7)" fill="#77704C"/></g>
      ${geo.zones.map(z => {
        const [lx,ly] = labels[z.id] || [z.x,z.y];
        return `<g class="geo-zone ${current?.id===z.id?'is-selected':''}" data-map-zone="${z.id}" role="button" tabindex="0" aria-pressed="${current?.id===z.id}" aria-label="Explore ${zoneLabel(z.id)}${completed(z.id)?', completed':''}" onclick="NaijaExperience.selectZone('${z.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();NaijaExperience.selectZone('${z.id}');}">
          <path class="geo-surface" d="${z.d}" fill="url(#geo-${z.id})"/>
          <g class="geo-state-lines" aria-hidden="true">${geo.states.filter(s=>s.zone===z.id).map(s=>`<path d="${s.d}"/>`).join('')}</g>
          <path class="geo-texture" d="${z.d}" fill="url(#geo-texture)" aria-hidden="true"/>
          <title>${zoneLabel(z.id)} · ${z.states.join(', ')}</title>
        </g>`;
      }).join('')}
      <g class="geo-labels">${geo.zones.map(z=>{
        const [lx,ly]=labels[z.id]||[z.x,z.y];
        return `<g data-map-label="${z.id}" class="geo-label ${current?.id===z.id?'is-selected':''}" onclick="NaijaExperience.selectZone('${z.id}')" aria-hidden="true">
          ${labels[z.id]?`<path class="geo-leader" d="M${z.x} ${z.y}L${lx} ${ly}"/><circle class="geo-pin" cx="${z.x}" cy="${z.y}" r="5"/>`:''}
          <rect x="${lx-60}" y="${ly-17}" width="120" height="34" rx="17"/>
          <text x="${lx}" y="${ly+5}" text-anchor="middle">${completed(z.id)?'✓ ':''}${zoneLabel(z.id)}</text>
        </g>`;
      }).join('')}</g>
      <g class="geo-compass" aria-hidden="true" transform="translate(650,450)"><text y="-20" text-anchor="middle">N</text><path d="M0-10 7 12 0 7-7 12Z"/><path d="M0 7v17"/></g>
      <text class="geo-ocean" x="70" y="555" aria-hidden="true">GULF OF GUINEA</text>
    </svg>`;
  }
  function detail() {
    const z = selected();
    const id = z?.id || highlightedZone || 'south-west';
    const members = z?.states || STATES.filter(s=>s.zone===id).map(s=>s.name);
    const label = zoneLabel(id);
    const home = profile.zone === id;
    return `<div class="exp-zone-kicker">${icon('pin')}<span>${home ? 'Your home zone' : 'Your next stop'}</span>${completed(id)?'<span class="exp-complete-tag">Explored ✓</span>':''}</div>
      <h2>${label}</h2><p class="exp-zone-note">${zoneNotes[id]}</p>
      <div class="exp-zone-states"><span class="exp-small-label">${id==='north-central'?'6 states + the FCT':`${members.length} states`.toUpperCase()}</span><p>${members.map(n=>escape(n)).join('<span aria-hidden="true"> · </span>')}</p></div>
      <div class="exp-round-details"><span>${icon('timer')}66 seconds</span><span>${icon('quiz')}5 games to pick</span></div>
      <button class="exp-primary exp-zone-play" onclick="NaijaExperience.playZone()">Play ${label}${icon('arrow')}</button>
      <p class="exp-zone-hint">The same five games are available in every zone.<br>Where will your next round take you?</p>`;
  }
  function mapHub() {
    const current = selected();
    const ids = ['north-west','north-east','north-central','south-west','south-east','south-south'];
    const total = ids.filter(completed).length;
    app.innerHTML = `<div class="experience exp-hub">
      ${header(true)}
      <div class="exp-hub-heading"><div><p class="exp-eyebrow">Your Naija. Your journey.</p><h1>There’s more to <span>home.</span></h1><p>Pick a zone. Find a game. Make us proud.</p></div><div class="exp-journey" aria-label="${total} of 6 zones explored"><span>${icon('compass')}Your journey</span><strong>${total}<span> / 6</span></strong><small>zones explored</small><div class="exp-journey-dots" aria-hidden="true">${ids.map(id=>`<i class="${completed(id)?'is-done':''}"></i>`).join('')}</div></div></div>
      <div class="exp-hub-layout">
        <section class="exp-map-section" aria-label="Choose a zone">
          <div class="exp-map-stage">${mapSvg()}</div>
          <p class="exp-map-instruction">${icon('pin')}Tap the map or choose a zone below</p>
          <div class="exp-zone-buttons" aria-label="Geopolitical zones">${ids.map(id=>`<button type="button" data-zone-button="${id}" aria-pressed="${current?.id===id}" class="exp-zone-button ${current?.id===id?'is-selected':''}" onclick="NaijaExperience.selectZone('${id}')"><span>${zoneLabel(id)}</span>${completed(id)?icon('check'):icon('arrow')}</button>`).join('')}</div>
        </section>
        <aside class="exp-zone-panel" aria-label="Selected zone"><div class="exp-woven" aria-hidden="true"></div><div id="exp-zone-detail">${detail()}</div><div class="exp-panel-bottom"><span class="exp-flag" aria-hidden="true"></span>Different places. Same Naija.</div></aside>
      </div>
      <div class="exp-hub-footer"><p>36 states. The FCT. <strong>All of us.</strong></p><a href="https://www.geoboundaries.org/api/current/gbOpen/NGA/ADM1/" target="_blank" rel="noopener noreferrer">Map: GRID3 / geoBoundaries · CC BY 4.0 ↗</a></div>
      <p id="exp-map-status" class="exp-sr-only" role="status" aria-live="polite"></p>
    </div>`;
  }
  function selectZone(id) {
    if (!STATES.some(s => s.zone === id)) return;
    highlightedZone = id;
    document.querySelectorAll('[data-map-zone],[data-zone-button]').forEach(node => {
      const active = (node.dataset.mapZone || node.dataset.zoneButton) === id;
      node.classList.toggle('is-selected', active);
      node.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-map-label]').forEach(node => node.classList.toggle('is-selected', node.dataset.mapLabel === id));
    const panel = document.getElementById('exp-zone-detail');
    if (panel) panel.innerHTML = detail();
    const status = document.getElementById('exp-map-status');
    if (status) status.textContent = `${zoneLabel(id)} selected. Zone information and the play button are below the map.`;
  }
  function playZone(zone) {
    if (zone) highlightedZone = zone;
    state.selectedZone = highlightedZone || profile.zone || 'south-west';
    go('game-select');
  }
  return {landing, mapHub, mapSvg, start, showGames, selectZone, playZone};
})();
