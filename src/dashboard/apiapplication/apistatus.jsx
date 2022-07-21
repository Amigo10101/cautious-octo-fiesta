import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Divider, Tag, Space, Checkbox, message, Tooltip } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Base, Body, Heading, Miniheader } from "../../style";
import useToken from "../../useToken";
import { Breadcrumb, Layout, Menu } from "antd";
import Mainapidocs from "./apidocs/main";
import Apidetails from "./apidocs/documentation/info/main";
import useId from "../../useId";
export default function Apistatus() {
  const { token, settoken } = useToken();
  const [email, se] = useState(sessionStorage.getItem("accountemail"));
  const [status, ss] = useState(sessionStorage.getItem("apistatus"));
  const [apitoken, st] = useState(sessionStorage.getItem("apitoken"));
  const [appid, sapid] = useState(sessionStorage.getItem("apiid"));
  const [effect, seteffect] = useState();
  const navigate = useNavigate();
  const [isdashboard, setisdashboard] = useState(true);
  const { Id } = useId();
  const officeid = Id.affiliated_office;
  const apidelete = () => {
    const axios = require("axios");

    let config = {
      method: "delete",
      url:
        "https://backend-demo.revmd.co/api/v1/third-party-access/" +
        appid +
        "/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("Api Deleted");
        navigate("/dashboard/api");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
  const getapimode = () => {
    const axios = require("axios");
    const statuspage = (response) => {
      sessionStorage.setItem("apitoken", response.data.results[0].token);
      sessionStorage.setItem("apistatus", response.data.results[0].enabled);
      sessionStorage.setItem("apiid", response.data.results[0].id);
      navigate("status");
    };

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/third-party-access/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        st(response.data.results[0].token);
        ss(response.data.results[0].enabled);
        sapid(response.data.results[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getapimode();
  }, [effect]);
  const [iscopied, setiscopied] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout className="p-4">
      <Content style={{}}>
        <Layout className="site-layout-background py-3" style={{}}>
          <Sider
            style={{ position: "relative" }}
            className="site-layout-background"
            width={130}
          >
            <Menu defaultSelectedKeys={"awd"}>
              <Menu.Item
                key={"awd"}
                onClick={() => {
                  setisdashboard(true);
                }}
              >
                DashBoard
              </Menu.Item>
              <Menu.Item
                key={"awdwad"}
                onClick={() => {
                  setisdashboard(false);
                }}
              >
                Api Docs
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            {isdashboard ? (
              <>
                <div>
                  <Base>
                    <Miniheader>RevMd API Dashboard</Miniheader>
                    <Body>
                      Member Eligibility Management Partners can simplify their
                      eligibility process and offer members immediate access to
                      RevMd’s services by using RevMd’s real time Eligibility
                      API Package. Immediate access is available to members
                      since the member’s demographic data is sent to RevMd based
                      upon enrollment with the partner.
                    </Body>
                  </Base>
                </div>
                <div></div>
                <div className="container-lg p-0">
                  <div className="row">
                    <div className="col-sm-5">
                      <Base>
                        <h4>Application Details</h4>

                        <Body>
                          <div>Name</div>
                          <div>{email}</div>
                        </Body>
                        <Divider />

                        <Body>
                          <div>Application Status</div>
                          <div>
                            {" "}
                            <Tag
                              onClick={() => console.log(status)}
                              color={status ? "success" : "processing"}
                            >
                              {status ? "Working" : "Pending"}
                            </Tag>
                          </div>
                        </Body>
                        <Divider />
                        <Body>
                          <div>Revmd (Test)</div>
                          <div>
                            <Tag className="p-2 rounded-4" color="#108ee9">
                              https://backend-demo.revmd.co/api
                            </Tag>
                          </div>
                        </Body>
                        <Divider />
                        <Body className="d-none">
                          <div>Revmd (Live)</div>
                          <div>
                            <Tag className="p-2 rounded-4" color="#d80000">
                              https://backend-demo.revmd.co/api
                            </Tag>
                          </div>
                        </Body>
                        <Divider />
                        <Body className="d-none">
                          <div className="pt-2">
                            <Space
                              direction="vertical"
                              size="small"
                              style={{ display: "flex" }}
                            >
                              <Checkbox>awdaw</Checkbox>
                              <Checkbox>awdaw</Checkbox>
                              <Checkbox>awdaw</Checkbox>
                              <Checkbox>awdaw</Checkbox>
                              <Checkbox>awdaw</Checkbox>
                            </Space>
                          </div>
                        </Body>
                      </Base>
                    </div>
                    <div className="col-7">
                      <Base>
                        <div className="d-none">
                          <h4>Production </h4>
                          <Body>
                            If you have this keys, you will be able to WRITE
                            data,To get write access your app needs to be
                            verified. Please request us for your app
                            verification when you're ready for production. Use
                            these keys when your application is production ready
                            via Revmd-Application-Key.
                          </Body>
                          <Divider />
                          <Body>
                            <Miniheader>Production Key</Miniheader>
                          </Body>
                          <Body>
                            productionkey_Revmd_m3JvAdp7y
                            cpGD5ZAhhqCJhTV1Wb81kozAPSVNqbb
                          </Body>
                          <Divider />
                        </div>

                        <Miniheader>Development</Miniheader>

                        <Body>
                          Use this Token when your application is in development
                          phase via Revmd-Application-Key.
                        </Body>
                        <Divider />
                        <Miniheader>Test Key</Miniheader>

                        <Body>
                          <code>
                            <Tooltip
                              title={iscopied ? "Copied" : "Click to copy"}
                            >
                              <div>
                                <code
                                  onClick={() => {
                                    navigator.clipboard.writeText(apitoken);
                                    setiscopied(true);
                                    setTimeout(() => {
                                      setiscopied(false);
                                    }, 5000);
                                  }}
                                >
                                  {apitoken}
                                </code>
                              </div>
                            </Tooltip>{" "}
                          </code>
                        </Body>
                      </Base>
                      <div>
                        <div className="m-4">
                          <button
                            style={{ width: 70 }}
                            className=" d-none btn border-0 fs-6 bg-primary text-white ms-4 float-end "
                          >
                            <EditOutlined className="fs-4 rounded-circle p-1 text-white" />{" "}
                            <div className="align-middle fs-6">Edit</div>
                          </button>
                          <button
                            style={{ width: 70 }}
                            className="btn border-0 bg-danger text-white float-end "
                            onClick={() => {
                              apidelete();
                            }}
                          >
                            {" "}
                            <DeleteOutlined className="fs-4  rounded-circle p-1 text-white" />{" "}
                            <span className="align-middle">Delete</span>
                          </button>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Apidetails token={apitoken} officeid={officeid} />
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
