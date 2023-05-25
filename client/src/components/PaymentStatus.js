import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Loader from "./Loader";
import Moment from "moment";
import { getPaymentDetails } from "../Actions/User";
const PaymentStatus = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { orderId } = useParams();
  useEffect(async () => {
    await dispatch(getPaymentDetails(orderId));
  }, []);

  localStorage.setItem("formData", "");
  localStorage.setItem("patientDetail", "");
  localStorage.setItem("doctorDetails", "");

  const { paymentDetails } = useSelector((state) => state.paymentDetails);
  console.log("details", paymentDetails);
  var status = paymentDetails && paymentDetails[0].status;
  var txnId = paymentDetails && paymentDetails[0].txnId;
  var amount = paymentDetails && paymentDetails[0].amount;
  var paymentMode = paymentDetails && paymentDetails[0].paymentMode;
  var bankName = paymentDetails && paymentDetails[0].bankName;
  var bankTxnId = paymentDetails && paymentDetails[0].bankTxnId;
  var createdDate = paymentDetails && paymentDetails[0].createdDate;

  const appointmentList = () => {
    history("/patient/appointments");
  };

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
                    <h1 class="ft48 mb-4">Payment Details</h1>
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
                  <h4 class="mb-4">Payment Details</h4>
                  <div class="basic-form">
                  <h6 class="mb-3">Payment Status : {status}</h6>
                    <h6 class="mb-3">Transaction ID : {txnId}</h6>
                    <h6 class="mb-3">Amount : {amount}</h6>
                    <h6 class="mb-3">Payment Mode : {paymentMode} </h6>
                    <h6 class="mb-3">Bank Name : {bankName}</h6>
                    <h6 class="mb-3">Bank Transaction ID : {bankTxnId}</h6>
                    <h6 class="mb-3">Payment Date : {Moment(createdDate).format('DD-MM-YYYY')}</h6>
                    <button class="btn btn-primary" onClick={appointmentList}>Check Appointment</button>
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

export default PaymentStatus;
