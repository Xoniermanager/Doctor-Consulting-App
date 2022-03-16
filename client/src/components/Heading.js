import React from 'react'

const Heading = ({headData}) => {
  return (
    <>
        <div className="heading-bx text-center">
            <h6 className="title-ext text-secondary">{headData.heading}</h6>
            <h2 className="title">{headData.description}</h2>
            { headData.longDescription ? (<p>{headData.longDescription}</p>) : '' } 
        </div>
    </>
  )
}

export default Heading