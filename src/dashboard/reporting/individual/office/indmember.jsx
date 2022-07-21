import { Card, DatePicker, Radio, Select, Tooltip } from "antd";

import "react-circular-progressbar/dist/styles.css";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";

import Highlighter from "react-highlight-words";
import Round from "../../charts/round";
import Tinyareachart from "../../charts/tinyarea";

import Bigbar from "../../charts/bigbar";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function Indmember() {
  const tabledata = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Joe Black",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
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
  const [lastitem, setlastitem] = useState([{}]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
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
      title: "Package Id",
      dataIndex: "age",
      key: "age",

      ...getColumnSearchProps("age"),
    },
    {
      title: "Created By",
      dataIndex: "age",
      key: "age",

      ...getColumnSearchProps("age"),
    },
    {
      title: "Amount Paid",
      dataIndex: "age",
      key: "age",

      ...getColumnSearchProps("age"),
    },

    {
      title: "Benifit Start Date",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("age"),
    },
    {
      title: "Benifit End Date",
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
  return (
    <div className="bg-white pb-2" style={{ padding: 10 }} bordered={false}>
      <div className="text-center fs-5">Individual Membership</div>
      <div className="m-2">
        <div>
          <div className="container mb-5">
            <div
              style={{ maxWidth: "500px" }}
              className="container bg-white my-5 mt-2 px-4 py-2 pt-3 rounded-4 shadow-lg"
            >
              <div className="bg-wnite ">
                <div
                  style={{ borderRadius: "20px" }}
                  className="row bdarkblue p-4 text-white py-2 "
                >
                  <div className="col">
                    <div>Curent Plan</div>
                    <h6 className="text-white">
                      Package{lastitem[0].package}: ({lastitem[0].terms})
                    </h6>{" "}
                  </div>
                  <div className="col m-auto text-end">
                    <h6 className="text-white">
                      <span className="h5">{lastitem[0].calculated_price}</span>
                      /Mo
                    </h6>{" "}
                  </div>
                </div>
                <div className=" bg-white row p-4 px-2">
                  <div className="col">
                    <div className="fs-6">Subscription Start Date</div>{" "}
                    <div>{lastitem[0].benefit_start}</div>
                  </div>
                  <div className="col text-end">
                    <div className="fs-6">Subscription End Date</div>{" "}
                    <div>{lastitem[0].benefit_end}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gx-3 gy-3 pt-2 ">
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
                <div className="text-center pb-2">Sales Date:</div>
                <RangePicker />
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
            <Table
              className="text-white"
              style={{ color: "white" }}
              size="large"
              columns={columns}
              dataSource={tabledata}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
