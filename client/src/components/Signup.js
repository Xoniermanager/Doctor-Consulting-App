import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {registerUser } from '../Actions/User';

const Signup = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message} = useSelector((state) => state.user);
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
    if(error) {
	  history('/login');
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
											<input type="password" className="form-control" placeholder="Password" name="password" value={formValues.password} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.password}</span>
										</div>
										<div className="form-group">
											<input type="password" className="form-control" placeholder="Confirm Password" name="conf_password" value={formValues.conf_password} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.conf_password}</span>
										</div>	
										<div className="form-group">
											<button type="submit" className="btn btn-primary w-100 radius-xl">Register Now</button>
										</div>													
										<div className="text-center mt-40">						
											<p className="mt-0">Already have an account?</p>
											<Link className="btn btn-lg btn-secondary w-100" to="/login">Login</Link>
										</div>	
									</form>
							
					</div>
				</div>
			</div>					
		</div>
	</div>
    </>
  )
}

export default Signup