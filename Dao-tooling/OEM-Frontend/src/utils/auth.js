import { toast } from "react-hot-toast";
import instance from "../axiosInstance";
import { setGlobalState, setUserId } from "../store";

//decode
const decode = (token) => {
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
  //get user id
  setUserId(data.id);
  localStorage.setItem("user_id", data.id);
};

//register
// const register = async (address) => {
//   let data = {
//     walletAddress: address,
//   };
//   try {
//     await instance({
//       // url of the api endpoint (can be changed)
//       url: "auth/signup",
//       method: "POST",
//       data: data,
//     }).then((res) => {
//       // handle success
//       //console.log(res.data);
//       localStorage.setItem("access_token", res.data.token);

//       instance.defaults.headers["Authorization"] = "JWT " + res.data.token;
//     });
//   } catch (e) {
//     // handle error
//     console.error(e);
//   }
// };

//register
const login = async (address) => {
  let data = {
    walletAddress: address,
  };
  try {
    await instance({
      // url of the api endpoint (can be changed)
      url: "auth/login",
      method: "POST",
      data: data,
    }).then((res) => {
      // handle success
      //console.log(res.data);
      //update variables and states
      localStorage.setItem("access_token", res.data.token);
      setGlobalState("connectedAddress", address);
      decode(res.data.token);
      instance.defaults.headers["Authorization"] = "JWT " + res.data.token;
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
