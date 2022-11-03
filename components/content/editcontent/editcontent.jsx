import { Collapse, message, Spin, Upload } from "antd";
import React, { useEffect, useState, useRef } from "react";

import Buttondiv from "../../utils/buttondiv";

import { API } from "../../config/urls";
import Imagebox from "./components/imagebox";

function Editcomponent({ content, id, wholedata2 }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const [data, setdata] = useState(wholedata2.content[content]);
  const [processing, setprocessing] = useState(false);
  const [savedata, setsavedata] = useState(wholedata2.content[content]);

  const { Panel } = Collapse;

  function Indv(props) {
    const contentdata = props.contentval;

    const [processing, setprocessing] = useState(false);

    function savethedata() {
      setprocessing(true);

      let pushdata = wholedata2.content;
      pushdata[content] = savedata;
      console.log(pushdata);
      var axios = require("axios");

      var data = JSON.stringify({
        data: wholedata2,
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
          message.success("Data Published");
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <div className="my-4">
        <Collapse
          defaultActiveKey={["1"]}
          style={{ borderRadius: 20, marginTop: 10 }}
          expandIconPosition={"end"}
          className={"shadow-xl "}
        >
          <Panel
            key="1"
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
                    savedata.main_name = xy.target.value;
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
          >
            <Collapse
              defaultActiveKey={["1", "header", "description", "image"]}
              expandIconPosition={"end"}
            >
              <Panel
                style={{ padding: 0 }}
                header={<div className="text-base font-semibold">Header</div>}
                key="header"
              >
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      savedata.header = data;
                    }}
                    data={contentdata.header}
                    className="border border-neutral-600 p-3 w-full"
                  />
                ) : (
                  "loading..."
                )}
              </Panel>
              <Panel
                style={{ padding: 0 }}
                header={
                  <div className="text-base font-semibold">Description</div>
                }
                key="description"
              >
                {editorLoaded ? (
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      savedata.description = data;
                    }}
                    data={contentdata.description}
                    className="border border-neutral-600 p-3 w-full"
                  />
                ) : (
                  "loading..."
                )}
              </Panel>
              <Panel
                style={{ padding: 0 }}
                header={<div className="text-base font-semibold">Image</div>}
                key="image"
              >
                <Imagebox
                  data={props}
                  value={(x) => {
                    savedata.image = x;
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
      <h1 className="text-center text-3xl font-bold">{data.main_name} Edit</h1>
      <div className="rounded-2xl shadow-2xl p-3">
        <Indv contentval={data} />
      </div>
    </div>
  );
}

export default Editcomponent;
