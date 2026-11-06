'use strict';
// Winterwatch country map (drop-in). Load after app.js.
// Renders an accessible EU-27 tile map next to every "Training jurisdiction" select.
// Choosing a profiled country sets that select and fires the same `change` event the
// app already handles. A distinct data attribute avoids its older map-button handler. Built with DOM APIs only: no
// innerHTML, no inline styles, no network requests (works under the existing CSP).
(() => {
  const countries = window.WINTERWATCH_COUNTRIES || [];
  const profiled = new Map(countries.map(c => [c.id, c]));

  // Approximate geography on a 7 x 7 grid: [code, name, column, row].
  const TILES = [
    ['se', 'Sweden', 4, 0], ['fi', 'Finland', 5, 0],
    ['ie', 'Ireland', 0, 1], ['dk', 'Denmark', 3, 1], ['ee', 'Estonia', 5, 1],
    ['nl', 'Netherlands', 2, 2], ['de', 'Germany', 3, 2], ['pl', 'Poland', 4, 2], ['lv', 'Latvia', 5, 2],
    ['be', 'Belgium', 1, 3], ['lu', 'Luxembourg', 2, 3], ['cz', 'Czechia', 3, 3], ['sk', 'Slovakia', 4, 3], ['lt', 'Lithuania', 5, 3],
    ['fr', 'France', 1, 4], ['at', 'Austria', 3, 4], ['hu', 'Hungary', 4, 4], ['ro', 'Romania', 5, 4],
    ['pt', 'Portugal', 0, 5], ['es', 'Spain', 1, 5], ['it', 'Italy', 2, 5], ['si', 'Slovenia', 3, 5], ['hr', 'Croatia', 4, 5], ['bg', 'Bulgaria', 5, 5],
    ['mt', 'Malta', 2, 6], ['gr', 'Greece', 5, 6], ['cy', 'Cyprus', 6, 6]
  ];

  const STATUS = [
    { key: 'enacted', label: 'NIS2 law enacted', test: s => /^enacted$/i.test(s) },
    { key: 'staged', label: 'Enacted, staged cohorts', test: s => /^enacted/i.test(s) && /staged/i.test(s) },
    { key: 'pending', label: 'Pending in reviewed sources', test: s => /pending/i.test(s) },
    { key: 'unverified', label: 'Enactment not verified', test: s => /not verified/i.test(s) },
    { key: 'none', label: 'Not profiled in this edition', test: () => false }
  ];
  const statusOf = c => (c ? (STATUS.find(s => s.test(String(c.status || ''))) || STATUS[3]) : STATUS[4]);

  let uid = 0;
  let pendingFocus = null;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function build(select) {
    const id = `cm-title-${++uid}`;
    const current = select.value;
    const wrap = el('div', 'country-map');
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-labelledby', id);

    const head = el('div', 'cm-head');
    head.append(el('span', 'cm-title', 'Choose a country on the map'));
    head.firstChild.id = id;
    head.append(el('span', 'cm-hint', `${profiled.size} of 27 EU countries profiled · schematic positions`));
    wrap.append(head);

    const grid = el('div', 'cm-grid');
    for (const [code, name, col, row] of TILES) {
      const c = profiled.get(code);
      const st = statusOf(c);
      const pos = ` cm-c${col} cm-r${row}`;
      if (c) {
        const b = el('button', `cm-tile cm-${st.key}${pos}`, code.toUpperCase());
        b.type = 'button';
        b.dataset.mapCountry = code;
        b.setAttribute('aria-pressed', String(code === current));
        b.setAttribute('aria-label', `${c.name}: ${st.label}`);
        b.title = `${c.name} · ${c.status}`;
        b.addEventListener('click', () => choose(select, code));
        grid.append(b);
      } else {
        const t = el('span', `cm-tile cm-none${pos}`, code.toUpperCase());
        t.title = `${name} · not profiled in this edition`;
        t.setAttribute('aria-hidden', 'true');
        grid.append(t);
      }
    }
    wrap.append(grid);

    const legend = el('ul', 'cm-legend');
    legend.setAttribute('aria-label', 'Map key');
    for (const s of STATUS) {
      if (s.key !== 'none' && !countries.some(c => statusOf(c).key === s.key)) continue;
      const li = el('li');
      li.append(el('span', `cm-swatch cm-${s.key}`), document.createTextNode(s.label));
      legend.append(li);
    }
    wrap.append(legend);
    return wrap;
  }

  function choose(select, code) {
    if (!profiled.has(code) || select.value === code) return;
    pendingFocus = { code, scope: select.closest('dialog') || document };
    select.value = code;
    // The app re-renders the panel on this event; the observer then rebuilds the map.
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function enhance(root) {
    for (const label of root.querySelectorAll('label.country-select')) {
      const prev = label.previousElementSibling;
      if (prev && prev.classList.contains('country-map')) continue;
      const select = label.querySelector('[data-country-select]');
      if (!select) continue;
      label.before(build(select));
    }
    if (pendingFocus) {
      const target = pendingFocus.scope.querySelector(`.country-map [data-map-country="${pendingFocus.code}"]`);
      if (target) { target.focus({ preventScroll: true }); pendingFocus = null; }
    }
  }

  enhance(document);
  new MutationObserver(records => {
    for (const r of records) if (r.addedNodes.length) { enhance(document); break; }
  }).observe(document.body, { childList: true, subtree: true });
})();
