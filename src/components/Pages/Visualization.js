import { ProSidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";
import { useData } from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import { CropPercentages } from '../Visualizations/Questions/CropPercentages';
import React, { useState } from "react";
import {ButtonSwitch, Tab, Button, ButtonGroup } from '../Visualizations/StyledDivs'

export const Visualizations = () => {

    
    const types = ["Concerns", "CropPercentages", "AcresManaged", "PrioritySatisfaction", "Affect", "InfoSources", "InternetSources", "PriorityConcerns"]
    const icons = {"Concerns": (<FaGem/>), "CropPercentages": (<GiCorn/>), "AcresManaged": <AiFillAndroid/>, "PrioritySatisfaction": <SiAdblock/>, "Affect": <GrHorton/>}
    const [active, setActive] = useState("Concerns");
    return(
        <div id="outer-container">
            
            {types.map(type => (
                <Tab 
                    key={type}
                    icon={icons[type]} 
                    onClick={() => {setActive(type)}} 
                    active={active === type}
                    >{type}
                </Tab>
            ))}
        
            {<VisMenu dataset={useData('./data/Filtered_Crop_Data.csv')} vis={active}/>}

                {/*
                <MenuItem icon={<FaGem/>} onClick={() => {setActive(type);}} active={active === type} >Topic 1</MenuItem>
                <MenuItem icon={<GiCorn/>}>Topic 2</MenuItem>
                <MenuItem icon={<AiFillAndroid/>}>Topic 3</MenuItem>
                <MenuItem icon={<SiAdblock/>}>Topic 4</MenuItem>
                <MenuItem icon={<GrHorton/>}>Topic 5</MenuItem>
                */}
            {/* <SubMenu title="Components" icon={<FaEdgeLegacy />}>
            </SubMenu> */}
        
        </div>
        
    );
}