import React, { useState, useEffect } from "react";
import { Dropdown, message, Space } from "antd";
import { Spin } from "antd";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  CreditCardOutlined,
  MedicineBoxOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import MemberProfile from "./memberdash/profile/main";
import Subbedpackages from "./memberdash/subbedpackages/main";
import Dashboardpage from "./memberdash/dashboard/main";
import useToken from "../useToken";
import useId from "../useId";
import Payment from "./memberdash/payment/payment";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function MembDashboard() {
  const { Id, setId } = useId();
  const [collapsed, setCollapsed] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [username, setusername] = useState(
    sessionStorage.getItem("accountusername")
  );
  const [sidewidth, setsidewidth] = useState("256px");
  const [selectedkey, setselectedkey] = useState("d1");
  const { token, setToken } = useToken();
  const [effect, seteffect] = useState();
  const [userid, setuserid] = useState(sessionStorage.getItem("accountid"));
  const [show, setshow] = useState(false);
  const userdetails = () => {
    const axios = require("axios");
    console.log("awdawd2");
    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/users/me/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        getmembdetails(response.data.id);
        sessionStorage.setItem("accountemail", response.data.email);
        sessionStorage.setItem("accountid", response.data.id);
        sessionStorage.setItem("accountusername", response.data.first_name);
        sessionStorage.setItem("accountmode", response.data.mode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getmembdetails = (membid) => {
    const axios = require("axios");

    let config = {
      method: "get",
      url:
        "https://backend-demo.revmd.co/api/v1/normal/membership-detail/" +
        membid +
        "/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setId(response.data);
        setshow(true);
      })
      .catch((error) => {
        message.error("Unable to load Membership Detals.");
      });
  };
  useEffect(() => {
    userdetails();
  }, [effect]);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink to="/dashboard/settings/basic">
              <span className="align-middle">Account Settings</span>
            </NavLink>
          ),
          icon: <SettingOutlined />,
        },
        {
          key: "2",
          label: (
            <a
              href="/"
              onClick={() => {
                sessionStorage.clear();
                localStorage.clear();
              }}
            >
              <span className="align-middle">Logout</span>
            </a>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#ddeefc" }}>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          trigger={null}
          width={sidewidth}
          breakpoint="lg"
          onBreakpoint={(broken) => {
            {
              broken ? setsidewidth(0) : setsidewidth(256);
            }
          }}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">
            <NavLink to={"/"}>
              <img
                style={{ zIndex: "-2" }}
                className="m-auto d-block pt-3"
                width={132}
                src="https://demo.revmd.io/static/revmd-logo.5a22c1db.png"
                alt=""
              />
            </NavLink>
          </div>

          <Menu theme="dark" mode="inline">
            <Menu.Item key={"memberprofile"}>
              <NavLink to={"/dashboard"}>
                <span>
                  <UserOutlined />
                  <span className="align-middle">Profile</span>
                </span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="d1">
              <NavLink to={"/dashboard/info"}>
                <span>
                  <DashboardOutlined />
                  <span className="align-middle">Dashboard</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="pack">
              <NavLink to={"packages"}>
                <span>
                  <MedicineBoxOutlined />
                  <span className="align-middle">Subscription History</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"paym"}>
              <NavLink to={"/dashboard/paymentmethods"}>
                {" "}
                <span>
                  <CreditCardOutlined />
                  <span className="align-middle">Payment Methods</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"depe"}>
              <NavLink to={""}>
                {" "}
                <span>
                  <UsergroupAddOutlined />
                  <span className="align-middle">Add Dependents</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"accountseting"}>
              <NavLink to={"settings/basic"}>
                {" "}
                <span>
                  <SettingOutlined />
                  <span className="align-middle">Account Settings</span>
                </span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ zIndex: "1" }} className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: "#ddeefc",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <span
              style={{ float: "right", height: 64, padding: 3 }}
              className="float-right pe-4 "
            >
              <Dropdown
                className="text-dark "
                arrow={{
                  pointAtCenter: true,
                }}
                overlay={menu}
                placement="bottom"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      width={35}
                      height={35}
                      className="rounded-circle me-2"
                      src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=939&q=80"
                    />
                    <Spin spinning={isloading} />
                    {username}
                  </Space>
                </a>
              </Dropdown>
            </span>
          </Header>
          <Content style={{ backgroundColor: "#ddeefc" }}>
            <div
              className="site-layout-background "
              style={{
                minHeight: 360,
                backgroundColor: "#ddeefc",
              }}
            >
              {show ? (
                <Routes>
                  <Route path="/" element={<MemberProfile />} />
                  <Route path="/packages" element={<Subbedpackages />} />
                  <Route path="/info" element={<Dashboardpage />} />
                  <Route path="/paymentmethods" element={<Payment />} />
                </Routes>
              ) : (
                <div style={{ position: "relative", height: "100vh" }}>
                  <Spin
                    style={{ position: "absolute", top: "40%", left: "50%" }}
                  />
                </div>
              )}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#ddeefc",
            }}
            onClick={() => {
              console.log(selectedkey);
            }}
          >
            Copyright © 2021 RevMD
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default MembDashboard;
