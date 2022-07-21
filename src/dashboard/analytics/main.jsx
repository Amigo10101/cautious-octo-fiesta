import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tokencontext } from "../../usecontext";
import useToken from "../../useToken";
import CountUp from 'react-countup';

export default function MainAnalysis() {
  const Id = useContext(Tokencontext);
  const officemode = Id.mode;
  const { token, settoken } = useToken();
  const [membcount, setmembcount] = useState(0);
  const [officecount, setofficecount] = useState(0);
  const data = [
    {
      name: "Jan",
      Sales: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      Sales: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      Sales: 9800,
      amt: 2290,
    },
    {
      name: "May",
      uv: 2780,
      Sales: 3908,
      amt: 2000,
    },
    {
      name: "Jun",
      uv: 1890,
      Sales: 4800,
      amt: 2181,
    },
    {
      name: "Jul",
      uv: 2390,
      Sales: 3800,
      amt: 2500,
    },
    {
      name: "Aug",
      uv: 3490,
      Sales: 4300,
      amt: 2100,
    },
  ];
  const getfromoffice = () => {
    {
      const axios = require("axios");

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/" +
          Id.affiliated_office +
          "/memberships/",
        headers: {
          Accept: "application/json",
          Authorization: "Token" + " " + `${token}`,
        },
      };

      axios(config)
        .then((response) => {
          setmembcount(response.data.count);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const getdata = () => {
    {
      const axios = require("axios");

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/" +
          "all" +
          "/membership/?limit=1",
        headers: {
          Accept: "application/json",
          Authorization: "Token" + " " + `${token}`,
        },
      };

      axios(config)
        .then((response) => {
          setmembcount(response.data.count);
        })
        .catch((error) => {
          console.log("no");
          getfromoffice();
        });
    }
    {
      const axios = require("axios");

      const parentval =
        officemode === "O"
          ? `parent=${Id.affiliated_office}`
          : "is_parent=true";

      let config = {
        method: "get",
        url:
          "https://backend-demo.revmd.co/api/v1/office/?limit=1&" + parentval,
        headers: {
          Accept: "application/json",
          Authorization: "Token" + " " + `${token}`,
        },
      };

      axios(config)
        .then((response) => {
          setofficecount(response.data.count)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div
      style={{ color: "#1890ff", backgroundColor: "aliceblue" }}
      className="row g-0 "
    >
      <div className="col-md-9 px-3 ">
        <div className="ps-1 pt-2 lead fs-3 fw-bold">
          Welcome {sessionStorage.getItem("accountusername")}
        </div>
        <div className="ps-1 pt-2 lead fs-4">Analytics</div>
        <div className="row  pt-2 pb-5 g-2">
          <div className="col">
            <div className="container bg-white py-2 shadow rounded-5">
              <div className="row">
                <span className="m-auto d-block text-center">
                  <i class="bi bi-person fs-1"></i>
                </span>
              </div>
              <div className="row fs-6">
                <span className="m-auto d-block text-center lead fs-6">
                  Total <div>Users:</div>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-2 fw-bold">
                <CountUp duration={1} start={0} end={officecount} />
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container bg-white py-2 shadow rounded-5">
              <div className="row">
                <span className="m-auto d-block text-center">
                  <i class="bi bi-people fs-1"></i>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-6 lead">
                  Total <div>Members:</div>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-2 fw-bold">
                <CountUp duration={1} start={0} end={membcount} />
                </span>
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="container bg-white py-2 shadow rounded-5">
              <div className="row">
                <span className="m-auto d-block text-center">
                  <i class="bi bi-building fs-1"></i>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-6 lead">
                  Total <div>Offices:</div>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-2 fw-bold">
                <CountUp duration={1} start={0} end={officecount} />
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container bg-white py-2 shadow rounded-5">
              <div className="row">
                <span className="m-auto d-block text-center">
                  <i class="bi bi-currency-dollar fs-1 fw-bold"></i>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center lead fs-6">
                  Total <div>Sale:</div>
                </span>
              </div>
              <div className="row">
                <span className="m-auto d-block text-center fs-2 fw-bold">
                <CountUp duration={1} start={0} end={officecount} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div>
            <span className="lead fs-4">Sales This Month</span>
            <span className="float-end">20 March, 2022</span>
          </div>

          <div className="fs-1 fw-bold"> <CountUp prefix="$" duration={1} start={0} end={2232} /></div>
        </div>
        <ResponsiveContainer height={300}>
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
            barSize={50}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 40, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Sales"
              fill="#1890ff "
              background={{ fill: "#ffffff" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{ boxShadow: "-2px 3rem 3rem rgba(0,0,0,.175)" }}
        className="col-md-3 p-0 p-3 px-4 "
      >
        <div className="row">
          <div className=" pt-4 fs-5 fw-bold">Recent Activities</div>
          <div className="  fs-6 lead">March 20, 2022</div>
        </div>
        <div className="row py-3 my-2 shadow  bg-white rounded-4 fs-6">
          <div className="col-3 ">
            <i class="bi bi-people fs-5 p-2 px-3 rounded-4 text-dark bg-white shadow"></i>
          </div>
          <div style={{ fontSize: "12px" }} className="col-3 text-center pt-1">
            Office{" "}
          </div>
          <div style={{ fontSize: "12px" }} className="col pt-1 fw-bold">
            Office name{" "}
          </div>
        </div>
        <div className="row py-3 my-2 shadow bg-white rounded-4 fs-6">
          <div className="col-3 ">
            <i class="bi bi-person fs-5 p-2 px-3 rounded-4 text-dark bg-white shadow"></i>
          </div>
          <div style={{ fontSize: "12px" }} className="col-3 text-center pt-1">
            User{" "}
          </div>
          <div style={{ fontSize: "12px" }} className="col pt-1 fw-bold">
            Member name{" "}
          </div>
        </div>
        <div className="row py-3 my-2 shadow bg-white rounded-4 fs-6">
          <div className="col-3 ">
            <i class="bi bi-people fs-5 p-2 px-3 rounded-4 text-dark bg-white shadow"></i>
          </div>
          <div style={{ fontSize: "12px" }} className="col-3 text-center pt-1">
            Member{" "}
          </div>
          <div style={{ fontSize: "12px" }} className="col pt-1 fw-bold">
            Member name{" "}
          </div>
        </div>
        <div className="row py-3 my-2 shadow  bg-white rounded-4 fs-6">
          <div className="col-3 ">
            <i class="bi bi-building fs-5 p-2 px-3 rounded-4 text-dark bg-white shadow"></i>
          </div>
          <div style={{ fontSize: "12px" }} className="col-3 text-center pt-1">
            Office{" "}
          </div>
          <div style={{ fontSize: "12px" }} className="col pt-1 fw-bold">
            Office name{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
