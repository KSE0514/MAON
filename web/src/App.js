import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useState } from "react";

const GoogleLoginButton = ({ setUserInfo, setToken }) => {
  const clientId =
    "517964408407-o44n8rq8fvc58bbj6jmhfu8k2hlu6ss5.apps.googleusercontent.com";

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwt_decode(token);

    setToken(token); // 부모 컴포넌트(App)에서 정의된 setToken을 통해 token을 저장
    setUserInfo(decoded); // 부모 컴포넌트(App)에서 정의된 setUserInfo를 통해 userInfo 저장

    // React Native 앱으로 리디렉션 (딥 링크)
    const appRedirectUrl = `exp://127.0.0.1:8081/--/redirect?token=${token}&name=${encodeURIComponent(
      decoded.name
    )}&email=${encodeURIComponent(decoded.email)}`;
    console.log("Redirecting to:", appRedirectUrl);
    window.location.href = appRedirectUrl;
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={(error) => {
          console.error("Login Failed", error);
        }}
      />
    </GoogleOAuthProvider>
  );
};

function App() {
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태
  const [token, setToken] = useState(null); // 토큰을 저장할 상태

  return (
    <div className="App">
      <header className="App-header">
        <GoogleLoginButton setUserInfo={setUserInfo} setToken={setToken} />

        {/* 토큰을 화면에 표시하는 부분 */}
        {token && (
          <div>
            <h3>Access Token:</h3>
            <p>{token}</p>
          </div>
        )}

        {/* 유저 정보 표시 */}
        {userInfo ? (
          <div>
            <h2>Welcome, {userInfo.name}!</h2>
            <p>Email: {userInfo.email}</p>
            <img
              src={userInfo.picture}
              alt="Profile"
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            />
          </div>
        ) : (
          <p>로그인하여 유저 정보를 확인하세요.</p>
        )}
      </header>
    </div>
  );
}

export default App;
