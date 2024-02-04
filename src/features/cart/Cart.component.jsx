import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from './cartSlice';
import CartItem from './CartItem.component';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTotal } from './cartSlice';
import Button from '@mui/material/Button';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { totalPrice } = useSelector(getTotal);

  let content;

  if (cart.length === 0) {
    content = (
      <Typography variant="h5" align="center" sx={{ mt: 3 }}>
        Your cart is empty
      </Typography>
    );
  } else {
    content = cart.map((item) => (
      <CartItem
        key={item.itemId}
        itemId={item.itemId}
        product={item.product}
        color={item.selectedColor}
        size={item.selectedSize}
        quantity={item.quantity}
      />
    ));
  }

  return (
    <Container sx={{ pt: 2, pb: 6 }} maxWidth="md">
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon sx={{ margin: 1 }} />
        </IconButton>
        <Typography variant="h5" align="left">
          Your Cart
        </Typography>
      </Stack>
      {content}
      <Container sx={{ py: 3 }}>
        <Stack direction="row">
          <Typography variant="h6" align="left" sx={{ flex: 1 }}>
            Total price
          </Typography>
          <Typography variant="h5" align="left">
            {`$${totalPrice}`}
          </Typography>
        </Stack>
      </Container>

      <Stack direction="row">
        <Button
          onClick={() => {
            dispatch(clearCart());
          }}
          size="small"
        >
          clear cart
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button
          disabled={totalPrice <= 0}
          variant="contained"
          onClick={() => {
            navigate('/checkout');
          }}
          size="small"
        >
          Checkout
        </Button>
      </Stack>
    </Container>
  );
};

export default Cart;
