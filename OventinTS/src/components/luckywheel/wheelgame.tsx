import { useState, useEffect, useRef } from 'react';
import ButtonOrange from '../Button/buttonOrange.tsx'; // Sửa tên import

import Wheel from './wheel.tsx';
import ResultPopup from './resultpopup.tsx'; 
import RateTablePopup from './rateTablePopup.tsx';
// import AddPrizePopup from './AddPrizePopup'; 

// --- TYPE DEFINITIONS ---

export interface Prize {
  id: number;
  name: string;
  type: 'image' | 'text';
  value: string;
  probability: number;
  color: string;
}

// Định nghĩa props cho các component con (trừ Wheel đã tự định nghĩa)
// interface ResultPopupProps { isOpen: boolean; prize: Prize | null; onClose: () => void; }
// interface RateTablePopupProps { isOpen: boolean; prizes: Prize[]; onClose: () => void; onApplyChanges: (updatedPrizes: Prize[]) => void; }
// interface AddPrizePopupProps { isOpen: boolean; prizes: Prize[]; onClose: () => void; onAddPrize: (newPrize: Prize) => void; }

function WheelGame() {
  // === STATE MANAGEMENT ===
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [currentSpins, setCurrentSpins] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null); // Ref để tham chiếu đến DOM của vòng quay

  // State cho các popup
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  const [isRatePopupOpen, setIsRatePopupOpen] = useState(false);
  const [isAddPrizePopupOpen, setIsAddPrizePopupOpen] = useState(false);

  // === DATA LOADING (useEffect) ===
  useEffect(() => {
    const loadPrizes = async () => {
      const LOCAL_STORAGE_KEY = 'oventinPrizes';
      const API_URL = 'http://localhost:3000/prizes'; // Endpoint của json-server
      const savedPrizes = localStorage.getItem(LOCAL_STORAGE_KEY);

      if (savedPrizes) {
        setPrizes(JSON.parse(savedPrizes) as Prize[]);
        console.log("Loaded prizes from Local Storage.");
        return;
      }
      console.log("Local storage is empty. Fetching from API...");
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        const apiPrizes = await response.json() as Prize[];
            setPrizes(apiPrizes);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apiPrizes));
            console.log("Loaded prizes from API and saved to Local Storage.");
      } catch (error) {
        console.error("Failed to fetch from API, using mock data as fallback.", error);
        // Dữ liệu mẫu nếu không có trong localStorage và API lỗi (đã có kiểu Prize)
        const mockData: Prize[] = [
          { id: 1, name: "Điện thoại", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38", probability: 0.0005, color: "#ef0012" },
          { id: 2, name: "Good luck", type: "text", value: "Chúc bạn may mắn lần sau", probability: 0.14, color: "#ffffff" },
          { id: 3, name: "Máy ảnh", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd", probability: 0.0005, color: "#ef0012" },
          { id: 4, name: "Thẻ cào", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066", probability: 0.25, color: "#ffffff" },
          { id: 5, name: "Điện thoại", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38", probability: 0.0005, color: "#ef0012" },
          { id: 6, name: "Good luck", type: "text", value: "Chúc bạn may mắn lần sau", probability: 0.14, color: "#ffffff" },
          { id: 7, name: "Máy ảnh", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd", probability: 0.0005, color: "#ef0012" },
          { id: 8, name: "Thẻ cào", type: "image", value: "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066", probability: 0.25, color: "#ffffff" }
        ];
        setPrizes(mockData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
        console.log("Loaded mock data and saved to Local Storage.");
      }

    };

    loadPrizes();
  }, []);

  // Effect để quản lý class 'body-no-scroll' khi popup mở/đóng
  useEffect(() => {
    if (isResultPopupOpen || isRatePopupOpen || isAddPrizePopupOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    // Cleanup function để đảm bảo class được xóa khi component unmount
    return () => document.body.classList.remove('body-no-scroll');
  }, [isResultPopupOpen, isRatePopupOpen, isAddPrizePopupOpen]);

  
  // === Sự kiện quay ===
  const handleSpin = () => {
    if (isSpinning || currentSpins <= 0 || prizes.length === 0) return;

    setCurrentSpins(currentSpins - 1);
    setIsSpinning(true); // Báo hiệu bắt đầu quay, các nút sẽ bị vô hiệu hóa

    const winningSliceIndex = getWeightedRandomIndex();
    const sliceCount = prizes.length;
    const sliceAngle = 360 / sliceCount;
    const cssOffsetAngle = -(sliceAngle / 2);
    const randomSpins = Math.floor(Math.random() * 6) + 5;
    const targetAngle = winningSliceIndex * sliceAngle + cssOffsetAngle;
    const totalRotation = -(randomSpins * 360 + targetAngle);     // Luôn tính góc quay mới, không dựa vào góc cũ. Dấu trừ để quay ngược chiều kim đồng hồ.
    const spinDuration = 5;

    // Sử dụng ref để thao tác trực tiếp với style, đảm bảo animation chạy đúng
    const wheelElement = wheelRef.current;
    if (wheelElement) {
      // 1. Bật animation
      wheelElement.style.transition = `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
      // 2. Bắt đầu quay
      wheelElement.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Đặt hẹn giờ để xử lý kết quả sau khi animation kết thúc
    setTimeout(() => {
      const winningPrizeData = prizes[winningSliceIndex];
      setWinningPrize(winningPrizeData);
      setIsResultPopupOpen(true);

      // Reset vòng quay để chuẩn bị cho lần sau
      const finalRotation = totalRotation % 360;
      if (wheelElement) {
        wheelElement.style.transition = 'none'; // Tắt animation
        wheelElement.style.transform = `rotate(${finalRotation}deg)`; // Đặt lại góc
      }
      setIsSpinning(false); // Báo hiệu đã quay xong
    }, spinDuration * 1000);
  };

  
  // === Tính bảo hiểm khi quay ===
  const getWeightedRandomIndex = () => {
    const prizeProbabilities = prizes.map((p: Prize) => p.probability);     // Lấy mảng tỉ lệ mới nhất từ RateManager. Ví dụ: [0.1, 0.7, 0.2].
    const rand = Math.random();     // Tạo một số ngẫu nhiên trong khoảng từ 0 (bao gồm) đến 1 (loại trừ).
    let cumulativeProbability = 0;     // Biến để theo dõi tổng tỉ lệ tích lũy.

    for (let i = 0; i < prizeProbabilities.length; i++) {
      cumulativeProbability += prizeProbabilities[i];       // Cộng tỉ lệ của ô hiện tại vào tổng tích lũy.
      if (rand < cumulativeProbability) {
        return i;
      }
    }
    return prizeProbabilities.length - 1;
  };

  //Cập nhật quà
  const handleApplyPrizeChanges = (updatedPrizes: Prize[]) => {
    setPrizes(updatedPrizes);
    localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));
    alert('Đã cập nhật thành công!');
  };

  //Thêm quà
  // const handleAddPrize = (newPrize: Prize) => {
  //   const updatedPrizes = [...prizes, newPrize]; //Cập nhật newPrize vào prizes
  //   setPrizes(updatedPrizes);
  //   localStorage.setItem('oventinPrizes', JSON.stringify(updatedPrizes));
  //   alert(`Đã thêm quà "${newPrize.name}"!`);
  // }; 



  return (
    <>
      <main>

        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center items-center mt-5 w-full h-full relative z-0">
            <img 
              src="/static/lucky-draw.png"
              alt="Lucky Draw"
              className="h-auto 
                         w-[70%] max-w-[300px]
                         md:w-[80%] md:max-w-[400px] 
                         lg:w-[90%]"
            />
          </div>
          <div className="spin-counter">
            <p className="text-xl font-black text-[#002d6f] mt-[20px] text-center">Bạn còn <span id="spin-count">{currentSpins}</span> lượt quay</p>
          </div>
          <div className="add-spin-container">
            <ButtonOrange id="add-spins-btn" onClick={() => setCurrentSpins(currentSpins + 10)}
              className="w-[120px] h-[40px] text-[16px] mt-2.5 mb-[50px] 
                        md:w-[135px] md:h-[45px] md:text-[18px] md:mb-[30px]
                        lg:w-[150px] lg:h-[50px] lg:text-[20px]"
            >Thêm lượt</ButtonOrange>
          </div>
          <div className="relative flex justify-center items-center w-[100%] mt-[20px] 
           min-h-[var(--wheel-wrapper-size)]"
          >
              <img src="/static/dolphine.png" alt="Dolphine"
                  className="absolute z-[5] h-auto transition-all duration-300 ease-in-out
                             w-[90px] bottom-[30px] left-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                             md:w-[150px] md:bottom-auto md:mt-0 md:left-[10%]
                             lg:w-[200px] lg:left-[calc(50%-var(--wheel-wrapper-size)/2-180px)]"
              />
              <div className="absolute mb-5 flex h-[var(--wheel-wrapper-size)] w-[var(--wheel-wrapper-size)] 
                              items-center justify-center rounded-full border-[5px] border-[#004a8d] bg-[#002d6f] 
                              shadow-[0_0_20px_rgba(0,0,0,0.5),_inset_0_0_15px_rgba(0,0,0,0.3)]"
              >
                
{/* <div className="wheel-wrapper lg:w-[--wheel-wrapper-size] lg:h-[--wheel-wrapper-size] bg-[#002d6f] rounded-[50%]
                              lg:mb-[20px] border-[5px_solid_#004a8d] absolute flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.3)] ">
                              */}

                <div className="arrow-top"></div>
                <div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div>
                <div ref={wheelRef} className="wheel-container">
                  <Wheel prizes={prizes} />
                </div>
                <button id="spin" onClick={handleSpin} disabled={isSpinning}>
                  <img src="/static/favicon_oven.png" alt="Spin" />
                </button>
              </div>
              <img src="/static/boy.png" alt="Boy"
                  className="absolute z-[5] h-auto transition-all duration-300 ease-in-out
                             w-[90px] bottom-[30px] right-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                             md:w-[150px] md:bottom-auto md:mt-0 md:right-[10%]
                             lg:w-[200px] lg:right-[calc(50%-var(--wheel-wrapper-size)/2-180px)]"
              />
          </div>
        </div>
      </main>
      <p className="title-down">Bấm vào Vòng Quay May Mắn để bắt đầu quay</p>

      {/* POPUPS */}
      <ResultPopup
        isOpen={isResultPopupOpen}
        prize={winningPrize}
        onClose={() => setIsResultPopupOpen(false)}
      />

       <RateTablePopup
        isOpen={isRatePopupOpen}
        prizes={prizes}
        onClose={() => setIsRatePopupOpen(false)}
        onApplyChanges={handleApplyPrizeChanges}
      />

{/*       <AddPrizePopup
        isOpen={isAddPrizePopupOpen}
        prizes={prizes}
        onClose={() => setIsAddPrizePopupOpen(false)}
        onAddPrize={handleAddPrize}
      />  */}

      {/* SETUP BUTTONS */}
      <div className="show-button-container">
        <div className="button-group-top">

          {/* DẠNG CŨ <button id="show-probabilities-btn" className="btn-action" onClick={() => setIsRatePopupOpen(true)}
           disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Tỉ lệ</button>
          <button id="add-prize-btn" className="btn-action" onClick={() => setIsAddPrizePopupOpen(true)}
           disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Thêm quà</button> */}

          <ButtonOrange 
            id="show-probabilities-btn" 
            onClick={() => setIsRatePopupOpen(true)}
            disabled={isSpinning}
            className="h-[50px] w-[150px] text-base">Tỉ lệ</ButtonOrange>
          <ButtonOrange 
            id="add-prize-btn" 
            onClick={() => setIsAddPrizePopupOpen(true)}
            disabled={isSpinning} className="h-[50px] w-[150px] text-base">Thêm quà</ButtonOrange>

        </div>
        <div className="button-group-top">
          <button id="restart-btn" className="btn-action"
          onClick={() => { localStorage.clear(); window.location.reload(); } } 
          disabled={isSpinning} 
          style={{ cursor: isSpinning ? 'not-allowed' : 'pointer', opacity: 0 }}>Khởi động lại</button>
        </div>
      </div>
      
    </>
  );
}

export default WheelGame;
