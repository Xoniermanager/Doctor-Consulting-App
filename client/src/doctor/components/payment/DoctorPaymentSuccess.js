import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import Moment from 'moment';
import DoctSideBar from "../Layout/DoctSideBar";
import Loader from "../Layout/Loader";
import { getPaymentDetails } from "../../../Actions/User";

const DoctorPaymentSuccess = ({match}) => {
    const {loading,orderId } = useParams();
    
    const dispatch = useDispatch();
    const history = useNavigate();

    const [order_id, setOrderId] = useState(orderId);
    useEffect(async () => {
        
        await dispatch(getPaymentDetails(order_id));
      }, []);

  
    const { paymentDetails } = useSelector((state) => state.paymentDetails);
    console.log('details',paymentDetails); 

    var status = paymentDetails ? paymentDetails[0].status:'';
    var txnId = paymentDetails ? paymentDetails[0].txnId:'';
    var amount = paymentDetails? paymentDetails[0].amount:'';
    var paymentMode = paymentDetails ? paymentDetails[0].paymentMode:'';
    var bankName = paymentDetails ? paymentDetails[0].bankName:'';
    var bankTxnId = paymentDetails? paymentDetails[0].bankTxnId:'';
    var createdDate = paymentDetails ? paymentDetails[0].updatedDate:'';
    

    //console.log('status',status);

    const appointmentList = () => {
        history('/doctor-appointments')
    }

    return (
        <>
            <Header title={'Payment Status'} />
            <DoctSideBar />
            {loading === true ? <Loader /> : (<div className="content-body">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h4 className="text-primary">Payment Details</h4>
                                    <button type="button" onClick={appointmentList}  className="close"><span>Appointment List</span></button>
                                </div>
                                <div className="card-body" data-select2-id="select2-data-6-tqdb">
                                    <form>
                                        <div className="row" data-select2-id="select2-data-5-akdn">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="form-group">
                                                    <p><b>Payment Status :</b> {status}</p>
                                                    <p><b>Transaction Id :</b> {txnId}</p>
                                                    <p><b>Amount :</b> {amount}</p>
                                                    <p><b>Payment Mode :</b> {paymentMode}</p>
                                                    <p><b>Bank Name :</b> {bankName}</p>
                                                    <p><b>Bank Transaction Id :</b> {bankTxnId}</p>
                                                    <p><b>Created Date :</b> {createdDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>)}
            <Footer />
        </>
    )
};

export default DoctorPaymentSuccess
