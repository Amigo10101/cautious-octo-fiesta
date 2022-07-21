import { Space, Switch, Table, Popconfirm, Tag, message } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/lib/transfer/search";
import useToken from "../../../useToken";
import { useHref, useNavigate } from "react-router-dom";
import { Navigate as Navgate } from "react-router-dom";
import {
  EditTwoTone,
  DeleteOutlined,
  LoginOutlined,
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  RightCircleTwoTone,
  DownCircleTwoTone,
  FormOutlined,
  DeleteTwoTone,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import MainaddOffice from "./edit/add office/main";
import "./style.css";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import useId from "../../../useId";
import { Tokencontext } from "../../../usecontext";

const Officetable = () => {
  const accountdata=useContext(Tokencontext)
  const { token, setToken } = useToken();
  const { Id, setId } = useId();
  const { actions, state } = useStateMachine({ updateAction });
  const Navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setmodaldata] = useState(0);
  const [updatemodal, setupdatemodal] = useState(false);
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(0);
  const [effect, seteffect] = useState();
  const [isloading, setisloading] = useState(true);
  const [searchval, setsearchval] = useState("");
  const hijack = (id) => {
    const axios = require("axios");
    let data = JSON.stringify({});
    const afterhijack = (aftertoken) => {
      setToken(aftertoken);

      message.success("Logged in Sucessfully");

      Navigate("/");
    };
    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/office/" + `${id}` + "/hijack/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        {
          response.data.detail === undefined
            ? afterhijack(response.data.token)
            : message.error(response.data.detail);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error.code);
      });
  };
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: totalcount,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
  });
  const officemode = Id.mode;
  const searchchange = (event) => {
    const value=event.target.value;
    setsearchval(value)
    setisloading(true);
    const axios = require("axios");

    const parentval =
      officemode === "O" ? `parent=${Id.affiliated_office}` : "is_parent=true";

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/?search="+`${value}`+"&limit=50&" + parentval,
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response)
        settotalcount(response.data.count);
        setlevel1tabledata(response.data.results);
        setisloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const axios = require("axios");

    const parentval =
      officemode === "O" ? `parent=${Id.affiliated_office}` : "is_parent=true";

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/?limit=50&" + parentval,
      headers: {
        Accept: "application/json",
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
  const updatesetter = (record) => {
    state.OfficeName = record.name;
    state.EJN = record.ein;
    state.Address1 = record.address_1;
    state.Address2 = record.address_2;
    state.Zip = record.zip;
    state.city = record.city;
    state.whichState = record.state;
    state.OfficeType = record.office_type;
    state.AccountHolder = record.account_holder;
    state.AccountNumber = record.account_number;
    state.RoutingNumber = record.routing_number;
    state.BankName = record.bank_name;
    state.Email = record.email;
    state.first_name = record.first_name;
    state.middle_name = record.middle_name;
    state.last_name = record.last_name;
    state.MobileNumber = record.phone_number;
    state.packagesdisplaydata = record.packages;
    state.parentOffice = record.parent_office_id;
    state.editofficeid=record.id;
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",

      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              setmodaldata(record);
              setIsModalVisible(true);
              updatesetter(record);
            }}
            className="btn border-0 text-primary fw-bold text-start fs14 "
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "19%",
      render: (text) => {
        return <div className="tgrey text-start">{text}example@aawdw.com</div>;
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "number",
      width: "13%",
      key: "number",
      render: (text) => {
        return <div className="tgrey">{text}12342134122</div>;
      },
    },
    {
      title: "Child Count",
      width: "10%",
      dataIndex: "child_count",
      render: (text) => {
        return (
          <div>
            <Tag
              style={{ fontSize: "14px" }}
              className="rounded-pill border-0 p-1 px-2"
              color="processing"
            >
              <span className="">{text}</span> office{" "}
            </Tag>
          </div>
        );
      },
    },
    {
      width: "3%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "15%",

      render: (text, record, index) => {
        return (
          <div className="tgrey">
            2022-06-13 15:24
            <div className="text-end tgrey">{record.date}</div>
            <div className="text-end tgrey">{record.time}</div>
          </div>
        );
      },
    },
    {
      title: "Actions",
      width: "10%",
      render: (record) => {
        let officenumber = 0;
        {
          record.children === undefined
            ? (officenumber = 0)
            : (officenumber = record.children.length);
        }
        return (
          <div className="fs-6 ">
            <FormOutlined
              style={{
                color: "rgb(24, 144, 255)",
                borderRight: "1px solid #c5c5c5",
              }}
              onClick={() => {
                setupdatemodal(true);
                updatesetter(record);
                setmodaldata(record);
              }}
              className="pe-2"
            />
            <DeleteTwoTone
              style={{ borderRight: "1px solid #c5c5c5" }}
              twoToneColor="#eb2f96"
              className="  px-2"
            />
            <LoginOutlined
              onClick={() => {
                hijack(record.id);
              }}
              style={{ color: "#52c41a" }}
              className=" ps-2"
            />
          </div>
        );
      },
    },
  ];
  const nestedcolumns = [
    {
      title: "Name",
      dataIndex: "name",

      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              setmodaldata(record);
              setIsModalVisible(true);
              updatesetter(record);
            }}
            className="btn border-0 text-primary fw-bold text-start fs14 "
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "19%",
      render: (text) => {
        return <div className="tgrey text-start">{text}example@aawdw.com</div>;
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "number",
      width: "13%",
      key: "number",
      render: (text) => {
        return <div className="tgrey">{text}12342134122</div>;
      },
    },
    {
      title: "Child Count",
      width: "10%",
      dataIndex: "child_count",
      render: (text) => {
        return (
          <div>
            <Tag
              style={{ fontSize: "14px" }}
              className="rounded-pill border-0 p-1 px-2"
              color="processing"
            >
              <span className="">{text}</span> office{" "}
            </Tag>
          </div>
        );
      },
    },
    {
      width: "3%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "15%",

      render: (text, record, index) => {
        return (
          <div className="tgrey">
            2022-06-13 15:24
            <div className="text-end tgrey">{record.date}</div>
            <div className="text-end tgrey">{record.time}</div>
          </div>
        );
      },
    },
    {
      width: "10%",
    },
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
          title={"[" + `${modaldata.name}` + "] Office Details"}
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
          <div className=" ">
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className=" px-2 container  "
            >
              <div className="fs-5 fw-bold ">Office Details</div>
              <div className="">
                <div className="">Office Name: {modaldata.name}</div>
                <div className="">Office EJN: {modaldata.ein}</div>
                <div className="">Address 1 : {modaldata.address_1}</div>
                <div className="">Address 2: {modaldata.address_2}</div>
                <div className="">Zip :{modaldata.zip}</div>
                <div className="">City :{modaldata.city}</div>
                <div className="">State :{modaldata.state}</div>
                <div className="">Office Type :{modaldata.office_type}</div>
                <div className="">Logo :{modaldata.Logo}</div>
              </div>
            </div>
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className=" px-2 container  "
            >
              <div className="fs-5 fw-bold ">Account Details</div>
              <div className="">
                <div className="">Full Name: {modaldata.YourName}</div>
                <div className="">Phone Number: {modaldata.PhoneNumber}</div>
                <div className="">Mobile Number: {modaldata.MobileNumber}</div>
                <div className="">Email Address:{modaldata.Email}</div>
              </div>
            </div>{" "}
            <div
              style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
              className=" px-2 container  "
            >
              <div className="fs-5 fw-bold ">Bank Information</div>
              <div className="">
                <div className="">
                  Account Holder: {modaldata.account_holder}
                </div>
                <div className="">
                  Routing Number : {modaldata.routing_number}
                </div>
                <div className="">
                  Account Number: {modaldata.account_number}
                </div>
                <div className="">Bank Name:{modaldata.bank_name}</div>
              </div>
            </div>
            <div className="container">
              <div className="">
                {" "}
                <h3 className="fs-5 fw-bold pt-2">Packages</h3>
              </div>
              <div className="col">
                <div className="row bg-light">
                  <div className="col-2 border p-3">Title</div>
                  <div className="col border p-3">Members & Prices</div>
                </div>
                <div className="row bg-light">
                  <div className="col-2 border border-bottom-0 "></div>
                  <div className="col ">
                    <div className="row">
                      <div className="col border p-3">Min</div>
                      <div className="col border p-3">Max</div>

                      <div className="col border p-3">Retail Price</div>
                    </div>
                  </div>
                </div>
                {modaldata.packages === undefined ? null : (
                  <div>
                    {modaldata.packages.map((item, index) => {
                      return (
                        <div className="row bg-light">
                          <div className="col-2 border border-top-0 p-0 ps-1">
                            {modaldata.packages[index].name}
                          </div>
                          <div className="col">
                            {modaldata.packages[index].package_tiers.map(
                              (item, index) => {
                                return (
                                  <div className="row" key={item.min_members}>
                                    <div className="col p-2 border">
                                      {item.min_members}
                                    </div>
                                    <div className="col p-2 border">
                                      {item.max_members}
                                    </div>

                                    <div className="col p-2 border">
                                      {item.retail_price}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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
          title={"[" + `${modaldata.name}` + "] Edit Ofice"}
          visible={updatemodal}
          width="95%"
          onCancel={() => {
            setupdatemodal(false);
            setIsModalVisible(false);
            Navigate("/dashboard/office/registeredoffices");
            sessionStorage.removeItem("__LSM__");
          }}
          footer={[
            <Button
              onClick={() => {
                setupdatemodal(false);
                setIsModalVisible(false);
                Navigate("/dashboard/office/registeredoffices");
                sessionStorage.removeItem("__LSM__");
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          <MainaddOffice />
        </Modal>
      </>
    );
  };
  const Nestedtable = (prevdata) => {
    const [newtabledata, setnewtabledata] = useState([]);
    const [effect2, seteffect2] = useState();
    const [level2loading, setlevel2loading] = useState(true);
    const getdata = () => {
      const axios = require("axios");

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/office/?parent=" +
          prevdata.previousdata,
        headers: {
          Accept: "application/json",
          Authorization: "Token" + " " + `${token}`,
        },
      };

      axios(config)
        .then((response) => {
          setnewtabledata(response.data.results);
          setlevel2loading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      getdata();
    }, [effect2]);

    return (
      <Table
        rowKey="id"
        size="small"
        columns={nestedcolumns}
        dataSource={newtabledata}
        expandIconColumnIndex={0}
        showHeader={false}
        pagination={false}
        loading={level2loading}
        expandable={{
          indentSize: 0,
          expandedRowRender: (record) => (
            <>
              {record.child_count === 0 ? (
                <p className="m-0">There are no offices under this office</p>
              ) : (
                <Nestedtable previousdata={record.id} />
              )}
            </>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined
                style={{
                  color: "black",
                  backgroundColor: "rgba(24,144,255,.2)",
                }}
                className="fs10 p-2 rounded-circle "
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <RightOutlined
                style={{
                  color: "black",
                  backgroundColor: "rgba(24,144,255,.2)",
                }}
                shape="circle"
                className="fs10 p-2 rounded-circle "
                onClick={(e) => onExpand(record, e)}
              />
            ),
        }}
        indentSize="1"
      />
    );
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };
  return (
    <>
      <div className="container-fluid  bg-white fs-5 ">
       
        <div>
          <span className="fs-6">
            {searchval===""?`Registered Offices: (${totalcount} Offices)` :`Registered Offices / Search Results For "${searchval}": ( ${totalcount} results)`}
          </span>
          <span className="float-end">
            <div className="row">
              {" "}
              <div className="col p-0">
                <Button
                  className="pb-1 px-5 pb-3"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => Navigate("/dashboard/office/addoffice/step1")}
                >
                  <span className="align-middle">Add Office</span>
                </Button>
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
        style={{ minHeight: "500px" }}
        className="py-3"
        size="small"
        loading={isloading}
        columns={columns}
        dataSource={levle1tabledata}
        expandIconColumnIndex={0}
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <>
              {record.child_count === 0 ? (
                <p className="m-0">There are no offices under this office</p>
              ) : (
                <Nestedtable previousdata={record.id} />
              )}
            </>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <DownOutlined
                style={{
                  color: "black",
                  backgroundColor: "rgba(24,144,255,.2)",
                }}
                className="fs10 p-2 rounded-circle "
                onClick={(e) => onExpand(record, e)}
              />
            ) : (
              <RightOutlined
                style={{
                  color: "black",
                  backgroundColor: "rgba(24,144,255,.2)",
                }}
                shape="circle"
                className="fs10 p-2 rounded-circle"
                onClick={(e) => onExpand(record, e)}
              />
            ),
        }}
        indentSize={0}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Officetable;
