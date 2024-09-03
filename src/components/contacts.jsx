
import React from 'react'
import Navbar from './navbar'
import pfp from '../images/pfp.png';
import email from '../images/email.svg';
import snapchat from '../images/snapchat.svg';
import instagram from '../images/instagram.png';

export default function Contacts(){
    
    return(
      <div className='contacts-pg'>
    <Navbar/>
    
    <div className='contactsbox'>
        <div className='contacts-pfp' >
           <img src={pfp} alt='profile-pic' >
         </img>

        </div>
        <div className='contacts-text'> 

          my name is sdjnasjkdnaskjdnkasjndkjsnfsfsf
          sffsdfsfsdfsfsdfs
          dsafasfsdfsdfsfsdfsnfjsfnkjsfnkjsfnksnfkjsnffnsajfsfs
          fsasdfsfkjslkfklfnsdklfnklsfnlksfnklsdffnfs
          sfjsfljfslkfnklsnfklsnf
        </div>
        <div className='contacts-socials'> 
          <p className='contacts-socials-title'>Socials</p>
          <div className='contacts-socials-img'>
        <img src={email} 
        alt='email'
       
        onClick={()=> window.location.href ='add link to your email eg mailto:mymail@gmail.com'}
        >
        </img>
       
        <img src={snapchat}
         alt='snapchat'
       
         onClick={()=> window.location.href ='add snapchat link here'}
         >
         </img>
        <img src={instagram}
         alt='instagram'
        
         onClick={()=> window.location.href ='add instagram link here'}
         >
         </img>
         </div>

        </div>
    </div>
    </div>
    
    )
}