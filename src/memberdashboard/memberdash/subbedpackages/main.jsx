import React from "react";
import useId from "../../../useId";
import History from "./history";

export default function Subbedpackages() {
  const { Id, setId } = useId();
  const lastitem = Id.membership.membership_history.slice(-1);
  return (
    <div style={{ backgroundColor: "aliceblue" }}>
      <div>
        <br />
      </div>
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
                <span className="h5">{lastitem[0].calculated_price}</span>/Mo
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
      <div className="container-sm p-2">
        <div className=" bg-white shadow-lg rounded-5 container mb-5 ">
          <div className="p-3 fw-bold h5 text-center ">
            Subscription History
          </div>
          <History style={{ overflowX: "scroll" }} />
        </div>
      </div>
    </div>
  );
}
