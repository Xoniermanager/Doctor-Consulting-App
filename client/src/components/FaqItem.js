import React from 'react'

const FaqItem = (data) => {
  return (
     <>
       <div className="accordion-item">
        <h2 className="accordion-header" id={`heading${data._id}`}>
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data._id}`} aria-expanded="true" aria-controls={`collapse${data._id}`}>{data.faqQues}</button>
        </h2>
        <div id={`collapse${data._id}`} className="accordion-collapse collapse show" aria-labelledby={`heading${data._id}`} data-bs-parent="#accordionRow1">
            <div className="accordion-body">
                <p className="mb-0">{data.faqDescription}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default FaqItem