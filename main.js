import product from './product.js';

let currentCategory = null; 
let cartCount = 0; 
let price = 0; 
let cart = JSON.parse(localStorage.getItem('cartItems')) || []; 

// Updates the cart count displayed in the UI
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count'); 
  if (cartCountElement) {
    cartCount = cart.length; 
    cartCountElement.textContent = cartCount;
  }
}

// Creates a DOM element for a single product
function createProductElement(product) {
  const productDiv = document.createElement('div'); 
  productDiv.className = 'product'; 
  productDiv.innerHTML = `
    <h3>${product.type}</h3>
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" width="200">
    <p>Price: $${product.price.toFixed(2)}</p> <!-- toFixed is a built-in method to format a number to fixed decimals -->
    <button class="add-to-cart">Add to Cart</button>
  `;

  const addToCartBtn = productDiv.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => { 
    cart.push(product); 
    price += product.price;
    localStorage.setItem('cartItems', JSON.stringify(cart)); // stringify to convert objects to a string cuz localStorage can only store strings
    updateCartCount();
  });

  return productDiv;
}

// Displays products, optionally filtered by type
function displayProducts(type = null) {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = ''; 
  currentCategory = type;
  const filteredProducts = type
    ? product.filter(p => p.type.toLowerCase() === type.toLowerCase())
    : product;

  filteredProducts.forEach(prod => {
    productContainer.appendChild(createProductElement(prod)); // appendChild adds a node to the end of the list of children of a specified parent node
  });
}

// Runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  displayProducts();

  // Add click event listeners to category buttons
  document.getElementById('home-button').addEventListener('click', () => displayProducts());
  document.getElementById('tv-button').addEventListener('click', () => displayProducts('tv'));
  document.getElementById('smartphones-button').addEventListener('click', () => displayProducts('smartphones'));
  document.getElementById('accessories-button').addEventListener('click', () => displayProducts('accessories'));
  document.getElementById('laptops-button').addEventListener('click', () => displayProducts('laptops'));

  // Search bar functionality
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    let filteredProducts = product;

    if (currentCategory) {
      filteredProducts = filteredProducts.filter(
        p => p.type.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(searchTerm) // includes checks if a string contains a specified value
    );

    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    filteredProducts.forEach(prod => {
      productContainer.appendChild(createProductElement(prod));
    });
  });

  // Cart button click: go to cart page
  document.getElementById('cart-button').addEventListener('click', () => {
    window.location.href = 'cart.html'; // window.location.href sets the URL of the current page
  });
});
