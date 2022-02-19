import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";
import { useData } from '../Visualizations/UseData';
import {VisMenu} from '../Visualizations/Menu';
import { CropPercentages } from '../Visualizations/Questions/CropPercentages';
import React, { useState } from "react";
import { OccupationMenu } from '../Visualizations/OccupationMenu';

export const Visualizations = () => {

    
    const types = ["Concerns", "CropPercentages", "AcresManaged", "PrioritySatisfaction", "Affect", "Affect2"]
    const icons = [{"Concerns": (<FaGem/>)}, {"CropPercentages": (<GiCorn/>)}, {"AcresManaged": <AiFillAndroid/>}, {"PrioritySatisfaction": <SiAdblock/>}, {"Affect": <GrHorton/>}]
    const [active, setActive] = useState("Concerns");
    return(
        <div id="outer-container">
            <div id="sidebar">
            <ProSidebar id="sidebar-container">
            <Menu iconShape="square" id="menu">
                {types.map(type => (
                    <MenuItem 
                        key={type}
                        icon={icons[type]} 
                        onClick={() => {setActive(type)}} 
                        active={active === type}
                        >{type}
                    </MenuItem>
                 )) }
                {/*
                <MenuItem icon={<FaGem/>} onClick={() => {setActive(type);}} active={active === type} >Topic 1</MenuItem>
                <MenuItem icon={<GiCorn/>}>Topic 2</MenuItem>
                <MenuItem icon={<AiFillAndroid/>}>Topic 3</MenuItem>
                <MenuItem icon={<SiAdblock/>}>Topic 4</MenuItem>
                <MenuItem icon={<GrHorton/>}>Topic 5</MenuItem>
                */}
            {/* <SubMenu title="Components" icon={<FaEdgeLegacy />}>
            </SubMenu> */}
            </Menu>
            </ProSidebar>
        </div> 
        {<VisMenu dataset={useData('./data/Grower_Crop_Data.csv')} vis={active}/>}
        
        {/*{<VisMenu dataset={useData('./data/Full_Dataset.csv')} vis={active}/>}
        <h2>Of these acres, in a given year estimate approximately what percentage are in the following categories?</h2>

        {<VisMenu dataset={useData('./data/Full_Dataset.csv')} vis={"CropPercentages"}/>}
             
        {/*Question written in AcresManagedBarChart}
        {<VisMenu dataset={useData('./data/Full_Dataset.csv')} vis={"AcresManaged"}/>}

        <h2>Rate your current level of importance/satisfaction with UCCE's delivery of information on these topics, (1-3)</h2>
        {<VisMenu dataset={useData('./data/Full_Dataset.csv')} vis={"PrioritySatisfaction"}/>}

        <h2>How often do the following priorities affect your recommendations for field crop production?</h2>
        {<VisMenu dataset={useData('./data/Full_Dataset.csv')} vis={"Affect"}/>}
        */}
      </div>
    );
}