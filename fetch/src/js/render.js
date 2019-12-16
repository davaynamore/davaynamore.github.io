import { getTotalSum } from './cart';

const generateElement = (tagName, className = '') => {
	const el = document.createElement(tagName);
	if (className) {
		el.classList.add(className);
	}

	return el;
}

const insertElementIntoParent = (elements, parentElement) => {
	elements.forEach(element => {
		parentElement.appendChild(element);
	})
}

const createProductItem = ({ currency, description, id, img_url, price, title }) => {

	const col = generateElement('div', 'col-4');
	const productGrid = generateElement('div', 'product-grid');
	const productImageWrap = generateElement('div', 'product-image');
	const imageWrapper = generateElement('div', 'image-wrapper');
	const productImage = generateElement('img', 'pic-1');
	const productNewLabel = generateElement('span', 'product-new-label');
	const productDiscountLabel = generateElement('span', 'product-discount-label');
	const productDescription = generateElement('p', 'product-description');
	const productContent = generateElement('div', 'product-content');
	const productTitle = generateElement('h3', 'title');
	const productPrice = generateElement('div', 'price');
	const addToCart = generateElement('button', 'add-to-cart');

	productNewLabel.innerText = 'Sale';
	addToCart.innerText = '+ Add To Cart';
	productDiscountLabel.innerText = '20%';

	productImage.setAttribute('src', img_url);
	addToCart.setAttribute('data-id', id);
	addToCart.classList.add('btn');
	addToCart.classList.add('btn-success');
	productTitle.innerText = title;
	productPrice.innerText = currency + price;

	col.appendChild(productGrid);
	imageWrapper.appendChild(productImage);

	const wrappedGrid = [productImageWrap, productDescription, productContent];
	const wrappedImageWrap = [imageWrapper, productNewLabel, productDiscountLabel];
	const wrappedContent = [productTitle, productPrice, addToCart];

	insertElementIntoParent(wrappedGrid, productGrid);
	insertElementIntoParent(wrappedImageWrap, productImageWrap);
	insertElementIntoParent(wrappedContent, productContent);

	return col;
}

const createCartItem = ({ id, title, img_url, price, currency, total }) => {

	const listItem = generateElement('li');
	const productItem = generateElement('div', 'cart-list__item');
	const productArticul = generateElement('input');
	const imgWrapper = generateElement('div', 'cart-list__img-wrapper');
	const productImg = generateElement('img', 'cart-list__item-img');
	const productTitle = generateElement('h4', 'cart-list__item-title');
	const productPrice = generateElement('span', 'cart-list__item-price');
	const productQuantity = generateElement('input', 'cart-list__item-quantity');
	const productTotalPrice = generateElement('span', 'cart-list__item-total');
	const productRemove = generateElement('button', 'cart-list__item-remove');

	productArticul.setAttribute('type', 'hidden');
	productArticul.setAttribute('name', 'articul');
	productArticul.setAttribute('value', id);
	productImg.setAttribute('src', img_url);
	productQuantity.setAttribute('data-id', id);
	productRemove.setAttribute('data-id', id);
	productQuantity.setAttribute('type', 'number');
	productQuantity.setAttribute('name', 'quantity');
	productQuantity.setAttribute('value', total);

	productTitle.innerText = title;
	productPrice.innerText = currency + price;
	productTotalPrice.innerText = `${currency}${+price * +total}`;
	productRemove.innerText = '-';

	const wrappedProductItems = [productArticul, imgWrapper, productTitle, productPrice, productQuantity, productTotalPrice, productRemove];
	insertElementIntoParent(wrappedProductItems, productItem);

	imgWrapper.appendChild(productImg);
	listItem.appendChild(productItem);

	return listItem;
}

export const renderProducts = (products) => {
	const grid = document.getElementById('productsGrid');

	products.forEach(product => {
		grid.appendChild(createProductItem(product));
	})
}

export const renderCart = (products) => {
	const grid = document.querySelector('.cart-list');
	const emptyMsg = document.querySelector('.cart__empty');
	const total = document.querySelector('.cart__total');

	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}

	if (!products.length) {
		return grid.classList.add('empty-list');
	} else {
		grid.classList.remove('empty-list');
	}

	let currency;

	products.forEach(product => {
		currency = product.currency;
		grid.appendChild(createCartItem(product));
	});

	total.innerText = `Total: ${currency}${getTotalSum()}`;
}

export const renderSuccessMsg = () => {
	const span = generateElement('span', 'success-msg');
	span.classList.add('badge');
	span.classList.add('badge-success');
	span.innerText = 'Added to cart';
	document.body.appendChild(span);
	setTimeout(() => {
		document.body.removeChild(span);
	}, 2500);
}