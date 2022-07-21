import { Alert, Divider, Collapse, Tag } from "antd";
import React, { useState } from "react";
import {
  Base,
  Body,
  Code,
  Codebase,
  Heading,
  Miniheader,
  Showcodebase,
  Yellow,
} from "../../style";
import { Table, Tooltip, Tabs } from "antd";
import {
  AlignCenterOutlined,
  CodeOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import Highlight from "react-highlight";
const { Panel } = Collapse;

const jsondata = [
  {
    email: "string",
    first_name: "string",
    middle_name: "string",
    last_name: "string",
    gender: "string",
    date_of_birth: "YYYY-MM-DD",
    address_1: "string",
    address_2: "string",
    zip: "string",
    city: "string",
    state: "string",
    language: "English Or Spanish",
    phone_number: "string",
    id: "User Id",
    username: "String",
    is_active: "Boolean",
    mode: "N",
    affiliated_office: "Returns Office Id that Created this Membership",
    last_login: "YYYY-MM-DDTHH:MM:SSZ",
    membership: {
      id: "Membership Id ",
      memd_memberid: "String",
      memd_externalid: "string",
      memd_externalsubsccriberid: "String",
      has_active_policy: "Boolean",
      membership_history: [
        {
          id: "Integer",
          package: "Interger",
          recurring: "Boolean",
          terms: "Monthly Or Yearly",
          calculated_price: "String",
          _package_raw: "Boolean",
          benefit_end: "String",
          benefit_start: "String",
          memd_status: "Boolean",
          force_terminated: "Boolean",
          expired: "Boolean",
        },
      ],
    },
  },
];
const columns = [
  {
    title: "Parameters",
    dataIndex: "Parameters",
    render: (text) => {
      return <div className="text-primary">{text}</div>;
    },
  },

  {
    title: "	Description",
    dataIndex: "Descripton",
  },
  {
    title: "Parameter Type",
    dataIndex: "ParameterType",
  },
  {
    title: "Data Type",
    dataIndex: "DataType",
  },
];
const data = [
  {
    key: "1",
    Parameters: "office_id",
    Descripton: "Your Office Id",
    ParameterType: "path",
    DataType: "string",
  },
];
const columns2 = [
  {
    title: "Parameters",
    dataIndex: "Parameters",
    render: (text) => {
      return <div className="text-primary">{text}</div>;
    },
  },

  {
    title: "	Description",
    dataIndex: "Descripton",
  },
  {
    title: "Data Type",
    dataIndex: "DataType",
  },
];
const data2 = [
  {
    key: "1",
    Parameters: "email",
    Descripton: "",
    ParameterType: "path",
    DataType: "string",
  },
  {
    key: "2",
    Parameters: "first_name",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "3",
    Parameters: "middle_name",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string (optional)",
  },
  {
    key: "4",
    Parameters: "last_name",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "5",
    Parameters: "gender",
    Descripton: "",
    ParameterType: "Body",
    DataType: "options [Male OR Female]",
  },
  {
    key: "6",
    Parameters: "date_of_birth",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "7",
    Parameters: "address_1",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "8",
    Parameters: "address_2",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string (optional)",
  },
  {
    key: "9",
    Parameters: "zip",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "10",
    Parameters: "city",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "11",
    Parameters: "state",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "12",
    Parameters: "phone_number",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "13",
    Parameters: "is_active",
    Descripton: "",
    ParameterType: "Body",
    DataType: "Boolean (optional)",
  },
  {
    key: "14",
    Parameters: "last_login",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string (optional)",
  },
  {
    key: "15",
    Parameters: "package",
    Descripton: "enter the package Id you want to add for this member",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "15",
    Parameters: "recurring",
    Descripton: "",
    ParameterType: "Body",
    DataType: "string",
  },
  {
    key: "16",
    Parameters: "terms",
    Descripton: "",
    ParameterType: "Body",
    DataType: "options [Monthly Or Yearly]",
  },
  {
    key: "17",
    Parameters: "language",
    Descripton: "",
    ParameterType: "Body",
    DataType: "options [English Or Spanish]",
  },
];
const { TabPane } = Tabs;
export default function Part2() {
  const [showcode, setshowcode] = useState("none");
  return (
    <>
      <div>
        
        <Base>
          <Miniheader></Miniheader>
          <Codebase>
            <Base>
            <Body className="fs-6 pb-3">
                <Tag className="fs-5 p-1" color="success">
                  Post
                </Tag>
                {"/api/v1/{officeid}/memberships/"}
              </Body>
              <div className="mt-2">
                <Highlight language="javascript">
                  {`curl --location --request POST 'https://stage-api.revmd.website/api/v1/1/memberships/' \

--header 'Content-Type: application/json' \

--header 'Accept: application/json' \

--header 'Authorization: Token Revmd_token' \

--data-raw '{
    "email": "dwad@awd.cawwdw",
    "first_name": "123",
    "middle_name": "",
    "last_name": "123",
    "gender": "Male",
    "date_of_birth": "2020-05-20",
    "address_1": "wadw",
    "address_2": "wdwd",
    "zip": "12332",
    "city": "123132",
    "state": "123123",
    "phone_number": "12312313",
    "is_active": true,
    "last_login": "2020-05-20",
    "package":  10,
    "recurring": "true",
    "terms": "Monthly",
    "language":"English"
}'`}
                </Highlight>
              </div>
              <Body className="my-2">
                This request creates a new member and returns a object as a
                response if the member is created.
              </Body>
              <Alert
                message={
                  <>
                    {" "}
                    Remember — to pass the 'Authorization: Token Revmd_token'
                    header. Also, replace Revmd_token with your own token.
                  </>
                }
                type="info"
                showIcon
              />
            </Base>

            <Base>
              <Miniheader>Request Url</Miniheader>
              <Code>
                https://backend-demo.revmd.co/api/v1/
                <Yellow>{"{officeid}"}</Yellow>
                /memberships/
              </Code>
            </Base>
            <Collapse className="mx-4 bg-white">
              <Panel
                header={<div className="h5 m-0 p-0">Parameters</div>}
                key="1"
              >
                <div className="p-3">
                  <Miniheader>Path Parameters</Miniheader>
                  <Table
                    className="p-2 "
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                  />
                </div>
                <div className="p-3">
                  <Miniheader>Body Parameters</Miniheader>
                  <Table
                    className="p-2 "
                    columns={columns2}
                    dataSource={data2}
                    pagination={false}
                    size="small"
                  />
                </div>
              </Panel>
            </Collapse>

            <Showcodebase className=" mt-3 ms-1  ">
              <Divider dashed />
              <div className="m-auto">
                <span className="d-table m-auto pb-3">
                <Tooltip
                    title={showcode === "none" ? "Show Code" : "Hide Code"}
                  >
                    <div onClick={() => {
                          {
                            showcode === "none"
                              ? setshowcode("block")
                              : setshowcode("none");
                          }
                        }}>
                      <CodeOutlined
                        
                        className="d-block fs-4 me-2"
                      />
                      <div className="m-auto">Code & Results</div>
                    </div>
                  </Tooltip>
                </span>
              </div>
            </Showcodebase>
          </Codebase>
        </Base>
      </div>

      <Tabs style={{ display: `${showcode}` }} centered defaultActiveKey="1">
        <TabPane tab="Curl" key="1">
          <div>
            <Base className="py-0">
              <>
                <Highlight language="javascript">
                  {`curl --location --request POST 'https://stage-api.revmd.website/api/v1/1/memberships/' 
--header 'Content-Type: application/json' 
--header 'Accept: application/json' 
--header 'Authorization: Token Revmd_token' 
--data-raw '{
    "email": "dwad@awd.cawwdw",
    "first_name": "123",
    "middle_name": "",
    "last_name": "123",
    "gender": "Male",
    "date_of_birth": "2020-05-20",
    "address_1": "wadw",
    "address_2": "wdwd",
    "zip": "12332",
    "city": "123132",
    "state": "123123",
    "phone_number": "12312313",
    "is_active": true,
    "last_login": "2020-05-20",
    "package":  10,
    "recurring": "true",
    "terms": "Monthly",
    "language":"English"
}'`}
                </Highlight>
              </>
            </Base>
          </div>
        </TabPane>

        <TabPane tab="Input" key="3">
          <Base>
          <>
          <Highlight language="javascript">
            {`{
  "email": "string",
  "first_name": "string",
  "middle_name": "string",
  "last_name": "string",
  "gender": "string",
  "date_of_birth": "string",
  "address_1": "string",
  "address_2": "string",
  "zip": 0,
  "city": "string",
  "state": "string",
  "language": "string",
  "phone_number": "string",
  "is_active": true,
  "last_login": "string",
  "package": 0,
  "recurring": true,
  "terms": "string"
}`}
          </Highlight></></Base>
        </TabPane>
        <TabPane tab="Result" key="2">
          <div>
            <Base className="py-0">
              <>
                <Highlight className="json">
                  <pre style={{ height: 500 }}>
                    {JSON.stringify(jsondata, null, 2)}
                  </pre>
                </Highlight>
              </>
            </Base>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
}
