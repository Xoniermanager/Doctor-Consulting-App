import React from "react";
import Select from 'react-select';

const AddMoreDrug = ({drugValue, setDrugValue, drugs}) => {

  const removeInputFields = (index) => {
    const rows = [...drugValue];
    rows.splice(index, 1);
    setDrugValue(rows);
  };
  const handleOnChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...drugValue];
    list[index][name] = value;
    setDrugValue(list);
  };

  let arr = [];
   drugs && drugs.forEach(drug => {
    arr.push({ label: drug.drugName, value: drug._id })
  });

  const help = (index,e) => {
    const list = [...drugValue];
    list[index]['drugId'] = e.value;
    setDrugValue(list);
  }

  return (
    <>
     {drugValue.map((data, index) => {
      const { drugType, drugId, drugStrength, drugDose, drugDuration, drugAdvice } = data;
      let indx = arr.findIndex((a1) => a1.value ===  drugId._id)
      return (
      <section key={index} className="field-group mt-4">
        <div className="row">
          <div className="col-md-1 pr-0">
            <div className="form-group-custom">
              <input
                type="text"
                className="form-control"
                name="drugType"
                value={drugType}
                onChange={(evnt) => handleOnChange(index, evnt)}
                placeholder="Type"
                autocomplete="off"
              />
              <label className="control-label"></label>
              <i className="bars"></i>
            </div>
          </div>
          <div className="col-md-3 pr-0">
           <Select name="drugId" onChange={(evnt) => help(index, evnt)}
              options={arr} defaultValue={arr[indx]}
            />
          </div>

          <div className="col-md-3 pr-0">
            <div className="form-group-custom">
              <input
                type="text"
                name="drugStrength"
                value={drugStrength}
                onChange={(evnt) => handleOnChange(index, evnt)}
                className="form-control"
                placeholder="Mg/Ml"
              />
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group-custom">
              <input
                type="text"
                name="drugDose"
                value={drugDose}
                onChange={(evnt) => handleOnChange(index, evnt)}
                className="form-control"
                placeholder="Dose"
              />
              <label className="control-label"></label>
              <i className="bars"></i>
            </div>
          </div>
          <div className="col-md-2 pl-0">
            <div className="form-group-custom">
              <input
                type="text"
                name="drugDuration"
                value={drugDuration}
                onChange={(evnt) => handleOnChange(index, evnt)}
                className="form-control"
                placeholder="Duration"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="form-group-custom">
              <input
                type="text"
                name="drugAdvice"
                value={drugAdvice}
                onChange={(evnt) => handleOnChange(index, evnt)}
                className="form-control"
                placeholder="Advice"
              />
            </div>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-danger text-white span-2 delete"
              onClick={removeInputFields}>
              <i className="fa fa-times-circle"></i> Remove
            </button>
          </div>
        </div>
      </section>
      );
      })}

      <div className="form-group mt-4">
        <button
          type="button"
          align="center"
          onClick={()=>{setDrugValue([...drugValue,{ drugType : '', drugId : '', drugStrength : '', drugDose : '', drugDuration : '', drugAdvice : ''}])}}
          className="btn btn-primary add text-white"
        >
          <i className="fa fa-plus"></i> Add Drug
        </button>
      </div>
    </>
  );
};

export default AddMoreDrug;
