import React, { useEffect,useState } from "react";
import { Button } from "antd";
import { Input } from "antd";
import useId from "../../../useId";

export default function Basic() {
  
    const [email,setemail] = useState(sessionStorage.getItem("accountemail"));
    const [uername,setuername] =useState( sessionStorage.getItem("accountusername"));
 
  const { id, setId } = useId();

  return (
    <div className=" p-4">
      <h2 className="fs-5 pb-3">Basic Settings</h2>
      <div>
        <div className="row">
          <div className="col">
            <div className="py-2">Email</div>
            <div>
              <Input style={{ height: 35 }} disabled value={email}></Input>
            </div>
            <div>
              <div className="pt-4 pb-2">Account Name</div>
              <div>
                <Input style={{ height: 35 }} value={uername}></Input>
              </div>
            </div>
            <Button className="my-4" type="primary">
              Update Information
            </Button>
          </div>
          <div className="col-8 px-5 py-3">
            <div className="mb  ">Avatar </div>
            <div>
              <img
                height={120}
                src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                alt=""
              />
            </div>
            <Button disabled className="my-4" type="primary">
              Update Avatar
            </Button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
