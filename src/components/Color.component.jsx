import React from 'react';
import Box from '@mui/material/Box';

const Color = ({ size = 30, color, selected, onClick }) => {
  const style = {
    height: size,
    width: size,
    backgroundColor: color,
    borderRadius: '50%',
    border: '1px solid black',
    margin: 1,
    display: 'inline-block',
  };

  if (selected) {
    style.boxShadow = `0 0 0 4px #000000AA`;
  }
  return <Box sx={style} onClick={onClick} />;
};

export default Color;
