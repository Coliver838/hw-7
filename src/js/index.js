import { products as initialProducts } from '../../data.js';
import productsTemplate from '../templates/products.hbs';
import '../styles.css';

const form = document.querySelector('#product-form');
const productsList = document.querySelector('#products-list');
const productsCount = document.querySelector('#products-count');

// Дані живуть лише в пам'яті вкладки. Після оновлення сторінки відновлюється data.js.
let products = initialProducts.map(product => ({ ...product }));

function renderProducts() {
  productsList.innerHTML = productsTemplate({ products });
  productsCount.textContent = `Усього: ${products.length}`;
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const newProduct = {
    id: Date.now(),
    name: formData.get('name').trim(),
    price: Number(formData.get('price')),
    description: formData.get('description').trim(),
  };

  products.push(newProduct);
  renderProducts();
  form.reset();
  form.elements.name.focus();
});

productsList.addEventListener('click', event => {
  const button = event.target.closest('.delete-button');
  if (!button) return;

  const productId = Number(button.dataset.id);
  products = products.filter(product => product.id !== productId);
  renderProducts();
});

renderProducts();
