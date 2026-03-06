const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");

function synchronizeGlobalNavigation() {
    const sidebarEl = document.getElementById('sidebar');
    const navLinks = document.querySelector('nav .nav-links');

    if (sidebarEl) {
        const sidebarList = sidebarEl.querySelector('ul');
        if (sidebarList) {
            sidebarList.innerHTML = `
                <li><a href="index.html"><img src="https://ik.imagekit.io/gukc1okbd/home.webp" class="icon"><span class="text">Home</span></a></li>
                <li><a href="characters.html"><img src="https://ik.imagekit.io/gukc1okbd/characters.webp" class="icon"><span class="text">Characters</span></a></li>
                <li><a href="weapons.html"><img src="https://ik.imagekit.io/gukc1okbd/weapons.webp" class="icon"><span class="text">Weapons</span></a></li>
                <li><a href="artifacts.html"><img src="https://ik.imagekit.io/gukc1okbd/artifacts.webp" class="icon"><span class="text">Artifacts</span></a></li>
                <li><a href="achievements.html"><img src="https://ik.imagekit.io/gukc1okbd/achievements.webp" class="icon"><span class="text">Achievements</span></a></li>
                <li><a href="inventory.html"><img src="https://ik.imagekit.io/gukc1okbd/inventory.webp" class="icon"><span class="text">Inventory</span></a></li>
                <li><a href="enemy.html"><img src="https://ik.imagekit.io/gukc1okbd/enemy.webp" class="icon"><span class="text">Enemy Creatures</span></a></li>
                <li><a href="wishes.html"><img src="https://ik.imagekit.io/gukc1okbd/wishes.webp" class="icon"><span class="text">Character Wishes</span></a></li>
                <li><a href="abyss.html"><img src="icons/abyss.webp" class="icon"><span class="text">Spiral Abyss</span></a></li>
                <li><a href="theater.html"><img src="https://ik.imagekit.io/gukc1okbd/theater.webp" class="icon"><span class="text">Imaginarium Theater</span></a></li>
                <li><a href="stygian.html"><img src="https://ik.imagekit.io/gukc1okbd/wishes.webp" class="icon"><span class="text">Stygian Onslaught</span></a></li>
                <li><a href="furnishings.html"><img src="https://ik.imagekit.io/gukc1okbd/furnishings.webp" class="icon"><span class="text">Furnishings</span></a></li>
                <li><a href="furnishing-set.html"><img src="https://ik.imagekit.io/gukc1okbd/furnishing-set.webp" class="icon"><span class="text">Furnishing Set</span></a></li>
                <li><a href="books.html"><img src="icons/miliastra.webp" class="icon"><span class="text">Books</span></a></li>
                <li class="settings-menu-item"><button id="settingsBtn" class="settings-menu-btn"><img src="https://ik.imagekit.io/gukc1okbd/settings.webp" class="icon"><span class="text">Settings</span></button></li>
                <li><a href="mw-set.html"><img src="https://ik.imagekit.io/gukc1okbd/mw-set.webp" class="icon"><span class="text">Miliastra Wonderland Set</span></a></li>
                <li><a href="mw-inventory.html"><img src="https://ik.imagekit.io/gukc1okbd/mw-inventory.webp" class="icon"><span class="text">Miliastra Wonderland Inventory</span></a></li>
                <li><a href="search.html"><img src="https://ik.imagekit.io/gukc1okbd/search.webp" class="icon"><span class="text">Search</span></a></li>
                <li><a href="diff.html"><img src="icons/diff.webp" class="icon"><span class="text">Diff</span></a></li>
                <li><a href="tcg.html"><img src="https://ik.imagekit.io/gukc1okbd/tcg.webp" class="icon"><span class="text">Genius Invokation TCG</span></a></li>
            `;
        }
    }

    if (navLinks) {
        const existingSearchBtn = navLinks.querySelector('#searchBtn');
        const existingSettingsBtn = navLinks.querySelector('#topSettingsBtn');
        const existingEndgameBtn = navLinks.querySelector('#endgameNavBtn');

        const mkLink = (href, text) => {
            const a = document.createElement('a');
            a.href = href;
            a.textContent = text;
            return a;
        };

        const searchBtn = existingSearchBtn || (() => {
            const btn = document.createElement('button');
            btn.className = 'nav-search-btn';
            btn.id = 'searchBtn';
            btn.title = 'Search';
            btn.innerHTML = '<img src="https://ik.imagekit.io/gukc1okbd/search-13-512.webp" alt="Search" class="search-icon">';
            return btn;
        })();

        const settingsBtn = existingSettingsBtn || (() => {
            const btn = document.createElement('button');
            btn.className = 'nav-settings-btn';
            btn.id = 'topSettingsBtn';
            btn.title = 'Settings';
            btn.innerHTML = '<img src="https://ik.imagekit.io/gukc1okbd/settings.webp" alt="Settings" class="settings-icon">';
            return btn;
        })();

        const endgameBtn = existingEndgameBtn || (() => {
            const btn = document.createElement('button');
            btn.id = 'endgameNavBtn';
            btn.type = 'button';
            btn.className = 'nav-endgame-btn';
            btn.textContent = 'Endgame';
            return btn;
        })();

        navLinks.innerHTML = '';
        [
            mkLink('index.html', 'Home'),
            mkLink('characters.html', 'Characters'),
            mkLink('weapons.html', 'Weapons'),
            mkLink('artifacts.html', 'Artifacts'),
            mkLink('achievements.html', 'Achievements'),
            mkLink('wishes.html', 'Banners'),
            mkLink('inventory.html', 'Inventory')
        ].forEach((el) => navLinks.appendChild(el));
        navLinks.appendChild(endgameBtn);
        navLinks.appendChild(searchBtn);
        navLinks.appendChild(settingsBtn);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', synchronizeGlobalNavigation);
} else {
    synchronizeGlobalNavigation();
}

// Hamburger menu toggle
if (hamburger && sidebar) {
    hamburger.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        hamburger.classList.toggle("open");
        document.body.classList.toggle("sidebar-open");
    });
}

