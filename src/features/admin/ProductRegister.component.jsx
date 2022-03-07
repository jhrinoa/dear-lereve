import { useState } from 'react';
import { storage, database } from '../../base';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const ProductRegister = () => {
  const [mainImg, setMainImg] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const prod_id = '123';

  const createProduct = () => {
    console.log('will create');
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

    const storageRef = ref(storage, `/${prod_id}/images/${file.name}`);
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
      <button onClick={createProduct}>Create</button>
    </div>
  );
};

export default ProductRegister;
