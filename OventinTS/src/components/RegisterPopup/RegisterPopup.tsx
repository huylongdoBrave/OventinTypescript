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

    // Kiểm tra mật khẩu trùng khớp
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
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
              <form id="register-form" onSubmit={handleSubmit} className="flex flex-col gap-3 text-white">
                {/* Họ và tên */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-white/100 mb-1">Họ và tên</label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChangeInput}
                    placeholder="Bành Thị Bưởi"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                </div>
                {/* Số điện thoại */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/100 mb-1">Số điện thoại</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChangeInput}
                    placeholder="09xxxxxxxx"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                </div>
                {/* Ngày sinh */}
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white/100 mb-1">Ngày sinh</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChangeInput}
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition text-white/70"
                  />
                </div>
                {/* Mật khẩu */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/100 mb-1">Mật khẩu</label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChangeInput}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                </div>
                {/* Xác nhận mật khẩu */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/100 mb-1">Xác nhận mật khẩu</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChangeInput}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
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
                <span className="font-normal text-base leading-normal m-0 text-left cursor-pointer">
                  Tôi đồng ý với thể lệ chương trình khuyến mãi này
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
                  Đăng ký
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
