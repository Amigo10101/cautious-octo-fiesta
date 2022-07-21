import React, { useState, useEffect } from "react";
import MainRegisteredMember from "../registered/member/main";
import MainRegisteredUser from "../registered/User/main";
import MainRegisteredOffice from "../registered/office/main";
import "./style1.css";
import MainaddUser from "../add Userr/main";
import MainaddMember from "../add Member/main";
import Mainaddoffice from "../add office/main";
import MainAnalysis from "../analytics/main";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useToken from "../../useToken";
import useId from "../../useId";

import { Layout, Menu, Breadcrumb, Spin } from "antd";
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
  LogoutOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Icon } from "@mui/material";
import RetrieveMain from "../Retrieve Member/main";
import SettingsMain from "../Settings/main";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Apiapp from "../apiapplication/main";
import Mainadminsideapi from "../apiadminside/member/main";
import { Tokencontext } from "../../usecontext";
import Reportingmain from "../reporting/main";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
export const Dashboard = () => {
  const { Id, setId } = useId();
  const { token, setToken } = useToken();
  const [collapsed, setCollapsed] = useState(false);
  const [sidewidth, setsidewidth] = useState("256px");
  const [selectedkey, setselectedkey] = useState("d1");
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [accountdata, setaccountdata] = useState();
  const [username, setusername] = useState();
  const [effect, seteffect] = useState();
  const [isloading, setisloading] = useState(true);
  const [offon, setoffon] = useState(false);
  const [mode, setmode] = useState("");
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
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
        console.log("dashboard");
        setisloading(false);
        sessionStorage.setItem("accountemail", response.data.email);
        sessionStorage.setItem("accountid", response.data.id);
        sessionStorage.setItem("accountusername", response.data.first_name);
        sessionStorage.setItem("accountmode", response.data.mode);
        setmode(response.data.mode);
        sessionStorage.setItem("affoffice", response.data.affiliated_office);
        setId(response.data);
        setusername(response.data.first_name);
        setaccountdata(response.data);
        setoffon(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userdetails();
  }, [effect]);
  return (
    <div>
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

          <Menu
            className=""
            theme="dark"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <DashboardOutlined />
                  <span className="align-middle">Dashboard</span>
                </span>
              }
            >
              <Menu.Item key="d1">
                <NavLink to={"/dashboard"}>Analysis</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <DatabaseOutlined />
                  <span className="align-middle">Office Management</span>
                </span>
              }
            >
              <Menu.Item key="o1">
                <NavLink to={"office/registeredoffices"}>
                  {({ isActive }) =>
                    isActive ? setselectedkey("o1") : console.log("awdad")
                  }
                  Registered Offices
                </NavLink>
              </Menu.Item>
              <Menu.Item key="o2">
                <NavLink
                  reloadDocument
                  to="office/addoffice/step1"
                  onClick={() => {
                    sessionStorage.removeItem("__LSM__");
                  }}
                >
                  Add Office
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <UserOutlined />
                  <span className="align-middle">User Management</span>
                </span>
              }
            >
              <Menu.Item key="u1">
                <NavLink className="active" to={"user/registeredusers"}>
                  Registered Users
                </NavLink>
              </Menu.Item>
              <Menu.Item key="u2">
                <NavLink to={"user/addusers/step1"} />
                Add User
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <UsergroupAddOutlined />
                  <span className="align-middle">Membership</span>
                </span>
              }
            >
              <Menu.Item key="m1">
                <NavLink to={"member/registeredmembers"}>Memberships</NavLink>
              </Menu.Item>
              {mode === "O" ? (
                <Menu.Item key="m2">
                  <NavLink
                    onClick={() => {
                      sessionStorage.removeItem("__LSM__");
                    }}
                    reloadDocument
                    to={"member/addmembers/step1"}
                  />
                  New Membership
                </Menu.Item>
              ) : (
                <></>
              )}
            </SubMenu>
            <Menu.Item key={"reporting"}>
              <NavLink to={"reporting"}>
                {" "}
                <span>
                  <SettingOutlined />
                  <span className="align-middle">Reporting</span>
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
            {mode === "A" ? (
              <Menu.Item key={"retreive member"}>
                <NavLink to={"retrieve"}>
                  <span>
                    <UserOutlined />
                    <span className="align-middle">Retrieve Member</span>
                  </span>
                </NavLink>
              </Menu.Item>
            ) : (
              <></>
            )}
            {mode === "O" ? (
              <Menu.Item key={"api"}>
                <a href="/dashboard/api/">
                  {" "}
                  <span>
                    <ApiOutlined />
                    <span className="align-middle">APi Apps</span>
                  </span>
                </a>
              </Menu.Item>
            ) : (
              <Menu.Item key={"regapi"}>
                <NavLink to="/dashboard/registeredapis">
                  {" "}
                  <span>
                    <ApiOutlined />
                    <span className="align-middle">Registered Apis</span>
                  </span>
                </NavLink>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout style={{ zIndex: "1" }} className="site-layout bgrey">
          <Header
            className="site-layout-background mb-1  "
            style={{
              padding: 0,
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
          <div className="">
            <div>
              <Tokencontext.Provider value={accountdata}>
                {offon ? (
                  <Routes>
                    <Route path="/" element={<MainAnalysis />} />
                    {mode === "A" ? (
                      <Route path="retrieve" element={<RetrieveMain />} />
                    ) : (
                      <></>
                    )}
                    <Route path="reporting/*" element={<Reportingmain />} />
                    <Route path="settings/*" element={<SettingsMain />} />
                    <Route path="member/*">
                      <Route
                        path="registeredmembers/*"
                        element={<MainRegisteredMember />}
                      />
                      <Route path="addmembers/*" element={<MainaddMember />} />
                    </Route>
                    <Route path="office/*">
                      <Route
                        path="registeredoffices/*"
                        element={<MainRegisteredOffice />}
                      />
                      <Route path="addoffice/*" element={<Mainaddoffice />} />
                    </Route>
                    <Route path="user/*">
                      <Route
                        path="registeredusers"
                        element={<MainRegisteredUser />}
                      />
                      <Route path="addusers/*" element={<MainaddUser />} />
                    </Route>
                    <Route path="api/*" element={<Apiapp />} />
                    <Route
                      path="registeredapis"
                      element={<Mainadminsideapi />}
                    />
                  </Routes>
                ) : (
                  <div style={{ position: "relative", height: "100vh" }}>
                    <Spin
                      style={{ position: "absolute", top: "40%", left: "50%" }}
                    />
                  </div>
                )}
              </Tokencontext.Provider>
            </div>
          </div>
          <Footer
            className="bgrey"
            style={{
              textAlign: "center",
            }}
            onClick={() => {}}
          >
            Copyright © 2021 RevMD
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
