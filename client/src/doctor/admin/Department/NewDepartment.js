import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDepartment, editDepartment, updateDepartment } from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const NewDepartment = () => {

    const history = useNavigate();
    const { departmentId } = useParams();
    const dispatch = useDispatch();
    const { loading, dataDetails } = useSelector((state) => state.dataDetails);
    const initalValue = { departmentName : '', departmentDescription : ''};
    const [departmentValue, setDepartmentValue] = useState(dataDetails ? dataDetails : initalValue);

    useEffect(() => {
      if(departmentId){
        dispatch(editDepartment(departmentId));
      }else{
        setDepartmentValue({...initalValue})
      }
    }, [dispatch]);



    const handleOnChange = (e) =>{
        setDepartmentValue({...departmentValue, [e.target.name] : e.target.value});
      }
     
    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);
    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(departmentValue));
      if(departmentId){
        await dispatch(updateDepartment(departmentId, departmentValue,deptIcon));
      }else{
        await dispatch(createDepartment(departmentValue,deptIcon));
      }
      if(!error){
       history('/admin/all-departments')
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
      if (!values.departmentName) {
        errors.departmentName = "department name is required!";
      }
      if (!values.departmentDescription) {
          errors.departmentDescription = "department description is required!";
      } 
      return errors;
    };

    const [deptIcon, setDeptIcon] = useState(dataDetails && dataDetails.icon ? dataDetails.icon.url : '');
    const [preview, setPreview] = useState(dataDetails && dataDetails.icon ? dataDetails.icon.url : '');

    useEffect(() => {
      if (!deptIcon) {
        setPreview(undefined)
          return
      }
      setPreview(deptIcon)
  }, [deptIcon])

    const handleIconImage = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setDeptIcon(Reader.result);
        }
      };
    };
  console.log(dataDetails, deptIcon, preview);

  return (
    <>
      <Header title={'Add Department'} />
      <SideBar />
      { loading === true ? <Loader /> :  (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add New Department
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="">Department Name*</label>
                      <input
                        type="text"
                        name="departmentName"
                        value={departmentValue.departmentName}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.departmentName}</span>
                    </div>
                    <div className="form-group">
                      <label for="">Department Description</label>
                      <textarea
                        type="text"
                        rows="3"
                        name="departmentDescription"
                        value={departmentValue.departmentDescription}
                        onChange={handleOnChange}
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{formErrors.departmentDescription}</span>
                    </div>

                    <div className="form-group">
                      <label for="">Department Icon</label>
                      <input
                        type="file"
                        name="deptIcon"
                        accept="image/*"
                        onChange={handleIconImage}
                        placeholder="Icon Image"
                        className="form-control"
                      />
                       {deptIcon &&  <img src={preview} /> }
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

export default NewDepartment;
