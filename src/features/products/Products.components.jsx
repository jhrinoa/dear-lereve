import React, { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  get,
  equalTo,
  limitToFirst,
} from 'firebase/database';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAuth } from '../../hooks/useAuth';
import ProductCard from './ProductCard.component';
import { useNavigationType, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectLastViewedProductId } from './productSlice';

const Products = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navType = useNavigationType();
  const lastViewedProductId = useSelector(selectLastViewedProductId);

  useEffect(() => {
    const db = getDatabase();
    let productsRef;
    if (!category) {
      productsRef = query(ref(db, 'products'), limitToFirst(10));
    } else {
      productsRef = query(
        ref(db, 'products'),
        orderByChild(`labels/${category}`),
        equalTo(true)
      );
    }
    get(productsRef).then((snapshot) => {
      setProducts(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  }, [category]);

  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.name} xs={12} sm={6} md={4}>
            <ProductCard
              product={product}
              isEditable={!!user}
              scrollTo={navType === 'POP' && lastViewedProductId === product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
