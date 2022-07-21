import { Alert, Divider, Tag } from "antd";
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
const jsondata = [
  {
    message: "successfully terminated",
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

  {
    key: "3",
    Parameters: "Member_id",
    Descripton: "The member id that needs to be terminated.",
    ParameterType: "path",
    DataType: "string",
  },
];
const { TabPane } = Tabs;
export default function Part6() {
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
                  POST
                </Tag>{" "}
                {"/api/v1/{office_id}/memberships/{user_id}/terminate-policy/"}
              </Body>

              <Highlight className="javascript">
                {`curl --location --request GET 'https://backend-demo.revmd.co/api/v1/{office_id}/memberships/{user_id}/terminate-policy/' 
                 --header 'Accept: application/json' 
                  --header 'Authorization: Token Revmd_Token'`}
              </Highlight>
              <Body className="my-2">
                This requst provides{" "}
                <code>"message": "successfully terminated"</code> object as a
                response if the membership is Terminated.
              </Body>
              <Alert
                message={
                  <> Remember — to replace Revmd_token with your own token.</>
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
                /memberships/<Yellow>{"{userid}"}</Yellow>/terminate-policy/
              </Code>
            </Base>
            <Base>
              <Miniheader>Parameters</Miniheader>
              <Table
                className=""
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
              />
            </Base>
            <Showcodebase className=" mt-3 ms-1  ">
              <Divider dashed />
              <div className="">
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
        <TabPane tab="Code" key="1">
          <div>
            <Base className="py-0">
              <Codebase className="py-0">
                <Highlight language="javascript">
                  {`curl --location --request GET 'https://backend-demo.revmd.co/api/v1/{office_id}/memberships/{user_id}/terminate-policy/' 
                 --header 'Accept: application/json' 
                  --header 'Authorization: Token Revmd_Token'`}
                </Highlight>
              </Codebase>
            </Base>
          </div>
        </TabPane>
        <TabPane tab="Result" key="2">
          <div>
            <Base className="py-0">
              <Codebase className="py-0">
                <Highlight className="json">
                  <pre>{JSON.stringify(jsondata, null, 2)}</pre>
                </Highlight>
              </Codebase>
            </Base>
          </div>
        </TabPane>
      </Tabs>
    </>
  );
}
