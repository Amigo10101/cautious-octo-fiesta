import { Alert } from "antd";
import React from "react";

import { Base, Body, Code, Heading, Miniheader } from "../../style";
export default function Info() {
  return (
    <div>
      <Heading>Introduction</Heading>
      <Base>
        <Miniheader>Welcome to RevMd API</Miniheader>
        <Body>
          The RevMd API is for use by developer to create web app that
          consumes, creates, displays and otherwise interacts with Triplocator
          data. It facilitates B2B and B2C transactions. The Triplocator API is
          implemented using a RESTful design.
        </Body>
        <Body>
          TripLocator uses API keys to allow access to the API. You can register
          a new TripLocator API key at our developer portal.
        </Body>
        <Body>
          TripLocator expects for the API key to be included in all API requests
          to the server in a header that looks like the following:{" "}
          <Code>tl-app-key: app_key</Code>
        </Body>
        <Alert message={<>You must replace <Code>Revmd_token</Code> with your personal API Token.</>} type="info" showIcon />
      </Base>
    </div>
  );
}
