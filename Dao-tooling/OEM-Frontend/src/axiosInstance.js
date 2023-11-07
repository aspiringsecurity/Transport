import axios from "axios";
import { toast } from "react-hot-toast";
import { connectWallet } from "./Blockchain.services";
import { setGlobalState } from "./store";
//console.log(import.meta.env);
const instance = axios.create({
  baseURL:
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_BASE_URL_DEV
      : import.meta.env.VITE_BASE_URL_PROD,
  // headers: {
  //   //  Authorization: `<Your Auth Token>`,
  //   "Content-Type": "application/json",
  //   timeout: 1000,
  // },
  // .. other options
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers["Authorization"] = "JWT " + token;
      config.headers["Content-Type"] = "application/json";
      config.headers["accept"] = "application/json";
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      //session expired, login if wallet address is present
      toast.error("Session expired. Authenticating");
      localStorage.setItem("user_id", "");
      localStorage.setItem("access_token", "");
      setGlobalState("connectedAddress", "");
      connectWallet();
    }

    // if (
    //   (error.response.status === 401 || error.response.status === 400) &&
    //   originalRequest.url === `http://64.227.36.240/api/token/refresh/`
    // ) {
    //   //clear app data from local storage
    //   localStorage.setItem("access_token", "");
    //   localStorage.setItem("refresh_token", "");
    //   localStorage.setItem("IsManagerfrontOnline", false);
    //   window.location = "/signin";
    //   return Promise.reject(error);
    // }

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const refreshToken = localStorage.getItem("refresh_token");

    //   return axiosInstance
    //     .post(`http://64.227.36.240/api/token/refresh/`, {
    //       refresh: refreshToken,
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         localStorage.setItem("access_token", res.data.access);
    //         localStorage.setItem("refresh_token", res.data.refresh);
    //         axiosInstance.defaults.headers.common["Authorization"] =
    //           localStorage.getItem("access_token")
    //             ? "JWT " + localStorage.getItem("access_token")
    //             : null;

    //         return axiosInstance(originalRequest);
    //       }
    //     });
    // }
    return Promise.reject(error);
  }
);

export default instance;
