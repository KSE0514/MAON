// Login.js
import React, { useState } from "react";
import GoogleLoginButton from "../Componant/GoogleLoginButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <GoogleLoginButton
        setUserInfo={setUserInfo}
        setToken={setToken}
        navigate={navigate}
      />
    </div>
  );
};

export default Login;
