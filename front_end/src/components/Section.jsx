import { ethers } from 'ethers';
import React from 'react'
import Rating from './Rating';
import "./Section.css"

const Section = ({title, items, togglePop}) => {
  return (
    <div className='cards_section'>
        <h3 className="card_title" id={title}>{title}</h3>
        <hr />
        <div className='cards'>
          {items.map((item) => {
            const  {id, name, image, rating, cost} = item;
            return(
            <div className='card' key={id} onClick={()=>togglePop(item)} >
                <div className="card_image">
                  <img  src={image} alt='itempic' />
                </div>
                <div className="card_info">
                  <h4>{name}</h4>
                  <Rating value={rating} />
                  <p>{ethers.utils.formatUnits(cost.toString(), "ether")} ETH</p>
                </div>
            </div>
            )
          })}
        </div>
    </div>
  )
}

export default Section