// SEARCH FUNCTIONALITY
function initializeSearch() {
    const searchBtn = document.getElementById('searchBtn');
    if (!searchBtn) return;

    const topSearchIcon = searchBtn.querySelector('.search-icon');
    if (topSearchIcon) {
        topSearchIcon.src = 'https://ik.imagekit.io/gukc1okbd/search-13-512.webp';
    }

    if (!document.getElementById('globalSearchStyles')) {
        const style = document.createElement('style');
        style.id = 'globalSearchStyles';
        style.textContent = `
            .search-modal { position: fixed; inset: 0; z-index: 1200; display: none; }
            .search-modal.open { display: block; }
            .search-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
            .search-panel {
                position: relative;
                width: min(760px, calc(100vw - 24px));
                margin: 8vh auto 0 auto;
                background: rgba(20,16,34,0.98);
                border: 1px solid rgba(124,92,255,0.45);
                border-radius: 12px;
                box-shadow: 0 16px 36px rgba(0,0,0,0.4);
                overflow: hidden;
            }
            .search-head { display: flex; align-items: center; gap: 8px; padding: 10px; border-bottom: 1px solid rgba(124,92,255,0.25); }
            .search-input {
                flex: 1;
                border: 1px solid rgba(124,92,255,0.5);
                border-radius: 8px;
                background: rgba(124,92,255,0.12);
                color: #fff;
                padding: 10px 12px;
                font-size: 14px;
            }
            .search-input:focus { outline: none; border-color: rgba(124,92,255,0.85); }
            .search-close {
                width: 30px; height: 30px; border-radius: 8px;
                border: 1px solid rgba(124,92,255,0.65);
                background: linear-gradient(135deg,rgba(124,92,255,0.34),rgba(124,92,255,0.16));
                color: #efeaff; font-size: 16px; cursor: pointer;
            }
            .search-results { max-height: 62vh; overflow: auto; padding: 8px; }
            .search-placeholder { text-align: center; color: #999; margin: 12px 0; }
            .search-result-item {
                display: flex; align-items: center; gap: 10px; text-decoration: none; color: #fff;
                padding: 9px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);
                background: rgba(255,255,255,0.03); margin-bottom: 8px;
            }
            .search-result-item:hover { background: rgba(124,92,255,0.14); border-color: rgba(124,92,255,0.5); }
            .search-result-image { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: rgba(124,92,255,0.1); overflow: hidden; flex: 0 0 42px; }
            .search-result-image img { width: 100%; height: 100%; object-fit: cover; }
            .search-result-info h4 { margin: 0; font-size: 13px; color: #efeaff; }
            .search-result-info p { margin: 2px 0 0 0; font-size: 11px; color: #b8a8ff; }
            .search-result-type { display: inline-block; margin-top: 4px; font-size: 10px; color: #9f8bff; text-transform: uppercase; letter-spacing: 0.5px; }
        `;
        document.head.appendChild(style);
    }

    let searchModal = document.getElementById('searchModal');
    if (!searchModal) {
        searchModal = document.createElement('div');
        searchModal.id = 'searchModal';
        searchModal.className = 'search-modal';
        searchModal.innerHTML = `
            <div class="search-overlay" id="searchOverlay"></div>
            <div class="search-panel">
                <div class="search-head">
                    <input id="searchInput" class="search-input" type="text" placeholder="Search across Project Skirk..." />
                    <button id="searchClose" class="search-close" type="button" aria-label="Close search">&times;</button>
                </div>
                <div id="searchResults" class="search-results">
                    <p class="search-placeholder">Start typing to search across the website.</p>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
    }

    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchResults = document.getElementById('searchResults');

    let charactersData = [];
    let weaponsData = [];
    let artifactsData = [];
    let inventoryData = [];
    const pageIndex = [
        { name: 'Home', description: 'Main page', link: 'index.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/home.webp' },
        { name: 'Characters', description: 'Character list', link: 'characters.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/characters.webp' },
        { name: 'Weapons', description: 'Weapon list', link: 'weapons.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/weapons.webp' },
        { name: 'Artifacts', description: 'Artifact sets', link: 'artifacts.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/artifacts.webp' },
        { name: 'Achievements', description: 'Achievements page', link: 'achievements.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/achievements.webp' },
        { name: 'Inventory', description: 'Items and materials', link: 'inventory.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/inventory.webp' },
        { name: 'Spiral Abyss', description: 'Endgame mode', link: 'abyss.html', type: 'page', image: 'icons/abyss.webp' },
        { name: 'Imaginarium Theater', description: 'Endgame mode', link: 'theater.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/theater.webp' },
        { name: 'Stygian Onslaught', description: 'Endgame mode', link: 'stygian.html', type: 'page', image: 'https://ik.imagekit.io/gukc1okbd/wishes.webp' }
    ];

    const openSearch = () => {
        searchModal.classList.add('open');
        if (searchInput) searchInput.focus();
    };

    const closeSearch = () => {
        searchModal.classList.remove('open');
        if (searchInput) searchInput.value = '';
        if (searchResults) {
            searchResults.innerHTML = '<p class="search-placeholder">Start typing to search across the website.</p>';
        }
    };

    searchBtn.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('open')) closeSearch();
    });

    Promise.all([
        fetch('characters.json').then(r => r.json()).catch(() => []),
        fetch('weapon_data.json').then(r => r.json()).catch(() => []),
        fetch('artifacts.json').then(r => r.json()).catch(() => []),
        fetch('inventory.json').then(r => r.json()).catch(() => [])
    ]).then(([chars, weaps, arts, inv]) => {
        charactersData = Array.isArray(chars) ? chars : [];
        weaponsData = Array.isArray(weaps) ? weaps : [];
        artifactsData = Array.isArray(arts) ? arts : [];
        inventoryData = Array.isArray(inv) ? inv : [];
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResults.innerHTML = '<p class="search-placeholder">Start typing to search across the website.</p>';
                return;
            }

            const results = [];

            charactersData
                .filter(c => (c.name || '').toLowerCase().includes(query) || (c.title || '').toLowerCase().includes(query))
                .slice(0, 8)
                .forEach(char => results.push({
                    type: 'character',
                    name: char.name || 'Character',
                    description: char.title || 'Character',
                    link: `character.html?id=${char.id}`,
                    image: char.image || 'https://ik.imagekit.io/gukc1okbd/characters.webp'
                }));

            weaponsData
                .filter(w => (w.name || '').toLowerCase().includes(query) || (w.type || '').toLowerCase().includes(query))
                .slice(0, 8)
                .forEach(weap => results.push({
                    type: 'weapon',
                    name: weap.name || 'Weapon',
                    description: weap.type || 'Weapon',
                    link: `weapon.html?id=${weap.id}`,
                    image: weap.weaponIcon ? `https://gi.yatta.moe/assets/UI/${weap.weaponIcon}.png` : 'https://ik.imagekit.io/gukc1okbd/weapons.webp'
                }));

            artifactsData
                .filter(a => (a.name || '').toLowerCase().includes(query))
                .slice(0, 8)
                .forEach(art => results.push({
                    type: 'artifact',
                    name: art.name || 'Artifact',
                    description: 'Artifact Set',
                    link: `artifact.html?id=${art.id}`,
                    image: art.icon ? `https://gi.yatta.moe/assets/UI/reliquary/${art.icon}.png?vh=2024123000` : 'https://ik.imagekit.io/gukc1okbd/artifacts.webp'
                }));

            inventoryData
                .filter(i => (i.name || '').toLowerCase().includes(query) || (i.category || '').toLowerCase().includes(query))
                .slice(0, 8)
                .forEach(item => results.push({
                    type: 'inventory',
                    name: item.name || 'Item',
                    description: item.category || 'Inventory Item',
                    link: `inventory-item.html?id=${item.id}`,
                    image: item.icon ? `https://gi.yatta.moe/assets/UI/${item.icon}.png` : 'https://ik.imagekit.io/gukc1okbd/inventory.webp'
                }));

            pageIndex
                .filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
                .slice(0, 8)
                .forEach(p => results.push(p));

            if (results.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">No results found.</p>';
                return;
            }

            searchResults.innerHTML = results.slice(0, 20).map(r => `
                <a href="${r.link}" class="search-result-item">
                    <div class="search-result-image">
                        <img src="${r.image}" alt="${r.name}" onerror="this.src='https://via.placeholder.com/42';">
                    </div>
                    <div class="search-result-info">
                        <h4>${r.name}</h4>
                        <p>${r.description}</p>
                        <span class="search-result-type">${r.type}</span>
                    </div>
                </a>
            `).join('');
        });
    }
}

