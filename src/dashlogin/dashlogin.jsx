import React from "react";
import "./style.css";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GlobalOutlined,
} from "@ant-design/icons";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Checkbox, Button, Alert, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useToken from "../useToken";
import useMode from "../usemode";

export default function Dashlogin() {
  const [errorbox, seterrorbox] = React.useState(false);
  const { token, setToken } = useToken();
  const { mode, setMode } = useMode();
  const [isloading, setisloading] = React.useState(false);
  const Navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setisloading(true);
    login(data.username, data.password);
  };
  const userdetails = (gettoken) => {
    const axios = require("axios");
    console.log("awdawd2");
    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/users/me/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${gettoken}`,
      },
    };

    axios(config)
      .then((response) => {
        setMode(response.data.mode);

        sessionStorage.setItem("accountid", response.data.id);
        setisloading(false);
        setTimeout(() => {
          window.location.reload();
        }, 0);
      })
      .catch((error) => {
        console.log(error);
        setisloading(false);
        message.error(error.message)
      });
  };
  const login = (username, password) => {
    const axios = require("axios");
    let data = JSON.stringify({
      username: `${username}`,
      password: `${password}`,
    });

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/accounts/login/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setToken(response.data.token);
        userdetails(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        seterrorbox(true);
        
        message.error(error.message);
        setisloading(false);
      });
  };

  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 110px",
        backgroundSize: "100%",
        backgroundImage: `url(${"https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg"})`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bgrey vh-100">
          <div className="d-block text-end pt-4">
            <span className=" p-3 fs-6">
              <GlobalOutlined />
            </span>
          </div>
          <div>
            <div
              style={{ marginTop: "50px", maxWidth: "450px" }}
              className="container-md p-0"
            >
              <div>
                {" "}
                <img
                  className="d-block m-auto"
                  width={200}
                  src="https://demo.revmd.io/static/revmd-logo.5a22c1db.png"
                  alt=""
                />
                <div className="tgrey p-2 fs-6 text-center">
                  Login to the RevMD dashboard
                </div>
              </div>
              <div className="container-sm mt-4 px-4">
                {errorbox === false ? undefined : (
                  <Alert
                    showIcon
                    className="my-3"
                    message="Invalid username or password
"
                    type="error"
                  />
                )}
                <div className="pb-4">
                  <Controller
                    render={({ field }) => (
                      <Input
                        style={{ height: 35 }}
                        prefix={<UserOutlined className="pe-0 p-2 me-1" />}
                        className="p-0 rounded-2"
                        {...field}
                        placeholder="Username"
                        status={errors.username ? "error" : undefined}
                      />
                    )}
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    }}
                  />
                  <div className=" text-danger p-auto m-auto fs5">
                    {errors.username?.type === "required" &&
                      "  Please enter username"}
                    {errors.username?.type === "pattern" &&
                      "  Please enter a valid username"}
                  </div>
                </div>

                <Controller
                  render={({ field }) => (
                    <Input.Password
                      style={{ height: 35 }}
                      prefix={<LockOutlined className="pe-0 p-2 me-1" />}
                      iconRender={(visible) => (
                        <div className="p-2">
                          {visible ? (
                            <EyeTwoTone className=" p-2 " />
                          ) : (
                            <EyeInvisibleOutlined className="p-2 " />
                          )}
                        </div>
                      )}
                      className="p-0 rounded-2"
                      {...field}
                      placeholder="Password"
                      status={errors.password ? "error" : undefined}
                    />
                  )}
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                />
                <div className=" text-danger p-auto m-auto fs5">
                  {errors.password?.type === "required" &&
                    "  Please enter your password"}
                </div>
                <div className="mt-4">
                  <span>
                    <Checkbox>Remember Me</Checkbox>
                  </span>
                  <a
                    onClick={() => {
                      Navigate("/resetpassword");
                    }}
                    className="float-end text-primary pe-button"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div>
                  {" "}
                  <Button
                    block
                    loading={isloading}
                    style={{ height: "45px" }}
                    className="mt-4"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      
                      seterrorbox(false);
                    }}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="fw-light"
          style={{
            textAlign: "center",
            position: "fixed",
            bottom: 25,
            left: "25%",
            right: "25%",
          }}
        >
          Copyright © 2021 RevMD
        </div>
      </form>
    </div>
  );
}
