import React from 'react';

const CartItem = ({ item, currency, onRemove, onUpdateQuantity }) => {
  const handleRemove = () => onRemove(item.id, item.size);
  const handleIncrease = () => onUpdateQuantity(item.id, item.size, item.quantity + 1);
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.size, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image-container">
        {item.image ? (
          <img src={item.image} alt={item.name} className="item-image" />
        ) : (
          <div className="w-full h-full bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-400 text-sm">No image</p>
          </div>
        )}
      </div>
      <div className="item-details">
        <p className="item-name">{item.name}</p>
        {item.size && <p className="item-info">Size: {item.size}</p>}
        <p className="item-info">Price: {currency}{item.price}</p>
      </div>
      <div className="text-right">
        <p className="item-price">
          {currency}{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <div className="quantity-controls">
        <button className="quantity-btn" onClick={handleDecrease}>-</button>
        <span className="item-quantity">{item.quantity}</span>
        <button className="quantity-btn" onClick={handleIncrease}>+</button>
      </div>
      <div className="text-right">
        <button className="remove-item" onClick={handleRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;