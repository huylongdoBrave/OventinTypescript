import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx'
import WheelGame from './components/WheelGame/WheelGames.tsx';

function App() {

  return (
    <div className="pb-[5px] lg:pb-0">    
      <Header />

      <Routes>
        {/* Route cho trang chủ (vòng quays) */}
        <Route path="/" element={<WheelGame />} />

        {/* Route cho trang sản phẩm */}
{/*         <Route path="/prizewheel/products" element={<ShowPrize />} /> */}

      </Routes>
      
      <Footer />

    </div>
  )
}

export default App
