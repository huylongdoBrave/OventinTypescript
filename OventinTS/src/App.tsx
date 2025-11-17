
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="pb-[80px] lg:pb-0">    
      <Header />

      <Routes>
        {/* Các routes sẽ ở đây */}
      </Routes>
      
      <Footer />

    </div>
  )
}

export default App