// Initialize search on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

// Close sidebar when a link/button is clicked (delegated for dynamic sidebar content)
if (sidebar && hamburger) {
    sidebar.addEventListener("click", function(event) {
        if (!event.target.closest("a, button")) return;
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
        document.body.classList.remove("sidebar-open");
    });
}

// Close sidebar when clicking outside
document.addEventListener("click", function(event) {
    if (!sidebar || !hamburger) return;
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("open");
        document.body.classList.remove("sidebar-open");
    }
});

// Translation dictionary
const translations = {
    English: {
        'Home': 'Home',
        'Characters': 'Characters',
        'Weapons': 'Weapons',
        'Artifacts': 'Artifacts',
        'Achievements': 'Achievements',
        'Inventory': 'Inventory',
        'Enemy Creatures': 'Enemy Creatures',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Spiral Abyss',
        'Imaginarium Theater': 'Imaginarium Theater',
        'Stygian Onslaught': 'Stygian Onslaught',
        'Furnishings': 'Furnishings',
        'Furnishing Set': 'Furnishing Set',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Wonderland',
        'Miliastra Wonderland Set': 'Miliastra Wonderland Set',
        'Miliastra Wonderland Inventory': 'Miliastra Wonderland Inventory',
        'Search': 'Search',
        'Diff': 'Diff',
        'Character Wishes': 'Character Wishes',
        'Settings': 'Settings',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    French: {
        'Home': 'Accueil',
        'Characters': 'Personnages',
        'Weapons': 'Armes',
        'Artifacts': 'Artefacts',
        'Achievements': 'Réalisations',
        'Inventory': 'Inventaire',
        'Enemy Creatures': 'Créatures Ennemies',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Abysses Spiralés',
        'Imaginarium Theater': 'Théâtre Imaginarium',
        'Stygian Onslaught': 'Assaut Stygien',
        'Furnishings': 'Mobilier',
        'Furnishing Set': 'Ensemble Mobilier',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Pays des Merveilles',
        'Miliastra Wonderland Set': 'Ensemble Miliastra Pays des Merveilles',
        'Miliastra Wonderland Inventory': 'Inventaire Miliastra Pays des Merveilles',
        'Search': 'Rechercher',
        'Diff': 'Diff',
        'Character Wishes': 'VÅ“ux de Personnage',
        'Settings': 'Paramètres',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    German: {
        'Home': 'Startseite',
        'Characters': 'Charaktere',
        'Weapons': 'Waffen',
        'Artifacts': 'Artefakte',
        'Achievements': 'Erfolge',
        'Inventory': 'Inventar',
        'Enemy Creatures': 'Feindliche Kreaturen',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Spiralabgrund',
        'Imaginarium Theater': 'Imaginarium Theater',
        'Stygian Onslaught': 'Stygischer Ansturm',
        'Furnishings': 'Einrichtung',
        'Furnishing Set': 'Einrichtungssatz',
        'Miliastra': 'Miliastra',
        'Wonderland': 'Wunderland',
        'Miliastra Wonderland Set': 'Miliastra Wunderland Set',
        'Miliastra Wonderland Inventory': 'Miliastra Wunderland Inventar',
        'Search': 'Suchen',
        'Diff': 'Diff',
        'Character Wishes': 'Charakterwünsche',
        'Settings': 'Einstellungen',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    Spanish: {
        'Home': 'Inicio',
        'Characters': 'Personajes',
        'Weapons': 'Armas',
        'Artifacts': 'Artefactos',
        'Achievements': 'Logros',
        'Inventory': 'Inventario',
        'Enemy Creatures': 'Criaturas Enemigas',
        'Genius Invokation TCG': 'Genius Invokation TCG',
        'Spiral Abyss': 'Abismo Espiral',
        'Imaginarium Theater': 'Teatro Imaginarium',
        'Stygian Onslaught': 'Asalto Estigio',
        'Furnishings': 'Amueblado',
        'Furnishing Set': 'Conjunto de Amueblado',
        'Miliastra': 'Miliastra',
        'Wonderland': 'País de las Maravillas',
        'Miliastra Wonderland Set': 'Conjunto Miliastra País de las Maravillas',
        'Miliastra Wonderland Inventory': 'Inventario Miliastra País de las Maravillas',
        'Search': 'Buscar',
        'Diff': 'Diff',
        'Character Wishes': 'Deseos de Personajes',
        'Settings': 'Configuración',
        'PROJECT SKIRK': 'PROJECT SKIRK'
    },
    Chinese: {
        'Home': 'é¦–é¡µ',
        'Characters': 'è§’è‰²',
        'Weapons': 'æ­¦å™¨',
        'Artifacts': 'åœ£é—ç‰©',
        'Achievements': 'æˆå°±',
        'Inventory': 'èƒŒåŒ…',
        'Enemy Creatures': 'æ•Œäººç”Ÿç‰©',
        'Genius Invokation TCG': 'å¤©æ‰å¬å”¤å¡ç‰Œæ¸¸æˆ',
        'Spiral Abyss': 'æ·±å¢ƒèžºæ—‹',
        'Imaginarium Theater': 'æƒ³è±¡å‰§åœº',
        'Stygian Onslaught': 'å†¥æƒ³ä¹‹èŒµæ¢¦æ¸¸ä»™å¢ƒ',
        'Furnishings': 'å®¶å…·',
        'Furnishing Set': 'å®¶å…·å¥—è£…',
        'Miliastra': 'ç±³èŽ±ä¸ç‰¹æ‹‰',
        'Wonderland': 'ä»™å¢ƒ',
        'Miliastra Wonderland Set': 'ç±³èŽ±ä¸ç‰¹æ‹‰ä»™å¢ƒå¥—è£…',
        'Miliastra Wonderland Inventory': 'ç±³èŽ±ä¸ç‰¹æ‹‰ä»™å¢ƒèƒŒåŒ…',
        'Search': 'æœç´¢',
        'Diff': 'å¯¹æ¯”',
        'Character Wishes': 'è§’è‰²ç¥ˆæ„¿',
        'Settings': 'è®¾ç½®',
        'PROJECT SKIRK': 'å¤©å‘½è®¡åˆ’'
    },
    Japanese: {
        'Home': 'ãƒ›ãƒ¼ãƒ ',
        'Characters': 'ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼',
        'Weapons': 'æ­¦å™¨',
        'Artifacts': 'è–éºç‰©',
        'Achievements': 'å®Ÿç¸¾',
        'Inventory': 'ã‚¤ãƒ³ãƒ™ãƒ³ãƒˆãƒª',
        'Enemy Creatures': 'æ•µã®ç”Ÿãç‰©',
        'Genius Invokation TCG': 'ã‚¸ãƒ¼ãƒ‹ã‚¢ã‚¹ã‚¤ãƒ³ãƒ´ã‚©ã‚±ãƒ¼ã‚·ãƒ§ãƒ³ TCG',
        'Spiral Abyss': 'æ·±å¢ƒèžºæ—‹',
        'Imaginarium Theater': 'æƒ³åƒã‚·ã‚¢ã‚¿ãƒ¼',
        'Stygian Onslaught': 'ã‚¹ãƒ†ã‚£ã‚®ã‚¢ãƒ³ãƒ»ã‚ªãƒ³ã‚¹ãƒ­ãƒ¼ãƒˆ',
        'Furnishings': 'å®¶å…·',
        'Furnishing Set': 'å®¶å…·ã‚»ãƒƒãƒˆ',
        'Miliastra': 'ãƒŸãƒªã‚¢ã‚¹ãƒˆãƒ©',
        'Wonderland': 'ãƒ¯ãƒ³ãƒ€ãƒ¼ãƒ©ãƒ³ãƒ‰',
        'Miliastra Wonderland Set': 'ãƒŸãƒªã‚¢ã‚¹ãƒˆãƒ© ãƒ¯ãƒ³ãƒ€ãƒ¼ãƒ©ãƒ³ãƒ‰ ã‚»ãƒƒãƒˆ',
        'Miliastra Wonderland Inventory': 'ãƒŸãƒªã‚¢ã‚¹ãƒˆãƒ© ãƒ¯ãƒ³ãƒ€ãƒ¼ãƒ©ãƒ³ãƒ‰ ã‚¤ãƒ³ãƒ™ãƒ³ãƒˆãƒª',
        'Search': 'æ¤œç´¢',
        'Diff': 'å·®åˆ†',
        'Character Wishes': 'ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ã‚¦ã‚£ãƒƒã‚·ãƒ¥',
        'Settings': 'è¨­å®š',
        'PROJECT SKIRK': 'å¤©å‘½è¨ˆç”»'
    }
};

// Toggle a body class when pointer is near left edge for accessibility
document.addEventListener("mousemove", function(e) {
    if (e.clientX < 24) {
        document.documentElement.classList.add('sidebar-open');
    } else if (!sidebar.matches(':hover')) {
        document.documentElement.classList.remove('sidebar-open');
    }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.documentElement.classList.remove('sidebar-open');
});

// CHARACTER CARD IMAGE CYCLING
function initializeCharacterCardCycling() {
    const cardImg = document.getElementById('charactersCardImgBlurred');
    if (!cardImg) return;
    
    let characters = [];
    let currentCharIndex = 0;
    
    // Fetch characters data
    fetch('characters.json')
        .then(response => response.json())
        .then(data => {
            characters = data;
            if (characters.length > 0) {
                // Cycle through characters every 2 seconds
                setInterval(() => {
                    if (characters.length > 0) {
                        const character = characters[currentCharIndex];
                        // Fade out
                        cardImg.style.opacity = '0';
                        
                        setTimeout(() => {
                            cardImg.src = character.image;
                            // Fade in
                            cardImg.style.opacity = '0.6';
                        }, 250);
                        
                        currentCharIndex = (currentCharIndex + 1) % characters.length;
                    }
                }, 2000);
            }
        })
        .catch(error => console.error('Error loading characters:', error));
}

// WEAPONS AND ARTIFACTS CARD IMAGE CYCLING
function initializeCardFadeAnimation() {
    // Weapons card cycling
    const weaponsCardImg = document.getElementById('weaponsCardImg');
    if (weaponsCardImg) {
        let weapons = [];
        let currentWeaponIndex = 0;
        
        fetch('weapons.json')
            .then(response => response.json())
            .then(data => {
                weapons = data;
                if (weapons.length > 0) {
                    setInterval(() => {
                        if (weapons.length > 0) {
                            const weapon = weapons[currentWeaponIndex];
                            weaponsCardImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                weaponsCardImg.src = `https://gi.yatta.moe/assets/UI/${weapon.icon}.png`;
                                weaponsCardImg.style.opacity = '0.6';
                            }, 250);
                            
                            currentWeaponIndex = (currentWeaponIndex + 1) % weapons.length;
                        }
                    }, 2000);
                }
            })
            .catch(error => console.error('Error loading weapons:', error));
    }
    
    // Artifacts card cycling
    const artifactsCardImg = document.getElementById('artifactsCardImg');
    if (artifactsCardImg) {
        let artifacts = [];
        let currentArtifactIndex = 0;
        
        fetch('https://api.lunaris.moe/data/latest/artifactlist.json')
            .then(response => response.json())
            .then(data => {
                // Convert Lunaris API format to array
                artifacts = Object.values(data).filter(a => a.setIcon);
                if (artifacts.length > 0) {
                    setInterval(() => {
                        if (artifacts.length > 0) {
                            const artifact = artifacts[currentArtifactIndex];
                            artifactsCardImg.style.opacity = '0';
                            
                            setTimeout(() => {
                                artifactsCardImg.src = `https://gi.yatta.moe/assets/UI/reliquary/${artifact.setIcon}.png?vh=2024123000`;
                                artifactsCardImg.style.opacity = '0.6';
                            }, 250);
                            
                            currentArtifactIndex = (currentArtifactIndex + 1) % artifacts.length;
                        }
                    }, 2000);
                }
            })
            .catch(error => console.error('Error loading artifacts:', error));
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeCharacterCardCycling();
        initializeCardFadeAnimation();
    });
} else {
    initializeCharacterCardCycling();
    initializeCardFadeAnimation();
}

