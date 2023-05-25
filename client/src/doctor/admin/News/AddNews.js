import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNews, editNews, updateNews } from "../../../Actions/Admin";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Loader from "../Layout/Loader";
import SideBar from "../Layout/SideBar";

const AddNews = () => {

    const history = useNavigate();
    const { newsId } = useParams();
    const dispatch = useDispatch();
    const { loading, dataDetails } = useSelector((state) => state.dataDetails);
    const initalValue = { newsTitle : '', newsDescription : ''};
    const [newsValue, setNewsValue] = useState(dataDetails ? dataDetails : initalValue);

    useEffect(() => {
      if(newsId){
        dispatch(editNews(newsId));
      }else{
        setNewsValue({...initalValue})
      }
    }, [dispatch]);

    //console.log('newsValue',newsValue);

    const handleOnChange = (e) =>{
      setNewsValue({...newsValue, [e.target.name] : e.target.value});
      }
     
    const alert = useAlert();
    const { error, message } = useSelector((state) => state.apiStatus);
    const [formErrors, setFormErrors] = useState({});
    const handleToSubmit = async(e) =>{
      e.preventDefault();
      setFormErrors(validate(newsValue));
      if(newsId && Object.keys(formErrors).length === 0){
        await dispatch(updateNews(newsId, newsValue,newsImage));
      }else if(Object.keys(formErrors).length === 0){
        await dispatch(createNews(newsValue,newsImage));
      }
      if(!error && Object.keys(formErrors).length === 0){
       history('/admin/all-newses')
      }
    }
  
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

      if (!values.newsTitle) {
        errors.newsTitle = "News title is required!";
      }
      if (!regex.test(values.newsTitle)) {
        errors.newsTitle = "News title is invalid!";
      }
      if (!values.newsDescription) {
          errors.newsDescription = "News description is required!";
      } 
      if (!regex.test(values.newsDescription)) {
        errors.newsDescription = "News description is invalid!";
      }
      return errors;
    };

    const [newsImage, setNewsImage] = useState(dataDetails && dataDetails.icon ? dataDetails.image.url : '');
    const [preview, setPreview] = useState();

    useEffect(() => {
      if (!newsImage) {
        setPreview(undefined)
          return
      }
      setPreview(newsImage)
  }, [newsImage])

    const handleIconImage = (e) => {
      const file = e.target.files[0];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setNewsImage(Reader.result);
        }
      };
    };

  return (
    <>
      <Header title={'Add News'} />
      <SideBar />
      { loading === true ? <Loader /> :  (<div className="content-body">
        <div className="container-fluid">
          {/* <!-- row --> */}
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Add News
                  </h6>
                </div>
                <div className="card-body">
                  <form onSubmit={handleToSubmit}>
                    <div className="form-group">
                      <label for="">News Name*</label>
                      <input
                        type="text"
                        name="newsTitle"
                        value={newsValue.newsTitle}
                        onChange={handleOnChange}
                        className="form-control"
                      />
                      <span className="text-danger">{formErrors.newsTitle}</span>
                    </div>
                    <div className="form-group">
                      <label for="">News Description</label>
                      <textarea
                        type="text"
                        rows="3"
                        name="newsDescription"
                        value={newsValue.newsDescription}
                        onChange={handleOnChange}
                        className="form-control"
                      ></textarea>
                      <span className="text-danger">{formErrors.newsDescription}</span>
                    </div>

                    <div className="form-group">
                      <label for="">News Image</label>
                      <input
                        type="file"
                        name="newsImage"
                        accept="image/*"
                        onChange={handleIconImage}
                        placeholder="Icon Image"
                        className="form-control"
                      />
                       {newsImage &&  <img src={preview} /> }
                    </div>

                    <button className="btn btn-primary">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      <Footer />
    </>
  );
};

export default AddNews;
