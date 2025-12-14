// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
// import ChangePasswordProfilePopup from './ChangePasswordProfilePopup'; // Import popup

// //    ====== UI Profile ======

// // Component Profile
// const Profile: React.FC = () => {
//   const navigate = useNavigate();
//   const { currentUser, logout } = useAuth(); // Lấy currentUser và hàm logout từ context
//   const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
//   // const [isFormProfile, setIsFormProfile] = useState(false);


//   // === Đăng xuất ===
//   const handleLogout = () => {
//     // Gọi hàm logout từ context
//     logout();
//     navigate('/', { state: { fromLogout: true } });   // Điều hướng về trang chủ và gửi kèm state để báo hiệu là từ logout
//   };


