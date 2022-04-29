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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Products = ({ url }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    let productsRef;
    if (url === 'all') {
      productsRef = query(ref(db, 'products'), limitToFirst(10));
    } else {
      productsRef = query(
        ref(db, 'products'),
        orderByChild(`labels/${url}`),
        equalTo(true)
      );
    }
    get(productsRef).then((snapshot) => {
      setProducts(snapshot.exists() ? Object.values(snapshot.val()) : []);
    });
  }, [url]);

  return (
    <Container sx={{ py: 6, height: 1500 }} maxWidth="md">
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.name} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
              }}
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
                <Grid
                  container
                  justifyContent="space-between"
                  flexWrap="nowrap"
                >
                  <Typography inline variant="h6" align="left" marginRight={1}>
                    {product.name}
                  </Typography>
                  <Typography inline variant="p" align="right" margin="auto 0">
                    {`$${product.price}`}
                  </Typography>
                </Grid>

                <Typography marginTop={2}>{product.description}</Typography>
              </CardContent>
              {user ? (
                <CardActions sx={{ margin: 'auto' }}>
                  <Button size="small">Edit</Button>
                </CardActions>
              ) : null}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
