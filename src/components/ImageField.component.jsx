import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const ImageField = ({
  imgUrl,
  index,
  onUp,
  onDown,
  onCheckboxClick,
  checked,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={onUp}>
          <ArrowUpwardIcon sx={{ margin: 1 }} />
        </IconButton>
        <IconButton onClick={onDown}>
          <ArrowDownwardIcon sx={{ margin: 1 }} />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          margin: 10,
          cursor: 'pointer',
        }}
        key={imgUrl}
        onClick={() => {
          onCheckboxClick(imgUrl);
        }}
      >
        <img src={imgUrl} alt={`img_${index}`} width="200" />
      </div>
      <Checkbox checked={checked} />
    </div>
  );
};

export default ImageField;
