import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loginUser, loadUser } from '../../../Actions/User';
import ReCAPTCHA from "react-google-recaptcha";
import Loader from '../../../components/Loader';

const AdminLogin = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user} = useSelector((state) => state.user);

  const { error, message, loading } = useSelector((state) => state.adminApiStatus);

  // login 
  const loginInitialValue = { email:"", password:"", role:"admin"};
  const [loginValues, setLoginValues] = useState(loginInitialValue); 
  const handleLoginChange = (e) => {
    setLoginValues({...loginValues, [e.target.name] : e.target.value});
  }

  const [formErrors, setFormErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors(validate_login(loginValues));
    let {password, email, role} = loginValues;
    await dispatch(loginUser(email, password, role));
    dispatch(loadUser());
    dispatch(loadUser());
    if(!error && loginValues.role === 'admin'){
	  	history('/admin');
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


  const validate_login = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } 
    return errors;
  };

  // Google recaptcha 
  const [isGoogleValidate, setIsGoogleValidate] = useState(false);
  const onChange = (value) =>{
	setIsGoogleValidate(true);
  }
 

  return (
    <>
   {loading === true ? <Loader /> : (<div className="section-area account-wraper2">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-xl-5 col-lg-6 col-md-8">
					<div className="appointment-form form-wraper">
						<div className="logo">
							<img src={logo} alt="" />
						</div>
						<div className="tab-content">
							<div className="tab-pane fade show active" role="tabpanel" aria-labelledby="formLogin">
							{loading && <Loader /> ? (
								<div className="ui message success">Logged in successfully</div>
							) : ''}
								<form onSubmit={handleLogin}>
									<div className="form-group">
										<input type="text" className="form-control" name="email" placeholder="Email" onChange={handleLoginChange}/>
										<span className='text-danger'>{formErrors.email}</span>
									</div>
									<div className="form-group">
										<input type="password" className="form-control" name='password' placeholder="Password" onChange={handleLoginChange}/>
										<span className='text-danger'>{formErrors.password}</span>
									</div>
									{/* <div className="form-group">
									   <ReCAPTCHA
											sitekey="6LeXBkkbAAAAACYj7aMH2oWsIIkhpCGvm1LDQX9H"
											onChange={onChange}
										/>
                    disabled={!isGoogleValidate} 
									</div> */}
									<div className="form-group">
										<button type="submit" className="btn mb-30 btn-lg btn-primary w-100">login</button>
										<Link to="/admin/forget-password">Forgot Password</Link>
									</div>											
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>					
		</div>
	</div>)}
    </>
  )
}

export default AdminLogin