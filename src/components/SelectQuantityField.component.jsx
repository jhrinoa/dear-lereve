import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Color from './Color.component';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const getColorToSizeMap = (entries) => {
  const resultMap = {};
  entries?.forEach((entry) => {
    if (resultMap[entry.color]) {
      resultMap[entry.color] = [...resultMap[entry.color], entry.size];
    } else {
      resultMap[entry.color] = [entry.size];
    }
  });

  return resultMap;
};

const SelectQuantityField = ({ product }) => {
  const { quantities } = product;
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const style = {
    display: 'flex',
    alignItems: 'center',
  };
  const colorToSizeMap = getColorToSizeMap(quantities);
  const colors = Object.keys(colorToSizeMap);
  const sizes = colorToSizeMap[selectedColor];

  const sizesSection = sizes ? (
    <Box sx={style}>
      <Typography variant="label" align="left">
        Available sizes:
      </Typography>
      <ul>
        {sizes?.map((size) => {
          return (
            <li
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                margin: '0 10px',
                border: '1px solid black',
                borderRadius: 5,
                cursor: 'pointer',
                boxShadow:
                  selectedSize === size ? '0 0 0 3px #000000AA' : undefined,
              }}
              onClick={() => {
                setSelectedSize(size);
              }}
              key={size}
            >
              {size}
            </li>
          );
        })}
      </ul>
    </Box>
  ) : null;

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={style}>
        <Typography variant="label" align="left">
          Select color:
        </Typography>
        <section>
          {colors.map((color) => {
            return (
              <Color
                key={color}
                selected={color === selectedColor}
                color={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize('');
                }}
              />
            );
          })}
        </section>
      </Box>
      {sizesSection}

      <Button
        disabled={!selectedSize || !selectedColor}
        variant="contained"
        onClick={() => {
          dispatch(
            addToCart({
              selectedColor,
              selectedSize,
              product,
            })
          );
        }}
        sx={{ my: 3 }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default SelectQuantityField;
