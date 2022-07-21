import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Checkbox, Button,message } from "antd";
import { useNavigate } from "react-router-dom";
export default function Pwdresetaftermail() {
  const Navigate = useNavigate();
  return (
    <div style={{
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 110px",
      backgroundSize: "100%",
      backgroundImage: `url(${"https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg"})`,
    }} className="bgrey vh-100">
      <div className="d-block text-end pt-4">
        <span className=" p-3 fs-6">
          <GlobalOutlined />
        </span>
      </div>
      <div
        style={{ marginTop: "70px", maxWidth: "450px" }}
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
            Continue to change password
          </div>
        </div>
        <div className="container-sm mt-4">
          <Input.Password
            className="m-auto tgrey "
            size="large"
            placeholder=" Password"
            prefix={<LockOutlined />}
          />
          <Input.Password
            className="tgrey mt-4"
            size="large"
            placeholder="Confirm Password"
            prefix={<LockOutlined />}
          />{" "}
          
          <div>
            {" "}
            <Button
              block
              style={{ height: "45px" }}
              className="mt-4"
              size="large"
              type="primary"
              onClick={() => {
                message.success('Password Has Been changed');
              }}
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
