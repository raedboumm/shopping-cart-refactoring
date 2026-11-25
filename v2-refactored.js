// Iteration 2: refactoring only (no design patterns yet)
// - Renamed variables and functions (c -> items, add -> addItem, doStuff -> printReceipt)
// - Extracted methods: findItem, calculateSubtotal, calculateDiscount
// - Removed duplication: the subtotal loop now exists once
// - Removed dead code (oldPrint) and the global "t" variable
// - Replaced magic numbers with named constants
// - Grouped everything in a ShoppingCart class

const STUDENT_RATE = 0.1;
const BLACK_FRIDAY_RATE = 0.3;
const BIG_ORDER_MIN = 100;
const BIG_ORDER_REDUCTION = 20;

class ShoppingCart {
  constructor() {
    this.items = [];
    this.discountType = "none";
  }

  findItem(name) {
    return this.items.find((item) => item.name === name);
  }

  addItem(name, price, quantity) {
    const existing = this.findItem(name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ name, price, quantity });
    }
  }

  removeItem(name) {
    this.items = this.items.filter((item) => item.name !== name);
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateDiscount(subtotal) {
    if (this.discountType === "student") return subtotal * STUDENT_RATE;
    if (this.discountType === "blackFriday") return subtotal * BLACK_FRIDAY_RATE;
    if (this.discountType === "bigOrder" && subtotal > BIG_ORDER_MIN) return BIG_ORDER_REDUCTION;
    return 0;
  }

  printReceipt() {
    this.items.forEach((item) => {
      const lineTotal = item.price * item.quantity;
      console.log(`${item.name} x${item.quantity} = ${lineTotal.toFixed(2)} TND`);
    });
    const subtotal = this.calculateSubtotal();
    const total = subtotal - this.calculateDiscount(subtotal);
    console.log(`Subtotal: ${subtotal.toFixed(2)} TND`);
    console.log(`Total: ${total.toFixed(2)} TND`);
  }
}

const cart = new ShoppingCart();
cart.addItem("Laptop", 1200, 1);
cart.addItem("Mouse", 25, 2);
cart.addItem("Mouse", 25, 1);
cart.removeItem("Mouse");
cart.addItem("Keyboard", 45, 1);
cart.discountType = "student";
cart.printReceipt();
