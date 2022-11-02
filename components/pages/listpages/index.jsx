import React, { useEffect, useState } from "react";
import Breadcums from "../../utils/breadcums";
import { Button, Dropdown, Menu, Space, Spin } from "antd";
import { useRouter } from "next/router";
import {
  EllipsisOutlined,
  DollarCircleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { API } from "../../config/urls";
import Link from "next/link";
function Allpages() {
  const [data, setdata] = useState([]);
  const [selected, setselected] = useState({ disabled: null });
  const [update, setupdate] = useState();
  const [mainprocesing, setmainprocesing] = useState(true);
  const [processing, setprocessing] = useState(false);
  const route = useRouter();

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: API.getpages,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setdata(response.data);
        setmainprocesing(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  function deletedata(x) {
    var axios = require("axios");

    var config = {
      method: "post",
      url: API.deletepage + x,
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
  function Indv({ x }) {
    const [indvdata, setindvdata] = useState(x);
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
          indvdata.disabled = response2.data.disabled;
          console.log(indvdata);
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
                    deletedata(x2.id);
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
      <div className="border border-slate-300 rounded-xl bg-white shadow-2xl ">
        <div className="flex p-4">
          <div className="flex-1">
            <div className="font-bold text-base"> {indvdata.name}</div>
            <div className="text-slate-500 text-xs">
              Status:{" "}
              {indvdata.disabled ? (
                <span className="font-bold text-red-500 text-sm">Disabled</span>
              ) : (
                <span className="font-bold text-indigo-500 text-sm">
                  Running
                </span>
              )}
            </div>
          </div>
          <div className="flex-none">
            <Dropdown overlay={menu(indvdata)} trigger={["hover"]}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <EllipsisOutlined style={{ fontSize: 20 }} />
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="border-y p-4">
          <div className="grid grid-cols-2">
            <div className="border-r p-4 py-2">
              <div className="text-center text-slate-600 my-4"> Price</div>
              <div>
                <DollarCircleOutlined
                  style={{ fontSize: 30, color: "rgb(99 102 241)" }}
                />
                <span className="font-bold text-center float-right text-lg">
                  ${x.price}
                </span>
              </div>
            </div>
            <div className="border-l p-4 py-2">
              <div className="text-center text-slate-600 my-4"> Contents</div>
              <div>
                <OrderedListOutlined
                  style={{ fontSize: 30, color: "rgb(99 102 241)" }}
                />
                <span className="font-bold text-center float-right text-lg">
                  {x.content.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t p-7 py-7">
          <div
            onClick={() => {
              route.push(`contents/${x.id}`);
            }}
            className="text-xs transition ease-in-out delay-100 bg-indigo-700 p-3 px-7 text-white font-medium rounded-md hover:bg-indigo-500 hover:scale-110"
            type="primary"
          >
            <div className=" text-center ">Edit page</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-5">
      <Breadcums data={["Home", "Content", "pages", "List pages"]} />

      <div className="flex my-10">
        <div className="flex-none text-5xl font-bold bg ">Pages </div>
        <div className="flex-1"></div>
        <div className="flex">
          <button
            onClick={() => {
              route.push("/add_pages");
            }}
            className="text-xs bg "
            block
            type="primary"
          >
            <span className="text-xs bg-indigo-700 p-3 px-7 text-white font-medium rounded-md  ">
              Add page
            </span>
          </button>
        </div>
      </div>
      {mainprocesing ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {data.map((x, index) => {
            return <Indv x={x} key={index} />;
          })}
        </div>
      )}

      <div></div>
    </div>
  );
}

export default Allpages;
