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

export default function Part4(props) {
  const [showcode, setshowcode] = useState("none");
  const jsondata = [
    [
      {
        "email": "string",
        "first_name": "string",
        "middle_name": "string",
        "last_name": "string",
        "gender": "string",
        "date_of_birth": "YYYY-MM-DD",
        "address_1": "string",
        "address_2": "string",
        "zip": "string",
        "city": "string",
        "state": "string",
        "language": "English Or Spanish",
        "phone_number": "string",
        "id": "User Id",
        "username": "String",
        "is_active": "Boolean",
        "mode": "N",
        "affiliated_office": "Returns Office Id that Created this Membership",
        "last_login": "YYYY-MM-DDTHH:MM:SSZ",
        "membership": {
          "id": "Membership Id ",
          "memd_memberid": "String",
          "memd_externalid": "string",
          "memd_externalsubsccriberid": "String",
          "has_active_policy": "Boolean",
          "membership_history": [
            {
              "id": "Integer",
              "package": "Interger",
              "recurring": "Boolean",
              "terms": "Monthly Or Yearly",
              "calculated_price": "String",
              "_package_raw": "Boolean",
              "benefit_end": "String",
              "benefit_start": "String",
              "memd_status": "Boolean",
              "force_terminated": "Boolean",
              "expired": "Boolean"
            }
          ]
        }
      }
    ]
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
      key: "2",
      Parameters: "membership_id",
      Descripton: "Id of the member you want to get data",
      ParameterType: "query",
      DataType: "	integer",
    },
    
  ];
  const { TabPane } = Tabs;
  const officeid=props.officeid
  return (
    <>
      <div>
        
        <Base>
          <Miniheader></Miniheader>
          <Codebase>
            <Base>
            <Body className="fs-6 pb-3">
                <Tag className="fs-5 p-1" color="processing">
                  Get
                </Tag>
                {"/api/v1/"+`${officeid}`+"/memberships/from-membership-id/{memberid}/"}
              </Body>

              <Highlight className="javascript">
                {`curl --location --request GET 'https://backend-demo.revmd.co/api/v1/`+`${officeid}`+`/memberships/from-membership-id/{membershipid}/' 
                 --header 'Accept: application/json' 
                  --header 'Authorization: RevMDToken ` +`${props.token}`+`'`}
              </Highlight>
              <Body className="my-2">
                This requst provides list of Memberships object as a response.
              </Body>
              <Alert
                message={
                  <>   Remember — to pass the 'Authorization: RevMDToken {"{token}"}'
                  header. Also, replace {"{Token}"} with your own token.</>
                }
                type="info"
                showIcon
              />
            </Base>

            <Base>
              <Miniheader>Request Url</Miniheader>
              <Code>
                https://backend-demo.revmd.co/api/v1/<Yellow>{officeid}</Yellow>
                /memberships/from-membership-id/<Yellow>{"{memberid}"}/</Yellow>
              </Code>
            </Base>
            <Base>
              <Miniheader>Parameters</Miniheader>
              <Table
                className=" w-75"
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
              />
            </Base>
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
        <TabPane tab="Code" key="1">
          <div>
            <Base className="py-0">
              <Codebase className="py-0">
                <Highlight language="javascript">
                {`curl --location --request GET 'https://backend-demo.revmd.co/api/v1/`+`${officeid}`+`/memberships/from-membership-id/{memberid}/' 
                 --header 'Accept: application/json' 
                  --header 'Authorization: RevMDToken ` +`${props.token}`+`'`}
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
