import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'moment';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import DataTable from "react-data-table-component";
import { Paper, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";
import { useAlert } from 'react-alert';
import SideBar from '../Layout/SideBar';
import Loader from '../Layout/Loader';
import { deleteStories, getStories } from '../../../Actions/Admin';

const AllStories = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  let { loading, stories } = useSelector((state) => state.stories);


  console.log('stories',stories)

  let allStories = stories && stories.map((element, index)=>{
  let cdate = Moment(element.createdAt).format('DD MMMM YYYY HH:mm');
    element = {
      ...element,
      cdate : cdate,
      sno : index + 1
    }
    return element;
  })


  const alert = useAlert();
  const { error, message } = useSelector((state) => state.apiStatus);

  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const handleDeleteClick = async (e) =>{
    let id = e.target.id;
    const result = await confirm("Do you want to delete this?",options);
    if (result && id) {
      await dispatch(deleteStories(id));
      dispatch(getStories());
      alert.success("Stories deleted successfully");
    }
  }


  const columns = [
    {
      name: "S.No.",
      selector: "sno"
    },
    {
      name: "STORY TITLE",
      selector: "storiesTitle",
      sortable: true,
    },
    {
        name: "STORY AUTHOR",
        selector: "storiesAuthor",
        sortable: true,
    },
    {
      name: "DATE",
      selector: "cdate",
      sortable: true,
    },
    {
      cell:(row) => <div className="d-flex"><Link to={`/admin/edit-stories/${row._id}`} className="btn btn-primary shadow btn-sm sharp mr-1"><i className="fa fa-edit"></i></Link>
      <button type='button' id={row._id} onClick={handleDeleteClick} className="btn btn-danger shadow btn-sm sharp mr-1"><i className="fa fa-trash"></i></button></div>,
      name: "ACTIONS"
    },
  ];

  const isIndeterminate = (indeterminate) => indeterminate;
  const selectableRowsComponentProps = { indeterminate: isIndeterminate };

  return (
    <> 
    <Header title={'Stories'} />
    <SideBar />
    { loading === true ? <Loader /> :  (<div className="content-body">
      <div className="container-fluid">
        {/* <!-- row --> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-block">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="card-title">All Stories</h4>
                  </div>
                  <div className="col-md-6 text-right">
                    <Link
                      to="/admin/create-stories"
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fa fa-plus"></i> Add Stories
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Paper>
                  <DataTable
                    columns={columns}
                    data={allStories}
                    defaultSortField="storiesTitle"
                    pagination
                    selectableRows
                    selectableRowsComponent={Checkbox}
                    selectableRowsComponentProps={
                      selectableRowsComponentProps
                    }
                  />
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)}
    <Footer />
  </>
  )
}

export default AllStories