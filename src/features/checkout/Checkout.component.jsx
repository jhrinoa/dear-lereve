import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { clearCart } from './cartSlice';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getTotal } from '../cart/cartSlice';
import Button from '@mui/material/Button';

const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { totalPrice } = useSelector(getTotal);

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
          Checkout
        </Typography>
      </Stack>
      <div>JLEE</div>
      {totalPrice}
    </Container>
  );
};

export default Checkout;
