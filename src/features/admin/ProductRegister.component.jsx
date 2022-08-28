import { useState, useReducer } from 'react';
import { database } from '../../base';
import { ref as dbRef, set } from 'firebase/database';
import { customAlphabet } from 'nanoid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { HexColorPicker } from 'react-colorful';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import QuantityField from '../../components/QuantityField.component';
import ImageField from '../../components/ImageField.component';
import ImagesUpload from './ImagesUpload.component';

const CATEGERY = ['now', 'sale', 'baby', 'acc'];

const ProductRegister = () => {
  const [mainImg, setMainImg] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState({});
  const [discountRate, setDiscountRate] = useState('');
  const [quantity, setQuantity] = useState('');

  const [quantities, setQuantities] = useState([]);

  const [size, setSize] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const forceUpdate = useReducer(() => ({}), {})[1];

  const resetForm = () => {
    setMainImg();
    setImages([]);
    setName('');
    setColor('');
    setPrice('');
    setDescription('');
    setLabels({});
    setDiscountRate('');
    setQuantity('');
    setSize('');
    setLoading(false);
    setQuantities([]);
  };

  const ID_LENGTH = 10;

  const createProduct = () => {
    const nanoid = customAlphabet('1234567890abcdef', ID_LENGTH);
    const id = nanoid();
    const product = {
      id,
      name,
      price,
      description,
      images,
      mainImg,
      labels,
      discountRate,
      quantities,
    };

    setLoading(true);

    try {
      set(dbRef(database, 'products/' + id), product)
        .then(() => {
          resetForm();
          setMessage('Success');
        })
        .catch((err) => {
          console.log('error: ', err);
          setLoading(false);
          setMessage(`Failed with an error: ${err}`);
        });
    } catch (err) {
      console.error('error: ', err);
      setLoading(false);
      setMessage(`Failed with an error: ${err}`);
    }
  };

  const isNameInvalid = !!name.match(/[.|$|#|[|\]]/);
  const isQuantityAddValid = () => {
    if (!color || !size || !quantity || parseInt(quantity) <= 0) {
      return false;
    }

    return !quantities.some(
      (q) => q.color === color && q.size === size && q.quantity === quantity
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
              error={isNameInvalid}
              helperText={
                isNameInvalid
                  ? 'Name should not contain ".", "#", "$", "[", or "]"'
                  : ''
              }
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
              mt: 2,
            }}
          >
            <FormControl
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <HexColorPicker color={color} onChange={setColor} />
              <TextField
                label="Size"
                variant="outlined"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
                sx={{ ml: 1 }}
              />
              <TextField
                label="Quantity"
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                inputProps={{
                  step: 1,
                  min: 0,
                }}
                sx={{ ml: 1 }}
              />
              <Button
                disabled={!isQuantityAddValid()}
                variant="contained"
                onClick={() => {
                  setQuantities((prevState) => [
                    ...prevState,
                    {
                      color,
                      size,
                      quantity,
                    },
                  ]);
                }}
                sx={{ ml: 1 }}
              >
                Add
              </Button>
            </FormControl>
            <Typography sx={{ pt: 2 }}>Quantities: </Typography>
            <section>
              {quantities.map((q) => (
                <QuantityField
                  key={`${q.color}-${q.size}-${q.quantity}`}
                  data={q}
                  onDeleteClick={(deletingItem) => {
                    setQuantities((prevState) =>
                      prevState.filter(
                        (s) =>
                          !(
                            s.color === deletingItem.color &&
                            s.size === deletingItem.size &&
                            s.quantity === deletingItem.quantity
                          )
                      )
                    );
                  }}
                />
              ))}
            </section>
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
              <InputLabel id="label-multiple-checkbox-label">Labels</InputLabel>
              <Select
                labelId="label-multiple-checkbox-label"
                id="label-multiple-checkbox"
                multiple
                value={Object.keys(labels)}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  setLabels(value.reduce((a, v) => ({ ...a, [v]: true }), {}));
                }}
                input={<OutlinedInput label="Labels" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {CATEGERY.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <Checkbox checked={!!labels[cat]} />
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
          <ImagesUpload
            name={name}
            onSuccess={setImages}
            onError={setMessage}
            onFileSelected={forceUpdate}
          />
        </Box>

        <Box
          sx={{
            padding: 1,
          }}
        >
          {images.map((imgUrl, index) => (
            <ImageField
              imgUrl={imgUrl}
              index={index}
              onUp={() => {
                if (index === 0) {
                  return;
                }
                const newImages = [...images];
                const prevImg = newImages[index - 1];
                newImages[index - 1] = imgUrl;
                newImages[index] = prevImg;
                setImages(newImages);
              }}
              onDown={() => {
                if (index === images.length - 1) {
                  return;
                }
                const newImages = [...images];
                const nextImg = newImages[index + 1];
                newImages[index + 1] = imgUrl;
                newImages[index] = nextImg;
                setImages(newImages);
              }}
              onCheckboxClick={() => {
                setMainImg(imgUrl);
              }}
              checked={imgUrl === mainImg}
            />
          ))}
        </Box>

        <Typography sx={{ pt: 2 }}>{message}</Typography>

        <Button
          disabled={loading || isNameInvalid}
          variant="contained"
          onClick={createProduct}
        >
          Create
        </Button>
      </Container>
    </>
  );
};

export default ProductRegister;
