import React from "react";

import { Tabs } from "antd";
import Allpackages from "./packages";
function Listpage() {
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
          <Allpackages />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div className="font-medium text-sm tracking-wide pb-5 ">PAGES</div>
          }
          key="2"
        >
          <Allpackages />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div className="font-medium text-sm tracking-wide pb-5 ">NEXT</div>
          }
          key="3"
        >
          <Allpackages />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Listpage;
