import React, { memo } from "react";
import Draggable from "react-draggable";

interface ImgRightPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dragRef: React.RefObject<HTMLDivElement>;
}

const ImgRightPopupComponent: React.FC<ImgRightPopupProps> = ({
  isOpen,
  onClose,
  dragRef,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-[1000] cursor-pointer bottom-4 right-4">
      <Draggable nodeRef={dragRef}>
        <div ref={dragRef} className="relative w-fit">
          <button
            onClick={onClose}
            className="absolute top-[-20px] -right-2.5 z-10 w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-lg font-bold leading-none hover:bg-orange-500 transition-colors"
            aria-label="Đóng popup"
          >
            &times;
          </button>
          <img
            src="/static/survey.png"
            alt="Khảo sát"
            className="w-[120px] h-[120px] object-contain [-webkit-user-drag:none]"
          />
        </div>
      </Draggable>
    </div>
  );
};

export default memo(ImgRightPopupComponent);
