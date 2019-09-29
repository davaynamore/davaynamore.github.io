const btn = document.querySelector('.cahee__btn');
const blog = document.querySelector('.blog');


btn.addEventListener('click', () => {
	blog.classList.toggle('bg_green');
})