// SETTINGS MODAL
document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settingsBtn');
    const topSettingsBtn = document.getElementById('topSettingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeModalBtn = document.querySelector('.modal-close');

    // Sidebar settings button
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('open');
        });
    }

    // Top navbar settings button
    if (topSettingsBtn) {
        topSettingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('open');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            settingsModal.classList.remove('open');
        });
    }

    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('open');
            }
        });
    }

    // Load settings from localStorage
    loadSettings();

    // Apply loaded settings
    applyAllSettings();

    // Save button support
    const saveBtn = document.getElementById('saveSettingsBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveSettings();
            applyAllSettings();
        });
    }

    // Save settings when changed
    const selects = document.querySelectorAll('.settings-row select');
    const checkboxes = document.querySelectorAll('.settings-row input[type="checkbox"]');

    selects.forEach(select => {
        select.addEventListener('change', () => {
            saveSettings();
            applyAllSettings();
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveSettings();
            applyAllSettings();
        });
    });
});

function saveSettings() {
    const language = document.getElementById('language')?.value || 'English';
    const region = document.getElementById('region')?.value || 'Europe';
    const twin = document.getElementById('twin')?.value || 'Male';
    const displayStyle = document.getElementById('displayStyle')?.value || 'Slider';
    const defaultLvl = document.getElementById('defaultLvl')?.value || '1';
    const defaultLvlConstellation = document.getElementById('defaultLvlConstellation')?.value || 'None';
    const defaultDecimal = document.getElementById('defaultDecimal')?.value || 'Default';
    const addConstellations = document.getElementById('addConstellations')?.checked || false;
    const unreleased = document.getElementById('unreleased')?.value || 'Disable';

    const settings = {
        language,
        region,
        twin,
        displayStyle,
        defaultLvl,
        defaultLvlConstellation,
        defaultDecimal,
        addConstellations,
        unreleased
    };

    localStorage.setItem('projectSirkSettings', JSON.stringify(settings));
}

