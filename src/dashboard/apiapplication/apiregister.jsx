import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AddOutlined } from "@mui/icons-material";
import { Divider, Tag, Space, Checkbox, Button, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Base, Body, Heading, Miniheader } from "../../style";
import useToken from "../../useToken";

export default function Apiregister() {
  const { token, setToken } = useToken();
  const [email, se] = useState(sessionStorage.getItem("accountemail"));
  const [officeid, soid] = useState(sessionStorage.getItem("affoffice"));
  const navigate = useNavigate();
  const registerapi = () => {
    const axios = require("axios");
    let data = JSON.stringify({
      office: officeid,
    });

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/third-party-access/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("Registered for Api");
        navigate("/dashboard/api");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
  return (
    <div className="vh-100 px-3">
      <>
        <div className="fs-4 text-center fw-bold pb-5">Welcome {email}</div>
        <div className=" container fs-6">
          Partners can simplify their eligibility process and offer members
          immediate access to RevMD’s services by using RevMD’s real time
          Eligibility API Package. Immediate access is available to members
          since the member’s demographic data is sent to RevMD based upon
          enrollment with the partner.
        </div>
        <div className="fs-5 fw-bold text-center pt-5 ">
          Create new application For Revmd Member Management

        </div>
        <Button
        type="dashed"
        icon={<AddOutlined/>}
          className="m-auto d-block mt-4 w-50"
          onClick={() => registerapi()}
        >
          {" "}
          Register For Api
        </Button>
      </>
    </div>
  );
}
