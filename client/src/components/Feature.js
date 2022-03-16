import React from 'react'

const Feature = ({featureData}) => {
  return (
    <>
    <div className="col-lg-4 col-sm-6 mb-30">
        <div className={`work-bx ${featureData.featureClass}`}>
            <div className="work-num-bx">{featureData.featureNo}</div>
            <div className="work-content">
                <h5 className="title text-secondary mb-10">{featureData.featureTitle}</h5>
                <p>{featureData.featureDesc}</p>
            </div>
            <a href="booking.html" className="btn btn-primary light">View More <i className="btn-icon-bx fas fa-chevron-right"></i></a>
        </div>
    </div>
    </>
  )
}

export default Feature