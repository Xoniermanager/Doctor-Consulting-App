import React from "react";

const AddMoreTest = ({ testValue, setTestValue, tests }) => {
  const removeInputFields = (index) => {
    const rows = [...testValue];
    rows.splice(index, 1);
    setTestValue(rows);
  };
  const handleOnTChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...testValue];
    list[index][name] = value;
    setTestValue(list);
  };

  return (
    <>
      {testValue.map((data, index) => {
        const { testId, testDescription } = data;
        return (
          <div key={index} className="field-group row  mt-4">
            <div className="col-md-4">
              <select
                className="form-control multiselect-doctorino"
                name="testId"
                value={testId._id}
                onChange={(evnt) => handleOnTChange(index, evnt)}
                tabindex="-1"
                aria-hidden="true"
                required=""
              >
                <option value="">Select Test...</option>
                {tests &&
                  tests.map((test) => (
                    <option value={test._id}>{test.testName}</option>
                  ))}
              </select>
            </div>

            <div className="col-md-5">
              <div className="form-group-custom">
                <input
                  type="text"
                  name="testDescription"
                  value={testDescription}
                  onChange={(evnt) => handleOnTChange(index, evnt)}
                  className="form-control"
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="col-md-3">
              <button
                type="button"
                onClick={removeInputFields}
                className="btn btn-danger delete text-white"
                align="center"
              >
                <i className="fa fa-plus"></i> Remove
              </button>
            </div>
          </div>
        );
      })}

      <div className="form-group mt-4">
        <button
          type="button"
          align="center"
          onClick={() => {
            setTestValue([...testValue, { testId: "", testDescription: "" }]);
          }}
          className="btn btn-primary add text-white"
        >
          <i className="fa fa-plus"></i> Add New Test
        </button>
      </div>
    </>
  );
};

export default AddMoreTest;
