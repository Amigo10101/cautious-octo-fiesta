import React from "react";

import { Tabs } from "antd";

import Allpages from "./listpages";
function Listpages() {
  return (
    <div className="container p-3 pl-10">
      <Tabs className="" defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <div className="font-medium text-sm tracking-wide pb-5 px-4 ">
              PACKAGES
            </div>
          }
          key="1"
        >
          <Allpages />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div className="font-medium text-sm tracking-wide pb-5 ">PAGES</div>
          }
          key="2"
        >
          <></>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div className="font-medium text-sm tracking-wide pb-5 ">NEXT</div>
          }
          key="3"
        >
          <></>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Listpages;
