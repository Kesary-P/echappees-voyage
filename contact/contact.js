const form = document.querySelector('#contact-form');
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name').trim();
  form.querySelector('p:last-child').textContent = `Merci ${name}, votre message a bien été préparé.`;
  form.reset();
});
