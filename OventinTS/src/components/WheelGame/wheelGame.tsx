import { useState, useEffect, useRef, useCallback } from "react";
// import Draggable from "react-draggable";
import ButtonOrange from "../Button/buttonOrange.tsx";

import Wheel from "./wheel.tsx";
import ResultPopup from "./resultPopup.tsx";
import RateTablePopup from "./rateTablePopup.tsx";
import AddPrizePopup from "./addPrizePopup.tsx";
import AttentionWheelPopup from "./attentionWheelPopup.tsx";

// --- TYPE DEFINITIONS ---

export interface Prize {
  id: number;
  name: string;
  type: "image" | "text";
  value: string;
  probability: number;
  color: string;
}

function WheelGame() {
  // === STATE MANAGEMENT ===
  const [prizes, setPrizes] = useState<Prize[]>([]); // một mảng chứa các đối tượng Prize, ban đầu nó rỗng
  const [currentSpins, setCurrentSpins] = useState(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null); // Ref để tham chiếu đến DOM của vòng quay
  // const dragRefLeft = useRef(null); // Ref cho popup kéo thả BÊN TRÁI
  // const dragRefRight = useRef(null); // Ref cho popup kéo thả BÊN PHẢI

  // State các popup
  const [winningPrize, setWinningPrize] = useState<Prize | null>(null);
  // result popup
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  // rate table popup
  const [isRatePopupOpen, setIsRatePopupOpen] = useState(false);
  // addprize table popup
  const [isAddPrizePopupOpen, setIsAddPrizePopupOpen] = useState(false);
  // attention popup
  const [isAttentionPopupOpen, setIsAttentionPopupOpen] = useState(true);
  // // State cho popup left kéo thả
  // const [isStickyPopupLeft, setIsStickyPopupLeft] = useState(true);
  //   // State cho popup right kéo thả
  // const [isStickyPopupRight, setIsStickyPopupRight] = useState(true);

  // === DATA LOADING (useEffect) ===
  useEffect(() => {
    const loadPrizes = async () => {
      const LOCAL_STORAGE_KEY = "oventinPrizes";
      const API_URL = "http://localhost:3000/prizes"; // Endpoint của json-server
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
          throw new Error(`API call failed với status: ${response.status}`);
        }
        const apiPrizes = (await response.json()) as Prize[];
        setPrizes(apiPrizes);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apiPrizes));
        console.log("Loaded prizes from API and saved to Local Storage.");
      } catch (error) {
        console.error(
          "Failed to fetch from API, using mock data as fallback.",
          error
        );
        // Dữ liệu mẫu nếu không có trong localStorage và API lỗi (đã có kiểu Prize)
        const mockData: Prize[] = [
          {
            id: 1,
            name: "Điện thoại",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38",
            probability: 0.0005,
            color: "#ef0012",
          },
          {
            id: 2,
            name: "Good luck",
            type: "text",
            value: "Chúc bạn may mắn lần sau",
            probability: 0.14,
            color: "#ffffff",
          },
          {
            id: 3,
            name: "Máy ảnh",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd",
            probability: 0.0005,
            color: "#ef0012",
          },
          {
            id: 4,
            name: "Thẻ cào",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066",
            probability: 0.25,
            color: "#ffffff",
          },
          {
            id: 5,
            name: "Điện thoại",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/bda0db2f-f354-4a90-91c8-36ce183c4f38",
            probability: 0.0005,
            color: "#ef0012",
          },
          {
            id: 6,
            name: "Good luck",
            type: "text",
            value: "Chúc bạn may mắn lần sau",
            probability: 0.14,
            color: "#ffffff",
          },
          {
            id: 7,
            name: "Máy ảnh",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/3f8f5ad0-dcc1-4431-b3e7-271d3c990abd",
            probability: 0.0005,
            color: "#ef0012",
          },
          {
            id: 8,
            name: "Thẻ cào",
            type: "image",
            value:
              "https://s3dev.estuary.solutions/ovaltine2024dev/64ac9af8-24f1-4dc2-86f6-1923cef7e066",
            probability: 0.25,
            color: "#ffffff",
          },
        ];
        setPrizes(mockData);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
        console.log("Loaded mock data and saved to Local Storage.");
      }
    };
    loadPrizes();
  }, []);

  // Effect quản lý class 'body-no-scroll' khi popup mở/đóng
  useEffect(() => {
    if (
      isResultPopupOpen ||
      isRatePopupOpen ||
      isAddPrizePopupOpen ||
      isAttentionPopupOpen
    ) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    // Cleanup function để đảm bảo class được xóa khi component unmount
    return () => document.body.classList.remove("body-no-scroll");
  }, [
    isResultPopupOpen,isRatePopupOpen,isAddPrizePopupOpen,isAttentionPopupOpen,
  ]);

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
    const totalRotation = -(randomSpins * 360 + targetAngle); // Luôn tính góc quay mới, không dựa vào góc cũ. Dấu trừ để quay ngược chiều kim đồng hồ.
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

      const finalRotation = totalRotation % 360;
      if (wheelElement) {
        wheelElement.style.transition = "none"; // Tắt animation
        wheelElement.style.transform = `rotate(${finalRotation}deg)`; // Đặt lại góc
      }
      setIsSpinning(false); // Báo hiệu đã quay xong
    }, spinDuration * 1000);
  };

  // === Tính bảo hiểm khi quay ===
  const getWeightedRandomIndex = () => {
    const probabilities = prizes.map((p) => p.probability);
    const totalProbability = probabilities.reduce((sum, p) => sum + p, 0);

    // Nếu tổng tỉ lệ bằng 0 (tất cả các quà đều có tỉ lệ 0%),
    // thì coi như tất cả các quà đều có cơ hội như nhau.
    if (totalProbability === 0) {
      return Math.floor(Math.random() * prizes.length);
    }
    // Chuẩn hóa tỉ lệ để tổng luôn bằng 1
    const normalizedProbabilities = probabilities.map(
      (p) => p / totalProbability
    );
    const rand = Math.random();
    let cumulativeProbability = 0;
    for (let i = 0; i < normalizedProbabilities.length; i++) {
      cumulativeProbability += normalizedProbabilities[i];
      if (rand < cumulativeProbability) {
        return i;
      }
    }
    // Fallback an toàn: trả về index cuối cùng
    return prizes.length - 1;
  };

  //Cập nhật quà
  const handleApplyPrizeChanges = useCallback((updatedPrizes: Prize[]) => {
      setPrizes(updatedPrizes);
      localStorage.setItem("oventinPrizes", JSON.stringify(updatedPrizes));
      alert("Đã cập nhật thành công!");
    }, []); // Dependency rỗng vì hàm này không phụ thuộc vào state/props nào từ bên ngoài

  //Thêm quà
  const handleAddPrize = useCallback((newPrize: Prize) => {
      setPrizes((currentPrizes) => {
        const updatedPrizes = [...currentPrizes, newPrize];
        localStorage.setItem("oventinPrizes", JSON.stringify(updatedPrizes));
        alert(`Đã thêm quà "${newPrize.name}"!`);
        return updatedPrizes;
      });
    }, []); // Dependency rỗng, dùng functional update cho setPrizes

  // Các hàm đóng popup
  const closeAttentionPopup = useCallback(() => setIsAttentionPopupOpen(false), []);
  const closeResultPopup = useCallback(() => setIsResultPopupOpen(false), []);
  const closeRatePopup = useCallback(() => setIsRatePopupOpen(false), []);
  const closeAddPrizePopup = useCallback(() => setIsAddPrizePopupOpen(false), []);

  const translateY = -195;
  const lights = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <>
      <main>
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center items-center  w-full h-full relative z-0">
            <img
              src="/static/lucky-draw.png"
              alt="Lucky Draw"
              className="h-auto 
                        w-[70%] max-w-[300px]
                        md:w-[80%] md:max-w-[400px] 
                        lg:w-[90%]"
            />
          </div>
          <div>
            {/* Spin */}
            <p className="text-xl font-black text-[rgb(35,61,163)] mt-[20px] text-center">
              Bạn còn{" "}
              <span id="spin-count" style={{ color: "white" }}>
                {currentSpins}
              </span>{" "}
              lượt quay!
            </p>
          </div>
          <div className="add-spin-container" >
            <ButtonOrange
              id="add-spins-btn"
               disabled={isSpinning}
              onClick={() => setCurrentSpins(currentSpins + 10)}
              className="w-[120px] h-[40px] text-[16px] mt-2.5 mb-[20px] 
                        md:w-[135px] md:h-[45px] md:text-[18px] md:mb-[30px]
                        lg:w-[150px] lg:h-[50px] lg:text-[20px]"
            >
              Thêm lượt
            </ButtonOrange>
          </div>
          <div className=" filter-[drop-shadow(rgb(255,255,255)_0px_0px_15px)] relative flex justify-center items-center w-[100%] mt-[20px] 
            min-h-[var(--wheel-wrapper-size)]"
          >
            <img
              src="/static/dolphine.png"
              alt="Dolphine"
              className="absolute z-[5] h-auto transition-all duration-300 ease-in-out
                             w-[90px] bottom-[50px] left-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                             md:w-[150px] md:bottom-auto md:mt-0 md:left-[10%]
                             lg:bottom-[60px] lg:w-[200px] lg:left-[calc(50%-var(--wheel-wrapper-size)/2-250px)]"
            />
            {/* <div className="absolute mb-5 flex h-[var(--wheel-wrapper-size)] w-[var(--wheel-wrapper-size)] 
                              items-center justify-center rounded-full border-[5px] border-[#004a8d] bg-[#002d6f] 
                              shadow-[0_0_20px_rgba(0,0,0,0.5),_inset_0_0_15px_rgba(0,0,0,0.3)]"
              > */}
            <div
              className=" w-[var(--wheel-wrapper-size)] h-[var(--wheel-wrapper-size)]
                           bg-[#002d6f] rounded-[50%] mb-[20px] border-[5px_solid_#004a8d] 
                              absolute flex items-center justify-center 
                              shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(0,0,0,0.3)] "
            > 
                {/* Mũi tên xám (làm bóng) */}
              <div
                className=" h-[var(--arrow-top-height)] w-[var(--arrow-top-width)]
                                bg-gray-300 absolute [clip-path:polygon(50%_100%,_0_0,_100%_0)]
                                top-[-1px] z-10"
              ></div>
                {/* Mũi tên vàng */}
              <div
                className="h-[var(--arrow-top-height)] w-[var(--arrow-top-width)]
                                bg-[#ffd600] absolute [clip-path:polygon(50%_100%,_0_0,_100%_0)]
                                top-[-15px] z-20"
              ></div>

              {/* DẠNG CŨ <div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div><div className="light"></div>
               */}

              <div>
                {/* light */}
                {lights.map((degree, index) => (
                  <div
                    key={index}
                    className="absolute top-[50%] left-[50%] w-[10px] h-[10px] mb-[10px] bg-[#ffdd00] 
                          rounded-[50%] shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] origin-top-left"
                    style={{
                      transform:
                        `rotate(${degree}deg)` + ` translateY(${translateY}px)`,
                    }}
                  />
                ))}
              </div>

              <div ref={wheelRef}>
                <Wheel prizes={prizes} />
              </div>
                {/* Nút quay */}
                <button id="spin" onClick={handleSpin} disabled={isSpinning}>
                  <img className="" src="/static/favicon_oven.png" alt="Spin" />
                </button>
            </div>
            <img
              src="/static/boy.png"
              alt="Boy"
              className="absolute z-[5] h-auto transition-all duration-300 ease-in-out
                            w-[90px] bottom-[30px] right-[calc(50%-var(--wheel-wrapper-size)/2-10px)]
                            md:w-[150px] md:bottom-auto md:mt-0 md:right-[10%]
                            lg:bottom-[60px] lg:w-[200px] lg:right-[calc(50%-var(--wheel-wrapper-size)/2-250px)]"
            />
          </div>
        </div>
      </main>
      <p className="text-[#f5f5f5] text-[18px] lg:text-[20px] mt-[20px] text-center font-[1000] ">
        Bấm vào Vòng Quay May Mắn để bắt đầu quay bạn nhé!
      </p>

      {/* POPUPS */}
      <AttentionWheelPopup
        isOpen={isAttentionPopupOpen}
        onClose={closeAttentionPopup}
      />

      <ResultPopup
        isOpen={isResultPopupOpen}
        prize={winningPrize}
        onClose={closeResultPopup}
      />

      <RateTablePopup
        isOpen={isRatePopupOpen}
        prizes={prizes}
        onClose={closeRatePopup}
        onApplyChanges={handleApplyPrizeChanges}
      />

      <AddPrizePopup
        isOpen={isAddPrizePopupOpen}
        prizes={prizes}
        onClose={closeAddPrizePopup}
        onAddPrize={handleAddPrize}
      />

      {/* SETUP BUTTONS */}
      <div className="show-button-container">
        <div className="button-group-top">
          {/* DẠNG CŨ x <button id="show-probabilities-btn" className="btn-action" onClick={() => setIsRatePopupOpen(true)}
           disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Tỉ lệ</button>
          <button id="add-prize-btn" className="btn-action" onClick={() => setIsAddPrizePopupOpen(true)}
           disabled={isSpinning} style={{ cursor: isSpinning ? 'not-allowed' : 'pointer' }}>Thêm quà</button> */}

          <ButtonOrange
            id="show-probabilities-btn"
            onClick={() => setIsRatePopupOpen(true)}
            disabled={isSpinning}
            className="h-[50px] w-[150px] text-base"
          >
            Tỉ lệ
          </ButtonOrange>

          <ButtonOrange
            id="add-prize-btn"
            onClick={() => setIsAddPrizePopupOpen(true)}
            disabled={isSpinning}
            className="h-[50px] w-[150px] text-base"
          >
            Thêm quà
          </ButtonOrange>
        </div>

        <div className="button-group-top">
          <button
            id="restart-btn"
            className="btn-action"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            disabled={isSpinning}
            style={{
              cursor: isSpinning ? "not-allowed" : "pointer",
              opacity: 0,
            }}
          >
            Khởi động lại
          </button>
        </div>

        {/* popup handle sticky */}
          {/* img sticky left */}
        {/* <div className="flex justify-center gap-[20px] ">
          {isStickyPopupLeft && (
            <div
              className="fixed z-[1000] cursor-pointer 
                            bottom-4 left-4"
            >
              <Draggable nodeRef={dragRefLeft}>
                <div ref={dragRefLeft} className="relative w-fit">
                  <button
                    onClick={() => setIsStickyPopupLeft(false)}
                    className="absolute top-[-10px] -right-2.5 z-10 w-6 h-6
                     bg-orange-400 text-white rounded-full flex items-center
                      justify-center text-lg font-bold leading-none hover:bg-orange-500
                       transition-colors"
                    aria-label="Đóng popup"
                  >
                    &times;
                  </button>
                  <img
                    src="./static/moi-ban-be-nhan-ngay-10-ovocoins.webp"
                    alt="Mời bạn bè nhận Ovocoins"
                    className="w-[120px] h-[120px] object-contain
                [-webkit-user-drag:none]"
                  />
                </div>
              </Draggable>
            </div>
          )}
        </div> */}

          {/* img sticky right */}
        {/* <div className="flex justify-center gap-[20px] ">
          {isStickyPopupRight && (
            <div
              className="fixed z-[1000] cursor-pointer 
                            bottom-4 right-4"
            >
              <Draggable nodeRef={dragRefRight}>
                <div ref={dragRefRight} className="relative w-fit">
                  <button
                    onClick={() => setIsStickyPopupRight(false)}
                    className="absolute top-[-20px] -right-2.5 z-10 w-6 h-6
                    bg-orange-400 text-white rounded-full flex items-center
                      justify-center text-lg font-bold leading-none hover:bg-orange-500
                      transition-colors"
                    aria-label="Đóng popup"
                  >
                    &times;
                  </button>
                  <img
                    src="./static/survey.png"
                    alt="Mời bạn bè nhận Ovocoins"
                    className="w-[120px] h-[120px] object-contain
                [-webkit-user-drag:none]"
                  />
                </div>
              </Draggable>
            </div>
          )}
        </div> */}


      </div>
    </>
  );
}

export default WheelGame;


// Định nghĩa props cho các component con (trừ Wheel đã tự định nghĩa)
// interface ResultPopupProps { isOpen: boolean; prize: Prize | null; onClose: () => void; }
// interface RateTablePopupProps { isOpen: boolean; prizes: Prize[]; onClose: () => void; onApplyChanges: (updatedPrizes: Prize[]) => void; }
// interface AddPrizePopupProps { isOpen: boolean; prizes: Prize[]; onClose: () => void; onAddPrize: (newPrize: Prize) => void; }
