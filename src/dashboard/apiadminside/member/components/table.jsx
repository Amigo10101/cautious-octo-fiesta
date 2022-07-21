import React, { useState, useEffect } from "react";
import { Table, Switch, Tag, Popconfirm, message } from "antd";
import { Button, Modal } from "antd";

import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

import useToken from "../../../../useToken";
import useId from "../../../../useId";
const { Option } = Select;
const officeid = sessionStorage.getItem("affoffice");

const MemberTable = () => {
  const { Id, setId } = useId();
  const { token, setToken } = useToken();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatemodal, setupdatemodal] = useState(false);
  const [modaldata, setmodaldata] = useState([]);
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(5);
  const [effect, seteffect] = useState();
  const Navigate = useNavigate();
  const [isloading, setisloading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: totalcount,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [1, 2, 3, 4, 5],
  });
  const statuswitcher = (event) => {
    const axios = require("axios");
    let data = JSON.stringify({
      office: modaldata.office,
    });

    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/third-party-access/" +
        `${modaldata.id}` +
        "/enable-or-disable/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        seteffect(Math.random());
        message.success("Status Changed");
        setupdatemodal(false);

        setisloading(true);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
  const apideleter = (id) => {
    const axios = require("axios");

    let config = {
      method: "delete",
      url:
        "https://backend-demo.revmd.co/api/v1/third-party-access/" +
        `${id}` +
        "/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message.success("Api deleted");

        seteffect("ww");
        setisloading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    {
      const axios = require("axios");

      let config = {
        method: "get",
        url: "https://backend-demo.revmd.co/api/v1/third-party-access/",
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
      title: "Office Id",
      dataIndex: "office",
      key: "office",
      width: "10%",
      render: (text, record, index) => {
        return (
          <button
            onClick={() => {
              setmodaldata(record);
              setIsModalVisible(true);
            }}
            className="btn border-0 text-primary text-start fw-bold fs6"
          >
            {text}
          </button>
        );
      },
    },
    {
      title: "Api Id",
      dataIndex: "id",
      key: "id",
    },
    {
      width: "3%",
    },

    {
      title: "token",
      dataIndex: "token",
      key: "token",
      width: "15",
      render: (text) => {
        return (
          <div style={{ width: 200, textOverflow: "ellipsis" }}>{text}</div>
        );
      },
    },
    {
      width: "3%",
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      width: "7%",
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      width: "3%",
    },
    {
      title: "updated_at",
      dataIndex: "updated_at",
      width: "7%",
      render: (text, record, index) => {
        return <>{text}</>;
      },
    },
    {
      width: "3%",
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: "10%",
      render: (text, record, index) => {
        let color = "";
        {
          record.enabled ? (color = "success") : (color = "error");
        }
        return (
          <Tag color={color}>{record.enabled ? "Active" : "UnActive"}</Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "id",
      render: (record) => (
        <>
          <EditTwoTone
            onClick={() => {
              setupdatemodal(true);
              setmodaldata(record);
            }}
            className="pe-1"
          />
          <DeleteOutlined
            onClick={() => {
              setmodaldata(record);
              apideleter(record.id);
            }}
            className="text-danger px-1"
          />
        </>
      ),
    },
  ];

  const Updatemodal = () => {
    return (
      <>
        <Modal
          title={
            <>
              Edit Api{" "}
              <div style={{ height: 40 }} className="border d-inline-block">
                <div className="pt-1 ps-2">
                  STATUS:
                  <Select
                    className="fw-bold"
                    defaultValue={modaldata.enabled}
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
                    onChange={(event) => statuswitcher(event)}
                  >
                    <Option value={true}>Active</Option>
                    <Option value={false}>Unactive</Option>
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
            Navigate("/dashboard/registeredapis");
          }}
          footer={[
            <Button
              onClick={() => {
                setupdatemodal(false);
                setIsModalVisible(false);
                Navigate("/dashboard/registeredapis");
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          <div className="">Api Id: {modaldata.id}</div>
          <div className="">Created_at: {modaldata.created_at}</div>
          <div className="">Updated_at {modaldata.update_at}</div>
          <div className="">Token: {modaldata.token}</div>
          <div className="">Office ID: {modaldata.office}</div>
        </Modal>
      </>
    );
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };

  return (
    <>
      <Updatemodal />
      <Table
        loading={isloading}
        className=""
        dataSource={levle1tabledata}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default MemberTable;
