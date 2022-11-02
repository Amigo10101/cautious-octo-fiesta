import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Buttond from "../../utils/button";
import { API } from "../../config/urls";
import Editcomponent from "./editcontent";
import Editpackaged from "./editpackagedetail";
import Breadcums from "../../utils/breadcums";
function Editcontent({ id }) {
  const [data, setdata] = useState([]);

  function getdata() {
    var axios = require("axios");

    var config = {
      method: "get",
      url: API.getpages + id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setdata(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  return (
    <div className="max-w-screen-lg m-auto py-5">
      <Breadcums data={["Home", "Contents", "Edit Content", id]} />
      <div className="grid grid-cols-3 py-4">
        <div className="col-span-2">
          <Tabs
            type="card"
            className="text-white bg-white rounded-2xl"
            defaultActiveKey="1"
          >
            <Tabs.TabPane
              tab={
                <div className="font-medium text-sm tracking-wide px-5 rounded-xl">
                  Content
                </div>
              }
              key="1"
            >
              <div className="bg-white p-2">
                <Editcomponent id={id} first_data={data} />
              </div>
              <></>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <div className="font-medium text-sm tracking-wide px-5 ">
                  Meta
                </div>
              }
              key="2"
            >
              <></>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <div className="font-medium text-sm tracking-wide px-5 ">
                  SEO
                </div>
              }
              key="3"
            >
              <></>
            </Tabs.TabPane>
          </Tabs>
        </div>
        <Editpackaged id={id} first_data={data} />
      </div>
    </div>
  );
}

export default Editcontent;
