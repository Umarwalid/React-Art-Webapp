import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [catalogs, setCatalogs] = useState([]);
   

    useEffect(() => {
        fetch('http://127.0.0.1:8000/artworks/catalogs/')
            .then(response => response.json())
            .then(data => setCatalogs(data))
            .catch(error => console.error('Error fetching catalogs:', error));
    }, []);

    const handleMenuClick = (path) => {
        setMenuOpen(false); 
        navigate(path); 
    };

    const handleCatalogToggle = () => {
        setCatalogOpen(prev => !prev);
    };

    return (
        <nav className="navbar-pg">
            <div className="navbar-title">Art-studios</div>
            <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <li onClick={() => handleMenuClick('/')}>Home</li>
                <li onClick={() => handleMenuClick('/About')}>About</li>
                <li 
                    onMouseEnter={() => setCatalogOpen(true)}
                    onMouseLeave={() => setCatalogOpen(false)}
                    onClick={handleCatalogToggle}
                >
                    Catalog
                    {catalogOpen && (
                        <ul className="dropdown-menu">
                               <li onClick={() => handleMenuClick('/all')}>All</li>
                            {catalogs.map((catalog, index) => (
                                <li key={index} onClick={() => handleMenuClick(`/catalogs/${catalog}`)}>
                                    {catalog}
                                </li>
                            ))}
                           
                        </ul>
                    )}
                </li>
                <li onClick={() => handleMenuClick('/Commission')}>Commission</li>
            </ul>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>
        </nav>
    );
}
