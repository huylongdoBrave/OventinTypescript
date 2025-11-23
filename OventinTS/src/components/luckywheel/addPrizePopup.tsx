import React, { useState, useEffect } from 'react';
import type { Prize } from './wheelgame'; // Import kiểu Prize

interface AddPrizePopupProps {
  isOpen: boolean;
  prizes: Prize[];
  onClose: () => void;
  onAddPrize: (newPrize: Prize) => void;
}

// Định nghĩa cấu trúc state cho form
interface FormDataState {
  name: string;
  value: string;
  probability: number; 
  color: string;
}

const INITIAL_FORM_STATE: FormDataState = {
  name: '',
  value: '',
  probability: 0,
  color: '#ffffff',
};

const AddPrizePopup: React.FC<AddPrizePopupProps> = ({ isOpen, prizes, onClose, onAddPrize }) => {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM_STATE);

  // Reset form khi popup đóng
  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_STATE);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const detectPrizeType = (value: string): 'image' | 'text' => {
    const imageRegex = /\.(jpeg|jpg|gif|png|svg|webp)$/i;
    return imageRegex.test(value) ? 'image' : 'text';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formData.name.trim();
    const value = formData.value.trim();
    const probability = Number(formData.probability);

    if (!name || !value) {
      alert('Vui lòng điền đầy đủ thông tin quà!');
      return;
    }

    if (isNaN(probability) || probability < 0) {
      alert('Tỉ lệ không hợp lệ!');
      return;
    }

    const currentTotalProbability = prizes.reduce((sum, prize) => sum + (prize.probability * 100), 0);
    const newTotalProbability = currentTotalProbability + probability;

    if (newTotalProbability > 100.01) {
      alert(`Không thể thêm. Tổng tỉ lệ hiện tại là ${newTotalProbability.toFixed(2)}% đã vượt mức 100%. Vui lòng điều chỉnh lại.`);
      return;
    }

    const newId = prizes.length > 0 ? Math.max(...prizes.map(p => p.id)) + 1 : 1;

    const newPrize: Prize = {
      id: newId,
      name: name,
      type: detectPrizeType(value),
      value: value,
      probability: probability / 100, // Chuyển từ % (0-100) sang dạng thập phân (0-1)
      color: formData.color,
    };

    onAddPrize(newPrize); // Gửi quà mới về cho component cha
    onClose(); // Đóng popup
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative w-11/12 max-w-lg rounded-2xl border-4 border-white bg-[#f85a00] p-5 pt-10 text-white shadow-lg">
        <button 
          className="absolute top-1 right-4 cursor-pointer border-none bg-transparent text-5xl font-light leading-none text-white" 
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="mb-5 text-center text-2xl font-bold">Thêm Quà Mới</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-name">Tên quà:</label>
            <input 
              type="text" 
              id="prize-name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              className="box-border w-full rounded-md border border-gray-300 p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-value">Giá trị (Văn bản hoặc URL hình ảnh):</label>
            <input 
              type="text" 
              id="prize-value" 
              name="value" 
              value={formData.value} 
              onChange={handleInputChange} 
              required 
              placeholder="Nhập văn bản hoặc dán URL hình ảnh..." 
              className="box-border w-full rounded-md border border-gray-300 p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-probability">Tỉ lệ (%):</label>
            <input 
              type="number" 
              id="prize-probability" 
              name="probability" 
              value={formData.probability} 
              onChange={handleInputChange} 
              min="0" max="100" step="any" 
              placeholder="Nhập số thực" 
              required 
              className="box-border w-full rounded-md border border-gray-300 p-2 text-black"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="prize-color">Màu nền:</label>
            <input type="color" id="prize-color" name="color" value={formData.color} onChange={handleInputChange} className="h-10 w-full cursor-pointer appearance-none border-none bg-transparent p-0" />
          </div>
          <button type="submit" className="mt-4 w-full rounded-full border-2 border-white bg-[#ff6702] py-3 px-6 font-bold text-white shadow-md transition-all hover:bg-gray-200 hover:text-[#ff6702]">Lưu Quà</button>
        </form>
      </div>
    </div>
  );
}

export default AddPrizePopup;