function loadSettings() {
    const stored = localStorage.getItem('projectSirkSettings');
    if (!stored) return;

    const settings = JSON.parse(stored);
    if (document.getElementById('language')) document.getElementById('language').value = settings.language;
    if (document.getElementById('region')) document.getElementById('region').value = settings.region;
    if (document.getElementById('twin')) document.getElementById('twin').value = settings.twin;
    if (document.getElementById('displayStyle')) document.getElementById('displayStyle').value = settings.displayStyle;
    if (document.getElementById('defaultLvl')) document.getElementById('defaultLvl').value = settings.defaultLvl;
    if (document.getElementById('defaultLvlConstellation')) document.getElementById('defaultLvlConstellation').value = settings.defaultLvlConstellation;
    if (document.getElementById('defaultDecimal')) document.getElementById('defaultDecimal').value = settings.defaultDecimal;
    if (document.getElementById('addConstellations')) document.getElementById('addConstellations').checked = settings.addConstellations;
    if (document.getElementById('unreleased')) document.getElementById('unreleased').value = settings.unreleased;
}

function applyAllSettings() {
    applyLanguage();
    applyRegionSettings();
    applyTwinSettings();
    applyDisplaySettings();
    applyUnreleasedContent();
}

function applyLanguage() {
    const language = document.getElementById('language')?.value || 'English';
    const dict = translations[language] || translations['English'];

    // Translate sidebar menu items
    document.querySelectorAll('.sidebar ul li a .text, .sidebar ul li button .text').forEach(el => {
        const originalText = el.textContent.trim();
        if (dict[originalText]) {
            el.textContent = dict[originalText];
        }
    });

    // Translate nav logo
    const navLogo = document.querySelector('nav .logo');
    if (navLogo && dict[navLogo.textContent.trim()]) {
        navLogo.textContent = dict[navLogo.textContent.trim()];
    }

    // Translate any element marked with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });
}

function applyRegionSettings() {
    const region = document.getElementById('region')?.value || 'Europe';
    document.documentElement.setAttribute('data-region', region);
    // Can be used for region-specific styling or content
}

function applyTwinSettings() {
    const twin = document.getElementById('twin')?.value || 'Male';
    document.documentElement.setAttribute('data-twin', twin);
    // Can be used for character pronouns or appearance
}

function applyDisplaySettings() {
    const displayStyle = document.getElementById('displayStyle')?.value || 'Slider';
    const defaultLvl = document.getElementById('defaultLvl')?.value || '1';
    const defaultDecimal = document.getElementById('defaultDecimal')?.value || 'Default';
    
    document.documentElement.setAttribute('data-display-style', displayStyle);
    document.documentElement.setAttribute('data-default-lvl', defaultLvl);
    document.documentElement.setAttribute('data-default-decimal', defaultDecimal);
}

function applyUnreleasedContent() {
    const unreleased = document.getElementById('unreleased')?.value || 'Disable';
    if (unreleased === 'Disable') {
        document.documentElement.setAttribute('data-unreleased', 'hidden');
    } else {
        document.documentElement.removeAttribute('data-unreleased');
    }
}

// -------------------- generic search support --------------------
const WEAPON_DASH_VALUES = new Set(['—', '-', 'none', 'null', '']);

function normalizeWeaponType(rawType) {
    const t = String(rawType || '').trim();
    if (!t) return '';
    const lower = t.toLowerCase();
    if (lower.includes('sword')) return 'Sword';
    if (lower.includes('claymore')) return 'Claymore';
    if (lower.includes('pole')) return 'Polearm';
    if (lower.includes('catalyst')) return 'Catalyst';
    if (lower.includes('bow')) return 'Bow';
    return t;
}

function normalizeStatValue(value) {
    const str = String(value ?? '').trim();
    return WEAPON_DASH_VALUES.has(str.toLowerCase()) ? '—' : str;
}

function normalizeWeaponStatLabel(rawLabel) {
    const label = normalizeStatValue(rawLabel);
    if (label === '—') return '—';
    const lower = label.toLowerCase();
    if (lower.includes('critical_hurt') || lower.includes('crit dmg')) return 'CRIT DMG';
    if (lower.includes('critical') || lower.includes('crit rate')) return 'CRIT Rate';
    if (lower.includes('charge') || lower.includes('energy')) return 'Energy Recharge';
    if (lower.includes('element') && lower.includes('master')) return 'Elemental Mastery';
    if (lower.includes('physical')) return 'Physical DMG Bonus';
    if (lower.includes('def')) return 'DEF';
    if (lower === 'hp' || lower.includes('hp_')) return 'HP';
    if (lower.includes('attack') || lower.includes('atk')) return 'ATK';
    return label;
}

function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function pickFirst(...values) {
    for (const value of values) {
        if (value !== undefined && value !== null && String(value).trim() !== '') {
            return value;
        }
    }
    return undefined;
}

function toNumber(value, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
}

function mapQualityToRarity(qualityType) {
    const q = String(qualityType || '').toUpperCase();
    if (q.includes('ORANGE') || q.includes('GOLD')) return 5;
    if (q.includes('PURPLE')) return 4;
    if (q.includes('BLUE')) return 3;
    if (q.includes('GREEN')) return 2;
    if (q.includes('WHITE')) return 1;
    return 3;
}

function extractAscensionSecondary(ascensionStats) {
    if (!ascensionStats || typeof ascensionStats !== 'object') {
        return { label: '—', value: '—' };
    }
    const entries = Object.entries(ascensionStats);
    const secondary = entries.find(([key, value]) => {
        const k = String(key || '').toLowerCase();
        const v = Number(value);
        return k !== 'atk' && k !== 'baseatk' && Number.isFinite(v) && v > 0;
    });
    if (!secondary) return { label: '—', value: '—' };

    const [labelRaw, valueRaw] = secondary;
    const valueNum = Number(valueRaw);
    const value = Number.isFinite(valueNum) ? `${valueNum}%` : normalizeStatValue(valueRaw);
    return {
        label: normalizeWeaponStatLabel(String(labelRaw).replace(/%/g, '')),
        value
    };
}

