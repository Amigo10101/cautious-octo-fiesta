import React, { useDebugValue, useEffect, useState } from "react";
import Buttond from "../../utils/button";
import { useRouter } from "next/router";
import { API } from "../../config/urls";
import { useForm } from "react-hook-form";
import { message, Skeleton } from "antd";
function Editpackaged({ id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => savedata(data);
  console.log(errors);
  const route = useRouter();
  const [data, setdata] = useState({ name: "", price: "" });
  const [processing, setprocessing] = useState(true);

  function getdata(x) {
    var axios = require("axios");

    var config = {
      method: "get",
      url: API.getpackages + id,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setdata(response.data);
        setprocessing(false);
      })
      .catch(function (error) {
        console.log(error);
        console.log("yhis", process);
      });
  }
  function savedata(xw) {
    setprocessing(true);
    console.log("syc");
    var axios = require("axios");

    var data = JSON.stringify({
      data: {
        name: xw.name,
        price: xw.price,
      },
    });

    var config = {
      method: "post",
      url: API.updatecontent + route.query.id,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setdata(response.data);
        setprocessing(false);
        message.success("Data Changed");
      })
      .catch(function (error) {
        console.log(error);
        setprocessing(false);
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    getdata(route.query.id);
  }, [id]);

  if (processing)
    return (
      <div className="p-4">
        <Skeleton avatar paragraph={{ rows: 4 }} active />
      </div>
    );
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" border-l rounded-2xl p-2 md:p-4 "
      >
        <div>
          <div className="text-base  my-3">Package Name:</div>
          <div>
            <input
              defaultValue={data.name}
              {...register("name", { required: true, maxLength: 80 })}
              className="border p-3 m-0 font-we w-full block rounded-xl font-normal "
              type="text"
            />
          </div>
        </div>
        <div>
          <div className="text-base  my-3">Package Price:</div>
          <div>
            <input
              defaultValue={data.price}
              {...register("price", {
                required: true,
                maxLength: 80,
                valueAsNumber: true,
              })}
              step={0.01}
              className="border p-3 m-0 font-we w-full block rounded-xl font-normal active:ring-2 focus:ring-2 "
              type="number"
            />
          </div>
        </div>
        <div>
          <Buttond processing={processing} value="Save" />
        </div>
      </form>
    </div>
  );
}

export default Editpackaged;
