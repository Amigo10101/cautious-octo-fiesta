import React from "react";

import { GlobalOutlined } from "@ant-design/icons";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Checkbox, Button, Alert, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useToken from "../useToken";

export default function Dashlogin() {
  const [errorbox, seterrorbox] = React.useState(false);
  const { token, setToken } = useToken();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (email) => {
    const axios = require("axios");
    console.log(email.username);
    let data = JSON.stringify({
      email: email.username,
    });

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/accounts/password/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
        message.success(response.data.message);
        Navigate("/");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const Navigate = useNavigate();
  return (
    <form
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 110px",
        backgroundSize: "100%",
        backgroundImage: `url(${"https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg"})`,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bgrey vh-100">
        <div className="d-block text-end pt-4">
          <span className=" p-3 fs-6">
            <GlobalOutlined />
          </span>
        </div>
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
            <div className="tgrey p-2 pt-3 fs-6 text-center">
              Submit email for the account that you want to reset.
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
                    style={{ height: 45 }}
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

            <div>
              {" "}
              <Button
                block
                style={{ height: "45px" }}
                className=""
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  seterrorbox(false);
                }}
              >
                Reset Password
              </Button>
            </div>
          </div>
          <div
            className="text-primary btn border-0 py-4 ps-4"
            onClick={() => {
              Navigate("/dashboard");
            }}
          >
            Go Back to home
          </div>
        </div>
      </div>
    </form>
  );
}
