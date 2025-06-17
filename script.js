const productList = document.getElementById('productList');
const errorText = document.getElementById('error');
const sortSelect = document.getElementById('sortSelect');
let currentProducts = [];

async function searchProducts() {
  const query = document.getElementById('searchInput').value.trim();
  errorText.textContent = '';
  productList.innerHTML = '';
  currentProducts = [];

  if (!query) {
    errorText.textContent = 'Please enter a search term.';
    return;
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();

    if (data.products.length === 0) {
      productList.innerHTML = `<p>No products found for "${query}".</p>`;
      return;
    }

    currentProducts = data.products;
    sortProducts(); // auto render sorted
  } catch (err) {
    errorText.textContent = 'Something went wrong while fetching products.';
  }
}

function renderProducts(products) {
  productList.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productList.appendChild(card);
  });
}

function sortProducts() {
  const sortValue = sortSelect.value;
  let sortedProducts = [...currentProducts];

  if (sortValue === 'asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(sortedProducts);
}
