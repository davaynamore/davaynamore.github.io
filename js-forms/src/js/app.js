// 0 - 12 - baby
// 13 - 18 - teen
// 19 - 60 - adult
// 61 - 100 - pens

// DOM

console.log('string' + 'uppercase');

// String - 'string' + 1 // '2' + 2 = '22' // '2' - 2 = 0 //
// Number - 
// Boolean - true / false
// Undefined
// Object
// Function

const form = document.querySelector('.form');
const answer = document.querySelector('.answer');

function handelSubmit(event) {
	event.preventDefault();

	const data = {};

	for(let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].name === 'submit') {
			continue;
		}
		data[form.elements[i].name] = form.elements[i].value;
	}

	// Array.from(form.elements).forEach(el => {
	// 	if (el.name !== 'submit') return data[el.name] = el.value;
	// });

	function getStatus(age) {

		if (age < 0 ||  age > 150) {
			return 'Incorrect value';
		}

		if (age > 0 && age <= 12) {
			return 'baby';
		} else if (age >= 13 && age <= 18) {
			return 'teen';
		} else if (age >= 19 && age <= 60) {
			return 'adult';
		} else {
			return 'pens';
		}
	}

	answer.innerText = `${data.name} ${data.secname} is ${getStatus(+data.age)}`;
}

form.addEventListener('submit', handelSubmit);


const palindromForm = document.createElement('form');
palindromForm.classList.add('palindrom-form');
document.body.appendChild(palindromForm);

const palindromInput = document.createElement('input');
const palindromSubmit = document.createElement('input');
const palindromAnswer = document.createElement('p');
palindromAnswer.classList.add('palindrom-form__answer');
palindromInput.setAttribute('name', 'number');
palindromInput.classList.add('palindrom-form__input');
palindromSubmit.setAttribute('type', 'submit');
palindromSubmit.classList.add('palindrom-form__submit');
palindromSubmit.setAttribute('value', 'Submit');
palindromForm.appendChild(palindromInput);
palindromForm.appendChild(palindromSubmit);
palindromForm.appendChild(palindromAnswer);

palindromForm.addEventListener('submit', function(event) {
	event.preventDefault();

	if (palindromInput.value.length !== 5) {
		palindromAnswer.innerText = 'Введите пятизначное число';
		return;
	}

	const isPalindrom = palindromInput.value.split('').reverse().join('') === palindromInput.value;

	//palindromAnswer.innerText = isPalindrom ? 'Палиндром' : 'Не палиндром';

	// if (isPalindrom === true) {
	// 	palindromAnswer.innerText = 'Палиндром';
	// } else if (isPalindrom === false) {
	// 	palindromAnswer.innerText = 'Не палиндром';
	// }

	if (isPalindrom) {
		palindromAnswer.innerText = 'Палиндром';
	} else {
		palindromAnswer.innerText = 'Не палиндром';
	}


});