import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { auth } from '../../base';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, username, pwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(setCredentials({ user: user.uid, token: user.accessToken }));
        navigate('/admin');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed with errorCode: ', errorCode);
        console.error('Login failed with errorMessage: ', errorMessage);

        setErrorMsg(errorMessage);
      });
  };

  return (
    <form onSubmit={login}>
      <div>{errorMsg}</div>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <label htmlFor="pasword">Password:</label>
      <input
        id="password"
        type="password"
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminLogin;
