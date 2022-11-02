import { Collapse, message, Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";

import Buttondiv from "../../utils/buttondiv";

import { API } from "../../config/urls";
import Imagebox from "./components/imagebox";

function Editcomponent({ id }) {
  const [data, setdata] = useState({ content: [] });
  const [processing, setprocessing] = useState(true);
  const [isnew, setisnew] = useState(false);
  const [mainprocessing, setmainprocessing] = useState(false);
  const [savedata, setsavedata] = useState([]);
  const [newname, setnewname] = useState({ name: "" });

  const { Panel } = Collapse;

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
        setsavedata(response.data.content);
        setprocessing(false);
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
  }, [id]);

  function Addnew() {
    function savenew() {
      console.log("syc");
      var axios = require("axios");
      let dw = savedata;
      dw.push({
        main_name: newname.name,
        description: "",
        header: "",
        image: [],
      });
      var data = JSON.stringify({
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
        data: data,
      };

      axios(config)
        .then(function (response) {
          setdata(response.data);
          setsavedata(response.data.content);
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

  function Indv(props) {
    const contentdata = props.contentval;

    const [processing, setprocessing] = useState(false);

    function savethedata() {
      setprocessing(true);
      console.log("syc");
      var axios = require("axios");

      var data = JSON.stringify({
        data: {
          content: savedata,
        },
      });

      var config = {
        method: "post",
        url: API.updatecontent + props.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setdata(response.data);
          setsavedata(response.data.content);
          setprocessing(false);
          message.success("Data Updated");
        })
        .catch(function (error) {
          console.log(error);
          setprocessing(false);
        });
    }

    return (
      <div className="my-4">
        <Collapse
          style={{ borderRadius: 20, marginTop: 10 }}
          defaultActiveKey={["1"]}
          expandIconPosition={"end"}
          className={"shadow-xl "}
        >
          <Panel
            extra={
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  savethedata();
                }}
                className="cursor-pointer text-xs transition ease-in-out delay-100 bg-indigo-700 p-3 px-7 text-white font-medium rounded-md m-4 hover:bg-indigo-500 hover:scale-110"
              >
                <div>Save</div>
              </button>
            }
            header={
              <div>
                <input
                  onChange={(xy) => {
                    savedata[props.index].main_name = xy.target.value;
                  }}
                  defaultValue={contentdata.main_name}
                  className="border p-3 my-3 font-we w-full block rounded-xl font-normal "
                  type="text"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              </div>
            }
            key="23"
          >
            <Collapse defaultActiveKey={["1"]} expandIconPosition={"end"}>
              <Panel
                style={{ padding: 0 }}
                header={<div className="text-base font-semibold">Header</div>}
                key="header"
              >
                <textarea
                  onChange={(xy) => {
                    savedata[props.index].header = xy.target.value;
                  }}
                  defaultValue={contentdata.header}
                  className="border border-neutral-600 p-3 w-full text-base font-bold"
                />
              </Panel>
              <Panel
                style={{ padding: 0 }}
                header={
                  <div className="text-base font-semibold">Description</div>
                }
                key="description"
              >
                <textarea
                  onChange={(xy) => {
                    savedata[props.index].description = xy.target.value;
                  }}
                  defaultValue={contentdata.description}
                  className="border border-neutral-600 p-3 w-full"
                />
              </Panel>
              <Panel
                style={{ padding: 0 }}
                header={<div className="text-base font-semibold">Image</div>}
                key="image"
              >
                <Imagebox
                  data={props}
                  value={(x) => {
                    savedata[props.index].image = x;
                  }}
                />
              </Panel>

              <div className="p-5">
                <Buttondiv value={"Add Custom data "} />
              </div>
            </Collapse>
          </Panel>
          <div style={{ height: 20 }}></div>
        </Collapse>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-2xl p-3">
      <div className="rounded-2xl shadow-2xl p-3">
        {processing ? (
          <Spin />
        ) : (
          data.content &&
          data.content.map((x, index) => {
            return <Indv contentval={x} id={id} index={index} key={index} />;
          })
        )}
        {data.content.length === 0 ? (
          <div className="text-center py-10">No Content</div>
        ) : null}
      </div>
      {isnew ? (
        <div className="my-5">
          <Addnew />
        </div>
      ) : (
        <div className="p-5">
          <div onClick={() => setisnew(true)}>
            <Buttondiv value={"Add "} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Editcomponent;
