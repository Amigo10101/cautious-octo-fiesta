import { Modal, Popconfirm } from "antd";

import {
  BankTwoTone,
  CreditCardOutlined,
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { height } from "@mui/system";
import { Button, Divider, Tag } from "antd";
import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Cardedit from "./cardedit";
export default function Cardrow(props) {
  const [edit, setedit] = React.useState(false);

  return (
    <div>
      <Modal
        visible={edit}
        onCancel={() => {
          setedit(false);
        }}
        footer={null}
      >
        <Cardedit />
      </Modal>
      <div className="row py-2 pt-3 ">
        <img
          style={{ width: 55, height: 20 }}
          className=" mb-2 me-5"
          height={20}
          src="https://www.freeiconspng.com/thumbs/visa-icon/visa-icon-0.png"
        />
        <div style={{ width: 250 }} className="col-4 fs-6 mb-2">
          {" "}
          Visa ending in <strong>6675</strong>
        </div>
        <div className="col">
          <Tag color="processing">Default</Tag>
        </div>
        <div className="col">12/22</div>
        <div className="col col-sm-0"> </div>
        <div className="col text-right">
          {" "}
          <div className="rounded-pill text-end antlblue">
            {" "}
            <EditTwoTone
              style={{ backgroundColor: "#cbffee" }}
              className="fs-5 p-2 me-2 mb-2 rounded-2"
              onClick={()=>{setedit(true)}}
            />
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={null}
              onCancel={null}
              okText="Yes"
              cancelText="No"
            >
              <DeleteTwoTone
                style={{
                  backgroundColor: "#ffe1e1",
                }}
                twoToneColor={"red"}
                className="fs-5 p-2 me-2 rounded-3 "
              />
            </Popconfirm>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
}
