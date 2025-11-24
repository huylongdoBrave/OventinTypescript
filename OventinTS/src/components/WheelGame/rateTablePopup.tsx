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
        <h3 className="probabilities-title">Bảng Tỉ Lệ Trúng Thưởng</h3>
        <div className="probabilities-table">
          <div id="probabilities-table-body">
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
                  className="probabilities-table-row"
                  data-prize-id={prize.id}
                >
                  <div className="prize-id-cell">{prize.id}</div>
                  <div className="prize-name-cell" style={{ cursor: "grab" }}>
                    <i
                      className="fa-solid fa-grip-vertical"
                      style={{ marginRight: "8px" }}
                    ></i>
                    {prize.name}
                  </div>
                  <div className="prize-type-cell" title={prize.value}>
                    {prize.type === "image" ? (
                      <img
                        src={prize.value}
                        className="prize-value-image"
                        alt="Preview"
                      />
                    ) : (
                      prize.value
                    )}
                  </div>
                  <div className="prize-color-cell">
                    <input
                      type="color"
                      className="prize-color-input"
                      value={prize.color}
                      onChange={(e) =>
                        handlePrizeChange(prize.id, "color", e.target.value)
                      }
                    />
                  </div>
                  <div className="prize-prob-cell relative flex items-center">
                    <input
                      type="number"
                      className="prize-prob-input pr-5"
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
                    className="prize-delete-cell"
                  >
                    <button
                      className="delete-prize-btn"
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