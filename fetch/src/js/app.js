const eventName = 'products_ready';
let event = new Event(eventName);
const loader = document.querySelector('#cube-loader');

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


const renderProducts = (products) => {
	const grid = document.getElementById('productsGrid');

	products.forEach(product => {
		grid.appendChild(createProductItem(product));
	})
}

document.addEventListener(eventName, () => {
	setTimeout(() => {
		renderProducts(Storage.get('products'));
		loader.classList.add('hidden');
	}, 3000);
});