import { useState } from "react";
import useMode from "./usemode";

export default function useToken() {
  const { mode, setMode } = useMode();
  const userdetails = (getinfotoken) => {
    const axios = require("axios");
    console.log("awdawd2");
    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/users/me/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${getinfotoken}`,
      },
    };
    const getofficedetails = (officetoken, officeid) => {};
    const getmemberdetails = (officetoken, officeid) => {};
    const getuserdetails = (officetoken, officeid) => {};
    axios(config)
      .then((response) => {
        setMode(response.data.mode);

        sessionStorage.setItem("accountemail", response.data.email);
        sessionStorage.setItem("accountid", response.data.id);
        sessionStorage.setItem("accountusername", response.data.first_name);
        sessionStorage.setItem("accountmode", response.data.mode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    userdetails(userToken);
    localStorage.setItem("token", userToken);
    setToken(userToken.token);
    console.log("awdawd1");
  };

  return {
    setToken: saveToken,
    token,
  };
}
