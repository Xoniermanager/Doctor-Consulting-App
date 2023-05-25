import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editOurApproach, updateOurApproach,createOurApproach } from "../../Actions/Admin";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Loader from "./Layout/Loader";
import SideBar from "./Layout/SideBar";

const OurApproach = () => {
  const history = useNavigate();
  const approachId = '62bd90fdf79e4015611e6eae';
  const dispatch = useDispatch();
  const { loading, dataDetails } = useSelector((state) => state.dataDetails);

  
  const initalValue = { Title: "", Description: "" };
  const [approachValue, setApproachValue] = useState(
    dataDetails ? dataDetails : initalValue
  );

  useEffect(() => {
    if (approachId) {
        dispatch(editOurApproach(approachId));
      } else {
        setApproachValue({ ...initalValue });
      }
    
  }, [dispatch]);

  console.log('approach',dataDetails);
  //console.log('serviceId',approachId);
  

  const handleOnChange = (e) => {
    setApproachValue({ ...approachValue, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(approachValue));
    if (approachId && Object.keys(formErrors).length === 0) {
        await dispatch(updateOurApproach(approachId, approachValue, approachImage));
    } else if (Object.keys(formErrors).length === 0) {
        await dispatch(createOurApproach(approachValue, approachImage));
    }
    if (!error && Object.keys(formErrors).length === 0) {
        history("/admin/our-approach");
    }
  };

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

    if (!values.Title) {
      errors.Title = "Title is required!";
    }
    if (!values.Description) {
      errors.Description = "Description is required!";
    }
    return errors;
  };

  const [approachImage, setApproachImage] = useState(
    dataDetails && dataDetails.icon ? dataDetails.image.url : ""
  );
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!approachImage) {
      setPreview(undefined);
      return;
    }
    setPreview(approachImage);
  }, [approachImage]);

  const handleIconImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setApproachImage(Reader.result);
      }
    };
  };

  return (
    <>
      <Header title={"Our Approach"} />
      <SideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            {/* <!-- row --> */}
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Our Approach
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleToSubmit}>
                      <div className="form-group">
                        <label for="">Title*</label>
                        <input
                          type="text"
                          name="Title"
                          value={approachValue && approachValue.Title}
                          onChange={handleOnChange}
                          className="form-control"
                        />
                        <span className="text-danger">
                          {formErrors && formErrors.Title}
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="">Description</label>
                        <textarea
                          type="text" 
                          rows="5"
                          name="Description"
                          value={
                            approachValue && approachValue.Description
                          }
                          onChange={handleOnChange}
                          className="form-control"
                        ></textarea>
                        <span className="text-danger">
                          {formErrors && formErrors.Description}
                        </span>
                      </div>

                      <div className="form-group">
                        <label for=""> Image</label>
                        <input
                          type="file"
                          name="approachImage"
                          accept="image/*"
                          onChange={handleIconImage}
                          placeholder="Icon Image"
                          className="form-control"
                        />
                        {approachImage && <img src={preview} />}
                      </div>

                      <button className="btn btn-primary">Save</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default OurApproach;
