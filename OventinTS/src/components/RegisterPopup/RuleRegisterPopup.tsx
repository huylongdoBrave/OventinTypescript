import React, { memo } from "react";
import ButtonOrange from "../Button/ButtonOranges";

//    ====== UI POPUP ĐIỀU KHOẢN KHI ĐĂNG KÝ ======

interface RuleRegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void; 
}

const RuleRegisterPopup: React.FC<RuleRegisterPopupProps> = ({ isOpen, onClose, onAgree }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[1003] flex justify-center overflow-y-auto py-10 px-4
                 transition-opacity duration-300 ease-in-out"
    >
      {/* Container popup max width */}
      <div className="relative flex justify-center items-center w-full max-w-sm">
        {/* Khung lớn popup */}
      <div
        className="mt-[200px] filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                   w-[340px] h-[360px] bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                  rounded-[15px] border-4 border-white p-10 text-center text-white 
                  shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
      >
        {/* logo */}
        <img
          src="./static/favicon_oven.png"
          alt="Oventin Logo"
          className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="/static/term.png"
          alt="Chính sách quyền riêng tư"
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />

        {/* Nội dung popups */}
        <div
          className="flex-col justify-center items-center 
        text-center relative [-webkit-box-align:center] [-webkit-box-pack:center]"
        >
          <p className="m-0 font-normal leading-normal text-white pt-2 text-center text-xl max-w-[350px] lg:px-1 px-6">
            Nhận ngay 20 Ovocoins khi mời thêm 02 bạn mới.
          </p>
          <p
            className="font-normal leading-normal text-[rgb(239,0,18)] text-center text-xl m-0 pb-3;
                        [font-family:var(--font-rowdies)] max-w-[350px] lg:px-1 px-6"
          >
            Đổi thẻ Zing, nạp Robux trong tầm tay.
          </p>
          <div
            className="flex justify-center items-center gap-3 flex-col w-full [box-shadow:rgba(0,0,0,0.25)_0px_4px_4px_0px_inset] bg-[rgba(255,255,255,0.7)] 
            text-center z-10 mb-2.5 mx-auto py-5 rounded-[15px] [-webkit-box-pack:center] [-webkit-box-align:center] 
            lg:max-w-[420px] lg:px-10
            md:max-w-[360px] max-w-60 px-5"
          >
            <img
              src="./static/doi-24-coins.png"
              alt="24coin "
              className="text-transparent w-auto h-[60px] object-contain overflow-clip
                [overflow-clip-margin:content-box] [box-sizing:inherit]"
            />
            <img
              src="./static/doi-60-coins.png"
              alt="60coin"
              className="w-auto h-[60px] object-contain [ocolor:transparent]"
            />
          </div>
        </div>
        {/* Button group */}
        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full">
          {/* Button chính */}
          <ButtonOrange onClick={onAgree} className="w-[200px] h-12 text-lg">
            Đồng ý và Tiếp tục
          </ButtonOrange>
          {/* Nút đóng 'x' */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border-2
             border-white text-white text-2xl font-light bg-transparent hover:bg-white/20 transition-colors"
            aria-label="Đóng"
          >&times;</button>
        </div>
      </div>
      </div>
    </div>

  );
};

export default memo(RuleRegisterPopup);
