import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDisease, editDisease, updateDisease } from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const NewDisease = () => {

    const history = useNavigate();
    const { diseaseId } = useParams();
    const dispatch = useDispatch();
    const { loading, dataDetails } = useSelector((state) => state.dataDetails);
    const initalValue = { diseaseName : '', diseaseDescription : ''};
    const [diseaseValue, setDiseaseValue] = useState(dataDetails ? dataDetails : initalValue);

    useEffect(() => {
      if(diseaseId){
        dispatch(editDisease(diseaseId));
      }else{
        setDiseaseValue({...initalValue})
      }
    }, [dispatch]);



    const handleOnChange = (e) =>{
        setDiseaseValue({...diseaseValue, [e.target.name] : e.target.value});
      }
     
    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);
    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(diseaseValue));
      if(diseaseId){
        await dispatch(updateDisease(diseaseId, diseaseValue));
      }else{
        await dispatch(createDisease(diseaseValue));
      }
      if(!error){
        history('/admin/all-diseases')
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
      if (!values.diseaseName) {
        errors.diseaseName = "disease name is required!";
      }
      if (!values.diseaseDescription) {
          errors.diseaseDescription = "disease description is required!";
      } 
      return errors;
    };
  

  return (
    <>
      <Header title={'Add Disease'} />
      <SideBar />
      { loading === true ? <Loader /> :  (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add New Disease
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="">Disease Name*</label>
                      <input
                        type="text"
                        name="diseaseName"
                        value={diseaseValue.diseaseName}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.diseaseName}</span>
                    </div>
                    <div className="form-group">
                      <label for="">Disease Description</label>
                      <textarea
                        type="text"
                        rows="3"
                        name="diseaseDescription"
                        value={diseaseValue.diseaseDescription}
                        onChange={handleOnChange}
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{formErrors.diseaseDescription}</span>
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
};

export default NewDisease;
