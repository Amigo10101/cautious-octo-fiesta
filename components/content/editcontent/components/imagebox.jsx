import { Modal } from "antd";

import React, { useEffect, useState } from "react";

import Buttondiv from "../../../utils/buttondiv";
import SelectImage from "./selectimage";

function Imagebox(props) {
  const [isnew, setisnew] = useState(false);
  const [newname, setnewname] = useState({ name: null });
  const [processing, setprocessing] = useState();
  const [urls, seturls] = useState(props.data.contentval.image);

  function Indv({ x, index }) {
    const [selectedFile, setSelectedFile] = useState(x.url);
    const [indvmodal, setindvmodal] = useState(false);
    return (
      <>
        <div className="shadow-lg border p-3 rounded-xl">
          <div className="grid grid-cols-2">
            <input
              placeholder="Enter a Name for content "
              className="border p-3 my-3 font-we w-full block rounded-xl font-normal "
              type="text"
              value={x.name}
            />
            <div
              onClick={() => {
                let array = [];
                urls.map((x2, y2) => {
                  {
                    y2 === index ? null : array.push(x2);
                  }
                });
                props.value(array);
                seturls(array);
              }}
            >
              <Buttondiv value="Delete" />
            </div>
          </div>

          <img
            width={200}
            src={`../uploads/${x.url}`}
            alt=""
            style={{
              display: "block",
              margin: "auto",
              objectFit: "cover",
              height: 150,
            }}
          />
          <div
            onClick={() => {
              setindvmodal(true);
            }}
          >
            <Buttondiv value="Select New" />
          </div>
          <Modal
            width="80%"
            title="Select Image"
            open={indvmodal}
            onCancel={() => {
              setindvmodal(false);
            }}
            footer={[]}
          >
            <SelectImage
              value={(x2) => {
                setSelectedFile(x2.url);
                setindvmodal(false);
                urls[index].url = x2.url;
              }}
            />
          </Modal>
        </div>
      </>
    );
  }

  function Addnew() {
    const [selectedimage, setselectedimage] = useState(null);
    const [modal, setmodal] = useState(false);

    function savenew() {
      urls.push({ name: newname.name, url: selectedimage.url });
      props.value(urls);
      setisnew(false);
    }

    return (
      <>
        <div className="p-3 shadow-xl rounded-2xl border">
          <div className="grid grid-cols-2">
            <input
              placeholder="Enter a Name for content "
              className="border p-3 my-3 font-we w-full block rounded-xl font-normal "
              type="text"
              onChange={(event) => {
                newname.name = event.target.value;
              }}
            />

            <div
              className="cursor-pointer grid grid-cols-2"
              onClick={() => {
                setmodal(true);
              }}
            >
              {selectedimage === null ? (
                <></>
              ) : (
                <>
                  <img
                    src={`../uploads/${selectedimage.url}`}
                    alt=""
                    style={{
                      display: "block",
                      margin: "auto",
                      objectFit: "cover",
                      width: 50,
                    }}
                  />
                </>
              )}
              <Buttondiv value="Select Image" />
            </div>
          </div>
          {selectedimage === null ? (
            <></>
          ) : (
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
                Save Selected Image
              </div>
            </div>
          )}

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
        <Modal
          width="80%"
          title="Select Image"
          open={modal}
          onCancel={() => {
            setmodal(false);
          }}
          footer={[]}
        >
          <SelectImage
            value={(x) => {
              setselectedimage(x);
              setmodal(false);
            }}
          />
        </Modal>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 m-auto gap-4">
        {urls.map((x, index) => {
          return <Indv x={x} index={index} key={index} />;
        })}
        <div></div>
      </div>
      {isnew ? (
        <div className="my-5">
          <Addnew />
        </div>
      ) : (
        <div className="p-5">
          <div onClick={() => setisnew(true)}>
            <Buttondiv value={"Add New Image "} />
          </div>
        </div>
      )}
    </>
  );
}

export default Imagebox;