function normalizeWeaponRecord(raw) {
    if (!raw || typeof raw !== 'object') return null;

    const id = String(
        pickFirst(raw.id, raw.itemId, raw.weaponId, raw.weapon_id, raw.Id, raw._id) ?? ''
    );
    const name = String(
        pickFirst(raw.enName, raw.name, raw.title, raw.weaponName, raw.route, raw.englishName) ?? ''
    ).trim();
    const rarity = toNumber(
        pickFirst(raw.rarity, raw.rank, raw.star, raw.stars, mapQualityToRarity(raw.qualityType)),
        3
    );
    const type = normalizeWeaponType(
        pickFirst(raw.type, raw.weaponType, raw.weapon_type, raw.category, getNested(raw, 'weapon.type'))
    );

    const atk = toNumber(
        pickFirst(
            raw.atk,
            raw.baseAtk,
            raw.baseATK,
            raw.attack,
            raw.atk90,
            getNested(raw, 'ascensionStats.atk'),
            getNested(raw, 'stats.atk'),
            getNested(raw, 'stats.baseAtk'),
            getNested(raw, 'baseStats.atk')
        ),
        0
    );

    const ascensionSecondary = extractAscensionSecondary(raw.ascensionStats);

    const secondaryStatRaw = pickFirst(
        raw.secondaryStat,
        raw.subStatValue,
        raw.substatValue,
        raw.statValue,
        ascensionSecondary.value,
        getNested(raw, 'stats.secondaryStat'),
        getNested(raw, 'baseStats.subStatValue')
    );

    const secondaryLabelRaw = pickFirst(
        raw.secondaryLabel,
        raw.subStatType,
        raw.substatType,
        raw.specialProp,
        raw.statType,
        ascensionSecondary.label,
        getNested(raw, 'stats.secondaryLabel'),
        getNested(raw, 'baseStats.subStatType')
    );

    return {
        id,
        name: name || `Weapon ${id || ''}`.trim(),
        type,
        rarity: Math.max(1, Math.min(5, rarity || 3)),
        icon: String(
            pickFirst(raw.weaponIcon, raw.icon, raw.iconName, raw.iconname, raw.image, raw.avatar) ?? ''
        ).trim(),
        atk,
        secondaryStat: normalizeStatValue(secondaryStatRaw),
        secondaryLabel: normalizeWeaponStatLabel(secondaryLabelRaw)
    };
}

function normalizeWeaponDataset(data) {
    let records = [];
    if (Array.isArray(data)) {
        records = data;
    } else if (Array.isArray(data?.weapons)) {
        records = data.weapons;
    } else if (data?.weapons && typeof data.weapons === 'object') {
        records = Object.entries(data.weapons).map(([id, record]) => ({ ...record, id: record?.id ?? id }));
    } else if (data && typeof data === 'object') {
        records = Object.entries(data).map(([id, record]) => ({ ...record, id: record?.id ?? id }));
    }

    return records
        .map(normalizeWeaponRecord)
        .filter(item => item && item.name && item.atk > 0);
}

