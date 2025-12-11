
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faEnvelope, faFileContract, faShieldHalved, faCircleQuestion, faCertificate, faGavel } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer(){
  return (
    <footer className="bg-[#374151]/90 text-white pt-5 w-[100%]">
      {/* CŨ <div className="container mx-auto px-1 w-[90%] sm:w-[50%] lg:w-[50%]"></div> */}
      {/* === Footer cho Desktop (hiển thị từ size lg trở lên) === */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 w-full max-w-4xl">
          <div className="w-full text-center flex flex-col gap-8">
            {/* footer-top */}
            <div className="text-left w-full pb-6">
              <p className="font-bold text-lg">CÔNG TY TNHH ABCXYZ VIỆT NAM</p>
              <p className="text-sm text-neutral-100 mt-1">Tầng 70 Tòa nhà Vietnam, 200 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
            </div>

            {/* footer-middle */}
            <div className="grid grid-cols-3 gap-7 text-sm">
              {/* footer-column 1 */}
              <div className="flex flex-col items-start gap-3">
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/fb.png" className='w-4' alt="" /><span>/Zootopia Vietnam</span></a>
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/shopee.png" className='w-4' alt="" /><span>/Zootopia Vietnam</span></a>
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><span>Thể lệ chương trình</span></a>
              </div>
              {/* footer-column 2 */}
              <div className="flex flex-col items-start gap-3">
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/tiktok.png" className='w-5 h-5' alt="" /><span>/Zootopia Vietnam</span></a>
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/tiktok-shop.png" className='w-5 h-5' alt="" /><span>/Zootopia Vietnam</span></a>
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><span>Chính sách quyền riêng tư</span></a>
              </div>
              {/* footer-column 3 */}
              <div className="flex flex-col items-start gap-3">
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/phone.png" className="w-4" alt="" /><span>/19005306</span></a>
                <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/lazada.png" className="w-4" alt="" /><span>/Zootopia Vietnam</span></a>
              </div>
            </div>

            {/* footer-bottoms */}
            <div className="text-center pt-1 mt-5 pb-10">
              <p>Zootopia VN © 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* === Footer cho Tablet & Mobile (ẩn từ size lg trở lên) === */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 w-full">
          <div className="w-full text-center flex flex-col gap-8">
            {/* footer-top */}
            <div className="text-left w-full">
              <p className="font-bold text-base">CÔNG TY TNHH ABCXYZ VIỆT NAM</p>
              <p className="text-sm text-neutral-100 mt-1">Tầng 70 Tòa nhà Vietnam, 200 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
            </div>

            {/* footer-middle: Luôn là 2 cột */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
              {/* Social links */}
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/fb.png" className='w-4' alt="" /><span>/Ovolmatine VN</span></a>
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/tiktok.png" className='w-4 h-5' alt="" /><span>/Ovolmatine VN</span></a>
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/shopee.png" className='w-4' alt="" /><span>/Ovolmatine VN</span></a>
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/tiktok-shop.png" className='w-4 h-5' alt="" /><span>/Ovolmatine VN</span></a>
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/lazada.png" className="w-4" alt="" /><span>/Ovolmatine VN</span></a>
              <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><img src="https://ovaltine-website-dev.estuary.solutions/img/icon/phone.png" className="w-4" alt="" /><span>/19005306</span></a>
              
              {/* Policy links: Luôn nằm ở hàng dưới cùng */}
              <a href="#" className="mt-2 flex items-center gap-3 hover:text-orange-400 transition-colors"><span>Thể lệ chương trình</span></a>
              <a href="#" className="mt-2 flex items-center gap-3 hover:text-orange-400 transition-colors"><span>Chính sách quyền riêng tư</span></a>
            </div>

            {/* footer-bottoms */}
            <div className="text-center pt-4 mt-5 pb-10">
              <p>Zootopia VN © 2025</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;