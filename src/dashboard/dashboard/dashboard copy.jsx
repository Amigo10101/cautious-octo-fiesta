import React, { useState } from "react";
import MainRegisteredMember from "../registered/member/main";
import MainRegisteredUser from "../registered/User/main";
import MainRegisteredOffice from "../registered/office/main";
import "./style.css";
import MainaddUser from "../add Userr/main";
import MainaddMember from "../add Member/main";
import Mainaddoffice from "../add office/main";
import MainAnalysis from "../analytics/main";

import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Dashboard() {
  const [toggleuser, setToggleuser] = useState("none");
  const [togglemember, setTogglemember] = useState("none");
  const [toggleoffice, setToggleoffice] = useState("none");
  const handledropdownoffice = () => {
    {
      toggleoffice === "grid"
        ? setToggleoffice("none")
        : setToggleoffice("grid");
      setTogglemember("none");
      setToggleuser("none");
    }
  };
  const handledropdownuser = () => {
    {
      toggleuser === "grid" ? setToggleuser("none") : setToggleuser("grid");
      setTogglemember("none");
      setToggleoffice("none");
    }
  };
  const handledropdownmember = () => {
    {
      togglemember === "grid"
        ? setTogglemember("none")
        : setTogglemember("grid");
      setToggleuser("none");
      setToggleoffice("none");
    }
  };

  return (
    <div>
      <div className="body-pd">
        <div className="containerdash expander" id="navbar">
          <nav class="nav fs6">
            <div className="m-auto my-0">
              <a href="/" class="nav_brand fs-4 fw-bold text-white ">
                <i class="bi bi-list pe-3"></i> Dash Board
              </a>
            </div>
            <ul>
              <li>
                <a href="/" class="nav_link  active fs-4 text-center">
                  <i class="bi bi-house"></i>
                  <span class="nav_name fs5 ">DashBoard</span>
                </a>
              </li>
              <div>
                <div
                  onClick={() => {
                    handledropdownoffice();
                  }}
                  class="nav_link  fs-4"
                >
                  <i class="bi bi-ui-checks"></i>
                  <span class="nav_name fs5 ">Office Management</span>
                  <i
                    class="bi bi-caret-down-fill float-end text-end fs-6"
                    
                  ></i>
                  <div
                    style={{ display: `${toggleoffice}` }}
                    class="w-100 subitems fs6 "
                  >
                    <div className="">
                      <a
                        className="d-block"
                        href="/office/registeredoffices"
                        class="collapse_sublink fs6"
                      >
                        Registered Offices
                      </a>

                      <a
                        href="/office/addoffice/step1"
                        class="collapse_sublink fs6"
                      >
                        Add Office
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <li>
                <div
                  onClick={() => {
                    handledropdownuser();
                  }}
                  class="nav_link  fs-4"
                >
                  <i class="bi bi-person"></i>
                  <span class="nav_name ">User Management</span>
                  <i class="bi bi-caret-down-fill float-end fs-6 text-end "></i>
                  <div style={{ display: `${toggleuser}` }} class="subitems  ">
                    <div className="">
                      <a
                        className="d-block"
                        href="/user/registeredusers"
                        class="collapse_sublink fs6"
                      >
                        Registered Users
                      </a>
                      <a
                        href="/user/addusers/step1"
                        class="collapse_sublink fs6"
                      >
                        Add User
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div
                  onClick={() => {
                    handledropdownmember();
                  }}
                  class="nav_link fs-4"
                >
                  <i class="bi bi-people"></i>
                  <span class="nav_name  d-inline ">Membership</span>
                  <i class="bi bi-caret-down-fill fs-6 float-end text-end "></i>
                  <div
                    style={{ display: `${togglemember}` }}
                    class="w-100 subitems "
                  >
                    <div className="">
                      {" "}
                      <a
                        className="d-block"
                        href="/member/registeredmembers"
                        class="collapse_sublink  fs6 "
                      >
                        Registered Members
                      </a>
                      <a
                        href="/member/addmembers/step1"
                        class="collapse_sublink fs6"
                      >
                        Add Members
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <a href="#" class="nav_link  fs-4">
                  <i class="bi bi-gear"></i>
                  <span class="nav_name">Account Settings</span>
                </a>
              </li>
              <li>
                <a href="#" class="nav_link  fs-4">
                  <i class="bi bi-graph-up-arrow"></i>
                  <span class="nav_name  ">Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" class="nav_link  fs-4">
                  <i class="bi bi-cloud-arrow-up"></i>
                  <span class="nav_name ">Retrive Member</span>
                </a>
              </li>
            </ul>
            <a href="#" class="nav_link fs-4">
              <ion-icon name="log-out-outline" class="nav_icon"></ion-icon>
              <span class="nav_name ">
                <i class="bi bi-box-arrow-in-right fs-4 pe-3 align-middle"></i>
                Log Out
              </span>
            </a>
          </nav>
        </div>
        <div className="bg-light">
          <div className="">
            <div className="p-3 pb-5">
            <span className="float-start admin ps-2 fs-4 fw-bold">
                Dash Board
              </span>
              <span className="float-end admin">
                <i class="bi bi-person  fs-4 lead align-middle pt-2 "></i> 
              </span>
              <span className="float-end admin pt-2">
                <i class="bi bi-bell fs-5 "></i>
              </span>
            </div>
          </div>
          <div>
          <Router>
            <Routes>
              <Route path="/" element={<MainAnalysis />} />
              <Route path="member/*">
                <Route
                  path="registeredmembers"
                  element={<MainRegisteredMember />}
                />
                <Route path="addmembers/*" element={<MainaddMember />} />
              </Route>
              <Route path="office/*">
                <Route
                  path="registeredoffices"
                  element={<MainRegisteredOffice />}
                />
                <Route path="addoffice/*" element={<Mainaddoffice />} />
              </Route>
              <Route path="user/*">
                <Route
                  path="registeredusers"
                  element={<MainRegisteredUser />}
                />
                <Route path="addusers/*" element={<MainaddUser />} />
              </Route>
            </Routes>
          </Router></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
