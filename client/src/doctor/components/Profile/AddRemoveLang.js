import React, { useState } from 'react'

const AddRemoveLang = ({langValue,setLangValue}) => {
 
    const removeInputFields = (index)=>{
        const rows = [...langValue];
        rows.splice(index, 1);
        setLangValue(rows);
   }
   const handleChange = (index, evnt)=>{
    const { name, value } = evnt.target;
    console.log('target',evnt.target.name)
    const list = [...langValue];
    list[index].value = value;
    setLangValue(list);
  }
  
    return (
      <>
        {langValue.map((data, index) => {
          const { value } = data;
          return (
              <div className="form-row" key={index}>
                  <div className="form-group col-md-11">
                      <label>Add Language</label>
                      <input type="text"  onChange={(evnt) => handleChange(index, evnt)}
                      value={value} name="language[]" className="form-control" placeholder="" />
                  </div>
                 
              <div className="form-group col-md-1">
                <label>Action</label>
                {langValue.length !== 1 ? (
                  <button  type="button"
                    className="btn btn-outline-danger"
                    onClick={()=>{removeInputFields(index)}}
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
          <button type="button" className="btn btn-outline-success " onClick={()=>{setLangValue([...langValue,{value:null}])}}>
            <i className="fa fa-plus"></i> Add more
          </button>
        </div>
      </>
    );
  
}

export default AddRemoveLang