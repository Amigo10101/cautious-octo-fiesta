import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import useId from "../../../useId";
const columns = [
  {
    title: "Package Name",
    dataIndex: "package",
    key: "package",
    render: (text) => <div className="ms-2">{text}</div>,
  },
  {
    title: "Benefit Start Date",
    dataIndex: "benefit_start",
    key: "benefit_start",
  },
  {
    title: "Benefit End Date",
    dataIndex: "benefit_end",
    key: "benefit_end",
  },
  {
    title: "Terms",
    dataIndex: "terms",
    key: "terms",
  },
  {
    title: "Price",
    dataIndex: "calculated_price",
    key: "calculated_price",
  },
  {
    title: "Status",
    key: "expired",
    dataIndex: "expired",
    render: (text) => (
      <>
        <Tag color={text ? "error" : "success"}>
          {text ? "Expired" : "Active"}
        </Tag>
      </>
    ),
  },
];

const History = () => {
  const { Id, setId } = useId();
  const [data2, setdata2] = useState(Id.membership.membership_history);

  return (
    <div className="">
    <div className="container-lg p-0">
      <Table className="" columns={columns} dataSource={data2} />
    </div></div>
  );
};

export default History;
