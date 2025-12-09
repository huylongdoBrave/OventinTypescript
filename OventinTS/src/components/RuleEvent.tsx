import React, { useState } from "react";

function RuleEvent() {
  const [isExpandedRuleText, setIsExpandedRuleText] = useState(false);

  return (
    <>
      <div className=" fixed inset-0 flex justify-center py-10 mb-10 my-5 px-4 z-0 relative">
        {/* Container max width */}
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
              {/* Nội dung table rule */}
              <div className="relative flex-col flex justify-center text-left m-0 p-8 pt-[10px]">
                <h6 className="text-[20px] mt-5  text-xl leading-[1.6] font-bold">
                  Thể lệ
                </h6>
                <div
                  className={`overflow-hidden 
                  ${isExpandedRuleText ? "max-h-[3000px]" : "max-h-[740px]"}`}
                >
                  <div className="text-left leading-normal text-[16px] mt-4">
                    <p className="text-[#233DA3]">
                      1. Tên chương trình khuyến mãi:{" "}
                      <span className="text-white">
                        “Tích điểm Ovaltine săn ngay quà xịn”
                      </span>{" "}
                    </p>
                    <p className="text-[#233DA3]">
                      2. Hàng hóa, dịch vụ khuyến mãi:
                    </p>
                    <p className="text-black">
                      Lốc sữa nước Ovaltine 180ml (mỗi lốc gồm 4 hộp sữa nước
                      Ovaltine 180ml), và Lốc sữa nước Ovaltine 110ml (mỗi lốc
                      gồm 4 hộp sữa nước Ovaltine 110ml), Lốc sữa nước Ovaltine
                      DHA 180ml (mỗi lốc gồm 4 hộp sữa nước Ovaltine DHA 180ml).{" "}
                      <br />
                      Sữa phù hợp cho đối tượng từ 2 tuổi trở lên. Từ 4 tuổi trở
                      lên, khuyến nghị sử dụng 1 hộp Ovaltine (180ml) mỗi ngày.
                    </p>
                    <br />
                    <table className="min-w-full mb-5 ">
                      <thead className="border-1 ">
                        <tr className="border-b p-[16px]">
                          <th className="py-2 pl-2 text-left">STT</th>
                          <th className="py-2 pl-2 text-left">Sản phẩm</th>
                          <th className="py-2 pl-2 text-left">Quy cách</th>
                        </tr>
                      </thead>
                      <tbody className="border-1 border-[white] text-[#233DA3]">
                        <tr className="border-b border-[white]">
                          <td className="py-2 pl-2">1</td>
                          <td className="py-2">Thức uống sữa lúa mạch bổ sung Canxi, vị sô cô la Ovaltine 180ml</td>
                          <td className="py-2"> 4 hộp /1 lốc. 180ml/hộp</td>
                        </tr>
                        <tr className="border-b border-[white]">
                          <td className="py-2 pl-2">2</td>
                          <td className="py-2">
                            Thức uống sữa lúa mạch bổ sung Canxi, vị sô cô la
                            Ovaltine 110ml
                          </td>
                          <td className="py-2">4 hộp /1 lốc. 110ml/hộp</td>
                        </tr>
                        <tr className="border-b border-[white]">
                          <td className="py-2 pl-2">3</td>
                          <td className="py-2">
                            Thực phẩm bổ sung thức uống lúa mạch sô-cô-la bổ
                            sung DHA – Ovaltine DHA+ 180ml
                          </td>
                          <td className="py-2">4 hộp /1 lốc. 180ml/hộp</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-[#233DA3] mb-5">
                      3. Thời gian khuyến mại: từ 00 giờ 00 phút ngày 25/10/2025
                      đến 23 giờ 59 phút ngày 31/12/2025. <br />
                      4. Địa bàn (phạm vi) khuyến mại: Trên toàn quốc. <br />
                      5. Hình thức khuyến mại: Chương trình khuyến mại mang tính
                      may rủi <br />
                      6. Khách hàng của chương trình khuyến mại: <br />
                      Tất cả người tiêu dùng từ 18 tuổi trở lên có quốc tịch
                      Việt Nam trên địa bàn được khuyến mại và tham gia trong
                      thời gian diễn ra chương trình khuyến mại. <br />
                      Các đối tượng không được tham gia: Chương trình không áp
                      dụng cho các đối tượng là nhân viên của nhãn hàng
                      Ovaltine, Công ty TNHH DKSH Việt Nam, Công ty Cổ phần
                      Smollan (Việt Nam ), Công ty TNHH AB Agri Việt Nam, nhà
                      quảng cáo, in ấn Sản phẩm khuyến mại. <br />
                      7. Cơ cấu giải thưởng: <br />
                    </p>

                    <table className="min-w-full mb-5 ">
                      <thead className="border-1 ">
                        <tr className="border-b text-[14px]">
                          <th className="py-2 pl-2 text-left ">
                            Cơ cấu giải thưởng
                          </th>
                          <th className="py-2 text-left pl-2">
                            Nội dung giải thưởng (chi tiết  <br /> nội dung và ký mã
                            hiệu từng <br /> giải thưởng)
                          </th>
                          <th className="py-2 text-left pl-2">
                            Trị giá giải thưởng <br /> đã bao gồm VAT (đồng)
                          </th>
                          <th className="py-2 text-left pl-2">Số giải</th>
                          <th className="py-2 text-left pl-2">Thành tiền <br /> (đồng)</th>
                        </tr>
                      </thead>
                      <tbody className="border-1 border-[white] text-[#233DA3] text-[14px] p-[16px]">
                        <tr className="border-b border-[white]  p-[16px]">
                          <td className="py-2 pl-2 ">Giải Nhất</td>
                          <td className="py-2">
                            Iphone 16 128GB Box
                          </td>
                          <td className="py-2">	21,970,000</td>
                          <td className="py-2">	5</td>
                          <td className="py-2">109.850.000</td>
                        </tr>
                        <tr className="border-b border-[white] p-[16px]">
                          <td className="py-2 pl-2">Giải Nhì</td>
                          <td className="py-2">
                            Máy ảnh Fujifilm Instax Mini 12	
                          </td>
                          <td className="py-2">	2.706.000</td>
                          <td className="py-2">	15</td>
                          <td className="py-2">40.590.000</td>
                        </tr>
                        <tr className="border-b border-[white] p-[16px]">
                          <td className="py-2 pl-2">Giải Ba</td>
                          <td className="py-2">
                            	Thẻ điện thoại trị giá 20,000 <br /> đồng
                          </td>
                          <td className="py-2">20,000</td>
                          <td className="py-2 ">12,000</td>
                          <td className="py-2">240,000,000</td>
                        </tr>
                        <tr className="border-b border-[white] p-[16px]">
                          <td className="py-2 pl-2">Tổng</td>
                          <td className="py-2"></td>
                          <td className="py-2"></td>
                          <td className="py-2"></td>
                          <td className="py-2">390,440,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Span rút ngắn nội dung */}
                <span
                  onClick={() => setIsExpandedRuleText(!isExpandedRuleText)}
                  className="font-bold text-sm leading-[1.66] text-[white] cursor-pointer
               m-0 mt-2 ml-2 flex text-left gap-1 hover:underline"
                >
                  {isExpandedRuleText ? "Rút gọn" : "Xem thêm"}
                </span>
              </div>
            </div>
          </div>

          <img
            src="/static/dolphine.png"
            alt="Dolphine"
            className="absolute z-[5] h-auto transition-all duration-300 ease-in-out hidden
                lg:block lg:w-[150px] lg:bottom-[40px] lg:left-[0px]"
          />
          <img
            src="/static/boy.png"
            alt="Boy"
            className="absolute z-[5] h-auto transition-all duration-300 ease-in-out hidden
                lg:block lg:w-[150px] lg:bottom-[40px] lg:right-[0px]"
          />
        </div>
      </div>
    </>
  );
}

export default RuleEvent;
