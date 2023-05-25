import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from "moment";
import DoctSideBar from "../Layout/DoctSideBar";
import Loader from "../Layout/Loader";
import { updateCredentail } from "../../../Actions/User";

const PaymentCredential = () => {
  let history = useNavigate();
  const dispatch = useDispatch(); 
  const alert = useAlert();

  const {loading, error, message } = useSelector((state) => state.apiStatus);

  const {user} = useSelector((state) => state.user);

  console.log(user);


  const initialValue = { mid: "", mkey: "" };
  
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};
    
    if (!values.mid) {
      errors.mid = "Merchant ID is required";
    }
    if (!values.mkey) {
      errors.mkey = "Merchant Key is required";
    }
    return errors;
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

  const submitData = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    //console.log(formValues);
    
    //console.log(merchantId);
    await dispatch(updateCredentail(formValues.mid, formValues.mkey));
    
  };

  

  

  return (
    <>
      <Header title={"Payment Gateway Credential"} />
      <DoctSideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h4 className="text-primary">
                      Paytm Payment Gateway Credential
                    </h4>
                  </div>
                  <div
                    className="card-body"
                    data-select2-id="select2-data-6-tqdb"
                  >
                    <form onSubmit={submitData}>
                      <div
                        className="row"
                        data-select2-id="select2-data-5-akdn"
                      >
                        
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="rdvdate">Merchant ID</label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleOnChange}
                              name="mid"
                              value={user.marchantId}
                            />
                            <span className="text-danger">
                              {formErrors.mid}
                            </span>
                            
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="rdvdate">Merchant Key</label>
                            <input
                              type="text"
                              onChange={handleOnChange}
                              name="mkey"
                              value={user.marchantKey}
                              className="form-control"
                            />

                            <span className="text-danger">
                              {formErrors.mkey}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <button className="btn btn-primary mt-3">
                            Update Credential
                          </button>
                        </div>
                      </div>
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
export default PaymentCredential;