function normalizeKey(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

function resolveMaterialIconName(entry, key) {
    return pickFirst(
        entry?.icon,
        entry?.iconName,
        entry?.iconname,
        entry?.sideIcon,
        entry?.sideicon,
        entry?.image,
        entry?.filename,
        entry?.fileName,
        key
    );
}

function buildYattaIconUrl(iconName) {
    const raw = String(iconName || '').trim();
    if (!raw) return '';
    if (/^https?:\/\//i.test(raw)) return raw;
    if (raw.endsWith('.png')) {
        const noExt = raw.replace(/\.png$/i, '');
        if (noExt.includes('/')) {
            return `https://gi.yatta.moe/assets/${noExt}.png`;
        }
        return `https://gi.yatta.moe/assets/UI/${noExt}.png`;
    }
    if (raw.includes('/')) {
        return `https://gi.yatta.moe/assets/${raw}.png`;
    }
    return `https://gi.yatta.moe/assets/UI/${raw}.png`;
}

async function loadWeaponIconMapFromMaterialApi() {
    try {
        const res = await fetch('https://api.lunaris.moe/data/6.4.51/materiallist.json');
        if (!res.ok) return { byId: new Map(), byName: new Map() };
        const data = await res.json();
        const byId = new Map();
        const byName = new Map();
        const entries = Object.entries(data || {});

        for (const [key, value] of entries) {
            const entry = value && typeof value === 'object' ? value : {};
            const iconName = resolveMaterialIconName(entry, key);
            const iconUrl = buildYattaIconUrl(iconName);
            if (!iconUrl) continue;

            const idKey = String(pickFirst(entry.id, entry.itemId, key) ?? '').trim();
            if (idKey) byId.set(idKey, iconUrl);

            const nameKey = normalizeKey(pickFirst(entry.name, entry.title, entry.route));
            if (nameKey) byName.set(nameKey, iconUrl);
        }

        return { byId, byName };
    } catch (error) {
        console.warn('Failed to load material icons API, using weapon icon fallback.', error);
        return { byId: new Map(), byName: new Map() };
    }
}

function applyWeaponIcons(weapons, iconMap) {
    return weapons.map(weapon => {
        const dataIcon = buildYattaIconUrl(weapon.icon);
        const idIcon = iconMap.byId.get(String(weapon.id || ''));
        const nameIcon = iconMap.byName.get(normalizeKey(weapon.name));
        const fallbackIcon = buildYattaIconUrl(weapon.name);
        return {
            ...weapon,
            // Prefer icon explicitly provided by weapon_data.json (weaponIcon).
            // Fall back to Lunaris mapping only when missing.
            iconUrl: dataIcon || idIcon || nameIcon || fallbackIcon
        };
    });
}

async function loadWeaponsForPage(primaryUrl) {
    const urls = [primaryUrl, 'weapons.json'].filter((value, idx, arr) => value && arr.indexOf(value) === idx);
    let parsed = [];

    for (const source of urls) {
        try {
            const res = await fetch(source);
            if (!res.ok) continue;
            const data = await res.json();
            const normalized = normalizeWeaponDataset(data);
            if (normalized.length > 0) {
                parsed = normalized;
                break;
            }
        } catch (error) {
            console.warn(`Failed loading weapon dataset from ${source}`, error);
        }
    }

    if (parsed.length === 0) return [];

    const iconMap = await loadWeaponIconMapFromMaterialApi();
    return applyWeaponIcons(parsed, iconMap);
}

function initializePageSearch() {
    const input = document.getElementById('pageSearchInput');
    const results = document.getElementById('pageSearchResults');
    if (!input || !results) return;
    const url = results.dataset.source;
    let items = [];
    
    // Filter state
    let activeFilters = {
        rarity: 'all',
        type: 'all',
        stat: 'all'
    };

    const makeSvgIcon = (svgBody) =>
        `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${svgBody}</svg>`)}`;

    const statIconMap = {
        ATK: makeSvgIcon("<path d='M14 3l7 7'/><path d='M13 4l-9 9'/><path d='M3 21l6-6'/><path d='M13 4l7 7'/>"),
        "CRIT Rate": makeSvgIcon("<circle cx='12' cy='12' r='8'/><circle cx='12' cy='12' r='3'/>"),
        "CRIT DMG": makeSvgIcon("<path d='M12 2l2.8 5.7L21 9l-4.5 4.4L17.6 20 12 17l-5.6 3 1.1-6.6L3 9l6.2-1.3L12 2z'/>"),
        "Energy Recharge": makeSvgIcon("<path d='M13 2L4 14h6l-1 8 9-12h-6l1-8z'/>"),
        "Elemental Mastery": makeSvgIcon("<path d='M12 3l2.5 5 5.5.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.5-.8L12 3z'/>"),
        DEF: makeSvgIcon("<path d='M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z'/>"),
        HP: makeSvgIcon("<path d='M12 21s-7-4.4-9-9a5.5 5.5 0 019.4-4A5.5 5.5 0 0121 12c-2 4.6-9 9-9 9z'/>"),
        "Physical DMG Bonus": makeSvgIcon("<path d='M4 20l16-16'/><path d='M9 4h11v11'/>")
    };

    const getStatIcon = (label) => {
        const normalized = normalizeWeaponStatLabel(label);
        return statIconMap[normalized] || statIconMap.ATK;
    };

    const renderCard = (item) => {
        const card = document.createElement('div');
        
        if (url === 'weapons.json' || url === 'weapon_data.json') {
            // Weapon card
            card.className = `weapon-card rarity-${item.rarity || 3}`;
            card.style.cursor = 'pointer';
            const typeIconMap = {
                Sword: 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Sword.png',
                Claymore: 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Claymore.png',
                Polearm: 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Pole.png',
                Catalyst: 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Catalyst.png',
                Bow: 'https://ik.imagekit.io/gukc1okbd/UI_GachaTypeIcon_Bow.png'
            };
            const typeIcon = typeIconMap[item.type] || 'https://ik.imagekit.io/gukc1okbd/weapons.webp';
            
            // Use API-resolved icon first, then fallback icon
            const iconUrl = item.iconUrl || buildYattaIconUrl(item.icon || item.name || 'weapon');
            
            card.innerHTML = `
                <div class="weapon-image-container">
                    <img src="${iconUrl}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2250%22 y=%2250%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="weapon-info">
                    <div class="weapon-name">${item.name || 'Unknown Weapon'}</div>
                    <div class="weapon-stats">
                        <div class="weapon-stat-row">
                            <span class="weapon-stat-label" style="display:flex;align-items:center;gap:4px;">
                                <img src="${getStatIcon('ATK')}" alt="ATK" style="width:12px;height:12px;object-fit:contain;opacity:.9;">
                                <strong>ATK</strong>
                            </span>
                            <span class="weapon-stat-value">${item.atk || 0}</span>
                        </div>
                        ${item.secondaryStat && normalizeStatValue(item.secondaryStat) !== '—' ? `<div class="weapon-stat-row">
                            <span class="weapon-stat-label" style="display:flex;align-items:center;gap:4px;color:#ddd;font-size:9px;min-width:fit-content;">
                              <img src="${getStatIcon(item.secondaryLabel || 'ATK')}" alt="${item.secondaryLabel || 'Substat'}" style="width:12px;height:12px;object-fit:contain;opacity:.9;">
                              ${item.secondaryLabel || 'Substat'}
                            </span>
                            <span class="weapon-stat-value" style="flex: 1; text-align: right;">${item.secondaryStat}</span>
                        </div>` : ''}
                        ${item.type ? `<div class="weapon-stat-row" style="color: #aaa; font-size: 9px; margin-top: 4px; justify-content:flex-start; gap:4px;">
                            <img src="${typeIcon}" alt="${item.type}" style="width:12px;height:12px;object-fit:contain;">
                            <span>${item.type}</span>
                        </div>` : ''}
                    </div>
                </div>
            `;
            
            // Add click handler to navigate to weapon detail page
            card.addEventListener('click', () => {
                window.location.href = `weapon.html?id=${item.id}`;
            });
        } else if (url === 'artifacts.json') {
            // Artifact card
            card.className = `artifact-card rarity-${item.rarity || 3}`;
            card.style.cursor = 'pointer';
            
            // Get icon URL with proper formatting - use new Lunaris API path
            const iconName = item.icon || item.name || 'artifact';
            const iconUrl = `https://gi.yatta.moe/assets/UI/reliquary/${iconName}.png?vh=2024123000`;
            
            // Generate rarity stars
            const rarityStars = '★'.repeat(item.rarity || 3);
            
            card.innerHTML = `
                <div class="artifact-image-container">
                    <img src="${iconUrl}" alt="${item.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23333%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2250%22 y=%2250%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="artifact-info">
                    <div class="artifact-name">${item.name || 'Unknown Artifact'}</div>
                    <div class="artifact-rarity">${rarityStars}</div>
                </div>
            `;
            
            // Add click handler to navigate to artifact detail page
            card.addEventListener('click', () => {
                window.location.href = `artifact.html?id=${item.id}`;
            });
        } else if (url === 'inventory.json') {
            // Inventory/Material card
            const rankColor = [
                '#888',   // rank 1
                '#4a9eff', // rank 2 (blue)
                '#00d4ff', // rank 3 (cyan)
                '#b291dc', // rank 4 (purple)
                '#ffc107'  // rank 5 (gold)
            ][item.rank - 1] || '#888';
            
            card.className = 'inventory-card';
            card.style.cursor = 'pointer';
            card.style.padding = '12px';
            card.style.background = `linear-gradient(135deg, rgba(100,100,255,0.08) 0%, rgba(200,150,255,0.08) 100%)`;
            card.style.border = `2px solid ${rankColor}`;
            card.style.borderRadius = '8px';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.alignItems = 'center';
            card.style.gap = '8px';
            card.style.transition = 'all 0.3s ease';
            card.style.minHeight = '140px';
            card.style.justifyContent = 'center';
            
            const iconUrl = `https://gi.yatta.moe/assets/UI/${item.icon}.png`;
            
            card.innerHTML = `
                <div style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                    <img src="${iconUrl}" alt="${item.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%2260%22 height=%2260%22/%3E%3Ctext fill=%22%23666%22 text-anchor=%22middle%22 x=%2230%22 y=%2235%22%3E?%3C/text%3E%3C/svg%3E'">
                </div>
                <div style="text-align: center; width: 100%;">
                    <div style="font-size: 12px; color: #999; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">${item.category}</div>
                    <div style="font-size: 13px; font-weight: 600; color: #fff; line-height: 1.2;">${item.name || 'Unknown Item'}</div>
                </div>
                <div style="display: flex; gap: 3px; font-size: 11px;">
                    ${Array(item.rank || 1).fill('★').map((s, i) => `<span style="color: ${rankColor};">${s}</span>`).join('')}
                </div>
            `;
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = `0 8px 20px ${rankColor}40`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
            
            // Click handler to navigate to item page
            card.addEventListener('click', () => {
                window.location.href = `inventory-item.html?id=${item.id}`;
            });
        } else {
            // Fallback for other item types
            card.className = 'card';
            card.style.padding = '14px';
            card.style.minHeight = '80px';
            card.style.display = 'flex';
            card.style.alignItems = 'center';
            card.style.justifyContent = 'center';
            card.innerText = item.name || '(unnamed)';
        }
        
        return card;
    };

    const applyFilters = (list) => {
        return list.filter(item => {
            // Rarity filter
            const itemRarity = item.rarity ?? item.rank;
            if (activeFilters.rarity !== 'all' && String(itemRarity) !== String(activeFilters.rarity)) {
                return false;
            }
            
            // Type filter
            if (activeFilters.type !== 'all' && item.type !== activeFilters.type) {
                return false;
            }
            
            // Special stat filter
            if (activeFilters.stat !== 'all' && normalizeWeaponStatLabel(item.secondaryLabel) !== normalizeWeaponStatLabel(activeFilters.stat)) {
                return false;
            }
            
            return true;
        });
    };

    const render = (list) => {
        results.innerHTML = '';
        if (!list || list.length === 0) {
            results.innerHTML = '<p style="grid-column:1/-1;text-align:center;opacity:0.6">No items found.</p>';
            return;
        }
        list.forEach(i => {
            results.appendChild(renderCard(i));
        });
    };

    const updateDisplay = () => {
        const term = input.value.trim().toLowerCase();
        let filtered = items.filter(i => (i.name || '').toLowerCase().includes(term));
        filtered = applyFilters(filtered);
        render(filtered);
    };

    const loadItems = async () => {
        try {
            if (url === 'weapons.json' || url === 'weapon_data.json') {
                items = await loadWeaponsForPage(url);
            } else {
                const response = await fetch(url);
                const data = await response.json();
                items = data || [];
                if (url === 'artifacts.json' && Array.isArray(items)) {
                    items = [...items].sort((a, b) => {
                        const aSort = Number(a?.sortOrder ?? a?.rawData?.sortOrder ?? -1);
                        const bSort = Number(b?.sortOrder ?? b?.rawData?.sortOrder ?? -1);
                        if (bSort !== aSort) return bSort - aSort;
                        return Number(b?.id ?? 0) - Number(a?.id ?? 0);
                    });
                }
            }
            render(items);
        } catch (err) {
            console.error('Search data load failed', err);
            results.innerHTML = '';
        }
    };

    loadItems();

    input.addEventListener('input', updateDisplay);

    // Handle filter button clicks
    if (url === 'weapons.json' || url === 'weapon_data.json' || url === 'artifacts.json' || url === 'inventory.json') {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                const filterValue = this.dataset.value;
                
                // Update active state
                document.querySelectorAll(`.filter-btn[data-filter="${filterType}"]`).forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update filter state
                activeFilters[filterType] = filterValue;
                
                // Re-render
                updateDisplay();
            });
        });
    }
}

