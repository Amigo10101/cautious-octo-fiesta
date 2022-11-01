import React from "react";
import { Breadcrumb } from "antd";
function Breadcums({ data }) {
  return (
    <div className="my-4">
      <Breadcrumb>
        {data.map((x, y) => {
          return (
            <Breadcrumb.Item key={y}>
              <a href="">{x}</a>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default Breadcums;
