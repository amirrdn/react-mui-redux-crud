import axios from "axios";
// const API_URL = "http://back-end.e-procurement.abdi.co.id/api/auth/login";
const API_URL = 'http://localhost:3001/api/auth/login';
// const API_URL = 'http://be-dev-procurement.abdi.co.id/api/auth/login';

// const APIURL = 'http://back-end.e-procurement.abdi.co.id/api/';
const APIURL = 'http://localhost:3001/api/';
// const APIURL = 'http://be-dev-procurement.abdi.co.id/api/';

// const socketurl = 'http://back-end.e-procurement.abdi.co.id/'
const socketurl = 'http://localhost:3001/'
// const socketurl = 'http://be-dev-procurement.abdi.co.id/';

const Auth = {
  login:function(data, config) {
    return axios
      .post(API_URL ,data, config)
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem('access_token', response.data.access_token);
        }
        return response.data;
      }).catch((error) => {
        return error.response.data
      })
  },
  logout: function() {
    localStorage.removeItem("user");
  },
  getToken: function(){
    return localStorage.getItem('access_token');
  },
  getCurrentUser: function() {
    return JSON.parse(localStorage.getItem('user'));;
  },
  getUrl: function(){
    return APIURL;
  },
  getSocketserver: function(){
    return socketurl;
  }
}

export default Auth;