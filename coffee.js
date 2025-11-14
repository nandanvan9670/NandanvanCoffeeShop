let cart = [];

 // apply saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-theme");
      toggleBtn.checked = true;
    }

    toggleBtn.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");

      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });

// Add to cart function
function addToCart(productName, price) {
  let item = cart.find(p => p.name === productName);
  if (item) {
    item.qty++;
  } else {
    cart.push({ name: productName, price: price, qty: 1 });
  }
  updateCart();
}

// Update cart table
function updateCart() {
  let cartTable = document.getElementById("cartTable");
  cartTable.innerHTML = `
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
      <th>Action</th>
    </tr>
  `;

  let grandTotal = 0;
  cart.forEach((item, index) => {
    let total = item.price * item.qty;
    grandTotal += total;
    cartTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>
          <button onclick="changeQty(${index}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>₹${total}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  document.getElementById("cartTotal").innerText = "Grand Total: ₹" + grandTotal;
}

// Change quantity
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Go to order
function goToOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  window.location.hash = "#order";

  // Show order summary
  let summary = "<h3>Order Summary</h3>";
  let total = 0;
  cart.forEach(item => {
    summary += `<p>${item.name} x ${item.qty} = ₹${item.price * item.qty}</p>`;
    total += item.price * item.qty;
  });
  summary += `<h4>Total: ₹${total}</h4>`;
  document.getElementById("orderSummary").innerHTML = summary;
}

// Place order
function placeOrder(event) {
  event.preventDefault();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let payment = document.getElementById("payment").value;

  alert(`✅ Order Placed Successfully!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment: ${payment}\n\nThank you for ordering with us!`);
  
  // Reset everything
  cart = [];
  updateCart();
  document.querySelector("form").reset();
  document.getElementById("orderSummary").innerHTML = "";
  window.location.hash = "#home";
}



  const buttons = document.querySelectorAll("#shop button");
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => addToCart(products[i].name, products[i].price));
  });
