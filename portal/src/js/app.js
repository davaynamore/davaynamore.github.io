import multiply, { sum } from './functions.js';
import user, { sergey, vova } from './objects.js'

// console.log(myVar);
// console.log(myVar_2);

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
});


var myVar = 5;

let myVar_2 = 6;



// console.log(multiply(5, 3));

// console.log(sum(5, 3));

// console.log(user.getAge());

// console.log(sergey.getAge());
// console.log(vova.getAge());

for (let prop in sergey) {
	console.log(prop);
	console.log(sergey[prop]);
}

[
	{
		id: '2',
		category: 'soft',
		key4: 'value'
	},
	{
		id: '2',
		category: 'hard',
		key4: 'value'
	},
	{
		id: '2',
		category: 'soft',
		key4: 'value'
	},
]