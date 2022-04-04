import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { auth } from '../../base';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saveUsername, setSaveUsername] = useState(
    !!localStorage.getItem('username')
  );

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, username, pwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(setCredentials({ user: user.uid, token: user.accessToken }));

        if (saveUsername) {
          localStorage.setItem('username', username);
        }

        navigate('/admin');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed with errorCode: ', errorCode);
        console.error('Login failed with errorMessage: ', errorMessage);

        setErrorMsg(errorMessage);
        setUsername('');
        setPwd('');
        setSaveUsername(false);
      });
  };

  return (
    <form onSubmit={login}>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <div>{errorMsg}</div>

        <TextField
          sx={{
            marginBottom: 2,
          }}
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <TextField
          sx={{
            marginBottom: 2,
          }}
          type="password"
          label="Password"
          fullWidth
          variant="outlined"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={saveUsername}
                onChange={(event) => {
                  setSaveUsername(event.target.checked);
                }}
              />
            }
            label="Save username"
          />
        </FormGroup>

        <Button
          sx={{
            marginTop: 2,
          }}
          variant="contained"
          type="submit"
          disabled={!username || !pwd}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AdminLogin;
