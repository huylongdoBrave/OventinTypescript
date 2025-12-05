import React ,{useState, useEffect, memo, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import ButtonOrange from "../Button/ButtonOranges";

//    ====== UI Forgot Password popup ======

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ForgotPw{
  phoneNumber: string;
}

const INITIAL_FORM_STATE: ForgotPw = {
  phoneNumber: "",
};

const ForgotPasswordPopup: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ForgotPw>(INITIAL_FORM_STATE);
  const navigate = useNavigate();

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


  const handleForgotPwSubmit = () => {
    navigate('/');
    onClose();
  };
  
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
          src="/static/forgot-pass.png"
          alt="Quên mật khẩu"
          className="absolute z-[1004] top-[170px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-[300px] md:w-[300px] lg:w-[350px]  max-w-[800px] text-center text-black "
        >
          <div
            className="items-center h-[200px] inset-0 bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[40px]">

              <form id="login-form" onSubmit={handleForgotPwSubmit} className="flex flex-col gap-3 text-[#233da3]">

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/100 mb-1">
                  Số điện thoại<span aria-hidden="true" className="text-[rgb(239,0,18)]">&thinsp;*</span></label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Số điện thoại"
                    className="w-full bg-white border border-white/30 rounded-[30px] p-2 focus:ring-2 outline-none transition"
                  />
                </div>
                <div className="text-white">
                  Điền số điện thoại dùng để đăng ký tài khoản của bạn
                </div>

                {/* Button xác thực */}
                <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
                  {/* Button chính */}
                  <ButtonOrange
                    form="login-form"
                    onClick={onClose}
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

export default memo(ForgotPasswordPopup);
