import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faFileContract, faShieldHalved, faCircleQuestion, faCertificate, faGavel } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer(){
  return (
    <footer className="bg-[#ff4109] text-white pt-5 pb-5 absolute bottom-0 w-full">
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8">
                {/* footer-top */}
                <div className="text-center lg:text-left  pb-6">
                    <p className="font-bold text-lg">CÔNG TY TNHH AB AGRI VIỆT NAM</p>
                    <p className="text-sm text-neutral-100 mt-1">Tầng 6A2 Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
                </div>

                {/* footer-middle */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
                    {/* footer-column 1 */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faPhone} className="w-4" /><span>/Ovaltine Vietnam</span></a>
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faEnvelope} className="w-4" /><span>/Ovaltine Vietnam</span></a>
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faFacebook} className="w-4" /><span>Thể lệ chương trình</span></a>
                    </div>
                    {/* footer-column 2 */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faFileContract} className="w-4" /><span>/Ovaltine Vietnam</span></a>
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faShieldHalved} className="w-4" /><span>/Ovaltine Vietnam</span></a>
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faCircleQuestion} className="w-4" /><span>Chính sách bảo mật</span></a>
                    </div>
                    {/* footer-column 3 */}
                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faCertificate} className="w-4" /><span>/19005306</span></a>
                        <a href="#" className="flex items-center gap-3 hover:text-orange-400 transition-colors"><FontAwesomeIcon icon={faGavel} className="w-4" /><span>/Ovaltine Vietnam</span></a>
                    </div>
                </div>
                {/* footer-bottom */}
                <div className="text-center  pt-1 mt-5 mb-30 ">
                    <p>Ovaltine Vietnam © 2025</p>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;