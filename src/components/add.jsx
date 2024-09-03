import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { storage } from '../firebase/firebase'; // Adjust the path according to your project structure
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './styles.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
// function to send your art to firebase and metadata to yout backend
export default function Add() {
    const [Name, setName] = useState('');
    const [Category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [artist, setArtist] = useState('');
    const [inspiration, setInspiration] = useState('');
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadedArtworks, setUploadedArtworks] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        checkAuth();
        fetchCsrfToken();
    }, );

    const checkAuth = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        let authtoken = '';

        if (user) {
            authtoken = await user.getIdToken(); // Get the token
            setToken(authtoken);
        } else {
            console.error('please log in');
            navigate('/');
        }
    };

    const fetchCsrfToken = () => {
        // Function to retrieve CSRF token from meta tag
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        const token = metaTag ? metaTag.getAttribute('content') : '';
        setCsrfToken(token);
    };

    const uploadImageToFirebase = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                   // Progress function to keep track of upload
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                   
                    reject(error);
                },
                () => {
                  // Complete function that sends out and alert when upload is complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        resolve(downloadURL);
                        alert('Upload successful');
                    });
                }
            );
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let uploadedImageUrl = imageUrl;

        if (image) {
            try {
                uploadedImageUrl = await uploadImageToFirebase(image);
            } catch (error) {
                console.error('Error uploading image:', error);
                return;
            }
        }

        const formData = new FormData();
        formData.append('name', Name);
        formData.append('category', Category);
        formData.append('description', description);
        formData.append('artist', artist);
        formData.append('inspiration', inspiration);
        formData.append('image_url', uploadedImageUrl);

        try {
            const response = await fetch('http://127.0.0.1:8000/artworks/upload/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add token to headers
                    'X-CSRFToken': csrfToken, // Include CSRF token
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
                setUploadedArtworks([...uploadedArtworks, data]);
            } else {
                const errorData = await response.json();
                console.error('Upload error:', errorData);
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const imageHandler = (e) => {
        if (image) {
            setImage(null);
        }
        const file = e.target.files[0];
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    };


    return (
        <div>
            <Navbar />
            <div className='addpg'>
                <div className='image'>
                    {previewUrl && <img src={previewUrl} alt="Upload your art" className='selected-image' />}
                </div>
                <form className='add-art-form' onSubmit={submitHandler}>
                    <input
                        className='add-art-input'
                        name='Image'
                        type='file'
                        onChange={imageHandler}
                        required
                    />
                    <label htmlFor='Name' className='add-art-input-label'>Enter the art's name</label>
                    <input
                        className='add-art-input'
                        name='Name'
                        type='text'
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor='category' className='add-art-input-label'>Enter the art's category</label>
                    <input
                        className='add-art-input'
                        name='category'
                        type='text'
                        value={Category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <label htmlFor='description' className='add-art-input-label'>Enter the art's description</label>
                    <textarea
                        className='add-art-input'
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor='artist' className='add-art-input-label'>Enter the artist's name</label>
                    <input
                        className='add-art-input'
                        name='artist'
                        type='text'
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                    <label htmlFor='inspiration' className='add-art-input-label'>Enter the art's inspiration</label>
                    <input
                        className='add-art-input'
                        name='inspiration'
                        type='text'
                        value={inspiration}
                        onChange={(e) => setInspiration(e.target.value)}
                        required
                    />
                    <button type='submit'>Submit</button>
                </form>
                <div>
                    <progress value={uploadProgress} max="100" />
                </div>
            </div>
        </div>
    );
}
