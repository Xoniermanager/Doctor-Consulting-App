import axios from "axios";


// create Doctor
export const createDoctor = (userValue, certificate) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateDoctorRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-doctor",
      { userValue, certificate  },
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
    const { data } = await axios.get(
      `/api/v1/admin/update-status/${userId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
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
    const { data } = await axios.get(`/api/v1/admin/edit-disease/${diseaseId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
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
export const updateDepartment = (departmentId, departmentValue,deptIcon) => async (dispatch) => {
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
    const { data } = await axios.get(`/api/v1/admin/edit-department/${departmentId}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
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

// create news
export const createNews = (newsValue, newsImage) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateNewsRequest",
    });
    const { data } = await axios.post(
      "/api/v1/admin/create-news",
      { newsValue, newsImage},
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
// edit news data
export const editNews = (newsId) => async (dispatch) => {
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
    const { data } = await axios.delete(
      `/api/v1/admin/delete-news/${newsId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
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
    const { data } = await axios.get(
      `/api/v1/admin/update-enquiry/${enqId}`,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

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