import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createFaq, editFaq, updateFaq } from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const NewFaq = () => {
    const history = useNavigate();
    const { faqId } = useParams();
    const dispatch = useDispatch();
    const { loading, dataDetails } = useSelector((state) => state.dataDetails);
    const initalValue = { faqQues : '', faqDescription : ''};
    const [faqValue, setFaqValue] = useState(dataDetails ? dataDetails : initalValue);
console.log(dataDetails);
    useEffect(() => {
      if(faqId){
        dispatch(editFaq(faqId));
      }else{
        setFaqValue({...initalValue})
      }
    }, [dispatch]);



    const handleOnChange = (e) =>{
        setFaqValue({...faqValue, [e.target.name] : e.target.value});
      }
     
    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);
    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(faqValue));
      if(faqId && Object.keys(formErrors).length === 0){
        await dispatch(updateFaq(faqId, faqValue));
      }else if(Object.keys(formErrors).length === 0){
        await dispatch(createFaq(faqValue));
      }
      if(!error && Object.keys(formErrors).length === 0){
        history('/admin/all-faqs')
      }
    }
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (message) {
        alert.success(message);
        dispatch({ type: "clearMessage" });
      }
    }, [formErrors, alert, error, dispatch, message]);
  
    const validate = (values) => {
      const errors = {};
      const regex = /^[A-Za-z ]+$/i;
      if (!values.faqQues) {
        errors.faqQues = "Faq question is required!";
      }
      if (!regex.test(values.faqQues)) {
        errors.faqQues = "Question is not valid!";
      }
      if (!values.faqDescription) {
        errors.faqDescription = "Faq description is required!";
      } 
      if (!regex.test(values.faqDescription)) {
        errors.faqDescription = "Faq description is not valid!";
      }
      return errors;
    };
  

  return (
    <>
      <Header title={'New Faq'} />
      <SideBar />
      { loading === true ? <Loader /> :  (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add New Faq
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="">Faq Question*</label>
                      <input
                        type="text"
                        name="faqQues"
                        value={faqValue.faqQues}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.faqQues}</span>
                    </div>
                    <div className="form-group">
                      <label for="">Faq Description</label>
                      <textarea
                        type="text"
                        rows="3"
                        name="faqDescription"
                        value={faqValue.faqDescription}
                        onChange={handleOnChange}
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{formErrors.faqDescription}</span>
                    </div>
                    <button className="btn btn-primary">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <Footer />
    </>
  );
}

export default NewFaq