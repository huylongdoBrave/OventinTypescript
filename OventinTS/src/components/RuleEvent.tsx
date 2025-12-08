import React, { useState } from 'react'

function RuleEvent() {

    const [isExpandedRuleText, setIsExpandedRuleText] = useState(false);

  return (
    <>
    <div
      className=" fixed inset-0 flex justify-center py-10 mb-100 my-5 px-4 z-0 relative"
    >  
      {/* Container popup max width */}
      {/* =>Bỏ items-center, thêm pt-[250px] tạo không gian cho logo và title ở trên */}
      <div className="flex justify-center w-full max-w-[800px] pt-[10px]">

        {/* Title */}
        <img
          src="./static/rule-text.png"
          alt="Thể lệ"
          className="absolute z-10 top-[10px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-full md:w-full md:pr-20 md:pl-20 lg:p-0 lg:w-[800px] max-w-[800px] text-center text-white 
             "
        >
          <div
            className="items-center inset-0 bg-[url('/static/modal.png')] bg-[#ff9a24]  bg-top bg-no-repeat
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[10px]">
              <h6 className="text-[20px] mb-2 text-xl leading-[1.6] font-bold">
                ĐIỀU 1. PHẠM VI ÁP DỤNG
              </h6>
              <div
                // Scroll Animate className={`transition-all duration-800 ease-in-out overflow-hidden 
                //   ${isExpandedRuleText ? "max-h-[2000px]" : "max-h-[400px]"}  `}
                className={`overflow-hidden 
                  ${isExpandedRuleText ? "max-h-[2000px]" : "max-h-[400px]"}`}
              >
                

              </div>

              {/* Span rút ngắn nội dung */}
              <span
                onClick={() => setIsExpandedRuleText(!isExpandedRuleText)}
                className="font-bold text-sm leading-[1.66] text-[var(--normal-blue)] cursor-pointer
               m-0 mt-2 ml-2 flex text-left gap-1 hover:underline"
              >
                {isExpandedRuleText ? "Rút gọn" : "Xem thêm"}
              </span>
            </div>
                          

          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default RuleEvent
