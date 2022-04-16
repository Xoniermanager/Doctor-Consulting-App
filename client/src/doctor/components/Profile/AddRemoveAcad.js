import React from 'react'

const AddRemoveAcad = ({docterAcademic, setDocterAcademic}) => {

    const removeInputFields = (index) => {
      const rows = [...docterAcademic];
      rows.splice(index, 1);
      setDocterAcademic(rows);
    };
    const handleChange = (index, evnt) => {
      evnt.preventDefault();
      const { name, value } = evnt.target;
      const list = [...docterAcademic];
      list[index][name] = value;
      setDocterAcademic(list);
    };
  
    return (
      <>
        {docterAcademic && docterAcademic.map((data, index) => {
          const { academic } = data;
          return (
              <div className="form-row" key={index}>
                  <div className="form-group col-md-11">
                      <label>Add Academic Details</label>
                      <input type="text"  onChange={(evnt) => handleChange(index, evnt)}
                      value={academic} name="academic" className="form-control" placeholder="" />
                  </div>
                 
              <div className="form-group col-md-1">
                <label>Action</label>
                { docterAcademic.length !== 1 ? (
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
          <button type="button" className="btn btn-outline-success " onClick={()=>{setDocterAcademic([...docterAcademic,{academic:null}])}}>
            <i className="fa fa-plus"></i> Add more
          </button>
        </div>
      </>
    );
  
}

export default AddRemoveAcad