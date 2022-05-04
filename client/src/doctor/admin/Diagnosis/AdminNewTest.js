import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createTest, editTest, updateTest } from "../../../Actions/User";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const AdminNewTest = () => {

    const history = useNavigate();
    const { testId } = useParams();
    const dispatch = useDispatch();

    const { loading, editData } = useSelector((state) => state.editData);

    const initalValue = { testName : '', testDescription : ''};
    const [testValue, setTestValue] = useState(editData ? editData : initalValue);

    useEffect(() => {
      dispatch(editTest(testId));
    }, [dispatch]);

    const handleOnChange = (e) =>{
        setTestValue({...testValue, [e.target.name] : e.target.value});
      }
     
    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);
    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(testValue));
      if(testId){
        await dispatch(updateTest(testId, testValue));
      }else{
        await dispatch(createTest(testValue));
      }
      if(!error){
        history('/admin/all-tests')
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
      if (!values.testName) {
        errors.testName = "Test name is required!";
      }
      if (!values.testDescription) {
          errors.testDescription = "Test description is required!";
      } 
      return errors;
    };
  

  return (
    <>
      <Header title={'Add Test'} />
      <SideBar />
      { loading === true ? <Loader /> :  (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add New Test
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="">Test Name*</label>
                      <input
                        type="text"
                        name="testName"
                        value={testValue.testName}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.testName}</span>
                    </div>
                    <div className="form-group">
                      <label for="">Description</label>
                      <textarea
                        type="text"
                        rows="3"
                        name="testDescription"
                        value={testValue.testDescription}
                        onChange={handleOnChange}
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{formErrors.testDescription}</span>
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

export default AdminNewTest;
