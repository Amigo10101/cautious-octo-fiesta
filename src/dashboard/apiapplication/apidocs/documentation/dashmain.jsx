import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "./info/info1";
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
  LogoutOutlined,
  InfoCircleOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Icon } from "@mui/material";

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Apidetails from "./info/main";

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
          <NavLink
            to={"/"}
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            <span className="align-middle">Logout</span>
          </NavLink>
        ),
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

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
function Apidashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidewidth, setsidewidth] = useState("256px");
  const [selectedkey, setselectedkey] = useState("d1");
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

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
            console.log("wad", broken);
            {
              broken = false ? setsidewidth("0") : setsidewidth("256px");
            }
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
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
            defaultSelectedKeys={selectedkey}
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            <Menu.Item key="i">
              <NavLink to={"/dashboard"}>
                <InfoCircleOutlined />
                <span className="align-middle">Introduction</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="wb">
              <NavLink to={"/dashboard"}>
                <CodeOutlined />
                <span className="align-middle">Webhooks</span>
              </NavLink>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <DatabaseOutlined />
                  <span className="align-middle">Tours</span>
                </span>
              }
            >
              <Menu.Item key="o1">
                <NavLink to={"office/registeredoffices"}>
                  {({ isActive }) =>
                    isActive ? setselectedkey("o1") : undefined
                  }
                  Registered Offices
                </NavLink>
              </Menu.Item>
              <Menu.Item key="o2">
                <NavLink to={"office/addoffice/step1"}>Add Office</NavLink>
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
                <NavLink to={"user/registeredusers"}>Registered Users</NavLink>
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
              <Menu.Item key="m2">
                <NavLink to={"member/addmembers/step1"} />
                Add Member
              </Menu.Item>
            </SubMenu>
            <Menu.Item key={"accountseting"}>
              <NavLink to={"settings/basic"}>
                {" "}
                <span>
                  <SettingOutlined />
                  <span className="align-middle">Account Settings</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"retreive member"}>
              <NavLink to={"retrieve"}>
                <span>
                  <UserOutlined />
                  <span className="align-middle">Retrieve Member</span>
                </span>
              </NavLink>
            </Menu.Item>
          </Menu>
          <Menu className="d-none" theme="dark" mode="inline">
            <Menu.Item key={"memberprofile"}>
              <NavLink to={"memberprofile"}>
                <span>
                  <UserOutlined />
                  <span className="align-middle">Profile</span>
                </span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="d1">
              <NavLink to={"memberdashboard"}>
                <span>
                  <DashboardOutlined />
                  <span className="align-middle">Dashboard</span>
                </span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key={"paym"}>
              <NavLink to={""}>
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
              className="float-right pe-3 "
            >
              <Dropdown className="text-dark" overlay={menu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      width={35}
                      height={35}
                      className="rounded-circle me-2"
                      src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=939&q=80"
                    />
                    User
                  </Space>
                </a>
              </Dropdown>
            </span>
          </Header>
          <Content>
            <div
              className="site-layout-background "
              style={{
                minHeight: 360,
                overflowX: "hidden",
              }}
            >
              <Routes>
                <Route path="/" element={<Apidetails />} />
              </Routes>
            </div>
          </Content>
          <Footer
          className="fw-light"
            style={{
              textAlign: "center",
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

export default Apidashboard;
