import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Color from './Color.component';

const QuantityField = ({ data, onDeleteClick }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Box sx={style}>
      <Color color={data.color} />
      <span
        style={{ marginLeft: '20px' }}
      >{`${data.size} (${data.quantity})`}</span>
      <IconButton
        onClick={() => {
          onDeleteClick(data);
        }}
      >
        <DeleteIcon sx={{ margin: 1 }} />
      </IconButton>
    </Box>
  );
};

export default QuantityField;
