import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, message } from "antd";
import { Select } from "antd";
import useToken from "../../../useToken";
import useId from "../../../useId";
const Step1 = (props) => {
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState([]);
  const [permissions, setpermissions] = useState([]);
  const [selectedpermissions, setselectedpermissions] = useState([]);
  const filteredOptions = permissions.filter((o) => !selectedItems.includes(o));
  const { token } = useToken();
  const { Id } = useId();
  const officeid = Id.affliatedoffice;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function getpermissions() {
    const axios = require("axios");

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/permissions/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setpermissions(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getpermissions();
  }, []);
  const onSubmit = (data) => {
    {
      selectedItems.map((item) =>
        setselectedpermissions((selectedpermissions) => [
          ...selectedpermissions,
          item,
        ])
      );
    }
    postdata();
  };
  const postdata = () => {
    const axios = require("axios");
    let data = JSON.stringify({
      email: getValues("Email"),
      first_name: getValues("FirstName"),
      middle_name: getValues("MiddleName"),
      last_name: getValues("lastName"),
      phone_number: getValues("PhoneNumber"),
      permissions: selectedpermissions,
    });

    let config = {
      method: "post",
      url:
        "https://backend-demo.revmd.co/api/v1/" +
        Id.affiliated_office +
        "/office-user/",
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
        message.success("User added")



      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
  return (
    <div>
      <div className="shadow-sm p-3">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / User Management</span>
          <span className="text-dark "> / Add User</span>
        </div>
        <div className="p-2">
          <h5>Add a new User</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new User using the following form
          </div>
        </div>
      </div>
      <div className="p-4 bgrey">
        <div className="bg-white">
          <form
            style={{ fontSize: "13px" }}
            className="w-75 p-4 bg-white   d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="FirstName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5">*</span> First
                  Name:
                </label>
              </div>
              <div className="col-8  fs6">
                <TextField
                  size="small"
                  style={{ fontSize: "10px" }}
                  error={!!errors.FirstName}
                  {...register("FirstName", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="First Name"
                  id="FirstName"
                  placeholder="First Name"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs5">
                  {errors.FirstName?.type === "required" &&
                    "  Please enter First Name"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="FirstName"
                  className=" align-middle text-end fs6 "
                >
                  Middle Name:
                </label>
              </div>
              <div className="col-8 ">
                <TextField
                  size="small"
                  error={!!errors.MiddleName}
                  {...register("MiddleName", { maxLength: 100 })}
                  className=" me-3"
                  label="Middle Name"
                  id="MiddleName"
                  placeholder="Middle Name"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="FirstName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5">*</span> Last Name:
                </label>
              </div>
              <div className="col-8 ">
                <TextField
                  size="small"
                  error={!!errors.LastName}
                  {...register("LastName", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="Last Name"
                  id="LastName"
                  placeholder="Last Name"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs5">
                  {errors.LastName?.type === "required" &&
                    "  Please enter Last Name"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="PhoneNumber"
                  className=" align-middle text-end fs6 "
                >
                  Phone Number:
                </label>
              </div>
              <div className="col-8 ">
                <TextField
                  size="small"
                  error={!!errors.PhoneNumber}
                  type="number"
                  {...register("PhoneNumber", { maxLength: 11 })}
                  className=" me-3"
                  label="Phone Number"
                  id="PhoneNumber"
                  placeholder="Phone Number"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs5">
                  {errors.PhoneNumber?.type === "required" &&
                    "  Please enter Phone Number"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="MobileNumber"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5">*</span> Mobile
                  Number:
                </label>
              </div>
              <div className="col-8 ">
                <TextField
                  size="small"
                  error={!!errors.MobileNumber}
                  {...register("MobileNumber", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  className=" me-3"
                  label="Mobile Number"
                  id="MobileNumber"
                  placeholder="Mobile Number"
                  fullWidth
                  type="number"
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs5">
                  {errors.MobileNumber?.type === "required" &&
                    "  Please enter Mobile Number"}
                  {errors.MobileNumber?.type === "minLength" &&
                    "  Enter a valid Mobile Number"}
                  {errors.MobileNumber?.type === "maxLength" &&
                    "  Enter a valid Mobile Number"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label htmlFor="Email" className=" align-middle text-end fs6 ">
                  <span className="text-danger fw-bold fs-5">*</span> Email:
                </label>
              </div>
              <div className="col-8 ">
                <TextField
                  size="small"
                  error={!!errors.Email}
                  {...register("Email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  className=" me-3"
                  label="Email"
                  id="Email"
                  placeholder="Emailad"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row text-danger p-auto m-auto fs5 ">
                  {errors.Email?.type === "required" && "  Please enter Email"}
                  {errors.Email?.type === "pattern" &&
                    "  Please enter a valid Email"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label htmlFor="Email" className=" align-middle text-end fs6 ">
                  <span className="text-danger fw-bold fs-5">*</span>{" "}
                  Permissions:
                </label>
              </div>
              <div className="col-8 ">
                <Select
                  mode="multiple"
                  placeholder="Permissons"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{
                    width: "100%",
                  }}
                >
                  {filteredOptions.map((item) => (
                    <Select.Option key={item.name} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
                <div className=" row text-danger p-auto m-auto fs5 ">
                  {errors.Email?.type === "required" && "  Please enter Email"}
                  {errors.Email?.type === "pattern" &&
                    "  Please enter a valid Email"}
                </div>
              </div>
            </div>
            <div className=" row pt-4 ps-2 ">
              <div className="col-3"></div>
              <div className="col">
                <Button
                  onClick={() => {
            
                    console.log(selectedpermissions);
                  }}
                  htmlType="submit"
                  type="primary"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1;
