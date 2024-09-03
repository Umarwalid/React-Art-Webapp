import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import './styles.css';

export default function Commission() { 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        details: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.email || !formData.details) {
            setError('Please fill out all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/mail/sendC/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json(); 

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', details: '' }); 
            } else {
                setError(responseData.error || 'Something went wrong. Please try again later.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        if (success) {
            alert('Commission request successfully submitted'); 
            setSuccess(false);
        }
    }, [success]);

    return (
        <div className='commission-container'> 
            <Navbar />
            <div className='commission-content'>
                <h1 className='commission-title'>Commission Your Artwork</h1> 
                <p className='commission-description'>
                    Interested in having a custom piece of art created just for you? 
                    Please read the rules and guidelines below before filling out the form.
                </p>
                
                <div className='commission-rules'> 
                    <h2>Rules and Guidelines</h2>
                    <ul>
                        <li>Provide detailed information about the artwork you want.</li>
                        <li>Specify any deadlines or time constraints.</li>
                        <li>Include any reference images or descriptions if available.</li>
                        <li>Be clear about your budget and payment preferences.</li>
                    </ul>
                </div>

                <div className='commission-form'>
                    <form onSubmit={handleSubmit}>
                        {error && <div className='error'>{error}</div>}
                        {success && <div className='success'>{success}</div>}
                        
                        <label htmlFor='name'>Name:</label>
                        <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />

                        <label htmlFor='email'>Email:</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder='example@example.com' 
                            required 
                            title="Please enter a valid email address."
                        />

                        <label htmlFor='details'>Commission Details:</label>
                        <textarea 
                            id='details' 
                            name='details' 
                            rows='4' 
                            value={formData.details} 
                            onChange={handleChange} 
                            required 
                        />

                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <div className='commission-footer'> 
                <p>If you have any additional questions or need further assistance, feel free to reach out to us at <a href='mailto:info@example.com'>info@example.com</a>.</p>
            </div>
        </div>
    );
}
