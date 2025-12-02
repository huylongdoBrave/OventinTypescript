import { Route, Routes } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import Footer from './components/Footer.tsx'
import WheelGame from './components/WheelGame/WheelGames.tsx';
import Header from './components/Header.tsx';
import LoginPopup from "./components/LoginPopup/LoginPopup.tsx";
import RuleRegisterPopup from "./components/RegisterPopup/RuleRegisterPopup.tsx";
import RegisterPopup from "./components/RegisterPopup/RegisterPopup.tsx";

function App() {

  //State quản lý đăng nhập
  const isLoggedIn = false;

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

      <div>
      <Routes>
        {/* Route cho trang chủ (vòng quays) */}
        <Route path="/" element={<WheelGame />} />

        {/* Route cho trang sản phẩm */}
{/*         <Route path="/prizewheel/products" element={<ShowPrize />} /> */}

      </Routes>
      </div>

      <Footer />

    </div>
  )
}

export default App
