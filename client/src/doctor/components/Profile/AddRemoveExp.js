import React from "react";

const AddRemoveExp = ({expValue, setExpValue}) => {
  const removeInputFields = (index) => {
    const rows = [...expValue];
    rows.splice(index, 1);
    setExpValue(rows);
  };
  const handleChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...expValue];
    list[index][name] = value;
    setExpValue(list);
  };

  return (
    <>
      {expValue.map((data, index) => {
        const { experience, expYear } = data;
        return (
            <div className="form-row" key={index}>
                <div className="form-group col-md-6">
                    <label>Add Experience</label>
                    <input type="text"  onChange={(evnt) => handleChange(index, evnt)}
                    value={experience} name="experience" className="form-control" placeholder="" />
                </div>
                <div className="form-group col-md-5">
                    <label>Experience year </label>
                    <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={expYear} name="expYear" className="form-control" placeholder="" />
                </div>

            <div className="form-group col-md-1">
              <label>Action</label>
              {expValue.length !== 1 ? (
                <button  type="button"
                  className="btn btn-outline-danger"
                  onClick={removeInputFields}
                >
                  x
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
      <div className="form-group col-md-12">
        <button type="button" className="btn btn-outline-success " onClick={()=>{setExpValue([...expValue,{experience:null, expYear:null}])}}>
          <i className="fa fa-plus"></i> Add more
        </button>
      </div>
    </>
  );
};

export default AddRemoveExp;
