import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const img = (t) => `https://placehold.co/200x200/2e7d32/ffffff?text=${encodeURIComponent(t)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', price: 15, image: img('Snake Plant') },
      { name: 'Spider Plant', price: 12, image: img('Spider Plant') },
      { name: 'Peace Lily', price: 18, image: img('Peace Lily') },
      { name: 'Boston Fern', price: 14, image: img('Boston Fern') },
      { name: 'Rubber Plant', price: 20, image: img('Rubber Plant') },
      { name: 'Areca Palm', price: 22, image: img('Areca Palm') },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', price: 16, image: img('Lavender') },
      { name: 'Jasmine', price: 17, image: img('Jasmine') },
      { name: 'Rosemary', price: 13, image: img('Rosemary') },
      { name: 'Mint', price: 9, image: img('Mint') },
      { name: 'Lemon Balm', price: 11, image: img('Lemon Balm') },
      { name: 'Basil', price: 8, image: img('Basil') },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Aloe Vera', price: 10, image: img('Aloe Vera') },
      { name: 'Jade Plant', price: 14, image: img('Jade Plant') },
      { name: 'Echeveria', price: 12, image: img('Echeveria') },
      { name: 'Zebra Haworthia', price: 11, image: img('Haworthia') },
      { name: "Burro's Tail", price: 15, image: img('Burros Tail') },
      { name: 'Hens and Chicks', price: 9, image: img('Hens & Chicks') },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <h2 className="brand">Paradise Nursery</h2>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }} className="cart-link">
            🛒 Cart <span className="cart-count">{totalCount}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-page">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="price">${plant.price}</p>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;