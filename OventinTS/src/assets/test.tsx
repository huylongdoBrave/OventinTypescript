  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1002] p-4">
      <div
        className="flex flex-col relative w-full max-w-2xl bg-[#f85a00] border-4 border-white rounded-2xl p-5 text-white shadow-2xl"
      >
        <button
          className="absolute top-1 right-4 bg-transparent border-0 text-4xl text-white cursor-pointer leading-none"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-center text-2xl font-bold mb-4">Bảng Tỉ Lệ Trúng Thưởng</h3>
        <div className="w-full my-2">
          {/* Table Body with scrolling */}
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            {/* Dùng ReactSortables để bọc các item có thể kéo thả */}
            <ReactSortable
              list={tempPrizes}
              setList={setTempPrizes}
              handle=".prize-name-cell"
              animation={150}
              ghostClass="opacity-30"
            >
              {tempPrizes.map((prize) => (
                <div
                  key={prize.id}
                  className="flex items-center gap-2 p-2 mb-2 bg-black/10 rounded"
                  data-prize-id={prize.id}
                >
                  <div className="w-8 text-center flex-shrink-0 font-mono">{prize.id}</div>
                  <div className="flex-1 font-semibold truncate" style={{ cursor: "grab" }}>
                    <i
                      className="fa-solid fa-grip-vertical"
                      style={{ marginRight: "8px", cursor: "grab" }}
                    ></i>
                    {prize.name}
                  </div>
                  <div className="w-16 flex justify-center items-center" title={prize.value}>
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
                      onChange={(e) => handlePrizeChange(prize.id, "color", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-24 relative flex items-center">
                    <input
                      type="number"
                      className="w-full bg-white/20 text-white text-center rounded p-1 pr-5 appearance-none"
                      value={(prize.probability * 100).toFixed(2)}
                      onChange={(e) => handlePrizeChange(prize.id, "probability", e.target.value)
                      }
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span className="absolute right-2 text-white pointer-events-none">
                      %
                    </span>
                  </div>
                  <div
                    className="w-8 flex-shrink-0"
                  >
                    <button
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold leading-none hover:bg-red-700 transition-colors"
                      title="Xóa"
                      onClick={() => handleDeletePrize(prize.id, prize.name)}
                    >
