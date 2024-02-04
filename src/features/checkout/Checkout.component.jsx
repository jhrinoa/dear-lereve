import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { clearCart } from './cartSlice';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Stack from '@mui/material/Stack'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getTotal } from '../cart/cartSlice'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const Checkout = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const { totalPrice } = useSelector(getTotal)

  return (
    <Container sx={{ pt: 2, pb: 6 }} maxWidth="md">
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton
          onClick={() => {
            navigate(-1)
          }}
        >
          <ArrowBackIcon sx={{ margin: 1 }} />
        </IconButton>
        <Typography variant="h5" align="left">
          Checkout
        </Typography>
      </Stack>
      <TextField
        sx={{
          marginBottom: 2,
        }}
        label="Name"
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        required
      />

      <TextField
        sx={{
          marginBottom: 2,
        }}
        label="Email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        required
      />

      <FormLabel id="pickup-options-group-label">Pick up options</FormLabel>
      <RadioGroup
        aria-labelledby="pickup-options-group-label"
        defaultValue="Coquitlam"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="Coquitlam"
          control={<Radio />}
          label="Coquitlam"
        />
        <FormControlLabel value="Langley" control={<Radio />} label="Langley" />
        <FormControlLabel value="Burnaby" control={<Radio />} label="Burnaby" />
        <FormControlLabel
          value="Delivery"
          disabled={totalPrice < 150}
          control={<Radio />}
          label="Delivery option available only when total price is more than $150"
        />
      </RadioGroup>

      <Button
        disabled={name.length <= 0 || email.length <= 0}
        variant="contained"
        onClick={() => {
          console.log('will submit with: ', cart)
        }}
        size="small"
        sx={{
          mt: 4,
        }}
      >
        Submit
      </Button>
    </Container>
  )
}

export default Checkout
