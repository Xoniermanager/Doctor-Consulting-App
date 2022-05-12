import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { resetPassword } from '../../../Actions/User';
import Loader from '../../../components/Loader';

const AdminResetPassword = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector((state) => state.apiStatus);

  const initialValue = { otp: ""};
  const [formValues, setFormValues] = useState(initialValue); 
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    let { otp} = formValues;
    await dispatch(resetPassword(otp));
    if(!error && otp) {
	    history('/admin/set-password');
    }
    return false;
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
    if (!values.otp) {
      errors.otp = "OPT is required!";
    }
    return errors;
  };

  
  
  return (
    <>
   { loading === true ? <Loader /> : (<div className="section-area account-wraper2">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-xl-5 col-lg-6 col-md-8">
					<div className="appointment-form form-wraper">
						<div className="logo">
							<img src={logo} alt="" />
						  </div>
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<input type="number" className="form-control" placeholder="OTP" name="otp" value={formValues.otp} onChange={handleChange}/>
                      <span className='text-danger'>{formErrors.otp}</span>
										</div>
										<div className="form-group">
											<button type="submit" className="btn btn-primary w-100 radius-xl">Submit</button>
										</div>		
									</form>
							
					</div>
				</div>
			</div>					
		</div>
	</div>)}
    </>
  )
}

export default AdminResetPassword