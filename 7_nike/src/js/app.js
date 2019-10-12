const colorLabels = document.querySelectorAll('[data-color]');
const image = document.querySelector('.card__img');

document.addEventListener('click', (e) => {
	const target = e.target;
	if(!target.getAttribute('data-color')) return;
	const color = target.getAttribute('data-color');
	image.setAttribute('src', `img/${color}.png`);
});