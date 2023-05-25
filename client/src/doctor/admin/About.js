import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editAbout, updateAbout,createAbout } from "../../Actions/Admin";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Loader from "./Layout/Loader";
import SideBar from "./Layout/SideBar";

const About = () => {
  const history = useNavigate();
  const aboutId = '62bd9a4f87c98d53866794a6';
  const dispatch = useDispatch();
  const { loading, aboutDetails } = useSelector((state) => state.aboutDetails);
  const initalValue = { Title: "", Description: "" };
  const [aboutValue, setAboutValue] = useState(
    aboutDetails ? aboutDetails : initalValue
  );

  useEffect(() => {
    if (aboutId) {
        dispatch(editAbout(aboutId));
      } else {
        setAboutValue({ ...initalValue });
      }
    
  }, [dispatch]);

  //console.log('service',editservicess);
  //console.log('serviceId',aboutId);
  console.log("about", aboutDetails);

  const handleOnChange = (e) => {
    setAboutValue({ ...aboutValue, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const handleToSubmit = async (e) => {
    e.preventDefault();
    //console.log('approachValue',approachValue);
    setFormErrors(validate(aboutValue));
    if (aboutId && Object.keys(formErrors).length === 0) {
        await dispatch(updateAbout(aboutId, aboutValue, aboutImage));
    } else if (Object.keys(formErrors).length === 0) {
        await dispatch(createAbout(aboutValue, aboutImage));
    }
    if (!error && Object.keys(formErrors).length === 0) {
        history("/admin/about");
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

  const [aboutImage, setAboutImage] = useState(
    aboutDetails && aboutDetails.icon ? aboutDetails.image.url : ""
  );
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!aboutImage) {
      setPreview(undefined);
      return;
    }
    setPreview(aboutImage);
  }, [aboutImage]);

  const handleIconImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAboutImage(Reader.result);
      }
    };
  };

  return (
    <>
      <Header title={"About Us"} />
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
                      About Us
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleToSubmit}>
                      <div className="form-group">
                        <label for="">Title*</label>
                        <input
                          type="text"
                          name="Title"
                          value={aboutValue && aboutValue.Title}
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
                            aboutValue && aboutValue.Description
                          }
                          onChange={handleOnChange}
                          className="form-control"
                        ></textarea>
                        <span className="text-danger">
                          {formErrors && formErrors.Description}
                        </span>
                      </div>

                      <div className="form-group">
                        <label for="">About Image</label>
                        <input
                          type="file"
                          name="aboutImage"
                          accept="image/*"
                          onChange={handleIconImage}
                          placeholder="Icon Image"
                          className="form-control"
                        />
                        {aboutImage && <img src={preview} />}
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

export default About;
