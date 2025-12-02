// import React, { memo } from "react";

// interface HeaderProps {
//   isLoggedIn: boolean;
//   onLoginClick: () => void;
//   onRegisterClick: () => void;
// }

// const HeaderComponent: React.FC<HeaderProps> = ({
//   isLoggedIn,
//   onLoginClick,
//   onRegisterClick,
// }) => {
//   return (
//     <header className="absolute top-0 left-0 right-0 p-4 z-30">
//       <div className="container mx-auto flex justify-end items-center">
//         {!isLoggedIn && (
//           <div className="flex items-center gap-6">
//             <button
//               onClick={onLoginClick}
//               className="text-white font-bold hover:text-yellow-300 transition-colors"
//             >
//               Đăng nhập
//             </button>
//             <button
//               onClick={onRegisterClick}
//               className="text-white font-bold hover:text-yellow-300 transition-colors"
//             >
//               Đăng ký
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export const Header = memo(HeaderComponent);
