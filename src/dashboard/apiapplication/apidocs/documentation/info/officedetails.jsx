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
    id: 1,
    name: "office1",
    ein: "121231",
    address_1: "add1",
    address_2: "add2",
    zip: 12345,
    city: "test city",
    state: "test state",
    office_type: "Associations",
    account_holder: "1",
    account_number: "1",
    routing_number: "1",
    bank_name: "1",
    packages: [
      {
        name: "Package",
        code: "FWE6U7XF",
        max_dependents: 10,
        plan: "Urgent Care",
        package_tiers: [
          {
            min_members: 1,
            max_members: 10,
            retail_price: "100.00",
            wholesale_price: "90.00",
            id: 10,
          },
        ],
        id: 10,
        is_active: true,
      },
    ],
    parent: null,
    child_count: 0,
  },
];

const { TabPane } = Tabs;
export default function Officedetailsapi(props) {
  const [showcode, setshowcode] = useState("none");
  const officeid = props.officeid;
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
                v1/helpers/office-detail/
              </Body>
              <div className="mt-2">
                <Highlight language="javascript">
                  {`curl --location --request POST  'https://backend-demo.revmd.co/api/v1/helpers/office-detail/' \

--header 'Content-Type: application/json' \

--header 'Accept: application/json' \

--header 'Authorization: RevMDToken ` +
                    `${props.token}` +
                    `' \

`}
                </Highlight>
              </div>
              <Body className="my-2">
                This request gives out your office details given that correct
                token details were provided.
                <br />
                You Can use this api to get <strong>
                  {" "}
                  Package details
                </strong> Or <strong>Package Id </strong>of the package you want
                the new or updated Membership to have.
                
              </Body>
              <Alert
                message={
                  <>
                    {" "}
                    Remember — to pass the 'Authorization: RevMDToken{" "}
                    {"{token}"}' header. Also, replace {"{Token}"} with your own
                    token.
                  </>
                }
                type="info"
                showIcon
              />
            </Base>

            <Base>
              <Miniheader>Request Url</Miniheader>
              <Code>
                https://backend-demo.revmd.co/api/v1/ helpers/office-detail/
              </Code>
            </Base>

            <Showcodebase className=" mt-3 ms-1  ">
              <Divider dashed />
              <div className="m-auto">
                <span className="d-table m-auto pb-3">
                  <Tooltip
                    title={showcode === "none" ? "Show Code" : "Hide Code"}
                  >
                    <div
                      onClick={() => {
                        {
                          showcode === "none"
                            ? setshowcode("block")
                            : setshowcode("none");
                        }
                      }}
                    >
                      <CodeOutlined className="d-block fs-4 me-2" />
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
                  {`curl --location --request POST 'https://stage-api.revmd.website/api/v1/` +
                    `${props.officeid}` +
                    `/memberships/' 
--header 'Content-Type: application/json' 
--header 'Accept: application/json' 
--header 'Authorization: RevMDToken ` +
                    `${props.token}` +
                    `' 
`}
                </Highlight>
              </>
            </Base>
          </div>
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
