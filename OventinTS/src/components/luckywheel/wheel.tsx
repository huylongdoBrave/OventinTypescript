import React, { useMemo, type FC } from 'react';
import type { Prize } from './wheelgame'; // Import kiểu Prize từ file wheelgame

interface WheelProps {
  prizes: Prize[];
}

const Wheel: FC<WheelProps> = ({ prizes }) => {
  const sliceCount = prizes.length > 0 ? prizes.length : 1;
  const sliceAngle = 360 / sliceCount;
  const cssOffsetAngle = -(sliceAngle / 2);

  // Lấy kích thước của vòng quay từ biến CSS --container-wheel-size
  // và tính toán chiều rộng động cho mỗi ô quà.
  // useMemo để chỉ tính toán lại khi sliceAngle thay đổi.
  const dynamicWidth = useMemo(() => {
      const containerWheelSize = 360;       // Giả sử kích thước vòng quay là 360px như trong CSS
      // Công thức: đường kính * sin(góc ở tâm / 2).
      // Nhân với 1.05 để bù vào lỗi làm tròn của trình duyệt, giúp các ô khít vào nhau.
      return containerWheelSize * Math.sin((sliceAngle / 2) * (Math.PI / 180)) * 1.05;
  }, [sliceAngle]);

  return (
    <div className="relative h-[var(--container-wheel-size)] w-[var(--container-wheel-size)] bg-white 
                   rounded-full overflow-hidden shadow-[0_0_10px_gray] transition-all duration-3000">
      {prizes.map((prize, index) => {
        const rotation = cssOffsetAngle + index * sliceAngle;
        return (
          <div
            key={prize.id}
            className="absolute left-1/2 h-[calc(50%+1px)] box-border pt-5 flex flex-col items-center justify-start 
                       font-mono font-black text-red-600 origin-bottom [clip-path:polygon(100%_0,50%_100%,0_0)]"
            style={{
              transform: `translateX(-50%) rotate(${rotation}deg)`,
              background: prize.color,
              width: `${dynamicWidth}px`, // Áp dụng chiều rộng động
            }}
            data-id={prize.id}
            data-name={prize.name}
          >
            {prize.type === 'image' ? (
              <>
                <img src={prize.value} alt={prize.name} className="w-[35%] h-auto" />
                <span className="w-[80%] pt-1 box-border text-center text-[#020202] text-[9px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{prize.name}</span>
              </>
            ) : (
              <p className="m-0 text-center text-[#050505] text-[0.9em] max-w-[70%]">{prize.value}</p>
            )}
          </div>
          
        );
      })}
    </div>
  );
}

export default Wheel;
