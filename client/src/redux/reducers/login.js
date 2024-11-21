// reducers/login.js
import * as actionTypes from "../actionTypes";


const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  isLoading: false
};

const login = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return {
          ...state,
          isLoading: payload
      }
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
          ...state,
          isLoggedIn: true,
          user: payload,
          error: null
      }
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
          ...state,
          isLoggedIn: false,
          user: null,
          error: payload
      }
    }
    default:
      return state;
  }
};

export default login;
