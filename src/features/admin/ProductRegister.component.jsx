import { useState } from 'react';
import { storage, database } from '../../base';
import { ref as dbRef, set } from 'firebase/database';
import {
  getDownloadURL,
  ref as stgRef,
  uploadBytesResumable,
} from 'firebase/storage';

const ProductRegister = () => {
  const [mainImg, setMainImg] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const prod_id = '123';

  const createProduct = () => {
    const product = {
      name,
      color,
      size,
      price,
      description,
      images,
      mainImg: images[mainImg],
    };
    console.log('will create: ', product);

    set(dbRef(database, 'products/' + name), product);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const target = e.target[0];

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];

      uploadFile(file, prod_id);
    }
  };

  const uploadFile = (file, prod_id) => {
    if (!file) return;

    const storageRef = stgRef(storage, `/${prod_id}/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log('prog: ', prog);
      },
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImages((prevState) => [...prevState, url]);
        });
      }
    );
  };
  return (
    <div>
      <div>ProductRegister page</div>

      <form onSubmit={formSubmitHandler}>
        <input type="file" multiple="multiple" />
        <button type="submit">Upload</button>
      </form>

      {images.map((imgUrl, index) => (
        <div key={imgUrl}>
          <img src={imgUrl} width="100" height="100" />
          <input
            type="checkbox"
            checked={index === mainImg}
            onClick={() => {
              setMainImg(index);
            }}
          />
        </div>
      ))}
      <br />
      <br />
      <br />

      <label htmlFor="product-name">Name</label>
      <input
        id="product-name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <br />
      <br />
      <br />

      <label htmlFor="product-description">Description</label>
      <textarea
        id="product-description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <br />
      <br />
      <br />

      <label htmlFor="product-color">Color</label>
      <input
        id="product-color"
        type="text"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />

      <br />
      <br />
      <br />

      <label htmlFor="product-size">Size</label>
      <input
        id="product-size"
        type="text"
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      />

      <br />
      <br />
      <br />

      <label htmlFor="product-price">Price</label>
      <input
        id="product-price"
        type="text"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <br />
      <br />
      <br />
      <button onClick={createProduct}>Create</button>
    </div>
  );
};

export default ProductRegister;
