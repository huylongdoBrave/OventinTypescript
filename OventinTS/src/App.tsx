
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import { Route, Routes } from 'react-router-dom';
import WheelGame from './components/luckywheel/wheelgame.tsx';

function App() {

  return (
    <div className="pb-[5px] lg:pb-0">    
      <Header />

      <Routes>
        {/* Route cho trang chủ (vòng quay) */}
        <Route path="/" element={<WheelGame />} />

        {/* Route cho trang sản phẩm */}
{/*         <Route path="/prizewheel/products" element={<ShowPrize />} /> */}

      </Routes>
      
      <Footer />

    </div>
  )
}

export default App
