// Iteration 1: messy starting version (intentionally bad code)
// Code smells: global data, bad names, duplication, long method,
// magic numbers, discount logic hard-coded with if/else, dead code.

var c = [];
var t = 0;
var x = "none";

function add(n, p, q) {
  for (var i = 0; i < c.length; i++) {
    if (c[i].n == n) {
      c[i].q = c[i].q + q;
      t = 0;
      for (var j = 0; j < c.length; j++) {
        t = t + c[j].p * c[j].q;
      }
      return;
    }
  }
  c.push({ n: n, p: p, q: q });
  t = 0;
  for (var j = 0; j < c.length; j++) {
    t = t + c[j].p * c[j].q;
  }
}

function rem(n) {
  for (var i = 0; i < c.length; i++) {
    if (c[i].n == n) {
      c.splice(i, 1);
    }
  }
  t = 0;
  for (var j = 0; j < c.length; j++) {
    t = t + c[j].p * c[j].q;
  }
}

function doStuff() {
  var r = t;
  if (x == "student") {
    r = r - r * 0.1;
  } else if (x == "black") {
    r = r - r * 0.3;
  } else if (x == "big") {
    if (r > 100) {
      r = r - 20;
    }
  }
  for (var i = 0; i < c.length; i++) {
    console.log(c[i].n + " x" + c[i].q + " = " + (c[i].p * c[i].q).toFixed(2) + " TND");
  }
  console.log("Subtotal: " + t.toFixed(2) + " TND");
  console.log("Total: " + r.toFixed(2) + " TND");
}

function oldPrint() {
  // not used anymore
  console.log(c);
}

add("Laptop", 1200, 1);
add("Mouse", 25, 2);
add("Mouse", 25, 1);
rem("Mouse");
add("Keyboard", 45, 1);
x = "student";
doStuff();
