import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR
} from "../actions/LoginActions";

const initialState = {
  success: false,
  loading: false,
  error: {
    username: null,
    password: null
  }
};

const LoginReducer = function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.data
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        success: false,
        loading: false,
        error: action.data
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
