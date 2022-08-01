import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getDatabase, ref, query, get } from 'firebase/database';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './Product.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = query(ref(db, `products/${productId}`));

    get(productsRef).then((snapshot) => {
      setProduct(snapshot.exists() ? snapshot.val() : {});
    });
  }, [productId]);

  const imageSection = !product ? (
    <div>Loading</div>
  ) : (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="main-img-container"
      >
        {product.images.map((image) => {
          return (
            <SwiperSlide key={image}>
              <img src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
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
              <img src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );

  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      <Typography variant="h5" align="left" sx={{ mb: 3 }}>
        {product?.name}
      </Typography>
      {imageSection}
      <Typography variant="p" align="left" whiteSpace="pre-line">
        {product?.description}
      </Typography>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </Container>
  );
};

export default Product;
