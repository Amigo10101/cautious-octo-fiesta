import React, { useState, useEffect, useContext } from "react";
import { Table, Switch, Tag, Popconfirm, message } from "antd";
import { Button, Modal } from "antd";
import MainaddMember from "../edit/add Member/main";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import useToken from "../../../../useToken";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import { Tokencontext } from "../../../../usecontext";
const { Option } = Select;

const MemberTableadmin = () => {
  const Id = useContext(Tokencontext);
  const navigate = useNavigate();
  const officeid = Id.affiliated_office;
  const { token, setToken } = useToken();
  const { actions, state } = useStateMachine({ updateAction });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatemodal, setupdatemodal] = useState(false);
  const [modaldata, setmodaldata] = useState({
    membership: {
      membership_history: [{}],
    },
  });
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(0);
  const [effect, seteffect] = useState();
  const Navigate = useNavigate();
  const [isloading, setisloading] = useState(true);
  const [searchval, setsearchval] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: totalcount,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
  });
  const searchchange = (event) => {
    const value = event.target.value;
    setsearchval(value);
    setisloading(true);
    const axios = require("axios");

    let config = {
      method: "get",
      url:
        "https://backend-demo.revmd.co/api/v1/all/membership/" +
        "?limit=5000&search=" +
        `${value}`,
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response));
        settotalcount(response.data.count);
        setlevel1tabledata(response.data.results);
        setisloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const packageterminator = (event) => {
    const axios = require("axios");
    let data = JSON.stringify({});

    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/" +
        officeid +
        "/memberships/" +
        `${modaldata.id}` +
        "/terminate-policy/",
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
        {
          response.data.message === "Failed to terminate"
            ? message.error(response.data.message)
            : message.success("Member terminated");
        }
        setisloading(true);
        setupdatemodal(false);
        seteffect("ww");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
        seteffect("ww");
      });
  };
  useEffect(() => {
    {
      const axios = require("axios");

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/" +
          "all" +
          "/membership/?limit=5000",
        headers: {
          Accept: "application/json",
          Authorization: "Token" + " " + `${token}`,
        },
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          settotalcount(response.data.count);
          setlevel1tabledata(response.data.results);
          setisloading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [effect]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      render: (text, record, index) => {
        return (
          <button
            onClick={() => {
              setmodaldata(record);
              setIsModalVisible(true);
              updatesetter(record);
            }}
            className="btn border-0 text-primary text-start fw-bold fs6"
          >
            {record.first_name} {record.last_name}
          </button>
        );
      },
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created BY",
      dataIndex: "",
      key: "office",
      render: (text) => {
        return <>{Id.mode === "O" ? Id.email : "fakedata@fake.data"}</>;
      },
    },
    {
      title: "Membership ID",
      dataIndex: "id",
      key: "id",
      width: "12%",
      render: (text) => {
        return <div className="text-center pe-4">{text}</div>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "zip",
      width: "10%",
      render: (text, record, index) => {
        return <>{record.membership.membership_history[0].benefit_start}</>;
      },
    },
    {
      title: "Expiration Date",
      dataIndex: "zip",
      width: "10%",
      render: (text, record, index) => {
        return <>{record.membership.membership_history[0].benefit_end}</>;
      },
    },
    {
      width: "3%",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      width: "10%",
      render: (text, record, index) => {
        let color = "";
        {
          record.membership.has_active_policy
            ? (color = "success")
            : (color = "error");
        }
        return (
          <Tag color={color}>
            {record.membership.has_active_policy ? "Active" : "Terminated"}
          </Tag>
        );
      },
    },
    /* 
    {
      title: "Actions",
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
    },*/
  ];
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
            <>
              [ {modaldata.first_name} {modaldata.middle_name}{" "}
              {modaldata.last_name} ] Membership Details{" "}
            </>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>
      
          ]}
        >
          <div className="">
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className="p-4 pt-2 px-2 container  "
            >
              <div className=" ps-3">
                <h5>Personal Info</h5>
              </div>
              <div className="ps-3">
                <div className="">First Name: {modaldata.first_name}</div>
                <div className="">MIddle Name: {modaldata.middle_name}</div>
                <div className="">Last Name: {modaldata.last_name}</div>
                <div className="">Gender : {modaldata.Address1}</div>
                <div className="">
                  {" "}
                  Date of Birth: {modaldata.date_of_birth}
                </div>
                <div className="">Address 1 : {modaldata.address_1}</div>
                <div className="">Address 2: {modaldata.address_2}</div>
                <div className="">Zip :{modaldata.zip}</div>
                <div className="">City :{modaldata.city}</div>
                <div className="">State :{modaldata.state}</div>
                <div className="">Language :{modaldata.language}</div>
              </div>
            </div>
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className="p-4 px-2 container  "
            >
              <div className="fs-5 fw-bold ps-3">Contact Details</div>
              <div className="ps-3">
                <div className="">Phone :{modaldata.phone_number}</div>
                <div className="">Mobile :{modaldata.mobile_number}</div>
                <div className="">Email :{modaldata.email}</div>
              </div>
            </div>{" "}
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className="p-4 px-2 container  "
            >
              <div className="fs-5 fw-bold ps-3">Package Detail</div>
              <div className="ps-3">
                <div className="">
                  Package ID:{" "}
                  {modaldata.membership.membership_history[0].package}
                </div>
                <div className="">
                  Plan Interval:{" "}
                  {modaldata.membership.membership_history[0].terms}
                </div>
                <div className="">
                  Recurring Payment :{" "}
                  {modaldata.membership.membership_history[0].recurring
                    ? "True"
                    : "False"}
                </div>
                <div className="">
                  Membership Type:{" "}
                  {modaldata.membership.membership_history[0].type}
                </div>
                <div className="">
                  Benifit Start Date:
                  {modaldata.membership.membership_history[0].benefit_start}
                </div>
                <div className="">
                  Benifit End Date:
                  {modaldata.membership.membership_history[0].benefit_end}
                </div>
                <div className="">
                  Price: ${" "}
                  {modaldata.membership.membership_history[0].calculated_price}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  const Updatemodal = () => {
    return (
      <>
        <Modal
          title={
            <>
              [ {modaldata.first_name} {modaldata.middle_name}{" "}
              {modaldata.last_name} ] Edit Membership{" "}
              <div style={{ height: 40 }} className="border d-inline-block">
                <div className="pt-1 ps-2">
                  STATUS:
                  <Select
                    className="fw-bold"
                    defaultValue={
                      modaldata.membership.has_active_policy
                        ? "Active"
                        : modaldata.membership.membership_history[0]
                            .force_terminated
                        ? "Terminated"
                        : modaldata.membership.membership_history[0].expired
                        ? "Expired"
                        : null
                    }
                    dropdownStyle={{
                      color: "#1890ff",
                      fontSize: "19px",
                      fontWeight: "500",
                    }}
                    style={{
                      width: 150,
                      color: "#1890ff",
                      fontWeight: 500,
                    }}
                    bordered={false}
                    onChange={(event) =>
                      event === "Terminated"
                        ? packageterminator(event)
                        : undefined
                    }
                  >
                    <Option
                      disabled={
                        modaldata.membership.has_active_policy ? false : true
                      }
                      value="Terminated"
                    >
                      TERMINATED
                    </Option>
                  </Select>
                </div>
              </div>
            </>
          }
          visible={updatemodal}
          width="80%"
          onCancel={() => {
            setupdatemodal(false);
            setIsModalVisible(false);
            Navigate("/dashboard/member/registeredmembers");
          }}
          footer={[
            <Button
              onClick={() => {
                setupdatemodal(false);
                setIsModalVisible(false);
                Navigate("/dashboard/member/registeredmembers");
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          <MainaddMember />
        </Modal>
      </>
    );
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };
  const updatesetter = (record) => {
    state.FirstName = record.first_name;
    state.MiddleName = record.middle_name;
    state.LastName = record.last_name;
    state.Gender = record.gender;
    state.Package = record.membership.membership_history[0].package;
    state.paymentTerms = record.membership.membership_history[0].terms;
    state.dateOfBirth = record.date_of_birth;
    state.Email = record.email;
    state.MobileNumber = record.phone_number;
    state.Address1 = record.address_1;
    state.Address2 = record.address_2;
    state.Zip = record.zip;
    state.city = record.city;
    state.whichState = record.state;
    state.Language = record.language;
    state.updatememberid = record.id;
    state.Recurring = record.membership.membership_history[0].recurring;

    state.Price = record.membership.membership_history[0].calculated_price;
  };
  return (
    <>
      
      <div className="container-fluid  bg-white fs-5 p-5   ">
        <div>
          <span className="fs-6">
            {searchval === ""
              ? `Registered Memberships: (${totalcount} memberships)`
              : `Registered Memberships / Search Results For "${searchval}": ( ${totalcount} results)`}
          </span>
          <span className="float-end">
            <div className="row">
              {" "}
              <div className="col p-0">
                {/* 
                <Button
                  className="pb-1 px-5 pb-3"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => {
                    navigate("/dashboard/member/addmembers/step1");
                  }}
                >
                  <span className="align-middle">Add Member</span>
                </Button>*/}
              </div>
              <div className="col p-0">
                <Search
                  placeholder="Search"
                  allowClear
                  style={{ width: 200 }}
                  onChange={(event) => {
                    searchchange(event);
                  }}
                />
              </div>
            </div>
          </span>
        </div>
      </div>
      <Updatemodal />
      <DataModal props={modaldata} />
      <Table
        loading={isloading}
        className="px-5"
        dataSource={levle1tabledata}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default MemberTableadmin;
