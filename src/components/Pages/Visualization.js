import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";
import {ConcernsMenu} from '../Visualizations/Concerns_Vis/ConcernsMenu'


export const Visualizations = () => {
    return(
        <div id="outer-container">
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

        {/* visualizations go here */ <ConcernsMenu />}
      </div>
    );
}