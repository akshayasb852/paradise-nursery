import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div className="app-container">
      {!showProducts ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <AboutUs />
            <button className="get-started-btn" onClick={() => setShowProducts(true)}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProducts(false)} />
      )}
    </div>
  );
}

export default App;