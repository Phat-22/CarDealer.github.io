import listItems from "./data.js";
import { addToCart, cartNumber } from "./cart.js";

const productBox = document.querySelector(".products--new__row");
window.addEventListener('load', () => {
    loadAllProducts();
})

function loadAllProducts() {
    const searchParams = new URLSearchParams(window.location.search);
    listItems.forEach(function (item) {
        if (item.isNew === true) {
            if (searchParams.has('category')) {
                if (item.category === searchParams.get('category')) {
                    items(item);
                }
            }
            else if (searchParams.has('brand')) {
                if (item.brand === searchParams.get('brand')) {
                    items(item);
                }
            }
            else {
                items(item);
            }
        }
    })
}

function items(itemData) {
    const itemEl = document.createElement('div');
    if (productBox) {
        productBox.appendChild(itemEl);
        itemEl.classList.add("products--items");
        itemEl.innerHTML = `
            <div class="products--items__img">
                <a href="./product-details?id=${itemData.id}"><img src="${itemData.image1}" alt="" /></a>
                <div class="overlay">
                    <div class="text">
                        <a href="./product-details?id=${itemData.id}"><img src="${itemData.image2}" alt="" /></a>
                    </div>
                </div>
            </div>
            <div class="products--items__main">
                <a href="./product-details?id=${itemData.id}">${itemData.name}</a>
                <p>$${itemData.price}</p>
                <button class="border__button">Thêm vào giỏ hàng</button>
            </div>
            <span class="new"></span>
        `;
        const buttonEl = itemEl.querySelector('button');
        buttonEl.addEventListener('click', () => {
            addToCart(itemData);
            cartNumber();
        });
    }
}