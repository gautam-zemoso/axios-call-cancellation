import axios from "axios";

export const apiRequestsFormat = {
  getRequest: function (url, cancelToken) {
    let config = { cancelToken: cancelToken };
    return axios
      .get(url, config)
      .then(function (res) {
        return res;
      })
      .catch(function (error) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (axios.isCancel(error)) {
          console.log("axios request cancelled", error.message, url);
        } else {
          if (error.response) {
            if (error.response.status === 500) {
              window.alert("internal server error");
            } else if (error.response.status === 404) {
              window.alert("Resource not found");
            } else if (error.response.status === 401) {
              window.alert("Unauthorized user");
            }
          } else if (error.request) {
            console.log("error.request", error.request);
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
          } else {
            // Something happened in setting up the request that triggered an Error
            window.alert(error.message);
          }
        }
      });
  }
};
