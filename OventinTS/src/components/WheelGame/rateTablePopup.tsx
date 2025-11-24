import React, { useState, useMemo, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import type { Prize } from "./wheelGame"; // Import kiểu Prize

interface RateTablePopupProps {
  isOpen: boolean;
  prizes: Prize[];
  onClose: () => void;
  onApplyChanges: (updatedPrizes: Prize[]) => void;
}

const RateTablePopup: React.FC<RateTablePopupProps> = ({
  isOpen,
  prizes,
  onClose,
  onApplyChanges,
}) => {
  const [tempPrizes, setTempPrizes] = useState<Prize[]>(prizes);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isOpen) {
      setTempPrizes(JSON.parse(JSON.stringify(prizes)));
    }
  }, [isOpen, prizes]);

  // Tính tổng tỉ lệ mỗi khi tempPrizes thay đổi
  const totalProbability = useMemo(() => {
    return (
      tempPrizes.reduce(
        (sum, prize) => sum + (Number(prize.probability) || 0),
        0
      ) * 100
    );
  }, [tempPrizes]);

  // Cập nhật tỉ lệ của quà
  const handlePrizeChange = (id: number, field: keyof Prize, value: string) => {
    setTempPrizes((currentPrizes) =>
      currentPrizes.map((p) => {
        if (p.id === id) {
          // Nếu là probability, chuyển đổi về dạng thập phân (0-1)
          const newValue =
            field === "probability" ? parseFloat(value) / 100 : value;
          return { ...p, [field]: newValue };
        }
        return p;
      })
    );
  };

  // Xóa quà
  const handleDeletePrize = (id: number, name: string) => {
    if (window.confirm(`Xóa quà "${name}" ?`)) {
      setTempPrizes((currentPrizes) =>
        currentPrizes.filter((p) => p.id !== id)
      );
    }
  };

  // Cảnh báo sửa bị tràn tỉ lệ
  const handleApply = () => {
    if (totalProbability > 100.01) {
      alert(
        `Cảnh báo tỉ lệ đang ${totalProbability.toFixed(2)}% . Vui lòng chỉnh tổng dưới 100%`
      );
      return;
    } else if (totalProbability == 0) {
      alert("Tổng tỉ lệ không thể bằng 0%. Hãy nhập lớn 0.");
      return;
    }
    onApplyChanges(tempPrizes); // Gửi dữ liệu đã thay đổi ra component cha
    onClose(); // Đóng popup
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-[100%] h-[100%] bg-[black]/60 flex justify-center items-center z-[1002]">
      <div
        className="flex justify-center items-center flex-col 
                relative w-[90%] max-w-[500px] bg-[#f85a00] border-4 border-white border-solid rounded-[15px] p-[20px] text-white
                shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
      >
        <button
          id="probabilities-close-btn"
          className="absolute top-[5px] right-[15px] bg-none border-none 
        text-[2.5rem] text-white cursor-pointer leading-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-center text-2xl font-bold mb-4">Bảng Tỉ Lệ Trúng Thưởng</h3>
        <div className="w-full">
          <div id="max-h-[50vh] overflow-y-auto pr-2">
            {/* Dùng ReactSortables để bọc các item có thể kéo thả */}
            <ReactSortable
              list={tempPrizes}
              setList={setTempPrizes}
              handle=".prize-name-cell"
              animation={150}
              ghostClass="dragging"
            >
              {tempPrizes.map((prize) => (
                <div
                  key={prize.id}
                  className="flex items-center gap-2 p-2 mb-2 bg-white/10 rounded"
                  data-prize-id={prize.id}
                >
                  <div className="w-8 text-center flex-shrink-0 font-mono">{prize.id}</div>
                  <div className="prize-name-cell basis-[25%] flex-1 font-semibold truncate" style={{ cursor: "grab" }}>
                    <i
                      className="fa-solid fa-grip-vertical"
                      style={{ marginRight: "8px", cursor: "grab" }}
                    ></i>
                    {prize.name}
                  </div>
                  <div className=" w-16 flex justify-center items-center" title={prize.value}>
                    {prize.type === "image" ? (
                      <img
                        src={prize.value}
                        className="w-10 h-10 object-contain"
                        alt="Preview"
                      />
                    ) : (
                      <span className="text-xs truncate">{prize.value}</span>
                    )}
                  </div>
                  <div className="w-10">
                    <input
                      type="color"
                      className="w-full h-8 p-0 border-none rounded cursor-pointer bg-transparent"
                      value={prize.color}
                      onChange={(e) =>
                        handlePrizeChange(prize.id, "color", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-24 relative flex items-center">
                    <input
                      type="number"
                      className="w-full bg-white/20 text-white text-center rounded p-1 pr-5 appearance-none"
                      value={(prize.probability * 100).toFixed(2)}
                      onChange={(e) =>
                        handlePrizeChange(
                          prize.id,
                          "probability",
                          e.target.value
                        )
                      }
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span className="absolute right-1 text-white pointer-events-none">
                      %
                    </span>
                  </div>
                  <div
                    style={{ marginLeft: "10px" }}
                    className="w-8 flex-shrink-0"
                  >
                    <button
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold leading-none hover:bg-red-700 transition-colors"
                      title="Xóa"
                      onClick={() => handleDeletePrize(prize.id, prize.name)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        </div>
        <p
          id="probabilities-total"
          style={{
            color:
              Math.abs(totalProbability - 100) > 0.01 ? "#ffeb3b" : "white",
          }}
          className="text-center font-bold mt-4"
        >
          Tổng tỉ lệ: {totalProbability.toFixed(2)}%
        </p>
        <center>
          <button
            id="apply-probabilities-btn"
            type="button"
            style={{ width: "300px" }}
            onClick={handleApply}
            className="btn-action"
          >
            Cập nhật
          </button>
        </center>
      </div>
    </div>
  );
};

export default RateTablePopup;