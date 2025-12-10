import React from 'react';
import { useNavigate } from 'react-router-dom';

//    ====== UI Profile ======

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Gọi hàm onLogout được truyền từ App.tsx để cập nhật state isLoggedIn
    onLogout();
    navigate('/', { state: { fromLogout: true } });     // Điều hướng về trang chủ và gửi kèm state để báo hiệu là từ logout
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] pb-8 px-2'>
      <div className='flex flex-col items-center gap-8'>
        <h2 className='text-4xl font-bold text-white [-webkit-text-stroke:1px_#f6972c]'>
         Profile
        </h2>
        {/* Nút Đăng xuất */}
        <img onClick={handleLogout} className='text-transparent cursor-pointer w-[270px] 
            h-16 hover:scale-105 transition-transform' src="./static/logout.png" alt="Đăng xuất" />
      </div>
    </div>
  )
}

export default Profile
