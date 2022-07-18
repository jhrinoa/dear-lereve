import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const SizeField = ({ size, selected, onDeleteClick }) => {
  const style = {
    display: 'inline-block',
  };

  if (selected) {
    style.boxShadow = '0 0 0 4px';
  }

  return (
    <Box sx={style}>
      {`${size.size} (${size.quantity})`}
      <IconButton
        onClick={() => {
          onDeleteClick(size);
        }}
      >
        <DeleteIcon sx={{ margin: 1 }} />
      </IconButton>
    </Box>
  );
};

export default SizeField;
