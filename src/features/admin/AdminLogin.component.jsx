import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "../../app/services/auth";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [login, { isLoading }] = useLoginMutation();

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
          const user = await login({
            username,
            password: pwd,
          }).unwrap();
          dispatch(setCredentials(user));
          navigate("/admin");
        }}
      >
        Submit
      </button>
      {isLoading ? <span>LOADING</span> : null}
    </>
  );
};

export default AdminLogin;
