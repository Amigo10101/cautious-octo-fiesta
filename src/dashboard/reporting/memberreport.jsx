import { Card, DatePicker, Radio, Select, Tooltip } from "antd";

import "react-circular-progressbar/dist/styles.css";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";

import Highlighter from "react-highlight-words";
import Round from "./charts/round";
import Tinyareachart from "./charts/tinyarea";
import IndReport from "./individual/office/indoffice";
import Bigbar from "./charts/bigbar";
import Indmember from "./individual/office/indmember";
import useToken from "../../useToken";
import useId from "../../useId";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function Memberreport() {
  const { token, setToken } = useToken();
  const { Id, setId } = useId();
  const [isloading, setisloading] = useState(true);
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(0);
  const officemode = Id.mode;

  function getofficedetails() {
    {
      const axios = require("axios");

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/" +
          "all" +
          "/membership/?limit=223000",
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
  }
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: totalcount,
    defaultCurrent: 1,
    showSizeChanger: true,
    pageSizeOptions: [1, 2, 3, 4, 5],
  });
  const packagedata = [
    {
      type: "Package1",
      sales: 38,
    },
    {
      type: "Pafw2",
      sales: 52,
    },
    {
      type: "awd24",
      sales: 61,
    },
    {
      type: "pawd2",
      sales: 145,
    },
    {
      type: "ad2(office2)",
      sales: 48,
    },

    {
      type: "awd22",
      sales: 38,
    },
    {
      type: "wcw4 ad",
      sales: 38,
    },
  ];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    handleSearch(null, true, null);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <div>
          <Input
            allowClear
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
            }}
          />
        </div>
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Member Name",
      dataIndex: "first_name",
      key: "id",
      width: "20%",
      ...getColumnSearchProps("frst_name"),
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
              setindmode(true);
            }}
            className="btn border-0 text-primary fw-bold text-start fs14 "
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "State",
      dataIndex: "state",
      key: "age",

      ...getColumnSearchProps("state"),
    },

    {
      title: "Created By",
      dataIndex: "affiliated_office",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("age"),
    },
    {
      title: "Membership Id",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("age"),
    },
    {
      title: "Status",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const [indmode, setindmode] = useState(false);
  const [indid, setindid] = useState(0);
  useEffect(() => {
    getofficedetails();
  }, []);

  return (
    <div className="bg-white pb-2" style={{ padding: 10 }}>
      {indmode === true ? (
        <>
          <Button
            onClick={() => {
              setindmode(false);
            }}
            style={{ zIndex: "1" }}
            className="position-absolute "
            type="primary"
          >
            Back to All Members
          </Button>
          <Indmember dataid={indid} />
        </>
      ) : (
        <div className="m-2">
          <div>
            <div className="container mb-5">
              <div className="row g-2 shadow-sm rounded-5 p-3 align-items-center">
                <div className="col-md-4 me-3 p-2 shadow rounded-5 ">
                  <div className="position-relative">
                    <span className="position-absolute end-0">
                      <InfoCircleOutlined />
                    </span>
                  </div>
                  <Tooltip
                    color="#a9d6d6"
                    key="#ffffff"
                    title="Percentage of Members that terminated thier membership"
                  >
                    <div>
                      <Round percent={0.15} />{" "}
                    </div>
                  </Tooltip>
                  <div className="d-block m-auto text-center">
                    Membership Terminations For Last 30 days:{" "}
                    <strong className="fs-6">43</strong>
                  </div>
                </div>
                <div className="col-md-7 p-4 pt-2 shadow rounded-5 ">
                  <div className="pb-3 position-relative">
                    Package Performance{" "}
                    <span className="position-absolute end-0">
                      <InfoCircleOutlined />
                    </span>
                  </div>

                  <Bigbar data={packagedata} />
                </div>
              </div>
            </div>
            <div className="row gx-3 gy-3 pt-2 ">
              <div className="col-0">
                <span className="m-auto d-table">
                  Data Range:{" "}
                  <Radio.Group defaultValue="a" size="medium">
                    <Radio.Button value="a">Monthly</Radio.Button>
                    <Radio.Button value="b">Quarterly</Radio.Button>
                    <Radio.Button value="c">Yearly</Radio.Button>
                    <Radio.Button value="d">All</Radio.Button>
                  </Radio.Group>
                </span>
              </div>
              <div className="col">
                <span className="m-auto d-table">
                  <div className="text-center pb-2"> View By office:</div>
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: 300,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="1">Not Identified</Option>
                    <Option value="2">Closed</Option>
                    <Option value="3">Communicated</Option>
                    <Option value="4">Identified</Option>
                    <Option value="5">Resolved</Option>
                    <Option value="6">Cancelled</Option>
                  </Select>
                </span>
              </div>
              <div className="col-md">
                <span className="m-auto d-table">
                  <div className="text-center pb-2">Status:</div>
                  <Radio.Group size="medium">
                    <Radio.Button value="d">All</Radio.Button>
                    <Radio.Button value="a">Active</Radio.Button>
                    <Radio.Button value="b">Terminated</Radio.Button>
                    <Radio.Button value="c">Expired</Radio.Button>
                  </Radio.Group>
                </span>
              </div>
              <div className="col">
                <span className="m-auto d-table">
                  <div className="text-center pb-2">Invoice Date:</div>
                  <RangePicker />
                </span>
              </div>
            </div>
            <div className="row gx-3 gy-3 pt-4 ">
              <div className="col-md">
                <span className="m-auto d-table">
                  <div className="text-center pb-2"> View By Package:</div>
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: 300,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="1">Not Identified</Option>
                    <Option value="2">Closed</Option>
                    <Option value="3">Communicated</Option>
                    <Option value="4">Identified</Option>
                    <Option value="5">Resolved</Option>
                    <Option value="6">Cancelled</Option>
                  </Select>
                </span>
              </div>
              <div className="col">
                <span className="m-auto d-table">
                  <div className="text-center pb-2"> View By User:</div>
                  <Select
                    showSearch
                    allowClear
                    style={{
                      width: 300,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="1">Not Identified</Option>
                    <Option value="2">Closed</Option>
                    <Option value="3">Communicated</Option>
                    <Option value="4">Identified</Option>
                    <Option value="5">Resolved</Option>
                    <Option value="6">Cancelled</Option>
                  </Select>
                </span>
              </div>
            </div>
            <div className="row py-4">
              <div className="col ">
                <span className="float-end">
                  <div className="row gy-3">
                    <div className="col">
                      <Button className="">Reset</Button>
                    </div>
                    <div className="col">
                      {" "}
                      <Button type="primary">Apply Filter</Button>
                    </div>
                  </div>{" "}
                </span>
              </div>
            </div>
            <div className="px-4">
              {totalcount}
              <Table
                size="large"
                columns={columns}
                dataSource={levle1tabledata}
                loading={isloading}
                pagination={pagination}
                onChange={handleTableChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
