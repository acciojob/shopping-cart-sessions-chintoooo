// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Select DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Helper function to get cart from session storage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Helper function to save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render the list of products with "Add to Cart" buttons
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(product);

    li.appendChild(addButton);
    productList.appendChild(li);
  });
}

// Render the shopping cart based on session storage data
function renderCart() {
  cartList.innerHTML = ""; // Clear previous cart items
  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Cart is empty.</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add a product to the cart and update the display
function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  renderCart();
}

// Clear the cart from session storage and update the display
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// Initialize the product list and cart on page load
renderProducts();
renderCart();
