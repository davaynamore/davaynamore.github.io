import { getCartItems } from './cart';

const modal = document.querySelector('.modal');

export const modalOpenHandler = () => {
	modal.classList.add('open');
}

export const modalCloseHandler = () => {
	modal.classList.remove('open');
}

