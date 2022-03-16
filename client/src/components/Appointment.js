import React from 'react';
import Background from '../images/appointment/line-bg.png';

const Appointment = () => {
  return (
    <>
    <section className="section-area account-wraper1">
        <div className="container-fluid">
            <div className="appointment-inner section-sp2" style={{ backgroundImage:  "url(" + Background + ")" , backgroundRepeat: 'no-repeat', backgroundPosition: '20px, 140px'}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-5 col-lg-6 col-md-6">
                            <div className="appointment-form form-wraper">
                                <h3 className="title">Book Appointment</h3>
                                <form action="#">
                                    <div className="form-group">
                                        <select className="form-select">
                                            <option defaultValue>Selecty Department</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-select">
                                            <option defaultValue>Select Doctor</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" placeholder="Phone Numbers" />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-lg">Appointment Now</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-6 col-md-6">
                            <div className="appointment-thumb">
                                <img src={require('../images/appointment/mobile.png')} alt="" />
                                <div className="images-group">
                                    <img className="img1" src={require('../images/appointment/women.png')} alt="" />
                                    <img className="img2" src={require('../images/appointment/map-pin.png')} alt="" />
                                    <img className="img3" src={require('../images/appointment/setting.png')} alt="" />
                                    <img className="img4" src={require('../images/appointment/check.png')} alt="" />
                                    <img className="img5" src={require('../images/appointment/chat.png')} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>					
                </div>	
                <img className="pt-img1 animate1" src={require('../images/shap/trangle-orange.png')} alt="" />
                <img className="pt-img2 animate-wave" src={require('../images/shap/wave-orange.png')} alt="" />
                <img className="pt-img3 animate-wave" src={require('../images/shap/wave-blue.png')} alt="" />
                <img className="pt-img4 animate2" src={require('../images/shap/circle-orange.png')} alt="" />
            </div>					
        </div>
    </section>
    </>
  )
}

export default Appointment