import React ,{useState, useEffect, memo, useCallback} from "react";
import ButtonOrange from "../Button/ButtonOranges";

//    ====== UI Login ======

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess:() => void;
}

interface UserLogin{
  phoneNumber: string;
  password: string;
}

const INITIAL_FORM_STATE: UserLogin = {
  phoneNumber: "",
  password: "",
};

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState<UserLogin>(INITIAL_FORM_STATE);
  const [isShowPassword, setIsShowPassword] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>{
    const { id, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  }, []);

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = formData.phoneNumber.trim();
    const password = formData.password.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber || !password){
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số.");
      return;
    }
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return
    }
    const existingUsersRaw = localStorage.getItem("registeredUsers");
    const existingUsers: UserLogin[] = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
    const UserExist = existingUsers.find((user) => user.phoneNumber === phoneNumber && user.password === password);
    if (UserExist) {
      alert("Đăng nhập thành công!");
      onLoginSuccess();
      onClose();
    } else {
      alert("Số ĐT hoặc password nhập chưa đúng.");
    }

  }, [formData.password, formData.phoneNumber, onClose, onLoginSuccess]);

  
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
          className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="/static/login.png"
          alt="Đăng Nhập"
          className="absolute z-[1004] top-[160px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-[300px] md:w-[300px] lg:w-[550px] max-w-[800px] text-center text-white "
        >
          <div
            className="items-center inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[20px]">

              <form id="login-form" onSubmit={handleLogin} className="flex flex-col gap-3 text-white">

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/100 mb-1">Số điện thoại</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="09xxxxxxxx"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-white/100 mb-1">Mật khẩu</label>
                  <input
                    id="password"
                    type={isShowPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật Khẩu"
                    className="w-full bg-white/10 border border-white/30 rounded-md p-2 pr-10 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={()=> setIsShowPassword(!isShowPassword)}
                    className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-white/70 hover:text-white"
                    aria-label={isShowPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {isShowPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Button xác thực */}
                <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                  {/* Button chính */}
                  <ButtonOrange
                    type="submit"
                    form="login-form"
                    className={`w-[200px] h-12 text-lg transition-colors duration-300`}
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

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPopup);
