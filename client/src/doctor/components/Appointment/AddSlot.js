import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlots, editSlot, updateSlot } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import moment from "moment";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";

const AddSlot = () => {
  const history = useNavigate();
  const { slotId } = useParams();
  const dispatch = useDispatch();

  const minDt = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(editSlot(slotId));
  }, [dispatch]);

  const { loading, editData } = useSelector((state) => state.editData);

  let intial = { mon: 1, tue: 1, wed: 1, thu: 1, fri: 1, sat: 1, sun: 1 };
  const [slotValue, setSlotValue] = useState(editData ? editData : intial);

  const [fieldValue, setFieldValue] = useState(
    editData
      ? editData
      : {
          interval: 10,
          slotStartDate: "",
          slotEndDate: "",
          monIn: "",
          monOut: "",
          tueIn: "",
          tueOut: "",
          wedIn: "",
          wedOut: "",
          thuIn: "",
          thuOut: "",
          friIn: "",
          friOut: "",
          satIn: "",
          satOut: "",
          sunIn: "",
          sunOut: "",
        }
  );
  const handleCheck = (e) => {
    setSlotValue({
      ...slotValue,
      [e.target.name]: e.target.value == 1 ? 0 : 1,
    });
  };
  const handleCheckField = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("slotValue", slotValue);
    let daylist = getDaysArray(
      new Date(fieldValue.slotStartDate),
      new Date(fieldValue.slotEndDate)
    );
    daylist.map((v) => v.toISOString().slice(0, 10));
    let manageSlots = [];
    daylist.forEach((v1) => {
      let arr1 = {};
      let arr2 = [];
      let dts = new Date(v1).toISOString().substr(0, 10).replace(/-/g, "-");
      let day = v1.toString().split(" ")[0].toLowerCase();
     
      if (slotValue[day] == 1 && Object.keys(slotValue).includes(day)) {
        arr1.slotDate = dts;
        let dateSlots = getTimeStops(
          fieldValue[day + "In"],
          fieldValue[day + "Out"]
        );
        dateSlots.forEach((v2) => {
          arr2.push({ slot: v2 });
        });
        arr1.slots = [...arr2];
        manageSlots.push(arr1);
      }
    });

    // console.log('manageSlots',manageSlots);
    // console.log('slotValue',slotValue);
    // console.log('fieldValue',fieldValue);

    

    if (slotId) {
      await dispatch(updateSlot(slotId, manageSlots, slotValue, fieldValue));
    } else {
      await dispatch(createSlots(manageSlots, slotValue, fieldValue));
    }
    if(!error){
      history('/my-slots');
    }
  };

  const getDaysArray = (start, end) => {
    let arr = [];
    for (
      let dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const getTimeStops = (start, end) => {
    let startTime = moment(start, "HH:mm");
    let endTime = moment(end, "HH:mm");
    let timeStops = [];
    let endSlot = moment(start, "HH:mm");
    
    while (startTime < endTime) {
      endSlot.add(fieldValue.interval, "minutes");
      timeStops.push(
        new moment(startTime).format("HH:mm A") +
          " - " +
          new moment(endSlot).format("HH:mm A")
      );
      startTime.add(fieldValue.interval, "minutes");
    }
    return timeStops;
  };

  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

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
      <Header title={"Create Slots"} />
      <DoctSideBar />
      {loading === true ? (
        <Loader />
      ) : (
        <div className="content-body">
          <div className="container-fluid">
            {/* <!-- row --> */}
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Add slot
                    </h6>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label for="">Slot Interval *</label>
                        <select
                          className="form-control"
                          name="interval"
                          onChange={handleCheckField}
                          value={fieldValue.interval}
                        >
                          <option value="10">10 min</option>
                          <option value="15">15 min</option>
                          <option value="20">20 min</option>
                          <option value="25">25 min</option>
                          <option value="30" selected="">
                            30 min
                          </option>
                          <option value="35">35 min</option>
                          <option value="40">40 min</option>
                          <option value="45">45 min</option>
                          <option value="50">50 min</option>
                        </select>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">Start Slot Date *</label>
                          <input
                            type="date"
                            min={minDt}
                            name="slotStartDate"
                            onChange={handleCheckField}
                            value={moment(fieldValue.slotStartDate).format(
                              "YYYY-MM-DD"
                            )}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">End Slot Date</label>
                          <input
                            type="date"
                            min={minDt}
                            name="slotEndDate"
                            onChange={handleCheckField}
                            value={moment(fieldValue.slotEndDate).format(
                              "YYYY-MM-DD"
                            )}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="mon"
                              defaultChecked={slotValue.mon ? true : false}
                              value={slotValue.mon}
                            />{" "}
                            Monday In Time *
                          </label>
                          <input
                            type="time"
                            name="monIn"
                            onChange={handleCheckField}
                            value={fieldValue.monIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Monday Out Time</label>
                          <input
                            type="time"
                            name="monOut"
                            onChange={handleCheckField}
                            value={fieldValue.monOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="tue"
                              defaultChecked={slotValue.tue ? true : false}
                              value={slotValue.tue}
                            />{" "}
                            Tuesday In Time *
                          </label>
                          <input
                            type="time"
                            name="tueIn"
                            onChange={handleCheckField}
                            value={fieldValue.tueIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Tuesday Out Time</label>
                          <input
                            type="time"
                            name="tueOut"
                            onChange={handleCheckField}
                            value={fieldValue.tueOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="wed"
                              defaultChecked={slotValue.wed ? true : false}
                              value={slotValue.wed}
                            />{" "}
                            Wednesday In Time *
                          </label>
                          <input
                            type="time"
                            name="wedIn"
                            onChange={handleCheckField}
                            value={fieldValue.wedIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Wednesday Out Time</label>
                          <input
                            type="time"
                            name="wedOut"
                            onChange={handleCheckField}
                            value={fieldValue.wedOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="thu"
                              defaultChecked={slotValue.thu ? true : false}
                              value={slotValue.thu}
                            />{" "}
                            Thursday In Time *
                          </label>
                          <input
                            type="time"
                            name="thuIn"
                            onChange={handleCheckField}
                            value={fieldValue.thuIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Thursday Out Time</label>
                          <input
                            type="time"
                            name="thuOut"
                            onChange={handleCheckField}
                            value={fieldValue.thuOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="fri"
                              defaultChecked={slotValue.fri ? true : false}
                              value={slotValue.fri}
                            />{" "}
                            Friday In Time *
                          </label>
                          <input
                            type="time"
                            name="friIn"
                            onChange={handleCheckField}
                            value={fieldValue.friIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Friday Out Time</label>
                          <input
                            type="time"
                            name="friOut"
                            onChange={handleCheckField}
                            value={fieldValue.friOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="sat"
                              defaultChecked={slotValue.sat ? true : false}
                              value={slotValue.sat}
                            />{" "}
                            Saturday In Time *
                          </label>
                          <input
                            type="time"
                            name="satIn"
                            onChange={handleCheckField}
                            value={fieldValue.satIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Saturday Out Time</label>
                          <input
                            type="time"
                            name="satOut"
                            onChange={handleCheckField}
                            value={fieldValue.satOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label for="">
                            <input
                              type="checkbox"
                              onChange={handleCheck}
                              name="sun"
                              defaultChecked={slotValue.sun ? true : false}
                              value={slotValue.sun}
                            />{" "}
                            Sunday In Time *
                          </label>
                          <input
                            type="time"
                            name="sunIn"
                            onChange={handleCheckField}
                            value={fieldValue.sunIn}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label for="">Sunday Out Time</label>
                          <input
                            type="time"
                            name="sunOut"
                            onChange={handleCheckField}
                            value={fieldValue.sunOut}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary"> Save </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AddSlot;
