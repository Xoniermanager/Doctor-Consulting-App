import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createDoctorAppointment,doctorDetailById } from "../Actions/User";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Loader from "./Loader";
import Moment from "moment";
const Payment = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [patientDetail, setPatientDetail] = useState({ patientId: user && user._id, patientName: user && user.name, patientEmail: user && user.email,phone:user && user.phone });

  const doctorId = "626cd04a857ce8a353529632";

  useEffect(async () => {
    await dispatch(doctorDetailById(doctorId));
  }, []);

  const { doctorDetails } = useSelector((state) => state.doctorDetails);

  const formData = JSON.parse(localStorage.getItem("formData"));

  console.log("formData", formData);
  console.log("patientDetail", patientDetail);
  console.log("doctorDetails", doctorDetails);

  const payment = async (e) => {
    await dispatch(createDoctorAppointment(formData, patientDetail));
    getData({
      amount: doctorDetails.fee,
      email: patientDetail.patientEmail,
      name: patientDetail.patientName,
      phone: patientDetail.phone,
      orderId: formData.slotId,
      doctorId: formData.doctorId,
      patientId: patientDetail.patientId,
    }).then((response) => {
      var information = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: response,
      };
      //console.log(information);
      post(information);
    });
  };
  const getData = (data) => {
    return fetch(`https://xoniertest.herokuapp.com/api/v1/payments/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }
  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }
  function buildForm({ action, params }) {
    //console.log(action);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });
    //console.log('front_form',form);

    //return false;
    return form;
  }

  return (
    <>
      <Header />
      <div class="">
        <div class="bg-gray pt-5">
          <div
            id="carouselExampleControls"
            class="container-fluid carousel slide"
            data-ride="carousel"
            style={{
              backgroundImage:
                "url(" + require("../front/images/docbanner.png") + ")",
              backgroundSize: "cover",
              height: "400px",
            }}
          >
            <div class="col-md-12 carousel-inner pt-5">
              <div class="carousel-item active">
                <div class="row align-items-center">
                  <div class="col-md-8">
                    <h1 class="ft48 mb-4">Make Payment</h1>
                  </div>
                  <div class="col-md-4">
                    <img
                      class="d-block w-100"
                      src={require("../front/images/about.png")}
                      alt="First slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="work-area section-padding50">
          <div class="container bg-white p-4">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <img
                  src={require("../front/images/doc.png")}
                  alt=""
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-6 col-sm-6 mb-30">
                <div class="comment-respond" id="respond">
                  <h3 class="widget-title text-center border-bottom">
                    Make Payment
                  </h3>
                  <h4 class="mb-4">Appointment Details</h4>
                  <div class="basic-form">
                    <h6 class="mb-3">
                      Patient Name :{" "}
                      {patientDetail && patientDetail.patientName}
                    </h6>
                    <h6 class="mb-3">
                      Doctor Name : {doctorDetails && doctorDetails.name}
                    </h6>
                    <h6 class="mb-3">
                      Appointment Date :{" "}
                      {formData &&
                        Moment(formData.appointmentDate).format("DD-MM-YYYY")}
                    </h6>
                    <h6 class="mb-3">
                      Appointment Time : {formData && formData.appointmentTime}{" "}
                    </h6>
                    <h6 class="mb-3">
                      Amount : {doctorDetails && doctorDetails.fee}
                    </h6>
                    <button class="btn btn-primary" onClick={payment}>
                      Continue To Pay ₹ {doctorDetails && doctorDetails.fee}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
