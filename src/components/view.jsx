import React, { useState, useEffect, useRef } from 'react';
import Navbar from './navbar';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import './styles.css';
import email from '../images/email.svg';
export default function View() {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const imgRef = useRef(null);
    const metadataRef = useRef(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/artworks/view/${id}/`);
                if (response.ok) {
                    const data = await response.json();
                    const storage = getStorage();
                    try {
                        const imageRef = ref(storage, data.image_url);
                        const url = await getDownloadURL(imageRef);
                        setArtwork({ ...data, image_url: url });
                    } catch (error) {
                        console.error('Error getting download URL for:', data.image_url, error);
                        setArtwork({ ...data, image_url: null });
                    }
                } else {
                    console.error('Failed to fetch metadata');
                }
            } catch (error) {
                console.error('Error fetching artwork:', error);
            }
        };

        fetchArtwork();
    }, [id]);

    if (!artwork) {
        return <div className='view-bg'>Loading...</div>;
    }

    return (
        <div className='view-bg'>
            <Navbar />
            <div className='view-img-box'>
                <div className='view-img-div'>
                    <img src={artwork.image_url} alt={artwork.name || 'loading'} className='view-img fadein slow' ref={imgRef} />
                    <div className='view-img-text fadein fadeout' ref={metadataRef}>{artwork.description}</div>
                    <div className='view-img-box-text fadein slow'>{artwork.name}</div>
                </div>
            </div>
            <div className='view-img-details'>
                <ul>
                    <li>By: {artwork.artist}</li>
                    <li>Description: {artwork.description}</li>
                    <li>Inspiration: {artwork.inspiration}</li>
                </ul>
                <p> For inquires on this art piece please reach out to me through this email</p>
                <img src={email} 
                    alt='email'
                    // link to email
                    onClick={()=> window.location.href ='add link to your email eg mailto:mymail@gmail.com'}
                    >
                    </img>
            </div>
        </div>
    );
}
