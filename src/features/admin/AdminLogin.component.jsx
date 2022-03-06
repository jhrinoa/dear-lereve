import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { auth } from "../../base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
      <div>Enter your username</div>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <div>Enter your password</div>
      <input
        value={pwd}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          console.log("making request");
          const auth = getAuth();
          signInWithEmailAndPassword(auth, username, pwd)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              dispatch(
                setCredentials({ user: user.uid, token: user.accessToken })
              );
              navigate("/admin");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Login failed with errorCode: ", errorCode);
              console.error("Login failed with errorMessage: ", errorMessage);
            });
        }}
      >
        Submit
      </button>
    </>
  );
};

export default AdminLogin;
