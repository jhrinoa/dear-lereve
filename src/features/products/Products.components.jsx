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
    <>
      <div>{`Products will be loaded with ${url}`}</div>
      {products.map((p) => {
        return <div>{p.name}</div>;
      })}
    </>
  );
};

export default Products;
