import React from 'react';
import Box from '@mui/material/Box';

const Color = ({ color, selected, onClick }) => {
  const style = {
    height: 30,
    width: 30,
    backgroundColor: color,
    borderRadius: '50%',
    margin: 1,
    display: 'inline-block',
  };

  if (selected) {
    style.boxShadow = '0 0 0 4px';
  }
  return <Box sx={style} onClick={onClick} />;
};

export default Color;
