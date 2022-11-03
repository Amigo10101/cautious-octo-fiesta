import { message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Buttond from "../../utils/button";
import { API } from "../../config/urls";
import Editcomponent from "./editcontent";
import Breadcums from "../../utils/breadcums";
import Editpackaged from "./editpackagedetail";
import { Button, Dropdown, Menu, Skeleton, Space, Spin, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  EllipsisOutlined,
  DollarCircleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import Buttondiv from "../../utils/buttondiv";
let wholedata = [{}];
function Maineditcontent({ id }) {
  const [editmode, seteditmode] = useState(false);
  const [editcontent, seteditcontent] = useState({});

  function Editcontentmode({ id }) {
    const [data, setdata] = useState(wholedata);

    return (
      <div className="max-w-screen-lg m-auto py-5">
        <Breadcums data={["Home", "Contents", "Edit Content", id]} />
        <div className="">
          <div className="col-span-2">
            <Editcomponent
              content={editcontent}
              id={id}
              wholedata2={wholedata}
            />
          </div>
        </div>
      </div>
    );
  }

  function Listcontent({ id }) {
    const route = useRouter();
    const [data, setdata] = useState([]);
    const [processing, setprocessing] = useState(false);
    const [mainprocessing, setmainprocessing] = useState(false);
    const [selected, setselected] = useState([]);
    const [update, setupdate] = useState();
    const [isnew, setisnew] = useState(false);
    const [newname, setnewname] = useState({ name: "" });
    function getdata() {
      var axios = require("axios");

      var config = {
        method: "get",
        url: API.getpages + id,
        headers: {},
      };

      axios(config)
        .then(function (response) {
          setdata(response.data.content);

          wholedata = response.data;
          console.log(wholedata);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    useEffect(() => {
      if (!id) {
        return;
      }
      getdata();
    }, []);
    function Indv({ x, index }) {
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
          <div className="flex-initial md:w-40 w-10 font-semibold">
            {x.main_name}
          </div>
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
                  seteditmode(true);
                  seteditcontent(index);
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
        url: API.deletepage + x2.id,
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
    function Addnew() {
      function savenew() {
        console.log(data);
        var axios = require("axios");
        let dw = data;
        dw.push({
          main_name: newname.name,
          description: "",
          header: "",
          image: [],
        });
        var data2 = JSON.stringify({
          data: {
            content: dw,
          },
        });

        var config = {
          method: "post",
          url: API.updatecontent + id,
          headers: {
            "Content-Type": "application/json",
          },
          data: data2,
        };

        axios(config)
          .then(function (response) {
            setdata(response.data.content);

            setprocessing(false);
            message.success("New Added");
            newname.name = "";
            setisnew(false);
          })
          .catch(function (error) {
            console.log(error);
            setprocessing(false);
          });
      }
      return (
        <div className="p-3 shadow-xl rounded-2xl border">
          <div>
            <input
              placeholder="Enter a Name for content "
              className="border p-3 my-3 font-we w-full block rounded-xl font-normal "
              type="text"
              onChange={(xy) => {
                newname.name = xy.target.value;
              }}
              defaultValue={newname.name}
            />
          </div>{" "}
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="cursor-pointer text-xs transition ease-in-out delay-100 bg-indigo-700 p-3  px-7 text-white font-medium rounded-md m-4 hover:bg-indigo-500 hover:scale-110"
            type="primary"
          >
            <div
              onClick={() => {
                savenew();
              }}
              className=" text-center "
            >
              Save New
            </div>
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="cursor-pointer text-xs transition ease-in-out delay-100 bg-indigo-700 p-3  px-7 text-white font-medium rounded-md m-4 hover:bg-indigo-500 hover:scale-110"
            type="primary"
          >
            <div
              onClick={() => {
                setisnew(false);
              }}
              className=" text-center "
            >
              Cancel
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className=" md:p-8 p-2">
        <Breadcums data={["Home", "Page", "Content"]} />

        <div className="flex my-10">
          <div className="flex-none text-5xl font-bold bg ">
            {wholedata.name}Contents{" "}
          </div>
          <div className="flex-1"></div>
          <div className="flex">
            <button
              onClick={() => {
                console.log(wholedata);
              }}
              className="text-xs bg "
              block
              type="primary"
            >
              <span className="text-xs bg-indigo-700 p-3 px-7 text-white font-medium rounded-md  ">
                Add Pages
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
              return <Indv x={x} key={index} index={index} />;
            })}
          </div>
        )}

        <div>
          {isnew ? (
            <div className="my-5">
              <Addnew />
            </div>
          ) : (
            <div className="p-5 ">
              <div onClick={() => setisnew(true)}>
                <Buttondiv value={"Add "} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {editmode ? (
        <Editcontentmode editcontent={editcontent} id={id} />
      ) : (
        <Listcontent id={id} />
      )}
    </>
  );
}
export default Maineditcontent;
