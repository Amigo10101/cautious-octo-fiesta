import { Alert } from "antd";
import React from "react";
import { Base, Body, Code, Heading, Miniheader } from "../../style";
import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",

    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",

    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",

    address: "Sidney No. 1 Lake Park",
  },
];
export default function Part1(props) {
  const officeid=props.officeid
  return (
    <div>
      <Heading>Membership Apis</Heading>
      <Base>
        <Miniheader></Miniheader>
        <Body>
        RevMd offers the following Eligibility APIs as a package:

        </Body>
        <Body>
          
        </Body>

        <Alert
          message={<>All the Curl Examples below comes with your specific OfficeID and Token.</>}
          type="info"
          showIcon
        />
      </Base>
    </div>
  );
}
