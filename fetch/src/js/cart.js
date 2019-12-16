import Storage from './storageHelper';

export const getCartValue = () => {
	const label = document.querySelector('.cart__label');
	const cartValue = Storage.get('cart');

	if (!cartValue || !Object.keys(cartValue).length) {
		label.innerText = 0;
		return {};
	}

	label.innerText = Object.values(cartValue).reduce((acc, cur) => +acc + +cur);

	return cartValue;
}

export const getCartItems = (cartValue, products) => {
	return Object.keys(cartValue).map(id => {
		return products.filter(product => {
			if (product.id == id) {
				product.total = cartValue[id];
				return product;
			}
		})[0];
	});
}

export const addToCartHandler = (target) => {
	const cart = getCartValue();
	const productId = target.getAttribute('data-id');
	const productsList = Storage.get('products');
	const chosenProduct = productsList.filter(element => element.id == productId)[0];

	if (cart[chosenProduct.id]) {
		cart[chosenProduct.id]++
	} else {
		cart[chosenProduct.id] = 1;
	}

	Storage.set('cart', cart);
	getCartValue();
}

export const removeFromCartHandler = (target) => {
	const cart = getCartValue();
	const productId = target.getAttribute('data-id');
	const productsList = Storage.get('products');
	const chosenProduct = productsList.filter(element => element.id == productId)[0];

	if (cart[chosenProduct.id] && cart[chosenProduct.id] > 0) {
		cart[chosenProduct.id]--
	} else {
		cart[chosenProduct.id] = 0;
	}

	Storage.set('cart', cart);
	getCartValue();
}

export const changeProductQuantity = (target) => {
	const newQuantity = +target.value < 1 ? 1 : +target.value;
	const productId = target.attributes['data-id'].value;
	const cart = getCartValue();
	const productsList = Storage.get('products');
	const chosenProduct = productsList.filter(element => element.id == productId)[0];

	if (cart[chosenProduct.id]) {
		cart[chosenProduct.id] = newQuantity;
	}

	Storage.set('cart', cart);
	getCartValue();
}

export const removeProductFromCart = (target) => {
	const cart = getCartValue();
	const productId = target.getAttribute('data-id');

	delete cart[productId];

	Storage.set('cart', cart);
}

export const getTotalSum = () => {
	return getCartItems(getCartValue(), Storage.get('products'))
			.map(product => +product.price * +product.total)
			.reduce((acc, cur) => acc + cur);
}