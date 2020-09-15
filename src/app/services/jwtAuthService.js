import axios from "axios";
import localStorageService from "./localStorageService";
import { auth } from "firebase";

const BACKEND = process.env.REACT_APP_BACKEND_ENDPOINT

class JwtAuthService {

   // You need to send http request with email and passsword to your server in this method
   // Your server will return user object & a Token
   // User should have role property
   // You can define roles in app/auth/authRoles.js
   loginWithEmailAndPassword = (email, password) => {
      return axios.post(BACKEND + "/api/user/login", {
         "user": email,
         "pass": password
      })
         .then(response => {
            console.log(response)
            if (response.status >= 200 && response.status <= 299) {
               return response.data.data
            } else {
               throw Error(response.statusText);
            }
         })
         .then(data => {
            // Login successful
            // Save token
            this.setSession(data.access_token);
            // Set user
            this.setUser(data);

            return data;
         })

   };


   // You need to send http requst with existing token to your server to check token is valid
   // This method is being used when user logged in & app is reloaded
   loginWithToken = () => {
      const token = localStorage.getItem("jwt_token")
      if (token)
         axios.defaults.headers.common["Authorization"] = token;
         
      return axios.get(BACKEND + "/api/user/active")
         .then(response => {
            console.log("user/active ", response)
            if (response.status >= 200 && response.status <= 299) {
               return response.data.data.user.user;
            } else {
               throw Error(response.statusText);
            }
         })
         .then(data => {
            console.log("data.user.user",data)
            // Token is valid
            this.setSession(token);
            this.setUser(data);
            return data;
         })

   };

   resetPasswordRequest = (user) => {
      return axios.post(BACKEND + "/api/user/reset/request", {
         "user": user
      })
         .then(response => {
            console.log(response)
            if (response.status >= 200 && response.status <= 299) {
               return response.data.data
            } else {
               throw Error(response.statusText);
            }
         })
   }

   resetPassword = (pass_reset_id, pass) => {
      return axios.post(BACKEND + "/api/user/reset", {
         "pass_reset_id": pass_reset_id,
         "pass": pass
      })
         .then(response => {
            console.log(response)
            if (response.status >= 200 && response.status <= 299) {
               return response.data.data
            } else {
               throw Error(response.statusText);
            }
         })
   }

   logout = () => {
      this.setSession(null);
      this.removeUser();
   }

   // Set token to all http request header, so you don't need to attach everytime
   setSession = token => {
      if (token) {
         localStorage.setItem("jwt_token", token);
         axios.defaults.headers.common["Authorization"] = token;
      } else {
         localStorage.removeItem("jwt_token");
         delete axios.defaults.headers.common["Authorization"];
      }
   };

   // Save user to localstorage
   setUser = (user) => {
      var auth_user = {
         userId: "1",
         role: 'ADMIN',
         displayName: "Jason Alexander",
         email: "jasonalexander@gmail.com",
         photoURL: "/assets/images/face-6.jpg",
         age: 25,
         token: ""
      }

      auth_user.displayName = user.name + " " + user.surname;
      auth_user.token = user.access_token;

      localStorageService.setItem("auth_user", auth_user);
   }
   // Remove user from localstorage
   removeUser = () => {
      localStorage.removeItem("auth_user");
   }
}

export default new JwtAuthService();
