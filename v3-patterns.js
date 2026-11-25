// Iteration 3: design patterns
// - Builder:  ProductBuilder creates Product objects step by step
// - Strategy: each discount is its own class, the cart just uses one
// - Observer: customers subscribe to a product and get notified on price drops

// ---------- Builder ----------
class Product {
  constructor(name, price, category, description) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.observers = [];
  }

  // ---------- Observer (subject side) ----------
  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  setPrice(newPrice) {
    const oldPrice = this.price;
    this.price = newPrice;
    if (newPrice < oldPrice) {
      this.observers.forEach((o) => o.update(this, oldPrice));
    }
  }
}

class ProductBuilder {
  constructor(name) {
    this.name = name;
    this.price = 0;
    this.category = "General";
    this.description = "";
  }

  setPrice(price) {
    this.price = price;
    return this;
  }

  setCategory(category) {
    this.category = category;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  build() {
    return new Product(this.name, this.price, this.category, this.description);
  }
}

// ---------- Observer (observer side) ----------
class Customer {
  constructor(name) {
    this.name = name;
  }

  update(product, oldPrice) {
    console.log(
      `[Notification to ${this.name}] ${product.name} dropped from ${oldPrice.toFixed(2)} to ${product.price.toFixed(2)} TND`
    );
  }
}

// ---------- Strategy ----------
class NoDiscount {
  calculate() {
    return 0;
  }
}

class StudentDiscount {
  calculate(subtotal) {
    return subtotal * 0.1;
  }
}

class BlackFridayDiscount {
  calculate(subtotal) {
    return subtotal * 0.3;
  }
}

class BigOrderDiscount {
  calculate(subtotal) {
    return subtotal > 100 ? 20 : 0;
  }
}

// ---------- Cart ----------
class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountStrategy = new NoDiscount();
  }

  setDiscountStrategy(strategy) {
    this.discountStrategy = strategy;
  }

  findItem(product) {
    return this.items.find((item) => item.product === product);
  }

  addItem(product, quantity = 1) {
    const existing = this.findItem(product);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(product) {
    this.items = this.items.filter((item) => item.product !== product);
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    return subtotal - this.discountStrategy.calculate(subtotal);
  }

  printReceipt() {
    this.items.forEach(({ product, quantity }) => {
      console.log(`${product.name} x${quantity} = ${(product.price * quantity).toFixed(2)} TND`);
    });
    console.log(`Subtotal: ${this.calculateSubtotal().toFixed(2)} TND`);
    console.log(`Total: ${this.calculateTotal().toFixed(2)} TND`);
  }
}

// ---------- Demo ----------
const laptop = new ProductBuilder("Laptop").setPrice(1200).setCategory("Electronics").build();
const mouse = new ProductBuilder("Mouse").setPrice(25).setCategory("Accessories").build();
const keyboard = new ProductBuilder("Keyboard").setPrice(45).setDescription("Mechanical").build();

const aya = new Customer("Aya");
laptop.subscribe(aya);

const cart = new ShoppingCart();
cart.addItem(laptop);
cart.addItem(mouse, 2);
cart.addItem(mouse, 1);
cart.removeItem(mouse);
cart.addItem(keyboard);

cart.setDiscountStrategy(new StudentDiscount());
cart.printReceipt();

console.log("---");
laptop.setPrice(1000); // Aya gets notified
cart.setDiscountStrategy(new BigOrderDiscount());
cart.printReceipt();
