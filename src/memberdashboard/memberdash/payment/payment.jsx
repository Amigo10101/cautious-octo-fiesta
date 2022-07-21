import {
  BankTwoTone,
  CreditCardOutlined,
  CreditCardTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { height } from "@mui/system";
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Popconfirm,
  Tag,
} from "antd";
import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Bank from "./compo/addbank";
import CreditCard from "./compo/addcard";
import Bankrow from "./compo/bankrow";
import Cardrow from "./compo/cardrow";

import  "./style.css";
export default function Payment() {
  const [cardmodal, setcardmodal] = React.useState(false);
  const [bankmodal, setbankmodal] = React.useState(false);
  const menu = (
    <Menu
      onClick={(item) => {
        {
          item.key === "1" ? setcardmodal(true) : setbankmodal(true);
        }
      }}
      items={[
        {
          label: "Add Credit/Debit Card",
          key: "1",
          icon: <CreditCardTwoTone />,
        },
        {
          label: "Add Bank Account",
          key: "2",
          icon: <BankTwoTone />,
        },
      ]}
    />
  );

   
  return (
    <>
      <div className="container">
        <div className="container-lg border-1 bg-white shadow rounded-4 p-3 py-4 pe-0 ">
          <div className="container">
            {" "}
            <div className="row ">
              <div className="col-md">
                <div className="row-md h5 antdblue">Saved Payment Methods</div>
                <div className="row-md antlblue">Edit Your Payment options</div>
              </div>
              <div className="col"></div>
            </div>
            <div>
              <Divider />
              <Bankrow />
              <Cardrow />
            </div>
            <div className="bottom layer row">
              <div className="col-md">
                <Dropdown placement="top" overlay={menu}>
                  <Button type="primary">+ Add Payment Method</Button>
                </Dropdown>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        
        onCancel={() => {
          setcardmodal(false);
        }}
        footer={null}
        visible={cardmodal}
      >
        <CreditCard />
      </Modal>
      <Modal
        onCancel={() => {
          setbankmodal(false);
        }}
        footer={null}
        visible={bankmodal}
      >
        <Bank />
      </Modal>
    </>
  );
}
