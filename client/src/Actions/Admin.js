import axios from "axios";

// create Doctor
export const createDoctor = (userValue, certificate) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateDoctorRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-doctor",
      { userValue, certificate },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "CreateDoctorSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateDoctorFailure",
      payload: error.response.data.message,
    });
  }
};

// get patient
export const getPatients = (usertype) => async (dispatch) => {
  try {
    dispatch({
      type: "GetAdminPatientRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/patients/${usertype}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetAdminPatientSuccess",
      payload: data.adminPatients,
    });
  } catch (error) {
    dispatch({
      type: "GetAdminPatientFailure",
      payload: error.response.data.message,
    });
  }
};

// update user status
export const updateUserStatus = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateUserStatusRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/update-status/${userId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "UpdateUserStatusSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateUserStatusFailure",
      payload: error.response.data.message,
    });
  }
};

// create disease
export const createDisease = (diseaseValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateDiseaseRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-disease",
      { ...diseaseValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateDiseaseSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateDiseaseFailure",
      payload: error.response.data.message,
    });
  }
};

// update disease
export const updateDisease = (diseaseId, diseaseValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateDiseaseRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-disease/${diseaseId}`,
      { ...diseaseValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateDiseaseSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateDiseaseFailure",
      payload: error.response.data.message,
    });
  }
};

// get diseases
export const getDiseases = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDiseasesRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-diseases", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDiseasesSuccess",
      payload: data.diseases,
    });
  } catch (error) {
    dispatch({
      type: "GetDiseasesFailure",
      payload: error.response.data.message,
    });
  }
};

// edit disease data
export const editDisease = (diseaseId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditDiseaseRequest",
    });
    const { data } = await axios.get(
      `/api/v1/admin/edit-disease/${diseaseId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "EditDiseaseSuccess",
      payload: data.disease,
    });
  } catch (error) {
    dispatch({
      type: "EditDiseaseFailure",
      payload: error.response.data.message,
    });
  }
};

// delete disease
export const deleteDisease = (diseaseId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteDiseaseRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/admin/delete-disease/${diseaseId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "DeleteDiseaseSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteDiseaseFailure",
      payload: error.response.data.message,
    });
  }
};

// create department
export const createDepartment = (departmentValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateDepartmentRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-department",
      { ...departmentValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateDepartmentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateDepartmentFailure",
      payload: error.response.data.message,
    });
  }
};

// update department
export const updateDepartment =
  (departmentId, departmentValue, deptIcon) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateDepartmentRequest",
      });
      const { data } = await axios.put(
        `/api/v1/admin/update-department/${departmentId}`,
        { ...departmentValue, deptIcon },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdateDepartmentSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdateDepartmentFailure",
        payload: error.response.data.message,
      });
    }
  };

// get departments
export const getDepartments = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDepartmentsRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-departments", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDepartmentsSuccess",
      payload: data.departments,
    });
  } catch (error) {
    dispatch({
      type: "GetDepartmentsFailure",
      payload: error.response.data.message,
    });
  }
};

// edit department data
export const editDepartment = (departmentId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditDepartmentRequest",
    });
    const { data } = await axios.get(
      `/api/v1/admin/edit-department/${departmentId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "EditDepartmentSuccess",
      payload: data.department,
    });
  } catch (error) {
    dispatch({
      type: "EditDepartmentFailure",
      payload: error.response.data.message,
    });
  }
};

// delete department
export const deleteDepartment = (departmentId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteDepartmentRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/admin/delete-department/${departmentId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "DeleteDepartmentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteDepartmentFailure",
      payload: error.response.data.message,
    });
  }
};

// create Faq
export const createFaq = (faqValue) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateFaqRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-faq",
      { ...faqValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateFaqSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateFaqFailure",
      payload: error.response.data.message,
    });
  }
};

// update faq
export const updateFaq = (faqId, faqValue) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateFaqRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-faq/${faqId}`,
      { ...faqValue },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateFaqSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateFaqFailure",
      payload: error.response.data.message,
    });
  }
};

// get Faqs
export const getFaqs = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetFaqsRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-faqs", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetFaqsSuccess",
      payload: data.faqs,
    });
  } catch (error) {
    dispatch({
      type: "GetFaqsFailure",
      payload: error.response.data.message,
    });
  }
};

