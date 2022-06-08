import "./App.css";
import Navb from "./Local/Nav/Nav";
import Footert from "./Local/Footer/Footer";
import "./style.js"
import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./Home/home";
import ScrollButton from "./totop";
import Packages from "./packages/package";
import Mainpage from "./packages/components/mainpage";
import Productsind from "./Home/Components/productsind";
import Productsind1 from "./Home/Components/productsind1";
import Qquery from "./quickquery/Qquery";


function App() {
  return (
    <div className="App">
      
     <div className="sticky-top bg-light"><Navb /></div> 
      <Outlet/>
    <div style={{backgroundColor:'#283779'}}>  <Footert /></div>
  
    <ScrollButton/>


    </div>


  );
}

export default App;
