import React, { useState } from "react";
import { Button, message } from "antd";
import { Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import useToken from "../../useToken";

export default function RetrieveMain() {
  const { token, setToken } = useToken();
  const [datamodal, setdatamodal] = useState(false);
  const [data, setdata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getdata = (external) => {
    const axios = require("axios");
    let data = JSON.stringify({
      external_id: external.externalid,
    });
    const setdataformodal = (dae) => {
      console.log(dae);
      message.success("Member Found");
      setdata(dae);
      setdatamodal(true);
    };
    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/helpers/get-membership-from-external-id/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setisloading(false);
        {
          response.data.status === "failed"
            ? message.warning("Member not Found")
            : setdataformodal(response.data.response);
        }
      })
      .catch((error) => {
        console.log(error);
        message.warning(error.message);
        setisloading(false);
      });
  };
  const onSubmit = (data) => {
    getdata(data);
    setisloading(true);
  };
  return (
    <div className="container p-3 py-5">
      <div className="bg-white p-4 py-5">
        <div className="container fs-6 border-bottom pb-2">Retrieve Membership</div>
        <div className="mt-5 ms-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4">
                <Controller
                  render={({ field }) => (
                    <Input
                      style={{ height: 35 }}
                      className="me-4"
                      {...field}
                      placeholder="Exteral Id"
                      status={errors.externalid ? "error" : undefined}
                    />
                  )}
                  name="externalid"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                />
                <div className="row text-danger p-auto m-auto fs5">
                  {errors.externalid?.type === "required" &&
                    "  Please enter a External Id"}
                </div>
              </div>

              <div className="col">
                <Button
                  disabled={isloading}
                  onClick={() => {
                    setdatamodal(false);
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Retrieve Member
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div >
        {datamodal === false ? undefined : (
          <div>
            <div className="border border-1 ms-3 mt-5">
              <div
                style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                className="p-4 px-2 container  "
              >
                <div className=" ps-3">
                  <h5>Personal Details</h5>
                </div>
                <div className="ps-3">
                  <div className="">First Name: {data.name.first}</div>
                  <div className="">MIddle Name: {data.name.middle}</div>
                  <div className="">Last Name: {data.name.last}</div>
                  <div className="">Gender: {data.gender}</div>
                  <div className=""> Date of Birth : {data.dob}</div>
                  <div className="">Address 1: {data.address.address1}</div>
                  <div className="">Address 2: {data.address.address2}</div>
                  <div className="">Zip:{data.address.zipCode}</div>
                  <div className="">City: {data.address.city}</div>
                  <div className="">State: {data.address.state}</div>
                </div>
              </div>
              <div
                style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                className="p-4 px-2 container  "
              >
                <div className="fs-5 fw-bold ps-3">Contact Details</div>
                <div className="ps-3">
                  <div className="">Phone Number: {data.phone}</div>

                  <div className="">Email Address: {data.email}</div>
                </div>
              </div>{" "}
              <div
                style={{ fontSize: "14px", color: "rgba(0,0,0,.65)" }}
                className="p-4 px-2 container  "
              >
                <div className="fs-5 fw-bold ps-3">Policies</div>
                <div className="ps-3">
                  {data.policies.map((item1, index1) => {
                    console.log(data.policies[0]);
                    return (
                      <div>
                        <div className="fw-blod">Policy #{index1 + 1}</div>
                        <div className="fw-blod">
                          Benifit Start Date: {item1.benefitstart}
                        </div>
                        <div className="fw-blod">
                          Benifit End Date: {item1.benefitend}
                        </div>
                        <div className="fw-blod">
                          Include Dependents: {item1.includeDependents === false ? "No" : "Yes"}
                        </div>
                        <div className="fw-blod">
                          Policy ID: {item1.policyId}
                        </div>
                        <div className="fw-blod">
                          Is Acive: {item1.isactive === false ? "False" : "True"}
                        </div>{" "}
                        <div className="fw-blod">
                          Plan COde: {item1.plancode}
                        </div>
                        <div className="fw-blod">
                          Terminate Policies: {item1.terminatePolicies === false ? "False" : "True"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      
    </div>
  );
}
