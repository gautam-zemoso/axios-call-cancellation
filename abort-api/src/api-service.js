import { apiRequestsFormat } from "./axios-requests";

export const apiService = {
  fetchTodos,
  fetchPictures
};

function fetchTodos(cancelToken) {
  return apiRequestsFormat
    .getRequest(
      `apiRequestsFormat://jsonplaceholder.typicode.com/todos`,
      cancelToken
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response === undefined) {
        errorMessage = "Please check your internet connectivity!";
      } else {
        errorMessage = error.response.data
          ? error.response.data
          : "Unable to handle request";
      }
      if (typeof errorMessage === "string") {
        return window.alert(errorMessage);
      } else {
        return "Something went wrong!";
      }
    });
}

function fetchPictures(cancelToken) {
  return apiRequestsFormat
    .getRequest(
      `https://api.unsplash.com/search/photos?client_id=2c6_JUwGqQUO9VVLjk5ITQPa8CECMcL1TY8Kxv_mR7Y&page=1&query=office`,
      cancelToken
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      let errorMessage = "";
      if (error.response === undefined) {
        errorMessage = "Please check your internet connectivity!";
      } else {
        errorMessage = error.response.data
          ? error.response.data
          : "Unable to handle request";
      }
      if (typeof errorMessage === "string") {
        return window.alert(errorMessage);
      } else {
        return "Something went wrong!";
      }
    });
}
