import React, { useState } from "react";

import { Layout, Menu, Spin } from "antd";

import Link from "next/link";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  CreditCardOutlined,
  MedicineBoxOutlined,
  LogOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Buttondiv from "../utils/buttondiv";

const { Header, Content, Footer, Sider } = Layout;
function Sidebar({ inside }) {
  const route = useRouter();
  const [permissions, setpermissions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [sidewidth, setsidewidth] = useState("256px");
  const [selectedkey, setselectedkey] = useState("d1");
  const [openKeys, sehrefpenKeys] = useState(["sub1"]);
  const [accountdata, setaccountdata] = useState();
  const [username, setusername] = useState();
  const [effect, seteffect] = useState();
  const [isloading, setisloading] = useState(true);
  const [offon, sehrefffon] = useState(false);
  const [mode, setmode] = useState("");
  const [show, setshow] = useState(true);

  return (
    <div style={{ overflowX: "hidden", backgroundColor: "#ffffff" }}>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{ border: "none" }}
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
          <div className="logo my-4 border-b border-slate-800 py-2">
            <Link href={"/"}>
              <div>
                <div className="text-center text-white font-bold text-2xl  ">
                  Telhealth
                </div>
              </div>
            </Link>
          </div>

          <Menu theme="dark" mode="inline">
            <Buttondiv to="/packages" value={"Packages"} />

            <Buttondiv to="/addpackage" value={"Add Packages"} />
            <Buttondiv to="/contents" value={"Edit Contents"} />
            <Buttondiv to="/images" value={"Images"} />
          </Menu>
        </Sider>  

        <Content style={{ backgroundColor: "#f9f9f9" }}>
          <div
            className="site-layout-background "
            style={{
              minHeight: 360,
              backgroundColor: "#f9f9f9",
            }}
          >
            {show ? (
              inside
            ) : (
              <div style={{ position: "relative", height: "100vh" }}>
                <Spin
                  style={{ position: "absolute", hrefp: "40%", left: "50%" }}
                />
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Sidebar;
