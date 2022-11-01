import React, { useEffect, useState } from "react";
import Breadcums from "../utils/breadcums";
import { Button, Dropdown, Menu, Skeleton, Space, Spin, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  EllipsisOutlined,
  DollarCircleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { API } from "../config/urls";

function Listcontent() {
  const route = useRouter();
  const [data, setdata] = useState([]);
  const [processing, setprocessing] = useState(false);
  const [mainprocessing, setmainprocessing] = useState(true);
  const [selected, setselected] = useState([]);
  const [update, setupdate] = useState();
  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: API.getpackages,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setdata(response.data);
        setmainprocessing(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);
  function Indv({ x }) {
    function savedata(savedata) {
      setprocessing(true);

      var axios = require("axios");

      var data = JSON.stringify({
        data: {
          disabled: !savedata.disabled,
        },
      });

      var config = {
        method: "post",
        url: API.updatecontent + savedata.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response2) {
          setupdate(Math.random());
        })
        .catch(function (error) {
          console.log(error);
          setprocessing(false);
        });
    }
    function menu(x2) {
      return (
        <Menu
          items={[
            {
              label: (
                <button
                  onClick={() => {
                    savedata(x2);
                  }}
                >
                  {x2.disabled ? "Enable" : "Disable"}
                </button>
              ),
              key: "0",
            },
            {
              label: <Link href={`/contents/${x2.id}`}>Edit Content</Link>,
              key: "1",
            },
            {
              type: "divider",
            },
            {
              label: (
                <div
                  onClick={() => {
                    deletedata(x2);
                  }}
                  className="text-red-500"
                >
                  Delete Item
                </div>
              ),
              key: "3",
            },
          ]}
        />
      );
    }
    return (
      <div className="flex md:p-3 p-1 py-3 border rounded-lg my-2 bg-indigo-50">
        <div className="flex-initial md:w-40 w-10 font-semibold">{x.name}</div>
        <div className="flex-1 w-10">
          <div>
            <Switch
              className="m-auto  hidden"
              style={{
                margin: "auto",
                display: "block",
                backgroundColor: x.disabled ? "grey" : "rgb(67 56 202)",
              }}
              checked={x.disabled}
            />
          </div>
        </div>
        <div className="flex-1">2032-1231123 01:12</div>
        <div className="flex-none">
          <Space direction="horizontal">
            <button
              onClick={() => {
                route.push(`contents/${x.id}`);
              }}
              className="text-xs transition ease-in-out delay-100 bg-indigo-700 p-1 px-5 text-white font-medium rounded-xl hover:bg-indigo-500 hover:scale-110"
              type="primary"
            >
              <div className=" text-center ">Edit</div>
            </button>
            <Dropdown overlay={menu(x)} trigger={["hover"]}>
              <a>
                <EllipsisOutlined style={{ fontSize: 20 }} />
              </a>
            </Dropdown>
          </Space>
        </div>
      </div>
    );
  }
  function deletedata(x2) {
    var axios = require("axios");

    var config = {
      method: "post",
      url: API.deletepackage + x2.id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setupdate(Math.random());
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className=" md:p-8 p-2">
      <Breadcums data={["Home", "Content", "All Content"]} />

      <div className="flex my-10">
        <div className="flex-none text-5xl font-bold bg ">Contents </div>
        <div className="flex-1"></div>
        <div className="flex">
          <button className="text-xs bg " block type="primary">
            <span className="text-xs bg-indigo-700 p-3 px-7 text-white font-medium rounded-md  ">
              Add Package
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-nowrap p-3">
        <div className="flex-initial md:w-40 w-10">Name</div>
        <div className="flex-1 text-center pl-4 w-10">Status</div>
        <div className="flex-1 pl-5">Created On</div>
        <div className="flex-none">Options</div>
      </div>
      {mainprocessing ? (
        <>
          <Skeleton active />

          <Skeleton active />
        </>
      ) : (
        <div>
          {data.map((x, index) => {
            return <Indv x={x} key={index} />;
          })}
        </div>
      )}

      <div></div>
    </div>
  );
}

export default Listcontent;
