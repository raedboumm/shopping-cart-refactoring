# Shopping Cart – Iterative Refactoring

A messy JavaScript shopping cart refactored step by step into clean code with design patterns.

| Iteration | File | What it is |
|---|---|---|
| 1 | `v1-messy.js` | Starting version, intentionally bad code |
| 2 | `v2-refactored.js` | Refactoring techniques only |
| 3 | `v3-patterns.js` | Strategy, Observer and Builder added |

Each iteration is also a separate commit in the version history.

## Run

```bash
node v1-messy.js
node v2-refactored.js
node v3-patterns.js
```

All three print the same receipt (Total: 1120.50 TND with the student discount), which shows the behaviour did not change while refactoring. Version 3 also shows a price-drop notification.

## Summary Report

### 1. What changes were made and why

**Code smells found in v1:**
- Unclear names (`c`, `t`, `x`, `n`, `p`, `q`, `doStuff`)
- Duplication: the subtotal loop was copied in 3 functions
- Long method: `doStuff` calculated the discount *and* printed the receipt
- Global variables that any function could change
- Magic numbers (`0.1`, `0.3`, `100`, `20`)
- Dead code (`oldPrint` was never called)
- Discounts hard-coded in an `if/else` chain

**Iteration 2 (refactoring):**
- *Rename variable/method*: `c` → `items`, `doStuff` → `printReceipt`, etc.
- *Extract method*: `findItem`, `calculateSubtotal`, `calculateDiscount`
- *Remove duplication*: the subtotal is calculated in one place only
- *Remove dead code*: deleted `oldPrint` and the stored total `t`
- *Replace magic numbers with constants*
- *Encapsulate*: moved data and functions into a `ShoppingCart` class

**Iteration 3 (design patterns):**
- **Strategy** for discounts
- **Observer** for price-drop notifications
- **Builder** for creating products

### 2. How clean code principles were followed
- **Meaningful names**: every variable and method says what it does.
- **Small functions, single responsibility**: each method does one thing (find, add, calculate, print).
- **DRY**: no repeated logic.
- **Open/Closed**: a new discount is a new class, so the cart does not need to change.
- **Encapsulation**: no global state; the data lives inside objects.
- **Small steps**: after every change the code was run again to check the output stayed the same.

### 3. How patterns improved the design
- **Strategy**: the long `if/else` chain is gone. Each discount (`StudentDiscount`, `BlackFridayDiscount`, `BigOrderDiscount`) is its own class with a `calculate()` method, and the cart can switch between them at runtime with `setDiscountStrategy()`.
- **Observer**: a `Product` keeps a list of subscribed `Customer` objects and notifies them automatically when its price drops. The product does not need to know what the customer does with the notification, so the two stay loosely coupled.
- **Builder**: `ProductBuilder` creates products step by step (`setPrice().setCategory().build()`). Optional fields get default values, and the code is easier to read than a constructor with many parameters.
