import React, { useState } from "react";
import { Button } from "antd";
import { Input, InputNumber } from "antd";
import { useRouter } from "next/router";
import { API } from "../../config/urls";
function Addpagesmain() {
  const route = useRouter();
  const [data, setdata] = useState({
    data: {
      name: "",
      price: null,
      data: {},
    },
  });
  function postdata(x) {
    event.preventDefault();
    var axios = require("axios");

    var config = {
      method: "post",
      url: API.postcontent,
      headers: {
        "Content-Type": "application/json",
      },
      data: data.data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        route.push("/packages");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="">
      <div className="max-w-md m-auto shadow-2xl p-4 rounded-xl mt-10 bg-teal-50">
        <h1 className="text-3xl font-bold text-center py-10 text-indigo-500">
          Add Page
        </h1>
        <div className=" ">
          <form
            className=""
            onSubmit={(x) => {
              postdata(x);
            }}
          >
            {[["Name"], ["Price", true]].map(([title, number, textbox]) => {
              return (
                <>
                  <div className="my-2 text-indigo-400  font-medium text-base">
                    *{title}:
                  </div>
                  <div>
                    {number === true ? (
                      <InputNumber
                        style={{ width: "100%", borderRadius: 5, padding: 5 }}
                        step="0.01"
                        placeholder={title}
                        className="p-3"
                        name="Data"
                        onChange={(x) => {
                          data.data.price = x;
                        }}
                        value={data.data.price}
                      />
                    ) : (
                      <Input
                        placeholder={title}
                        style={{ width: "100%", borderRadius: 5, padding: 8 }}
                        onChange={(x) => {
                          data.data.name = x.target.value;
                        }}
                      />
                    )}
                  </div>
                </>
              );
            })}
            <div className="container p-4 ">
              <div className="container md:w-25 hidden">
                <button className="m-2" block type="primary">
                  Add Custom Type
                </button>
              </div>
              <button type="submit">
                <div
                  className="text-xs transition ease-in-out delay-100 bg-indigo-700 p-3 px-7 text-white font-medium rounded-md hover:bg-indigo-500 hover:scale-110"
                  type="primary"
                >
                  <div className=" text-center ">Add Package</div>
                </div>
              </button>
            </div>
          </form>{" "}
        </div>
      </div>
    </div>
  );
}

export default Addpagesmain;
