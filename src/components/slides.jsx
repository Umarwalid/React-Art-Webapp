import React, { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Slides() {
    const [artworks, setArtworks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/artworks/listRA/');
                if (response.ok) {
                    const metadata = await response.json();
                    const storage = getStorage();
                    const artworksWithUrls = await Promise.all(metadata.map(async artwork => {
                        try {
                            const imageRef = ref(storage, artwork.image_url); 
                            const url = await getDownloadURL(imageRef);
                            return { ...artwork, imageUrl: url };
                        } catch (error) {
                            console.error('Error getting download URL for:', artwork.image_url, error);
                            return { ...artwork, imageUrl: null }; 
                        }
                    }));
                    setArtworks(artworksWithUrls);
                } else {
                    console.error('Failed to fetch metadata');
                }
            } catch (error) {
                console.error('Error fetching artworks:', error);
            }
        };

        fetchArtworks();
    }, []);

    useEffect(() => {
        if (artworks.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % artworks.length);
            }, 3000); 
            return () => clearInterval(interval);
        }
    }, [artworks]);

    if (artworks.length === 0) {
        return <p>Loading...</p>;
    }

    const currentArtwork = artworks[currentIndex];

    return (
        <div className="slideshow-container">
            <div className="slideshow">
                {currentArtwork.imageUrl ? (
                    <img src={currentArtwork.imageUrl} alt={currentArtwork.name} className="slideshow-image"
                         onClick={() => navigate(`/view/${currentArtwork.id}`)} />
                ) : (
                    <p>Image not available</p>
                )}
                <div className="slideshow-text">
                    <h3>{currentArtwork.name}</h3>
                </div>
            </div>
        </div>
    );
}

export default Slides;
