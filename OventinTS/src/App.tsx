import { Route, Routes } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
// import LoginAccess from './features/LoginAcess.tsx';
import Footer from './features/Footer.tsx'
import WheelGame from './features/WheelGame/WheelGames.tsx';
import Profile from './features/Profile/components/Profile.tsx';
import InfoProfile from './features/Profile/components/InfoProfile.tsx';
import Header from './features/Header.tsx';
import LoginPopup from "./features/LoginPopup/LoginPopup.tsx";
import RuleRegisterPopup from "./features/RegisterPopup/RuleRegisterPopup.tsx";
import RegisterPopup, { type User } from "./features/RegisterPopup/RegisterPopup.tsx";
import RuleEvent from './features/RuleEvent.tsx';
import PrizeExchange from './features/PrizeExchange/components/PrizeExchange.tsx';
import Prize from './features/Prize/components/Prize.tsx';


//    ====== APP CHÍNH QUẢN LÝ ROUTES VÀ TRẠNG THÁI ĐĂNG NHẬP  ======

function App() {

  //State quản lý đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //state login popup
  const [isLoginPopup, setIsLoginPopupOpen] = useState(false);
  //state register popup
  const [isRegisterPopup, setIsRegisterPopupOpen] = useState(false);
  //state rule register popup
  const [isRulePopupOpen, setIsRulePopupOpen] = useState(false);
  //state user logged
  const [userLogged, setUserLogged] = useState<User | null >(null);

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
  const handleLoginSuccess = (user: User) =>{
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Lưu user vào localStorage
    setUserLogged(user); // Cập nhật user state userLogged
    setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
    closeLoginPopup();
  };

  // Hàm xử lý đăng xuất
  const handleAppLogout = () => {
    setIsLoggedIn(false);
    setUserLogged(null);
    // localStorage.removeItem("accessSession"); // Xóa phiên truy cập khi đăng xuất
    localStorage.removeItem("loggedInUser"); // Xóa thông tin user đăng nhập
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


  // Kiểm tra user đã đăng nhập từ localStorage khi app được load
  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      try {
        const user = JSON.parse(loggedInUserJSON);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserLogged(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing logged in user data:", error);
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);
  

  //  === TRẠNG THÁI XÁC THỰC QUYỀN XEM TRANG ZOOTOPIA ===
  //      Quyền xem trang với 3 trạng thái: đang kiểm tra, đã xác thực, chưa xác thực
  // const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');

  // // Kiểm tra đăng nhập quyền xem trang Zootopia
  // useEffect(() => {
  //   const checkAccessSession = () => {
  //     const sessionData = localStorage.getItem("accessSession");
  //     if (sessionData) {
  //       try {
  //         const session = JSON.parse(sessionData);
  //         const now = new Date().getTime();
  //         const sessionDuration = 50 * 60 * 1000; // Phiên truy cập hợp lệ trong 50 phút

  //         if (session.isLoggedIn && (now - session.timestamp < sessionDuration)) {
  //           setAuthStatus('authenticated'); 
  //         } else {
  //           localStorage.removeItem("accessSession"); 
  //           setAuthStatus('unauthenticated');
  //         }
  //       } catch (error) {
  //         localStorage.removeItem("accessSession"); 
  //         setAuthStatus('unauthenticated');
  //         console.error("Error parsing session data:", error);
  //       }
  //     } else {
  //       setAuthStatus('unauthenticated');
  //     }
  //   };
  //   checkAccessSession();
  // }, []); // Chạy một lần khi component được mount

  // // Chờ kiểm tra phiên hoàn tất
  // if (authStatus === 'checking') {
  //   return null; // Hoặc 1 component loading toàn màn hình
  // }
  // if (authStatus === 'unauthenticated') {
  //   return <LoginAccess onLoginSuccess={() => setAuthStatus('authenticated')} />
  // }
  //  === ENDING XỬ LÝ XÁC THỰC ===


  return (
    <div className="pb-[5px] lg:pb-0">    
      <Header 
      currentUser={userLogged}
      isLoggedIn={isLoggedIn} 
      onLoginClickFeater={openLoginPopup}
      onRegisterClickFeater={openRulePopup}
      />
      <main>


        <LoginPopup 
          isOpen={isLoginPopup} 
          onClose={closeLoginPopup} 
          onUserLoginSuccess={handleLoginSuccess}
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

        {/* Trang quà */}
        <Route path="/Prize" element={<Prize />} />

        {/* Trang đổi quà */}
        <Route path="/PrizeExchange" element={<PrizeExchange />} />

        {/* Profile */}
        <Route path="/Profile" element={<Profile currentUser={userLogged} onLogout={handleAppLogout} />} />
        
        {/* Info Profile */}
        <Route path="/InfoProfile" element={<InfoProfile />} />

        {/* Thể lệ */}
        <Route path="/RuleEvent" element={<RuleEvent />} />

      </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App
