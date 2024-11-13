import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useState } from "react";

const GoogleLoginButton = () => {
  const clientId = "517964408407-o44n8rq8fvc58bbj6jmhfu8k2hlu6ss5.apps.googleusercontent.com";

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwt_decode(token);

    // 유저 정보를 React Native 앱으로 전달
    const userInfo = {
      token,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    // React Native WebView로 메시지 전달
    window.ReactNativeWebView.postMessage(JSON.stringify(userInfo));
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* <div>안녕</div> */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
