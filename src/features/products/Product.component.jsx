import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getDatabase, ref, query, get } from 'firebase/database';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Product.css';
import Stack from '@mui/material/Stack';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

import SelectQuantityField from './SelectQuantityField.component';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, alertRef) {
  return <MuiAlert elevation={6} ref={alertRef} variant="filled" {...props} />;
});

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [alertOpen, setAlertOpen] = useState(false);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = query(ref(db, `products/${productId}`));

    get(productsRef).then((snapshot) => {
      setProduct(snapshot.exists() ? snapshot.val() : {});
    });
  }, [productId]);

  if (!product) {
    return (
      <Container sx={{ pt: 2, pb: 6 }} maxWidth="md">
        <Typography variant="h5" align="center" sx={{ mt: 3 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <>
      <Container sx={{ pt: 2, pb: 6 }} maxWidth="md">
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon sx={{ margin: 1 }} />
          </IconButton>
          <Typography variant="h5" align="left" sx={{ mb: 1 }}>
            {product?.name}
          </Typography>
        </Stack>
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="main-img-container"
        >
          {product.images.map((image) => {
            return (
              <SwiperSlide key={image}>
                <img src={image} alt={`{product.name}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumb-swiper-container"
        >
          {product.images.map((image) => {
            return (
              <SwiperSlide key={image}>
                <img src={image} alt={`thumb for {product.name}`} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Typography variant="p" align="left" whiteSpace="pre-line">
          {product?.description}
        </Typography>

        <SelectQuantityField
          product={product}
          onAddCart={() => {
            setAlertOpen(true);
          }}
        />
        <Snackbar
          onClose={handleClose}
          open={alertOpen}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
            action={
              <Button
                size="small"
                color="tertiary"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </Button>
            }
          >
            {'Item added to your cart'}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Product;
