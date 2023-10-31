import listItems from "./data.js";
import {addToCart,cartNumber } from "./cart.js";

const productBox = document.querySelector(".products--new__row");
window.addEventListener('load', loadProducts);


function loadProducts() {
    listItems.forEach(function (item) {
        if (item.isNew === true) {
            const itemEl = document.createElement('div');
            productBox.appendChild(itemEl);
            itemEl.classList.add("products--items");
            itemEl.innerHTML = `
                <div class="products--items__img">
                    <a href="./product-details?id=${item.id}"><img src="${item.image1}" alt="" /></a>
                    <div class="overlay">
                        <div class="text">
                            <a href="./product-details?id=${item.id}"><img src="${item.image2}" alt="" /></a>
                        </div>
                    </div>
                </div>
                <div class="products--items__main">
                    <a href="./product-details?id=${item.id}">${item.name}</a>
                    <p>$${item.price}</p>
                    <button class="border__button">Thêm vào giỏ hàng</button>
                </div>
                <span class="new"></span>
            `
            const buttonEl = itemEl.querySelector('button');
            buttonEl.addEventListener('click', () => {
                addToCart(item);
                cartNumber();
            });
        }
    })
}


