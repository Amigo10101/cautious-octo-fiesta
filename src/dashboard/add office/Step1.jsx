import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuList } from "@mui/material";
import { Upload, Modal, Button, Steps } from "antd";
import useToken from "../../useToken";
import { PlusOutlined } from "@ant-design/icons";

const mode = sessionStorage.getItem("accountmode");
const isoffice = mode === "O" ? true : false;
const { Step } = Steps;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Step1 = (props) => {
  const { actions, state } = useStateMachine({ updateAction });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [shrink, setshrink] = useState(false);
  const { token, setToken } = useToken();
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [officeid, setofficeid] = useState(sessionStorage.getItem("affoffice"));
  const [officemode, setofficemode] = useState(
    sessionStorage.getItem("accountmode")
  );
  const isoffice = officemode === "O" ? true : false;
  const [officemail, setofficemail] = useState(
    sessionStorage.getItem("accountemail")
  );
  const [officename, setofficename] = useState("");

  const setparentofficedata = () => {
    const axios = require("axios");

    let config = {
      method: "get",
      url: "https://backend-demo.revmd.co/api/v1/office/helpers/my-offices/",
      headers: {
        Accept: "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
    };

    axios(config)
      .then((response) => {
        setofficename(response.data[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [effect, seteffect] = useState();
  useEffect(() => {
    setparentofficedata();
  }, [effect]);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm();
  function zipcodesetter(event) {
    const value = event.target.value;
    function resetcta() {
      setValue("whichState", "");
      setValue("city", "");
    }

    {
      value.length === 5 ? Getzipcode(value) : resetcta();
    }
  }
  const Getzipcode = (e) => {
    const axios = require("axios");
    const FormData = require("form-data");
    let data = new FormData();

    let config = {
      method: "post",
      url: "https://backend-demo.revmd.co/api/v1/helpers/zip/?zip_code=" + e,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + " " + `${token}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setshrink(true);
        setValue("whichState", response.data.state);
        setValue("city", response.data.city);
        clearErrors("whichState");
        clearErrors("city");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Navigate = useNavigate();
  const onSubmit = (data) => {
    actions.updateAction(data);
    sessionStorage.setItem("officeid", officemode === "O" ? officeid : 0);
    Navigate("/dashboard/office/addoffice/step2");
  };

  return (
    <div>
      <div className="p-3 shadow-sm">
        <div style={{ fontSize: "12px" }} className="p-2 pb-1">
          <span className="fw-light">Home / Office Management</span>
          <span className="text-dark "> / Add New Office / Info</span>
        </div>
        <div className="p-2">
          <h5 className="">Add Office</h5>
          <div style={{ fontSize: "13px" }} className="fw-light">
            Register a new Office using the following form
          </div>
        </div>
      </div>{" "}
      <div className="p-4 bgrey">
        <div className="bg-white">
          <div className="w-75 m-auto py-5">
            {" "}
            <Steps current={0}>
              <Step title="Office Info" />
              <Step title="Account Detail" />
              <Step title="Bank Info" />
              {isoffice ? <></> : <Step title="Add Package" />}
              <Step title="Review" />
            </Steps>
          </div>

          <form
            className="w-50  d-block m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row p-2">
              <div className="col-3 p-0">
                <label className=" align-middle text-end fs6 ">
                  Parent Office:
                </label>
              </div>
              <div className="col">
                {" "}
                <fieldset>
                  <TextField
                    disabled
                    select
                    className=" me-5"
                    label="Your Parent Office"
                    id=""
                    placeholder="Parent Office"
                    fullWidth
                    size="small"
                    InputLabelProps={{ style: { fontSize: "13px" } }}
                    InputProps={{ style: { fontSize: "13px" } }}
                    value={officemode === "O" ? officeid : "na"}
                  >
                    <MenuItem className="d-none" value={"na"}>
                      Not Avaliable
                    </MenuItem>
                    <MenuItem className="d-none" value={officeid}>
                      {officename} [{officemail}]
                    </MenuItem>
                  </TextField>
                </fieldset>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="OfficeName"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5 "> *</span>Office
                  Details:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.OfficeName}
                  {...register("OfficeName", { required: true, maxLength: 80 })}
                  className=" me-3"
                  label="Office Name"
                  id="OfficeName"
                  placeholder="Name Of institution"
                  fullWidth
                  size="small"
                  defaultValue={state.OfficeName}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.OfficeName?.type === "required" &&
                    " Please enter Office Details"}
                </div>
              </div>
              <div className="col-3">
                <TextField
                  error={!!errors.EJN}
                  type="number"
                  {...register("EJN", { required: true, maxLength: 12 })}
                  className=" me-5"
                  label="EIN"
                  id="EJN"
                  placeholder="EIN"
                  fullWidth
                  size="small"
                  defaultValue={state.EJN}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.EJN?.type === "required" &&
                    " Please enter Office EIN"}
                </div>
              </div>
            </div>

            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="Address1"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5 "> *</span> Office
                  Address:
                </label>
              </div>
              <div className="col">
                <TextField
                  error={!!errors.Address1}
                  {...register("Address1", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="Address1"
                  id="OfficeName"
                  placeholder="OfficeName"
                  fullWidth
                  size="small"
                  defaultValue={state.Address1}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.Address1?.type === "required" &&
                    " Please enter Office Address"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0"></div>
              <div className="col">
                <TextField
                  error={!!errors.Address1}
                  {...register("Address2", { maxLength: 120 })}
                  className=" me-3"
                  label="Address2"
                  id="Address2"
                  placeholder="Address2"
                  fullWidth
                  size="small"
                  defaultValue={state.Address2}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.Address2?.type === "maxLength" &&
                    " Please enter a valid Address"}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0"></div>{" "}
              <div className="col-2">
                <TextField
                  error={!!errors.Zip}
                  onChange={zipcodesetter}
                  className=" me-3"
                  label="ZIP"
                  id="OfficeName"
                  placeholder="ZIP"
                  fullWidth
                  size="small"
                  defaultValue={state.Zip}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                  inputProps={{
                    ...register("Zip", {
                      minLength: 5,
                      maxLength: 5,
                      required: true,
                    }),
                    type: "text",
                    maxLength: 5,
                  }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.Zip?.type === "minLength" &&
                    " Enter a valid zip code"}
                  {errors.Zip?.type === "maxLength" &&
                    " Please enter a valid zip code"}
                  {errors.Zip?.type === "required" &&
                    " Please enter a zip code"}
                </div>
              </div>
              <div className="col-3">
                <TextField
                  error={!!errors.whichState}
                  {...register("whichState", {
                    required: true,
                    maxLength: 100,
                  })}
                  className=" me-3"
                  label="State"
                  id="whichState"
                  placeholder="State"
                  fullWidth
                  size="small"
                  defaultValue={state.whichState}
                  InputLabelProps={{
                    shrink: shrink,
                    style: { fontSize: "13px" },
                  }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.whichState?.type === "required" &&
                    " Please enter a state"}
                </div>
              </div>
              <div className="col-4">
                <TextField
                  error={!!errors.city}
                  {...register("city", { required: true, maxLength: 100 })}
                  className=" me-3"
                  label="City"
                  id="OfficeName"
                  placeholder="City"
                  fullWidth
                  size="small"
                  defaultValue={state.city}
                  InputLabelProps={{
                    shrink: shrink,
                    style: { fontSize: "13px" },
                  }}
                  InputProps={{ style: { fontSize: "13px" } }}
                />
                <div className=" row validationerror text-danger p-auto m-auto ">
                  {errors.city?.type === "required" && " Please enter a city "}
                </div>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="OfficeType"
                  className=" align-middle text-end fs6 "
                >
                  <span className="text-danger fw-bold fs-5 "> *</span> Office
                  Type:
                </label>
              </div>
              <div className="col">
                <TextField
                  defaultValue={state.OfficeType}
                  select
                  fullWidth
                  size="small"
                  label="Select A Office Type"
                  inputProps={register("OfficeType", {
                    required: "Please Select A Office Type",
                  })}
                  error={errors.OfficeType}
                  helperText={errors.OfficeType?.message}
                  InputLabelProps={{ style: { fontSize: "13px" } }}
                  InputProps={{ style: { fontSize: "13px" } }}
                >
                  <MenuItem value="Associations">Associations</MenuItem>

                  <MenuItem value="Credit Card Agencies">
                    Credit Card Agencies
                  </MenuItem>

                  <MenuItem value="Employer – Private Sector">
                    Employer – Private Sector
                  </MenuItem>

                  <MenuItem value="Employer – Public Sector">
                    Employer – Public Sector
                  </MenuItem>

                  <MenuItem value="Franchises">Franchises</MenuItem>

                  <MenuItem value="Independent Sales Contractors">
                    Independent Sales Contractors
                  </MenuItem>

                  <MenuItem value="Life, Health, Property &amp; Casualty Broker/Agencies">
                    Life, Health, Property &amp; Casualty Broker/Agencies
                  </MenuItem>

                  <MenuItem value="Non-Profits">Non-Profits</MenuItem>

                  <MenuItem value="PEOs (Professional Employer Organizations)">
                    PEOs (Professional Employer Organizations)
                  </MenuItem>

                  <MenuItem value="Sales Marketing Agencies">
                    Sales Marketing Agencies
                  </MenuItem>

                  <MenuItem value="Tax Services">Tax Services</MenuItem>

                  <MenuItem value="Tech/Software">Tech/Software</MenuItem>

                  <MenuItem value="TPAs (Third Party Administrators)">
                    TPAs (Third Party Administrators)
                  </MenuItem>

                  <MenuItem value="Unions">Online Sales</MenuItem>
                </TextField>
              </div>
            </div>
            <div className="row p-2">
              <div className="col-3 p-0">
                <label
                  htmlFor="Address1"
                  className=" align-middle text-end fs6 "
                >
                  Office Logo:
                </label>
              </div>
              <div className="col">
                <>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </>
              </div>
            </div>
            <div className="row p-2 ">
              <div className="col-3"></div>
              <div className="col">
                {" "}
                <Button className=" " type="primary" htmlType="submit">
                  Next
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
