import { toast } from "react-hot-toast";

import axiosInstance from "@modules/Shared/lib/axiosInstance";
import { useAuthStore } from "@modules/Shared/store";

const decode = (token: string) => {
  //get second element
  let base64url = token.split(".")[1];
  //convert to base 64
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonpayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  let data = JSON.parse(jsonpayload);
  //set user id
  useAuthStore.setState({
    user: { ...useAuthStore.getState().user, id: data.id },
  });
};

//login
const login = async (address: string) => {
  let data = {
    walletAddress: address,
  };
  try {
    await axiosInstance({
      // url of the api endpoint (can be changed)
      url: "auth/login",
      method: "POST",
      data: data,
    }).then((res) => {
      // handle success
      //console.log(res.data);
      //update variables and states
      // localStorage.setItem("access_token", res.data.token);
      useAuthStore.setState({
        user: {
          ...useAuthStore.getState().user,
          walletAddress: address,
          accessToken: res.data.token,
        },
      });
      //store.setUser({ walletAddress: address, accessToken: res.data.token });
      decode(res.data.token);
      axiosInstance.defaults.headers["Authorization"] = "JWT " + res.data.token;
      toast("Login successfull ", {
        icon: "👏",
      });
    });
  } catch (e) {
    // handle error
    console.error(e);
  }
};

export { login };
