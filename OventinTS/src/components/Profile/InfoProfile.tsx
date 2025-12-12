import React from 'react';

const ProfileForm = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {/* FORM WRAPPER: Rộng 400px, không border, không nền */}
      <div className="w-[400px] bg-transparent border-none">
        
        {/* 1. IMAGE TITLE */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://via.placeholder.com/150x50?text=LOGO+HERE" 
            alt="Title Image" 
            className="h-auto max-w-full object-contain"
          />
        </div>

        {/* 2. BUTTON TITLE  */}
        <div className="flex justify-center mb-4">
          <span className="
            inline-block 
            bg-blue-600 text-white font-bold uppercase tracking-wide
            py-2 px-6 rounded-full
            cursor-default select-none /* Không trỏ chuột, không bôi đen */
          ">
            Tài khoản cá nhân
          </span>
        </div>

        {/* 3. HR */}
        <hr className="border-gray-600 mb-8" />

        {/* 4. Form */}
        <form className="flex flex-col gap-5">
          
          {/* Họ tên */}
          <div>
            <label className="block text-white mb-2 font-medium ml-1">Họ và tên</label>
            <input 
              type="text" 
              className="w-full h-12 px-5 rounded-full bg-white text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập họ tên..."
            />
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-white mb-2 font-medium ml-1">Email</label>
            <input 
              type="email" 
              className="w-full h-12 px-5 rounded-full bg-white text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập email..."
            />
          </div>

          {/* Thành phố */}
          <div>
            <label className="block text-white mb-2 font-medium ml-1">Số điện thoại</label>
            <input 
              type="tel" 
              className="w-full h-12 px-5 rounded-full bg-white text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập số điện thoại..."
            />
          </div>

          {/* Số đt */}
          <div>
            <label className="block text-white mb-2 font-medium ml-1">Tên đăng nhập</label>
            <input 
              type="text" 
              className="w-full h-12 px-5 rounded-full bg-white text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập username..."
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2 font-medium ml-1">Mật khẩu</label>
            <input 
              type="password" 
              className="w-full h-12 px-5 rounded-full bg-white text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập mật khẩu..."
            />
          </div>

          {/* 5. BUTTON LƯU */}
          <button 
            type="button"
            className="
              mt-4 w-full h-12 
              bg-blue-600 text-white font-bold text-lg uppercase tracking-wider
              rounded-full
              hover:bg-blue-500 hover:shadow-lg hover:scale-[1.02]
              transition-all duration-200
            "
          >
            Lưu
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProfileForm;