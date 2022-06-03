import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const ProductCard = ({ product, isEditable, scrollTo }) => {
  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    if (!scrollTo || !cardRef) {
      return;
    }

    cardRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    });
  });

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
        }}
        ref={cardRef}
        onClick={() => {
          navigate(`/product/${product.name}`);
        }}
      >
        <CardMedia
          sx={{ height: 200, objectFit: 'contain' }}
          component="img"
          image={product.mainImg}
          alt={product.name}
        />
        <CardContent sx={{ flexGrow: 0 }}>
          <Grid container justifyContent="space-between" flexWrap="nowrap">
            <Typography inline variant="h6" align="left" marginRight={1}>
              {product.name}
            </Typography>
            <Typography inline variant="p" align="right" margin="auto 0">
              {`$${product.price}`}
            </Typography>
          </Grid>

          <Typography marginTop={2}>{product.description}</Typography>
        </CardContent>
        {isEditable ? (
          <CardActions sx={{ margin: 'auto' }}>
            <Button size="small">Edit</Button>
          </CardActions>
        ) : null}
      </Card>
    </>
  );
};

export default ProductCard;
