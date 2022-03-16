import axios from 'axios';

export const registerUser = (name, email, password, username) => async (dispatch) =>{
    try {
        dispatch({
            type : "RegisterRequest"
        })
        const {data} = await axios.post(
            "/api/register",{ name, email, password, username },
            {
                headers : {
                    "Content-Type": "application/json",
                }
            }
        )
        localStorage.setItem('token', data.authToken);
        dispatch({
            type : "RegisterSuccess",
            payload : data.user
        })
    } catch (error) {
        localStorage.setItem('token','');
        dispatch({
            type : "RegisterFailure",
            payload: error.response.data.message,
        }) 
    }
}

export const loginUser = (username, password) => async (dispatch) =>{
    try {
        dispatch({
            type : "LoginRequest"
        })
        const {data} = await axios.post(
            "/api/login",{ username, password },
            {
                headers : {
                    "Content-Type": "application/json",
                }
            }
        )
        localStorage.setItem('token', data.authToken);
        dispatch({
            type : "LoginSuccess",
            payload : data.user
        })
    } catch (error) {
       localStorage.setItem('token','');
        dispatch({
            type : "LoginFailure",
            payload: error.response.data.message,
        }) 
    }
}

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get("/api/me", {
          headers :{
              'auth-token' : localStorage.getItem('token')
          }
      });
  
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };


  