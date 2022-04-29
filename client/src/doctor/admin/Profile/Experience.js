import React from 'react'

const Experience = ({items}) => {
  return (
    <>
         <li>
            <div className="timeline-panel bgl-dark flex-wrap border-0 p-3 rounded">
                <div className="media-body">
                    <h5 className="mb-1 fs-18">{items.experience}</h5>
                </div>
                <ul className="d-flex flex-wrap text-primary font-w600">
                    <li className="mr-2">{items.expYear}</li> 
                </ul>
            </div>
        </li>
     
    </>
  )
}

export default Experience