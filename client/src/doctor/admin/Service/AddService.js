import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createService,
  editService,
  updateService,
} from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const AddService = () => {
  const history = useNavigate();
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const { loading, dataDetails } = useSelector((state) => state.dataDetails);
  const initalValue = { serviceTitle: "", serviceDescription: "" };
  const [serviceValue, setServiceValue] = useState(
    dataDetails ? dataDetails : initalValue
  );

  useEffect(() => {
    if (serviceId) {
      dispatch(editService(serviceId));
    } else {
      setServiceValue({ ...initalValue });
    }
  }, [dispatch]);

  //console.log('service',editservicess);
  //console.log('serviceId',serviceId);
  console.log("serviceValue", dataDetails);

  const handleOnChange = (e) => {
    setServiceValue({ ...serviceValue, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(serviceValue));
    if (serviceId && Object.keys(formErrors).length === 0) {
      await dispatch(updateService(serviceId, serviceValue, serviceImage));
    } else if (Object.keys(formErrors).length === 0) {
      await dispatch(createService(serviceValue, serviceImage));
    }
    if (!error && Object.keys(formErrors).length === 0) {
      history("/admin/all-service");
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

    if (!values.serviceTitle) {
      errors.serviceTitle = "Service title is required!";
    }
    if (!regex.test(values.serviceTitle)) {
      errors.serviceTitle = "Service title is invalid!";
    }
    if (!values.serviceDescription) {
      errors.serviceDescription = "Service description is required!";
    }
    //   if (!regex.test(values.serviceDescription)) {
    //     errors.serviceDescription = "Service description is invalid!";
    //   }
    return errors;
  };

  const [serviceImage, setServiceImage] = useState(
    dataDetails && dataDetails.icon ? dataDetails.image.url : ""
  );
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!serviceImage) {
      setPreview(undefined);
      return;
    }
    setPreview(serviceImage);
  }, [serviceImage]);

  const handleIconImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setServiceImage(Reader.result);
      }
    };
  };

  return (
    <>
      <Header title={"Add Services"} />
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
                      Add Services
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleToSubmit}>
                      <div className="form-group">
                        <label for="">Service Name*</label>
                        <input
                          type="text"
                          name="serviceTitle"
                          value={serviceValue && serviceValue.serviceTitle}
                          onChange={handleOnChange}
                          className="form-control"
                        />
                        <span className="text-danger">
                          {formErrors && formErrors.serviceTitle}
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="">Service Description</label>
                        <textarea
                          type="text"
                          rows="5"
                          name="serviceDescription"
                          value={
                            serviceValue && serviceValue.serviceDescription
                          }
                          onChange={handleOnChange}
                          className="form-control"
                        ></textarea>
                        <span className="text-danger">
                          {formErrors && formErrors.serviceDescription}
                        </span>
                      </div>

                      <div className="form-group">
                        <label for="">Service Image</label>
                        <input
                          type="file"
                          name="serviceImage"
                          accept="image/*"
                          onChange={handleIconImage}
                          placeholder="Icon Image"
                          className="form-control"
                        />
                        {serviceImage && <img src={preview} />}
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

export default AddService;
