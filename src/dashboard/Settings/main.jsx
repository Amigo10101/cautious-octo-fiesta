import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import {Route,Routes,Link} from "react-router-dom"
import React from 'react';
import Basic from "./settingstype/basic"
import Advanced from "./settingstype/advanced"
const { Header, Content, Footer, Sider } = Layout;

const Settingsmain = () => (
  <Layout className='p-4'>
    
    <Content
      style={{
        
      }}
    >
      
      <Layout
        className="site-layout-background py-3"
        style={{
          
        }}
      >
        <Sider style={{position:'relative'}} className="site-layout-background" width={200}>
          <Menu defaultSelectedKeys={'awd'}>
            <Menu.Item key={"awd"}><Link to={'./basic'}>Basic Settings</Link></Menu.Item>
            <Menu.Item key={"awdwad"}><Link to={'./advanced'}>Advanced Settings</Link></Menu.Item>

          </Menu>
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path='basic' element={<Basic/>}/>
            <Route path='advanced' element={<Advanced/>}/>

          </Routes>
        </Content>
      </Layout>
    </Content>
   
  </Layout>
);

export default Settingsmain;