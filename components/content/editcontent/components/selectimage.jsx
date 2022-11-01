import { Menu, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API } from "../../../config/urls";
import Buttondiv from "../../../utils/buttondiv";
function SelectImage(props) {
  const [mainprocessing, setmainprocessing] = useState(false);
  const [data, setdata] = useState([]);
  const [update, setupdate] = useState();
  const [modal, setmodal] = useState(false);
  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: API.getimages,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setdata(response.data);
        setmainprocessing(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  function Indv({ x }) {
    function deleteimage(imgid) {
      props.value(imgid);
    }
    const [indvdata, setindvdata] = useState(x);

    return (
      <div className="border border-slate-300 rounded-xl bg-white shadow-2xl ">
        <img
          src={`../uploads/${x.url}`}
          alt=""
          width={300}
          style={{
            height: 200,
            objectFit: "contain",
            display: "block",
            margin: "auto",
          }}
        />

        <div className="border-t p-7 py-7">
          <div
            onClick={() => {
              deleteimage(x);
            }}
            className="cursor-pointer text-xs transition ease-in-out delay-100 bg-indigo-700 p-3 px-7 text-white font-medium rounded-md hover:bg-indigo-500 hover:scale-110"
            type="primary"
          >
            <div className=" text-center ">Select</div>
          </div>
        </div>
      </div>
    );
  }
  function Imageuploadcomponent() {
    const [image, setImage] = useState(null);
    const [imagedata, setimagedata] = useState(null);
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
        setimagedata(event.target.files[0]);
      }
    };
    async function uploadimg() {
      const formData = new FormData();
      formData.append("file", imagedata);

      const res = await fetch("http://localhost:3000/api/images/add_image", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      message.success("Imaged Added");
      setmodal(false);
      setupdate(Math.random());
    }
    return (
      <>
        <div>
          <input
            hidden
            id="image"
            type="file"
            onChange={onImageChange}
            className="filetype"
            accept="image/*"
          />
          {image === null ? (
            <>
              <div className="text-center">No Image Selected</div>{" "}
              <label htmlFor="image">
                <Buttondiv value="Upload New" />
              </label>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 border m-4 p-2 gap-3">
                <img
                  src={image}
                  alt="preview image"
                  style={{
                    display: "block",
                    margin: "auto",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <span>{imagedata.name}</span>
                  <div>
                    {(parseInt(imagedata.size) / 1048576).toFixed(2)} Mb
                  </div>
                </div>
                <div
                  onClick={() => {
                    setImage(null);
                    setimagedata(null);
                  }}
                >
                  <Buttondiv value="Delete" />
                </div>
              </div>

              <div
                onClick={() => {
                  uploadimg();
                }}
              >
                <Buttondiv value="Upload" />
              </div>
            </>
          )}
        </div>
        <div
          onClick={() => {
            setmodal(false);
          }}
        >
          <Buttondiv key="back" value="Cancel">
            Return
          </Buttondiv>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="">
        <div className="flex my-10">
          <div className="flex-none text-5xl font-bold bg ">Images </div>
          <div className="flex-1"></div>
          <div className="flex">
            <button
              onClick={() => {
                setmodal(true);
              }}
              className="text-xs bg "
              block
              type="primary"
            >
              <span className="text-xs bg-indigo-700 p-3 px-7 text-white font-medium rounded-md  ">
                Add Image
              </span>
            </button>
          </div>
        </div>

        {mainprocessing ? (
          <Spin />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {data.map((x, index) => {
              return <Indv x={x} key={index} />;
            })}
          </div>
        )}
        <Modal
          open={modal}
          onCancel={() => {
            setmodal(false);
          }}
          footer={[]}
        >
          <Imageuploadcomponent />
        </Modal>
        <div></div>
      </div>
    </div>
  );
}

export default SelectImage;
