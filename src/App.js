import Loginpg from './components/loginpg'
import { useEffect } from 'react'
import Add from './components/add.jsx'
import Home from './components/home.jsx'
import Contacts from './components/contacts.jsx'
import Catalog from './components/catalog.jsx'
import Commission from './components/commission.jsx'
import View from './components/view.jsx'
import AllArt from './components/all.jsx'
import Footer from './components/footer.jsx'

import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




function App() {
    function Scrollup(){
    const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
    return (
        <div className='main'>
             
        <Router>
            <Scrollup/>
        
            <Routes>
                <Route path="/loginpg" element={<Loginpg />} />
                <Route path="/Add" element={<Add/>} />
                <Route path="/" element={<Home />} />
                <Route path="/view/:id" element={<View />} />
                <Route path="/Catalogs/:id" element={<Catalog/>} />
                <Route path="/About" element={<Contacts />} />
                <Route path="/commission" element={<Commission />} />
                <Route path="/all" element={< AllArt/>} />
                
                
                {/* Add other routes as needed */}
            </Routes>
            <Footer/>
        </Router>
       
        </div>
    );
}

export default App;
