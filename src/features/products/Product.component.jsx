import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Product = () => {
  let navigate = useNavigate();
  let params = useParams();

  return (
    <>
      <div>Will display {params.productName}</div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </>
  );
};

export default Product;
