import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (

    // <header className="h-[115px] mb-5">
    //   <nav className="sticky h-[70px] flex justify-between items-center relative text-white bg-[linear-gradient(rgb(35,61,163)_0%,rgb(35,61,163)_65px,transparent_65px)]">
    //     <div className="flex items-center h-full">
    //         <Link to="/">
    //             <img src="/static/favicon_oven.png" alt="Oventin Logo" className="h-[120px] mr-[30px] mt-[80px]" />
    //         </Link>
    //         <ul className="flex list-none m-0 p-0 h-full">
    //             <li className="relative w-[100px] h-full flex justify-center group">
    //                 <NavLink to="/prizewheel/products" className={({ isActive }) => `flex items-center w-full h-full text-white no-underline box-border ${isActive ? 'active' : ''}`}>
    //                     <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
    //                         <img className="text-3xl" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="Sản phẩm" />
    //                         <span className="text-sm font-medium text-center">Danh Sách <br /> Sản Phẩm</span>
    //                     </div>
    //                 </NavLink>
    //             </li>

    //             <li className="relative w-[100px] h-full flex justify-center group">
    //                 <a href="#" className="flex items-center w-full h-full text-white no-underline box-border">
    //                     <div className="absolute bottom-[-45px] w-[80px] h-full bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]">
    //                         <img className="text-3xl" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="Đổi Quà" />
    //                         <span className="text-sm font-medium">Đổi Quà</span>
    //                     </div>
    //                 </a>
    //             </li>

    //             <li className="relative w-[100px] h-full flex justify-center group">
    //                 <NavLink to="/" end className={({ isActive }) => `flex items-center w-full h-full text-white no-underline box-border ${isActive ? 'active' : ''}`}>
    //                     <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
    //                         <img className="text-3xl" src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png" alt="Vòng quay" />
    //                         <span className="text-sm font-medium">Vòng Quay</span>
    //                     </div>
    //                 </NavLink>
    //             </li>

    //             <li className="relative w-[100px] h-full flex justify-center group">
    //                 <a href="#" className="flex items-center w-full h-full text-white no-underline box-border">
    //                     <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]">
    //                         <img src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png" alt="Thêm" className="text-3xl" />
    //                         <span className="text-sm font-medium">Thêm</span>
    //                     </div>
    //                 </a>
    //             </li>
    //         </ul>
    //     </div>
    //     <div className="flex items-center gap-5">
    //         <div className="flex items-center gap-2 text-base font-medium"><FontAwesomeIcon icon={faStar} className="text-xl" /> <span>1,000</span></div>
    //         <div className="flex items-center gap-2 text-base font-medium"><FontAwesomeIcon icon={faTicket} className="text-xl" /> <span>10</span></div>
    //         <button className="bg-[#233da3] text-white border-2 border-white rounded-full py-2 px-4 font-bold cursor-pointer transition-colors shadow-[0_2px_2px_black] hover:bg-white hover:text-[#233da3]">Nhập mã</button>
    //         <div className="flex items-center gap-2 text-base font-medium">
    //             <img className="h-10" src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc" alt="" />
    //         </div>
    //     </div>
    //   </nav>
    // </header>

    <>  
    
    {/* Header had responsive */}
      <header className="hidden lg:block h-[115px] mb-5">
        <nav className="sticky h-[70px] flex justify-between items-center relative text-white bg-[linear-gradient(rgb(35,61,163)_0%,rgb(35,61,163)_65px,transparent_65px)] px-4">
          <div className="flex items-center h-full">
              <Link to="/">
                  <img src="/static/favicon_oven.png" alt="Oventin Logo" className="h-[120px] mr-[30px] mt-[80px]" />
              </Link>
              {/* Desktop Menu */}
              <ul className="flex list-none m-0 p-0 h-full">
                  {/* Menu Item Structure */}
                  <li className="relative w-[100px] h-full flex justify-center group">
                      <NavLink to="/prizewheel/products" className={({ isActive }) => `flex items-center w-full h-full text-white no-underline box-border ${isActive ? 'active' : ''}`}>
                          <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
                              <img className="h-7" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="Sản phẩm" />
                              <span className="text-xs font-medium text-center leading-tight">Danh Sách <br /> Sản Phẩm</span>
                          </div>
                      </NavLink>
                  </li>
                  <li className="relative w-[100px] h-full flex justify-center group">
                      <a href="#" className="flex items-center w-full h-full text-white no-underline box-border">
                          <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]">
                              <img className="h-7" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="Đổi Quà" />
                              <span className="text-sm font-medium">Đổi Quà</span>
                          </div>
                      </a>
                  </li>
                  <li className="relative w-[100px] h-full flex justify-center group">
                      <NavLink to="/" end className={({ isActive }) => `flex items-center w-full h-full text-white no-underline box-border ${isActive ? 'active' : ''}`}>
                          <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
                              <img className="h-7" src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png" alt="Vòng quay" />
                              <span className="text-sm font-medium">Vòng Quay</span>
                          </div>
                      </NavLink>
                  </li>
                  <li className="relative w-[100px] h-full flex justify-center group">
                      <a href="#" className="flex items-center w-full h-full text-white no-underline box-border">
                          <div className="absolute bottom-[-45px] w-[80px] h-[80px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]">
                              <img src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png" alt="Thêm" className="h-7" />
                              <span className="text-sm font-medium">Thêm</span>
                          </div>
                      </a>
                  </li>
              </ul>
          </div>
          <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-base font-medium"><FontAwesomeIcon icon={faStar} className="text-xl text-yellow-400" /> <span>1,000</span></div>
              <div className="flex items-center gap-2 text-base font-medium"><FontAwesomeIcon icon={faTicket} className="text-xl text-red-500" /> <span>10</span></div>
              <button className="bg-[#233da3] text-white border-2 border-white rounded-full py-2 px-4 font-bold cursor-pointer transition-colors shadow-[0_2px_2px_black] hover:bg-white hover:text-[#233da3]">Nhập mã</button>
              <div className="flex items-center">
                  <img className="h-10 rounded-full" src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc" alt="User Avatar" />
              </div>
          </div>
        </nav>
      </header>

      {/* Header for Tablet and Mobile */}
      <header className="lg:hidden h-[70px] mb-2.5">
        <nav className="sticky h-full flex justify-between items-center bg-[#233da3] text-white px-2 md:px-4">
          <div className="flex items-center h-full">
            <Link to="/" className="flex items-center">
                <img src="/static/favicon_oven.png" alt="Oventin Logo" className="h-[60px]" />
            </Link>
            </div>
          <div className="flex items-center gap-2 md:gap-5">
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base font-medium"><FontAwesomeIcon icon={faStar} className="text-base md:text-xl text-yellow-400" /> <span>1,000</span></div>
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base font-medium"><FontAwesomeIcon icon={faTicket} className="text-base md:text-xl text-red-500" /> <span>10</span></div>
              <button className="bg-[#233da3] text-white border-2 border-white rounded-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-sm font-bold cursor-pointer transition-colors shadow-[0_2px_2px_black] hover:bg-white hover:text-[#233da3]">Nhập mã</button>
              <div className="flex items-center">
                  <img className="h-8 md:h-10 rounded-full" src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc" alt="User Avatar" />
              </div>
          </div>
        </nav>
      </header>

      {/* Bottom Nav for Tablet and Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-[1000] py-1.5">
        <ul className="flex justify-around list-none m-0 p-0 h-full">
            <li className="relative flex justify-center group">
                <NavLink to="/prizewheel/products" className={({ isActive }) => `flex items-center w-full h-full no-underline box-border ${isActive ? 'active' : ''}`}>
                    <div className="relative w-[70px] h-[70px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
                        <img className="h-6" src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png" alt="Sản phẩm" />
                        <span className="text-[10px] font-medium text-center leading-tight">Danh Sách <br /> Sản Phẩm</span>
                    </div>
                </NavLink>
            </li>
            <li className="relative flex justify-center group">
                <a href="#" className="flex items-center w-full h-full no-underline box-border">
                    <div className="relative w-[70px] h-[70px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a]">
                        <img className="h-6" src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png" alt="Đổi Quà" />
                        <span className="text-xs font-medium">Đổi Quà</span>
                    </div>
                </a>
            </li>
            <li className="relative flex justify-center group">
                <NavLink to="/" end className={({ isActive }) => `flex items-center w-full h-full no-underline box-border ${isActive ? 'active' : ''}`}>
                    <div className="relative w-[70px] h-[70px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a] [&.active]:bg-[#ff4109]">
                        <img className="h-6" src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png" alt="Vòng quay" />
                        <span className="text-xs font-medium">Vòng Quay</span>
                    </div>
                </NavLink>
            </li>
            <li className="relative flex justify-center group">
                <a href="#" className="flex items-center w-full h-full no-underline box-border">
                    <div className="relative w-[70px] h-[70px] bg-[#233da3] text-white rounded-lg flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a]">
                        <img src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png" alt="Thêm" className="h-6" />
                        <span className="text-xs font-medium">Thêm</span>
                    </div>
                </a>
            </li>
        </ul>
      </div>

    </>
  );
}

export default Header;
