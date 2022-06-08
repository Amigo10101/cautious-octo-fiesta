import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter ,Route,Routes } from "react-router-dom";
import MainDashboard from "./User DashBoard/MainDashboard";
import Home from "./Home/home";
import ScrollButton from "./totop";
import Packages from "./packages/package";
import Mainpage from "./packages/components/mainpage";
import Productsind from "./Home/Components/productsind";
import Productsind1 from "./Home/Components/productsind1";
import Qquery from "./quickquery/Qquery";
import Main from "./superdashboard/main";



ReactDOM.render(
  <BrowserRouter>
   <Routes>
   <Route exact path="/" element={<App/>} >

   <Route exact path="/" element={<Home/>} >
      <Route path="/" element={<Productsind />} />
      <Route path="2" element={<Productsind1 />} />
</Route>  
    <Route exact path="/packages" element={<Mainpage/>} />
    <Route exact path="/qq" element={<Qquery/>} />
    <Route exact path="/" element={<Home/>} >
      <Route path="/1" element={<Productsind />} />
      <Route path="2" element={<Productsind1 />} /> 
</Route> 

      
   </Route>

<Route exact path="/Dashboard" element={<MainDashboard/>} />
<Route exact path="/MainDashboard" element={<Main/>} />


    </Routes>
    </BrowserRouter>,
  document.getElementById("root")
);