// edit disease data
export const editFaq = (diseaseId) => async (dispatch) => {
  try {
    dispatch({
      type: "EditFaqRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-faq/${diseaseId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditFaqSuccess",
      payload: data.faq,
    });
  } catch (error) {
    dispatch({
      type: "EditFaqFailure",
      payload: error.response.data.message,
    });
  }
};

// delete faq
export const deleteFaq = (diseaseId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteFaqRequest",
    });
    const { data } = await axios.delete(
      `/api/v1/admin/delete-faq/${diseaseId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    dispatch({
      type: "DeleteFaqSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteFaqFailure",
      payload: error.response.data.message,
    });
  }
};

//create service
export const createService = (serviceValue, serviceImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateServiceRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-service",
      { serviceValue, serviceImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateServiceSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateService = (serviceId, serviceValue, serviceImage) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateServiceRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-service/${serviceId}`,
      { serviceValue, serviceImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateServiceSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateServiceFailure",
      payload: error.response.data.message,
    });
  }
};


export const editService = (serviceId) => async (dispatch) => {
  //console.log('newsId',serviceId)
  try {
    dispatch({
      type: "EditServiceRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-service/${serviceId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditServiceSuccess",
      payload: data.service,
    });
    //console.log('ser',data.service);
  } catch (error) {
    dispatch({
      type: "EditServiceFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteService = (serviceId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteServiceRequest",
    });
    const { data } = await axios.delete(`/api/v1/admin/delete-service/${serviceId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "DeleteServiceSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteServiceFailure",
      payload: error.response.data.message,
    });
  }
};
export const getService = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetServiceRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-service", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetServiceSuccess",
      payload: data.service,
    });
  } catch (error) {
    dispatch({
      type: "GetServiceFailure",
      payload: error.response.data.message,
    });
  }
};


//end create service


//our approach

export const createOurApproach = (approachValue, approachImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateApproachRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-approach",
      { approachValue, approachImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateApproachSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateApproachFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateOurApproach = (approachId,approachValue, approachImage) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateApproachRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-approach/${approachId}`,
      { approachValue, approachImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateApproachSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateApproachFailure",
      payload: error.response.data.message,
    });
  }
};


export const editOurApproach = (approachId) => async (dispatch) => {
  //console.log('newsId',approachId)
  try {
    dispatch({
      type: "EditApproachRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-approach/${approachId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    }); 
    dispatch({
      type: "EditApproachSuccess",
      payload: data.approach,
    });
    //console.log('ser',data);
  } catch (error) {
    dispatch({
      type: "EditApproachFailure",
      payload: error.response.data.message,
    });
  }
};

//end our approach

//our about

export const createAbout = (aboutValue, aboutImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateAboutRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-about",
      { aboutValue, aboutImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateAboutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateAboutFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateAbout = (aboutId,aboutValue, aboutImage) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateAboutRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-about/${aboutId}`,
      { aboutValue, aboutImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateAboutSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateAboutFailure",
      payload: error.response.data.message,
    });
  }
};


export const editAbout = (aboutId) => async (dispatch) => {
  //console.log('newsId',approachId)
  try {
    dispatch({
      type: "EditAboutsRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-about/${aboutId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    }); 
    dispatch({
      type: "EditAboutsSuccess",
      payload: data.about,
    });
    //console.log('ser',data);
  } catch (error) {
    dispatch({
      type: "EditAboutsFailure",
      payload: error.response.data.message,
    });
  }
};

//end our about


//our client 
export const createClient = (clientValue, clientImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateClientRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-client",
      { clientValue, clientImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateClientSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateClientFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateClient = (clientId, clientValue, clientImage) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateClientRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-client/${clientId}`,
      { clientValue, clientImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateClientSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateClientFailure",
      payload: error.response.data.message,
    });
  }
};


export const editClient = (clientId) => async (dispatch) => {
  //console.log('newsId',serviceId)
  try {
    dispatch({
      type: "EditClientRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-client/${clientId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditClientSuccess",
      payload: data.clients,
    });
    console.log('ser',data);
  } catch (error) {
    dispatch({
      type: "EditClientFailure", 
      payload: error.response.data.message,
    });
  }
};

export const deleteClient = (clientId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteClientRequest",
    });
    const { data } = await axios.delete(`/api/v1/admin/delete-client/${clientId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "DeleteClientSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteClientFailure",
      payload: error.response.data.message,
    });
  }
};
export const getClient = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetClientRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-client", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetClientSuccess",
      payload: data.clients,
    });
    //console.log('data',data);
  } catch (error) {
    dispatch({
      type: "GetClientFailure",
      payload: error.response.data.message,
    });
  }
};

//end our client

//start stories


export const createStories = (storiesValue, storiesImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateStoriesRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-stories",
      { storiesValue, storiesImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateStoriesSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateStoriesFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateStories = (storiesId, storiesValue, storiesImage) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateStoriesRequest",
    });
    const { data } = await axios.put(
      `/api/v1/admin/update-stories/${storiesId}`,
      { storiesValue, storiesImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "UpdateStoriesSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateStoriesFailure",
      payload: error.response.data.message,
    });
  }
};


export const editStories = (storiesId) => async (dispatch) => {
 // console.log('newsId',storiesId)
  try {
    dispatch({
      type: "EditStoriesRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-stories/${storiesId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditStoriesSuccess",
      payload: data.stories,
    });
    //console.log('ser',data);
  } catch (error) {
    dispatch({
      type: "EditStoriesFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteStories = (storiesId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteStoriesRequest",
    });
    const { data } = await axios.delete(`/api/v1/admin/delete-stories/${storiesId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "DeleteStoriesSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteStoriesFailure",
      payload: error.response.data.message,
    });
  }
};
export const getStories = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetStoriesRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-stories", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetStoriesSuccess",
      payload: data.stories,
    });
  } catch (error) {
    dispatch({
      type: "GetStoriesFailure",
      payload: error.response.data.message,
    });
  }
};



