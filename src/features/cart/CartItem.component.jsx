import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Color from '../../components/Color.component';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from './cartSlice';

const CartItem = ({ itemId, color, size, quantity, product }) => {
  const { mainImg: img, name, price } = product;
  const dispatch = useDispatch();

  const totalPrice = parseInt(price) * quantity;

  return (
    <Box sx={{ borderBottom: '1px solid grey', py: 3 }}>
      <Stack direction="row" alignItems="center" spacing={0}>
        <img
          src={img}
          alt={name}
          style={{
            width: 60,
            objectFit: 'contain',
          }}
        />
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography
            variant="p"
            align="left"
            sx={{
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              mt: 1,
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="p" align="center">
                Color:
              </Typography>
              <Color size={20} color={color} />
            </Stack>
          </Box>

          <Typography variant="p" align="center">
            Size:
          </Typography>
          <span> {size} </span>
        </Box>
        <Box>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(incrementQuantity(itemId));
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography variant="h6" align="center">
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(decrementQuantity(itemId));
            }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h6" align="center">
            {`$${totalPrice}`}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartItem;
