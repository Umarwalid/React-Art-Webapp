
import React from 'react'


import { useNavigate } from 'react-router-dom';
export default function Display(props){
    const navigate = useNavigate();
    const imgArray = props.imgs
    const title = props.title
    const more = props.more

    if (more){

    }

    if (imgArray.length === 0) {
        return <p></p>;
    }
    const pics = imgArray.map((i, index) => (
        <div key={index} className='display-img-div'>
            <img
                className='display-img'
                src={i.image_url}
                alt={i.name || 'loading'}
                onClick={() => navigate(`/view/${i.id}`)}
            />
        </div>
    ));
    if (imgArray.length === 0) {
        return <p></p>;
    }
    return(
      
    <div className='display-bg'>

        <div className='display-title'>{title}</div>
        <div className='display-box'>

       {pics}
      {more &&(
        <p
        className='display-see-more'  
        onClick={() => navigate(`/catalogs/${title}`)}
        >
         See more
         </p>
        )}
        </div>

     
    </div>
    )
}