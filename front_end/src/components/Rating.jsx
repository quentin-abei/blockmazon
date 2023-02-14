import React from 'react'
import star_solid from "../assets/star-solid.svg"
import star_regular from "../assets/star-regular.svg"

const Rating = ({value}) => {
  return (
    <div className='rating'>
        <img src={value >=1 ? star_solid : star_regular} alt="starpic" width="20px" height="20px"/>
        <img src={value >=2 ? star_solid : star_regular} alt="starpic" width="20px" height="20px" />
        <img src={value >=3 ? star_solid : star_regular} alt="starpic" width="20px" height="20px" />
        <img src={value >=4 ? star_solid : star_regular} alt="starpic" width="20px" height="20px" />
        <img src={value >=5 ? star_solid : star_regular} alt="starpic" width="20px" height="20px" />
    </div>
  )
}

export default Rating