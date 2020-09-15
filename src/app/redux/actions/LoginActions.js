import jwtAuthService from "../../services/jwtAuthService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export function loginWithEmailAndPassword({ email, password }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .loginWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(setUserData(user));

        history.push({
          pathname: "/"
        });

        return dispatch({
          type: LOGIN_SUCCESS
        });
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}

export function resetPasswordRequest({ user }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .resetPasswordRequest(user)
      .then(reset => {
        //dispatch(setUserData(reset));

        history.push({
          pathname: "/session/forgot-password"
        });

        return dispatch({
          type: RESET_PASSWORD_REQUEST
        });
      })
      .catch(error => {
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: error
        });
      });
  };
}


export function resetPassword({ reset_pass_id, pass }) {
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });

    jwtAuthService
      .resetPassword(reset_pass_id, pass)
      .then(reset => {
        //dispatch(setUserData(reset));

        history.push({
          pathname: "/session/signin"
        });

        return dispatch({
          type: RESET_PASSWORD
        });
      })
      .catch(error => {
        return dispatch({
          type: RESET_PASSWORD_ERROR,
          payload: error
        });
      });
  };
}

export function firebaseLoginEmailPassword({ email, password }) {
  return dispatch => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user
            })
          );

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
