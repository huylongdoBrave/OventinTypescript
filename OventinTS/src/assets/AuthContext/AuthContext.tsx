// import React, { createContext, useState, useCallback, useEffect, useContext, ReactNode } from 'react';
// import { type User } from '../components/RegisterPopup/RegisterPopup';

// // 1. Định nghĩa "hình dạng" của Context
// interface AuthContextType {
//   isLoggedIn: boolean;
//   currentUser: User | null;
//   login: (user: User) => void;
//   logout: () => void;
// }

// // 2. Tạo Context với giá trị mặc định
// // Giá trị mặc định chỉ được dùng khi một component không được bọc trong Provider
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // 3. Tạo Provider Component
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   // Kiểm tra user đã đăng nhập từ localStorage khi app được load
//   useEffect(() => {
//     const loggedInUserJSON = localStorage.getItem('loggedInUser');
//     if (loggedInUserJSON) {
//       try {
//         const user = JSON.parse(loggedInUserJSON);
//         setCurrentUser(user);
//         setIsLoggedIn(true);
//       } catch (error) {
//         console.error("Error parsing logged in user data:", error);
//         localStorage.removeItem('loggedInUser');
//       }
//     }
//   }, []);

//   // Hàm xử lý đăng nhập
//   const login = useCallback((user: User) => {
//     localStorage.setItem('loggedInUser', JSON.stringify(user));
//     setCurrentUser(user);
//     setIsLoggedIn(true);
//   }, []);

//   // Hàm xử lý đăng xuất
//   const logout = useCallback(() => {
//     localStorage.removeItem("loggedInUser");
//     setCurrentUser(null);
//     setIsLoggedIn(false);
//   }, []);

//   const value = { isLoggedIn, currentUser, login, logout };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // 4. Tạo custom hook `useAuth` để dễ dàng truy cập context
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

