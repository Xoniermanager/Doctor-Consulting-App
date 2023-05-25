import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createClient,
  editClient,
  updateClient,
} from "../../../Actions/Admin";
import Footer from "../Layout/Footer"; 
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const AddClient = () => {
  const history = useNavigate();
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const { loading, dataDetails } = useSelector((state) => state.dataDetails);
  const initalValue = { clientTitle: ""};
  const [clientValue, setClientValue] = useState(
    dataDetails ? dataDetails : initalValue
  );

  useEffect(() => {
    if (clientId) {
      dispatch(editClient(clientId));
    } else {
      setClientValue({ ...initalValue });
    }
  }, [dispatch]);

  //console.log('service',editservicess);
  //console.log('serviceId',serviceId);
 // console.log("clientValue", dataDetails);

  const handleOnChange = (e) => {
    setClientValue({ ...clientValue, [e.target.name]: e.target.value });
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);
  const [formErrors, setFormErrors] = useState({});
  const handleToSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(clientValue));
    if (clientId && Object.keys(formErrors).length === 0) {
      await dispatch(updateClient(clientId, clientValue, clientImage));
    } else if (Object.keys(formErrors).length === 0) {
      await dispatch(createClient(clientValue, clientImage));
    }
    if (!error && Object.keys(formErrors).length === 0) {
      history("/admin/all-client");
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

    if (!values.clientTitle) {
      errors.clientTitle = "Client title is required!";
    }
    return errors;
  };

  const [clientImage, setClientImage] = useState(
    dataDetails && dataDetails.icon ? dataDetails.image.url : ""
  );
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!clientImage) {
      setPreview(undefined);
      return;
    }
    setPreview(clientImage);
  }, [clientImage]);

  const handleIconImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setClientImage(Reader.result);
      }
    };
  };

  return (
    <>
      <Header title={"Add Client"} />
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
                      Add Client
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleToSubmit}>
                      <div className="form-group">
                        <label for="">Client Name*</label>
                        <input
                          type="text"
                          name="clientTitle"
                          value={clientValue && clientValue.clientTitle}
                          onChange={handleOnChange}
                          className="form-control"
                        />
                        <span className="text-danger">
                          {formErrors && formErrors.clientTitle}
                        </span>
                      </div>
                      <div className="form-group">
                        <label for="">Client Image</label>
                        <input
                          type="file"
                          name="clientImage"
                          accept="image/*"
                          onChange={handleIconImage}
                          placeholder="Icon Image"
                          className="form-control"
                        />
                        {clientImage && <img src={preview} />}
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

export default AddClient;
