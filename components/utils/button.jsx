import { Spin } from "antd";
import { useRouter } from "next/router";
import React from "react";

function Buttonb(props) {
  const route = useRouter();
  return (
    <button
      disabled={props.processing}
      onClick={() => {
        props.to && route.push(props.to);
      }}
      className="cursor-pointer block text-xs transition ease-in-out delay-100 bg-indigo-700 p-3 px-7 text-white font-medium rounded-md m-4 hover:bg-indigo-500 hover:scale-110"
      type="primary"
    >
      <div className=" text-center ">
        {props.processing ? <Spin /> : props.value}
      </div>
    </button>
  );
}

export default Buttonb;
