"use strict";

(function () {

    let products = document.getElementsByClassName('product'),
        makeOrderBtn = document.querySelector('img.goCart'),
        productsToOrderDiv = document.querySelector('.finalCart'),
        payBtn = document.querySelector('.pay img'),
        customerCart = {};

    setProductsInfo(products);

    const productsData = setProductsData(products);
    console.log(productsData);

    makeOrderBtn.addEventListener('click', function () {
        showOrdersTable(customerCart);
    });

    function setProductsInfo(products) {
        for (let product of products) {
            let parTitle = product.querySelector('p.product-name'),
                parPrice = product.querySelector('p.product-price');
            parTitle.innerText = product.dataset.name;
            parPrice.innerHTML = '&#8381;' + product.dataset.price;
        }
    }

    function setProductsData(products) {
        let productsInfo = {};
        for (let product of products) {
            productsInfo[product.dataset.id] = {
                name: product.dataset.name,
                price: product.dataset.price
            }
        }
        return productsInfo;
    }

    for (let product of products) {
        let addItemBtn = product.querySelector('img.add'),
            removeItemBtn = product.querySelector('img.remove'),
            productCounter = product.querySelector('p.counter'),
            imgCartCount = product.querySelector('img.countCart');

        addItemBtn.addEventListener('click', function () {
            addItem(product, productCounter, imgCartCount);
        });
        removeItemBtn.addEventListener('click', function () {
            removeItem(product, productCounter, imgCartCount);
        });
    }

    function addItem(product, productCounter, imgCartCount) {
        let number = +productCounter.innerText;
        productCounter.innerText = ++number;

        if (number == 1) {
            productCounter.classList.remove('invisible');
            imgCartCount.classList.remove('invisible');
        }
        if (productCounter.innerText == 10) {
            productCounter.classList.add('smallNums');
        }

        let id = product.dataset.id;
        if (!(id in customerCart)) {
            customerCart[id] = {
                name: product.dataset.name,
                price: product.dataset.price,
                quantity: number
            };
        } else {
            customerCart[id].quantity++;
        }
    }

    function removeItem(product, productCounter, imgCartCount) {
        let number = +productCounter.innerText;
        if (number > 0 && number !== 9) {
            productCounter.innerText = --number;
            customerCart[product.dataset.id].quantity--;
        } else if (number == 9) {
            productCounter.classList.remove('smallNums');
            customerCart[product.dataset.id].quantity--;
        }
        if (number == 0) {
            productCounter.classList.add('invisible');
            imgCartCount.classList.add('invisible');
        }
    }

    function showOrdersTable(customerCart) {
        console.log(customerCart);
        if (Object.keys(customerCart).length != 0) {
            for (let item of Object.values(customerCart)) {
                if (item.quantity > 0) {
                    createTable(customerCart);
                    return;
                }
            }
            productsToOrderDiv.innerHTML = '';
            payBtn.classList.add('invisible');
            alert('Корзина пуста');
        } else {
            productsToOrderDiv.innerHTML = '';
            payBtn.classList.add('invisible');
            alert('Корзина пуста');
        }
    }

    function createTable(customerCart) {
        productsToOrderDiv.innerHTML = '';
        let grandTotal = 0,
            productsTable = document.createElement('table'),
            tBody = document.createElement('tbody'),
            trTitle = document.createElement('tr'),
            tdId = document.createElement('td'),
            tdName = document.createElement('td'),
            tdPrice = document.createElement('td'),
            tdTotal = document.createElement('td');

        tdId.innerHTML = 'ID';
        tdName.innerHTML = 'Name';
        tdPrice.innerHTML = 'Price';
        tdTotal.innerHTML = 'Total';

        trTitle.append(tdId, tdName, tdPrice, tdTotal);
        tBody.append(trTitle);
        productsTable.append(tBody);
        productsToOrderDiv.append(productsTable);

        for (let productId in customerCart) {
            if (customerCart[productId].quantity > 0) {
                let row = document.createElement('tr');
                let tdId = document.createElement('td'),
                    tdName = document.createElement('td'),
                    tdPrice = document.createElement('td'),
                    tdTotal = document.createElement('td');
                tdId.innerHTML = productId;
                tdName.innerHTML = customerCart[productId].name;
                tdPrice.innerHTML = '&#8381;' + customerCart[productId].price;
                let total = customerCart[productId].price * customerCart[productId].quantity;
                tdTotal.innerHTML = '&#8381;' + total;
                grandTotal += total;

                row.append(tdId, tdName, tdPrice, tdTotal);
                productsTable.append(row);
            }

        }

        let rowGrandTotal = document.createElement('tr'),
            tdGrandTotal = document.createElement('td');
        tdGrandTotal.setAttribute('colspan', 4);
        tdGrandTotal.innerHTML = 'Общая сумма: &#8381;' + grandTotal;
        rowGrandTotal.append(tdGrandTotal);
        productsTable.append(rowGrandTotal);

        payBtn.classList.remove('invisible');
    }

})();