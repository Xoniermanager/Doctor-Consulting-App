import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDrug, editDrug, updateDrug } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";

const NewDrug = () => {

    const history = useNavigate();
    const { drugId } = useParams();
    const dispatch = useDispatch();

    const { loading, editData } = useSelector((state) => state.editData);
    useEffect(() => {
      dispatch(editDrug(drugId));
    }, [dispatch]);

    const initalValue = { drugName : '', drugGeneric : '', drugNote : ''};
    const [drugValue, setDrugValue] = useState(editData ? editData : initalValue);

    const handleOnChange = (e) =>{
        setDrugValue({...drugValue, [e.target.name] : e.target.value});
      }

    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);

  

    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(drugValue));
      if(drugId){
        await dispatch(updateDrug(drugId, drugValue));
      }else{
        await dispatch(createDrug(drugValue));
      }
      if(!error){
        history('/all-drugs')
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
      if (!values.drugName) {
        errors.drugName = "Drug name is required!";
      }
      if (!values.drugGeneric) {
          errors.drugGeneric = "Drug generic is required!";
      } 
      if (!values.drugNote) {
          errors.drugNote = "Drug note is required!";
      } 
      return errors;
    };




  return (
    <>
      <Header title={'Create Drug'}/>
      <DoctSideBar />
      { loading === true ? <Loader /> : (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add Drug
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Drug Name *</label>
                      <input
                        type="text"
                        name="drugName"
                        value={drugValue.drugName}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.drugName}</span>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Drug Generic *</label>
                      <input
                        type="text"
                        name="drugGeneric"
                        value={drugValue.drugGeneric}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.drugGeneric}</span>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Note</label>
                      <input
                        type="text"
                        name="drugNote"
                        value={drugValue.drugNote}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.drugNote}</span>
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

export default NewDrug;
