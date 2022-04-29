import React from 'react'

const FaqItem = () => {
  return (
     <>
       <div className="accordion-item">
        <h2 className="accordion-header" id="heading1">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">How Doctor Can Ease Your Pain?</button>
        </h2>
        <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#accordionRow1">
            <div className="accordion-body">
                <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default FaqItem