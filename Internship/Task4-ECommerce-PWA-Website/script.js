// Load and cache products globally
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function fetchProducts(callback) {
  fetch('data/products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      if (callback) callback();
    });
}

// Add product to cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ id: id, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Product added to cart!");
}

// Display cart on cart.html
function displayCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartSummaryDiv = document.getElementById('cartSummary');
  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartSummaryDiv.innerHTML = '';
    return;
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const subtotal = product.price * item.quantity;
      total += subtotal;
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow-md flex justify-between items-center';
      div.innerHTML = `
        <div>
          <h3 class="text-xl font-bold">${product.name}</h3>
          <p>Price: ₹${product.price}</p>
          <p>Quantity: 
            <button onclick="changeQty(${item.id}, -1)" class="px-2">➖</button>
            ${item.quantity}
            <button onclick="changeQty(${item.id}, 1)" class="px-2">➕</button>
          </p>
        </div>
        <button onclick="removeItem(${item.id})" class="text-red-500">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    }
  });

  cartSummaryDiv.innerText = `Total: ₹${total}`;
}

// Quantity adjustment
function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}

// Remove item from cart
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log("✅ Service Worker registered."));
}

// Optional: Show welcome notification
if ("Notification" in window && navigator.serviceWorker) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then(reg => {
        reg.showNotification("🎉 Welcome to E-Shop!", {
          body: "Enjoy exclusive deals and fast delivery.",
          icon: "/assets/icon-192.png"
        });
      });
    }
  });
}