//end stories

// create news
export const createNews = (newsValue, newsImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateNewsRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-news",
      { newsValue, newsImage },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    dispatch({
      type: "CreateNewsSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "CreateNewsFailure",
      payload: error.response.data.message,
    });
  }
};
// update news
export const updateNews = (newsId, newsValue, newsImage) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateNewsRequest",
      });
      const { data } = await axios.put(
        `/api/v1/admin/update-news/${newsId}`,
        { newsValue, newsImage },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: "UpdateNewsSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdateNewsFailure",
        payload: error.response.data.message,
      });
    }
};
// get newses
export const getNewses = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetNewsRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-newses", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetNewsSuccess",
      payload: data.newses,
    });
  } catch (error) {
    dispatch({
      type: "GetNewsFailure",
      payload: error.response.data.message,
    });
  }
};
export const getLatestNews = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetLatesNewsRequest",
    });
    const { data } = await axios.get("/api/v1/admin/all-latest-newses", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetLatestNewsSuccess",
      payload: data.newses,
    });
  } catch (error) {
    dispatch({
      type: "GetLatestNewsFailure",
      payload: error.response.data.message,
    });
  }
};

// edit news data
export const editNews = (newsId) => async (dispatch) => {
  //console.log('newsId',newsId)
  try {
    dispatch({
      type: "EditNewsRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/edit-news/${newsId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "EditNewsSuccess",
      payload: data.news,
    });
    //console.log('newsdfsaf',data.news);
  } catch (error) {
    dispatch({
      type: "EditNewsFailure",
      payload: error.response.data.message,
    });
  }
};
// delete news
export const deleteNews = (newsId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteNewsRequest",
    });
    const { data } = await axios.delete(`/api/v1/admin/delete-news/${newsId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "DeleteNewsSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteNewsFailure",
      payload: error.response.data.message,
    });
  }
};

// update Enquiry Status
export const updateEnquiryStatus = (enqId) => async (dispatch) => {
  try {
    dispatch({
      type: "EnquiryStatusRequest",
    });
    const { data } = await axios.get(`/api/v1/admin/update-enquiry/${enqId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    dispatch({
      type: "EnquiryStatusSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "EnquiryStatusFailure",
      payload: error.response.data.message,
    });
  }
};
// get enquiries
export const getEnquiries = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetEnquiriesRequest",
    });
    const { data } = await axios.get("/api/v1/admin/enquiries", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetEnquiriesSuccess",
      payload: data.enquiries,
    });
  } catch (error) {
    dispatch({
      type: "GetEnquiriesFailure",
      payload: error.response.data.message,
    });
  }
};

// get dashboard details
export const getDashboardData = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetDashboardDetailsRequest",
    });
    const { data } = await axios.get("/api/v1/admin/dashboard-details", {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    dispatch({
      type: "GetDashboardDetailsSuccess",
      payload: data.dashboardData,
    });
  } catch (error) {
    dispatch({
      type: "GetDashboardDetailsFailure",
      payload: error.response.data.message,
    });
  }
};
