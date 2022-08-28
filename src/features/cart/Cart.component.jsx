import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import CartItem from './CartItem.component';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <>
      {cart.map((item) => (
        <CartItem
          key={item.itemId}
          name={item.name}
          color={item.selectedColor}
          size={item.selectedSize}
          quantity={item.quantity}
          img={item.mainImg}
        />
      ))}
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        clear cart
      </button>
    </>
  );
};

export default Cart;
