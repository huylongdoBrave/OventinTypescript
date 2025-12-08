import React from 'react'

const RuleEvent = () => {

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[1003] flex justify-center overflow-y-auto py-10 px-4
                transition-opacity duration-300 ease-in-out "
    >
      {/* Container popup max width */}
      {/* =>Bỏ items-center, thêm pt-[250px] tạo không gian cho logo và title ở trên */}
      <div className="relative flex justify-center w-full max-w-[800px] pt-[250px]">
        {/* logo */}
        <img
          src="./static/favicon_oven.png"
          alt="Oventin Logo"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-auto rounded-full p-1.5 filter-[drop-shadow(rgb(255,255,255)_0px_0px_5px)]"
        />
        {/* Title */}
        <img
          src="./static/term.png"
          alt="Chính sách quyền riêng tư"
          className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[300px] h-auto p-1.5"
        />
        {/* Khung lớn popup */}
        <div
          className=" relative filter-[drop-shadow(rgb(255,252,110)_0px_0px_5px)]
                  w-full md:w-full lg:w-[550px] max-w-[800px] text-center text-white 
             "
        >
          <div
            className="items-center inset-0 bg-[url('/static/modal.png')] bg-[#ff9a24]  bg-top bg-no-repeat
                        rounded-[20px] border-4 border-white"
          >
            {/* Nội dung popups */}
            <div className="relative flex-col flex justify-center text-left m-0 p-6 pt-[20px]">
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
  )
}

export default RuleEvent
