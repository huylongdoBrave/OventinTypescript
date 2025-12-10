import { Route, Routes } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import LoginAccess from './components/LoginAcess.tsx';
import Footer from './components/Footer.tsx'
import WheelGame from './components/WheelGame/WheelGames.tsx';
import Profile from './components/Profile/Profile.tsx';
import Header from './components/Header.tsx';
import LoginPopup from "./components/LoginPopup/LoginPopup.tsx";
import RuleRegisterPopup from "./components/RegisterPopup/RuleRegisterPopup.tsx";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup.tsx";
import RuleEvent from './components/RuleEvent.tsx';

function App() {

  //State quản lý đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //state login popup
  const [isLoginPopup, setIsLoginPopupOpen] = useState(false);
  //state register popup
  const [isRegisterPopup, setIsRegisterPopupOpen] = useState(false);
  //state rule register popup
  const [isRulePopupOpen, setIsRulePopupOpen] = useState(false);

  // Callbacks để mở popup
  const openLoginPopup = useCallback(() => setIsLoginPopupOpen(true), []);
  const openRulePopup = useCallback(() => setIsRulePopupOpen(true), []);

  // Callbacks để đóng popup
  const closeLoginPopup = useCallback(()=> setIsLoginPopupOpen(false), []);
  const closeRegisterPopup = useCallback(()=> setIsRegisterPopupOpen(false), []);
  const closeRulePopup = useCallback(() => setIsRulePopupOpen(false), []);

  // Hàm xử lý popup điều khoản
  const handleAgreeToRules = useCallback(() => {
    closeRulePopup(); // Đóng popup điều khoản
    setIsRegisterPopupOpen(true); // Mở popup đăng ký
  }, [closeRulePopup]);

  // Hàm xử lý đã đăng nhập
  const handleLoginSuccess = () =>{
    setIsLoggedIn(true);
    closeLoginPopup();
  };

  // Effect quản lý class 'body-no-scroll' khi popup mở/đóng
  useEffect(() => {
    if (isLoginPopup || isRegisterPopup || isRulePopupOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    // Cleanup function để đảm bảo class được xóa khi component unmount
    return () => document.body.classList.remove("body-no-scroll");
  }, [isLoginPopup, isRegisterPopup, isRulePopupOpen]);

  // Quyền xem trang
  const [isLogginAccess, setIsLoggedInAccess] = useState(false);
  // Kiểm tra phiên đăng nhập 
  useEffect(() => {
    const checkAccessSession = () => {
      const sessionData = localStorage.getItem("accessSession");
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData);
          const now = new Date().getTime();
          const sessionDuration = 8 * 60 * 60 * 1000; 

          if (session.isLoggedIn && (now - session.timestamp < sessionDuration)) {
            setIsLoggedInAccess(true); 
          } else {
            localStorage.removeItem("accessSession"); 
          }
        } catch (error) {
          localStorage.removeItem("accessSession"); 
          console.error("Error parsing session data:", error);
        }
      }
    };
    checkAccessSession();
  }, []); // Chạy một lần khi component được mount

  if(!isLogginAccess) {
    return <LoginAccess onLoginSuccess={() => setIsLoggedInAccess(true)} />
  }

  return (
    <div className="pb-[5px] lg:pb-0">    
      <Header 
      isLoggedIn={isLoggedIn} 
      onLoginClick={openLoginPopup}
      onRegisterClick={openRulePopup}
      />

        <LoginPopup 
          isOpen={isLoginPopup} 
          onClose={closeLoginPopup} 
          onLoginSuccess={handleLoginSuccess}
        />

        <RuleRegisterPopup
          isOpen={isRulePopupOpen}
          onClose={closeRulePopup}
          onAgree={handleAgreeToRules}
        />

        <RegisterPopup 
          isOpen={isRegisterPopup} 
          onClose={closeRegisterPopup} 
        />

      <Routes>
        {/* Trang chủ (vòng quays) */}
        <Route path="/" element={<WheelGame isLoggedIn={isLoggedIn}/>} />
        <Route path="/WheelGame" element={<WheelGame isLoggedIn={isLoggedIn}/>} />

        {/* Trang sản phẩm */}
        {/* <Route path="/prizewheel/products" element={<ShowPrize />} /> */}

        {/* Profile */}
        <Route path="/Profile" element={<Profile onLogout={() => setIsLoggedIn(false)} />} />

        {/* Thể lệ */}
        <Route path="/RuleEvent" element={<RuleEvent />} />
      </Routes>

      <Footer />

    </div>
  )
}

export default App
