import React from 'react';

import email from '../images/email.svg';
import linkedin from '../images/linkedin.svg';
import github from '../images/github.svg';
export default function Footer() {
  
    return (
        <nav className="footer-pg">
            <div className={`footer-text`}>
                <img src={email}
                 className='footer-img'
                 alt='email'
                  onClick={()=> window.location.href ='mailto:umarwalidmohammed@gmail.com'}
                  >
                  </img>
                <img src={github}
                 className='footer-img'
                  alt='github'
                  onClick={()=> window.location.href ='https://github.com/Umarwalid'}
                  >
                  </img>
                <img src={linkedin}
                 className='footer-img'
                  alt='linkedin'
                  onClick={()=> window.location.href ='https://github.com/Umarwalid'}
                  >

                  </img>
             <p > Made by Umar Walid Mohammed</p> 
            
             </div>
        </nav>
    );
}
