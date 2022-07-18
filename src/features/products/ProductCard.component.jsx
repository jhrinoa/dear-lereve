import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { setLastViewedProductName } from './productSlice';

import { storage, database } from '../../base';
import { ref, deleteObject } from 'firebase/storage';
import { ref as dbRef, remove } from 'firebase/database';

const ProductCard = ({ product, isEditable, scrollTo }) => {
  const navigate = useNavigate();
  const cardRef = useRef();
  const dispatch = useDispatch();

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
          dispatch(setLastViewedProductName(product.name));
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
        </CardContent>
        {isEditable ? (
          <CardActions sx={{ justifyContent: 'space-evenly' }}>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();

                // delete images
                product.images.forEach((imgLink) => {
                  const desertRef = ref(storage, imgLink);

                  deleteObject(desertRef)
                    .then(() => {})
                    .catch((error) => {
                      console.log(`failed deleting image ${desertRef}`, error);
                    });
                });

                // delete product
                remove(dbRef(database, 'products/' + product.id))
                  .then(() => {})
                  .catch((error) => {
                    console.log(
                      `Failed on deleting ${product.id} with error`,
                      error
                    );
                  });
              }}
            >
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </>
  );
};

export default ProductCard;