function initializeTopNavEndgame() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    if (!document.getElementById('endgamePopupStyles')) {
        const style = document.createElement('style');
        style.id = 'endgamePopupStyles';
        style.textContent = `
            .nav-endgame-btn {
                background: none;
                border: none;
                color: #b8a8ff;
                font-size: 14px;
                font-weight: 500;
                font-family: inherit;
                line-height: 1;
                cursor: pointer;
                padding: 0;
                margin: 0;
                height: 24px;
                display: flex;
                align-items: center;
                border-bottom: 2px solid transparent;
                transition: 0.3s;
            }
            .nav-endgame-btn:hover { color: #7c5cff; border-bottom-color: #7c5cff; }
            .endgame-popup {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.55);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 16px;
            }
            .endgame-popup.open { display: flex; }
            .endgame-popup-card {
                width: min(420px, 100%);
                background: rgba(20,16,34,0.97);
                border: 1px solid rgba(124,92,255,0.45);
                border-radius: 12px;
                box-shadow: 0 16px 36px rgba(0,0,0,0.4);
                padding: 12px;
            }
            .endgame-popup-head {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid rgba(124,92,255,0.25);
            }
            .endgame-popup-title {
                font-size: 12px;
                color: #d9ccff;
                font-weight: 700;
                letter-spacing: 0.6px;
                text-transform: uppercase;
            }
            .endgame-popup-close {
                width: 26px;
                height: 26px;
                border-radius: 8px;
                border: 1px solid rgba(124,92,255,0.65);
                background: linear-gradient(135deg,rgba(124,92,255,0.34),rgba(124,92,255,0.16));
                color: #efeaff;
                cursor: pointer;
                font-size: 16px;
                font-weight: 700;
            }
            .endgame-link {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                padding: 10px 12px;
                margin-bottom: 8px;
                text-decoration: none;
                color: #fff;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 8px;
                transition: 0.2s ease;
            }
            .endgame-link:last-child { margin-bottom: 0; }
            .endgame-link:hover {
                background: rgba(124,92,255,0.18);
                border-color: rgba(124,92,255,0.5);
            }
            .endgame-link img {
                width: 20px;
                height: 20px;
                object-fit: contain;
                flex: 0 0 20px;
            }
        `;
        document.head.appendChild(style);
    }

    let endgameBtn = navLinks.querySelector('#endgameNavBtn');
    if (!endgameBtn) {
        return;
    }

    let popup = document.getElementById('endgamePopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'endgamePopup';
        popup.className = 'endgame-popup';
        popup.innerHTML = `
            <div class="endgame-popup-card" role="dialog" aria-modal="true" aria-label="Endgame">
                <div class="endgame-popup-head">
                    <div class="endgame-popup-title">Endgame</div>
                    <button type="button" class="endgame-popup-close" id="endgamePopupClose">&times;</button>
                </div>
                <a class="endgame-link" href="abyss.html">
                    <img src="icons/abyss.webp" alt="Spiral Abyss">
                    <span>Spiral Abyss</span>
                </a>
                <a class="endgame-link" href="theater.html">
                    <img src="https://ik.imagekit.io/gukc1okbd/theater.webp" alt="Imaginarium Theater">
                    <span>Imaginarium Theater</span>
                </a>
                <a class="endgame-link" href="stygian.html">
                    <img src="https://ik.imagekit.io/gukc1okbd/wishes.webp" alt="Stygian Onslaught">
                    <span>Stygian Onslaught</span>
                </a>
            </div>
        `;
        document.body.appendChild(popup);
    }

    const closePopup = () => popup.classList.remove('open');
    const openPopup = () => popup.classList.add('open');
    const closeBtn = popup.querySelector('#endgamePopupClose');

    endgameBtn.addEventListener('click', openPopup);
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('open')) closePopup();
    });
}

function initializeAdaptiveTopNav() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    if (!nav || !navLinks) return;

    const updateNavMode = () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            nav.classList.remove('compact-nav');
            return;
        }

        const overflows = navLinks.scrollWidth > navLinks.clientWidth + 1;
        nav.classList.toggle('compact-nav', overflows);
    };

    updateNavMode();
    window.addEventListener('resize', updateNavMode);
}

document.addEventListener('DOMContentLoaded', initializePageSearch);
document.addEventListener('DOMContentLoaded', initializeTopNavEndgame);
document.addEventListener('DOMContentLoaded', initializeAdaptiveTopNav);



