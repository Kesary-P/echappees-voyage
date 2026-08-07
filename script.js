const filters = document.querySelectorAll('[data-filter]');
const cards = [...document.querySelectorAll('.destinations article')];
const emptyState = document.querySelector('#empty-state');

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  let visible = 0;
  cards.forEach((card) => {
    const matches = filter === 'all' || card.dataset.category.split(' ').includes(filter);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  emptyState.hidden = visible > 0;
}));

const savedFavorites = new Set(JSON.parse(localStorage.getItem('echappees-favorites') || '[]'));
document.querySelectorAll('[data-favorite]').forEach((button) => {
  const card = button.closest('article');
  const name = card.dataset.name;
  const render = () => {
    const active = savedFavorites.has(name);
    button.classList.toggle('is-favorite', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? '♥' : '♡';
    button.setAttribute('aria-label', `${active ? 'Retirer' : 'Ajouter'} ${name} ${active ? 'des' : 'aux'} favoris`);
  };
  render();
  button.addEventListener('click', () => {
    savedFavorites.has(name) ? savedFavorites.delete(name) : savedFavorites.add(name);
    localStorage.setItem('echappees-favorites', JSON.stringify([...savedFavorites]));
    render();
  });
});

document.querySelector('#surprise-button').addEventListener('click', () => {
  const visibleCards = cards.filter((card) => !card.hidden);
  const card = visibleCards[Math.floor(Math.random() * visibleCards.length)];
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.animate([{ transform: 'translateY(-7px) scale(1)' }, { transform: 'translateY(-7px) scale(1.025)' }, { transform: 'translateY(-7px) scale(1)' }], { duration: 800 });
});

const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const dialog = document.querySelector('#planner-dialog');
document.querySelectorAll('[data-open-planner]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
dialog.querySelector(':scope > button:first-child').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector('#trip-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  event.currentTarget.querySelector('p:last-child').textContent = `Ton carnet pour ${data.get('destination')} est prêt à être imaginé !`;
});
