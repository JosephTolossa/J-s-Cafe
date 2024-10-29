// Initialize cart
let cart = [];

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const product = event.target.closest('.product');
    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');
    const productPrice = parseFloat(product.getAttribute('data-price'));

    addToCart(productId, productName, productPrice);
  });
});

function addToCart(id, name, price) {
  // Check if item is already in the cart
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    // Item already in cart, increment quantity
    cart[itemIndex].quantity += 1;
  } else {
    // Add new item to the cart
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;

  // Clear current cart display
  cartItems.innerHTML = '';

  // Loop through cart and display items
  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement('li');
    li.textContent = `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFromCart(item.id));
    
    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });

  // Update total price
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(id) {
  // Remove item from cart
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Confirm order and show modal
document.getElementById('confirm-order').addEventListener('click', () => {
  const total = document.getElementById('cart-total').textContent;
  document.getElementById('order-total').textContent = total;
  document.getElementById('order-confirmation').classList.remove('hidden');
});


// Close modal
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('order-confirmation').classList.add('hidden');
});

// Start new order
document.getElementById('start-new-order').addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Show confirmation message after entering payment method
document.getElementById('submit-payment').addEventListener('click', () => {
  const paymentMethod = document.getElementById('payment-method').value;
  if (paymentMethod) {
      document.getElementById('confirmation-message').classList.remove('hidden');
  }
});

