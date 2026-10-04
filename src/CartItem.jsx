import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.price * item.quantity;
  const cartTotal = items.reduce((sum, i) => sum + itemTotal(i), 0);

  const increase = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const decrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  return (
    <div className="cart-page">
      <h2>Total Cart Amount: ${cartTotal}</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-details">
            <h3>{item.name}</h3>
            <p>Unit price: ${item.price}</p>
            <div className="qty-controls">
              <button onClick={() => decrease(item)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item)}>+</button>
            </div>
            <p>Total: ${itemTotal(item)}</p>
            <button className="delete-btn" onClick={() => dispatch(removeItem(item.name))}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;