import React from 'react';
import Box from '@mui/material/Box';
import Color from '../../components/Color.component';

const CartItem = ({ name, color, size, quantity, img }) => {
  return (
    <Box>
      {name}
      <Color color={color} />
      <span> {size} </span>
      {quantity}
    </Box>
  );
};

export default CartItem;
