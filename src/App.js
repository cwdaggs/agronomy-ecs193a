import './App.css';
import logo from './images/ucdavis_logo_gold_0.png';
import {TabGroup, ToggleGroup} from './Button.js'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";

function App() {
  console.log("Hello World")
  return (
    <div id="outerContainer">
      <div id="heading">
        <img src='https://safeparty.ucdavis.edu/sites/default/files/inline-images/ucdavis_logo_gold_0.png' id="logo"/>
        {/* <img src='./images/ucdavis_logo_gold_0.png'/> */}
        <TabGroup id="topbar"/>
      </div>
      <div id="sidebar">
        <ProSidebar id="sidebar-container">
          <Menu iconShape="square" id="menu">
            <MenuItem icon={<FaGem/>} >Topic 1</MenuItem>
            <MenuItem icon={<GiCorn/>}>Topic 2</MenuItem>
            <MenuItem icon={<AiFillAndroid/>}>Topic 3</MenuItem>
            <MenuItem icon={<SiAdblock/>}>Topic 4</MenuItem>
            <MenuItem icon={<GrHorton/>}>Topic 5</MenuItem>
          {/* <SubMenu title="Components" icon={<FaEdgeLegacy />}>
          </SubMenu> */}
          </Menu>
        </ProSidebar>
      </div>
    </div>
  );
}

export default App;
