import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { setPassword } from '../Actions/User';
import Loader from './Loader';

const UpdatePassword = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {userIdForPassword } = useSelector((state) => state.userIdForPassword);

  const { error, message, loading } = useSelector((state) => state.apiStatus);

  const initialValue = {password:"", conf_password:"" };
  const [formValues, setFormValues] = useState(initialValue); 
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({...formValues, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    let {password, conf_password} = formValues;
    await dispatch(setPassword(userIdForPassword,password));
    if(!error && userIdForPassword && password && password === conf_password) {
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
  }, [alert, error, dispatch, message]);


  const validate = (values) => {
    const errors = {};
	const passwordRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
   {loading === true ? <Loader /> : (<div className="section-area account-wraper2">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-xl-5 col-lg-6 col-md-8">
					<div className="appointment-form form-wraper">
						<div className="logo">
							<img src={logo} alt="" />
						  </div>
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<input type="password" className="form-control" placeholder="Password" name="password" value={formValues.password} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.password}</span>
										</div>
										<div className="form-group">
											<input type="password" className="form-control" placeholder="Confirm Password" name="conf_password" value={formValues.conf_password} onChange={handleChange} />
                      						<span className='text-danger'>{formErrors.conf_password}</span>
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

export default UpdatePassword