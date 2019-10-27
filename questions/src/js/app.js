const form = document.forms['my-form'];

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const arr = Array.from(event.target.elements).map((el) => {
		if(el.value || el.value !== 'Submit') {
			return el.value;
		}
	})

	console.log(arr);
});