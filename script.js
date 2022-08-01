"use strict";
class Discount {
    constructor(value) {
        if (value <= 0) {
            alert('You cannot create a variable discount with a null or negative value');
            this._value = 0;
        }
        else {
            this._value = value;
        }
    }
    ;
    get value() {
        return this._value;
    }
}
class VariableDiscount extends Discount {
    apply(price) {
        return (price - (price * this._value / 100));
    }
    showCalculation(price) {
        return price + " € -  " + this._value + "%";
    }
}
class FixedDiscount extends Discount {
    apply(price) {
        return Math.max(0, price - this._value);
    }
    showCalculation(price) {
        return price + "€ -  " + this._value + "€ (min 0 €)";
    }
}
class NoDiscount {
    apply(price) {
        return price;
    }
    showCalculation(price) {
        return "No discount";
    }
}
class Product {
    constructor(name, price, discount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }
    get name() {
        return this._name;
    }
    get discount() {
        return this._discount;
    }
    get price() {
        return this._price;
    }
    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    calculatePrice() {
        return this._discount.apply(this._price);
    }
    showCalculation() {
        return this._discount.showCalculation(this._price);
    }
}
class shoppingBasket {
    constructor() {
        //this array only accepts Product objects, nothing else
        this._products = [];
    }
    get products() {
        return this._products;
    }
    addProduct(product) {
        if (product.discount instanceof Discount && product.discount.value !== 0 || product.discount instanceof Discount === false) {
            this._products.push(product);
        }
    }
}
let cart = new shoppingBasket();
cart.addProduct(new Product('Chair', 25, new FixedDiscount(10)));
cart.addProduct(new Product('Chair', 25, new FixedDiscount(-10)));
cart.addProduct(new Product('Table', 50, new VariableDiscount(25)));
cart.addProduct(new Product('Bed', 100, new NoDiscount()));
const tableElement = document.querySelector('#cart tbody');
cart.products.forEach((product) => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerText = product.name;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.price.toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.calculatePrice().toFixed(2) + " €";
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = product.showCalculation();
    tr.appendChild(td);
    tableElement.appendChild(tr);
});
