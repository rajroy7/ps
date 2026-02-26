document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('characters');
  if (!container) return;

  fetch('characters.json')
    .then(r => r.json())
    .then(data => renderCharacters(data, container))
    .catch(err => {
      container.innerText = 'Failed to load characters.';
      console.error(err);
    });
});

function renderCharacters(chars, container) {
  container.innerHTML = '';
  chars.forEach(c => {
    const card = document.createElement('div');
    card.className = 'char-card';

    const img = document.createElement('img');
    img.src = c.image || 'https://via.placeholder.com/220x140?text=No+Image';
    img.alt = c.name;

    const title = document.createElement('h3');
    title.style.margin = '0 0 6px 0';
    title.innerText = c.name;

    const meta = document.createElement('div');
    meta.className = 'char-meta';
    meta.innerText = `${c.vision} • ${c.weapon} • ${c.rarity}★`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(meta);
    container.appendChild(card);
  });
}
