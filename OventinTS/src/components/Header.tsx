// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import type { User } from "./RegisterPopup/RegisterPopup";

interface HeaderProps {
  currentUser: User | null;
  isLoggedIn: boolean;
  onLoginClickFeater: () => void;
  onRegisterClickFeater: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClickFeater, onRegisterClickFeater }) => {
    return (
    <>
      {/* Header desktop */}
      <header className="sticky top-0 z-[1001]  hidden lg:block h-[115px] mb-5">
        <nav
          className=" h-[70px] flex justify-between items-center px-4 
         text-white bg-[linear-gradient(#1D2434_0%,#0F7CCF_65px,transparent_65px)]"
        >
          {/* Mục trái desktop header */}
          <div className="flex items-center h-full">
            <Link to="/">
              <img
                src="./static/Zootopia.png"
                alt="Oventin Logo"
                className="h-[120px] mr-[30px] mt-[80px]"
              />
            </Link>
            <ul className="flex list-none m-0 p-0 h-full">
              {/* Menu Item Structure */}
              <li className="relative w-[100px] h-full flex justify-center group">
                <NavLink
                  to="/prizewheel/products"
                  className={() =>
                    `flex items-center w-full h-full text-white no-underline box-border`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`absolute bottom-[-45px] w-[90px] h-[80px] bg-[#ff962b] text-white rounded-lg
                            flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 
                            ${
                              isActive ? "bg-[#ff5a00]" : "group-hover:bg-[#1a2b7a]"
                            } `}
                    >
                      <img
                        className="h-7"
                        src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png"
                        alt="Sản phẩm"
                      />
                      <span className="text-xs font-medium text-center leading-tight">
                        Danh Sách <br /> Sản Phẩm
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
              <li className="relative w-[100px] h-full flex justify-center group">
                <a
                  href="#"
                  className="flex items-center w-full h-full text-white no-underline box-border"
                >
                  <div
                    className="absolute bottom-[-45px] w-[90px] h-[80px] bg-[#ff962b] text-white rounded-lg 
                          flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]"
                  >
                    <img
                      className="h-7"
                      src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png"
                      alt="Đổi Quà"
                    />
                    <span className="text-sm font-medium">Đổi Quà</span>
                  </div>
                </a>
              </li>
              <li className="relative w-[100px] h-full flex justify-center group">
                <NavLink
                  to="/"
                  end
                  className="flex items-center w-full h-full text-white no-underline box-border"
                > 
                  {({ isActive }) => (
                    <div
                      className={`absolute bottom-[-45px] w-[90px] h-[80px] bg-[#ff962b] text-white rounded-lg 
                            flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 ${
                              isActive
                                ? "bg-[rgb(255,90,0)]"
                                : "group-hover:bg-[#1a2b7a]"
                            }`}
                    >
                      <img
                        className="h-7"
                        src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png"
                        alt="Vòng quay"
                      />
                      <span className="text-sm font-medium">Vòng Quay</span>
                    </div>
                  )}
                </NavLink>
              </li>
              <li className="relative w-[100px] h-full flex justify-center group">
                <a
                  href="#"
                  className="flex items-center w-full h-full text-white no-underline box-border"
                >
                  <div
                    className="absolute bottom-[-45px] w-[90px] h-[80px] bg-[#ff962b] text-white rounded-lg 
                          flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 group-hover:bg-[#1a2b7a]"
                  >
                    <img
                      src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png"
                      alt="Thêm"
                      className="h-7"
                    />
                    <span className="text-sm font-medium">Thêm</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Mục phải menu */}
          {isLoggedIn ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 text-base font-medium">
                <img className="w-[30px] h-[30px]" src="./static/Zootopia.png" alt="" />
                <span className="m-0
                                text-sm
                                font-normal
                                leading-normal
                                font-[var(--font-rowdies)]
                                text-white
                                [-webkit-text-stroke:1px_rgb(246,151,44)]
                                ">x1,000
                </span>
              </div>
              <div className="flex items-center gap-2 text-base font-medium">
                <img src="https://ovaltine-website-dev.estuary.solutions/img/icon/spin.png" alt="" />{" "}
                  <span className="m-0
                                    text-sm
                                    font-normal
                                    leading-normal
                                    font-[var(--font-rowdies)]
                                    text-white
                                    [-webkit-text-stroke:1px_rgb(246,151,44)]"
                                    >x101</span>
              </div> 
              <button
                className="bg-[#ff962b] text-white border-2 border-white rounded-full py-2 px-4 font-bold cursor-pointer 
                transition-colors shadow-[0_2px_2px_black] hover:bg-white hover:text-[#ff962b]"
              >
                Nhập mã
              </button>
              <Link to="/Profile" className="flex items-center cursor-pointer">
                  {/* Hình robot */}
                  <img
                    className="h-8 md:h-10 rounded-full"
                    src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc"
                    alt="User Avatar"
                  />
              </Link>
            </div>
          ) : (
            <div className=" flex items-center gap-6">
              <button
                onClick={onLoginClickFeater}
                className="text-white font-bold hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Đăng nhập
              </button>
              <button
                onClick={onRegisterClickFeater}
                className="text-white font-bold hover:text-yellow-300 transition-colors cursor-pointer"
              >
                Đăng ký
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Header cho Tablet và Mobile */}
      <header className="sticky top-0 z-[1001] lg:hidden h-[70px] mb-2.5">
        <nav className="h-[70px] md:h-[60px] flex justify-between items-center
         bg-[linear-gradient(#1D2434_0%,#0F7CCF_65px,transparent_65px)] text-white px-2 md:px-4">

          {/* Mục phải menu */}
          <div className="flex items-center h-full">
            <Link to="/" className="flex items-center">
              <img
                src="./static/Zootopia.png"
                alt="Oventin Logo"
                className="h-[50px] md:h-[80px] absolute md:top-[20px] [overflow-clip-margin:content-box]
                          overflow-clip before:box-[inherit] cursor-pointer"
              />
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2 md:gap-5">
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base font-medium">
                <img className="w-[30px] h-[30px]" src="./static/Zootopia.png" alt="" />
                <span className="m-0
                                text-sm
                                font-normal
                                leading-normal
                                font-[var(--font-rowdies)]
                                text-white
                                [-webkit-text-stroke:1px_rgb(246,151,44)]
                                ">x1,000
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 text-xs md:text-base font-medium">
                <img src="https://ovaltine-website-dev.estuary.solutions/img/icon/spin.png" alt="" />{" "}
                  <span className="m-0 text-sm
                                    font-normal
                                    leading-normal
                                    font-[var(--font-rowdies)]
                                    text-white
                                    [-webkit-text-stroke:1px_rgb(246,151,44)]"
                                    >x101</span>
              </div>
              <button
                className="bg-[#ff962b] text-white border-2 border-white rounded-full py-1 px-2 md:py-2 md:px-4 text-xs md:text-sm font-bold cursor-pointer 
                transition-colors shadow-[0_2px_2px_black] hover:bg-white hover:text-[#ff962b]"
              >
                Nhập mã
              </button>
              <div >
                <Link to="/Profile" className="flex items-center cursor-pointer">
                  {/* Hình robot */}
                  <img
                    className="h-8 md:h-10 rounded-full"
                    src="https://s3dev.estuary.solutions/ovaltine2024dev/76b6ed4d-02ed-4393-810a-967b3586b1dc"
                    alt="User Avatar"
                  />
                </Link>
              </div>
            </div>
          ) : (
            <div className=" flex items-center gap-4 md:gap-6">
              <button
                onClick={onLoginClickFeater}
                className="text-white font-bold hover:text-yellow-300 transition-colors cursor-pointer text-sm"
              >
                Đăng nhập
              </button>
              <button
                onClick={onRegisterClickFeater}
                className="text-white font-bold hover:text-yellow-300 transition-colors cursor-pointer text-sm"
              >
                Đăng ký
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Bottom Nav cho Tablet và Mobile */}
      <div
        className="lg:hidden fixed bottom-0 left-0 w-full
       bg-white rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-[1000] py-1.5"
      >
        {/* CŨ  <ul className="flex justify-around list-none m-0 p-0 h-full"></ul> */}
        {/* Thay justify-around bằng justify-center và thêm gap-4 để các mục menu gần nhau hơn */}
        <ul className="flex justify-center gap-4 list-none m-0 p-0 h-full">
          <li className="relative flex justify-center group">
            <NavLink
              to="/prizewheel/products"
              className="flex items-center w-full h-full no-underline box-border"
            >
              {({ isActive }) => (
                <div
                  className={`bottom-[35px] relative w-[70px] h-[70px] bg-[#ff962b] text-white rounded-lg 
                    flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a] ${
                      isActive ? "bg-[#ff5a00]" : ""
                    }`}
                >
                  <img
                    className="h-6"
                    src="https://ovaltine-website-dev.estuary.solutions/img/menu/product.png"
                    alt="Sản phẩm"
                  />
                  <span className="text-[10px] font-medium text-center leading-tight">
                    Danh Sách <br /> Sản Phẩm
                  </span>
                </div>
              )}
            </NavLink>
          </li>
          <li className="relative flex justify-center group">
            <a
              href="#"
              className="flex items-center w-full h-full no-underline box-border"
            >
              <div
                className="bottom-[35px] relative w-[70px] h-[70px] bg-[#ff962b] text-white rounded-lg 
                    flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a]"
              >
                <img
                  className="h-6"
                  src="https://ovaltine-website-dev.estuary.solutions/img/menu/gift.png"
                  alt="Đổi Quà"
                />
                <span className="text-xs font-medium">Đổi Quà</span>
              </div>
            </a>
          </li>
          <li className="relative flex justify-center group">
            <NavLink
              to="/"
              end
              className="flex items-center w-full h-full no-underline box-border"
            >
              {({ isActive }) => (
                <div
                  className={`bottom-[35px] relative w-[70px] h-[70px] bg-[#ff962b] text-white rounded-lg 
                        flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a] ${
                          isActive ? "bg-[rgb(255,90,0)]" : ""
                        }`}
                >
                  <img
                    className="h-6"
                    src="https://ovaltine-website-dev.estuary.solutions/img/menu/spin.png"
                    alt="Vòng quay"
                  />
                  <span className="text-xs font-medium">Vòng Quay</span>
                </div>
              )}
            </NavLink>
          </li>
          <li className="relative flex justify-center group">
            <a
              href="#"
              className="flex items-center w-full h-full no-underline box-border"
            >
              <div
                className="bottom-[35px] relative w-[70px] h-[70px] bg-[#ff962b] text-white rounded-lg 
                    flex flex-col justify-center items-center border-4 border-[#e6f3ff] transition-all gap-1 shadow-md group-hover:bg-[#1a2b7a]"
              >
                <img
                  src="https://ovaltine-website-dev.estuary.solutions/img/menu/more.png"
                  alt="Thêm"
                  className="h-6"
                />
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
