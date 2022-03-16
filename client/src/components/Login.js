import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { loginUser, loadUser, registerUser } from '../Actions/User';

import { registerNewUser }  from '../utils/wssConnection/wssConnection';

const Login = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, user} = useSelector((state) => state.user);
 

  const loginInitialValue = { username:"", password:""};
  const [loginValues, setLoginValues] = useState(loginInitialValue); 
  const handleLoginChange = (e) => {
    setLoginValues({...loginValues, [e.target.name] : e.target.value});
  }

  const initialValue = { name : "", email :"", username:"", password:"" };
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
    let {name, email, password, username} = formValues;
    dispatch(registerUser(name, email, password, username));
    dispatch(loadUser());
    registerNewUser(user.name);
	let token = localStorage.getItem('token');
    if(token){
		dispatch(loadUser());
		registerNewUser(user.name);
		history('/video-chat');
	}
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setFormErrors(validate_login(loginValues));
    setIsSubmit(true);
    let {password, username} = loginValues;
    dispatch(loginUser(username, password));
	let token = localStorage.getItem('token');
    if(token){
		dispatch(loadUser());
		registerNewUser(user.name);
		history('/video-chat');
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
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 16) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const validate_login = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (!values.password) {
      errors.password = "Password is required";
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
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="formLogin" role="tabpanel" aria-labelledby="formLogin">
							{error === '' && isSubmit ? (
								<div className="ui message success">Logged in successfully</div>
							) : ''}
								<form onSubmit={handleLogin}>
									<div className="form-group">
										<input type="text" className="form-control" name="username" placeholder="Username" onChange={handleLoginChange}/>
										<span className='text-danger'>{formErrors.username}</span>
									</div>
									<div className="form-group">
										<input type="password" className="form-control" name='password' placeholder="Password" onChange={handleLoginChange}/>
										<span className='text-danger'>{formErrors.password}</span>
									</div>
									<div className="form-group">
										<button type="submit" className="btn mb-30 btn-lg btn-primary w-100">login</button>
										<a href="#formForget" data-toggle="tab">Forgot Password</a>
									</div>
									<div className="text-center mt-40">						
										<p className="mt-0">Dont have any account?</p>
										<a className="btn btn-lg btn-secondary w-100" data-toggle="tab" href="#formRegister">Register</a>
									</div>											
								</form>
							</div>
							<div className="tab-pane fade" id="formRegister" role="tabpanel" aria-labelledby="formRegister">
								<div className="tab-pane fade show active" id="register-home" role="tabpanel" aria-labelledby="register-home">
								{error === '' && isSubmit ? (
									<div className="ui message success">Signed in successfully</div>
								) : ''}
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Name" name="name" value={formValues.name} onChange={handleChange}/>
                      						<span className='text-danger'>{formErrors.name}</span>
										</div>
										<div className="form-group">
											<input type="email" className="form-control" placeholder="Email" name="email" value={formValues.email} onChange={handleChange}/>
                      						<span className='text-danger'>{formErrors.email}</span>
										</div>
										<div className="form-group">
											<input type="text" className="form-control" placeholder="Username" name="username" value={formValues.username} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.username}</span>
										</div>
										<div className="form-group">
											<input type="password" className="form-control" placeholder="Password" name="password" value={formValues.password} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.password}</span>
										</div>	
										<div className="form-group">
											<button type="submit" className="btn btn-primary w-100 radius-xl">Register Now</button>
										</div>													
										<div className="text-center mt-40">						
											<p className="mt-0">Already have an account?</p>
											<a className="btn btn-lg btn-secondary w-100" data-toggle="tab" href="#formLogin">Login</a>
										</div>	
									</form>
								</div>
							</div>
							<div className="tab-pane fade" id="formForget" role="tabpanel" aria-labelledby="formForget">
								<div className="tab-pane fade show active" id="login-home" role="tabpanel" aria-labelledby="login-home">
									<form action="#">
										<div className="form-group">
											<input type="password" className="form-control" placeholder="Password" />
										</div>
										<div className="form-group">
											<input type="password" className="form-control" placeholder="New Password" />
										</div>						
										<div className="form-group">
											<button type="button" className="btn btn-primary w-100 radius-xl">Submit</button>
										</div>													
										<div className="text-center mt-40">						
											<p className="mt-0">Already have an account?</p>
											<a className="btn btn-lg btn-secondary w-100" data-toggle="tab" href="#formLogin">Login</a>
										</div>	
									</form>
								</div>
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