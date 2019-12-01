$(".contacts-nav__link").hover(function(event){
	$(this).popover("toggle");
});

const cards = document.querySelectorAll('.about__card-text');

Array.from(cards).forEach((card) => {
	const substr = card.outerText.substring(0, 399) + '…';
	card.innerText = substr;
});

const filterBtns = document.querySelectorAll('.projects__filter-btn');

document.addEventListener('click', (event) => {
	const target = event.target;
	if (!target.classList.contains('projects__filter-btn')) return;

	Array.from(filterBtns).forEach((btn) => {
		if (btn.classList.contains('current')) {
			btn.classList.remove('current');
		}
	});

	target.classList.toggle('current');
})