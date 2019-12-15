const eventName = 'products_ready';
let event = new Event(eventName);
const loader = document.querySelector('#cube-loader');
const modal = document.querySelector('.modal');

function StorageHelper(){
	this.storage = localStorage;

	this.get = (key) => {
		return JSON.parse(localStorage.getItem(key));
	}
	this.set = (key, value) => {
		localStorage.setItem(key, JSON.stringify(value));
	}
	this.remove = (key) => {
		localStorage.removeItem(key);
	}
}

const Storage = new StorageHelper();

const getCartValue = () => {
	const label = document.querySelector('.cart__label');
	const cartValue = Storage.get('cart');

	if (!cartValue) {
		label.innerText = 0;
		return {};
	}

	const valuesSum = Object.values(cartValue).reduce((acc, cur) => acc + cur);
	label.innerText = valuesSum;
	return cartValue;
}

const cart = getCartValue();

const getProducts = (url) => {
	return fetch(url);
}

getProducts('https://my-json-server.typicode.com/davaynamore/fakeserver/db')
.then(
	function(response) {
		if (response.status !== 200) {
			console.log(`Looks like there was a problem. Status Code: ${response.status}`);
			return;
		}

		response.json()
		.then(({products}) => {
			Storage.set('products', products);
			document.dispatchEvent(event);
		});
	}
	)
.catch(function(err) {
	console.log('Fetch Error :-S', err);
});

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

const createProductItem = (product) => {

	const { currency, description, id, img_url, price, title } = product;

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
	const productCurrency = generateElement('span', 'currency');
	const addToCart = generateElement('button', 'add-to-cart');

	productNewLabel.innerText = 'Sale';
	addToCart.innerText = '+ Add To Cart';
	productDiscountLabel.innerText = '20%';

	productImage.setAttribute('src', img_url);
	addToCart.setAttribute('data-id', id);
	productTitle.innerText = title;
	productCurrency.innerText = currency;
	productPrice.innerText = price;

	col.appendChild(productGrid);
	imageWrapper.appendChild(productImage);
	productPrice.appendChild(productCurrency);

	const wrappedGrid = [productImageWrap, productDescription, productContent];
	const wrappedImageWrap = [imageWrapper, productNewLabel, productDiscountLabel];
	const wrappedContent = [productTitle, productPrice, addToCart];

	insertElementIntoParent(wrappedGrid, productGrid);
	insertElementIntoParent(wrappedImageWrap, productImageWrap);
	insertElementIntoParent(wrappedContent, productContent);

	return col;
}

const createCartItem = ({id, title, img_url, price, currency, total}) => {

	const listItem = generateElement('li');
	const productItem = generateElement('div', 'cart-list__item');
	const productArticul = generateElement('input');
	const imgWrapper = generateElement('div', 'cart-list__img-wrapper');
	const productImg = generateElement('img', 'cart-list__item-img');
	const productTitle = generateElement('h4', 'cart-list__item-title');
	const productPrice = generateElement('span', 'cart-list__item-price');
	const productCurrency = generateElement('span', 'cart-list__item-currency');
	const productQuantity = generateElement('input', 'cart-list__item-quantity');
	const productTotalPrice = generateElement('span', 'cart-list__item-total');

	productArticul.setAttribute('type', 'hidden');
	productArticul.setAttribute('name', 'articul');
	productArticul.setAttribute('value', id);
	productImg.setAttribute('src', img_url);
	productQuantity.setAttribute('type', 'number');
	productQuantity.setAttribute('name', 'quantity');
	productQuantity.setAttribute('value', total);

	productTitle.innerText = title;
	productCurrency.innerText = currency;
	productPrice.innerText = price;
	productTotalPrice.innerText = +price * +total;

	const wrappedProductItems = [productArticul, imgWrapper, productTitle, productPrice, productQuantity, productTotalPrice];

	insertElementIntoParent(wrappedProductItems, productItem);
	imgWrapper.appendChild(productImg);
	productPrice.appendChild(productCurrency);
	listItem.appendChild(productItem);

	return listItem;
}

const renderCartItems = (cart, products) => {
	const productsId = Object.keys(cart);

	const chosenProducts = productsId.map(id => {

		return products.filter(product => {
			if (product.id == id) {
				product.total = cart[id];
				return product;
			}
		})[0];

	});
}

const renderProducts = (products) => {
	const grid = document.getElementById('productsGrid');

	products.forEach(product => {
		grid.appendChild(createProductItem(product));
	})
}

const renderCartProducts = (products) => {
	const grid = document.querySelector('.cart-list');

	products.forEach(product => {
		grid.appendChild(createCartItem(product));
	})
}

document.addEventListener(eventName, () => {
	const products = Storage.get('products');
	renderProducts(products);
	loader.classList.add('hidden');
	getCartValue();

});

const addToCartHandler = (target) => {
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

const modalOpenHandler = () => {
	modal.classList.add('open');
	renderCartProducts(Storage.get('products'));
}

const modalCloseHandler = () => {
	modal.classList.remove('open');
}



document.addEventListener('click', (event) => {
	const target = event.target;

	if (target.classList.contains('add-to-cart')) {
		addToCartHandler(target);
	}

	if (target.classList.contains('cart')) {
		modalOpenHandler();
	}

	if (target.classList.contains('modal__close')) {
		modalCloseHandler();
	}

});

