import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './styles.css';

export default function Loginpg() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [csrfToken, setCsrfToken] = useState('');


    useEffect(() => {
        const getCsrfToken = () => {
            const metaTag = document.querySelector('meta[name="csrf-token"]');
            return metaTag ? metaTag.getAttribute('content') : '';
        };

        setCsrfToken(getCsrfToken());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const idToken = await userCredential.user.getIdToken();
            const response = await fetch('http://127.0.0.1:8000/users/verify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, 
                },
                body: JSON.stringify({ idToken }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                navigate('/Add');
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData);
                alert('ERROR:')
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('ERROR: invalid account or password')
        }
    };

    return (
        <div className='loginpg-bg'>
            <div className='loginpg-forum-bg'>
                <form className='loginpg-forum' onSubmit={handleSubmit}>
                    <label htmlFor='username' className='loginpg-forum-label'>
                        Username
                    </label>
                    <input
                        className='loginpg-forum-input'
                        name='username'
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor='password' className='loginpg-forum-label'>
                        Password
                    </label>
                    <input
                        className='loginpg-forum-input'
                        name='password'
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit' className='loginpg-forum-button'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
