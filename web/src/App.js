import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState(null); // 유저 정보를 저장할 상태
  const [token, setToken] = useState(null); // 토큰을 저장할 상태

  // 테스트용 사용자 정보
  const testUserInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    picture: "https://via.placeholder.com/100",
  };

  // 테스트용 토큰
  const testToken = "sample_token_123456";

  const handleTestButtonClick = () => {
    // 버튼 클릭 시 테스트용 사용자 정보와 토큰을 설정
    setUserInfo(testUserInfo);
    setToken(testToken);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google OAuth 테스트 페이지</h1>
        {/* 테스트 버튼 클릭 시 토큰과 유저 정보 설정 */}
        <button onClick={handleTestButtonClick}>테스트 정보 로드</button>

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
