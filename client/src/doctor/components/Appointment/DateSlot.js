import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSlotByDate } from "../../../Actions/User";
import DoctSideBar from "../Layout/DoctSideBar";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

const DateSlot = () => {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    e.preventDefault();
    let date = e.target.value;
    if (date) {
      await dispatch(getSlotByDate(date));
    }
  };
  const { dateSlots } = useSelector((state) => state.dateSlots);
  let bookedSlot = dateSlots.bookedSlots;
  let bookedData = bookedSlot && bookedSlot.map((book) => book.slotId);
  
  return (
    <>
      <Header />
      <DoctSideBar />
      <div class="content-body">
        <div class="container-fluid">
          {/* <!-- row --> */}
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h4 class="text-primary">My Slots</h4>
                </div>
                <div class="card-body" data-select2-id="select2-data-6-tqdb">
                  <div class="row" data-select2-id="select2-data-5-akdn">
                    <div class="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label for="rdvdate">Date</label>
                        <div role="wrapper" class="input-group">
                          <input
                            type="date"
                            onChange={handleChange}
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div class="row mb-2 myorders">
                         {dateSlots.allSlots && 
                          dateSlots.allSlots.slots.map((slt, index) => (
                            <div key={index} class="col-sm-6 col-md-4 mb-2">
                               { bookedData.includes(slt._id) ? (<button class="btn btn-danger btn-block">{slt.slot}</button>) : (<button
                                class="btn btn-primary btn-block"
                                data-toggle="modal"
                                data-target="#RDVModalSubmit"
                                data-rdv_slotid={slt._id}
                                data-rdv_date={dateSlots.slotDate}
                                data-rdv_time_start={slt.slot.split('-')[0].trim()}
                                data-rdv_time_end={slt.slot.split('-')[1].trim()}
                              > {slt.slot}</button>) }
                             </div>
                          )) } 
                      </div>
                      <div
                        role="alert"
                        id="help-block"
                        className="alert alert-danger text-center"
                        style={{display: 'none' }}
                      >
                        <img src="#" />
                        <br /> <b>No date selected</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DateSlot;
