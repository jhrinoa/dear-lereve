import { useState } from 'react';
import { storage, database } from '../../base';
import { ref as dbRef, set } from 'firebase/database';
import {
  getDownloadURL,
  ref as stgRef,
  uploadBytesResumable,
} from 'firebase/storage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';

const ProductRegister = () => {
  const [mainImg, setMainImg] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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

    set(dbRef(database, 'products/' + name), product);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setImages([]);
    const target = e.target[0];

    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];

      uploadFile(file, name);
    }
  };

  const uploadFile = (file, name) => {
    if (!file) return;

    const storageRef = stgRef(storage, `/${name}/images/${file.name}`);
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
    <>
      <Typography align="center" variant="h4">
        Product Register
      </Typography>

      <Container
        sx={{
          p: '0 0 30px 0',
        }}
      >
        <Box
          sx={{
            p: '20px 0',
            width: 300,
          }}
        >
          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Size"
              variant="outlined"
              fullWidth
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              inputProps={{
                step: 0.01,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            padding: 1,
          }}
        >
          <form onSubmit={formSubmitHandler}>
            <input accept="image/*" multiple="multiple" type="file" />
            <Button
              variant="contained"
              type="submit"
              disabled={name.length < 1}
            >
              Upload
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            padding: 1,
            display: 'flex',
          }}
        >
          {images.map((imgUrl, index) => (
            <div key={imgUrl}>
              <img src={imgUrl} width="200" />
              <input
                type="checkbox"
                checked={index === mainImg}
                onClick={() => {
                  setMainImg(index);
                }}
              />
            </div>
          ))}
        </Box>

        <Button variant="contained" onClick={createProduct}>
          Create
        </Button>
      </Container>
    </>
  );
};

export default ProductRegister;
