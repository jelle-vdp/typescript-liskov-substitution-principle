interface DiscountInterface {
    apply(price: number): number;
    showCalculation(price : number): string;
}

class Discount {
    protected _value: number;

    constructor(value: number) {
        if (value <= 0) {
            alert('You cannot create a variable discount with a null or negative value');
            this._value = 0;
        } else {
            this._value = value;
        }
    };

    get value(): number {
        return this._value;
    }
}

class VariableDiscount extends Discount implements DiscountInterface {
    public apply(price : number) : number {
        return (price - (price * this._value / 100));
    }
    public showCalculation(price: number): string {
        return price + " € -  "+ this._value +"%";
    }
}

class FixedDiscount extends Discount implements DiscountInterface {
    public apply(price : number) : number {
        return Math.max(0, price - this._value);
    }

    public showCalculation(price: number): string {
        return price + "€ -  "+ this._value +"€ (min 0 €)";
    }
}

class NoDiscount implements DiscountInterface {
    public apply(price : number) : number {
        return price;
    }
    public showCalculation(price: number): string {
        return "No discount";
    }
}

class Product {
    private _name : string;
    private _price : number;
    private _discount : VariableDiscount | FixedDiscount | NoDiscount;

    constructor(name: string, price: number, discount: VariableDiscount | FixedDiscount | NoDiscount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }

    get name(): string {
        return this._name;
    }

    get discount(): VariableDiscount | FixedDiscount | NoDiscount {
        return this._discount;
    }

    get price(): number {
        return this._price;
    }

    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    calculatePrice() : number {
        return this._discount.apply(this._price);
    }

    showCalculation() : string {
        return this._discount.showCalculation(this._price);
    }
}

class shoppingBasket {
    //this array only accepts Product objects, nothing else
    private _products: Product[] = [];

    get products(): Product[] {
        return this._products;
    }

    addProduct(product: Product) {
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

const tableElement = <HTMLElement>document.querySelector('#cart tbody');
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