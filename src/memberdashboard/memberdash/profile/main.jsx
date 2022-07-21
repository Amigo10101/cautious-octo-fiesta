import { Button, message, Result, Spin } from "antd";
import React, { useEffect, useState } from "react";
import useToken from "../../../useToken";

export default function MemberProfile() {
  const [userid, setuserid] = useState(sessionStorage.getItem("accountid"));
  const { token } = useToken();
  const [link, setlink] = useState("");
  const [frame, setframe] = useState("none");
  const [spin, setspin] = useState("block");
  const [erroe,seterror]=useState(false)

  useEffect(() => {
    const axios = require("axios");
const iffalse=()=>{
  setspin("none");
  seterror(true);
}
    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/normal/memd-login/" +
        userid +
        "/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        
        {response.data.status===200?setlink(response.data.response):iffalse()}
       
      })
      .catch((error) => {
        console.log(error);
        message.error("Please Try again later!")
      });

    setTimeout(() => {
      setspin("none");
      setframe("block");
    }, 6500);
  }, []);

  return (
    <div className="p-3" style={{ height: "921px" }}>
      <div className="container p-0" style={{ height: "921px",maxWidth:"100%" }}>
        <Spin
          style={{ display: `${spin}`, marginTop: 70 }}
          size="large"
          tip="Fetching User Information..."
        >
          <div className="container" style={{display: `${spin}`, height: "500px" }}></div>
        </Spin>
        {erroe?<Result
      status="403"
      title="400"
      subTitle="Sorry, you don't have an active Membership plan."
      extra={
        <Button
          type="primary"
          onClick={() => {
            
          }}
        >
          Back Home
        </Button>
      }
    />:<iframe
          style={{ height: "100%", display: `${frame}` }}
          src={link}
          width="100%"
          frameborder="0"
        ></iframe>}
        
        
      </div>
    </div>
  );
}
