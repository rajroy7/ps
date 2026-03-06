let allCharacters = [];
let activeFilters = {
  rarity: [],
  element: [],
  weapon: [],
  specialStat: [],
  region: [],
  body: []
};
let searchTerm = ''; // for name search
let bodyTypeById = {};


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('characters');
  if (!container) return;

  // when coming back via browser history the DOM may be restored with
  // previous filter/search state.  Clear it to show all characters.
  const searchInput = document.getElementById('characterSearch');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-btn.active').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.region-filter[data-region="all"], .body-filter[data-body="all"]').forEach(b => b.classList.add('active'));
  searchTerm = '';
  activeFilters = { rarity: [], element: [], weapon: [], specialStat: [], region: [], body: [] };

  fetch('characters.json')
    .then(r => r.json())
    .then(data => {
      allCharacters = data;
      return fetch('characters-data.json')
        .then(r => r.json())
        .then(full => {
          const map = {};
          const specialMap = {};
          Object.keys(full || {}).forEach((id) => {
            const entry = full[id] || {};
            const bt = entry.bodyType || '';
            if (bt) map[Number(id)] = bt;
            specialMap[Number(id)] = normalizeSpecialProp(entry.specialProp);
          });
          bodyTypeById = map;
          allCharacters = allCharacters.map(c => ({
            ...c,
            bodyType: normalizeBodyType(map[c.id]),
            specialStat: specialMap[c.id] || ''
          }));
        })
        .catch(() => {
          allCharacters = allCharacters.map(c => ({ ...c, bodyType: '', specialStat: '' }));
        });
    })
    .then(() => {
      setupFilters();
      renderCharacters(allCharacters, container);
    })
    .catch(err => {
      container.innerText = '';
      console.error(err);
    });
});

function normalizeBodyType(value) {
  if (!value) return '';
  if (value === 'FEMALE') return 'LADY';
  return value;
}

function normalizeSpecialProp(prop) {
  const map = {
    FIGHT_PROP_ATTACK_PERCENT: 'ATK%',
    FIGHT_PROP_CHARGE_EFFICIENCY: 'Energy Recharge',
    FIGHT_PROP_CRITICAL: 'CRIT Rate',
    FIGHT_PROP_CRITICAL_HURT: 'CRIT DMG',
    FIGHT_PROP_DEFENSE_PERCENT: 'DEF%',
    FIGHT_PROP_ELEC_ADD_HURT: 'Electro DMG Bonus',
    FIGHT_PROP_ELECTRO_ADD_HURT: 'Electro DMG Bonus',
    FIGHT_PROP_ELEMENT_MASTERY: 'Elemental Mastery',
    FIGHT_PROP_FIRE_ADD_HURT: 'Pyro DMG Bonus',
    FIGHT_PROP_PYRO_ADD_HURT: 'Pyro DMG Bonus',
    FIGHT_PROP_GRASS_ADD_HURT: 'Dendro DMG Bonus',
    FIGHT_PROP_HEAL_ADD: 'Healing Bonus',
    FIGHT_PROP_HP_PERCENT: 'HP%',
    FIGHT_PROP_ICE_ADD_HURT: 'Cryo DMG Bonus',
    FIGHT_PROP_CRYO_ADD_HURT: 'Cryo DMG Bonus',
    FIGHT_PROP_PHYSICAL_ADD_HURT: 'Physical DMG Bonus',
    FIGHT_PROP_ROCK_ADD_HURT: 'Geo DMG Bonus',
    FIGHT_PROP_WATER_ADD_HURT: 'Hydro DMG Bonus',
    FIGHT_PROP_HYDRO_ADD_HURT: 'Hydro DMG Bonus',
    FIGHT_PROP_WIND_ADD_HURT: 'Anemo DMG Bonus',
    FIGHT_PROP_ANEMO_ADD_HURT: 'Anemo DMG Bonus'
  };
  return map[prop] || '';
}

function setExclusiveFilter(button, selector, keepDataAttrName) {
  document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  if (button.dataset[keepDataAttrName] === 'all') {
    activeFilters[keepDataAttrName] = [];
  }
}

function setupFilters() {
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const filtersPanel = document.getElementById('filtersPanel');
  const filterCloseBtn = document.getElementById('filterCloseBtn');
  if (filterToggleBtn && filtersPanel) {
    filterToggleBtn.addEventListener('click', () => {
      const isCollapsed = filtersPanel.classList.toggle('collapsed');
      filterToggleBtn.classList.toggle('expanded', !isCollapsed);
      filterToggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    });
    document.addEventListener('click', (e) => {
      if (filtersPanel.classList.contains('collapsed')) return;
      if (filtersPanel.contains(e.target) || filterToggleBtn.contains(e.target)) return;
      filtersPanel.classList.add('collapsed');
      filterToggleBtn.classList.remove('expanded');
      filterToggleBtn.setAttribute('aria-expanded', 'false');
    });
    if (filterCloseBtn) {
      filterCloseBtn.addEventListener('click', () => {
        filtersPanel.classList.add('collapsed');
        filterToggleBtn.classList.remove('expanded');
        filterToggleBtn.setAttribute('aria-expanded', 'false');
      });
    }
  }

  // Rarity filter buttons
  document.querySelectorAll('.rarity-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateFilters();
    });
  });

  // Element filter buttons
  document.querySelectorAll('.element-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateFilters();
    });
  });

  // Weapon filter buttons
  document.querySelectorAll('.weapon-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateFilters();
    });
  });

  // Special stat filter buttons
  document.querySelectorAll('.special-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      updateFilters();
    });
  });

  // Region filter buttons (single-select with All option)
  document.querySelectorAll('.region-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      setExclusiveFilter(btn, '.region-filter', 'region');
      updateFilters();
    });
  });

  // Body type filter buttons (single-select with All option)
  document.querySelectorAll('.body-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      setExclusiveFilter(btn, '.body-filter', 'body');
      updateFilters();
    });
  });

  // Clear filters button
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.region-filter[data-region="all"], .body-filter[data-body="all"]').forEach(b => b.classList.add('active'));
      activeFilters = { rarity: [], element: [], weapon: [], specialStat: [], region: [], body: [] };
      searchTerm = '';
      const searchInput = document.getElementById('characterSearch');
      if (searchInput) searchInput.value = '';
      renderCharacters(allCharacters, document.getElementById('characters'));
    });
  }

  // search input
  const searchInput = document.getElementById('characterSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      updateFilters();
    });
  }
}

