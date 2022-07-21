import { Alert } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { Base, Body, Code, Heading, Miniheader } from "../../style";
export default function Info() {
  return (
    <div>
      <Heading>Introduction</Heading>
      <Base>
        <Miniheader>Welcome to RevMd API</Miniheader>
        <Body>
          Member Eligibility Management Partners can simplify their eligibility
          process and offer members immediate access to RevMd’s services by
          using RevMd’s real time Eligibility API Package. Immediate access is
          available to members since the member’s demographic data is sent to
          RevMd based upon enrollment with the partner.
        </Body>
        <br />
        <Body>
          Revmd Member Eligibility Management uses Token to allow access to the
          API. Your token can be found at the <strong>Api Dashbaord</strong> tab of this page.
        </Body>
        <Body>
          Revmd expects for the token to be included in all API requests
          to the server in a header that looks like the following:{" "}
          <Code>Authorization: RevMDToken {"{Token}"}</Code>
        </Body>
        <Alert
          message={
            <>
              You must replace <Code>{"{Token}"}</Code> with your personal API
              Token.
            </>
          }
          type="info"
          showIcon
        />
      </Base>
    </div>
  );
}
