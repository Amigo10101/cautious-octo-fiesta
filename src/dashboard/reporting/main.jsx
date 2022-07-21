import { Tabs } from "antd";
import React from "react";
import Memberreport from "./memberreport";
import Officereport from "./officereport";
import Userreport from "./userreport";
const { TabPane } = Tabs;
export default function ReportingMain() {
  return (
    <div className="bg-white">
      <Tabs centered defaultActiveKey="1" >
        <TabPane onclick={()=>console.log("aaaaaa2222wdawd")} tab="All Offices Report" key="1">
          <Officereport />
        </TabPane>{" "}
        <TabPane tab="All User Report" key="3">
          <Userreport />
        </TabPane>
        <TabPane tab="All Membership Report" key="2">
          <Memberreport />
        </TabPane>
      </Tabs>
    </div>
  );
}
