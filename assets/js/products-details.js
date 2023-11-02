import listItems from "./data.js";
import { cartNumber, addToCart } from "./cart.js";

window.addEventListener("load", detailsProducts);

function detailsProducts() {
    const detailsEl = document.querySelector("#details");
    const searchParams = new URLSearchParams(window.location.search);
    if (detailsEl) {
        const target = listItems.find(
            item => item.id === Number(searchParams.get("id"))
        );
        detailsEl.innerHTML = `
                    <div class="section--right__details">
                        <div class="details--img">
                            <div class="details--img__main">
                                <div class="products--items__img">
                                    <img src="${target.image1}" alt="" />
                                    <div class="overlay">
                                        <div class="text">
                                            <img src="${target.image2}" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="details--img__slide">
                                <img src="${target.image1}" alt="rings" />
                                <img src="${target.image2}" alt="rings" />
                            </div>
                        </div>
                        <div class="details--info">
                            <h1>${target.name}</h1>
                            <p><strong>Price:</strong> $${target.price} </p>
                            <p><strong>Status:</strong> ${target.status}</p>
                            <p><strong>Color: </strong>
                                <select class="size">
                                    <option>${target.color[0]}</option>
                                    <option>${target.color[1]}</option>
                                </select>
                            </p>
                            <div class="quantity__addtocart">
                                <input type="number" min="1" max="10" placeholder="Quantity" />
                                <button id="cart" class="border__button radius">Add to cart</button>
                            </div>
                            <p><strong>Category: </strong> ${target.category}</p>
                            <p><strong>Brand: </strong> ${target.brand}</p>
                        </div>
                    </div>
                    <div class="details--info__table">
                            <div class="h2_Details">
                                <h2>Description</h2>
                            </div>
                            <div class="h2_Details">
                                <h2>Details</h2>
                            </div>
                            <div class="table__details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="bold">Brand:</td>
                                            <td>${target.brand}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold">Color:</td>
                                            <td>${target.color[0]}/${target.color[1]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                `;
        const inputEl = detailsEl.querySelector('.quantity');
        let quantityInput;
        inputEl.addEventListener('change', (e) => quantityInput = e.target.value);
        const buttonEl = detailsEl.querySelector('#cart');
        console.log(buttonEl);
        buttonEl.addEventListener('click', () => {
            addToCart(target, quantityInput);
            cartNumber();
        });
    }
}
