import React from "react";

// Định nghĩa kiểu dữ liệu cho giải thưởng
interface Prize {
  id: string | number;
  name: string;
}

// Định nghĩa kiểu dữ liệu cho props của component
interface ResultPopupProps {
  isOpen: boolean;
  prize: Prize | null;
  onClose: () => void;
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  isOpen,
  prize,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1001]
    transition-opacity duration-300 ease-in-out"
    >
      <img
        src="/static/dolphine.png"
        alt="Dolphine"
        className="absolute h-auto z-[5] transition-all duration-300 ease-in-out 
                      w-[100px] mt-[120px] left-[calc(50%-var(--wheel-wrapper-size)/2-10px)] 
                      md:w-[120px] md:mt-[90px] md:left-[calc(50%-var(--wheel-wrapper-size)/2-80px)] 
                      lg:w-[200px] lg:mt-[50px] lg:left-[calc(50%-var(--wheel-wrapper-size)/2-180px)]"
      />
      <div
        className="relative w-[350px] h-[180px] bg-[url('/static/modal.png')] bg-cover bg-center bg-no-repeat 
                      rounded-[15px] border-4 border-white p-10 text-center text-white flex justify-center items-center 
                      shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
      >
        <img
          src="/static/favicon_oven.png"
          alt="Oventin Logo"
          className="absolute top-[-190px] left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 [filter:drop-shadow(rgb(255,255,255)_0px_0px_12px)]"
        />
        <img
          src="/static/noti.png"
          alt="Thông báo"
          className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        <p className="text-lg md:text-[1.5rem] font-black m-0 min-h-[50px] text-[#233da3]">
          {prize?.name || "Chúc bạn may mắn lần sau"}
        </p>
        <small className="text-lg md:text-[1.5rem] font-black m-0 min-h-[50px] text-[#233da3]">
          {prize ? `_ ID: ${prize.id}` : ""}
        </small>
        <button
          className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 bg-[#f85a00] text-white border-2 border-white 
                          py-2.5 px-[30px] rounded-[20px] font-bold cursor-pointer text-lg transition-all duration-200 
                          hover:bg-white hover:text-[#f85a00]"
          onClick={onClose}
        >
          Tiếp tục quay
        </button>
      </div>
      <img
        src="/static/boy.png"
        alt="Boy"
        className="absolute h-auto z-[5] transition-all duration-300 ease-in-out
                      w-[100px] mt-[120px] right-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                      md:w-[120px] md:mt-[90px] md:right-[calc(50%-var(--wheel-wrapper-size)/2-80px)]
                      lg:w-[200px] lg:mt-[50px] lg:right-[calc(50%-var(--wheel-wrapper-size)/2-180px)]"
      />
    </div>
  );
};

export default ResultPopup;
