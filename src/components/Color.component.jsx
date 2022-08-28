import React from 'react';
import Box from '@mui/material/Box';

const Color = ({ color, selected, onClick }) => {
  const style = {
    height: 30,
    width: 30,
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
