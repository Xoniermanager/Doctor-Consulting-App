import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loginUser, registerUser, forgetPassword } from '../Actions/User';
import ReCAPTCHA from "react-google-recaptcha";
import Loader from './Loader';

import { registerNewUser }  from '../utils/wssConnection/wssConnection';

const Login = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, message, user} = useSelector((state) => state.user);

  // login 
  const loginInitialValue = { email:"", password:""};
  const [loginValues, setLoginValues] = useState(loginInitialValue); 
  const handleLoginChange = (e) => {
    setLoginValues({...loginValues, [e.target.name] : e.target.value});
  }
 // register
  const initialValue = { name : "", email :"", password:"", conf_password:"" };
  const [formValues, setFormValues] = useState(initialValue); 
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    let {name, email, password} = formValues;
    await dispatch(registerUser(name, email, password));
   	history('/login');
  };
 

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors(validate_login(loginValues));
    setIsSubmit(true);
    let {password, email} = loginValues;
    await dispatch(loginUser(email, password));

    if(user.role === 'patient'){
		registerNewUser(user.name);
		history('/join-meeting');
	}else if(user.role === 'doctor'){
    history('/doctor');
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }  
	if(!passwordRegex.test(values.password)){
		errors.password = "Password should be strong and min 6 characters";
	}if(values.password !== values.conf_password){
		errors.conf_password = "Password and confirm password should be matched.";
	}
    return errors;
  };

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
    console.log("Captcha value:", value);
	setIsGoogleValidate(true);
  }
 

  // forget password
  const forgetInitialValue = { forget_email:""};
  const [forgetValues, setForgetValues] = useState(forgetInitialValue); 
  const handleForgetChange = (e) => {
    setForgetValues({...forgetValues, [e.target.name] : e.target.value});
  }
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setFormErrors(validate_forget(forgetValues));
    setIsSubmit(true);
    let { forget_email } = forgetValues;
    await dispatch(forgetPassword(forget_email));
  };

  const validate_forget = (values) => {
	  console.log(values);
    const errors = {};
    if (!values.forget_email) {
      errors.forget_email = "Email is required!";
    }
    return errors;
  };

  return (
    <>
   <div className="section-area account-wraper2">
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
									<div className="form-group">
									   <ReCAPTCHA
											sitekey="6LeXBkkbAAAAACYj7aMH2oWsIIkhpCGvm1LDQX9H"
											onChange={onChange}
										/>
									</div>
									<div className="form-group">
										<button type="submit" disabled={!isGoogleValidate} className="btn mb-30 btn-lg btn-primary w-100">login</button>
										<Link to="/forget-password">Forgot Password</Link>
									</div>
									<div className="text-center mt-40">						
										<p className="mt-0">Dont have any account?</p>
										<Link className="btn btn-lg btn-secondary w-100"  to="/signup">Register</Link>
									</div>											
								</form>
							</div>
						
						
						</div>
					</div>
				</div>
			</div>					
		</div>
	</div>
    </>
  )
}

export default Login