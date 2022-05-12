import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../../Actions/User';
import Loader from '../../../components/Loader';
import { useAlert } from 'react-alert';

const AdminForgetpassword = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const { error, message, loading } = useSelector((state) => state.apiStatus);

  const alert = useAlert();
  // forget password
  const forgetInitialValue = { forget_email:""};
  const [forgetValues, setForgetValues] = useState(forgetInitialValue); 
  const handleForgetChange = (e) => {
    setForgetValues({...forgetValues, [e.target.name] : e.target.value});
  }
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setFormErrors(validate_forget(forgetValues));
    let { forget_email } = forgetValues;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    await dispatch(forgetPassword(forget_email));
    if(!error && forget_email){
      window.location.href="/admin/reset-password";
    }
    return false;
  };

  const validate_forget = (values) => {
    const errors = {};
    if (!values.forget_email) {
      errors.forget_email = "Email is required!";
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
  }, [alert, error, dispatch, message]);

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
						
									<form onSubmit={handleForgetPassword}>
										<div className="form-group">
											<input type="text" className="form-control" name="forget_email" placeholder="Email" value={forgetValues.forget_email} onChange={handleForgetChange} />
											<span className='text-danger'>{formErrors.forget_email}</span>
										</div>					
										<div className="form-group">
											<button type="submit" className="btn btn-primary w-100 radius-xl">Send OTP</button>
										</div>													
										<div className="text-center mt-40">						
											<p className="mt-0">Already have an account?</p>
											<Link to="/admin/login" className="btn btn-lg btn-secondary w-100" >Login</Link>
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

export default AdminForgetpassword