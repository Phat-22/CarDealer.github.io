'use strict';
window.addEventListener('load', () => {
    showCartCheckout();
    totalCart();
});

//-- Display cart
function showCartCheckout() {
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    cartItem.forEach(function (item) {
        let cartBody = document.querySelector('#cart-body');
        let trEl = document.createElement('tr');
        cartBody.appendChild(trEl);
        trEl.innerHTML = `
                <td>${item.id}</td>
                <td class="weight">${item.name}</td>
                <td><a href="./product-details?id=${item.id}"><img src="${item.image1}" alt="item" /></a></td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity)}</td>
            `;
        });
}

//-- Total cart
function totalCart() {
    let subTotal = 0;
    let total = 0;
    let tax = 0
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    let cartTotal = document.querySelector('#total-cart');
    if (cartItem.length === 0){
        return false
    }
    else {
        cartItem.forEach(item => {
        subTotal += item.price * item.quantity;
        tax += (item.price * 0.2) * item.quantity;
        total = subTotal;
        });    
        cartTotal.innerHTML = `
            <li>
                <p>Cart Sub Total :</p>
                <span>$${subTotal}</span>
            </li>
            <li>
                <p>Tax :</p>
                <span>$${tax}</span>
            </li>
            <li>
                <p>Total :</p>
                <span>$${total}</span>
            </li>
        `;
    }
    
}