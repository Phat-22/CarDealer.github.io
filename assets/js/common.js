import listItems from "./data.js";

window.addEventListener('load', () => {
    brandProducts();
    categoryProducts();
});

function brandProducts() {
    const brandArr = [];
    const ulBrand = document.querySelectorAll('.brands ul');
    for (let i = 0; i < listItems.length; i++) {
        if (brandArr.indexOf(listItems[i].brand) === -1) {
            brandArr.push(listItems[i].brand);
        }
    }
    for (let i = 0; i < ulBrand.length; i++) {
        for (let j = 0; j < brandArr.length; j++) {
            const liBrand = document.createElement('li');
            ulBrand[i].appendChild(liBrand);
            liBrand.innerHTML = `
                <a href="./products.html?brand=${brandArr[j]}">${brandArr[j]}</a>
            `
        }
    }
}

function categoryProducts() {
    const categoryArr = [];
    const ulCategory = document.querySelectorAll('.category');
    for (let i = 0; i < listItems.length; i++) {
        if (categoryArr.indexOf(listItems[i].category) === -1) {
            categoryArr.push(listItems[i].category);
        }
    }
    for (let i = 0; i < ulCategory.length; i++) {
        for (let j = 0; j < categoryArr.length; j++) {
            const li = document.createElement('li');
            ulCategory[i].appendChild(li);
            li.innerHTML = `
                <a href="./products.html?category=${categoryArr[j]}">${categoryArr[j]}</a>
            `
        }
    }

}




