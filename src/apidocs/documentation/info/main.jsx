import { Collapse } from "antd";
import React from "react";

import Info from "./info1";
import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import Part4 from "./part4";
import Part5 from "./part5";
import Part6 from "./part6";
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
const { Panel } = Collapse;
export default function Apidetails() {
  return (
    <div style={{ background: "#f9fcff" }}>
      <Info />
      <Part1 />
      <Collapse
      
        style={{ background: "#f9fcff" }}
        className="m-4"
        defaultActiveKey={["1"]}
        expandIconPosition="right"
      >
        <Panel
          className=""
          header={
            <>
              <Base>
                <Miniheader>Get All MemberShips</Miniheader>
                <Body>This endpoint retrieves all Memberships data.</Body>
              </Base>
            </>
          }
          key="1"
        >
          <Part3 />
        </Panel>
        <Panel
          header={
            <>
              <Base>
                <Miniheader>Post a New Membership</Miniheader>
                <Body>This endpoint create a new membership.</Body>
              </Base>
            </>
          }
          key="2"
        >
          <Part2 />
        </Panel>
        <Panel
          header={
            <>
              <Base>
                <Miniheader>
                  Get Individual membership details from membership_id
                </Miniheader>
                <Body>
                  This endpoint gets individual membership details from
                  membership_id instead of user_id.
                </Body>
              </Base>
            </>
          }
          key="3"
        >
          <Part4 />
        </Panel>
        <Panel
          header={
            <>
              <Base>
                <Miniheader>Put data on an existing Membership</Miniheader>
                <Body>This endpoint puts data to an existing membership.</Body>
              </Base>
            </>
          }
          key="4"
        >
          <Part5 />
        </Panel>
        <Panel
          header={
            <>
              <Base>
                <Miniheader>Terminate the current active policy</Miniheader>
                <Body>This endpoint terminates the current active policy.</Body>
              </Base>
            </>
          }
          key="5"
        >
          <Part6 />
        </Panel>
      </Collapse>
    </div>
  );
}
