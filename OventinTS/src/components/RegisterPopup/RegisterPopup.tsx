import React, {} from "react";


interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[1002] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
        <p>Register Popup</p>
        {/* Nội dung form đăng ký sẽ ở đây */}
      </div>
    </div>
  );
};

export default RegisterPopup;
