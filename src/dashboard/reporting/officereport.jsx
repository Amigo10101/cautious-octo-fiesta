import { Card, DatePicker, Radio } from "antd";

import "react-circular-progressbar/dist/styles.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";

import Highlighter from "react-highlight-words";
import Round from "./charts/round";
import Tinyareachart from "./charts/tinyarea";
import Indreportoffice from "./individual/office/indoffice";
import useToken from "../../useToken";
import useId from "../../useId";

const { RangePicker } = DatePicker;
export default function Officereport() {
  const { token, setToken } = useToken();
  const { Id, setId } = useId();
  const [isloading, setisloading] = useState(true);
  const [levle1tabledata, setlevel1tabledata] = useState();
  const [totalcount, settotalcount] = useState(0);
  const officemode = Id.mode;
  const [officeidtoshow,setoidshow]=useState();
  function getofficedetails() {
    const axios = require("axios");

    const parentval =
      officemode === "O" ? `parent=${Id.affiliated_office}` : "is_parent=true";

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/?limit=500000&" + parentval,
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
  }

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
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
              setindmode(true);
              setoidshow(record.id)

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
      title: "Past Due",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Revenue",
      dataIndex: "age",
      key: "age",
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
  const [pagination, setPagination] = useState({
    pageSize: 5,

    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 30, 40, 50],
  });
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
            Back to All Offices
          </Button>
          <Indreportoffice style={{ zIndex: "-1" }} dataid={indid} />
        </>
      ) : (
        <div className="m-2">
          <div>
            <div className="container mb-5">
              <div className="row g-2 shadow-sm rounded-5 p-3 align-items-center">
                <div className="col-4 me-3 p-2 shadow rounded-5 ">
                  <Round percent={0.225} />
                  <div className="d-block m-auto text-center">
                    Payment Due Last 30 days: <strong>43</strong>
                  </div>
                </div>
                <div className="col-7 p-3 shadow rounded-5 ">
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
                  <div className="text-center pb-2"> Office Creation Date:</div>
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
                dataSource={levle1tabledata}
                pagination={pagination}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
