let cart = [];

window.addEventListener('load', () => {
    showCart();
    cartNumber();
    totalCart();
});

//-- Count cart
export function cartNumber() {
    const numberCart = document.querySelector('#numbers');
    let cartNumber = 0;
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    cartItem.forEach(item => {
        cartNumber += item.quantity;
    })
    numberCart.setAttribute('data-after', cartNumber);
}

//-- Add to cart
export function addToCart(item, val) {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    }
    const target = cart.find(element => element.id === item.id); //-- true
    if (target) {
            console.log(typeof target.quantity);
            console.log(typeof val);
            target.quantity = Number(target.quantity) + Number(val);
    } else {
        const cartItem = {
            ...item,
            quantity: Number(val),
        }
        cart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Add to cart successfully');

}
//-- Display cart
function showCart() {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    }
    if (cart.length === 0) {
        const shop = document.querySelector('.shopcart')
        shop.remove();
        const notEl = document.querySelector('.notification');
        const h1El = document.createElement('h1');
        notEl.appendChild(h1El);
        h1El.textContent = 'Oops, Your cart is empty';
        return false;
    }
    cart.forEach(function (item) {
        let cartBody = document.querySelector('#cart-body');
        if (cartBody) {
            let trEl = document.createElement('tr');
            item.trEl = trEl;
            trEl.innerHTML = `
                    <td>${item.id}</td>
                    <td class="weight">${item.name}</td>
                    <td><a href="./product-details.html?id=${item.id}"><img src="${item.image1}" alt="item" /></a></td>
                    <td>$${item.price}</td>
                    <td>
                        <input type="number" id="quantityInput" min="1" max="10"  value="${item.quantity}"/> 
                    </td>
                    <td><button class="remove">X</button></td>
                `;
            cartBody.appendChild(trEl);
            const removeEl = trEl.querySelector('button');
            removeEl.addEventListener('click', () => {
                removeItem(item);
            });
            const editEl = trEl.querySelector('input');
            editEl.addEventListener('change', (val) => {
                updateValue(item, val);
            });
        }
    });


}

function updateValue(item, e) {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    }
    console.log(cart);
    let indexOfEl = cart.map(element => element.id);
    let index = indexOfEl.findIndex(id => id === item.id);
    cart[index].quantity = Number(e.target.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    totalCart();
}

//-- Remove item
function removeItem(item) {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    }
    let indexOfEl = cart.map(element => element.id);
    let index = indexOfEl.findIndex(id => id === item.id);
    cart.splice(index, 1);
    if (confirm('Do you want to delete this product?') === true) {
        item.trEl.remove();
    } else {
        cart = JSON.parse(storage);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    totalCart();
    if (cart.length === 0) {
        const shop = document.querySelector('.shopcart')
        shop.remove();
        const notEl = document.querySelector('.notification');
        const h1El = document.createElement('h1');
        notEl.appendChild(h1El);
        h1El.textContent = 'Oops, Your cart is empty';
        return false;
    }
}

//-- Total cart
function totalCart() {
    let subTotal = 0;
    let total = 0;
    let tax = 0;
    let cartItem = JSON.parse(localStorage.getItem('cart'));
    let cartTotal = document.querySelector('#total-cart');
    cartItem.forEach(item => {
        subTotal += item.price * item.quantity;
        tax += (item.price * 0.2) * item.quantity;
        total = subTotal + tax;
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

