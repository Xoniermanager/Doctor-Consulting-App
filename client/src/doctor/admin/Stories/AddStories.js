import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStories,
  editStories,
  updateStories,
} from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const AddStories = () => {
  const history = useNavigate();
  const { storiesId } = useParams();
  const dispatch = useDispatch();
  const { loading, dataDetails } = useSelector((state) => state.dataDetails);
  const initalValue = { storiesTitle: "", storiesDescription: "",storiesAuthor:"" };
  const [storiesValue, setStoriesValue] = useState(
    dataDetails ? dataDetails : initalValue
  );

  useEffect(() => {
    if (storiesId) { 
      dispatch(editStories(storiesId));
    } else {
      setStoriesValue({ ...initalValue });
    }
  }, [dispatch]);

  //console.log('service',editservicess);
  //console.log('storiesId',storiesId);
  console.log("storiesValue", dataDetails);

  const handleOnChange = (e) => {
    setStoriesValue({ ...storiesValue, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(storiesValue));
    if (storiesId && Object.keys(formErrors).length === 0) {
      await dispatch(updateStories(storiesId, storiesValue, storiesImage));
    } else if (Object.keys(formErrors).length === 0) {
      await dispatch(createStories(storiesValue, storiesImage));
    }
    if (!error && Object.keys(formErrors).length === 0) {
      history("/admin/all-stories");
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

    if (!values.storiesTitle) {
      errors.storiesTitle = "Stories title is required!";
    }
    if (!regex.test(values.storiesAuthor)) {
        errors.storiesAuthor = "Stories author is required!";
    }
    if (!values.storiesDescription) {
      errors.storiesDescription = "Stories description is required!";
    }
    //   if (!regex.test(values.serviceDescription)) {
    //     errors.serviceDescription = "Service description is invalid!";
    //   }
    return errors; 
  };

  const [storiesImage, setStoriesImage] = useState(
    dataDetails && dataDetails.icon ? dataDetails.image.url : ""
  );
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!storiesImage) {
      setPreview(undefined);
      return;
    }
    setPreview(storiesImage);
  }, [storiesImage]);

  const handleIconImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setStoriesImage(Reader.result);
      }
    };
  };

  return (
    <>
      <Header title={"Add Stories"} />
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
                      Add Stories
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleToSubmit}>
                      <div className="form-group">
                        <label for="">Stories Title*</label>
                        <input
                          type="text"
                          name="storiesTitle"
                          value={storiesValue && storiesValue.storiesTitle}
                          onChange={handleOnChange}
                          className="form-control"
                        />
                        <span className="text-danger">
                          {formErrors && formErrors.storiesTitle}
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="">Stories Author*</label>
                        <input
                          type="text"
                          name="storiesAuthor"
                          value={storiesValue && storiesValue.storiesAuthor}
                          onChange={handleOnChange}
                          className="form-control"
                        />
                        <span className="text-danger">
                          {formErrors && formErrors.storiesAuthor}
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="">Stories Description</label>
                        <textarea
                          type="text"
                          rows="5"
                          name="storiesDescription"
                          value={
                            storiesValue && storiesValue.storiesDescription
                          }
                          onChange={handleOnChange}
                          className="form-control"
                        ></textarea>
                        <span className="text-danger">
                          {formErrors && formErrors.storiesDescription}
                        </span>
                      </div>

                      <div className="form-group">
                        <label for="">Stories Image</label>
                        <input
                          type="file"
                          name="storiesImage"
                          accept="image/*"
                          onChange={handleIconImage}
                          placeholder="Icon Image"
                          className="form-control"
                        />
                        {storiesImage && <img src={preview} />}
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

export default AddStories;
