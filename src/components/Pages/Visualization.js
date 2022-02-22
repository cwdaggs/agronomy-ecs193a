import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {FaGem} from "react-icons/fa";
import {GiCorn} from "react-icons/gi";
import {AiFillAndroid} from "react-icons/ai";
import {SiAdblock} from "react-icons/si";
import {GrHorton} from "react-icons/gr";
import {ConcernsMenu} from '../Visualizations/Concerns_Vis/ConcernsMenu'
import { useData, getFarmersCrops } from '../Visualizations/UseData';
import {CropPercentages} from '../Visualizations/CropPercentages';
import {AcresManagedMenu} from '../Visualizations/AcresManagedVis/AcresManagedMenu';
import { PriorityMenu } from '../Visualizations/PrioritySatisfaction/PriorityMenu';
import {AffectMenu} from '../Visualizations/AffectProduction/AffectMenu';
import { PrimaryGrowingReasons } from '../Visualizations/PrimaryGrowingReasons/PrimaryGrowingReasons.js';
import { PrimaryGrowingReasonsMenu } from '../Visualizations/PrimaryGrowingReasons/PrimaryGrowingReasonsMenu.js';
import { PriorityConcernsMenu } from '../Visualizations/PriorityConcerns/PriorityConcernsMenu';

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
        {<ConcernsMenu dataset={useData('./data/Grower_Crop_Data.csv')}/>}
        <h2>Of these acres, in a given year estimate approximately what percentage are in the following categories?</h2>

        {<CropPercentages dataset={useData('./data/Grower_Crop_Data.csv')}/>}
             
        {/*Question written in AcresManagedBarChart*/}
        {<AcresManagedMenu dataset={useData('./data/Filtered_Crop_Data.csv')}/>}

        <h2>Rate your current level of importance/satisfaction with UCCE's delivery of information on these topics, (1-3)</h2>
        {<PriorityMenu dataset={useData('./data/Grower_Crop_Data.csv')}/>}

        <h2>How often do the following priorities affect your recommendations for field crop production?</h2>
        {<AffectMenu dataset={useData('./data/Grower_Crop_Data.csv')}/>}

        <h2>What are the primary reasons that you grow the following field crops?</h2>
        {<PrimaryGrowingReasonsMenu dataset={useData('./data/Grower_Crop_Data.csv')}/>}

        <h2>What are the highest priority management challenges/concerns for each crop?</h2>
        {<PriorityConcernsMenu dataset={useData('./data/Grower_Crop_Data.csv')}/>}
      </div>
    );
}