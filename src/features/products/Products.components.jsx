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

const Products = ({ url }) => {
  const [products, setProducts] = useState([]);

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
    <Container sx={{ py: 6 }} maxWidth="md">
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.name} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                sx={{ flexGrow: 1, objectFit: 'contain' }}
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
                  <Typography inline variant="h5" align="left" marginRight={1}>
                    {product.name}
                  </Typography>
                  <Typography inline variant="p" align="right">
                    {`$${product.price}`}
                  </Typography>
                </Grid>

                <Typography marginTop={2}>{product.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
