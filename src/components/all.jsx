import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { useNavigate, useParams } from 'react-router-dom';
import FetchArt from './fetchart'
export default function All() {
    
const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState([]);

    useEffect(() => {
        FetchArt(`http://127.0.0.1:8000/artworks/list/`,setArtwork);
    }, [id]);

    if (!artwork) {
        return <div>Loading...</div>;
    }

    const handleClick = (id) => {
        navigate(`/view/${id}`);
    };

    return (
        <div className='catalog-pg'>
            <Navbar />
            <div className='catalog-box'>
                {artwork.map((art, index) => (
                    <div key={index} className='catalog-img'>
                        <img
                            src={art.image_url}
                            alt={art.name || 'Artwork'}
                            onClick={() => handleClick(art.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}