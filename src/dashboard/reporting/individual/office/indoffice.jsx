import { Card, DatePicker, Radio, Tabs } from "antd";

import "react-circular-progressbar/dist/styles.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";

import Highlighter from "react-highlight-words";
import Round from "../../charts/round";
import Tinyareachart from "../../charts/tinyarea";
import Induser from "./induser";
import Indmember from "./indmember";
import Userreport from "../../userreport";
import Memberreport from "../../memberreport";
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
export default function Indreportoffice() {
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
  const revenuedata = [
    1264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      title: "Invoice Number",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Invoice Amount",
      dataIndex: "age",
      key: "age",

      ...getColumnSearchProps("age"),
    },
    {
      title: "Payment Amount",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Commission",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const [indmode, setindmode] = useState(true);
  const [indid, setindid] = useState(0);
  return (
    <div>
      <Tabs centered defaultActiveKey="1" size={"large"}>
        <TabPane tab="Individual office Report" key="1">
          <Tabs centered defaultActiveKey="1" size={"large"}>
            <TabPane tab="Office Report" key="1">
              <div className="m-2">
                <div>
                  <div className="container-md mb-5">
                    <div className="row g-2 shadow-sm rounded-5 p-3 align-items-center">
                      <div className="col-md-4 me-3 p-2 shadow rounded-5 ">
                        <Round percent={0.25} />
                        <div className="d-block m-auto text-center">
                          Payment Due Last 30 days: <strong>43</strong>
                        </div>
                        <div className="fs10 tgrey text-center">
                          (Form this office)
                        </div>
                      </div>
                      <div className="col-md-7 p-3 shadow rounded-5 ">
                        <div className="row ">
                          {" "}
                          <div>
                            Revenue This <strong>Month:</strong>{" "}
                          </div>
                          <Tinyareachart data={revenuedata} />
                        </div>
                        <div className="row">
                          {" "}
                          <div>
                            Commission This <strong>Quarter</strong>{" "}
                          </div>
                          <Tinyareachart data={revenuedata} />
                        </div>
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
                        <div className="text-center pb-2">
                          {" "}
                          Office Creation Date:
                        </div>
                        <RangePicker />
                      </span>
                    </div>
                    <div className="col-md">
                      <span className="m-auto d-table">
                        <div className="text-center pb-2">Past Due:</div>
                        <Radio.Group size="medium">
                          <Radio.Button value="a">15 days</Radio.Button>
                          <Radio.Button value="b">30 days</Radio.Button>
                          <Radio.Button value="c">90+ days</Radio.Button>
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
            </TabPane>
            <TabPane tab="Users Report" key="2">
              <Userreport />
            </TabPane>
            <TabPane tab="Memberships Report" key="3">
              <Memberreport />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
}