function updateFilters() {
  activeFilters.rarity = Array.from(document.querySelectorAll('.rarity-filter.active')).map(b => parseInt(b.dataset.rarity));
  activeFilters.element = Array.from(document.querySelectorAll('.element-filter.active')).map(b => b.dataset.element);
  activeFilters.weapon = Array.from(document.querySelectorAll('.weapon-filter.active')).map(b => b.dataset.weapon);
  activeFilters.specialStat = Array.from(document.querySelectorAll('.special-filter.active')).map(b => b.dataset.special);
  activeFilters.region = Array.from(document.querySelectorAll('.region-filter.active'))
    .map(b => b.dataset.region)
    .filter(v => v && v !== 'all');
  activeFilters.body = Array.from(document.querySelectorAll('.body-filter.active'))
    .map(b => b.dataset.body)
    .filter(v => v && v !== 'all');

  const filtered = allCharacters.filter(char => {
    const matchRarity = activeFilters.rarity.length === 0 || activeFilters.rarity.includes(char.rarity);
    const matchElement = activeFilters.element.length === 0 || activeFilters.element.includes(char.vision);
    const matchWeapon = activeFilters.weapon.length === 0 || activeFilters.weapon.includes(char.weapon);
    const matchSpecialStat = activeFilters.specialStat.length === 0 || activeFilters.specialStat.includes(char.specialStat);
    const matchRegion = activeFilters.region.length === 0 || activeFilters.region.includes(char.region);
    const matchBody = activeFilters.body.length === 0 || activeFilters.body.includes(normalizeBodyType(char.bodyType));
    const matchSearch = !searchTerm || char.name.toLowerCase().includes(searchTerm);
    return matchRarity && matchElement && matchWeapon && matchSpecialStat && matchRegion && matchBody && matchSearch;
  });

  renderCharacters(filtered, document.getElementById('characters'));
}

function renderCharacters(chars, container) {
  container.innerHTML = '';
  if (chars.length === 0) {
    container.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">No characters match the selected filters.</p>';
    return;
  }

  chars.forEach(c => {
    const card = document.createElement('div');
    card.className = `char-card rarity-${c.rarity}`;

    // determine detail link using character ID
    let linkUrl = '';
    if (c.id) {
      linkUrl = `character.html?id=${c.id}`;
    }

    const inner = document.createElement('div');
    inner.style.width = '100%';

    // Version badge
    const versionBadge = document.createElement('div');
    versionBadge.className = 'version-badge';
    versionBadge.innerText = c.version || '';

    // Rarity badge
    const rarityBadge = document.createElement('div');
    rarityBadge.className = 'rarity-badge';
    rarityBadge.innerText = c.rarity + ' ★';

    // Character image
    const img = document.createElement('img');
    img.src = c.image || 'https://via.placeholder.com/220x280?text=No+Image';
    img.alt = c.name;

    // Character name
    const title = document.createElement('h3');
    title.style.margin = '8px 0 3px 0';
    title.style.fontSize = '12px';
    title.innerText = c.name;

    // Character title/constellation
    const constellation = document.createElement('p');
    constellation.style.margin = '0 0 6px 0';
    constellation.style.fontSize = '9px';
    constellation.style.opacity = '0.7';
    constellation.innerText = c.title || '';

    // Element and weapon icons
    const meta = document.createElement('div');
    meta.style.display = 'flex';
    meta.style.gap = '6px';
    meta.style.marginTop = '6px';
    meta.style.justifyContent = 'center';

    // Element icon
    const elementIcon = document.createElement('img');
    elementIcon.src = c.icon || '';
    elementIcon.alt = c.vision;
    elementIcon.style.width = '18px';
    elementIcon.style.height = '18px';
    elementIcon.title = c.vision;

    // Weapon icon
    const weaponIcon = document.createElement('img');
    weaponIcon.title = c.weapon;
    weaponIcon.style.width = '18px';
    weaponIcon.style.height = '18px';
    const weaponIcons = {
      'Sword': 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Sword.png',
      'Claymore': 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Claymore.png',
      'Catalyst': 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Catalyst.png',
      'Bow': 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Bow.png',
      'Polearm': 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Claymore.png'
    };
    const weaponIconUrl = weaponIcons[c.weapon];
    if (weaponIconUrl && weaponIconUrl.startsWith('http')) {
      weaponIcon.src = weaponIconUrl;
      weaponIcon.alt = c.weapon;
    } else {
      weaponIcon.style.display = 'none';
    }

    meta.appendChild(elementIcon);
    meta.appendChild(weaponIcon);

    inner.appendChild(versionBadge);
    inner.appendChild(rarityBadge);
    inner.appendChild(img);
    inner.appendChild(title);
    inner.appendChild(constellation);
    inner.appendChild(meta);

    if (linkUrl) {
      const a = document.createElement('a');
      a.href = linkUrl;
      a.appendChild(inner);
      card.appendChild(a);
    } else {
      card.appendChild(inner);
    }
    container.appendChild(card);
  });
}
