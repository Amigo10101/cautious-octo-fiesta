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
export default function Part1() {
  return (
    <div>
      <Heading>Membership Apis</Heading>
      <Base>
        <Miniheader></Miniheader>
        <Body>
          A webhook is a mechanism for receiving updates about resources without
          periodically requesting the resources (known as polling). This solves
          important real-time issues, like having the most recent availability
          and prices to display to your customers and avoids unnecessarily
          consuming server resources
        </Body>
        <Body>
          To support webhooks, the developer must register an endpoint (URL)
          with the Application. This URL will be sent POST requests from the
          Triplocator API. Webhooks can be registered by editing the Application
          and updating the webhooks settings.
        </Body>

        <Alert
          message={<>Your requests will be received as a json list.</>}
          type="info"
          showIcon
        />
      </Base>
    </div>
  );
}
