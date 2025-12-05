import React, { useState, useEffect } from "react";
import ButtonOrange from "../Button/ButtonOranges";

//    ====== UI Register ======

export interface User {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM_STATE: User = {
  fullName: "",
  phoneNumber: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
};

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [isConfirmRegister, setIsConfirmRegister] = useState(false);
  const [formData, setFormData] = useState<User>(INITIAL_FORM_STATE);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  //Reset form đóng popup
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);


  // Xử lý thay đổi form
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({...prevData, [id]: value}));
  };


  // Xử lý submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullName = formData.fullName.trim();
    const dateOfBirth = formData.dateOfBirth.trim();
    const phoneNumber = formData.phoneNumber.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();
    if(!fullName || !dateOfBirth || !phoneNumber || !password || !confirmPassword){
      alert("Vui lòng điền đủ thông tin!");
      return;
    }

    // Kiểm tra định dạng số điện thoại (10 số)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
      return;
    }

    // Kiểm tra mật khẩu trùng khớp, cần đủ 6 ký tự
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return
    }

    // Kiểm tra tuổi
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 4) {
        alert("Ngày sinh không hợp lệ, bạn phải lớn hơn 4 tuổi.");
        return;
      }

      // Lấy danh sách user đã có và kiểm tra SĐT tồn tại
      const existingUsersRaw = localStorage.getItem("registeredUsers");
      const existingUsers: User[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
      const userExists = existingUsers.some(user => user.phoneNumber === phoneNumber);
      if (userExists) {
        alert("Số điện thoại này đã được đăng ký. Vui lòng sử dụng số khác.");
        return;
      }

      // Tạo user mới và lưu vào localStorage
      const newUser: Omit<User, 'confirmPassword'> = {
        fullName,
        phoneNumber,
        dateOfBirth,
        password,
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      alert("Đăng ký thành công!");
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[1003] flex justify-center overflow-y-auto py-10 px-4
                 transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center w-full max-w-[800px] pt-[200px]">
        {/* logo */}
        <img
          src="./static/favicon_oven.png"
          alt="Oventin Logo"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="/static/register.png"
          alt="Đăng ký"
          className="absolute z-[1004] top-[160px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-full md:w-full lg:w-[550px] max-w-[800px] text-center text-white "
        >
          <div
            className="items-center inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[20px]">
              <form id="register-form" onSubmit={handleSubmit} className="flex flex-col gap-3 text-[#233da3]">
                
                {/* Họ và tên */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/100 mb-1">
                  Họ và tên<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChangeInput}
                    placeholder="Họ và tên"
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                    // CSS hover viền vàng className="w-full bg-white border border-white/30 rounded-[20px] p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/100 mb-1">
                  Số điện thoại<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChangeInput}
                    placeholder="Số điện thoại"
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                  />
                </div>

                {/* Ngày sinh */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white/100 mb-1">
                  Ngày sinh<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChangeInput}
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                  />
                </div>

                {/* Mật khẩu */}
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-white/100 mb-1">
                  Mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChangeInput}
                    placeholder="Mật Khẩu"
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-black/40 hover:text-black"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="relative">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/100 mb-1">
                  Xác nhận mật khẩu<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span>
                  </label>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChangeInput}
                    placeholder="Xác nhận mật khẩu"
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-black/40 hover:text-black"
                    aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>

              {/* Checkbox Đồng ý? */}
              <label
                className="mt-[16px] text-[rgb(35,61,163)] inline-flex items-center cursor-pointer 
              align-middle text-white mr-4"
              >
                <span
                  className="inline-flex items-center justify-center relative box-border bg-transparent outline-none border-none m-0 cursor-pointer
                              select-none align-middle appearance-none no-underline p-[9px] rounded-full [-webkit-tap-highlight-color:transparent]"
                >
                  <input
                    type="checkbox"
                    checked={isConfirmRegister}
                    onChange={() => setIsConfirmRegister(!isConfirmRegister)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </span>
                <span className=" text-[var(--normal-blue)] font-normal text-base leading-normal m-0 text-left cursor-pointer">
                  Tôi đồng ý với <a href="" ><u>thể lệ</u></a> chương trình khuyến mãi này
                </span>
              </label>

              {/* Button xác thực */}
              <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                {/* Button chính */}
                <ButtonOrange
                  type="submit"
                  form="register-form"
                  disabled={!isConfirmRegister}
                  className={`w-[200px] h-12 text-lg transition-colors duration-300 ${
                    !isConfirmRegister
                      ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                      : ""
                  }`}
                >
                  Tiếp tục
                </ButtonOrange>
                {/* Nút đóng 'x' */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-2
                  border-white text-white text-2xl font-light bg-transparent hover:bg-white/20 transition-colors"
                  aria-label="Đóng"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
