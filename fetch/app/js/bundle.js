(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var eventName = 'products_ready';
var event = new Event(eventName);
var loader = document.querySelector('#cube-loader');

function StorageHelper() {
  this.storage = localStorage;

  this.get = function (key) {
    return JSON.parse(localStorage.getItem(key));
  };

  this.set = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  };

  this.remove = function (key) {
    localStorage.removeItem(key);
  };
}

var Storage = new StorageHelper();

var getProducts = function getProducts(url) {
  return fetch(url);
};

getProducts('https://my-json-server.typicode.com/davaynamore/fakeserver/db').then(function (response) {
  if (response.status !== 200) {
    console.log("Looks like there was a problem. Status Code: ".concat(response.status));
    return;
  }

  response.json().then(function (_ref) {
    var products = _ref.products;
    Storage.set('products', products);
    document.dispatchEvent(event);
  });
})["catch"](function (err) {
  console.log('Fetch Error :-S', err);
});

var generateElement = function generateElement(tagName) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var el = document.createElement(tagName);

  if (className) {
    el.classList.add(className);
  }

  return el;
};

var insertElementIntoParent = function insertElementIntoParent(elements, parentElement) {
  elements.forEach(function (element) {
    parentElement.appendChild(element);
  });
};

var createProductItem = function createProductItem(product) {
  var currency = product.currency,
      description = product.description,
      id = product.id,
      img_url = product.img_url,
      price = product.price,
      title = product.title;
  var col = generateElement('div', 'col-4');
  var productGrid = generateElement('div', 'product-grid');
  var productImageWrap = generateElement('div', 'product-image');
  var imageWrapper = generateElement('div', 'image-wrapper');
  var productImage = generateElement('img', 'pic-1');
  var productNewLabel = generateElement('span', 'product-new-label');
  var productDiscountLabel = generateElement('span', 'product-discount-label');
  var productDescription = generateElement('p', 'product-description');
  var productContent = generateElement('div', 'product-content');
  var productTitle = generateElement('h3', 'title');
  var productPrice = generateElement('div', 'price');
  var productCurrency = generateElement('span', 'currency');
  var addToCart = generateElement('button', 'add-to-cart');
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
  var wrappedGrid = [productImageWrap, productDescription, productContent];
  var wrappedImageWrap = [imageWrapper, productNewLabel, productDiscountLabel];
  var wrappedContent = [productTitle, productPrice, addToCart];
  insertElementIntoParent(wrappedGrid, productGrid);
  insertElementIntoParent(wrappedImageWrap, productImageWrap);
  insertElementIntoParent(wrappedContent, productContent);
  return col;
};

var renderProducts = function renderProducts(products) {
  var grid = document.getElementById('productsGrid');
  products.forEach(function (product) {
    grid.appendChild(createProductItem(product));
  });
};

document.addEventListener(eventName, function () {
  setTimeout(function () {
    renderProducts(Storage.get('products'));
    loader.classList.add('hidden');
  }, 3000);
});

},{}]},{},[1])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwcm9qZWN0cy9mZXRjaC9zcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLFNBQVMsR0FBRyxnQkFBbEI7QUFDQSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUosQ0FBVSxTQUFWLENBQVo7QUFDQSxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixDQUFmOztBQUVBLFNBQVMsYUFBVCxHQUF3QjtBQUN2QixPQUFLLE9BQUwsR0FBZSxZQUFmOztBQUVBLE9BQUssR0FBTCxHQUFXLFVBQUMsR0FBRCxFQUFTO0FBQ25CLFdBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxZQUFZLENBQUMsT0FBYixDQUFxQixHQUFyQixDQUFYLENBQVA7QUFDQSxHQUZEOztBQUdBLE9BQUssR0FBTCxHQUFXLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDMUIsSUFBQSxZQUFZLENBQUMsT0FBYixDQUFxQixHQUFyQixFQUEwQixJQUFJLENBQUMsU0FBTCxDQUFlLEtBQWYsQ0FBMUI7QUFDQSxHQUZEOztBQUdBLE9BQUssTUFBTCxHQUFjLFVBQUMsR0FBRCxFQUFTO0FBQ3RCLElBQUEsWUFBWSxDQUFDLFVBQWIsQ0FBd0IsR0FBeEI7QUFDQSxHQUZEO0FBR0E7O0FBRUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFKLEVBQWhCOztBQUVBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLEdBQUQsRUFBUztBQUM1QixTQUFPLEtBQUssQ0FBQyxHQUFELENBQVo7QUFDQSxDQUZEOztBQUlBLFdBQVcsQ0FBQywrREFBRCxDQUFYLENBQ0MsSUFERCxDQUVDLFVBQVMsUUFBVCxFQUFtQjtBQUNsQixNQUFJLFFBQVEsQ0FBQyxNQUFULEtBQW9CLEdBQXhCLEVBQTZCO0FBQzVCLElBQUEsT0FBTyxDQUFDLEdBQVIsd0RBQTRELFFBQVEsQ0FB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RCxDQUFkO0FBQ0EsSUFBQSxNQUFNLENBQUMsU0FBUCxDQUFpQixHQUFqQixDQUFxQixRQUFyQjtBQUNBLEdBSFMsRUFHUCxJQUhPLENBQVY7QUFJQSxDQUxEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBldmVudE5hbWUgPSAncHJvZHVjdHNfcmVhZHknO1xyXG5sZXQgZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcclxuY29uc3QgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1YmUtbG9hZGVyJyk7XHJcblxyXG5mdW5jdGlvbiBTdG9yYWdlSGVscGVyKCl7XHJcblx0dGhpcy5zdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xyXG5cclxuXHR0aGlzLmdldCA9IChrZXkpID0+IHtcclxuXHRcdHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG5cdH1cclxuXHR0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcblx0fVxyXG5cdHRoaXMucmVtb3ZlID0gKGtleSkgPT4ge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IFN0b3JhZ2UgPSBuZXcgU3RvcmFnZUhlbHBlcigpO1xyXG5cclxuY29uc3QgZ2V0UHJvZHVjdHMgPSAodXJsKSA9PiB7XHJcblx0cmV0dXJuIGZldGNoKHVybCk7XHJcbn1cclxuXHJcbmdldFByb2R1Y3RzKCdodHRwczovL215LWpzb24tc2VydmVyLnR5cGljb2RlLmNvbS9kYXZheW5hbW9yZS9mYWtlc2VydmVyL2RiJylcclxuLnRoZW4oXHJcblx0ZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhgTG9va3MgbGlrZSB0aGVyZSB3YXMgYSBwcm9ibGVtLiBTdGF0dXMgQ29kZTogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXNwb25zZS5qc29uKClcclxuXHRcdC50aGVuKCh7cHJvZHVjdHN9KSA9PiB7XHJcblx0XHRcdFN0b3JhZ2Uuc2V0KCdwcm9kdWN0cycsIHByb2R1Y3RzKTtcclxuXHRcdFx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0KVxyXG4uY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcblx0Y29uc29sZS5sb2coJ0ZldGNoIEVycm9yIDotUycsIGVycik7XHJcbn0pO1xyXG5cclxuY29uc3QgZ2VuZXJhdGVFbGVtZW50ID0gKHRhZ05hbWUsIGNsYXNzTmFtZSA9ICcnKSA9PiB7XHJcblx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG5cdGlmIChjbGFzc05hbWUpIHtcclxuXHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBlbDtcclxufVxyXG5cclxuY29uc3QgaW5zZXJ0RWxlbWVudEludG9QYXJlbnQgPSAoZWxlbWVudHMsIHBhcmVudEVsZW1lbnQpID0+IHtcclxuXHRlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0cGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuXHR9KVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVQcm9kdWN0SXRlbSA9IChwcm9kdWN0KSA9PiB7XHJcblxyXG5cdGNvbnN0IHsgY3VycmVuY3ksIGRlc2NyaXB0aW9uLCBpZCwgaW1nX3VybCwgcHJpY2UsIHRpdGxlIH0gPSBwcm9kdWN0O1xyXG5cclxuXHRjb25zdCBjb2wgPSBnZW5lcmF0ZUVsZW1lbnQoJ2RpdicsICdjb2wtNCcpO1xyXG5cdGNvbnN0IHByb2R1Y3RHcmlkID0gZ2VuZXJhdGVFbGVtZW50KCdkaXYnLCAncHJvZHVjdC1ncmlkJyk7XHJcblx0Y29uc3QgcHJvZHVjdEltYWdlV3JhcCA9IGdlbmVyYXRlRWxlbWVudCgnZGl2JywgJ3Byb2R1Y3QtaW1hZ2UnKTtcclxuXHRjb25zdCBpbWFnZVdyYXBwZXIgPSBnZW5lcmF0ZUVsZW1lbnQoJ2RpdicsICdpbWFnZS13cmFwcGVyJyk7XHJcblx0Y29uc3QgcHJvZHVjdEltYWdlID0gZ2VuZXJhdGVFbGVtZW50KCdpbWcnLCAncGljLTEnKTtcclxuXHRjb25zdCBwcm9kdWN0TmV3TGFiZWwgPSBnZW5lcmF0ZUVsZW1lbnQoJ3NwYW4nLCAncHJvZHVjdC1uZXctbGFiZWwnKTtcclxuXHRjb25zdCBwcm9kdWN0RGlzY291bnRMYWJlbCA9IGdlbmVyYXRlRWxlbWVudCgnc3BhbicsICdwcm9kdWN0LWRpc2NvdW50LWxhYmVsJyk7XHJcblx0Y29uc3QgcHJvZHVjdERlc2NyaXB0aW9uID0gZ2VuZXJhdGVFbGVtZW50KCdwJywgJ3Byb2R1Y3QtZGVzY3JpcHRpb24nKTtcclxuXHRjb25zdCBwcm9kdWN0Q29udGVudCA9IGdlbmVyYXRlRWxlbWVudCgnZGl2JywgJ3Byb2R1Y3QtY29udGVudCcpO1xyXG5cdGNvbnN0IHByb2R1Y3RUaXRsZSA9IGdlbmVyYXRlRWxlbWVudCgnaDMnLCAndGl0bGUnKTtcclxuXHRjb25zdCBwcm9kdWN0UHJpY2UgPSBnZW5lcmF0ZUVsZW1lbnQoJ2RpdicsICdwcmljZScpO1xyXG5cdGNvbnN0IHByb2R1Y3RDdXJyZW5jeSA9IGdlbmVyYXRlRWxlbWVudCgnc3BhbicsICdjdXJyZW5jeScpO1xyXG5cdGNvbnN0IGFkZFRvQ2FydCA9IGdlbmVyYXRlRWxlbWVudCgnYnV0dG9uJywgJ2FkZC10by1jYXJ0Jyk7XHJcblxyXG5cdHByb2R1Y3ROZXdMYWJlbC5pbm5lclRleHQgPSAnU2FsZSc7XHJcblx0YWRkVG9DYXJ0LmlubmVyVGV4dCA9ICcrIEFkZCBUbyBDYXJ0JztcclxuXHRwcm9kdWN0RGlzY291bnRMYWJlbC5pbm5lclRleHQgPSAnMjAlJztcclxuXHJcblx0cHJvZHVjdEltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgaW1nX3VybCk7XHJcblx0cHJvZHVjdFRpdGxlLmlubmVyVGV4dCA9IHRpdGxlO1xyXG5cdHByb2R1Y3RDdXJyZW5jeS5pbm5lclRleHQgPSBjdXJyZW5jeTtcclxuXHRwcm9kdWN0UHJpY2UuaW5uZXJUZXh0ID0gcHJpY2U7XHJcblxyXG5cdGNvbC5hcHBlbmRDaGlsZChwcm9kdWN0R3JpZCk7XHJcblx0aW1hZ2VXcmFwcGVyLmFwcGVuZENoaWxkKHByb2R1Y3RJbWFnZSk7XHJcblx0cHJvZHVjdFByaWNlLmFwcGVuZENoaWxkKHByb2R1Y3RDdXJyZW5jeSk7XHJcblxyXG5cdGNvbnN0IHdyYXBwZWRHcmlkID0gW3Byb2R1Y3RJbWFnZVdyYXAsIHByb2R1Y3REZXNjcmlwdGlvbiwgcHJvZHVjdENvbnRlbnRdO1xyXG5cdGNvbnN0IHdyYXBwZWRJbWFnZVdyYXAgPSBbaW1hZ2VXcmFwcGVyLCBwcm9kdWN0TmV3TGFiZWwsIHByb2R1Y3REaXNjb3VudExhYmVsXTtcclxuXHRjb25zdCB3cmFwcGVkQ29udGVudCA9IFtwcm9kdWN0VGl0bGUsIHByb2R1Y3RQcmljZSwgYWRkVG9DYXJ0XTtcclxuXHJcblx0aW5zZXJ0RWxlbWVudEludG9QYXJlbnQod3JhcHBlZEdyaWQsIHByb2R1Y3RHcmlkKTtcclxuXHRpbnNlcnRFbGVtZW50SW50b1BhcmVudCh3cmFwcGVkSW1hZ2VXcmFwLCBwcm9kdWN0SW1hZ2VXcmFwKTtcclxuXHRpbnNlcnRFbGVtZW50SW50b1BhcmVudCh3cmFwcGVkQ29udGVudCwgcHJvZHVjdENvbnRlbnQpO1xyXG5cclxuXHRyZXR1cm4gY29sO1xyXG59XHJcblxyXG5cclxuY29uc3QgcmVuZGVyUHJvZHVjdHMgPSAocHJvZHVjdHMpID0+IHtcclxuXHRjb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3RzR3JpZCcpO1xyXG5cclxuXHRwcm9kdWN0cy5mb3JFYWNoKHByb2R1Y3QgPT4ge1xyXG5cdFx0Z3JpZC5hcHBlbmRDaGlsZChjcmVhdGVQcm9kdWN0SXRlbShwcm9kdWN0KSk7XHJcblx0fSlcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsICgpID0+IHtcclxuXHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHJlbmRlclByb2R1Y3RzKFN0b3JhZ2UuZ2V0KCdwcm9kdWN0cycpKTtcclxuXHRcdGxvYWRlci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHR9LCAzMDAwKTtcclxufSk7Il0sInByZUV4aXN0aW5nQ29tbWVudCI6Ii8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlpY205M2MyVnlMWEJoWTJzdlgzQnlaV3gxWkdVdWFuTWlMQ0p3Y205cVpXTjBjeTltWlhSamFDOXpjbU12YW5NdllYQndMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdRVU5CUVN4SlFVRk5MRk5CUVZNc1IwRkJSeXhuUWtGQmJFSTdRVUZEUVN4SlFVRkpMRXRCUVVzc1IwRkJSeXhKUVVGSkxFdEJRVW9zUTBGQlZTeFRRVUZXTEVOQlFWbzdRVUZEUVN4SlFVRk5MRTFCUVUwc1IwRkJSeXhSUVVGUkxFTkJRVU1zWVVGQlZDeERRVUYxUWl4alFVRjJRaXhEUVVGbU96dEJRVVZCTEZOQlFWTXNZVUZCVkN4SFFVRjNRanRCUVVOMlFpeFBRVUZMTEU5QlFVd3NSMEZCWlN4WlFVRm1PenRCUVVWQkxFOUJRVXNzUjBGQlRDeEhRVUZYTEZWQlFVTXNSMEZCUkN4RlFVRlRPMEZCUTI1Q0xGZEJRVThzU1VGQlNTeERRVUZETEV0QlFVd3NRMEZCVnl4WlFVRlpMRU5CUVVNc1QwRkJZaXhEUVVGeFFpeEhRVUZ5UWl4RFFVRllMRU5CUVZBN1FVRkRRU3hIUVVaRU96dEJRVWRCTEU5QlFVc3NSMEZCVEN4SFFVRlhMRlZCUVVNc1IwRkJSQ3hGUVVGTkxFdEJRVTRzUlVGQlowSTdRVUZETVVJc1NVRkJRU3haUVVGWkxFTkJRVU1zVDBGQllpeERRVUZ4UWl4SFFVRnlRaXhGUVVFd1FpeEpRVUZKTEVOQlFVTXNVMEZCVEN4RFFVRmxMRXRCUVdZc1EwRkJNVUk3UVVGRFFTeEhRVVpFT3p0QlFVZEJMRTlCUVVzc1RVRkJUQ3hIUVVGakxGVkJRVU1zUjBGQlJDeEZRVUZUTzBGQlEzUkNMRWxCUVVFc1dVRkJXU3hEUVVGRExGVkJRV0lzUTBGQmQwSXNSMEZCZUVJN1FVRkRRU3hIUVVaRU8wRkJSMEU3TzBGQlJVUXNTVUZCVFN4UFFVRlBMRWRCUVVjc1NVRkJTU3hoUVVGS0xFVkJRV2hDT3p0QlFVVkJMRWxCUVUwc1YwRkJWeXhIUVVGSExGTkJRV1FzVjBGQll5eERRVUZETEVkQlFVUXNSVUZCVXp0QlFVTTFRaXhUUVVGUExFdEJRVXNzUTBGQlF5eEhRVUZFTEVOQlFWbzdRVUZEUVN4RFFVWkVPenRCUVVsQkxGZEJRVmNzUTBGQlF5d3JSRUZCUkN4RFFVRllMRU5CUTBNc1NVRkVSQ3hEUVVWRExGVkJRVk1zVVVGQlZDeEZRVUZ0UWp0QlFVTnNRaXhOUVVGSkxGRkJRVkVzUTBGQlF5eE5RVUZVTEV0QlFXOUNMRWRCUVhoQ0xFVkJRVFpDTzBGQlF6VkNMRWxCUVVFc1QwRkJUeXhEUVVGRExFZEJRVklzZDBSQlFUUkVMRkZCUVZFc1EwRkJReXhOUVVGeVJUdEJRVU5CTzBGQlEwRTdPMEZCUlVRc1JVRkJRU3hSUVVGUkxFTkJRVU1zU1VGQlZDeEhRVU5ETEVsQlJFUXNRMEZEVFN4blFrRkJaMEk3UVVGQlFTeFJRVUZrTEZGQlFXTXNVVUZCWkN4UlFVRmpPMEZCUTNKQ0xFbEJRVUVzVDBGQlR5eERRVUZETEVkQlFWSXNRMEZCV1N4VlFVRmFMRVZCUVhkQ0xGRkJRWGhDTzBGQlEwRXNTVUZCUVN4UlFVRlJMRU5CUVVNc1lVRkJWQ3hEUVVGMVFpeExRVUYyUWp0QlFVTkJMRWRCU2tRN1FVRkxRU3hEUVdKR0xGZEJaVThzVlVGQlV5eEhRVUZVTEVWQlFXTTdRVUZEY0VJc1JVRkJRU3hQUVVGUExFTkJRVU1zUjBGQlVpeERRVUZaTEdsQ1FVRmFMRVZCUVN0Q0xFZEJRUzlDTzBGQlEwRXNRMEZxUWtRN08wRkJiVUpCTEVsQlFVMHNaVUZCWlN4SFFVRkhMRk5CUVd4Q0xHVkJRV3RDTEVOQlFVTXNUMEZCUkN4RlFVRTJRanRCUVVGQkxFMUJRVzVDTEZOQlFXMUNMSFZGUVVGUUxFVkJRVTg3UVVGRGNFUXNUVUZCVFN4RlFVRkZMRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRVlFzUTBGQmRVSXNUMEZCZGtJc1EwRkJXRHM3UVVGRFFTeE5RVUZKTEZOQlFVb3NSVUZCWlR0QlFVTmtMRWxCUVVFc1JVRkJSU3hEUVVGRExGTkJRVWdzUTBGQllTeEhRVUZpTEVOQlFXbENMRk5CUVdwQ08wRkJRMEU3TzBGQlJVUXNVMEZCVHl4RlFVRlFPMEZCUTBFc1EwRlFSRHM3UVVGVFFTeEpRVUZOTEhWQ1FVRjFRaXhIUVVGSExGTkJRVEZDTEhWQ1FVRXdRaXhEUVVGRExGRkJRVVFzUlVGQlZ5eGhRVUZZTEVWQlFUWkNPMEZCUXpWRUxFVkJRVUVzVVVGQlVTeERRVUZETEU5QlFWUXNRMEZCYVVJc1ZVRkJRU3hQUVVGUExFVkJRVWs3UVVGRE0wSXNTVUZCUVN4aFFVRmhMRU5CUVVNc1YwRkJaQ3hEUVVFd1FpeFBRVUV4UWp0QlFVTkJMRWRCUmtRN1FVRkhRU3hEUVVwRU96dEJRVTFCTEVsQlFVMHNhVUpCUVdsQ0xFZEJRVWNzVTBGQmNFSXNhVUpCUVc5Q0xFTkJRVU1zVDBGQlJDeEZRVUZoTzBGQlFVRXNUVUZGT1VJc1VVRkdPRUlzUjBGRmRVSXNUMEZHZGtJc1EwRkZPVUlzVVVGR09FSTdRVUZCUVN4TlFVVndRaXhYUVVadlFpeEhRVVYxUWl4UFFVWjJRaXhEUVVWd1FpeFhRVVp2UWp0QlFVRkJMRTFCUlZBc1JVRkdUeXhIUVVWMVFpeFBRVVoyUWl4RFFVVlFMRVZCUms4N1FVRkJRU3hOUVVWSUxFOUJSa2NzUjBGRmRVSXNUMEZHZGtJc1EwRkZTQ3hQUVVaSE8wRkJRVUVzVFVGRlRTeExRVVpPTEVkQlJYVkNMRTlCUm5aQ0xFTkJSVTBzUzBGR1RqdEJRVUZCTEUxQlJXRXNTMEZHWWl4SFFVVjFRaXhQUVVaMlFpeERRVVZoTEV0QlJtSTdRVUZKZEVNc1RVRkJUU3hIUVVGSExFZEJRVWNzWlVGQlpTeERRVUZETEV0QlFVUXNSVUZCVVN4UFFVRlNMRU5CUVROQ08wRkJRMEVzVFVGQlRTeFhRVUZYTEVkQlFVY3NaVUZCWlN4RFFVRkRMRXRCUVVRc1JVRkJVU3hqUVVGU0xFTkJRVzVETzBGQlEwRXNUVUZCVFN4blFrRkJaMElzUjBGQlJ5eGxRVUZsTEVOQlFVTXNTMEZCUkN4RlFVRlJMR1ZCUVZJc1EwRkJlRU03UVVGRFFTeE5RVUZOTEZsQlFWa3NSMEZCUnl4bFFVRmxMRU5CUVVNc1MwRkJSQ3hGUVVGUkxHVkJRVklzUTBGQmNFTTdRVUZEUVN4TlFVRk5MRmxCUVZrc1IwRkJSeXhsUVVGbExFTkJRVU1zUzBGQlJDeEZRVUZSTEU5QlFWSXNRMEZCY0VNN1FVRkRRU3hOUVVGTkxHVkJRV1VzUjBGQlJ5eGxRVUZsTEVOQlFVTXNUVUZCUkN4RlFVRlRMRzFDUVVGVUxFTkJRWFpETzBGQlEwRXNUVUZCVFN4dlFrRkJiMElzUjBGQlJ5eGxRVUZsTEVOQlFVTXNUVUZCUkN4RlFVRlRMSGRDUVVGVUxFTkJRVFZETzBGQlEwRXNUVUZCVFN4clFrRkJhMElzUjBGQlJ5eGxRVUZsTEVOQlFVTXNSMEZCUkN4RlFVRk5MSEZDUVVGT0xFTkJRVEZETzBGQlEwRXNUVUZCVFN4alFVRmpMRWRCUVVjc1pVRkJaU3hEUVVGRExFdEJRVVFzUlVGQlVTeHBRa0ZCVWl4RFFVRjBRenRCUVVOQkxFMUJRVTBzV1VGQldTeEhRVUZITEdWQlFXVXNRMEZCUXl4SlFVRkVMRVZCUVU4c1QwRkJVQ3hEUVVGd1F6dEJRVU5CTEUxQlFVMHNXVUZCV1N4SFFVRkhMR1ZCUVdVc1EwRkJReXhMUVVGRUxFVkJRVkVzVDBGQlVpeERRVUZ3UXp0QlFVTkJMRTFCUVUwc1pVRkJaU3hIUVVGSExHVkJRV1VzUTBGQlF5eE5RVUZFTEVWQlFWTXNWVUZCVkN4RFFVRjJRenRCUVVOQkxFMUJRVTBzVTBGQlV5eEhRVUZITEdWQlFXVXNRMEZCUXl4UlFVRkVMRVZCUVZjc1lVRkJXQ3hEUVVGcVF6dEJRVVZCTEVWQlFVRXNaVUZCWlN4RFFVRkRMRk5CUVdoQ0xFZEJRVFJDTEUxQlFUVkNPMEZCUTBFc1JVRkJRU3hUUVVGVExFTkJRVU1zVTBGQlZpeEhRVUZ6UWl4bFFVRjBRanRCUVVOQkxFVkJRVUVzYjBKQlFXOUNMRU5CUVVNc1UwRkJja0lzUjBGQmFVTXNTMEZCYWtNN1FVRkZRU3hGUVVGQkxGbEJRVmtzUTBGQlF5eFpRVUZpTEVOQlFUQkNMRXRCUVRGQ0xFVkJRV2xETEU5QlFXcERPMEZCUTBFc1JVRkJRU3haUVVGWkxFTkJRVU1zVTBGQllpeEhRVUY1UWl4TFFVRjZRanRCUVVOQkxFVkJRVUVzWlVGQlpTeERRVUZETEZOQlFXaENMRWRCUVRSQ0xGRkJRVFZDTzBGQlEwRXNSVUZCUVN4WlFVRlpMRU5CUVVNc1UwRkJZaXhIUVVGNVFpeExRVUY2UWp0QlFVVkJMRVZCUVVFc1IwRkJSeXhEUVVGRExGZEJRVW9zUTBGQlowSXNWMEZCYUVJN1FVRkRRU3hGUVVGQkxGbEJRVmtzUTBGQlF5eFhRVUZpTEVOQlFYbENMRmxCUVhwQ08wRkJRMEVzUlVGQlFTeFpRVUZaTEVOQlFVTXNWMEZCWWl4RFFVRjVRaXhsUVVGNlFqdEJRVVZCTEUxQlFVMHNWMEZCVnl4SFFVRkhMRU5CUVVNc1owSkJRVVFzUlVGQmJVSXNhMEpCUVc1Q0xFVkJRWFZETEdOQlFYWkRMRU5CUVhCQ08wRkJRMEVzVFVGQlRTeG5Ra0ZCWjBJc1IwRkJSeXhEUVVGRExGbEJRVVFzUlVGQlpTeGxRVUZtTEVWQlFXZERMRzlDUVVGb1F5eERRVUY2UWp0QlFVTkJMRTFCUVUwc1kwRkJZeXhIUVVGSExFTkJRVU1zV1VGQlJDeEZRVUZsTEZsQlFXWXNSVUZCTmtJc1UwRkJOMElzUTBGQmRrSTdRVUZGUVN4RlFVRkJMSFZDUVVGMVFpeERRVUZETEZkQlFVUXNSVUZCWXl4WFFVRmtMRU5CUVhaQ08wRkJRMEVzUlVGQlFTeDFRa0ZCZFVJc1EwRkJReXhuUWtGQlJDeEZRVUZ0UWl4blFrRkJia0lzUTBGQmRrSTdRVUZEUVN4RlFVRkJMSFZDUVVGMVFpeERRVUZETEdOQlFVUXNSVUZCYVVJc1kwRkJha0lzUTBGQmRrSTdRVUZGUVN4VFFVRlBMRWRCUVZBN1FVRkRRU3hEUVhoRFJEczdRVUV5UTBFc1NVRkJUU3hqUVVGakxFZEJRVWNzVTBGQmFrSXNZMEZCYVVJc1EwRkJReXhSUVVGRUxFVkJRV003UVVGRGNFTXNUVUZCVFN4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExHTkJRVlFzUTBGQmQwSXNZMEZCZUVJc1EwRkJZanRCUVVWQkxFVkJRVUVzVVVGQlVTeERRVUZETEU5QlFWUXNRMEZCYVVJc1ZVRkJRU3hQUVVGUExFVkJRVWs3UVVGRE0wSXNTVUZCUVN4SlFVRkpMRU5CUVVNc1YwRkJUQ3hEUVVGcFFpeHBRa0ZCYVVJc1EwRkJReXhQUVVGRUxFTkJRV3hETzBGQlEwRXNSMEZHUkR0QlFVZEJMRU5CVGtRN08wRkJVVUVzVVVGQlVTeERRVUZETEdkQ1FVRlVMRU5CUVRCQ0xGTkJRVEZDTEVWQlFYRkRMRmxCUVUwN1FVRkRNVU1zUlVGQlFTeFZRVUZWTEVOQlFVTXNXVUZCVFR0QlFVTm9RaXhKUVVGQkxHTkJRV01zUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCVWl4RFFVRlpMRlZCUVZvc1EwRkJSQ3hEUVVGa08wRkJRMEVzU1VGQlFTeE5RVUZOTEVOQlFVTXNVMEZCVUN4RFFVRnBRaXhIUVVGcVFpeERRVUZ4UWl4UlFVRnlRanRCUVVOQkxFZEJTRk1zUlVGSFVDeEpRVWhQTEVOQlFWWTdRVUZKUVN4RFFVeEVJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJb1puVnVZM1JwYjI0b0tYdG1kVzVqZEdsdmJpQnlLR1VzYml4MEtYdG1kVzVqZEdsdmJpQnZLR2tzWmlsN2FXWW9JVzViYVYwcGUybG1LQ0ZsVzJsZEtYdDJZWElnWXoxY0ltWjFibU4wYVc5dVhDSTlQWFI1Y0dWdlppQnlaWEYxYVhKbEppWnlaWEYxYVhKbE8ybG1LQ0ZtSmlaaktYSmxkSFZ5YmlCaktHa3NJVEFwTzJsbUtIVXBjbVYwZFhKdUlIVW9hU3doTUNrN2RtRnlJR0U5Ym1WM0lFVnljbTl5S0Z3aVEyRnVibTkwSUdacGJtUWdiVzlrZFd4bElDZGNJaXRwSzF3aUoxd2lLVHQwYUhKdmR5QmhMbU52WkdVOVhDSk5UMFJWVEVWZlRrOVVYMFpQVlU1RVhDSXNZWDEyWVhJZ2NEMXVXMmxkUFh0bGVIQnZjblJ6T250OWZUdGxXMmxkV3pCZExtTmhiR3dvY0M1bGVIQnZjblJ6TEdaMWJtTjBhVzl1S0hJcGUzWmhjaUJ1UFdWYmFWMWJNVjFiY2wwN2NtVjBkWEp1SUc4b2JueDhjaWw5TEhBc2NDNWxlSEJ2Y25SekxISXNaU3h1TEhRcGZYSmxkSFZ5YmlCdVcybGRMbVY0Y0c5eWRITjlabTl5S0haaGNpQjFQVndpWm5WdVkzUnBiMjVjSWowOWRIbHdaVzltSUhKbGNYVnBjbVVtSm5KbGNYVnBjbVVzYVQwd08yazhkQzVzWlc1bmRHZzdhU3NyS1c4b2RGdHBYU2s3Y21WMGRYSnVJRzk5Y21WMGRYSnVJSEo5S1NncElpd2lZMjl1YzNRZ1pYWmxiblJPWVcxbElEMGdKM0J5YjJSMVkzUnpYM0psWVdSNUp6dGNjbHh1YkdWMElHVjJaVzUwSUQwZ2JtVjNJRVYyWlc1MEtHVjJaVzUwVG1GdFpTazdYSEpjYm1OdmJuTjBJR3h2WVdSbGNpQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TmpkV0psTFd4dllXUmxjaWNwTzF4eVhHNWNjbHh1Wm5WdVkzUnBiMjRnVTNSdmNtRm5aVWhsYkhCbGNpZ3BlMXh5WEc1Y2RIUm9hWE11YzNSdmNtRm5aU0E5SUd4dlkyRnNVM1J2Y21GblpUdGNjbHh1WEhKY2JseDBkR2hwY3k1blpYUWdQU0FvYTJWNUtTQTlQaUI3WEhKY2JseDBYSFJ5WlhSMWNtNGdTbE5QVGk1d1lYSnpaU2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNoclpYa3BLVHRjY2x4dVhIUjlYSEpjYmx4MGRHaHBjeTV6WlhRZ1BTQW9hMlY1TENCMllXeDFaU2tnUFQ0Z2UxeHlYRzVjZEZ4MGJHOWpZV3hUZEc5eVlXZGxMbk5sZEVsMFpXMG9hMlY1TENCS1UwOU9Mbk4wY21sdVoybG1lU2gyWVd4MVpTa3BPMXh5WEc1Y2RIMWNjbHh1WEhSMGFHbHpMbkpsYlc5MlpTQTlJQ2hyWlhrcElEMCtJSHRjY2x4dVhIUmNkR3h2WTJGc1UzUnZjbUZuWlM1eVpXMXZkbVZKZEdWdEtHdGxlU2s3WEhKY2JseDBmVnh5WEc1OVhISmNibHh5WEc1amIyNXpkQ0JUZEc5eVlXZGxJRDBnYm1WM0lGTjBiM0poWjJWSVpXeHdaWElvS1R0Y2NseHVYSEpjYm1OdmJuTjBJR2RsZEZCeWIyUjFZM1J6SUQwZ0tIVnliQ2tnUFQ0Z2UxeHlYRzVjZEhKbGRIVnliaUJtWlhSamFDaDFjbXdwTzF4eVhHNTlYSEpjYmx4eVhHNW5aWFJRY205a2RXTjBjeWduYUhSMGNITTZMeTl0ZVMxcWMyOXVMWE5sY25abGNpNTBlWEJwWTI5a1pTNWpiMjB2WkdGMllYbHVZVzF2Y21VdlptRnJaWE5sY25abGNpOWtZaWNwWEhKY2JpNTBhR1Z1S0Z4eVhHNWNkR1oxYm1OMGFXOXVLSEpsYzNCdmJuTmxLU0I3WEhKY2JseDBYSFJwWmlBb2NtVnpjRzl1YzJVdWMzUmhkSFZ6SUNFOVBTQXlNREFwSUh0Y2NseHVYSFJjZEZ4MFkyOXVjMjlzWlM1c2IyY29ZRXh2YjJ0eklHeHBhMlVnZEdobGNtVWdkMkZ6SUdFZ2NISnZZbXhsYlM0Z1UzUmhkSFZ6SUVOdlpHVTZJQ1I3Y21WemNHOXVjMlV1YzNSaGRIVnpmV0FwTzF4eVhHNWNkRngwWEhSeVpYUjFjbTQ3WEhKY2JseDBYSFI5WEhKY2JseHlYRzVjZEZ4MGNtVnpjRzl1YzJVdWFuTnZiaWdwWEhKY2JseDBYSFF1ZEdobGJpZ29lM0J5YjJSMVkzUnpmU2tnUFQ0Z2UxeHlYRzVjZEZ4MFhIUlRkRzl5WVdkbExuTmxkQ2duY0hKdlpIVmpkSE1uTENCd2NtOWtkV04wY3lrN1hISmNibHgwWEhSY2RHUnZZM1Z0Wlc1MExtUnBjM0JoZEdOb1JYWmxiblFvWlhabGJuUXBPMXh5WEc1Y2RGeDBmU2s3WEhKY2JseDBmVnh5WEc1Y2RDbGNjbHh1TG1OaGRHTm9LR1oxYm1OMGFXOXVLR1Z5Y2lrZ2UxeHlYRzVjZEdOdmJuTnZiR1V1Ykc5bktDZEdaWFJqYUNCRmNuSnZjaUE2TFZNbkxDQmxjbklwTzF4eVhHNTlLVHRjY2x4dVhISmNibU52Ym5OMElHZGxibVZ5WVhSbFJXeGxiV1Z1ZENBOUlDaDBZV2RPWVcxbExDQmpiR0Z6YzA1aGJXVWdQU0FuSnlrZ1BUNGdlMXh5WEc1Y2RHTnZibk4wSUdWc0lEMGdaRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENoMFlXZE9ZVzFsS1R0Y2NseHVYSFJwWmlBb1kyeGhjM05PWVcxbEtTQjdYSEpjYmx4MFhIUmxiQzVqYkdGemMweHBjM1F1WVdSa0tHTnNZWE56VG1GdFpTazdYSEpjYmx4MGZWeHlYRzVjY2x4dVhIUnlaWFIxY200Z1pXdzdYSEpjYm4xY2NseHVYSEpjYm1OdmJuTjBJR2x1YzJWeWRFVnNaVzFsYm5SSmJuUnZVR0Z5Wlc1MElEMGdLR1ZzWlcxbGJuUnpMQ0J3WVhKbGJuUkZiR1Z0Wlc1MEtTQTlQaUI3WEhKY2JseDBaV3hsYldWdWRITXVabTl5UldGamFDaGxiR1Z0Wlc1MElEMCtJSHRjY2x4dVhIUmNkSEJoY21WdWRFVnNaVzFsYm5RdVlYQndaVzVrUTJocGJHUW9aV3hsYldWdWRDazdYSEpjYmx4MGZTbGNjbHh1ZlZ4eVhHNWNjbHh1WTI5dWMzUWdZM0psWVhSbFVISnZaSFZqZEVsMFpXMGdQU0FvY0hKdlpIVmpkQ2tnUFQ0Z2UxeHlYRzVjY2x4dVhIUmpiMjV6ZENCN0lHTjFjbkpsYm1ONUxDQmtaWE5qY21sd2RHbHZiaXdnYVdRc0lHbHRaMTkxY213c0lIQnlhV05sTENCMGFYUnNaU0I5SUQwZ2NISnZaSFZqZER0Y2NseHVYSEpjYmx4MFkyOXVjM1FnWTI5c0lEMGdaMlZ1WlhKaGRHVkZiR1Z0Wlc1MEtDZGthWFluTENBblkyOXNMVFFuS1R0Y2NseHVYSFJqYjI1emRDQndjbTlrZFdOMFIzSnBaQ0E5SUdkbGJtVnlZWFJsUld4bGJXVnVkQ2duWkdsMkp5d2dKM0J5YjJSMVkzUXRaM0pwWkNjcE8xeHlYRzVjZEdOdmJuTjBJSEJ5YjJSMVkzUkpiV0ZuWlZkeVlYQWdQU0JuWlc1bGNtRjBaVVZzWlcxbGJuUW9KMlJwZGljc0lDZHdjbTlrZFdOMExXbHRZV2RsSnlrN1hISmNibHgwWTI5dWMzUWdhVzFoWjJWWGNtRndjR1Z5SUQwZ1oyVnVaWEpoZEdWRmJHVnRaVzUwS0Nka2FYWW5MQ0FuYVcxaFoyVXRkM0poY0hCbGNpY3BPMXh5WEc1Y2RHTnZibk4wSUhCeWIyUjFZM1JKYldGblpTQTlJR2RsYm1WeVlYUmxSV3hsYldWdWRDZ25hVzFuSnl3Z0ozQnBZeTB4SnlrN1hISmNibHgwWTI5dWMzUWdjSEp2WkhWamRFNWxkMHhoWW1Wc0lEMGdaMlZ1WlhKaGRHVkZiR1Z0Wlc1MEtDZHpjR0Z1Snl3Z0ozQnliMlIxWTNRdGJtVjNMV3hoWW1Wc0p5azdYSEpjYmx4MFkyOXVjM1FnY0hKdlpIVmpkRVJwYzJOdmRXNTBUR0ZpWld3Z1BTQm5aVzVsY21GMFpVVnNaVzFsYm5Rb0ozTndZVzRuTENBbmNISnZaSFZqZEMxa2FYTmpiM1Z1ZEMxc1lXSmxiQ2NwTzF4eVhHNWNkR052Ym5OMElIQnliMlIxWTNSRVpYTmpjbWx3ZEdsdmJpQTlJR2RsYm1WeVlYUmxSV3hsYldWdWRDZ25jQ2NzSUNkd2NtOWtkV04wTFdSbGMyTnlhWEIwYVc5dUp5azdYSEpjYmx4MFkyOXVjM1FnY0hKdlpIVmpkRU52Ym5SbGJuUWdQU0JuWlc1bGNtRjBaVVZzWlcxbGJuUW9KMlJwZGljc0lDZHdjbTlrZFdOMExXTnZiblJsYm5RbktUdGNjbHh1WEhSamIyNXpkQ0J3Y205a2RXTjBWR2wwYkdVZ1BTQm5aVzVsY21GMFpVVnNaVzFsYm5Rb0oyZ3pKeXdnSjNScGRHeGxKeWs3WEhKY2JseDBZMjl1YzNRZ2NISnZaSFZqZEZCeWFXTmxJRDBnWjJWdVpYSmhkR1ZGYkdWdFpXNTBLQ2RrYVhZbkxDQW5jSEpwWTJVbktUdGNjbHh1WEhSamIyNXpkQ0J3Y205a2RXTjBRM1Z5Y21WdVkza2dQU0JuWlc1bGNtRjBaVVZzWlcxbGJuUW9KM053WVc0bkxDQW5ZM1Z5Y21WdVkza25LVHRjY2x4dVhIUmpiMjV6ZENCaFpHUlViME5oY25RZ1BTQm5aVzVsY21GMFpVVnNaVzFsYm5Rb0oySjFkSFJ2Ymljc0lDZGhaR1F0ZEc4dFkyRnlkQ2NwTzF4eVhHNWNjbHh1WEhSd2NtOWtkV04wVG1WM1RHRmlaV3d1YVc1dVpYSlVaWGgwSUQwZ0oxTmhiR1VuTzF4eVhHNWNkR0ZrWkZSdlEyRnlkQzVwYm01bGNsUmxlSFFnUFNBbkt5QkJaR1FnVkc4Z1EyRnlkQ2M3WEhKY2JseDBjSEp2WkhWamRFUnBjMk52ZFc1MFRHRmlaV3d1YVc1dVpYSlVaWGgwSUQwZ0p6SXdKU2M3WEhKY2JseHlYRzVjZEhCeWIyUjFZM1JKYldGblpTNXpaWFJCZEhSeWFXSjFkR1VvSjNOeVl5Y3NJR2x0WjE5MWNtd3BPMXh5WEc1Y2RIQnliMlIxWTNSVWFYUnNaUzVwYm01bGNsUmxlSFFnUFNCMGFYUnNaVHRjY2x4dVhIUndjbTlrZFdOMFEzVnljbVZ1WTNrdWFXNXVaWEpVWlhoMElEMGdZM1Z5Y21WdVkzazdYSEpjYmx4MGNISnZaSFZqZEZCeWFXTmxMbWx1Ym1WeVZHVjRkQ0E5SUhCeWFXTmxPMXh5WEc1Y2NseHVYSFJqYjJ3dVlYQndaVzVrUTJocGJHUW9jSEp2WkhWamRFZHlhV1FwTzF4eVhHNWNkR2x0WVdkbFYzSmhjSEJsY2k1aGNIQmxibVJEYUdsc1pDaHdjbTlrZFdOMFNXMWhaMlVwTzF4eVhHNWNkSEJ5YjJSMVkzUlFjbWxqWlM1aGNIQmxibVJEYUdsc1pDaHdjbTlrZFdOMFEzVnljbVZ1WTNrcE8xeHlYRzVjY2x4dVhIUmpiMjV6ZENCM2NtRndjR1ZrUjNKcFpDQTlJRnR3Y205a2RXTjBTVzFoWjJWWGNtRndMQ0J3Y205a2RXTjBSR1Z6WTNKcGNIUnBiMjRzSUhCeWIyUjFZM1JEYjI1MFpXNTBYVHRjY2x4dVhIUmpiMjV6ZENCM2NtRndjR1ZrU1cxaFoyVlhjbUZ3SUQwZ1cybHRZV2RsVjNKaGNIQmxjaXdnY0hKdlpIVmpkRTVsZDB4aFltVnNMQ0J3Y205a2RXTjBSR2x6WTI5MWJuUk1ZV0psYkYwN1hISmNibHgwWTI5dWMzUWdkM0poY0hCbFpFTnZiblJsYm5RZ1BTQmJjSEp2WkhWamRGUnBkR3hsTENCd2NtOWtkV04wVUhKcFkyVXNJR0ZrWkZSdlEyRnlkRjA3WEhKY2JseHlYRzVjZEdsdWMyVnlkRVZzWlcxbGJuUkpiblJ2VUdGeVpXNTBLSGR5WVhCd1pXUkhjbWxrTENCd2NtOWtkV04wUjNKcFpDazdYSEpjYmx4MGFXNXpaWEowUld4bGJXVnVkRWx1ZEc5UVlYSmxiblFvZDNKaGNIQmxaRWx0WVdkbFYzSmhjQ3dnY0hKdlpIVmpkRWx0WVdkbFYzSmhjQ2s3WEhKY2JseDBhVzV6WlhKMFJXeGxiV1Z1ZEVsdWRHOVFZWEpsYm5Rb2QzSmhjSEJsWkVOdmJuUmxiblFzSUhCeWIyUjFZM1JEYjI1MFpXNTBLVHRjY2x4dVhISmNibHgwY21WMGRYSnVJR052YkR0Y2NseHVmVnh5WEc1Y2NseHVYSEpjYm1OdmJuTjBJSEpsYm1SbGNsQnliMlIxWTNSeklEMGdLSEJ5YjJSMVkzUnpLU0E5UGlCN1hISmNibHgwWTI5dWMzUWdaM0pwWkNBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Nkd2NtOWtkV04wYzBkeWFXUW5LVHRjY2x4dVhISmNibHgwY0hKdlpIVmpkSE11Wm05eVJXRmphQ2h3Y205a2RXTjBJRDArSUh0Y2NseHVYSFJjZEdkeWFXUXVZWEJ3Wlc1a1EyaHBiR1FvWTNKbFlYUmxVSEp2WkhWamRFbDBaVzBvY0hKdlpIVmpkQ2twTzF4eVhHNWNkSDBwWEhKY2JuMWNjbHh1WEhKY2JtUnZZM1Z0Wlc1MExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb1pYWmxiblJPWVcxbExDQW9LU0E5UGlCN1hISmNibHgwYzJWMFZHbHRaVzkxZENnb0tTQTlQaUI3WEhKY2JseDBYSFJ5Wlc1a1pYSlFjbTlrZFdOMGN5aFRkRzl5WVdkbExtZGxkQ2duY0hKdlpIVmpkSE1uS1NrN1hISmNibHgwWEhSc2IyRmtaWEl1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25hR2xrWkdWdUp5azdYSEpjYmx4MGZTd2dNekF3TUNrN1hISmNibjBwT3lKZGZRPT0ifQ==
