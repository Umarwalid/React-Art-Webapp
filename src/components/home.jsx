

import Navbar from './navbar'
import Display from './display'
import Slides from './slides'
import React, { useState, useEffect } from 'react';
import FetchArt from './fetchart'
export default function Home(){
  const [latestArt,setLatestArt] = useState([])
  const [RandomArt1,setRandomArt1] = useState([])
    useEffect(() => {
      FetchArt('http://127.0.0.1:8000/artworks/latest/', setLatestArt);
      FetchArt('http://127.0.0.1:8000/artworks/listRC/', setRandomArt1);
      
  }, []);

    return(
       
      <div className='home-pg'>
      <Navbar/>
        <Slides/>
        <div className='home-display-box'>
         <Display imgs={latestArt} title={'Latest'}/>
         <Display imgs={RandomArt1} title={RandomArt1[0] ? RandomArt1[0].category : 'Random Category 1'} more='true' />
      </div>
        </div>
    
    )
}