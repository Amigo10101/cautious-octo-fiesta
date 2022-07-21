import React, { useState, useEffect } from "react";
import { Table, Switch, Tag, Popconfirm, message } from "antd";
import { Button, Modal } from "antd";
import MainaddUser from "./edit/main";
import {
  DeleteOutlined,
  EditTwoTone,
  LoginOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import Search from "antd/lib/transfer/search";
import useToken from "../../../useToken";
import useId from "../../../useId";
const { Option } = Select;

const MemberTable = () => {
  const Navigate = useNavigate();
  const { token } = useToken();
  const { Id } = useId();
  const { actions, state } = useStateMachine({ updateAction });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatemodal, setupdatemodal] = useState(false);
  const [modaldata, setmodaldata] = useState(0);
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(0);
  const [effect, seteffect] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: totalcount,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [1, 2, 3, 4, 5],
  });
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const axios = require("axios");

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/36/office-user/?limit=0",
      headers: {
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        settotalcount(response.data.count);
        setlevel1tabledata(response.data.results);
        setisloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [effect]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",

      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                setmodaldata(record);
                setIsModalVisible(true);
                updatesetter(record);
              }}
              className="text-primary fw-bold btn border-0"
            >
              {record.first_name} {record.middle_name} {record.last_name}
            </button>
            <div className="tgrey">{record.email}</div>
          </>
        );
      },
    },

    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: "17%",
      render: (text, record, index) => {
        return (
          <>
            <div className="fw-bold opacity-75">Mobile Number</div>
            <div className="tgrey">{text === null ? "N/a" : text}</div>
          </>
        );
      },
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (text, record, index) => {
        console.log(text);
        return (
          <>
            <div className="fw-bold opacity-75">Permissions</div>
            <div style={{ maxWidth: 250 }} className="tgrey">
              {text === null
                ? "N/a"
                : text == -undefined
                ? "N/A"
                : text.map((item) => (
                    <Tag className="" color={"processing"}>
                      {item}
                    </Tag>
                  ))}
            </div>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: "15%",
      render: (text, record, index) => {
        return (
          <>
            <div className="fw-bold opacity-75">Status</div>
            <div className="tgrey">
              {text ? (
                <Tag color={"success"}>Active</Tag>
              ) : (
                <Tag color={"error"}>Unactive</Tag>
              )}
            </div>
          </>
        );  
      },
    },
    {
      title: "Last Updated",
      dataIndex: "last_login",
      key: "last_login",
      render: (text, record, index) => {
        return (
          <>
            <div className="fw-bold opacity-75">Last Updated</div>
            <div className="tgrey">{text === null ? "N/a" : text}</div>
          </>
        );
      },
    },
    {
      title: "Actions",
      key: "last_login",
      width: "20%",
      render: (record) => (
        <>
          <EditTwoTone
            onClick={() => {
              setupdatemodal(true);
              setmodaldata(record);
              updatesetter(record);
            }}
            className="pe-1"
          />
          <DeleteOutlined className="text-danger px-1" />
        </>
      ),
    },
  ];
  const updatesetter = (record) => {
    state.Address1 = record.address_1;
    state.Address2 = record.address_2;
    state.Zip = record.zip;
    state.city = record.city;
    state.whichState = record.state;
    state.OfficeType = record.office_type;

    state.Email = record.email;
    state.first_name = record.first_name;
    state.middle_name = record.middle_name;
    state.last_name = record.last_name;
    state.MobileNumber = record.phone_number;
    state.packagesdisplaydata = record.packages;
    state.parentOffice = record.parent_office_id;
  };
  const DataModal = ({ props }) => {
    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
        <Modal
          title={
            "[" +
            modaldata.first_name +
            " " +
            modaldata.last_name +
            "] User Details"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                setupdatemodal(true);
                setIsModalVisible(false);
              }}
            >
              Update
            </Button>,
          ]}
        >
          <div className="">
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className="p-4 px-2 container  "
            >
              <div className=" ps-3">
                <h5>User Information</h5>
              </div>
              <div className="ps-3">
                <div className="">Parent User: {modaldata.name}</div>
                <div className="">First Name: {modaldata.first_name}</div>
                <div className="">MIddle Name: {modaldata.middle_name}</div>
                <div className="">Last Name: {modaldata.last_name}</div>

                <div className="">Phone :{modaldata.phone_number}</div>
                <div className="">Mobile :{modaldata.mobile_number}</div>
                <div className="">Email :{modaldata.email}</div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const changestatus = (event) => {
    const axios = require("axios");
    let data = JSON.stringify({});

    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/" +
        Id.affiliated_office +
        "/office-user/" +
        `${modaldata.id}` +
        "/toggle-status/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("User Status changed");
        setisloading(true);
        setupdatemodal(false);
        seteffect(Math.random());
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
        seteffect(Math.random());
      });
  };
  const Updatemodal = () => {
    return (
      <>
        <Modal
          title={
            <>
              [ {modaldata.first_name} {modaldata.last_name} ] Edit User{" "}
              <div style={{ height: 40 }} className="border d-inline-block">
                <div className="pt-1 ps-2">
                  STATUS:
                  <Select
                    onChange={(event) => changestatus(event)}
                    className="fw-bold"
                    defaultValue={
                      modaldata.is_active === true ? "Active" : "Cancelled"
                    }
                    dropdownStyle={{ color: "#1890ff" }}
                    style={{
                      width: 120,
                      color: "#1890ff",
                      fontWeight: 500,
                    }}
                    bordered={false}
                  >
                    <Option value="Cancelled">CANCELLED</Option>
                    <Option value="Active">ACTIVE</Option>
                  </Select>
                </div>
              </div>
            </>
          }
          visible={updatemodal}
          width="60%"
          onCancel={() => {
            setupdatemodal(false);
            setIsModalVisible(false);
            Navigate("/dashboard/user/registeredusers");
          }}
          footer={[
            <Button
              onClick={() => {
                setupdatemodal(false);
                setIsModalVisible(false);
                Navigate("/dashboard/user/registeredusers");
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          <MainaddUser />
        </Modal>
      </>
    );
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };
  return (
    <>
      {" "}
      <div className="container-fluid  bg-white fs-5 ">
        <div>
          <span className="fs-6">Registered users ({totalcount} Users)</span>
          <span className="float-end">
            <div className="row">
              {" "}
              <div className="col-2 p-0"></div>
              <div className="col p-0">
                <Search
                  placeholder="Search"
                  allowClear
                  style={{ width: 300 }}
                />
              </div>
            </div>
          </span>
        </div>
      </div>
      <div className="py-4 mx-3">
        {" "}
        <Button
          className="pb-1 px-5 pb-3 rounded-2"
          icon={<PlusOutlined />}
          type="dashed"
          block
          onClick={() => Navigate("/dashboard/user/addusers/step1")}
        >
          <span className="align-middle">Add user</span>
        </Button>
      </div>
      <DataModal props={modaldata} />
      <Updatemodal />
      <Table
        showHeader={false}
        dataSource={levle1tabledata}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
        loading={isloading}
      />
    </>
  );
};

export default MemberTable;
