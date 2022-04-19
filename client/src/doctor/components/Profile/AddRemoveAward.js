import React from 'react'

const AddRemoveAward = ({doctorAward, setDoctorAward}) => {
    const removeInputFields = (index) => {
      const rows = [...doctorAward];
      rows.splice(index, 1);
      setDoctorAward(rows);
    };
    const handleChange = (index, evnt) => {
      const { name } = evnt.target;
      const list = [...doctorAward];
      if(evnt.target.name === 'awardImage'){
        const file = evnt.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            list[index]['awardImage'] = Reader.result;
          }
        };
      }else{
        list[index][name] = evnt.target.value;
      }
      setDoctorAward(list);
    };
  
    return (
      <>
        {doctorAward && doctorAward.map((data, index) => {
          const { awardName, awardImage } = data;
          return (
              <div className="form-row" key={index}>
                  <div className="form-group col-md-6">
                      <label>Add Award Image</label>
                      <input
                        onChange={(evnt) => handleChange(index, evnt)}
                        type="file"
                        name="awardImage"
                        className="form-control"
                        accept="image/*"
                      />
                    </div>
                  <div className="form-group col-md-5">
                      <label>Add Award </label>
                      <input
                       onChange={(evnt) => handleChange(index, evnt)}
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="awardName"
                        value={awardName}
                      />
                  </div>

  
              <div className="form-group col-md-1">
                <label>Action</label>
                {doctorAward.length !== 1 ? (
                  <button type="button"
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
          <button type="button" className="btn btn-outline-success " onClick={()=>{setDoctorAward([...doctorAward,{awardName:null, awardImage:null}])}}>
            <i className="fa fa-plus"></i> Add more
          </button>
        </div>
      </>
    );
  
}

export default AddRemoveAward