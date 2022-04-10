import { useState, useRef, useReducer } from 'react';
import { storage, database } from '../../base';
import { ref as dbRef, set } from 'firebase/database';
import {
  getDownloadURL,
  ref as stgRef,
  uploadBytesResumable,
} from 'firebase/storage';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ChromePicker, CirclePicker } from 'react-color';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'FREE'];
const CATEGERY = [
  'outer',
  'top',
  'bottom',
  'ops',
  'set',
  'underwear',
  'socks',
  'acc',
];

const ProductRegister = () => {
  const [mainImg, setMainImg] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [colors, setColors] = useState([]);
  const [deletingColor, setDeletingColor] = useState('');
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState();
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState([]);
  const [discountRate, setDiscountRate] = useState(0);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const uploadImgRef = useRef();
  const forceUpdate = useReducer(() => ({}), {})[1];

  const resetForm = () => {
    setMainImg();
    setImages([]);
    setName('');
    setColor('');
    setColors([]);
    setDeletingColor('');
    setSizes([]);
    setPrice();
    setDescription('');
    setLabels([]);
    setDiscountRate(0);
    setLoading(false);
  };

  const createProduct = () => {
    const product = {
      name,
      color,
      sizes,
      price,
      description,
      images,
      mainImg: images[mainImg],
      labels,
      discountRate,
    };

    setLoading(true);

    resetForm();

    try {
      set(dbRef(database, 'products/' + name), product)
        .then(() => {
          resetForm();
          setResponse('Success');
        })
        .catch((err) => {
          console.log('error: ', err);
          setLoading(false);
          setResponse(`Failed with an error: ${err}`);
        });
    } catch (err) {
      console.error('error: ', err);
      setLoading(false);
      setResponse(`Failed with an error: ${err}`);
    }
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

  const uploadFile = (file, prod_name) => {
    if (!file) return;

    const storageRef = stgRef(storage, `/${prod_name}/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {},
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          uploadImgRef.current.value = '';
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
            <ChromePicker
              disableAlpha
              color={color}
              onChangeComplete={(col) => {
                setColor(col.hex);
              }}
            />
            <Typography sx={{ pt: 2 }}>Selected Colors: </Typography>
            <CirclePicker
              colors={colors}
              onChangeComplete={(col) => {
                setDeletingColor(col.hex);
              }}
            />
            <Button
              disabled={!color}
              variant="contained"
              onClick={() => {
                if (colors.findIndex((col) => col === color) < 0) {
                  setColors((prevState) => [...prevState, color]);
                }
              }}
              sx={{ mt: 2 }}
            >
              Add Color
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setColors((prevState) =>
                  prevState.filter((col) => col !== deletingColor)
                );
              }}
              sx={{ mt: 2, ml: 2 }}
            >
              Delete Color
            </Button>
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <FormControl
              sx={{
                width: '100%',
              }}
            >
              <InputLabel id="size-multiple-checkbox-label">Sizes</InputLabel>
              <Select
                labelId="size-multiple-checkbox-label"
                id="size-multiple-checkbox"
                multiple
                value={sizes}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  value.sort((a, b) =>
                    SIZES.indexOf(a) > SIZES.indexOf(b) ? 1 : -1
                  );
                  setSizes(value);
                }}
                input={<OutlinedInput label="Sizes" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {SIZES.map((size) => (
                  <MenuItem key={size} value={size}>
                    <Checkbox checked={sizes.indexOf(size) > -1} />
                    <ListItemText primary={size} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                min: 0,
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <TextField
              label="Discount Rate (%)"
              variant="outlined"
              type="number"
              fullWidth
              value={discountRate}
              onChange={(e) => {
                let rate = e.target.value;
                if (rate < 0) {
                  rate = 0;
                }

                if (rate > 100) {
                  rate = 100;
                }

                setDiscountRate(rate);
              }}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
              }}
            />
          </Box>

          <Box
            sx={{
              padding: 1,
            }}
          >
            <FormControl
              sx={{
                width: '100%',
              }}
            >
              <InputLabel id="size-multiple-checkbox-label">Labels</InputLabel>
              <Select
                labelId="label-multiple-checkbox-label"
                id="label-multiple-checkbox"
                multiple
                value={labels}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  setLabels(value);
                }}
                input={<OutlinedInput multiline={true} label="Labels" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {CATEGERY.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <Checkbox checked={labels.indexOf(cat) > -1} />
                    <ListItemText primary={cat} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            padding: 1,
          }}
        >
          <form onSubmit={formSubmitHandler}>
            <input
              accept="image/*"
              multiple="multiple"
              type="file"
              ref={uploadImgRef}
              onChange={() => {
                forceUpdate();
              }}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!uploadImgRef.current?.value}
            >
              Upload
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            padding: 1,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {images.map((imgUrl, index) => (
            <div
              style={{
                display: 'flex',
                flexFlow: 'column',
                margin: 10,
                cursor: 'pointer',
              }}
              key={imgUrl}
              onClick={() => {
                setMainImg(index);
              }}
            >
              <img src={imgUrl} width="200" />
              <Checkbox checked={index === mainImg} />
            </div>
          ))}
        </Box>

        <Typography sx={{ pt: 2 }}>{response}</Typography>

        <Button disabled={loading} variant="contained" onClick={createProduct}>
          Create
        </Button>
      </Container>
    </>
  );
};

export default ProductRegister;
